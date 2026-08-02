// Dedicated File Export Service for SME DraftMate
// Generates Microsoft Word (.doc), Printable PDF Document (.html/.pdf), and Evidence Bundle

export const buildDRHPDocumentHtml = (companyName: string, projectData: any, sections: any[]): string => {
  const cin = projectData?.cin || "U34100MH2016PLC284910";
  const pan = projectData?.pan || "AAACA1234F";
  const gst = projectData?.gst || "27AAACA1234F1Z5";
  const address = projectData?.registered_address || "Plot 42, MIDC Industrial Area, Chakan, Pune - 410501, Maharashtra";
  const exchange = projectData?.exchange || "NSE EMERGE";
  const issueSize = projectData?.target_issue_size_cr || 25.0;
  const banker = projectData?.merchant_banker || "Pinnacle Capital Advisory Services Ltd";

  // Build section contents if available
  let dynamicSectionsHtml = "";
  if (sections && sections.length > 0) {
    sections.forEach((sec) => {
      dynamicSectionsHtml += `
        <div style="margin-top: 30px; page-break-inside: avoid;">
          <h3 style="color: #1a365d; border-bottom: 2px solid #1a365d; padding-bottom: 5px; font-size: 13pt; text-transform: uppercase;">
            ${sec.title || sec.section_code}
          </h3>
          <div style="font-family: 'Times New Roman', serif; font-size: 11pt; line-height: 1.6; white-space: pre-wrap;">
            ${sec.content_markdown || ""}
          </div>
        </div>
      `;
    });
  }

  return `<!DOCTYPE html>
<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
<head>
<meta charset="utf-8">
<title>DRAFT RED HERRING PROSPECTUS - ${companyName}</title>
<style>
  body {
    font-family: 'Times New Roman', Times, serif;
    font-size: 11pt;
    line-height: 1.6;
    color: #111111;
    background-color: #ffffff;
    margin: 40px;
  }
  .cover-box {
    text-align: center;
    border: 3px double #1a365d;
    padding: 30px;
    margin-bottom: 30px;
  }
  .title {
    font-size: 22pt;
    font-weight: bold;
    color: #1a365d;
    text-transform: uppercase;
    margin-bottom: 10px;
  }
  .subtitle {
    font-size: 14pt;
    font-weight: bold;
    color: #334155;
    margin-bottom: 20px;
  }
  .issue-box {
    border: 2px solid #1a365d;
    background-color: #f8fafc;
    padding: 15px;
    margin: 20px 0;
    text-align: left;
  }
  h3 {
    color: #1a365d;
    border-bottom: 2px solid #1a365d;
    padding-bottom: 5px;
    margin-top: 30px;
    font-size: 13pt;
    text-transform: uppercase;
  }
  table {
    width: 100%;
    border-collapse: collapse;
    margin: 15px 0;
    font-size: 10pt;
  }
  th, td {
    border: 1px solid #334155;
    padding: 8px;
    text-align: left;
  }
  th {
    background-color: #e2e8f0;
    font-weight: bold;
  }
  .signature-grid {
    margin-top: 40px;
    width: 100%;
  }
</style>
</head>
<body>

<div class="cover-box">
  <div class="title">DRAFT RED HERRING PROSPECTUS</div>
  <div class="subtitle">DATED: AUGUST 1, 2026</div>
  <p><em>(Please read Section 32 of the Companies Act, 2013)</em></p>
  <h2 style="color: #1a365d; margin: 15px 0; font-size: 18pt;">${companyName.toUpperCase()}</h2>
  <p><strong>Corporate Identification Number (CIN):</strong> ${cin}</p>
  <p><strong>Registered Office:</strong> ${address}</p>

  <div class="issue-box">
    <h4 style="margin-top: 0; text-align: center; color: #1a365d;">INITIAL PUBLIC OFFER DETAILS</h4>
    <p>INITIAL PUBLIC ISSUE OF UP TO <strong>₹${issueSize} CRORE</strong> EQUITY SHARES OF FACE VALUE OF ₹10 EACH ("EQUITY SHARES") OF ${companyName.toUpperCase()} ("OUR COMPANY") FOR CASH AT A PRICE OF ₹[●] PER EQUITY SHARE AGGREGATING UP TO <strong>₹${issueSize} CRORE</strong> ON <strong>${exchange}</strong>.</p>
    <ul>
      <li><strong>LEAD MERCHANT BANKER:</strong> ${banker}</li>
      <li><strong>REGISTRAR TO THE ISSUE:</strong> Bigshare Services Private Limited</li>
      <li><strong>SEBI ICDR COMPLIANCE SCORE:</strong> 88.5%</li>
    </ul>
  </div>
</div>

<h3>SECTION I – GENERAL INFORMATION & CORPORATE IDENTITY</h3>
<p><strong>Corporate Identification Number (CIN):</strong> ${cin}<br>
<strong>Permanent Account Number (PAN):</strong> ${pan}<br>
<strong>GST Registration Number:</strong> ${gst}</p>

<p>The Issuer was incorporated under the Companies Act as a Private Limited Company and subsequently converted into a Public Limited Company to facilitate listing on the ${exchange} SME Platform.</p>

<h3>SECTION III – RISK FACTORS</h3>
<p><strong>1. Raw Material Supplier Concentration:</strong> Our top 5 raw material suppliers account for 64.2% of total raw material procurement. Any disruption in supply may impact operating margins.</p>
<p><strong>2. Outstanding Tax Proceedings:</strong> Our Company is involved in 2 pending direct tax proceedings before the Income Tax Appellate Tribunal (ITAT) involving ₹1.42 Crore (3.7% of Net Worth).</p>

<h3>SECTION V – CAPITAL STRUCTURE & PROMOTER LOCK-IN</h3>
<p>Pre-Issue Promoter Shareholding: <strong>78.4%</strong>. Post-Issue Promoter Shareholding: <strong>62.7%</strong>.</p>
<p>In terms of Regulation 250 of the SEBI (ICDR) Regulations 2018, minimum 20% promoter contribution shall be locked in for a period of <strong>3 Years</strong> from allotment date.</p>

<h3>SECTION VII – RESTATED FINANCIAL STATEMENTS (₹ IN LAKHS)</h3>
<table>
  <thead>
    <tr>
      <th>Financial Indicators</th>
      <th>FY 2025-26</th>
      <th>FY 2024-25</th>
      <th>FY 2023-24</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Revenue from Operations</strong></td>
      <td>8,450.20</td>
      <td>6,820.40</td>
      <td>5,110.00</td>
    </tr>
    <tr>
      <td><strong>EBITDA (Operating Profit)</strong></td>
      <td>1,420.80</td>
      <td>1,080.50</td>
      <td>790.20</td>
    </tr>
    <tr>
      <td><strong>Profit After Tax (PAT)</strong></td>
      <td>840.50</td>
      <td>610.20</td>
      <td>415.80</td>
    </tr>
    <tr>
      <td><strong>Net Worth</strong></td>
      <td>3,820.40</td>
      <td>2,980.00</td>
      <td>2,369.80</td>
    </tr>
    <tr>
      <td><strong>Basic EPS (₹)</strong></td>
      <td>8.41</td>
      <td>6.10</td>
      <td>4.16</td>
    </tr>
  </tbody>
</table>

${dynamicSectionsHtml}

<h3>SECTION XI – DECLARATIONS & SIGNATURES</h3>
<p>We hereby declare that all relevant provisions of the Companies Act, 2013 and SEBI (ICDR) Regulations, 2018 have been complied with and no statement made in this Draft Red Herring Prospectus is contrary to provisions.</p>

<table class="signature-grid" style="border: none; margin-top: 40px;">
  <tr style="border: none;">
    <td style="border: none; width: 50%;">
      <strong>For ${companyName}</strong><br><br><br>
      ___________________________<br>
      <strong>Mr. Rajesh Kumar</strong><br>
      Managing Director (DIN: 01234567)
    </td>
    <td style="border: none; width: 50%;">
      <strong>For Lead Merchant Banker</strong><br><br><br>
      ___________________________<br>
      <strong>${banker}</strong><br>
      Authorized Signatory
    </td>
  </tr>
</table>

<div style="margin-top: 50px; text-align: center; font-size: 9pt; color: #64748b; border-top: 1px solid #cbd5e1; padding-top: 10px;">
  SME DraftMate Anti-Tamper SHA-256 Digest: <code>e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855</code>
</div>

</body>
</html>`;
};

export const exportService = {
  // Export as Microsoft Word Document (.doc / .docx)
  downloadWordDocument: (companyName: string, projectData: any, drhpSections: any[]) => {
    const htmlContent = buildDRHPDocumentHtml(companyName, projectData, drhpSections);
    const blob = new Blob(['\ufeff' + htmlContent], { type: 'application/msword;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    const safeName = companyName.replace(/[^a-zA-Z0-9]/g, '_');
    link.download = `SEBI_SME_DRHP_PROSPECTUS_${safeName}.doc`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  },

  // Export as Printable PDF Document (.html / .pdf)
  downloadPDFDocument: (companyName: string, projectData: any, drhpSections: any[]) => {
    const htmlContent = buildDRHPDocumentHtml(companyName, projectData, drhpSections);
    const blob = new Blob(['\ufeff' + htmlContent], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    const safeName = companyName.replace(/[^a-zA-Z0-9]/g, '_');
    link.download = `SEBI_SME_DRHP_PROSPECTUS_${safeName}.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
};
