import json

import cohere
from fastapi import APIRouter, HTTPException
from starlette.responses import StreamingResponse

from src.config.env import ENV, env_keys
from src.config.logger import get_logger

from .models import GenerateModel

logger = get_logger()
grouter = APIRouter(tags=["generate"])

API_KEY = ENV().get(env_keys["AI_MODEL_API_KEY"])


def generate_message(prompt: str):
    co = cohere.Client(api_key=API_KEY)
    stream = co.chat_stream(
        message=prompt,
        prompt_truncation="OFF", 
        temperature=0.8,
    )

    for event in stream:
        if event.event_type == "text-generation":
            yield f"data: {json.dumps({"message":event.text})}\n\n"


@grouter.post("")
async def generate(data: GenerateModel):
    try:
        return StreamingResponse(
            generate_message(data.message), 
            media_type='text/event-stream',
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=e)
