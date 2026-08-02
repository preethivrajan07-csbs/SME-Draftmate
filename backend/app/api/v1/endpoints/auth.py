from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.models.domain import User
from app.schemas.schemas import UserLogin, UserCreate, UserOut, Token
from app.core.security import verify_password, get_password_hash, create_access_token, get_current_user_claims

router = APIRouter()

@router.post("/login", response_model=Token)
def login(login_data: UserLogin, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == login_data.email).first()
    if not user or not verify_password(login_data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password"
        )
    
    access_token = create_access_token(subject=user.email, role=user.role)
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user": {
            "id": user.id,
            "email": user.email,
            "full_name": user.full_name,
            "role": user.role,
            "designation": user.designation,
            "organization": user.organization
        }
    }

@router.post("/register", response_model=UserOut)
def register(user_in: UserCreate, db: Session = Depends(get_db)):
    existing = db.query(User).filter(User.email == user_in.email).first()
    if existing:
        raise HTTPException(status_code=400, detail="User with this email already exists")
    
    user = User(
        email=user_in.email,
        hashed_password=get_password_hash(user_in.password),
        full_name=user_in.full_name,
        role=user_in.role,
        designation=user_in.designation,
        organization=user_in.organization
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    return user

@router.get("/me", response_model=UserOut)
def get_me(claims: dict = Depends(get_current_user_claims), db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == claims.get("sub")).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user
