import React from 'react';
import { useProject } from '../context/ProjectContext';
import { GitCompare, ArrowRight, FileText } from 'lucide-react';

export const VersionCompareStep: React.FC<{ onNext: () => void }> = ({ onNext }) => {
  return (
    <div className="space-y-6 max-w-5xl mx-auto p-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <GitCompare className="w-5 h-5 text-indigo-400" />
            Step 10: DRHP Version Comparison & Diff Workspace
          </h2>
          <p className="text-xs text-slate-400">Visual side-by-side diff highlighting text additions, deletions, and merchant banker revisions</p>
        </div>

        <button
          onClick={onNext}
          className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs shadow-lg shadow-indigo-600/25 flex items-center gap-2 transition"
        >
          <span>Proceed to Final Export (Step 11)</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Version 1 */}
        <div className="p-5 rounded-2xl glass-panel border border-slate-800 space-y-3">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <span className="text-xs font-bold text-rose-400">Version 1.0 (Initial AI Draft)</span>
            <span className="text-[10px] font-mono text-slate-400">Drafted July 28, 2026</span>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs font-mono text-slate-300 space-y-2 h-[380px] overflow-y-auto">
            <div className="bg-rose-950/30 p-2 rounded border border-rose-900/40 text-rose-200">
              - Total raw material procurement concentration: 72.0% from top 5 suppliers.
            </div>
            <div>
              - Pending Tax Proceedings before ITAT: Income tax demand of ₹1.42 Crore.
            </div>
          </div>
        </div>

        {/* Version 2 */}
        <div className="p-5 rounded-2xl glass-panel border border-slate-800 space-y-3">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <span className="text-xs font-bold text-emerald-400">Version 2.0 (Current Banker Revised)</span>
            <span className="text-[10px] font-mono text-slate-400">Updated August 1, 2026</span>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs font-mono text-slate-300 space-y-2 h-[380px] overflow-y-auto">
            <div className="bg-emerald-950/30 p-2 rounded border border-emerald-900/40 text-emerald-200">
              + Re-verified Supplier Concentration: 64.2% based on FY26 Tax Audit Report Annexure 4.
            </div>
            <div>
              - Pending Tax Proceedings before ITAT: Income tax demand of ₹1.42 Crore.
            </div>
            <div className="bg-emerald-950/30 p-2 rounded border border-emerald-900/40 text-emerald-200">
              + Added Annexure B promoter 3-year lock-in undertaking declaration.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
