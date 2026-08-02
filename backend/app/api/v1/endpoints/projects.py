from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from app.db.session import get_db
from app.models.domain import Project, User, AuditLog
from app.schemas.schemas import ProjectCreate, ProjectUpdate, ProjectOut
from app.core.security import get_current_user_claims

router = APIRouter()

@router.get("/", response_model=List[ProjectOut])
def list_projects(db: Session = Depends(get_db), claims: dict = Depends(get_current_user_claims)):
    projects = db.query(Project).order_by(Project.created_at.desc()).all()
    return projects

@router.post("/", response_model=ProjectOut)
def create_project(project_in: ProjectCreate, db: Session = Depends(get_db), claims: dict = Depends(get_current_user_claims)):
    project = Project(**project_in.model_dump())
    db.add(project)
    db.commit()
    db.refresh(project)
    
    # Audit log
    audit = AuditLog(
        user_email=claims.get("sub", "system"),
        user_role=claims.get("role", "promoter"),
        action="CREATE_PROJECT",
        entity_type="Project",
        entity_id=str(project.id),
        details=f"Created SME Project '{project.company_name}' with Issue Size ₹{project.target_issue_size_cr} Cr"
    )
    db.add(audit)
    db.commit()
    return project

@router.get("/{project_id}", response_model=ProjectOut)
def get_project(project_id: int, db: Session = Depends(get_db), claims: dict = Depends(get_current_user_claims)):
    project = db.query(Project).filter(Project.id == project_id).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    return project

@router.put("/{project_id}", response_model=ProjectOut)
def update_project(project_id: int, project_in: ProjectUpdate, db: Session = Depends(get_db), claims: dict = Depends(get_current_user_claims)):
    project = db.query(Project).filter(Project.id == project_id).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    
    update_data = project_in.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(project, key, value)
        
    db.commit()
    db.refresh(project)
    return project
