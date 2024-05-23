from typing import Self
import os
from threading import Lock

from dotenv import load_dotenv

from src.utils.utils import check_all_dict_keys_not_none


load_dotenv()

env_keys = {
    "DOCS_DIR": "DOCS_DIR",
    "INDEX_STORAGE_DIR": "INDEX_STORAGE_DIR",
    "COLLECTION_NAME": "COLLECTION_NAME",
    "MAX_BUFFER_MEMORY_TOKENS": "MAX_BUFFER_MEMORY_TOKENS",
    "COHERE_API_KEY": "COHERE_API_KEY",
    "QDRANT_API_KEY": "QDRANT_API_KEY",
    "QDRANT_CLOUD_URL": "QDRANT_CLOUD_URL",
}

class ENV():
    _env_instance = None
    _env_config = {}
    _lock = Lock()

    def __new__(cls) -> Self:
        if cls._env_instance is None:
            with cls._lock:
                if cls._env_instance is None:
                    cls._env_instance = super(ENV, cls).__new__(cls)
                    cls._env_instance._load_env()

        return cls._env_instance
    
    def _load_env(self):
        config = {}
        for v in env_keys.values():
            config[v] = os.getenv(v)

        if not check_all_dict_keys_not_none(config):
            raise ValueError("env has some values missing")

        self._env_config = config

    
    def get(self, key:str) -> any:
        return self._env_config.get(key)