from fastapi import APIRouter, Query
from typing import Optional
from app.services.rag_service import rag_service

router = APIRouter()

@router.get("/search")
def search_knowledge_base(query: Optional[str] = Query(None), category: Optional[str] = Query(None)):
    results = rag_service.search_regulations(query or "", category)
    return results
