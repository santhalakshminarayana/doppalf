import json
import os

from llama_index.core import SimpleDirectoryReader, VectorStoreIndex, Settings, StorageContext
from llama_index.core import load_index_from_storage
from llama_index.core.memory import ChatMemoryBuffer
from llama_index.core.node_parser import SentenceWindowNodeParser
from llama_index.core.postprocessor import MetadataReplacementPostProcessor
from llama_index.embeddings.cohere import CohereEmbedding
from llama_index.llms.cohere import Cohere
from llama_index.postprocessor.cohere_rerank import CohereRerank
from llama_index.vector_stores.qdrant import QdrantVectorStore
from qdrant_client import QdrantClient

from src.config.env import ENV, env_keys
from src.config.logger import get_logger

from .constants import CHAT_PROMPT

envk = ENV()
logger = get_logger()

index = None
chat_engine = None

def load_rag() -> None:
    global index
    global chat_engine

    cdir = os.getcwd()
    docs_dir = envk.get(env_keys.get("DOCS_DIR"))
    docs_path = os.path.join(cdir, docs_dir)

    # check if any documents are provided for index
    if not os.path.exists(docs_path):
        raise FileNotFoundError(f"Documents dir at path: {docs_path} not exists.")
    if not os.listdir(docs_dir):
        raise FileNotFoundError(f"Provide documents inside directory: {docs_path} for indexing.")
    
    storage_dir = envk.get(env_keys.get("INDEX_STORAGE_DIR"))
    storage_path = os.path.join(cdir, storage_dir)
    
    cohere_api_key = envk.get(env_keys.get("COHERE_API_KEY"))
    qdrant_api_key = envk.get(env_keys.get("QDRANT_API_KEY"))

    Settings.llm = Cohere(
        api_key=cohere_api_key,
        model="command-r-plus", 
    )
    Settings.embed_model = CohereEmbedding(
        cohere_api_key=cohere_api_key,
        model_name="embed-english-v3.0",
        input_type="search_document",
    )
    
    qd_client = QdrantClient(
        envk.get(env_keys.get("QDRANT_CLOUD_URL")),
        api_key=qdrant_api_key,
    )

    sentence_node_parser = SentenceWindowNodeParser.from_defaults(
        window_size=1,
        window_metadata_key="window",
        original_text_metadata_key="original_text", 
    )

    vector_store = QdrantVectorStore(
        client=qd_client, 
        collection_name=envk.get(env_keys.get("COLLECTION_NAME")),
    )

    # index was previously persisted
    if os.path.exists(storage_path) and os.listdir(storage_path):
        logger.debug("Using existing index.")
        storage_context = StorageContext.from_defaults(
            vector_store=vector_store, persist_dir=storage_path
        )
        
        index = load_index_from_storage(storage_context)

    else:
        logger.debug("Creating new index for documents.")
        reader = SimpleDirectoryReader(input_dir=docs_path)
        
        all_docs = []
        for docs in reader.iter_data():
            all_docs.extend(docs)
        
        for doc in all_docs:
            logger.debug(f"id: {doc.doc_id}\nmetada: {doc.metadata}")

        nodes = sentence_node_parser.get_nodes_from_documents(all_docs)
        
        storage_context = StorageContext.from_defaults(vector_store=vector_store)
        
        index = VectorStoreIndex(nodes, storage_context=storage_context)

        index.storage_context.persist(persist_dir=storage_path)


    chat_engine = index.as_chat_engine(
        chat_mode="condense_plus_context",
        memory=ChatMemoryBuffer.from_defaults(token_limit=int(envk.get(env_keys.get("MAX_BUFFER_MEMORY_TOKENS")))),
        context_prompt=CHAT_PROMPT,
        similarity_top_k=3, 
        node_postprocessors=[
            MetadataReplacementPostProcessor(target_metadata_key="window"),
            CohereRerank(api_key=cohere_api_key, top_n=3),
        ],
        verbose=False,
    )


def clear_rag() -> None:
    reset_chat_memory()


def reset_chat_memory() -> None:
    logger.debug("resetting chat memory")

    global chat_engine
    chat_engine.reset()


def get_collections() -> list[str]:
    return [envk.get(env_keys.get("COLLECTION_NAME"))]


def chat(query: str):
    global chat_engine
    
    response = chat_engine.stream_chat(query)
    for res in response.response_gen:
        yield f"data: {json.dumps({"message":res})}\n\n"