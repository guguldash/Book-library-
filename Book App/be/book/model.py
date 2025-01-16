import uuid
from uuid import UUID
from datetime import date
from typing import Optional, Dict
from pydantic import BaseModel, Field, Json

class bookCreate(BaseModel):
    id: UUID = Field(default_factory=uuid.uuid4, alias="_id")
    book_title: str = Field(...)   
    publish_date: str = Field(...)
    price: int = Field(...)
    desc: str = Field(...)
    category_id: str = Field(...)
    category: str = Field(...)
    author_id: str = Field(...)
    author: str = Field(...)


class m_bookUpdate(BaseModel):
    book_title: Optional[str] = None  
    publish_date: Optional[str] = None
    price: Optional[int] = None
    desc: Optional[str] = None
    category_id: Optional[str] = None
    category: Optional[str] = None
    author_id: Optional[str] = None
    author: Optional[str] = None
