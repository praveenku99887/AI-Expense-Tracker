from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import User
from app.auth import get_current_user

from app.services.dashboard_service import (
    get_summary,
    get_category_report
)

router = APIRouter(
    prefix="/dashboard",
    tags=["Dashboard"]
)


# ==========================
# DASHBOARD SUMMARY
# ==========================

@router.get("/summary")
def dashboard_summary(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    return get_summary(db, current_user.id)


# ==========================
# CATEGORY REPORT
# ==========================

@router.get("/category")
def category_report(
    type: str = Query(...),
    date: str | None = Query(None),
    week: int | None = Query(None),
    month: int | None = Query(None),
    year: int | None = Query(None),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    if type not in ["total", "day", "week", "month", "year"]:
        raise HTTPException(
            status_code=400,
            detail="type must be total, day, week, month or year"
        )

    return get_category_report(
        db=db,
        user_id=current_user.id,
        report_type=type,
        date=date,
        week=week,
        month=month,
        year=year
    )