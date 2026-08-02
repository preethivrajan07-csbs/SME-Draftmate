from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form, status
from sqlalchemy.orm import Session
from typing import List, Optional
import os
import shutil
from app.db.session import get_db
from app.models.domain import Document, Project, AuditLog
from app.schemas.schemas import DocumentOut, OCRVerifyRequest
from app.services.ocr_service import ocr_service
from app.core.security import get_current_user_claims
from app.core.config import settings

router = APIRouter()

@router.get("/project/{project_id}", response_model=List[DocumentOut])
def get_project_documents(project_id: int, db: Session = Depends(get_db), claims: dict = Depends(get_current_user_claims)):
    docs = db.query(Document).filter(Document.project_id == project_id).all()
    return docs

@router.post("/upload", response_model=DocumentOut)
async def upload_document(
    project_id: int = Form(...),
    document_type: str = Form(...),
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    claims: dict = Depends(get_current_user_claims)
):
    project = db.query(Project).filter(Project.id == project_id).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")

    os.makedirs(settings.UPLOAD_DIR, exist_ok=True)
    file_path = os.path.join(settings.UPLOAD_DIR, f"{project_id}_{file.filename}")
    
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
        
    # Trigger OCR extraction pipeline
    extracted = ocr_service.extract_document_data(file_path, document_type)
    
    doc = Document(
        project_id=project_id,
        filename=file.filename,
        file_path=file_path,
        document_type=document_type,
        status="Processed",
        extracted_data_json=extracted,
        confidence_score=extracted.get("confidence_score", 95.0)
    )
    db.add(doc)
    db.commit()
    db.refresh(doc)
    
    # Audit log
    audit = AuditLog(
        user_email=claims.get("sub", "system"),
        user_role=claims.get("role", "promoter"),
        action="UPLOAD_DOCUMENT",
        entity_type="Document",
        entity_id=str(doc.id),
        details=f"Uploaded '{doc.filename}' ({doc.document_type}) with OCR Confidence {doc.confidence_score}%"
    )
    db.add(audit)
    db.commit()
    
    return doc

@router.post("/verify-ocr", response_model=DocumentOut)
def verify_ocr(data: OCRVerifyRequest, db: Session = Depends(get_db), claims: dict = Depends(get_current_user_claims)):
    doc = db.query(Document).filter(Document.id == data.document_id).first()
    if not doc:
        raise HTTPException(status_code=404, detail="Document not found")
        
    doc.extracted_data_json = data.verified_data
    doc.status = "Verified"
    db.commit()
    db.refresh(doc)
    return doc
