from pydantic import BaseModel, EmailStr, Field
from typing import Optional, Literal
from datetime import datetime

UserRole = Literal["student", "founder", "researcher", "innovator", "startup_team"]

class UserBase(BaseModel):
    name: str = Field(..., min_length=2)
    email: EmailStr
    role: UserRole = "founder"

class UserCreate(UserBase):
    password: str = Field(..., min_length=6)

class UserResponse(UserBase):
    id: str
    created_at: str
    updated_at: Optional[str] = None

    class Config:
        from_attributes = True
