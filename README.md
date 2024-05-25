# Doppalf - A RAG-powered AI Chatbot

![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white) ![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54) ![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi) ![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white) ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white) ![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)

> Read more about this project at my blog about [Doppalf: RAG-powered fullstack AI chatbot like ChatGPT](https://santhalakshminarayana.github.io/blog/doppalf-rag-powered-ai-chatbot)

### What does Doppalf mean?

**Doppalf** is a combination of two words **Dopple** and **Gandalf** (LOTR). Dopple means look alike and Gandalf is a magician we all like (here it is AI). So, Doppalf means a person who looks like you but possesses magic.

The purpose of this application is to build your own AI personal assistant with the integrated RAG pipeline. You can use this for multiple purposes like:

- Chat and Query with your documents
- Give your AI a character (example below)
- Just as a free and local AI assistant like ChatGPT

This application comes with the ChatGPT like streaming UI and provides a familiar UI interface.

![Doppalf AI](/static/doppalf-response.gif)

## System architecture

**Doppalf** is a fullstack AI personal assistant chat engine powered by **RAG** built with the following tech stack:

- **Docker**
- **Nginx** (doppalf-rp)
- **UI** (doppalf-ui):
  - Next.js (v14)
  - Typescript
  - Tailwind CSS
- **Backend** (doppalf-ai):
  - Python (v3.12)
  - FastAPI
  - Llamaindex
  - Cohere
  - Qdrant Cloud

**Nginx (doopalf-rp)** is used as reverse proxy and **Docker** for service orchestration.

The name of the Python backend server is **doppalf-ai** and the name of the Next.js service is **doppalf-ui**.

![Doppalf Architecture](/static/doppalf-arch.png)

When the user interacts with the web app at localhost (127.0.0.1), the request is forwarded to Nginx which forwards to the Doppalf-UI service for loading the web page.

![Doppalf UI Landing Page](/static/doppalf-ui-landing-page.png)

When a user types the query, the Next.js app requests the Python server for the answer generation.

![Doppalf UI Landing Page](/static/doppalf-ui-query-response.png)

---

### File system

```
.
|-- doppalf-ai
|   |-- documents
|   |-- pstorage
|   |-- src
|   |   |-- config
|   |   |   |-- env.py
|   |   |   `-- logger.py
|   |   |-- generate
|   |   |   |-- api.py
|   |   |   |-- constants.py
|   |   |   |-- models.py
|   |   |   `-- rag.py
|   |   |-- utils
|   |   |   `-- utils.py
|   |   |-- app.py
|   |   `-- routes.py
|   |-- .env
|   |-- Dockerfile
|   |-- main.py
|   `-- requirements.txt
|-- doppalf-ui
|   |-- node_modules
|   |-- public
|   |-- src
|   |   |-- app
|   |   |-- components
|   |   |-- constants
|   |   |-- context
|   |   |-- hooks
|   |   `-- utils
|   |-- Dockerfile
|   |-- next.config.mjs
|   |-- next-env.d.ts
|   |-- package.json
|   |-- package-lock.json
|   |-- postcss.config.mjs
|   |-- tailwind.config.ts
|   `-- tsconfig.json
|-- nginx-rp
|   |-- includes
|   |-- Dockerfile
|   `-- nginx.conf
|-- config.sh
|-- docker-compose.yaml
`-- README.md

```

---

### Required steps

This project is an end-to-end web application that can be run locally and free of cost by getting the required API keys for free.

Get the free [Cohere API trail Key](https://dashboard.cohere.com/api-keys) to use Cohere as LLM.

Get the free [Qdrant Cloud API Key and URL](https://cloud.qdrant.io) where you can get a free 1 GB cluster for storing Vector embeddings.

These two are required to integrate with **Llamaindex** where we use

- Cohere for both LLM and Embeddings
- Qdrant as Vector database

Once you get the API keys, place them in the _doppalf-ai/.env_ file as following

```shell
...

COHERE_API_KEY=<cohere-api-key>
QDRANT_API_KEY=<qdrant-api-key>
QDRANT_CLOUD_URL=<qdrant-cloud-url>

...
```

Once the above step is done, the next important thing is to add the documents (currently only supports _.txt_ files) inside the directory _doppalf-ai/documents_. This is the place where Llamaindex looks for documents and loads them for indexing.

> You can change the default location for documents in the .env file for key _DOCS_DIR_.

The other default things required for Llamaindex are the persistent storage location and the collection name for storing vector embeddings in the Qdrant database.

> These fields are also changeable in the .env file

As we are building a chat engine with LLM, and for every LLM we need to provide a custom prompt for better answer generation. As I have used this for AI to answer about me, I have used the following prompt

```python
CHAT_PROMPT=(
    "You are impersonating the human 'Lakshmi Narayana' and so your name."
    "So you are Lakshmi Narayana and answers in first person.When asked any question about you, you will answer as if Lakshmi Narayana is answering."
    "You will answer politely and take the help of the following context for more relevant answers."
    "If you don't have any sufficient information from the context, use your knowledge to answer."
    "Or don't hallucinate if you are sure you cannot answer."
    "Here are the relevant documents for the context:\n{context_str}\n"
    "Instruction: Use the previous chat history, or the context above, to interact and help the user and answer as if you are Lakshmi Narayana."
    "Don't add any additional data if the answer can be derived from context."
    "Generate the response in markdown format."
)
```

> The default prompt can be found at _/doppalf-ai/src/generate/constants.py_. You can change it according to your use case

The final RAG pipeline looks like

![RAG Pipeline](/static/rag-pipeline.jpg)

## Running the application

Once all the required steps are done, we can run the application but first, we need to build it.

> For Next.js building, Dockerfile has multiple build stages such as _dev_ and _prod_. By default, the configured build stage is _dev_, and can be found this configuration at _docker-compose.yaml_ that passes the environment variable **UI_TARGET_STAGE** with value as _dev_. You can set the build stage environment variable by running the _config.sh_.

For the first time building the application, in the root docker-compose file location, run the following command

```shell
$ docker compose up -d --build
```

This will pull the specified docker images and build the application. Once the application is built, access it at _127.0.0.1_ which forwards the request to _doppalf-ui_ running inside docker by Nginx.

The following is a sample example of the chatbot with memory of user interactivity

![Doppalf AI Chatbot with history](/static/query-response-history.png)

**New Chat Session**

![New Chat Session](/static/new-chat.gif)

---

### Features

- RAG integrated AI chatbot
- Streaming UI like ChatGPT
- Create a new chat session (Actions)

### TODO

- Support for adding documents from the UI
- Text-to-speech of AI response
- Voice cloning
- Support various LLM integration
