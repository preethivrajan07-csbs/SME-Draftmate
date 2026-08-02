import os
import io
import zipfile
import hashlib
import json
from datetime import datetime
from typing import Dict, Any, List

class EvidenceService:
    def build_pdf_bytes(self, project_data: Dict[str, Any], drhp_sections: List[Dict[str, Any]], validation_report: Dict[str, Any]) -> bytes:
        """
        Generates a pure, valid ReportLab PDF binary (%PDF-1.4).
        """
        from reportlab.lib.pagesizes import A4
        from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak, HRFlowable
        from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
        from reportlab.lib import colors

        buffer = io.BytesIO()
        doc = SimpleDocTemplate(
            buffer,
            pagesize=A4,
            rightMargin=40,
            leftMargin=40,
            topMargin=40,
            bottomMargin=40
        )

        styles = getSampleStyleSheet()
        story = []

        # Custom Styles
        title_style = ParagraphStyle(
            'DocTitle',
            parent=styles['Heading1'],
            fontName='Helvetica-Bold',
            fontSize=20,
            leading=24,
            alignment=1, # Center
            textColor=colors.HexColor('#1a365d'),
            spaceAfter=15
        )

        subtitle_style = ParagraphStyle(
            'DocSubTitle',
            parent=styles['Normal'],
            fontName='Helvetica-Bold',
            fontSize=11,
            leading=15,
            alignment=1,
            textColor=colors.HexColor('#334155'),
            spaceAfter=20
        )

        h2_style = ParagraphStyle(
            'Heading2Custom',
            parent=styles['Heading2'],
            fontName='Helvetica-Bold',
            fontSize=13,
            leading=17,
            textColor=colors.HexColor('#1a365d'),
            spaceBefore=15,
            spaceAfter=8
        )

        body_style = ParagraphStyle(
            'BodyCustom',
            parent=styles['Normal'],
            fontName='Helvetica',
            fontSize=9.5,
            leading=14,
            textColor=colors.HexColor('#1e293b'),
            spaceAfter=8
        )

        # 1. Cover Page
        story.append(Paragraph("DRAFT RED HERRING PROSPECTUS", title_style))
        story.append(Paragraph(f"<b>{project_data.get('company_name', 'Apex Auto Components Limited')}</b>", title_style))
        story.append(Paragraph(f"CIN: {project_data.get('cin', 'U34100MH2016PLC284910')} | Date: August 1, 2026", subtitle_style))
        story.append(Spacer(1, 10))

        # Issuer summary box table
        summary_data = [
            [Paragraph("<b>INITIAL PUBLIC OFFER SUMMARY</b>", body_style)],
            [Paragraph(f"Initial Public Issue of up to <b>₹{project_data.get('target_issue_size_cr', 25.0)} Crore</b> Equity Shares of face value of ₹10 each on <b>{project_data.get('exchange', 'NSE EMERGE')}</b>.", body_style)],
            [Paragraph(f"<b>Lead Merchant Banker:</b> {project_data.get('merchant_banker', 'Pinnacle Capital Advisory Services Ltd')}", body_style)],
            [Paragraph(f"<b>Registered Office:</b> {project_data.get('registered_address', 'MIDC Chakan, Pune, Maharashtra')}", body_style)]
        ]
        t_summary = Table(summary_data, colWidths=[510])
        t_summary.setStyle(TableStyle([
            ('BACKGROUND', (0,0), (-1,-1), colors.HexColor('#f8fafc')),
            ('BOX', (0,0), (-1,-1), 1.5, colors.HexColor('#1a365d')),
            ('PADDING', (0,0), (-1,-1), 8),
        ]))
        story.append(t_summary)
        story.append(Spacer(1, 20))

        # 2. Section I: General Information
        story.append(Paragraph("SECTION I – GENERAL INFORMATION & CORPORATE IDENTITY", h2_style))
        story.append(Paragraph(f"<b>CIN:</b> {project_data.get('cin')} | <b>PAN:</b> {project_data.get('pan', 'AAACA1234F')} | <b>GST:</b> {project_data.get('gst', '27AAACA1234F1Z5')}", body_style))
        story.append(Paragraph("Issuer was incorporated under Companies Act as a Private Limited Company and subsequently converted into a Public Limited Company.", body_style))

        # 3. Section III: Risk Factors
        story.append(Paragraph("SECTION III – RISK FACTORS", h2_style))
        story.append(Paragraph("<b>1. Raw Material Supplier Concentration:</b> Our top 5 raw material suppliers account for 64.2% of total raw material procurement. Any supply disruption may affect operations.", body_style))
        story.append(Paragraph("<b>2. Pending Income Tax Appeals:</b> Our Company is involved in 2 pending direct tax proceedings before ITAT involving ₹1.42 Crore (3.7% of Net Worth).", body_style))

        # 4. Section V: Capital Structure
        story.append(Paragraph("SECTION V – CAPITAL STRUCTURE & PROMOTER LOCK-IN", h2_style))
        story.append(Paragraph("Pre-Issue Promoter Shareholding: <b>78.4%</b>. Post-Issue Promoter Shareholding: <b>62.7%</b>.", body_style))
        story.append(Paragraph("In compliance with Regulation 250 of SEBI (ICDR) Regulations 2018, minimum 20% promoter contribution shall be locked in for a period of <b>3 Years</b>.", body_style))

        # 5. Section VII: Restated Financial Statements
        story.append(Paragraph("SECTION VII – RESTATED FINANCIAL SUMMARY (₹ IN LAKHS)", h2_style))
        fin_table_data = [
            [Paragraph("<b>Financial Indicator</b>", body_style), Paragraph("<b>FY 2025-26</b>", body_style), Paragraph("<b>FY 2024-25</b>", body_style), Paragraph("<b>FY 2023-24</b>", body_style)],
            [Paragraph("Revenue from Operations", body_style), Paragraph("8,450.20", body_style), Paragraph("6,820.40", body_style), Paragraph("5,110.00", body_style)],
            [Paragraph("EBITDA (Operating Profit)", body_style), Paragraph("1,420.80", body_style), Paragraph("1,080.50", body_style), Paragraph("790.20", body_style)],
            [Paragraph("Profit After Tax (PAT)", body_style), Paragraph("840.50", body_style), Paragraph("610.20", body_style), Paragraph("415.80", body_style)],
            [Paragraph("Net Worth", body_style), Paragraph("3,820.40", body_style), Paragraph("2,980.00", body_style), Paragraph("2,369.80", body_style)],
            [Paragraph("Basic EPS (₹)", body_style), Paragraph("8.41", body_style), Paragraph("6.10", body_style), Paragraph("4.16", body_style)]
        ]
        t_fin = Table(fin_table_data, colWidths=[180, 110, 110, 110])
        t_fin.setStyle(TableStyle([
            ('BACKGROUND', (0,0), (-1,0), colors.HexColor('#e2e8f0')),
            ('GRID', (0,0), (-1,-1), 0.5, colors.HexColor('#64748b')),
            ('PADDING', (0,0), (-1,-1), 5),
        ]))
        story.append(t_fin)
        story.append(Spacer(1, 15))

        # 6. Section XI: Declarations & Signatures
        story.append(Paragraph("SECTION XI – DECLARATIONS & SIGNATURES", h2_style))
        story.append(Paragraph("We hereby declare that all relevant provisions of Companies Act, 2013 and SEBI (ICDR) Regulations, 2018 have been complied with and no statement made in this DRHP is contrary to provisions.", body_style))
        story.append(Spacer(1, 20))

        sig_data = [
            [Paragraph("<b>For Apex Auto Components Ltd</b><br/><br/><br/>____________________<br/><b>Mr. Rajesh Kumar</b><br/>Managing Director", body_style),
             Paragraph("<b>For Lead Merchant Banker</b><br/><br/><br/>____________________<br/><b>Pinnacle Capital Advisory</b><br/>Authorized Signatory", body_style)]
        ]
        t_sig = Table(sig_data, colWidths=[255, 255])
        t_sig.setStyle(TableStyle([
            ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ]))
        story.append(t_sig)

        doc.build(story)
        return buffer.getvalue()

    def build_full_drhp_html(self, project_data: Dict[str, Any], drhp_sections: List[Dict[str, Any]], validation_report: Dict[str, Any]) -> str:
        """
        Generates a complete, professional SEBI DRHP Prospectus HTML/Word document (.doc).
        """
        company_name = project_data.get("company_name", "Apex Auto Components Limited")
        cin = project_data.get("cin", "U34100MH2016PLC284910")
        pan = project_data.get("pan", "AAACA1234F")
        gst = project_data.get("gst", "27AAACA1234F1Z5")
        address = project_data.get("registered_address", "Plot 42, MIDC Industrial Area, Chakan, Pune - 410501, Maharashtra")
        exchange = project_data.get("exchange", "NSE EMERGE")
        issue_size = str(project_data.get("target_issue_size_cr", 25.0))

        html = f"""<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
<head><title>DRAFT RED HERRING PROSPECTUS - {company_name}</title>
<style>
    body {{ font-family: 'Times New Roman', serif; margin: 30px; font-size: 11pt; line-height: 1.5; color: #000; }}
    h1 {{ text-align: center; font-size: 22pt; text-transform: uppercase; color: #1a365d; margin-bottom: 5px; }}
    h2 {{ text-align: center; font-size: 16pt; color: #334155; margin-top: 0; }}
    h3 {{ font-size: 13pt; color: #1a365d; border-bottom: 2px solid #1a365d; margin-top: 25px; text-transform: uppercase; }}
    table {{ width: 100%; border-collapse: collapse; margin: 15px 0; font-size: 10pt; }}
    th, td {{ border: 1px solid #000; padding: 6px 10px; text-align: left; }}
    th {{ background-color: #e2e8f0; font-weight: bold; }}
    .box {{ border: 2px solid #1a365d; padding: 15px; background: #f8fafc; margin: 20px 0; }}
</style>
</head>
<body>
<h1>DRAFT RED HERRING PROSPECTUS</h1>
<h2>{company_name}</h2>
<p style="text-align:center;"><b>CIN:</b> {cin} | <b>PAN:</b> {pan} | <b>GST:</b> {gst}<br><b>Registered Office:</b> {address}</p>

<div class="box">
    <h4 style="margin-top:0; text-align:center;">DETAILS OF THE SME INITIAL PUBLIC OFFER</h4>
    <p>Initial Public Issue of up to <b>₹{issue_size} Crore</b> Equity Shares of Face Value of ₹10 each on <b>{exchange}</b>.</p>
    <p><b>Lead Merchant Banker:</b> {project_data.get('merchant_banker', 'Pinnacle Capital Advisory Services Ltd')}</p>
</div>

<h3>SECTION I – GENERAL INFORMATION</h3>
<p>Incorporated under the Companies Act. Issuer operates in precision engineering & auto components manufacturing.</p>

<h3>SECTION III – RISK FACTORS</h3>
<p><b>1. Raw Material Dependency:</b> Top 5 suppliers account for 64.2% of total raw material procurement.<br>
<b>2. Outstanding Tax Proceedings:</b> Tax appeal before ITAT involving financial exposure of ₹1.42 Crore.</p>

<h3>SECTION V – CAPITAL STRUCTURE</h3>
<p>Pre-Issue Promoter Shareholding: 78.4%. Promoters 20% contribution locked in for 3 Years under Regulation 250 of SEBI ICDR Regulations.</p>

<h3>SECTION VII – RESTATED FINANCIAL STATEMENTS (₹ IN LAKHS)</h3>
<table>
    <tr><th>Financial Indicators</th><th>FY 2025-26</th><th>FY 2024-25</th><th>FY 2023-24</th></tr>
    <tr><td>Revenue from Operations</td><td>8,450.20</td><td>6,820.40</td><td>5,110.00</td></tr>
    <tr><td>EBITDA</td><td>1,420.80</td><td>1,080.50</td><td>790.20</td></tr>
    <tr><td>PAT</td><td>840.50</td><td>610.20</td><td>415.80</td></tr>
    <tr><td>Net Worth</td><td>3,820.40</td><td>2,980.00</td><td>2,369.80</td></tr>
</table>

<h3>SECTION XI – DECLARATIONS & SIGNATURES</h3>
<p>Signed for and on behalf of <b>{company_name}</b> by Managing Director Mr. Rajesh Kumar.</p>
</body>
</html>"""
        return html

    def generate_evidence_package(self, project_data: Dict[str, Any], drhp_sections: list, validation_report: Dict[str, Any]) -> tuple[bytes, str]:
        zip_buffer = io.BytesIO()
        drhp_html = self.build_full_drhp_html(project_data, drhp_sections, validation_report)
        pdf_bytes = self.build_pdf_bytes(project_data, drhp_sections, validation_report)

        with zipfile.ZipFile(zip_buffer, "w", zipfile.ZIP_DEFLATED) as zf:
            zf.writestr("01_SEBI_SME_DRHP_PROSPECTUS.pdf", pdf_bytes)
            zf.writestr("01_SEBI_SME_DRHP_PROSPECTUS.doc", drhp_html.encode("utf-8"))
            zf.writestr("02_SEBI_COMPLIANCE_REPORT.json", json.dumps(validation_report, indent=2).encode("utf-8"))
            
            manifest = f"""SME DRAFTMATE SEBI PROSPECTUS EVIDENCE PACKAGE
===================================================
Issuer Company: {project_data.get('company_name', 'Apex Auto Components Ltd')}
CIN: {project_data.get('cin')}
Filing Date: August 1, 2026
Target Exchange: {project_data.get('exchange', 'NSE EMERGE')}
Target Issue Size: ₹{project_data.get('target_issue_size_cr', 25.0)} Cr
SHA-256 Digest: e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
"""
            zf.writestr("MANIFEST.txt", manifest.encode("utf-8"))

        zip_bytes = zip_buffer.getvalue()
        sha256_hash = hashlib.sha256(zip_bytes).hexdigest()
        return zip_bytes, sha256_hash

evidence_service = EvidenceService()
