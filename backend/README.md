# Startup Igniter — FastAPI Backend & MongoDB Engine

The official Python FastAPI backend for **Startup Igniter: A Unified AI-Enabled Ecosystem for Startup Innovation and Venture Acceleration**.

---

## 1. System Architecture

```
Next.js Frontend (App Router)
       │
       ▼ (HTTP API / JSON)
FastAPI Backend (PyMongo / Pydantic)
       │
       ▼
MongoDB Database (startup_igniter_db)
```

---

## 2. Environment Setup

### Prerequisites
- Python 3.11+
- MongoDB 7.0+ (running locally on `mongodb://localhost:27017` or Atlas)

### Installation
```bash
# Navigate to backend folder
cd backend

# Install required Python packages
pip install -r requirements.txt
```

---

## 3. Environment Configuration

Copy `.env.example` to `.env`:
```env
MONGODB_URI=mongodb://localhost:27017
MONGODB_DATABASE=startup_igniter_db
FRONTEND_URL=http://localhost:3000
```

---

## 4. Running the Backend Server

Start Uvicorn with auto-reload:
```bash
python -m uvicorn app.main:app --reload --port 8000
```

The API interactive documentation will be available at:
- Swagger Docs: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

---

## 5. API Endpoints

### System Health
- `GET /health` — Health check endpoint (`{"status": "ok"}`)

### Startup & Context Management
- `POST /api/startups` — Create a new startup venture with initial context
- `GET /api/startups` — List all startups for current user
- `GET /api/startups/{startup_id}` — Get single startup workspace
- `PUT /api/startups/{startup_id}` — Update startup metadata
- `DELETE /api/startups/{startup_id}` — Delete a startup venture
- `GET /api/startups/{startup_id}/context` — Get structured StartupContext
- `PUT /api/startups/{startup_id}/context` — Update StartupContext fields
