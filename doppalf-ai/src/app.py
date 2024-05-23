from contextlib import asynccontextmanager

from fastapi import FastAPI

from src.generate.rag import load_rag, clear_rag

from .config.env import ENV
from .routes import add_routes


env_config = ENV()

@asynccontextmanager
async def lifespan(app: FastAPI):
    load_rag()

    yield

    clear_rag()


app = FastAPI(lifespan=lifespan, root_path="/doppalf-ai/v1")
app = add_routes(app)