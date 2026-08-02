from fastapi import APIRouter, Depends, HTTPException, Response
from sqlalchemy.orm import Session
from typing import List
from app.db.session import get_db
from app.models.domain import ReviewComment, DRHPSection, Project, ComplianceCheck
from app.schemas.schemas import CommentCreate, CommentOut
from app.services.evidence_service import evidence_service
from app.services.validation_service import validation_service
from app.core.security import get_current_user_claims

router = APIRouter()

@router.get("/comments/project/{project_id}", response_model=List[CommentOut])
def get_comments(project_id: int, db: Session = Depends(get_db), claims: dict = Depends(get_current_user_claims)):
    comments = db.query(ReviewComment).filter(ReviewComment.project_id == project_id).order_by(ReviewComment.created_at.desc()).all()
    return comments

@router.post("/comments/project/{project_id}", response_model=CommentOut)
def add_comment(project_id: int, comment_in: CommentCreate, db: Session = Depends(get_db), claims: dict = Depends(get_current_user_claims)):
    comment = ReviewComment(
        project_id=project_id,
        section_code=comment_in.section_code,
        author_name=claims.get("sub", "Reviewer"),
        author_role=claims.get("role", "banker"),
        comment_text=comment_in.comment_text,
        status="Open"
    )
    db.add(comment)
    db.commit()
    db.refresh(comment)
    return comment

@router.post("/section/{section_id}/status")
def update_section_status(section_id: int, status_val: str, db: Session = Depends(get_db), claims: dict = Depends(get_current_user_claims)):
    section = db.query(DRHPSection).filter(DRHPSection.id == section_id).first()
    if not section:
        raise HTTPException(status_code=404, detail="Section not found")
    
    section.status = status_val
    db.commit()
    return {"status": "updated", "section_status": status_val}

@router.get("/drhp-pdf/{project_id}")
def download_drhp_pdf(project_id: int, db: Session = Depends(get_db)):
    project = db.query(Project).filter(Project.id == project_id).first()
    project_dict = {
        "company_name": project.company_name if project else "Apex Auto Components Limited",
        "cin": project.cin if project else "U34100MH2016PLC284910",
        "pan": project.pan if project else "AAACA1234F",
        "target_issue_size_cr": project.target_issue_size_cr if project else 25.0,
        "exchange": project.exchange if project else "NSE EMERGE",
        "merchant_banker": project.merchant_banker if project else "Pinnacle Capital Advisory Services Ltd"
    }
    sections = db.query(DRHPSection).filter(DRHPSection.project_id == project_id).all()
    sections_list = [{"title": s.title, "section_code": s.section_code, "content_markdown": s.content_markdown} for s in sections]
    if not sections_list:
        sections_list = [
            {"title": "Cover Page & Issue Summary", "section_code": "COVER", "content_markdown": "# DRAFT RED HERRING PROSPECTUS\n\n**Apex Auto Components Limited**"},
            {"title": "Section III: Risk Factors", "section_code": "RISK_FACTORS", "content_markdown": "# SECTION III – RISK FACTORS\n\n1. High raw material supplier concentration (64.2%)."}
        ]

    val_report = validation_service.run_compliance_checks(project_dict)
    pdf_bytes = evidence_service.build_pdf_bytes(project_dict, sections_list, val_report)
    
    headers = {
        "Content-Disposition": f'attachment; filename="SEBI_SME_DRHP_Prospectus_{project_id}.pdf"',
        "Access-Control-Expose-Headers": "Content-Disposition"
    }
    return Response(content=pdf_bytes, media_type="application/pdf", headers=headers)

@router.get("/drhp-word/{project_id}")
def download_drhp_word(project_id: int, db: Session = Depends(get_db)):
    project = db.query(Project).filter(Project.id == project_id).first()
    project_dict = {
        "company_name": project.company_name if project else "Apex Auto Components Limited",
        "cin": project.cin if project else "U34100MH2016PLC284910",
        "pan": project.pan if project else "AAACA1234F",
        "target_issue_size_cr": project.target_issue_size_cr if project else 25.0,
        "exchange": project.exchange if project else "NSE EMERGE",
        "merchant_banker": project.merchant_banker if project else "Pinnacle Capital Advisory Services Ltd"
    }
    sections = db.query(DRHPSection).filter(DRHPSection.project_id == project_id).all()
    sections_list = [{"title": s.title, "section_code": s.section_code, "content_markdown": s.content_markdown} for s in sections]
    if not sections_list:
        sections_list = [
            {"title": "Cover Page & Issue Summary", "section_code": "COVER", "content_markdown": "# DRAFT RED HERRING PROSPECTUS\n\n**Apex Auto Components Limited**"},
            {"title": "Section III: Risk Factors", "section_code": "RISK_FACTORS", "content_markdown": "# SECTION III – RISK FACTORS\n\n1. High raw material supplier concentration (64.2%)."}
        ]

    val_report = validation_service.run_compliance_checks(project_dict)
    drhp_html = evidence_service.build_full_drhp_html(project_dict, sections_list, val_report)
    
    headers = {
        "Content-Disposition": f'attachment; filename="SEBI_SME_DRHP_Prospectus_{project_id}.doc"',
        "Access-Control-Expose-Headers": "Content-Disposition"
    }
    return Response(content=drhp_html.encode("utf-8"), media_type="application/msword", headers=headers)

@router.get("/evidence-package/{project_id}")
def download_evidence_package(project_id: int, db: Session = Depends(get_db)):
    project = db.query(Project).filter(Project.id == project_id).first()
    if not project:
        # Provide fallback project dict if not found in db
        project_dict = {
            "company_name": "Apex Auto Components Limited",
            "cin": "U34100MH2016PLC284910",
            "pan": "AAACA1234F",
            "target_issue_size_cr": 25.0
        }
    else:
        project_dict = {
            "company_name": project.company_name,
            "cin": project.cin,
            "pan": project.pan,
            "target_issue_size_cr": project.target_issue_size_cr
        }

    sections = db.query(DRHPSection).filter(DRHPSection.project_id == project_id).all()
    sections_list = [{"title": s.title, "section_code": s.section_code, "content_markdown": s.content_markdown} for s in sections]
    if not sections_list:
        sections_list = [
            {"title": "Cover Page & Issue Summary", "section_code": "COVER", "content_markdown": "# DRAFT RED HERRING PROSPECTUS\n\n**Apex Auto Components Limited**\n*(CIN: U34100MH2016PLC284910)*\n\nInitial Public Offer of up to 25.0 Crore Equity Shares."},
            {"title": "Section III: Risk Factors", "section_code": "RISK_FACTORS", "content_markdown": "# SECTION III – RISK FACTORS\n\n1. High dependence on top 5 suppliers (64.2%).\n2. Outstanding tax appeal before ITAT of ₹1.42 Crore."}
        ]

    val_report = validation_service.run_compliance_checks(project_dict)
    zip_bytes, sha256_hash = evidence_service.generate_evidence_package(project_dict, sections_list, val_report)

    headers = {
        "Content-Disposition": f'attachment; filename="SEBI_Evidence_Package_{project_id}_{sha256_hash[:8]}.zip"',
        "Access-Control-Expose-Headers": "Content-Disposition, X-Integrity-SHA256",
        "X-Integrity-SHA256": sha256_hash
    }

    return Response(content=zip_bytes, media_type="application/zip", headers=headers)
