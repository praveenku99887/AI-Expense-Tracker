from datetime import date, datetime, timedelta
import calendar


def get_month_name(month: int):
    return calendar.month_name[month]


def get_month_range(year: int, month: int):

    start_date = date(year, month, 1)

    if month == 12:
        end_date = date(year + 1, 1, 1) - timedelta(days=1)
    else:
        end_date = date(year, month + 1, 1) - timedelta(days=1)

    return start_date, end_date


def get_year_range(year: int):

    return date(year, 1, 1), date(year, 12, 31)


def get_day_range(day: str):

    return datetime.strptime(day, "%Y-%m-%d").date()


def get_week_range(year: int, month: int, week: int):

    first_day = date(year, month, 1)

    start = first_day + timedelta(days=(week - 1) * 7)

    end = start + timedelta(days=6)

    last_day = calendar.monthrange(year, month)[1]

    month_end = date(year, month, last_day)

    if end > month_end:
        end = month_end

    return start, end