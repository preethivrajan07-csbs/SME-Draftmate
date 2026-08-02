import logging
from typing import List, Dict, Any

logger = logging.getLogger(__name__)

SEBI_KNOWLEDGE_BASE = [
    {
        "id": "SEBI-ICDR-248",
        "title": "SEBI ICDR Regulation 248 - Eligibility Requirements for SME IPO",
        "category": "Eligibility",
        "source": "SEBI (Issue of Capital and Disclosure Requirements) Regulations, 2018",
        "content": "An issuer making an initial public offer of equity shares shall have a post-issue paid-up capital of not more than twenty-five crore rupees. The issuer must have a track record of at least three years, positive net worth in at least two preceding financial years, and operating profit (EBITDA) in at least two preceding financial years.",
        "tags": ["Eligibility", "Post-Issue Capital", "Track Record", "Net Worth"]
    },
    {
        "id": "SEBI-ICDR-250",
        "title": "SEBI ICDR Regulation 250 - Promoters' Minimum Contribution & Lock-in",
        "category": "Capital Structure",
        "source": "SEBI (Issue of Capital and Disclosure Requirements) Regulations, 2018",
        "content": "The promoters of the issuer shall contribute not less than twenty per cent (20%) of the post-issue capital. The minimum promoters' contribution shall be locked-in for a period of three years from the date of allotment. Any promoter holding in excess of 20% shall be locked-in for a period of one year.",
        "tags": ["Promoter Lock-in", "Minimum Contribution", "3 Years Lock-in"]
    },
    {
        "id": "NSE-EMERGE-CIRC-04",
        "title": "NSE EMERGE Circular 2024 - Restated Financial Statement Disclosures",
        "category": "Financial Disclosures",
        "source": "NSE Emerge SME Platform Guidelines",
        "content": "Restated financial statements must cover three complete financial years preceding the DRHP filing. Audited balance sheets, profit and loss statements, cash flow statements, and significant accounting policies must be signed by Peer Reviewed Statutory Auditors.",
        "tags": ["Restated Financials", "Peer Review Auditor", "3 Years Financials"]
    },
    {
        "id": "SEBI-SCH-VI",
        "title": "SEBI ICDR Schedule VI - Mandatory Risk Factor Disclosures",
        "category": "Risk Factors",
        "source": "SEBI ICDR Schedule VI Part A",
        "content": "Risk factors must be presented in order of materiality. Top 10 internal risks must quantify financial exposure, pending litigations, raw material concentration, customer concentration, and outstanding statutory dues.",
        "tags": ["Risk Factors", "Material Disclosures", "Litigations"]
    },
    {
        "id": "COMPANIES-ACT-32",
        "title": "Companies Act 2013 - Section 32 (Red Herring Prospectus)",
        "category": "Legal",
        "source": "Companies Act, 2013",
        "content": "A company proposing to make an offer of securities may issue a red herring prospectus prior to the issue of a prospectus. A red herring prospectus shall carry the same obligations as a prospectus except for quantum or price of securities.",
        "tags": ["Companies Act", "Red Herring Prospectus", "Section 32"]
    }
]

class RAGService:
    def search_regulations(self, query: str, category: str = None) -> List[Dict[str, Any]]:
        """
        Retrieves relevant SEBI ICDR clauses and exchange guidelines using semantic/keyword matching.
        """
        results = []
        query_terms = query.lower().split()
        
        for item in SEBI_KNOWLEDGE_BASE:
            if category and item["category"].lower() != category.lower():
                continue
            
            # Simple scoring algorithm based on keyword match in title, content, and tags
            score = 0
            text_to_search = (item["title"] + " " + item["content"] + " " + " ".join(item["tags"])).lower()
            
            for term in query_terms:
                if term in text_to_search:
                    score += 1
            
            if score > 0 or not query:
                results.append({
                    **item,
                    "relevance_score": min(1.0, (score + 1) / (len(query_terms) + 1))
                })
        
        # Sort by relevance
        results.sort(key=lambda x: x.get("relevance_score", 0), reverse=True)
        return results if results else SEBI_KNOWLEDGE_BASE[:3]

rag_service = RAGService()
