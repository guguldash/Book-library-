import uuid
from uuid import UUID
from typing import Optional, Dict
from pydantic import BaseModel, Field, Json

class memberCreate(BaseModel):
    id: UUID = Field(default_factory=uuid.uuid4, alias="_id")
    member_name: str = Field(...)
    member_email: str = Field(...)
    phone_number: str = Field(...)
    Password: str = Field(...)
    pic:str = Field(...)

    
class memberUpdate(BaseModel):
    member_name: Optional[str]= None
    member_email: Optional[str]= None
    phone_number: Optional[str]= None
    Password: Optional[str]= None
    pic: Optional[str] = None
