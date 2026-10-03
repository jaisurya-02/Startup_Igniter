# STARTUP IGNITER

> **"A Unified AI-Enabled Ecosystem for Startup Innovation and Venture Acceleration"**

Transform an initial startup idea into an execution-ready venture by coordinating specialized AI agents.

---

## 1. System Architecture

```
Next.js 16 (App Router + Tailwind CSS)
                 │
                 ▼ (REST API)
FastAPI Backend (Python 3.11 + Pydantic)
                 │
                 ▼ (PyMongo)
MongoDB Database (startup_igniter_db)
```

---

## 2. Project Status & Roadmap

- [x] **Phase 0** — Project Foundation & Visual Identity
- [x] **Phase 1** — Application Shell & Navigation
- [x] **Phase 2** — Public Landing Page
- [x] **Phase 3** — Authentication Architecture & Route Guarding
- [x] **Phase 4** — Startup Creation & Venture Workspace
- [x] **Phase 5** — Startup Context Foundation & Completeness Engine
- [x] **Phase 6** — Backend (FastAPI) + Database (MongoDB) Foundation

---

## 3. Quick Start

### 1. Start MongoDB
Ensure MongoDB is running on `mongodb://localhost:27017`.

### 2. Start FastAPI Backend
```bash
cd backend
pip install -r requirements.txt
python -m uvicorn app.main:app --reload --port 8000
```
Backend API will run at `http://localhost:8000`. Health check: `http://localhost:8000/health`.

### 3. Start Next.js Frontend
```bash
# In the root workspace directory
npm run dev
```
Frontend application will run at `http://localhost:3000`.
