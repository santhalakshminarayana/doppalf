from fastapi import FastAPI

from src.generate.api import grouter

def add_routes(app: FastAPI) -> FastAPI:
    app.include_router(grouter, prefix="/generate")

    return app