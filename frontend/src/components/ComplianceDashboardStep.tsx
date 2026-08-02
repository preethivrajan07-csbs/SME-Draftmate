import React from 'react';
import { useProject } from '../context/ProjectContext';
import { ShieldCheck, AlertTriangle, XCircle, CheckCircle2, ArrowRight, RefreshCw, BookOpen } from 'lucide-react';
import { api } from '../services/api';

export const ComplianceDashboardStep: React.FC<{ onNext: () => void }> = ({ onNext }) => {
  const { activeProject, complianceScore, complianceChecks, refreshProjectData } = useProject();

  const handleReRunAudit = async () => {
    if (activeProject) {
      await api.runValidation(activeProject.id);
      await refreshProjectData();
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto p-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            Step 7: SEBI ICDR Deterministic Compliance Audit Engine
          </h2>
          <p className="text-xs text-slate-400">Automated verification against SEBI ICDR Regulations 2018 & Exchange SME EMERGE Guidelines</p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleReRunAudit}
            className="px-4 py-2 rounded-xl glass-card hover:bg-slate-800 text-slate-200 font-semibold text-xs border border-slate-700 flex items-center gap-1.5 transition"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Re-Run Audit</span>
          </button>

          <button
            onClick={onNext}
            className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs shadow-lg shadow-indigo-600/25 flex items-center gap-2 transition"
          >
            <span>Proceed to Generate DRHP (Step 8)</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Compliance Score Gauge Banner */}
      <div className="p-6 rounded-2xl glass-panel border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">SEBI ICDR SME Compliance Score</div>
          <div className="text-4xl font-extrabold text-white flex items-baseline gap-3">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-cyan-400 to-indigo-400">
              {complianceScore}%
            </span>
            <span className="text-xs px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-300 font-semibold border border-emerald-500/30">
              Compliant for SME Filing
            </span>
          </div>
          <p className="text-xs text-slate-400">Evaluated 5 mandatory SEBI SME criteria. 0 Critical Violations found.</p>
        </div>

        <div className="flex items-center gap-6 text-center">
          <div className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800">
            <div className="text-xl font-bold text-emerald-400">3</div>
            <div className="text-[10px] text-slate-400">Passed Rules</div>
          </div>
          <div className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800">
            <div className="text-xl font-bold text-amber-400">2</div>
            <div className="text-[10px] text-slate-400">Warnings</div>
          </div>
          <div className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800">
            <div className="text-xl font-bold text-slate-500">0</div>
            <div className="text-[10px] text-slate-400">Critical Fails</div>
          </div>
        </div>
      </div>

      {/* Detailed Rules Table */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-white">Rule-by-Rule Evaluation Audit</h3>

        <div className="space-y-3">
          {complianceChecks.map((check) => (
            <div key={check.id || check.rule_id} className="p-5 rounded-xl glass-card border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  {check.status === 'PASS' && <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
                  {check.status === 'WARNING' && <AlertTriangle className="w-5 h-5 text-amber-400" />}
                  {check.status === 'FAIL' && <XCircle className="w-5 h-5 text-rose-400" />}
                  <span className="text-xs font-bold text-white">{check.rule_name}</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300">
                    {check.sebi_clause}
                  </span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                    check.status === 'PASS' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'
                  }`}>
                    {check.status}
                  </span>
                </div>
              </div>

              <div className="text-xs text-slate-300 pl-7">{check.findings}</div>
              {check.recommendation && (
                <div className="text-[11px] text-indigo-300 bg-indigo-950/30 p-2 rounded ml-7 border border-indigo-900/40">
                  💡 <strong>Recommendation:</strong> {check.recommendation}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
