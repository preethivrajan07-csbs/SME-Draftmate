import React from 'react';
import { Settings, Cpu, ShieldCheck, Key, Users, Database } from 'lucide-react';

export const AdminPanel: React.FC = () => {
  return (
    <div className="space-y-6 max-w-4xl mx-auto p-6">
      <div>
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Settings className="w-5 h-5 text-indigo-400" />
          Admin Console & AI Provider Configuration
        </h2>
        <p className="text-xs text-slate-400">Manage LLM parameters, database connections, and SEBI ICDR compliance rulesets</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* AI Provider Config */}
        <div className="p-6 rounded-2xl glass-panel border border-slate-800 space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-2">
            <Cpu className="w-4 h-4 text-cyan-400" />
            AI Provider Abstraction Layer
          </h3>

          <div className="space-y-3 text-xs">
            <div className="space-y-1">
              <label className="text-slate-300 font-semibold">Active AI Engine</label>
              <select className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-white">
                <option value="gemini">Google Gemini 2.5 Flash (Default)</option>
                <option value="openai">OpenAI GPT-4o / Compatible Interface</option>
                <option value="fallback">Local Deterministic Rule Engine</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-slate-300 font-semibold">Google Gemini API Key</label>
              <input
                type="password"
                defaultValue="********************************"
                className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-white font-mono"
              />
              <p className="text-[10px] text-slate-400">Read securely from process.env.GEMINI_API_KEY</p>
            </div>
          </div>
        </div>

        {/* System Health */}
        <div className="p-6 rounded-2xl glass-panel border border-slate-800 space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-2">
            <Database className="w-4 h-4 text-emerald-400" />
            System Connections & Vector DB
          </h3>

          <div className="space-y-3 text-xs">
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900 border border-slate-800">
              <span>PostgreSQL Database</span>
              <span className="text-emerald-400 font-bold text-[10px] bg-emerald-500/20 px-2 py-0.5 rounded">Connected</span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900 border border-slate-800">
              <span>ChromaDB Vector Store</span>
              <span className="text-emerald-400 font-bold text-[10px] bg-emerald-500/20 px-2 py-0.5 rounded">Indexed (5 Rules)</span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900 border border-slate-800">
              <span>SEBI Rule Engine v2.4</span>
              <span className="text-indigo-400 font-bold text-[10px] bg-indigo-500/20 px-2 py-0.5 rounded">Active</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
