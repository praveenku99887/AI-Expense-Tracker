from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.auth import get_current_user
from app.models import User, Expense
from sqlalchemy import func

router = APIRouter(
    prefix="/profile",
    tags=["Profile"]
)


@router.get("/")
def profile(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):

    total_expense = db.query(
        func.coalesce(func.sum(Expense.amount), 0)
    ).filter(
        Expense.user_id == current_user.id
    ).scalar()

    total_transactions = db.query(
        Expense
    ).filter(
        Expense.user_id == current_user.id
    ).count()

    total_categories = db.query(
        Expense.category
    ).filter(
        Expense.user_id == current_user.id
    ).distinct().count()

    return {
        "id": current_user.id,
        "name": current_user.name,
        "email": current_user.email,
        "total_expense": float(total_expense),
        "total_transactions": total_transactions,
        "total_categories": total_categories
    }