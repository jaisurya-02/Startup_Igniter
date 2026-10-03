import logging
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import settings
from app.core.database import db_manager
from app.routes import health, startups

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.PROJECT_VERSION,
    description="Startup Igniter FastAPI Backend API",
)

# Configure CORS Middleware
allowed_origins = [
    settings.FRONTEND_URL,
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Connect to database on startup
@app.on_event("startup")
def startup_event():
    db_manager.connect()

# Include Routers
app.include_router(health.router)
app.include_router(startups.router)

@app.get("/")
def root():
    return {
        "message": "Startup Igniter API is running",
        "docs": "/docs",
        "health": "/health",
    }
