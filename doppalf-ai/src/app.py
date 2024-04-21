from fastapi import FastAPI

from .config.env import ENV
from .routes import add_routes


env_config = ENV()

app = FastAPI(root_path="/doppalf-ai/v1")
app = add_routes(app)