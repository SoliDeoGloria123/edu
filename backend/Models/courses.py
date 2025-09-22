from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime

class Course(BaseModel):
    title: str
    description: Optional[str] = None
    created_at: Optional[datetime] = Field(default_factory=datetime.utcnow)
    updated_at: Optional[datetime] = Field(default_factory=datetime.utcnow)
    is_active: bool = True
    instructor_id: Optional[int] = None
    category: Optional[str] = None
    level: Optional[str] = "beginner" 
    price: Optional[float] = 0.0
    lessons: Optional[list[str]] = Field(default_factory=list)
    tags: Optional[list[str]] = Field(default_factory=list)
    likes: Optional[int] = 0
    dislikes: Optional[int] = 0
    
