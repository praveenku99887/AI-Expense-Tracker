from datetime import date, timedelta

from sqlalchemy import func

from app.models import Expense

from app.utils.date_utils import (
    get_day_range,
    get_week_range,
    get_month_range,
    get_year_range,
    get_month_name
)


# ==========================
# DASHBOARD SUMMARY
# ==========================

def get_summary(db, user_id):

    today = date.today()

    start_of_week = today - timedelta(days=today.weekday())

    start_of_month = today.replace(day=1)

    start_of_year = today.replace(month=1, day=1)

    total = db.query(
        func.coalesce(func.sum(Expense.amount), 0)
    ).filter(
        Expense.user_id == user_id
    ).scalar()

    today_total = db.query(
        func.coalesce(func.sum(Expense.amount), 0)
    ).filter(
        Expense.user_id == user_id,
        Expense.expense_date == today
    ).scalar()

    week_total = db.query(
        func.coalesce(func.sum(Expense.amount), 0)
    ).filter(
        Expense.user_id == user_id,
        Expense.expense_date >= start_of_week
    ).scalar()

    month_total = db.query(
        func.coalesce(func.sum(Expense.amount), 0)
    ).filter(
        Expense.user_id == user_id,
        Expense.expense_date >= start_of_month
    ).scalar()

    year_total = db.query(
        func.coalesce(func.sum(Expense.amount), 0)
    ).filter(
        Expense.user_id == user_id,
        Expense.expense_date >= start_of_year
    ).scalar()

    return {
        "total_expense": float(total),
        "today": float(today_total),
        "this_week": float(week_total),
        "this_month": float(month_total),
        "this_year": float(year_total)
    }


# ==========================
# CATEGORY REPORT
# ==========================

def get_category_report(
    db,
    user_id,
    report_type,
    date=None,
    week=None,
    month=None,
    year=None
):

    # ==========================
    # TOTAL CATEGORY REPORT
    # ==========================

    if report_type == "total":

        result = (
            db.query(
                Expense.category,
                func.sum(Expense.amount).label("total")
            )
            .filter(
                Expense.user_id == user_id
            )
            .group_by(Expense.category)
            .order_by(func.sum(Expense.amount).desc())
            .all()
        )

        total = sum(item.total for item in result)

        categories = []

        for item in result:
            categories.append(
                {
                    "category": item.category,
                    "amount": float(item.total)
                }
            )

        return {
            "type": "total",
            "label": "Total Expenses",
            "total_expense": float(total),
            "categories": categories
        }

    # ==========================
    # DAY REPORT
    # ==========================

    elif report_type == "day":

        start_date = get_day_range(date)
        end_date = start_date

        label = start_date.strftime("%d %B %Y")

    # ==========================
    # WEEK REPORT
    # ==========================

    elif report_type == "week":

        start_date, end_date = get_week_range(
            int(year),
            int(month),
            int(week)
        )

        label = (
            f"Week {week} "
            f"({start_date.strftime('%d %b')} - "
            f"{end_date.strftime('%d %b %Y')})"
        )

    # ==========================
    # MONTH REPORT
    # ==========================

    elif report_type == "month":

        start_date, end_date = get_month_range(
            int(year),
            int(month)
        )

        label = f"{get_month_name(int(month))} {year}"

    # ==========================
    # YEAR REPORT
    # ==========================

    elif report_type == "year":

        start_date, end_date = get_year_range(
            int(year)
        )

        label = str(year)

    else:

        raise Exception("Invalid report type")

    result = (
        db.query(
            Expense.category,
            func.sum(Expense.amount).label("total")
        )
        .filter(
            Expense.user_id == user_id,
            Expense.expense_date >= start_date,
            Expense.expense_date <= end_date
        )
        .group_by(Expense.category)
        .order_by(func.sum(Expense.amount).desc())
        .all()
    )

    total = sum(item.total for item in result)

    categories = []

    for item in result:

        categories.append(
            {
                "category": item.category,
                "amount": float(item.total)
            }
        )

    return {
        "type": report_type,
        "label": label,
        "start_date": str(start_date),
        "end_date": str(end_date),
        "total_expense": float(total),
        "categories": categories
    }