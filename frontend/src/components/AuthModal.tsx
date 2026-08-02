import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { UserRole } from '../types';
import { X, ShieldCheck, Sparkles, ArrowRight, UserCheck } from 'lucide-react';

export const AuthModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const { login } = useAuth();
  const [selectedRole, setSelectedRole] = useState<UserRole>('promoter');
  const [email, setEmail] = useState('promoter@apexauto.co.in');
  const [password, setPassword] = useState('password123');

  if (!isOpen) return null;

  const rolesList: { role: UserRole; label: string; email: string; desc: string }[] = [
    { role: 'promoter', label: 'SME Promoter', email: 'promoter@apexauto.co.in', desc: 'Company promoter or CS filing SME IPO' },
    { role: 'banker', label: 'Merchant Banker', email: 'banker@pinnaclecap.in', desc: 'Lead Manager evaluating DRHP compliance' },
    { role: 'legal', label: 'Legal Reviewer', email: 'legal@jurislex.com', desc: 'Legal counsel verifying disclosures' },
    { role: 'compliance', label: 'Compliance Officer', email: 'compliance@sebi-advisory.in', desc: 'Audit & statutory compliance officer' },
    { role: 'admin', label: 'Administrator', email: 'admin@smedraftmate.io', desc: 'Platform admin & system manager' },
  ];

  const handleRoleSelect = (r: typeof rolesList[0]) => {
    setSelectedRole(r.role);
    setEmail(r.email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(email, selectedRole);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="w-full max-w-lg glass-panel border border-slate-800 rounded-2xl shadow-2xl p-6 relative space-y-6">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg bg-slate-900 text-slate-400 hover:text-white transition"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-semibold border border-indigo-500/30">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Select Your Persona</span>
          </div>
          <h2 className="text-xl font-bold text-white">Sign In to SME DraftMate</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-300">Choose User Role</label>
            <div className="grid grid-cols-1 gap-2">
              {rolesList.map((item) => (
                <button
                  type="button"
                  key={item.role}
                  onClick={() => handleRoleSelect(item)}
                  className={`p-3 rounded-xl text-left border flex items-center justify-between transition ${
                    selectedRole === item.role
                      ? 'bg-indigo-600/20 border-indigo-500 text-white'
                      : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <div>
                    <div className="text-xs font-bold text-white flex items-center gap-2">
                      <span>{item.label}</span>
                      {selectedRole === item.role && <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />}
                    </div>
                    <div className="text-[10px] text-slate-400">{item.desc}</div>
                  </div>
                  <span className="text-[10px] font-mono text-slate-500">{item.email}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-1.5 pt-2">
            <label className="text-xs font-semibold text-slate-300">Email Address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3.5 py-2 text-xs bg-slate-900 border border-slate-800 rounded-lg text-white font-mono focus:border-indigo-500 focus:outline-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3.5 py-2 text-xs bg-slate-900 border border-slate-800 rounded-lg text-white font-mono focus:border-indigo-500 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/25 flex items-center justify-center gap-2 transition mt-4"
          >
            <span>Sign In as {selectedRole.toUpperCase()}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
