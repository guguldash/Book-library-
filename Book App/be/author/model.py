import uuid
from uuid import UUID
from typing import Optional, Dict
from pydantic import BaseModel, Field, Json



class authorCreate(BaseModel):
    id: UUID = Field(default_factory=uuid.uuid4, alias="_id")
    name: str = Field(...)
    
    
class authorUpdate(BaseModel):
    name: Optional[str]= None
