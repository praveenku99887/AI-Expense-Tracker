from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.schemas import (
    UserCreate,
    UserLogin,
    UserResponse
)

from app.crud import (
    create_user,
    get_user_by_email,
    authenticate_user
)

from app.auth import create_access_token

router = APIRouter(
    tags=["Users"]
)


# ==========================
# REGISTER
# ==========================

@router.post("/register", response_model=UserResponse)
def register(user: UserCreate, db: Session = Depends(get_db)):

    existing_user = get_user_by_email(db, user.email)

    if existing_user:
        raise HTTPException(
            status_code=400,
            detail="Email already registered"
        )

    return create_user(db, user)


# ==========================
# LOGIN
# ==========================

@router.post("/login")
def login(user: UserLogin, db: Session = Depends(get_db)):

    db_user = authenticate_user(
        db,
        user.email,
        user.password
    )

    if db_user is None:
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password"
        )

    access_token = create_access_token(
        data={
            "sub": db_user.email,
            "user_id": db_user.id
        }
    )

    return {
        "message": "Login Successful",
        "access_token": access_token,
        "token_type": "Bearer"
    }