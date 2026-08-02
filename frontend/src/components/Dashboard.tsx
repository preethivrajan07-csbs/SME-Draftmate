import React from 'react';
import { useProject } from '../context/ProjectContext';
import { useAuth } from '../context/AuthContext';
import { 
  Building2, 
  ShieldCheck, 
  FileText, 
  ArrowUpRight, 
  Layers, 
  Sparkles, 
  Clock, 
  AlertTriangle,
  FileSpreadsheet,
  CheckCircle2,
  Plus
} from 'lucide-react';

interface DashboardProps {
  onSelectWorkflowStep: (step: number) => void;
  onOpenNewProjectModal: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onSelectWorkflowStep, onOpenNewProjectModal }) => {
  const { projects, activeProject, complianceScore, complianceChecks, drhpSections } = useProject();
  const { user } = useAuth();

  const criticalIssues = complianceChecks.filter(c => c.status === 'FAIL');
  const warnings = complianceChecks.filter(c => c.status === 'WARNING');
  const passed = complianceChecks.filter(c => c.status === 'PASS');

  return (
    <div className="space-y-8 p-6 max-w-7xl mx-auto">
      {/* Welcome Banner */}
      <div className="p-6 rounded-2xl glass-panel border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-white">Welcome back, {user?.full_name || 'Partner'}</h1>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 capitalize">
              {user?.role} Mode
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Managing SEBI SME DRHP Generation for <strong className="text-slate-200">{activeProject?.company_name || 'Apex Auto Components Ltd'}</strong>
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onOpenNewProjectModal}
            className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs shadow-lg shadow-indigo-600/25 flex items-center gap-2 transition"
          >
            <Plus className="w-4 h-4" />
            <span>New SME Project</span>
          </button>
          
          <button
            onClick={() => onSelectWorkflowStep(7)}
            className="px-4 py-2.5 rounded-xl glass-card hover:bg-slate-800 text-emerald-400 font-semibold text-xs border border-slate-700 flex items-center gap-2 transition"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Run SEBI Audit</span>
          </button>
        </div>
      </div>

      {/* 4 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-xl glass-card border border-slate-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-medium">Compliance Index</span>
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-extrabold text-white flex items-baseline gap-2">
            {complianceScore}%
            <span className="text-xs text-emerald-400 font-semibold">+2.4%</span>
          </div>
          <p className="text-[11px] text-slate-500">SEBI ICDR 2018 SME Standard</p>
        </div>

        <div className="p-5 rounded-xl glass-card border border-slate-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-medium">DRHP Draft Sections</span>
            <FileText className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="text-2xl font-extrabold text-white flex items-baseline gap-2">
            {drhpSections.length} <span className="text-xs font-normal text-slate-400">/ 14</span>
          </div>
          <p className="text-[11px] text-slate-500">4 Sections AI Generated</p>
        </div>

        <div className="p-5 rounded-xl glass-card border border-slate-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-medium">Validation Issues</span>
            <AlertTriangle className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-extrabold text-white flex items-baseline gap-2">
            {warnings.length} <span className="text-xs text-amber-400 font-normal">Warnings</span>
          </div>
          <p className="text-[11px] text-slate-500">0 Critical Violations</p>
        </div>

        <div className="p-5 rounded-xl glass-card border border-slate-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-medium">Target Issue Size</span>
            <Building2 className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-2xl font-extrabold text-white">
            ₹{activeProject?.target_issue_size_cr || 25.0} Cr
          </div>
          <p className="text-[11px] text-slate-500">{activeProject?.exchange || 'NSE EMERGE'}</p>
        </div>
      </div>

      {/* Main Grid: Projects List + Compliance Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Active SME Projects */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Building2 className="w-4 h-4 text-indigo-400" />
              Active SME IPO Projects
            </h2>
            <span className="text-xs text-slate-400">{projects.length} Total Registered</span>
          </div>

          <div className="space-y-3">
            {projects.map((proj) => (
              <div
                key={proj.id}
                className="p-5 rounded-2xl glass-card hover:bg-slate-900/90 border border-slate-800 transition flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-white">{proj.company_name}</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300">
                      {proj.exchange}
                    </span>
                  </div>
                  <div className="text-xs text-slate-400 flex flex-wrap items-center gap-3">
                    <span>CIN: {proj.cin || 'U34100MH2016PLC284910'}</span>
                    <span>•</span>
                    <span>Issue: ₹{proj.target_issue_size_cr} Cr</span>
                    <span>•</span>
                    <span className="text-emerald-400 font-semibold">{proj.status}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                  <div className="text-right">
                    <div className="text-xs font-bold text-emerald-400">{proj.compliance_score}%</div>
                    <div className="text-[10px] text-slate-500">Compliance</div>
                  </div>
                  <button
                    onClick={() => onSelectWorkflowStep(proj.current_step || 7)}
                    className="px-3.5 py-1.5 rounded-lg bg-indigo-600/30 hover:bg-indigo-600 text-indigo-200 hover:text-white font-medium text-xs border border-indigo-500/40 flex items-center gap-1.5 transition"
                  >
                    <span>Resume (Step {proj.current_step})</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: SEBI Compliance Breakdown */}
        <div className="space-y-4">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            Compliance Rule Breakdown
          </h2>

          <div className="p-5 rounded-2xl glass-card border border-slate-800 space-y-4">
            <div className="space-y-3">
              {complianceChecks.map((check, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-xs space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-slate-200">{check.rule_name}</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                      check.status === 'PASS' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                    }`}>
                      {check.status}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-400">{check.findings}</div>
                </div>
              ))}
            </div>

            <button
              onClick={() => onSelectWorkflowStep(7)}
              className="w-full py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs border border-slate-700 transition"
            >
              View Full Compliance Dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
