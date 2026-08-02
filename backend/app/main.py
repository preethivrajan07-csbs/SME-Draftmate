from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os
from app.core.config import settings
from app.db.session import engine, Base
from app.api.v1.endpoints import auth, projects, documents, questionnaire, drhp, validation, review, kb, admin
import app.models.domain  # noqa: F401

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    openapi_url=f"{settings.API_V1_STR}/openapi.json"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Flexible for dev & staging
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include Routers
app.include_router(auth.router, prefix=f"{settings.API_V1_STR}/auth", tags=["Authentication"])
app.include_router(projects.router, prefix=f"{settings.API_V1_STR}/projects", tags=["Projects"])
app.include_router(documents.router, prefix=f"{settings.API_V1_STR}/documents", tags=["Documents & OCR"])
app.include_router(questionnaire.router, prefix=f"{settings.API_V1_STR}/questionnaire", tags=["Dynamic Questionnaire"])
app.include_router(drhp.router, prefix=f"{settings.API_V1_STR}/drhp", tags=["AI DRHP Generator & Editor"])
app.include_router(validation.router, prefix=f"{settings.API_V1_STR}/validation", tags=["SEBI ICDR Deterministic Validation"])
app.include_router(review.router, prefix=f"{settings.API_V1_STR}/review", tags=["Review Workspace & Evidence Packaging"])
app.include_router(kb.router, prefix=f"{settings.API_V1_STR}/kb", tags=["RAG Knowledge Base"])
app.include_router(admin.router, prefix=f"{settings.API_V1_STR}/admin", tags=["Admin & Audit Trail"])

@app.get("/")
def root():
    return {
        "app": "SME DraftMate API",
        "version": settings.VERSION,
        "status": "Operational",
        "sebi_compliance_engine": "ICDR 2018 Active",
        "docs_url": "/docs"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
