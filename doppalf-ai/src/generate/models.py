from pydantic import BaseModel

class GenerateModel(BaseModel):
    message: str
    message_id: str
    role: str
    timestamp: str