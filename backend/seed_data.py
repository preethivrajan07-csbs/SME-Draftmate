from sqlalchemy.orm import Session
from app.db.session import SessionLocal, engine, Base
from app.models.domain import User, Project, Document, DRHPSection, ComplianceCheck, AuditLog, ReviewComment
from app.core.security import get_password_hash
from app.services.validation_service import validation_service
import app.models.domain  # noqa: F401

def seed_database():
    print("Creating DB tables...")
    Base.metadata.create_all(bind=engine)
    db: Session = SessionLocal()

    # Check if already seeded
    if db.query(User).filter(User.email == "promoter@apexauto.co.in").first():
        print("Database already seeded!")
        db.close()
        return

    print("Seeding Users...")
    hashed_pwd = get_password_hash("password123")
    
    users = [
        User(email="promoter@apexauto.co.in", hashed_password=hashed_pwd, full_name="Rajesh Kumar", role="promoter", designation="Managing Director", organization="Apex Auto Components Ltd"),
        User(email="banker@pinnaclecap.in", hashed_password=hashed_pwd, full_name="Vikramaditya Shah", role="banker", designation="Vice President - Investment Banking", organization="Pinnacle Capital Advisory Services Ltd"),
        User(email="legal@jurislex.com", hashed_password=hashed_pwd, full_name="Ananya Roy", role="legal", designation="Senior Partner", organization="JurisLex Legal Counsel"),
        User(email="compliance@sebi-advisory.in", hashed_password=hashed_pwd, full_name="Suresh Menon", role="compliance", designation="Chief Compliance Officer", organization="Capital Compliance Advisory Services"),
        User(email="admin@smedraftmate.io", hashed_password=hashed_pwd, full_name="System Admin", role="admin", designation="Platform Lead", organization="SME DraftMate")
    ]
    db.add_all(users)
    db.commit()

    print("Seeding Demo SME Project...")
    project = Project(
        company_name="Apex Auto Components Limited",
        cin="U34100MH2016PLC284910",
        pan="AAACA1234F",
        gst="27AAACA1234F1Z5",
        incorporation_date="14/05/2016",
        registered_address="Plot 42, MIDC Industrial Area, Chakan, Pune - 410501, Maharashtra",
        exchange="NSE EMERGE",
        issue_type="Fresh Issue + OFS",
        target_issue_size_cr=25.0,
        promoter_name="Mr. Rajesh Kumar & Mrs. Sunita Kumar",
        merchant_banker="Pinnacle Capital Advisory Services Ltd",
        status="In Progress",
        current_step=7,
        compliance_score=88.5
    )
    db.add(project)
    db.commit()
    db.refresh(project)

    print("Seeding Sample Documents & OCR Data...")
    docs = [
        Document(
            project_id=project.id,
            filename="Certificate_of_Incorporation.pdf",
            file_path="./uploads/demo_inc.pdf",
            document_type="incorporation",
            status="Verified",
            extracted_data_json={
                "company_name": "Apex Auto Components Limited",
                "cin": "U34100MH2016PLC284910",
                "incorporation_date": "14/05/2016",
                "pan": "AAACA1234F",
                "registered_address": "Plot 42, MIDC Industrial Area, Chakan, Pune - 410501, Maharashtra"
            },
            confidence_score=98.8
        ),
        Document(
            project_id=project.id,
            filename="Audited_Financials_FY24_26.pdf",
            file_path="./uploads/demo_fin.pdf",
            document_type="financials",
            status="Verified",
            extracted_data_json={
                "financial_year_2026": {"revenue": 8450.20, "ebitda": 1420.80, "pat": 840.50, "net_worth": 3820.40},
                "financial_year_2025": {"revenue": 6820.40, "ebitda": 1080.50, "pat": 610.20, "net_worth": 2980.00},
                "financial_year_2024": {"revenue": 5110.00, "ebitda": 790.20, "pat": 415.80, "net_worth": 2369.80}
            },
            confidence_score=96.4
        )
    ]
    db.add_all(docs)
    db.commit()

    print("Seeding DRHP Draft Sections...")
    sections = [
        DRHPSection(
            project_id=project.id,
            section_code="COVER",
            title="Cover Page & Issue Summary",
            content_markdown="""# DRAFT RED HERRING PROSPECTUS\n\n**Apex Auto Components Limited**\n*(CIN: U34100MH2016PLC284910)*\n\nInitial Public Offer of up to **25.0 Crore** Equity Shares...""",
            metadata_json={"confidence_score": 99.0},
            sebi_references_json=[{"clause": "ICDR Schedule VI Part A", "description": "Cover Disclosures"}],
            status="Approved",
            version=1
        ),
        DRHPSection(
            project_id=project.id,
            section_code="RISK_FACTORS",
            title="Section III: Risk Factors",
            content_markdown="""# SECTION III – RISK FACTORS\n\n### 1. Raw Material Supplier Concentration\nTop 5 suppliers account for 64.2% of raw material procurement...""",
            metadata_json={"confidence_score": 96.5},
            sebi_references_json=[{"clause": "SEBI ICDR Regulation 248", "description": "Materiality Assessment"}],
            status="In Review",
            version=2
        ),
        DRHPSection(
            project_id=project.id,
            section_code="CAPITAL_STRUCTURE",
            title="Section V: Capital Structure",
            content_markdown="""# SECTION V – CAPITAL STRUCTURE\n\nPromoters hold 78.4% pre-issue capital. Promoters minimum contribution of 20% shall be locked in for 3 years.""",
            metadata_json={"confidence_score": 98.2},
            sebi_references_json=[{"clause": "SEBI ICDR Regulation 250", "description": "Promoters Lock-in"}],
            status="Draft",
            version=1
        ),
        DRHPSection(
            project_id=project.id,
            section_code="FINANCIALS",
            title="Section VII: Financial Information",
            content_markdown="""# SECTION VII – FINANCIAL INFORMATION\n\nRestated Financial Statements for FY 2024, FY 2025, and FY 2026.""",
            metadata_json={"confidence_score": 97.4},
            sebi_references_json=[{"clause": "SEBI ICDR Schedule VI Item 11", "description": "Restated Statements"}],
            status="Draft",
            version=1
        )
    ]
    db.add_all(sections)
    db.commit()

    print("Seeding Compliance Checks...")
    report = validation_service.run_compliance_checks({
        "company_name": project.company_name,
        "cin": project.cin,
        "pan": project.pan,
        "gst": project.gst,
        "target_issue_size_cr": project.target_issue_size_cr,
        "promoter_name": project.promoter_name
    })

    for check in report["checks"]:
        cc = ComplianceCheck(
            project_id=project.id,
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

    print("Seeding Audit Log & Review Comments...")
    comments = [
        ReviewComment(
            project_id=project.id,
            section_code="RISK_FACTORS",
            author_name="Vikramaditya Shah (Merchant Banker)",
            author_role="banker",
            comment_text="Please verify raw material dependency percentage against FY26 tax audit report Annexure 4.",
            status="Open"
        )
    ]
    db.add_all(comments)

    audit = AuditLog(
        user_email="system@smedraftmate.io",
        user_role="admin",
        action="SEED_DATABASE",
        entity_type="Database",
        details="Seeded initial project 'Apex Auto Components Limited' with sample SEBI ICDR records."
    )
    db.add(audit)

    db.commit()
    db.close()
    print("Database seeding completed successfully!")

if __name__ == "__main__":
    seed_database()
