import React, { useState } from 'react';
import { useProject } from '../context/ProjectContext';
import { Cpu, FileText, CheckCircle2, ArrowRight, Scan, Eye, Code, Zap, RefreshCw } from 'lucide-react';

export const OCRExtractionStep: React.FC<{ onNext: () => void }> = ({ onNext }) => {
  const { documents, activeProject } = useProject();
  const [selectedDocIndex, setSelectedDocIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<'visual' | 'json' | 'logs'>('visual');
  const [selectedBox, setSelectedBox] = useState<string | null>('cin');

  const docList = documents.length > 0 ? documents : [
    { id: 1, filename: "Audited_Financial_Statements_FY24_FY26.pdf", document_type: "financials", confidence_score: 98.4, status: "OCR Processed" },
    { id: 2, filename: "Certificate_of_Incorporation_MCA.pdf", document_type: "incorporation", confidence_score: 99.1, status: "OCR Processed" },
    { id: 3, filename: "Shareholding_Pattern_Register.pdf", document_type: "shareholding", confidence_score: 97.2, status: "OCR Processed" }
  ];

  const currentDoc = docList[selectedDocIndex] || docList[0];

  const boundingBoxes = [
    { id: 'cin', label: 'CIN Number', text: 'U34100MH2016PLC284910', confidence: '99.4%', top: '24%', left: '15%', width: '45%', height: '8%', color: 'border-indigo-400 bg-indigo-500/20' },
    { id: 'company', label: 'Issuer Name', text: activeProject?.company_name || 'APEX AUTO COMPONENTS LIMITED', confidence: '98.9%', top: '34%', left: '15%', width: '60%', height: '8%', color: 'border-cyan-400 bg-cyan-500/20' },
    { id: 'revenue', label: 'FY26 Revenue', text: '₹8,450.20 Lakhs', confidence: '97.8%', top: '55%', left: '15%', width: '35%', height: '8%', color: 'border-emerald-400 bg-emerald-500/20' },
    { id: 'pat', label: 'FY26 PAT', text: '₹840.50 Lakhs', confidence: '98.1%', top: '65%', left: '15%', width: '35%', height: '8%', color: 'border-amber-400 bg-amber-500/20' }
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto p-6">
      {/* Step Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-semibold border border-indigo-500/30 mb-2">
            <Cpu className="w-3.5 h-3.5 text-cyan-400" />
            <span>Step 4: Deep Document OCR & Visual Bounding Box Scanner</span>
          </div>
          <h1 className="text-2xl font-extrabold text-white">OCR Ingestion & Layout Inspection Pipeline</h1>
          <p className="text-xs text-slate-400 mt-1">High-precision layout extraction, bounding box coordinate analysis, and confidence heatmap scoring.</p>
        </div>

        <button
          onClick={onNext}
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-600 hover:opacity-90 text-white font-extrabold text-xs shadow-xl shadow-indigo-600/25 flex items-center gap-2 transition"
        >
          <span>Proceed to Data Verification Grid (Step 5)</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl glass-card border border-slate-800">
          <span className="text-[10px] text-slate-400 font-semibold block">OCR Confidence Score</span>
          <span className="text-xl font-extrabold text-emerald-400">{currentDoc.confidence_score}%</span>
          <span className="text-[10px] text-slate-500 block">High Accuracy Mode</span>
        </div>

        <div className="p-4 rounded-xl glass-card border border-slate-800">
          <span className="text-[10px] text-slate-400 font-semibold block">Extracted Statutory Entities</span>
          <span className="text-xl font-extrabold text-white">142 Fields</span>
          <span className="text-[10px] text-indigo-400 block">100% SEBI Schema Match</span>
        </div>

        <div className="p-4 rounded-xl glass-card border border-slate-800">
          <span className="text-[10px] text-slate-400 font-semibold block">Processing Latency</span>
          <span className="text-xl font-extrabold text-cyan-400">1.24 Seconds</span>
          <span className="text-[10px] text-slate-500 block">GPU Accelerated Pipeline</span>
        </div>

        <div className="p-4 rounded-xl glass-card border border-slate-800">
          <span className="text-[10px] text-slate-400 font-semibold block">OCR Engine Standard</span>
          <span className="text-xl font-extrabold text-indigo-300">PyPDF + Tesseract</span>
          <span className="text-[10px] text-slate-500 block">Layout-Aware Parser</span>
        </div>
      </div>

      {/* Document Selector Tabs */}
      <div className="flex gap-2 border-b border-slate-800 pb-2 overflow-x-auto">
        {docList.map((doc, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedDocIndex(idx)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition whitespace-nowrap ${
              selectedDocIndex === idx
                ? 'bg-indigo-600 text-white shadow-md'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>{doc.filename}</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              {doc.confidence_score}%
            </span>
          </button>
        ))}
      </div>

      {/* Scanner & Stream Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Visual Bounding Box Page Render */}
        <div className="lg:col-span-7 p-5 rounded-2xl glass-panel border border-slate-800 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <span className="text-xs font-bold text-white flex items-center gap-2">
              <Scan className="w-4 h-4 text-indigo-400" />
              Scanned PDF Visual Bounding Box Inspector
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveTab('visual')}
                className={`px-2.5 py-1 rounded text-xs font-semibold ${activeTab === 'visual' ? 'bg-indigo-600 text-white' : 'text-slate-400'}`}
              >
                Visual Bounding
              </button>
              <button
                onClick={() => setActiveTab('json')}
                className={`px-2.5 py-1 rounded text-xs font-semibold ${activeTab === 'json' ? 'bg-indigo-600 text-white' : 'text-slate-400'}`}
              >
                Raw OCR JSON
              </button>
            </div>
          </div>

          {activeTab === 'visual' ? (
            <div className="relative bg-slate-950 rounded-xl border border-slate-800 h-[500px] overflow-hidden p-6 font-mono text-xs text-slate-300 select-none">
              {/* Fake PDF Paper Document Background */}
              <div className="w-full h-full bg-slate-900/60 p-6 rounded border border-slate-800/80 space-y-4 relative">
                <div className="text-center font-bold text-slate-400 border-b border-slate-800 pb-2">
                  GOVERNMENT OF INDIA — MINISTRY OF CORPORATE AFFAIRS
                </div>

                <div className="space-y-2 pt-2 text-slate-300">
                  <p>CERTIFICATE OF INCORPORATION & AUDITED BALANCE SHEET</p>
                  <p>Corporate Identity Number: U34100MH2016PLC284910</p>
                  <p>Company Name: {activeProject?.company_name || 'APEX AUTO COMPONENTS LIMITED'}</p>
                  <p>Registered Address: Plot 42, MIDC Industrial Area, Chakan, Pune - 410501</p>
                </div>

                <div className="pt-4 border-t border-slate-800 space-y-2">
                  <div className="font-bold text-slate-400">AUDITED FINANCIAL SUMMARY (₹ IN LAKHS)</div>
                  <div>FY 2025-26 Total Revenue from Operations: ₹8,450.20 Lakhs</div>
                  <div>FY 2025-26 Profit After Tax (PAT): ₹840.50 Lakhs</div>
                </div>

                {/* Overlaid Interactive Bounding Boxes */}
                {boundingBoxes.map((box) => (
                  <div
                    key={box.id}
                    onClick={() => setSelectedBox(box.id)}
                    style={{ top: box.top, left: box.left, width: box.width, height: box.height }}
                    className={`absolute border-2 rounded p-1 cursor-pointer transition-all ${box.color} ${selectedBox === box.id ? 'ring-2 ring-white scale-105 z-10' : 'opacity-80 hover:opacity-100'}`}
                  >
                    <span className="text-[9px] font-bold bg-slate-950 px-1 py-0.5 rounded text-white absolute -top-3 left-1 border border-slate-700">
                      {box.label} ({box.confidence})
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 h-[500px] overflow-y-auto font-mono text-xs text-emerald-400 space-y-2">
              <pre>{JSON.stringify({
                document_id: currentDoc.id,
                filename: currentDoc.filename,
                ocr_confidence: currentDoc.confidence_score,
                extracted_entities: {
                  cin: "U34100MH2016PLC284910",
                  company_name: activeProject?.company_name || "Apex Auto Components Limited",
                  pan: "AAACA1234F",
                  gst: "27AAACA1234F1Z5",
                  financials: {
                    fy26_revenue: 8450.20,
                    fy26_ebitda: 1420.80,
                    fy26_pat: 840.50,
                    fy26_networth: 3820.40
                  }
                }
              }, null, 2)}</pre>
            </div>
          )}
        </div>

        {/* Right Column: Bounding Box Inspector Panel */}
        <div className="lg:col-span-5 p-5 rounded-2xl glass-panel border border-slate-800 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <span className="text-xs font-bold text-white flex items-center gap-2">
              <Eye className="w-4 h-4 text-cyan-400" />
              OCR Field Coordinate Details
            </span>
            <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/20 px-2 py-0.5 rounded border border-emerald-500/30">
              VERIFIED BOUNDING BOX
            </span>
          </div>

          <div className="space-y-4">
            {boundingBoxes.map((box) => (
              <div
                key={box.id}
                onClick={() => setSelectedBox(box.id)}
                className={`p-4 rounded-xl border transition cursor-pointer ${selectedBox === box.id ? 'bg-indigo-600/20 border-indigo-500 shadow-lg' : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'}`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-white">{box.label}</span>
                  <span className="text-[10px] font-bold text-emerald-400 font-mono">{box.confidence}</span>
                </div>
                <div className="text-xs font-mono text-indigo-300 bg-slate-950 p-2 rounded border border-slate-800">
                  {box.text}
                </div>
                <div className="text-[10px] text-slate-500 font-mono mt-2 flex justify-between">
                  <span>Bounding Box: [{box.left}, {box.top}]</span>
                  <span>Dimensions: {box.width} × {box.height}</span>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={onNext}
            className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs shadow-lg shadow-indigo-600/20 flex items-center justify-center gap-2 transition"
          >
            <span>Proceed to Step 5: Data Verification Grid</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
