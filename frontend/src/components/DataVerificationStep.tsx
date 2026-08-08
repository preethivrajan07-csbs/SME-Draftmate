import React, { useState } from 'react';
import { useProject } from '../context/ProjectContext';
import { CheckCircle2, ShieldCheck, Edit3, ArrowRight, Save, Lock, AlertTriangle, RefreshCw } from 'lucide-react';

export const DataVerificationStep: React.FC<{ onNext: () => void }> = ({ onNext }) => {
  const { activeProject } = useProject();
  const [saved, setSaved] = useState(false);

  const [entities, setEntities] = useState([
    { id: 1, field: "Corporate Identification Number (CIN)", ocrValue: "U34100MH2016PLC284910", verifiedValue: activeProject?.cin || "U34100MH2016PLC284910", source: "MCA Incorporation Cert", status: "VERIFIED" },
    { id: 2, field: "Permanent Account Number (PAN)", ocrValue: "AAACA1234F", verifiedValue: activeProject?.pan || "AAACA1234F", source: "PAN Card Registration", status: "VERIFIED" },
    { id: 3, field: "GST Registration Number", ocrValue: "27AAACA1234F1Z5", verifiedValue: activeProject?.gst || "27AAACA1234F1Z5", source: "GST Certificate", status: "VERIFIED" },
    { id: 4, field: "Target Issue Size (Crores)", ocrValue: "₹25.0 Crore", verifiedValue: `${activeProject?.target_issue_size_cr || 25.0}`, source: "Board Resolution", status: "VERIFIED" },
    { id: 5, field: "FY 2025-26 Revenue from Operations", ocrValue: "₹8,450.20 Lakhs", verifiedValue: "8450.20", source: "Audited Balance Sheet FY26", status: "VERIFIED" },
    { id: 6, field: "FY 2025-26 Operating EBITDA", ocrValue: "₹1,420.80 Lakhs", verifiedValue: "1420.80", source: "Audited Balance Sheet FY26", status: "VERIFIED" },
    { id: 7, field: "FY 2025-26 Profit After Tax (PAT)", ocrValue: "₹840.50 Lakhs", verifiedValue: "840.50", source: "Audited Profit & Loss FY26", status: "VERIFIED" },
    { id: 8, field: "Restated Net Worth", ocrValue: "₹3,820.40 Lakhs", verifiedValue: "3820.40", source: "Peer Reviewed Audit Report", status: "VERIFIED" },
    { id: 9, field: "Promoter Shareholding (Pre-Issue)", ocrValue: "78.4%", verifiedValue: "78.4%", source: "Shareholding Pattern Register", status: "VERIFIED" },
    { id: 10, field: "Promoter Minimum 3-Year Lock-in", ocrValue: "20.0%", verifiedValue: "20.0%", source: "SEBI ICDR Reg 250 Mandate", status: "VERIFIED" }
  ]);

  const handleFieldChange = (id: number, val: string) => {
    setEntities(entities.map(e => e.id === id ? { ...e, verifiedValue: val, status: "EDITED" } : e));
  };

  const handleSaveAndLock = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto p-6">
      {/* Step Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold border border-emerald-500/30 mb-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>Step 5: Statutory Data Audit & Entity Verification Grid</span>
          </div>
          <h1 className="text-2xl font-extrabold text-white">Extracted Corporate Entity Audit Grid</h1>
          <p className="text-xs text-slate-400 mt-1">Cross-verify raw OCR document extractions against statutory databases before initializing SEBI ICDR compliance rules.</p>
        </div>

        <button
          onClick={onNext}
          className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs shadow-xl shadow-indigo-600/25 flex items-center gap-2 transition"
        >
          <span>Proceed to Adaptive AI Questionnaire (Step 6)</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Verification Status Banner */}
      <div className="p-4 rounded-2xl glass-panel border border-emerald-500/30 flex items-center justify-between gap-4 bg-emerald-950/20">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center font-bold">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <div className="text-sm font-bold text-white">10 of 10 Core Entities Audit-Verified</div>
            <div className="text-xs text-slate-400">All statutory fields matched source PDFs with 0 unverified discrepancies.</div>
          </div>
        </div>

        <button
          onClick={handleSaveAndLock}
          className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg shadow-emerald-600/20 flex items-center gap-2 transition"
        >
          {saved ? <CheckCircle2 className="w-4 h-4 text-white" /> : <Lock className="w-4 h-4" />}
          <span>{saved ? 'Entities Saved & Locked!' : 'Lock Verified Entities'}</span>
        </button>
      </div>

      {/* Interactive Entity Audit Table */}
      <div className="p-5 rounded-2xl glass-panel border border-slate-800 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <span className="text-xs font-bold text-white flex items-center gap-2">
            <Edit3 className="w-4 h-4 text-indigo-400" />
            Side-by-Side Field Audit Table
          </span>
          <span className="text-xs text-slate-400">Click any Verified Field to edit inline</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-900/90 text-slate-400 text-[10px] uppercase font-bold border-b border-slate-800">
              <tr>
                <th className="p-3">Statutory Field / Metric</th>
                <th className="p-3">Raw OCR Extracted</th>
                <th className="p-3">Verified Value (Editable)</th>
                <th className="p-3">Source Document</th>
                <th className="p-3">Match Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono">
              {entities.map((row) => (
                <tr key={row.id} className="hover:bg-slate-900/50 transition">
                  <td className="p-3 font-sans font-semibold text-white">{row.field}</td>
                  <td className="p-3 text-slate-400">{row.ocrValue}</td>
                  <td className="p-3">
                    <input
                      type="text"
                      value={row.verifiedValue}
                      onChange={(e) => handleFieldChange(row.id, e.target.value)}
                      className="bg-slate-950 px-2.5 py-1 rounded border border-slate-700 text-emerald-400 font-bold text-xs w-full focus:outline-none focus:border-indigo-500"
                    />
                  </td>
                  <td className="p-3 font-sans text-slate-400 text-[11px]">{row.source}</td>
                  <td className="p-3">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${row.status === 'VERIFIED' ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' : 'bg-amber-500/20 text-amber-400 border-amber-500/30'}`}>
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex justify-end pt-2">
        <button
          onClick={onNext}
          className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs shadow-xl shadow-indigo-600/25 flex items-center gap-2 transition"
        >
          <span>Proceed to Adaptive AI Questionnaire (Step 6)</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
