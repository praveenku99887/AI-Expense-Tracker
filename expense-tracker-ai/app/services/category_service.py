import json

from app.services.gemini_service import client


CATEGORIES = [
    "Food",
    "Transport",
    "Shopping",
    "Medical",
    "Entertainment",
    "Utilities",
    "Education",
    "Investment",
    "Travel",
    "Other"
]


def categorize_expenses(transactions: list):

    prompt = f"""
You are an AI Expense Analyzer.

The uploaded file may be:

- Bank Statement CSV
- Expense CSV
- Credit Card Statement
- Excel Export
- Transaction Report

The column names may be different.

Examples:

Date
Txn Date
Transaction Date

Narration
Description
Merchant
Particular
Title

Debit
Withdrawal
Amount
Expense

Credit
Deposit

Your Tasks:

1. Detect the correct columns automatically.

2. Ignore ALL income transactions.

Ignore:
- Salary
- Salary Credit
- Refund
- Cashback
- Deposit
- Interest
- Credit
- UPI Credit
- IMPS Credit
- NEFT Credit
- Bank Transfer Received

3. Keep ONLY expense transactions.

4. Extract:

- title
- description
- amount
- expense_date

5. Categorize every expense into ONLY one category.

Allowed Categories:

Food
Transport
Shopping
Medical
Entertainment
Utilities
Education
Investment
Travel
Other

Examples:

Uber
Rapido
Ola
Metro
Taxi
Auto
Petrol
Fuel

→ Transport

Tea
Coffee
Restaurant
Pizza Hut
Domino's
Burger King
Swiggy
Zomato
Cafe

→ Food

Amazon
Flipkart
Myntra
Ajio

→ Shopping

Apollo Pharmacy
MedPlus
Hospital
Clinic

→ Medical

Netflix
Spotify
Movie
BookMyShow

→ Entertainment

Electricity Bill
Water Bill
Gas Bill
Internet Bill
Mobile Recharge

→ Utilities

School Fee
College Fee
Books
Course

→ Education

Flight
Train
Hotel
IRCTC
Bus

→ Travel

SIP
Mutual Fund
Stocks

→ Investment

Anything else

→ Other

Return ONLY a valid JSON array.

Do not return markdown.

Do not return explanation.

Do not return comments.

Output format:

[
    {{
        "title":"Uber",
        "description":"UPI UBER INDIA",
        "amount":300,
        "category":"Transport",
        "expense_date":"2026-08-01"
    }},
    {{
        "title":"Tea Shop",
        "description":"Tea and Snacks",
        "amount":50,
        "category":"Food",
        "expense_date":"2026-08-02"
    }}
]

Transactions:

{json.dumps(transactions, indent=2)}
"""

    response = client.models.generate_content(
        model="gemini-flash-latest",
        contents=prompt
    )

    text = response.text.strip()

    # Remove markdown if present
    if text.startswith("```json"):
        text = text.replace("```json", "").replace("```", "").strip()

    try:
        return json.loads(text)

    except json.JSONDecodeError:
        raise Exception(
            f"Gemini returned invalid JSON:\n\n{text}"
        )