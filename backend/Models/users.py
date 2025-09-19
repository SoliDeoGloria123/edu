from pydantic import BaseModel, EmailStr, Field
from typing import Optional
from datetime import datetime

class User(BaseModel):
    id: Optional[int] = None
    name : str
    username : str
    email : EmailStr
    password : str
    phone : Optional[str] = None
    created_at : Optional[datetime] = Field(default_factory=datetime.utcnow)
    updated_at : Optional[datetime] = Field(default_factory=datetime.utcnow)
    is_active : bool = True
    is_admin : bool = False
    rol: Optional[str] = "user"
    
class UserLogin(BaseModel):
    email : EmailStr
    password : str

