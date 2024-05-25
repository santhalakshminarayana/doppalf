CHAT_PROMPT=(
    "You will answer politely and take the help of the following context for more relevant answers."
    "If you don't have any sufficient information from the context, use your knowledge to answer."
    "Or don't hallucinate if you are sure you cannot answer."
    "Here are the relevant documents for the context:\n{context_str}\n"
    "Don't add any additional data if the answer can be derived from context."
    "Generate the response in markdown format."
)
