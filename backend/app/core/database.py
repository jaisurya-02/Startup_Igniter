import logging
from pymongo import MongoClient
from pymongo.database import Database
from app.core.config import settings

logger = logging.getLogger(__name__)

class DatabaseManager:
    client: MongoClient = None
    db: Database = None

    def connect(self):
        try:
            self.client = MongoClient(settings.MONGODB_URI, serverSelectionTimeoutMS=3000)
            # Ping database to verify connection
            self.client.admin.command("ping")
            self.db = self.client[settings.MONGODB_DATABASE]
            logger.info(f"Successfully connected to MongoDB database: {settings.MONGODB_DATABASE}")
        except Exception as e:
            logger.error(f"Failed to connect to MongoDB at {settings.MONGODB_URI}: {e}")
            self.db = None

    def get_db(self) -> Database:
        if self.db is None:
            self.connect()
        return self.db

db_manager = DatabaseManager()

def get_database() -> Database:
    return db_manager.get_db()

def get_startups_collection():
    db = get_database()
    if db is None:
        raise RuntimeError("MongoDB connection unavailable.")
    return db["startups"]

def get_users_collection():
    db = get_database()
    if db is None:
        raise RuntimeError("MongoDB connection unavailable.")
    return db["users"]
