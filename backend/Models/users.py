from pydantic import BaseModel, EmailStr, Field
from typing import Optional, Literal
from datetime import datetime

ROLES = ["user", "Admin"]

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
    rol: Optional[Literal["user", "Admin", "Seminarista"]] = "user"
    
class UserLogin(BaseModel):
    email : EmailStr
    password : str

class UserUpdate(BaseModel):
    name : Optional[str] = None
    username : Optional[str] = None
    email : Optional[EmailStr] = None
    password : Optional[str] = None
    phone : Optional[str] = None
    is_active : Optional[bool] = None
    is_admin : Optional[bool] = None
    rol: Optional[Literal["user", "Admin", "Seminarista"]] = None