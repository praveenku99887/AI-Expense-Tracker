from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import engine
from app.models import Base

# Routers
from app.routers.user import router as user_router
from app.routers.expense import router as expense_router
from app.routers.upload import router as upload_router
from app.routers.ai import router as ai_router
from app.routers.dashboard import router as dashboard_router
from app.routers.profile import router as profile_router


# ==========================
# CREATE FASTAPI APP
# ==========================

app = FastAPI(
    title="AI Expense Tracker",
    version="1.0.0",
    description="AI-powered Expense Tracker using FastAPI, MySQL, JWT, Gemini AI, CSV, Excel, and Dashboard",
    contact={
        "name": "Praveen Kumar",
        "email": "praveenku99887@gmail.com",
    },
)


# ==========================
# CORS CONFIGURATION
# ==========================

origins = [
    # Docker Frontend
    "http://localhost:3000",
    "http://127.0.0.1:3000",

    # Vite Development
    "http://localhost:5173",
    "http://127.0.0.1:5173",

    "http://localhost:5174",
    "http://127.0.0.1:5174",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ==========================
# CREATE DATABASE TABLES
# ==========================

Base.metadata.create_all(bind=engine)


# ==========================
# REGISTER ROUTERS
# ==========================

app.include_router(user_router)
app.include_router(expense_router)
app.include_router(upload_router)
app.include_router(ai_router)
app.include_router(dashboard_router)
app.include_router(profile_router)


# ==========================
# HOME API
# ==========================

@app.get("/")
def home():
    return {
        "message": "Welcome To AI Power Expense Tracker Application",
        "status": "Running Successfully",
        "version": "1.0.0"
    }