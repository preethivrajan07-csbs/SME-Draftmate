from sqlalchemy import Column, Integer, String, Boolean, DateTime, Text, Float, ForeignKey, JSON
from sqlalchemy.orm import relationship
from datetime import datetime
from app.db.session import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    full_name = Column(String, nullable=False)
    role = Column(String, nullable=False, default="promoter") # promoter, banker, legal, compliance, admin
    designation = Column(String, nullable=True)
    organization = Column(String, nullable=True)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)

class Project(Base):
    __tablename__ = "projects"

    id = Column(Integer, primary_key=True, index=True)
    company_name = Column(String, nullable=False, index=True)
    cin = Column(String, nullable=True)
    pan = Column(String, nullable=True)
    gst = Column(String, nullable=True)
    incorporation_date = Column(String, nullable=True)
    registered_address = Column(Text, nullable=True)
    exchange = Column(String, default="NSE EMERGE") # NSE EMERGE / BSE SME
    issue_type = Column(String, default="Fresh Issue + OFS")
    target_issue_size_cr = Column(Float, default=25.0)
    promoter_name = Column(String, nullable=True)
    merchant_banker = Column(String, default="Pinnacle Capital Advisory Services Ltd")
    status = Column(String, default="In Progress")
    current_step = Column(Integer, default=1) # 1 to 11
    compliance_score = Column(Float, default=85.0)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    documents = relationship("Document", back_populates="project", cascade="all, delete-orphan")
    questionnaire_responses = relationship("QuestionnaireResponse", back_populates="project", cascade="all, delete-orphan")
    drhp_sections = relationship("DRHPSection", back_populates="project", cascade="all, delete-orphan")
    compliance_checks = relationship("ComplianceCheck", back_populates="project", cascade="all, delete-orphan")
    comments = relationship("ReviewComment", back_populates="project", cascade="all, delete-orphan")

class Document(Base):
    __tablename__ = "documents"

    id = Column(Integer, primary_key=True, index=True)
    project_id = Column(Integer, ForeignKey("projects.id"), nullable=False)
    filename = Column(String, nullable=False)
    file_path = Column(String, nullable=False)
    document_type = Column(String, nullable=False) # Financials, Incorporation, Shareholding, MoA, Contract
    status = Column(String, default="Processed") # Uploaded, Processing, Processed, Verified
    extracted_data_json = Column(JSON, nullable=True)
    confidence_score = Column(Float, default=94.5)
    uploaded_at = Column(DateTime, default=datetime.utcnow)

    project = relationship("Project", back_populates="documents")

class QuestionnaireResponse(Base):
    __tablename__ = "questionnaire_responses"

    id = Column(Integer, primary_key=True, index=True)
    project_id = Column(Integer, ForeignKey("projects.id"), nullable=False)
    category = Column(String, nullable=False)
    question_key = Column(String, nullable=False)
    answer_json = Column(JSON, nullable=False)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    project = relationship("Project", back_populates="questionnaire_responses")

class DRHPSection(Base):
    __tablename__ = "drhp_sections"

    id = Column(Integer, primary_key=True, index=True)
    project_id = Column(Integer, ForeignKey("projects.id"), nullable=False)
    section_code = Column(String, nullable=False, index=True) # COVER, RISK_FACTORS, BUSINESS, FINANCIALS, CAPITAL_STRUCT
    title = Column(String, nullable=False)
    content_markdown = Column(Text, nullable=False)
    metadata_json = Column(JSON, nullable=True) # Sources, confidence, missing fields
    sebi_references_json = Column(JSON, nullable=True) # Regulation clauses
    status = Column(String, default="Draft") # Draft, In Review, Approved, Needs Revision
    version = Column(Integer, default=1)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    project = relationship("Project", back_populates="drhp_sections")

class ComplianceCheck(Base):
    __tablename__ = "compliance_checks"

    id = Column(Integer, primary_key=True, index=True)
    project_id = Column(Integer, ForeignKey("projects.id"), nullable=False)
    category = Column(String, nullable=False) # Eligibility, Financials, Capital Structure, Disclosures
    rule_id = Column(String, nullable=False)
    rule_name = Column(String, nullable=False)
    sebi_clause = Column(String, nullable=False)
    status = Column(String, nullable=False) # PASS, WARNING, FAIL, PENDING
    severity = Column(String, default="HIGH") # CRITICAL, HIGH, MEDIUM, LOW
    findings = Column(Text, nullable=False)
    score = Column(Float, default=100.0)
    recommendation = Column(Text, nullable=True)

    project = relationship("Project", back_populates="compliance_checks")

class ReviewComment(Base):
    __tablename__ = "review_comments"

    id = Column(Integer, primary_key=True, index=True)
    project_id = Column(Integer, ForeignKey("projects.id"), nullable=False)
    section_code = Column(String, nullable=False)
    author_name = Column(String, nullable=False)
    author_role = Column(String, nullable=False)
    comment_text = Column(Text, nullable=False)
    status = Column(String, default="Open") # Open, Resolved
    created_at = Column(DateTime, default=datetime.utcnow)

    project = relationship("Project", back_populates="comments")

class AuditLog(Base):
    __tablename__ = "audit_logs"

    id = Column(Integer, primary_key=True, index=True)
    user_email = Column(String, nullable=False)
    user_role = Column(String, nullable=False)
    action = Column(String, nullable=False)
    entity_type = Column(String, nullable=False)
    entity_id = Column(String, nullable=True)
    details = Column(Text, nullable=True)
    timestamp = Column(DateTime, default=datetime.utcnow)
