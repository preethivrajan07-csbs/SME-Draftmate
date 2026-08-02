from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List, Optional
from app.db.session import get_db
from app.models.domain import DRHPSection, Project, AuditLog
from app.schemas.schemas import DRHPSectionOut, SectionGenerateRequest, SectionUpdate
from app.services.ai_service import ai_service
from app.core.security import get_current_user_claims

router = APIRouter()

@router.get("/project/{project_id}", response_model=List[DRHPSectionOut])
def get_project_drhp_sections(project_id: int, db: Session = Depends(get_db), claims: dict = Depends(get_current_user_claims)):
    sections = db.query(DRHPSection).filter(DRHPSection.project_id == project_id).all()
    return sections

@router.post("/project/{project_id}/generate", response_model=DRHPSectionOut)
async def generate_section(
    project_id: int,
    req: SectionGenerateRequest,
    db: Session = Depends(get_db),
    claims: dict = Depends(get_current_user_claims)
):
    project = db.query(Project).filter(Project.id == project_id).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")

    project_dict = {
        "company_name": project.company_name,
        "cin": project.cin,
        "pan": project.pan,
        "incorporation_date": project.incorporation_date,
        "registered_address": project.registered_address,
        "target_issue_size_cr": project.target_issue_size_cr,
        "promoter_name": project.promoter_name
    }

    ai_result = await ai_service.generate_drhp_section(
        section_code=req.section_code,
        project_data=project_dict,
        custom_prompt=req.custom_instructions
    )

    existing = db.query(DRHPSection).filter(
        DRHPSection.project_id == project_id,
        DRHPSection.section_code == req.section_code
    ).first()

    if existing:
        existing.content_markdown = ai_result["content_markdown"]
        existing.metadata_json = ai_result["metadata"]
        existing.sebi_references_json = ai_result["sebi_references"]
        existing.version += 1
        existing.status = "Draft"
        db.commit()
        db.refresh(existing)
        target_section = existing
    else:
        target_section = DRHPSection(
            project_id=project_id,
            section_code=req.section_code,
            title=ai_result["title"],
            content_markdown=ai_result["content_markdown"],
            metadata_json=ai_result["metadata"],
            sebi_references_json=ai_result["sebi_references"],
            status="Draft",
            version=1
        )
        db.add(target_section)
        db.commit()
        db.refresh(target_section)

    # Audit log
    audit = AuditLog(
        user_email=claims.get("sub", "system"),
        user_role=claims.get("role", "promoter"),
        action="GENERATE_SECTION",
        entity_type="DRHPSection",
        entity_id=str(target_section.id),
        details=f"Generated DRHP section '{target_section.title}' (Version {target_section.version})"
    )
    db.add(audit)
    db.commit()

    return target_section

@router.put("/section/{section_id}", response_model=DRHPSectionOut)
def update_section(
    section_id: int,
    sec_in: SectionUpdate,
    db: Session = Depends(get_db),
    claims: dict = Depends(get_current_user_claims)
):
    section = db.query(DRHPSection).filter(DRHPSection.id == section_id).first()
    if not section:
        raise HTTPException(status_code=404, detail="Section not found")

    section.content_markdown = sec_in.content_markdown
    section.version += 1
    db.commit()
    db.refresh(section)
    return section
