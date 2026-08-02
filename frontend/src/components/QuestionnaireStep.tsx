import React, { useState } from 'react';
import { useProject } from '../context/ProjectContext';
import { HelpCircle, CheckCircle2, ArrowRight, Save, Sparkles } from 'lucide-react';

export const QuestionnaireStep: React.FC<{ onNext: () => void }> = ({ onNext }) => {
  const { activeProject } = useProject();
  
  const [answers, setAnswers] = useState<Record<string, any>>({
    num_directors: 6,
    has_woman_director: "Yes - Independent",
    audit_committee_formed: true,
    promoter_holding: 78.4,
    pledged_shares: false,
    object_capex: 14.50,
    object_working_capital: 6.50
  });

  const [saving, setSaving] = useState(false);

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      onNext();
    }, 600);
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto p-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-indigo-400" />
            Step 6: Adaptive AI Questionnaire
          </h2>
          <p className="text-xs text-slate-400">Dynamic questionnaire adapts fields based on issuer parameters and SEBI ICDR regulations</p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/20 px-2.5 py-1 rounded border border-emerald-500/30">
            Auto-Saved
          </span>
        </div>
      </div>

      <div className="p-6 rounded-2xl glass-panel border border-slate-800 space-y-6">
        {/* Section 1 */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-indigo-300 border-b border-slate-800 pb-2">
            1. Board Structure & Governance
          </h3>

          <div className="space-y-3 text-xs">
            <div className="space-y-1">
              <label className="text-slate-300 font-semibold">Total Number of Directors on Board</label>
              <input
                type="number"
                value={answers.num_directors}
                onChange={(e) => setAnswers({ ...answers, num_directors: parseInt(e.target.value) })}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-white"
              />
            </div>

            <div className="space-y-1">
              <label className="text-slate-300 font-semibold">Includes Independent Woman Director?</label>
              <select
                value={answers.has_woman_director}
                onChange={(e) => setAnswers({ ...answers, has_woman_director: e.target.value })}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-white"
              >
                <option value="Yes - Independent">Yes — Independent Woman Director</option>
                <option value="Yes - Executive">Yes — Executive Director</option>
                <option value="No">No</option>
              </select>
            </div>
          </div>
        </div>

        {/* Section 2 */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-emerald-300 border-b border-slate-800 pb-2">
            2. Objects of the Offer (Fund Allocation in ₹ Cr)
          </h3>

          <div className="grid grid-cols-2 gap-4 text-xs">
            <div className="space-y-1">
              <label className="text-slate-300 font-semibold">Plant Expansion / Capex (₹ Cr)</label>
              <input
                type="number"
                step="0.1"
                value={answers.object_capex}
                onChange={(e) => setAnswers({ ...answers, object_capex: parseFloat(e.target.value) })}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-white"
              />
            </div>

            <div className="space-y-1">
              <label className="text-slate-300 font-semibold">Working Capital (₹ Cr)</label>
              <input
                type="number"
                step="0.1"
                value={answers.object_working_capital}
                onChange={(e) => setAnswers({ ...answers, object_working_capital: parseFloat(e.target.value) })}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-white"
              />
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-800 flex justify-end">
          <button
            onClick={handleSave}
            className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs shadow-lg shadow-indigo-600/25 flex items-center gap-2 transition"
          >
            <span>Save & Proceed to SEBI Compliance Audit (Step 7)</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
