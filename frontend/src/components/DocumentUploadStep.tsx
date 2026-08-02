import React, { useState } from 'react';
import { useProject } from '../context/ProjectContext';
import { Upload, FileText, CheckCircle2, ArrowRight, ShieldCheck, Loader2 } from 'lucide-react';
import { api } from '../services/api';

export const DocumentUploadStep: React.FC<{ onNext: () => void }> = ({ onNext }) => {
  const { activeProject, documents, refreshProjectData } = useProject();
  const [uploading, setUploading] = useState(false);
  const [docType, setDocType] = useState('financials');

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0] && activeProject) {
      const file = e.target.files[0];
      setUploading(true);
      try {
        await api.uploadDocument(activeProject.id, docType, file);
        await refreshProjectData();
      } finally {
        setUploading(false);
      }
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto p-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Upload className="w-5 h-5 text-indigo-400" />
            Step 3: Document Upload & OCR Ingestion Pipeline
          </h2>
          <p className="text-xs text-slate-400">Upload financial statements, incorporation certificates, MoA/AoA, and shareholding patterns</p>
        </div>
      </div>

      {/* Upload Zone */}
      <div className="p-8 rounded-2xl glass-panel border-2 border-dashed border-slate-700 hover:border-indigo-500 transition text-center space-y-4">
        <div className="w-12 h-12 rounded-full bg-indigo-600/20 text-indigo-400 flex items-center justify-center mx-auto">
          {uploading ? <Loader2 className="w-6 h-6 animate-spin" /> : <Upload className="w-6 h-6" />}
        </div>
        
        <div>
          <h3 className="text-sm font-semibold text-white">Drag and drop your company documents here</h3>
          <p className="text-xs text-slate-400 mt-1">Supports PDF, DOCX, XLSX and scanned images up to 50MB</p>
        </div>

        <div className="flex items-center justify-center gap-3 pt-2">
          <select
            value={docType}
            onChange={(e) => setDocType(e.target.value)}
            className="px-3 py-1.5 text-xs bg-slate-900 border border-slate-800 rounded-lg text-slate-200 focus:outline-none"
          >
            <option value="financials">Audited Financial Statements (3 Years)</option>
            <option value="incorporation">Certificate of Incorporation & MoA/AoA</option>
            <option value="shareholding">Shareholding Pattern & Promoter Registry</option>
            <option value="contracts">Material Contracts & Valuation Reports</option>
          </select>

          <label className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs cursor-pointer shadow-lg shadow-indigo-600/20 transition">
            <span>Browse Files</span>
            <input type="file" onChange={handleFileUpload} className="hidden" accept=".pdf,.docx,.xlsx,.jpg,.png" />
          </label>
        </div>
      </div>

      {/* Uploaded Documents List */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-white">Uploaded & Extracted Documents ({documents.length})</h3>

        <div className="space-y-2">
          {documents.map((doc) => (
            <div key={doc.id} className="p-4 rounded-xl glass-card border border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-indigo-400" />
                <div>
                  <div className="text-xs font-semibold text-white">{doc.filename}</div>
                  <div className="text-[10px] text-slate-400 capitalize">{doc.document_type} • Uploaded today</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> OCR {doc.confidence_score}%
                </span>

                <span className="text-xs font-semibold text-slate-300 bg-slate-800 px-2.5 py-1 rounded">
                  {doc.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="pt-4 flex justify-end">
        <button
          onClick={onNext}
          className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs shadow-lg shadow-indigo-600/25 flex items-center gap-2 transition"
        >
          <span>Proceed to OCR Verification (Steps 4 & 5)</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
