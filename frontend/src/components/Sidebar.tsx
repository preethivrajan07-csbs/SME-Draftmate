import React from 'react';
import { useProject } from '../context/ProjectContext';
import { 
  LayoutDashboard, 
  FileText, 
  CheckCircle2, 
  BookOpen, 
  History, 
  Settings, 
  Layers, 
  Sparkles,
  ShieldAlert,
  Download,
  GitCompare,
  MessageSquare
} from 'lucide-react';

interface SidebarProps {
  currentView: string;
  onSelectView: (view: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentView, onSelectView }) => {
  const { activeStep, setActiveStep, complianceScore } = useProject();

  const mainNav = [
    { id: 'landing', label: 'Platform Overview', icon: Sparkles },
    { id: 'dashboard', label: 'Executive Dashboard', icon: LayoutDashboard },
    { id: 'workflow', label: '11-Step DRHP Workflow', icon: Layers },
    { id: 'kb', label: 'SEBI Knowledge Base', icon: BookOpen },
    { id: 'audit', label: 'Audit Logs & Trace', icon: History },
    { id: 'admin', label: 'Admin & System Config', icon: Settings },
  ];

  const workflowSteps = [
    { step: 1, name: '1. Create Project' },
    { step: 2, name: '2. Company Details' },
    { step: 3, name: '3. Upload Documents' },
    { step: 4, name: '4. OCR Extraction' },
    { step: 5, name: '5. Data Verification' },
    { step: 6, name: '6. AI Questionnaire' },
    { step: 7, name: '7. Compliance Audit' },
    { step: 8, name: '8. Generate DRHP' },
    { step: 9, name: '9. Human Review' },
    { step: 10, name: '10. Version Compare' },
    { step: 11, name: '11. Final Export' },
  ];

  return (
    <aside className="w-64 glass-panel border-r border-slate-800/80 flex flex-col h-[calc(100vh-61px)] sticky top-[61px]">
      <div className="p-4 space-y-6 flex-1 overflow-y-auto">
        {/* Navigation Section */}
        <div>
          <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2 px-2">
            Main Platform
          </div>
          <nav className="space-y-1">
            {mainNav.map((item) => {
              const Icon = item.icon;
              const active = currentView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onSelectView(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition ${
                    active
                      ? 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/30'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* 11-Step SME Workflow Direct Jumper */}
        <div>
          <div className="flex items-center justify-between text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2 px-2">
            <span>SME IPO Workflow</span>
            <span className="text-[10px] text-indigo-400">Step {activeStep}/11</span>
          </div>
          <div className="space-y-1">
            {workflowSteps.map((s) => {
              const isActiveStep = currentView === 'workflow' && activeStep === s.step;
              const isDone = activeStep > s.step;
              return (
                <button
                  key={s.step}
                  onClick={() => {
                    onSelectView('workflow');
                    setActiveStep(s.step);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-xs transition ${
                    isActiveStep
                      ? 'bg-indigo-600 text-white font-medium shadow-md shadow-indigo-600/20'
                      : isDone
                      ? 'text-slate-300 hover:bg-slate-900/50'
                      : 'text-slate-500 hover:text-slate-300 hover:bg-slate-900/30'
                  }`}
                >
                  <span className="truncate">{s.name}</span>
                  {isDone && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Realtime SEBI Compliance Widget */}
        <div className="p-3.5 rounded-xl bg-gradient-to-br from-slate-900 to-indigo-950/40 border border-slate-800">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-slate-300">SEBI Compliance Score</span>
            <span className="text-xs font-bold text-emerald-400">{complianceScore}%</span>
          </div>
          <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-indigo-500 via-cyan-400 to-emerald-400 transition-all duration-500"
              style={{ width: `${complianceScore}%` }}
            />
          </div>
          <p className="text-[10px] text-slate-400 mt-2 flex items-center gap-1">
            <ShieldAlert className="w-3 h-3 text-amber-400 inline" />
            0 Critical violations found
          </p>
        </div>
      </div>
    </aside>
  );
};
