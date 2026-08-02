from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import Dict, Any, List
from app.db.session import get_db
from app.models.domain import QuestionnaireResponse, Project
from app.schemas.schemas import QuestionnaireSaveRequest
from app.core.security import get_current_user_claims

router = APIRouter()

QUESTIONNAIRE_SCHEMA = [
    {
        "category": "Corporate Governance & Board",
        "title": "1. Corporate Structure & Governance",
        "questions": [
            {
                "key": "num_directors",
                "label": "Total Number of Board Directors",
                "type": "number",
                "default": 6,
                "help": "SEBI ICDR mandates minimum 50% Independent Directors if Chairman is Executive."
            },
            {
                "key": "has_woman_director",
                "label": "Includes Independent Woman Director?",
                "type": "select",
                "options": ["Yes - Independent", "Yes - Executive", "No"],
                "default": "Yes - Independent"
            },
            {
                "key": "audit_committee_formed",
                "label": "Audit Committee Formed under Section 177?",
                "type": "boolean",
                "default": True
            }
        ]
    },
    {
        "category": "Promoter & Capital History",
        "title": "2. Promoter Details & Minimum Lock-in",
        "questions": [
            {
                "key": "promoter_group_holding",
                "label": "Pre-IPO Promoter Group Holding (%)",
                "type": "number",
                "default": 78.4
            },
            {
                "key": "pledged_shares",
                "label": "Are any Promoter shares pledged or encumbered?",
                "type": "boolean",
                "default": False
            },
            {
                "key": "lockin_agreement_signed",
                "label": "3-Year Minimum Contribution Lock-In Agreement Signed?",
                "type": "boolean",
                "default": True
            }
        ]
    },
    {
        "category": "Objects of the Issue",
        "title": "3. Objects of the Offer & Fund Utilization",
        "questions": [
            {
                "key": "object_capex_cr",
                "label": "Capital Expenditure / Plant Expansion (₹ Cr)",
                "type": "number",
                "default": 14.50
            },
            {
                "key": "object_working_capital_cr",
                "label": "Working Capital Requirements (₹ Cr)",
                "type": "number",
                "default": 6.50
            },
            {
                "key": "object_general_corporate_cr",
                "label": "General Corporate Expenses (GCP <= 25%) (₹ Cr)",
                "type": "number",
                "default": 4.00
            }
        ]
    }
]

@router.get("/schema")
def get_questionnaire_schema():
    return QUESTIONNAIRE_SCHEMA

@router.get("/project/{project_id}")
def get_project_questionnaire(project_id: int, db: Session = Depends(get_db), claims: dict = Depends(get_current_user_claims)):
    responses = db.query(QuestionnaireResponse).filter(QuestionnaireResponse.project_id == project_id).all()
    res_map = {r.category: r.answer_json for r in responses}
    return res_map

@router.post("/project/{project_id}/save")
def save_questionnaire_answers(
    project_id: int,
    data: QuestionnaireSaveRequest,
    db: Session = Depends(get_db),
    claims: dict = Depends(get_current_user_claims)
):
    project = db.query(Project).filter(Project.id == project_id).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")

    existing = db.query(QuestionnaireResponse).filter(
        QuestionnaireResponse.project_id == project_id,
        QuestionnaireResponse.category == data.category
    ).first()

    if existing:
        existing.answer_json = data.answers
    else:
        existing = QuestionnaireResponse(
            project_id=project_id,
            category=data.category,
            question_key=data.category,
            answer_json=data.answers
        )
        db.add(existing)

    db.commit()
    return {"status": "saved", "category": data.category}
