import os
from pydantic_settings import BaseSettings
from typing import List, Optional

class Settings(BaseSettings):
    PROJECT_NAME: str = "SME DraftMate API"
    VERSION: str = "1.0.0"
    API_V1_STR: str = "/api/v1"
    
    # Security & Auth
    SECRET_KEY: str = os.getenv("SECRET_KEY", "sme-draftmate-super-secret-key-2026-sebi-icdr-compliance")
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 7  # 7 days
    
    # Database
    DATABASE_URL: str = os.getenv("DATABASE_URL", "sqlite:///./sme_draftmate.db")
    
    # AI & Embeddings Configuration
    GEMINI_API_KEY: Optional[str] = os.getenv("GEMINI_API_KEY", None)
    AI_PROVIDER: str = os.getenv("AI_PROVIDER", "gemini") # "gemini", "openai", "fallback"
    OPENAI_API_KEY: Optional[str] = os.getenv("OPENAI_API_KEY", None)
    OPENAI_BASE_URL: Optional[str] = os.getenv("OPENAI_BASE_URL", "https://api.openai.com/v1")
    
    # File Storage
    UPLOAD_DIR: str = os.getenv("UPLOAD_DIR", "./uploads")
    EVIDENCE_DIR: str = os.getenv("EVIDENCE_DIR", "./evidence")
    
    # CORS
    CORS_ORIGINS: List[str] = ["http://localhost:5173", "http://localhost:3000", "http://127.0.0.1:5173"]

    class Config:
        case_sensitive = True

settings = Settings()
