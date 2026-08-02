from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
from app.db.session import get_db
from app.models.domain import User, AuditLog
from app.schemas.schemas import UserOut, AuditLogOut
from app.core.security import RoleChecker, get_current_user_claims

router = APIRouter()

admin_only = RoleChecker(["admin"])

@router.get("/users", response_model=List[UserOut], dependencies=[Depends(admin_only)])
def get_all_users(db: Session = Depends(get_db)):
    users = db.query(User).all()
    return users

@router.get("/audit-logs", response_model=List[AuditLogOut])
def get_audit_logs(db: Session = Depends(get_db), claims: dict = Depends(get_current_user_claims)):
    logs = db.query(AuditLog).order_by(AuditLog.timestamp.desc()).limit(100).all()
    return logs
