from pydantic import BaseModel, EmailStr
from typing import Optional, List, Dict, Any
from datetime import datetime

# Auth & User
class Token(BaseModel):
    access_token: str
    token_type: str
    user: Dict[str, Any]

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserCreate(BaseModel):
    email: EmailStr
    password: str
    full_name: str
    role: str = "promoter"
    designation: Optional[str] = None
    organization: Optional[str] = None

class UserOut(BaseModel):
    id: int
    email: str
    full_name: str
    role: str
    designation: Optional[str] = None
    organization: Optional[str] = None
    is_active: bool

    class Config:
        from_attributes = True

# Project
class ProjectCreate(BaseModel):
    company_name: str
    cin: Optional[str] = None
    pan: Optional[str] = None
    gst: Optional[str] = None
    incorporation_date: Optional[str] = None
    registered_address: Optional[str] = None
    exchange: str = "NSE EMERGE"
    issue_type: str = "Fresh Issue + OFS"
    target_issue_size_cr: float = 25.0
    promoter_name: Optional[str] = None
    merchant_banker: Optional[str] = "Pinnacle Capital Advisory Services Ltd"

class ProjectUpdate(BaseModel):
    company_name: Optional[str] = None
    cin: Optional[str] = None
    pan: Optional[str] = None
    gst: Optional[str] = None
    incorporation_date: Optional[str] = None
    registered_address: Optional[str] = None
    exchange: Optional[str] = None
    issue_type: Optional[str] = None
    target_issue_size_cr: Optional[float] = None
    promoter_name: Optional[str] = None
    merchant_banker: Optional[str] = None
    current_step: Optional[int] = None
    status: Optional[str] = None

class ProjectOut(BaseModel):
    id: int
    company_name: str
    cin: Optional[str]
    pan: Optional[str]
    gst: Optional[str]
    incorporation_date: Optional[str]
    registered_address: Optional[str]
    exchange: str
    issue_type: str
    target_issue_size_cr: float
    promoter_name: Optional[str]
    merchant_banker: str
    status: str
    current_step: int
    compliance_score: float
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True

# Document & OCR
class DocumentOut(BaseModel):
    id: int
    project_id: int
    filename: str
    file_path: str
    document_type: str
    status: str
    extracted_data_json: Optional[Dict[str, Any]]
    confidence_score: float
    uploaded_at: datetime

    class Config:
        from_attributes = True

class OCRVerifyRequest(BaseModel):
    document_id: int
    verified_data: Dict[str, Any]

# Questionnaire
class QuestionnaireSaveRequest(BaseModel):
    category: str
    answers: Dict[str, Any]

# DRHP Generation & Editing
class SectionGenerateRequest(BaseModel):
    section_code: str
    custom_instructions: Optional[str] = None

class SectionUpdate(BaseModel):
    content_markdown: str

class DRHPSectionOut(BaseModel):
    id: int
    project_id: int
    section_code: str
    title: str
    content_markdown: str
    metadata_json: Optional[Dict[str, Any]]
    sebi_references_json: Optional[List[Dict[str, Any]]]
    status: str
    version: int
    updated_at: datetime

    class Config:
        from_attributes = True

# Compliance
class ComplianceCheckOut(BaseModel):
    id: int
    project_id: int
    category: str
    rule_id: str
    rule_name: str
    sebi_clause: str
    status: str
    severity: str
    findings: str
    score: float
    recommendation: Optional[str]

    class Config:
        from_attributes = True

# Review & Comments
class CommentCreate(BaseModel):
    section_code: str
    comment_text: str

class CommentOut(BaseModel):
    id: int
    project_id: int
    section_code: str
    author_name: str
    author_role: str
    comment_text: str
    status: str
    created_at: datetime

    class Config:
        from_attributes = True

# Audit Log
class AuditLogOut(BaseModel):
    id: int
    user_email: str
    user_role: str
    action: str
    entity_type: str
    entity_id: Optional[str]
    details: Optional[str]
    timestamp: datetime

    class Config:
        from_attributes = True
