from sqlalchemy.orm import Session

from app.models import User, Expense
from app.auth import hash_password, verify_password


# ==========================
# USER FUNCTIONS
# ==========================

def create_user(db: Session, user):

    db_user = User(
        name=user.name,
        email=user.email,
        password=hash_password(user.password)
    )

    db.add(db_user)
    db.commit()
    db.refresh(db_user)

    return db_user


def get_user_by_email(db: Session, email: str):

    return db.query(User).filter(
        User.email == email
    ).first()


def authenticate_user(db: Session, email: str, password: str):

    user = get_user_by_email(db, email)

    if user is None:
        return None

    if not verify_password(password, user.password):
        return None

    return user


# ==========================
# EXPENSE FUNCTIONS
# ==========================

def create_expense(db: Session, expense, user_id: int):

    db_expense = Expense(
        title=expense.title,
        description=expense.description,
        amount=expense.amount,
        category=expense.category,
        expense_date=expense.expense_date,
        user_id=user_id
    )

    db.add(db_expense)
    db.commit()
    db.refresh(db_expense)

    return db_expense


def get_all_expenses(db: Session, user_id: int):

    return db.query(Expense).filter(
        Expense.user_id == user_id
    ).all()


def get_expense_by_id(db: Session, expense_id: int, user_id: int):

    return db.query(Expense).filter(
        Expense.id == expense_id,
        Expense.user_id == user_id
    ).first()


def update_expense(db: Session, expense_id: int, expense, user_id: int):

    db_expense = get_expense_by_id(
        db,
        expense_id,
        user_id
    )

    if db_expense is None:
        return None

    db_expense.title = expense.title
    db_expense.description = expense.description
    db_expense.amount = expense.amount
    db_expense.category = expense.category
    db_expense.expense_date = expense.expense_date

    db.commit()
    db.refresh(db_expense)

    return db_expense


def delete_expense(db: Session, expense_id: int, user_id: int):

    db_expense = get_expense_by_id(
        db,
        expense_id,
        user_id
    )

    if db_expense is None:
        return None

    db.delete(db_expense)
    db.commit()

    return {
        "message": "Expense deleted successfully"
    }