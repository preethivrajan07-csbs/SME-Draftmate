import React, { useState } from 'react';
import { useProject } from '../context/ProjectContext';
import { FileText, CheckCircle2, AlertCircle, Edit3, ArrowRight, ShieldCheck } from 'lucide-react';

export const OCRViewerStep: React.FC<{ onNext: () => void }> = ({ onNext }) => {
  const { documents } = useProject();
  const [selectedDocIndex, setSelectedDocIndex] = useState(0);

  const currentDoc = documents[selectedDocIndex] || documents[0];
  const extracted = currentDoc?.extracted_data_json || {};

  return (
    <div className="space-y-6 max-w-7xl mx-auto p-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <FileText className="w-5 h-5 text-indigo-400" />
            Steps 4 & 5: OCR Extraction & Data Verification Viewer
          </h2>
          <p className="text-xs text-slate-400">Inspect side-by-side original document rendering against extracted SEBI structured entities</p>
        </div>

        <button
          onClick={onNext}
          className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs shadow-lg shadow-indigo-600/25 flex items-center gap-2 transition"
        >
          <span>Verify & Proceed to AI Questionnaire (Step 6)</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Document Selector Tabs */}
      <div className="flex gap-2 border-b border-slate-800 pb-2 overflow-x-auto">
        {documents.map((doc, idx) => (
          <button
            key={doc.id}
            onClick={() => setSelectedDocIndex(idx)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-2 transition whitespace-nowrap ${
              selectedDocIndex === idx
                ? 'bg-indigo-600 text-white shadow-md'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>{doc.filename}</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300">
              {doc.confidence_score}%
            </span>
          </button>
        ))}
      </div>

      {/* Split Screen OCR Viewer */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column: Original Document Viewer */}
        <div className="p-5 rounded-2xl glass-panel border border-slate-800 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <span className="text-xs font-bold text-white flex items-center gap-2">
              Original Document Render
            </span>
            <span className="text-[10px] font-mono text-indigo-400">{currentDoc?.filename}</span>
          </div>

          <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 h-[480px] overflow-y-auto space-y-4 font-mono text-xs text-slate-300">
            <div className="p-4 bg-slate-900/60 rounded border border-slate-800">
              <div className="text-indigo-400 font-bold mb-2">CERTIFICATE OF INCORPORATION & AUDITED BALANCE SHEET</div>
              <p>Government of India - Ministry of Corporate Affairs</p>
              <p>Corporate Identity Number: U34100MH2016PLC284910</p>
              <p>Name of Issuer: APEX AUTO COMPONENTS LIMITED</p>
              <p>Registered Office: Plot 42, MIDC Industrial Area, Chakan, Pune - 410501</p>
              <br />
              <p className="text-slate-400 font-sans">
                [Auditor's Peer Review Certificate] We have audited the restated summary financial statements of Apex Auto Components Limited for FY 2023-24, FY 2024-25, and FY 2025-26 under SEBI (ICDR) Regulations 2018.
              </p>
            </div>

            <div className="p-4 bg-slate-900/60 rounded border border-slate-800 space-y-2">
              <div className="font-bold text-emerald-400">FINANCIAL SUMMARY (₹ IN LAKHS)</div>
              <div>FY 2025-26 Revenue: ₹8,450.20 | EBITDA: ₹1,420.80 | PAT: ₹840.50</div>
              <div>FY 2024-25 Revenue: ₹6,820.40 | EBITDA: ₹1,080.50 | PAT: ₹610.20</div>
              <div>FY 2023-24 Revenue: ₹5,110.00 | EBITDA: ₹790.20 | PAT: ₹415.80</div>
            </div>
          </div>
        </div>

        {/* Right Column: OCR Structured Extracted Entities */}
        <div className="p-5 rounded-2xl glass-panel border border-slate-800 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <span className="text-xs font-bold text-white flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              Extracted SEBI Entities Grid
            </span>
            <span className="text-xs font-bold text-emerald-400 bg-emerald-500/20 px-2 py-0.5 rounded border border-emerald-500/30">
              Confidence: {currentDoc?.confidence_score}%
            </span>
          </div>

          <div className="space-y-4 h-[480px] overflow-y-auto pr-1">
            <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-3">
              <div className="text-xs font-bold text-indigo-300">Corporate Identities</div>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-slate-400 block text-[10px]">CIN</span>
                  <input type="text" defaultValue={extracted.cin || "U34100MH2016PLC284910"} className="w-full bg-slate-950 px-2 py-1 rounded border border-slate-800 text-white font-mono text-xs" />
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">PAN</span>
                  <input type="text" defaultValue={extracted.pan || "AAACA1234F"} className="w-full bg-slate-950 px-2 py-1 rounded border border-slate-800 text-white font-mono text-xs" />
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-3">
              <div className="text-xs font-bold text-emerald-300">Restated Financial Summary (₹ Lakhs)</div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="text-[10px] text-slate-400 border-b border-slate-800">
                    <tr>
                      <th className="py-1">Indicator</th>
                      <th className="py-1">FY 26</th>
                      <th className="py-1">FY 25</th>
                      <th className="py-1">FY 24</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 font-mono">
                    <tr>
                      <td className="py-1.5 font-sans text-slate-300">Revenue</td>
                      <td className="py-1.5 text-white">8,450.20</td>
                      <td className="py-1.5 text-slate-300">6,820.40</td>
                      <td className="py-1.5 text-slate-400">5,110.00</td>
                    </tr>
                    <tr>
                      <td className="py-1.5 font-sans text-slate-300">EBITDA</td>
                      <td className="py-1.5 text-white">1,420.80</td>
                      <td className="py-1.5 text-slate-300">1,080.50</td>
                      <td className="py-1.5 text-slate-400">790.20</td>
                    </tr>
                    <tr>
                      <td className="py-1.5 font-sans text-slate-300">PAT</td>
                      <td className="py-1.5 text-emerald-400 font-bold">840.50</td>
                      <td className="py-1.5 text-emerald-400">610.20</td>
                      <td className="py-1.5 text-slate-400">415.80</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
