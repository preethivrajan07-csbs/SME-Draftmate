# SME DraftMate
### AI-Powered SEBI SME IPO Draft Red Herring Prospectus (DRHP) Generator

**SME DraftMate** is an enterprise-grade SaaS platform built to assist SME promoters, Category-1 Merchant Bankers, Legal Counsel, and Compliance Officers in drafting, validating, and filing SEBI-aligned Draft Red Herring Prospectus (DRHP) documents for SME IPOs on **NSE EMERGE** and **BSE SME** platforms.

---

## Key Features

1. **Complete 11-Step SME IPO Workflow**:
   - **Step 1 & 2**: Project Creation & Issuer Company Details (CIN, PAN, GST, Board of Directors).
   - **Step 3**: Document Upload Pipeline (Audited Financials, Incorporation Certificates, Shareholding Patterns).
   - **Step 4 & 5**: OCR Entity Extraction & Side-by-Side Data Verification (Confidence scores, table parsing).
   - **Step 6**: Adaptive AI Questionnaire (Conditional logic, auto-save, progress tracking).
   - **Step 7**: SEBI ICDR Deterministic Compliance Audit (Post-issue capital cap <= 25 Cr, 20% promoter 3-yr lock-in, EBITDA track record).
   - **Step 8**: AI DRHP Section Drafting Studio (Google Gemini 2.5 Flash / OpenAI abstraction with SEBI citation tags).
   - **Step 9**: Merchant Banker & Legal Reviewer Workspace (Inline comments, section sign-offs, track changes).
   - **Step 10**: Version Comparison Visual Diff Tool.
   - **Step 11**: Cryptographic Evidence Package Export (ZIP archive + SHA256 integrity digest).

2. **Multi-Role RBAC (Role-Based Access Control)**:
   - **SME Promoter**: Initiates project and completes company questionnaires.
   - **Merchant Banker**: Lead Manager overseeing DRHP sections, disclosures, and sign-offs.
   - **Legal Reviewer**: Law firm specialist auditing litigation disclosures and statutory compliance.
   - **Compliance Officer**: Statutory auditor checking SEBI ICDR 2018 guidelines.
   - **Administrator**: System manager configuring AI keys and audit logs.

3. **SEBI RAG Knowledge Base**:
   - Indexed database covering SEBI (ICDR) Regulations 2018, NSE EMERGE Circulars, BSE SME norms, and Companies Act Section 32 disclosures.

4. **Cryptographic Anti-Tamper Evidence Packaging**:
   - Bundles all drafts, OCR extraction logs, and validation audit trails with an immutable SHA-256 integrity digest.

---

## Tech Stack

- **Frontend**: React 18, Vite, TypeScript, Tailwind CSS, Glassmorphism design system, Framer Motion, Lucide Icons.
- **Backend**: Python FastAPI, Pydantic v2, SQLAlchemy, Alembic, JWT Authentication, PyPDF / pdfplumber parser.
- **AI & RAG Engine**: Google Gemini 2.5 Flash API with fallback rule provider, ChromaDB / RAG vector retriever.
- **Database**: SQLite (local development) / PostgreSQL (production).
- **Deployment**: Docker Compose, Nginx.

---

## Quick Start & Installation Guide

### Prerequisites
- Python 3.10+
- Node.js 18+ / npm
- Docker (Optional for containerized run)

### 1. Backend Setup & Database Seeding

```bash
cd backend

# Create virtual environment
python -m venv venv
# On Windows:
venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Seed Demo Data (Creates initial demo project & 5 role accounts)
python seed_data.py

# Run FastAPI Server
python app/main.py
# Server will run at http://localhost:8000 (Swagger docs at http://localhost:8000/docs)
```

### 2. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Start Vite Development Server
npm run dev
# Frontend will run at http://localhost:5173
```

---

## Demo Persona Login Credentials

| Role | Email | Password |
| :--- | :--- | :--- |
| **SME Promoter** | `promoter@apexauto.co.in` | `password123` |
| **Merchant Banker** | `banker@pinnaclecap.in` | `password123` |
| **Legal Reviewer** | `legal@jurislex.com` | `password123` |
| **Compliance Officer** | `compliance@sebi-advisory.in` | `password123` |
| **Administrator** | `admin@smedraftmate.io` | `password123` |

---

## Verification & Testing Strategy

- **API Verification**: Access Swagger UI at `http://localhost:8000/docs` to test endpoints for Auth, Projects, Documents, DRHP Generation, and Evidence Export.
- **Validation Engine Unit Test**:
  ```bash
  pytest backend/tests/
  ```

---

## Legal Disclaimer

SME DraftMate is an AI-assisted document preparation and regulatory compliance workflow tool. Final DRHP sign-off and legal compliance remain the sole responsibility of registered Merchant Bankers and legal counsel.
