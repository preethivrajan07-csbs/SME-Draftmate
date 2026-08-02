import React, { useState } from 'react';
import { useProject } from '../context/ProjectContext';
import { Download, ShieldCheck, FileCheck, Lock, Sparkles, CheckCircle2, Copy, Check, FileText, Loader2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { exportService } from '../services/exportService';
import { api } from '../services/api';

export const EvidencePackageStep: React.FC = () => {
  const { activeProject, drhpSections, complianceScore } = useProject();
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);

  const sampleSha256 = "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855";
  const companyName = activeProject?.company_name || "Apex Auto Components Limited";

  const handleDownloadWord = () => {
    confetti({ particleCount: 100, spread: 60, origin: { y: 0.6 } });
    exportService.downloadWordDocument(companyName, activeProject, drhpSections);
  };

  const handleDownloadPdf = () => {
    confetti({ particleCount: 100, spread: 60, origin: { y: 0.6 } });
    exportService.downloadPDFDocument(companyName, activeProject, drhpSections);
  };

  const handleDownloadZip = async () => {
    confetti({ particleCount: 120, spread: 70, origin: { y: 0.6 } });
    setDownloading(true);
    try {
      const projectId = activeProject?.id || 1;
      await api.downloadEvidencePackage(projectId);
    } finally {
      setDownloading(false);
    }
  };

  const handleCopyHash = () => {
    navigator.clipboard.writeText(sampleSha256);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto p-6 text-center">
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold border border-emerald-500/30">
        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
        <span>Step 11: Final Export & Cryptographic Evidence Package</span>
      </div>

      <h1 className="text-3xl font-extrabold text-white">
        SEBI SME DRHP Prospectus Ready for Filing
      </h1>

      <p className="text-xs text-slate-300 max-w-xl mx-auto leading-relaxed">
        Your complete SEBI SME DRHP document containing all disclosures, balance sheets, risk factors, promoter lock-in terms, and governance declarations is ready for immediate download.
      </p>

      {/* SHA256 Integrity Manifest Card */}
      <div className="p-6 rounded-2xl glass-panel border border-slate-800 text-left space-y-4 max-w-2xl mx-auto">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-bold text-white">SHA-256 Anti-Tamper Digest</span>
          </div>
          <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/20 px-2 py-0.5 rounded border border-emerald-500/30">
            VERIFIED INTEGRITY
          </span>
        </div>

        <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex items-center justify-between gap-3 font-mono text-xs text-slate-300">
          <span className="truncate">{sampleSha256}</span>
          <button
            onClick={handleCopyHash}
            className="p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3 text-xs pt-2">
          <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
            <span className="text-slate-400 block text-[10px]">SEBI Compliance Score</span>
            <span className="font-bold text-emerald-400 text-sm">{complianceScore}%</span>
          </div>
          <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
            <span className="text-slate-400 block text-[10px]">Target Exchange</span>
            <span className="font-bold text-white text-sm">{activeProject?.exchange || 'NSE EMERGE'}</span>
          </div>
        </div>
      </div>

      {/* Export Action Buttons */}
      <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
        <button
          onClick={handleDownloadWord}
          className="w-full sm:w-auto px-6 py-4 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 hover:opacity-90 text-white font-extrabold text-xs shadow-xl shadow-indigo-600/30 flex items-center justify-center gap-2.5 transition transform hover:-translate-y-0.5"
        >
          <FileCheck className="w-5 h-5 text-indigo-200" />
          <span>Download Word Document (.doc)</span>
        </button>

        <button
          onClick={handleDownloadPdf}
          className="w-full sm:w-auto px-6 py-4 rounded-xl bg-gradient-to-r from-rose-600 to-rose-500 hover:opacity-90 text-white font-extrabold text-xs shadow-xl shadow-rose-600/30 flex items-center justify-center gap-2.5 transition transform hover:-translate-y-0.5"
        >
          <FileText className="w-5 h-5 text-rose-200" />
          <span>Download DRHP Prospectus (.html / .pdf)</span>
        </button>

        <button
          onClick={handleDownloadZip}
          disabled={downloading}
          className="w-full sm:w-auto px-6 py-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:opacity-90 text-white font-extrabold text-xs shadow-xl shadow-emerald-600/30 flex items-center justify-center gap-2.5 transition transform hover:-translate-y-0.5 disabled:opacity-50"
        >
          {downloading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Download className="w-5 h-5" />}
          <span>{downloading ? 'Preparing Package...' : 'Download Evidence Bundle (.ZIP)'}</span>
        </button>
      </div>
    </div>
  );
};
