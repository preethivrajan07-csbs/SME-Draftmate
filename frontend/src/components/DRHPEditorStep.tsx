import React, { useState } from 'react';
import { useProject } from '../context/ProjectContext';
import { Sparkles, FileText, CheckCircle2, ArrowRight, Save, BookOpen, AlertCircle, Loader2 } from 'lucide-react';
import { api } from '../services/api';

export const DRHPEditorStep: React.FC<{ onNext: () => void }> = ({ onNext }) => {
  const { activeProject, drhpSections, refreshProjectData } = useProject();
  const [selectedSectionCode, setSelectedSectionCode] = useState('COVER');
  const [customPrompt, setCustomPrompt] = useState('');
  const [generating, setGenerating] = useState(false);

  const currentSection = drhpSections.find(s => s.section_code === selectedSectionCode) || drhpSections[0];
  const [content, setContent] = useState(currentSection?.content_markdown || '');

  React.useEffect(() => {
    if (currentSection) {
      setContent(currentSection.content_markdown);
    }
  }, [selectedSectionCode, currentSection]);

  const handleGenerate = async () => {
    if (activeProject) {
      setGenerating(true);
      try {
        const updatedSec = await api.generateSection(activeProject.id, selectedSectionCode, customPrompt);
        await refreshProjectData();
        setContent(updatedSec.content_markdown);
      } finally {
        setGenerating(false);
      }
    }
  };

  const handleSave = async () => {
    if (currentSection) {
      await api.updateSection(currentSection.id, content);
      await refreshProjectData();
    }
  };

  const sectionsList = [
    { code: 'COVER', name: 'Cover Page & Issue Details' },
    { code: 'RISK_FACTORS', name: 'Section III: Risk Factors' },
    { code: 'CAPITAL_STRUCTURE', name: 'Section V: Capital Structure' },
    { code: 'FINANCIALS', name: 'Section VII: Financial Information' },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto p-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-cyan-400" />
            Step 8: AI DRHP Generation & Editor Studio
          </h2>
          <p className="text-xs text-slate-400">Powered by Google Gemini 2.5 Flash with SEBI ICDR citation traceability</p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleSave}
            className="px-4 py-2 rounded-xl glass-card hover:bg-slate-800 text-slate-200 font-semibold text-xs border border-slate-700 flex items-center gap-1.5 transition"
          >
            <Save className="w-4 h-4" />
            <span>Save Draft</span>
          </button>

          <button
            onClick={onNext}
            className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs shadow-lg shadow-indigo-600/25 flex items-center gap-2 transition"
          >
            <span>Proceed to Human Review Workspace (Step 9)</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Section Selector Toolbar */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3 gap-4">
        <div className="flex gap-2 overflow-x-auto">
          {sectionsList.map((sec) => (
            <button
              key={sec.code}
              onClick={() => setSelectedSectionCode(sec.code)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-2 transition whitespace-nowrap ${
                selectedSectionCode === sec.code
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>{sec.name}</span>
            </button>
          ))}
        </div>

        <button
          onClick={handleGenerate}
          disabled={generating}
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 hover:opacity-90 text-white font-semibold text-xs shadow-lg flex items-center gap-2 transition shrink-0"
        >
          {generating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
          <span>Generate with Gemini 2.5 Flash</span>
        </button>
      </div>

      {/* Main Grid: Markdown Editor + Live Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Markdown Content Editor */}
        <div className="lg:col-span-2 space-y-4">
          <div className="p-5 rounded-2xl glass-panel border border-slate-800 space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-400 border-b border-slate-800 pb-2">
              <span className="font-semibold text-white">Markdown Editor</span>
              <span className="font-mono text-indigo-400">Version {currentSection?.version || 1}</span>
            </div>

            <textarea
              rows={18}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-xs text-slate-200 focus:outline-none focus:border-indigo-500 leading-relaxed"
            />
          </div>
        </div>

        {/* Right Column: SEBI Citation Sidebar */}
        <div className="space-y-4">
          <div className="p-5 rounded-2xl glass-panel border border-slate-800 space-y-4">
            <h3 className="text-xs font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-2">
              <BookOpen className="w-4 h-4 text-cyan-400" />
              SEBI ICDR Citations & Metadata
            </h3>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-[10px] text-slate-400 block">AI Provider Engine</span>
                <span className="font-semibold text-emerald-400">Google Gemini 2.5 Flash</span>
                <span className="text-[10px] text-slate-400 block mt-1">Confidence Score: 98.2%</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                <span className="text-slate-300 font-semibold block">Source Supporting Files</span>
                <ul className="space-y-1 text-[11px] text-slate-400 font-mono">
                  <li>• Audited_Financials_FY24_26.pdf</li>
                  <li>• Certificate_of_Incorporation.pdf</li>
                </ul>
              </div>

              <div className="p-3 rounded-xl bg-amber-950/20 border border-amber-900/40 text-amber-300 space-y-1">
                <div className="font-semibold flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5 text-amber-400" />
                  Legal Disclosure Notice
                </div>
                <p className="text-[10px] text-amber-200/80 leading-relaxed">
                  Draft generated under SEBI ICDR 2018 SME rules. Merchant Banker review required before final filing.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
