from fastapi import APIRouter, HTTPException, Response
from starlette.responses import StreamingResponse

from .rag import chat, reset_chat_memory, get_collections
from .models import GenerateModel

grouter = APIRouter(tags=["generate"])


@grouter.post("")
async def generate(data: GenerateModel):
    try:
        return StreamingResponse(
            chat(data.message), 
            media_type='text/event-stream',
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=e)


@grouter.post("/new-session")
def new_session():
    reset_chat_memory()
    return Response(status_code=200)


@grouter.get("/collections")
def get_collections_list():
    collections = get_collections()
    return {"collections": collections}