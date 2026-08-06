from fastapi import APIRouter, UploadFile, File, HTTPException, Depends
import os
import shutil

from sqlalchemy.orm import Session

from app.database import get_db
from app.models import Expense, User
from app.services.csv_service import read_csv
from app.services.category_service import categorize_expenses
from app.auth import get_current_user

router = APIRouter(
    prefix="/upload",
    tags=["Upload"]
)


@router.post("/csv")
async def upload_csv(
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    os.makedirs("app/uploads", exist_ok=True)

    file_path = f"app/uploads/{file.filename}"

    # Save uploaded file
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # Read CSV
    transactions = read_csv(file_path)

    # AI Categorization
    expenses = categorize_expenses(transactions)

    inserted = 0
    skipped = 0

    try:

        for item in expenses:

            existing = db.query(Expense).filter(
                Expense.title == item["title"],
                Expense.amount == float(item["amount"]),
                Expense.expense_date == item["expense_date"],
                Expense.user_id == current_user.id
            ).first()

            if existing:
                skipped += 1
                continue

            expense = Expense(
                title=item["title"],
                description=item["description"],
                amount=float(item["amount"]),
                category=item["category"],
                expense_date=item["expense_date"],
                user_id=current_user.id
            )

            db.add(expense)
            inserted += 1

        db.commit()

    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=500,
            detail=str(e)
        )

    return {
        "message": "Expenses categorized and stored successfully",
        "filename": file.filename,
        "uploaded_rows": len(transactions),
        "stored_rows": inserted,
        "skipped_rows": skipped,
        "expenses": expenses
    }