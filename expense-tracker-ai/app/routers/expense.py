from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import User
from app.schemas import ExpenseCreate
from app.crud import (
    create_expense,
    get_all_expenses,
    get_expense_by_id,
    update_expense,
    delete_expense
)
from app.auth import get_current_user

router = APIRouter(
    prefix="/expenses",
    tags=["Expenses"]
)


# ==========================
# ADD EXPENSE
# ==========================

@router.post("/")
def add_expense(
    expense: ExpenseCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    return create_expense(
        db,
        expense,
        current_user.id
    )


# ==========================
# GET ALL EXPENSES
# ==========================

@router.get("/")
def all_expenses(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    return get_all_expenses(
        db,
        current_user.id
    )


# ==========================
# GET EXPENSE BY ID
# ==========================

@router.get("/{expense_id}")
def one_expense(
    expense_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    expense = get_expense_by_id(
        db,
        expense_id,
        current_user.id
    )

    if expense is None:
        raise HTTPException(
            status_code=404,
            detail="Expense not found"
        )

    return expense


# ==========================
# UPDATE EXPENSE
# ==========================

@router.put("/{expense_id}")
def edit_expense(
    expense_id: int,
    expense: ExpenseCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    updated = update_expense(
        db,
        expense_id,
        expense,
        current_user.id
    )

    if updated is None:
        raise HTTPException(
            status_code=404,
            detail="Expense not found"
        )

    return updated


# ==========================
# DELETE EXPENSE
# ==========================

@router.delete("/{expense_id}")
def remove_expense(
    expense_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    deleted = delete_expense(
        db,
        expense_id,
        current_user.id
    )

    if deleted is None:
        raise HTTPException(
            status_code=404,
            detail="Expense not found"
        )

    return deleted