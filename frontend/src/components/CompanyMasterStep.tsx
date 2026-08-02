import React, { useState } from 'react';
import { useProject } from '../context/ProjectContext';
import { Building2, Save, CheckCircle2, ArrowRight } from 'lucide-react';

export const CompanyMasterStep: React.FC<{ onNext: () => void }> = ({ onNext }) => {
  const { activeProject, createProject } = useProject();
  
  const [formData, setFormData] = useState({
    company_name: activeProject?.company_name || 'Apex Auto Components Limited',
    cin: activeProject?.cin || 'U34100MH2016PLC284910',
    pan: activeProject?.pan || 'AAACA1234F',
    gst: activeProject?.gst || '27AAACA1234F1Z5',
    incorporation_date: activeProject?.incorporation_date || '14/05/2016',
    registered_address: activeProject?.registered_address || 'Plot 42, MIDC Industrial Area, Chakan, Pune - 410501, Maharashtra',
    exchange: activeProject?.exchange || 'NSE EMERGE',
    issue_type: activeProject?.issue_type || 'Fresh Issue + OFS',
    target_issue_size_cr: activeProject?.target_issue_size_cr || 25.0,
    promoter_name: activeProject?.promoter_name || 'Mr. Rajesh Kumar & Mrs. Sunita Kumar',
    merchant_banker: activeProject?.merchant_banker || 'Pinnacle Capital Advisory Services Ltd'
  });

  const [saved, setSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
    onNext();
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto p-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Building2 className="w-5 h-5 text-indigo-400" />
            Steps 1 & 2: Project Creation & Issuer Company Details
          </h2>
          <p className="text-xs text-slate-400">Enter corporate identity, statutory registrations, and SME issue parameters</p>
        </div>
        
        {saved && (
          <div className="flex items-center gap-1.5 px-3 py-1 rounded bg-emerald-500/20 text-emerald-400 text-xs font-medium border border-emerald-500/30">
            <CheckCircle2 className="w-4 h-4" /> Saved Successfully
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="p-6 rounded-2xl glass-panel border border-slate-800 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">Issuer Company Name *</label>
            <input
              type="text"
              required
              value={formData.company_name}
              onChange={(e) => setFormData({ ...formData, company_name: e.target.value })}
              className="w-full px-3.5 py-2 text-xs bg-slate-900 border border-slate-800 rounded-lg text-white focus:border-indigo-500 focus:outline-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">Corporate Identification Number (CIN) *</label>
            <input
              type="text"
              required
              value={formData.cin}
              onChange={(e) => setFormData({ ...formData, cin: e.target.value })}
              className="w-full px-3.5 py-2 text-xs bg-slate-900 border border-slate-800 rounded-lg text-white font-mono focus:border-indigo-500 focus:outline-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">Permanent Account Number (PAN) *</label>
            <input
              type="text"
              required
              value={formData.pan}
              onChange={(e) => setFormData({ ...formData, pan: e.target.value })}
              className="w-full px-3.5 py-2 text-xs bg-slate-900 border border-slate-800 rounded-lg text-white font-mono focus:border-indigo-500 focus:outline-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">GST Registration Number *</label>
            <input
              type="text"
              required
              value={formData.gst}
              onChange={(e) => setFormData({ ...formData, gst: e.target.value })}
              className="w-full px-3.5 py-2 text-xs bg-slate-900 border border-slate-800 rounded-lg text-white font-mono focus:border-indigo-500 focus:outline-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">Date of Incorporation *</label>
            <input
              type="text"
              required
              value={formData.incorporation_date}
              onChange={(e) => setFormData({ ...formData, incorporation_date: e.target.value })}
              className="w-full px-3.5 py-2 text-xs bg-slate-900 border border-slate-800 rounded-lg text-white focus:border-indigo-500 focus:outline-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">Target SME Stock Exchange *</label>
            <select
              value={formData.exchange}
              onChange={(e) => setFormData({ ...formData, exchange: e.target.value })}
              className="w-full px-3.5 py-2 text-xs bg-slate-900 border border-slate-800 rounded-lg text-white focus:border-indigo-500 focus:outline-none"
            >
              <option value="NSE EMERGE">NSE EMERGE (SME Platform)</option>
              <option value="BSE SME">BSE SME Platform</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">Target Issue Size (₹ Crore) *</label>
            <input
              type="number"
              step="0.1"
              max="25.0"
              required
              value={formData.target_issue_size_cr}
              onChange={(e) => setFormData({ ...formData, target_issue_size_cr: parseFloat(e.target.value) })}
              className="w-full px-3.5 py-2 text-xs bg-slate-900 border border-slate-800 rounded-lg text-white focus:border-indigo-500 focus:outline-none"
            />
            <p className="text-[10px] text-slate-400">SEBI ICDR SME Cap: Max ₹25.0 Crore</p>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">Lead Merchant Banker *</label>
            <input
              type="text"
              required
              value={formData.merchant_banker}
              onChange={(e) => setFormData({ ...formData, merchant_banker: e.target.value })}
              className="w-full px-3.5 py-2 text-xs bg-slate-900 border border-slate-800 rounded-lg text-white focus:border-indigo-500 focus:outline-none"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-300">Registered Office Address *</label>
          <textarea
            rows={2}
            required
            value={formData.registered_address}
            onChange={(e) => setFormData({ ...formData, registered_address: e.target.value })}
            className="w-full px-3.5 py-2 text-xs bg-slate-900 border border-slate-800 rounded-lg text-white focus:border-indigo-500 focus:outline-none"
          />
        </div>

        <div className="pt-4 flex justify-end gap-3 border-t border-slate-800">
          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs shadow-lg shadow-indigo-600/25 flex items-center gap-2 transition"
          >
            <span>Save & Proceed to Upload Documents (Step 3)</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </form>
    </div>
  );
};
