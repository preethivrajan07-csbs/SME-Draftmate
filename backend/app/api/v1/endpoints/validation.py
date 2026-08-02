from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.models.domain import Project, ComplianceCheck, AuditLog
from app.services.validation_service import validation_service
from app.core.security import get_current_user_claims

router = APIRouter()

@router.post("/project/{project_id}/run")
def run_project_validation(project_id: int, db: Session = Depends(get_db), claims: dict = Depends(get_current_user_claims)):
    project = db.query(Project).filter(Project.id == project_id).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")

    project_dict = {
        "company_name": project.company_name,
        "cin": project.cin,
        "pan": project.pan,
        "gst": project.gst,
        "target_issue_size_cr": project.target_issue_size_cr,
        "promoter_name": project.promoter_name
    }

    report = validation_service.run_compliance_checks(project_dict)

    # Save compliance checks to database
    db.query(ComplianceCheck).filter(ComplianceCheck.project_id == project_id).delete()
    
    for check in report["checks"]:
        cc = ComplianceCheck(
            project_id=project_id,
            category=check["category"],
            rule_id=check["rule_id"],
            rule_name=check["rule_name"],
            sebi_clause=check["sebi_clause"],
            status=check["status"],
            severity=check["severity"],
            findings=check["findings"],
            score=check["score"],
            recommendation=check["recommendation"]
        )
        db.add(cc)

    project.compliance_score = report["overall_compliance_score"]
    db.commit()
    
    # Audit log
    audit = AuditLog(
        user_email=claims.get("sub", "system"),
        user_role=claims.get("role", "compliance"),
        action="RUN_VALIDATION",
        entity_type="Project",
        entity_id=str(project_id),
        details=f"Ran SEBI ICDR Validation Engine. Score: {report['overall_compliance_score']}%"
    )
    db.add(audit)
    db.commit()

    return report

@router.get("/project/{project_id}")
def get_project_validation(project_id: int, db: Session = Depends(get_db), claims: dict = Depends(get_current_user_claims)):
    project = db.query(Project).filter(Project.id == project_id).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")

    checks = db.query(ComplianceCheck).filter(ComplianceCheck.project_id == project_id).all()
    if not checks:
        # Run automatically if no checks exist yet
        return run_project_validation(project_id, db, claims)
        
    return {
        "overall_compliance_score": project.compliance_score,
        "checks": checks
    }
