from fastapi import APIRouter

from app.services.category_service import categorize_expenses

router = APIRouter(
    prefix="/ai",
    tags=["AI"]
)


@router.get("/test")
def test_ai():
    return {
        "status": "success",
        "message": "AI Service is Working 🚀"
    }


@router.get("/bulk-category")
def bulk_category():

    expenses = [
        {
            "title": "Uber Ride",
            "description": "Airport to Home",
            "amount": 300
        },
        {
            "title": "Tea Stall",
            "description": "Morning Tea",
            "amount": 30
        },
        {
            "title": "Amazon Shopping",
            "description": "Wireless Mouse",
            "amount": 1200
        },
        {
            "title": "Electricity Bill",
            "description": "Monthly Bill",
            "amount": 1500
        }
    ]

    result = categorize_expenses(expenses)

    return {
        "result": result
    }