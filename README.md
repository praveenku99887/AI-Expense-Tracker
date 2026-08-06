# 💰 AI Expense Tracker

An AI-powered Personal Finance Management System built using **FastAPI**, **React**, **MySQL**, **Docker**, **AWS EC2**, **Amazon RDS**, **Nginx**, and **Google Gemini AI**. The application enables users to securely manage expenses, upload bank statements, visualize spending trends, and receive AI-powered financial insights.

---

# 🌐 Live Demo

### 🚀 Website

**Frontend**

http://3.94.113.12:3000/

### 🔗 Backend API

http://3.94.113.12:8000

### 📄 Swagger Documentation

http://3.94.113.12:8000/docs

---

# 🚀 Features

- 🔐 JWT Authentication
- 💳 Expense Management (CRUD)
- 📂 CSV Statement Upload
- 📊 Interactive Dashboard
- 📈 Expense Analytics
- 🤖 AI-Powered Expense Categorization
- 🤖 AI Financial Insights using Google Gemini
- 👤 User Profile Management
- 🐳 Dockerized Frontend & Backend
- ☁️ AWS EC2 Deployment
- 🗄️ Amazon RDS (MySQL)
- 📑 REST API Documentation (Swagger)

---

# 📊 Dashboard

The dashboard provides a complete overview of the user's financial activities, including:

- Total Expenses
- Category-wise Spending
- Monthly Expense Analysis
- Recent Transactions
- Interactive Charts
- AI-generated Expense Insights

![Dashboard](dashboard.png)

---

# 🛠️ Tech Stack

## Frontend

- React.js
- Vite
- Material UI (MUI)
- Axios
- React Router DOM
- Recharts

## Backend

- FastAPI
- SQLAlchemy
- JWT Authentication
- Google Gemini AI
- Pandas
- Pydantic
- Uvicorn

## Database

- MySQL
- Amazon RDS

## Cloud & DevOps

- AWS EC2
- Amazon RDS
- Docker
- Docker Compose
- Nginx
- Git
- GitHub

---

# ☁️ AWS Architecture

```
                    User Browser
                          │
                          ▼
                 AWS EC2 (Ubuntu)
                          │
                    Docker Compose
          ┌────────────────┴────────────────┐
          │                                 │
          ▼                                 ▼
   React + Nginx                     FastAPI Backend
          │                                 │
          └──────────────┬──────────────────┘
                         ▼
                 Amazon RDS (MySQL)
                         │
                         ▼
                Google Gemini AI
```

---

# 📁 Project Structure

```text
AI-Expense-Tracker/
│
├── docker-compose.yml
├── README.md
├── dashboard.png
│
├── expense-tracker-ai/
│   ├── app/
│   ├── Dockerfile
│   ├── requirements.txt
│   └── .env
│
└── expense-tracker-frontend/
    ├── src/
    ├── Dockerfile
    ├── nginx.conf
    └── package.json
```

---

# ⚙️ Local Setup

## Clone Repository

```bash
git clone https://github.com/praveenku99887/AI-Expense-Tracker.git

cd AI-Expense-Tracker
```

---

## Backend

```bash
cd expense-tracker-ai

python -m venv venv

venv\Scripts\activate

pip install -r requirements.txt

uvicorn app.main:app --reload
```

Backend

```
http://127.0.0.1:8000
```

Swagger

```
http://127.0.0.1:8000/docs
```

---

## Frontend

```bash
cd expense-tracker-frontend

npm install

npm run dev
```

Frontend

```
http://localhost:5173
```

---

# 🐳 Docker Deployment

Build and start the project

```bash
docker compose up -d --build
```

Stop containers

```bash
docker compose down
```

View running containers

```bash
docker ps
```

Frontend

```
http://localhost:3000
```

Backend

```
http://localhost:8000
```

Swagger

```
http://localhost:8000/docs
```

---

# ☁️ AWS Deployment

This project is deployed on AWS using:

- Amazon EC2 (Ubuntu Server)
- Amazon RDS (MySQL)
- Docker
- Docker Compose
- Nginx

Deployment Steps

- Launch EC2 Ubuntu Instance
- Create Amazon RDS MySQL Database
- Configure Security Groups
- Install Docker & Docker Compose
- Clone GitHub Repository
- Configure Environment Variables
- Build Docker Containers
- Deploy using Docker Compose

---

# 🔑 Environment Variables

Create a `.env` file inside **expense-tracker-ai**

```env
DB_HOST=YOUR_RDS_ENDPOINT
DB_PORT=3306
DB_NAME=expense_tracker
DB_USER=YOUR_RDS_USERNAME
DB_PASSWORD=YOUR_RDS_PASSWORD

SECRET_KEY=YOUR_SECRET_KEY
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30

GEMINI_API_KEY=YOUR_GEMINI_API_KEY
```

For Local Docker Development

```env
DB_HOST=host.docker.internal
```

---

# 📌 Future Enhancements

- Budget Planning
- AI Spending Recommendations
- OCR Receipt Scanner
- Email Notifications
- Monthly Expense Reports
- GitHub Actions CI/CD
- Kubernetes Deployment
- HTTPS using SSL
- Custom Domain Integration

---

# 👨‍💻 Author

**Praveen Kumar**

GitHub

https://github.com/praveenku99887

LinkedIn

https://linkedin.com/in/praveenku99887

---

# ⭐ Support

If you found this project useful, please consider giving it a ⭐ on GitHub.

Happy Coding! 🚀
