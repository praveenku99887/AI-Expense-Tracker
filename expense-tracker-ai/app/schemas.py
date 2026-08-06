from pydantic import BaseModel, EmailStr
from datetime import date


# ==========================
# USER SCHEMAS
# ==========================

class UserCreate(BaseModel):
    name: str
    email: EmailStr
    password: str


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class UserResponse(BaseModel):
    id: int
    name: str
    email: EmailStr

    class Config:
        from_attributes = True


# ==========================
# EXPENSE SCHEMAS
# ==========================

class ExpenseCreate(BaseModel):
    title: str
    description: str
    amount: float
    category: str
    expense_date: date


class ExpenseResponse(BaseModel):
    id: int
    title: str
    description: str
    amount: float
    category: str
    expense_date: date
    user_id: int

    class Config:
        from_attributes = True