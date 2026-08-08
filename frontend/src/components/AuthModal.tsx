import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { UserRole } from '../types';
import { X, ShieldCheck, Sparkles, ArrowRight, CheckCircle2, UserCheck } from 'lucide-react';

export const AuthModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const { login } = useAuth();
  const [selectedRole, setSelectedRole] = useState<UserRole>('promoter');
  const [email, setEmail] = useState('promoter@apexauto.co.in');
  const [password, setPassword] = useState('password123');

  // Prevent background body scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

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

  const handleConfirmLogin = async () => {
    await login(email, selectedRole);
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await handleConfirmLogin();
  };

  const currentRoleObj = rolesList.find(r => r.role === selectedRole) || rolesList[0];

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 overscroll-contain">
      <div className="w-full max-w-lg glass-panel border border-slate-800 rounded-2xl shadow-2xl p-6 relative space-y-5 max-h-[90vh] overflow-y-auto overscroll-contain">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl bg-slate-900 text-slate-400 hover:text-white border border-slate-800 transition"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-semibold border border-indigo-500/30">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Persona Authentication</span>
          </div>
          <h2 className="text-xl font-extrabold text-white">Sign In to SME DraftMate</h2>
          <p className="text-xs text-slate-400">Select your persona below and click OK to confirm sign in.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Scroll-contained Roles List */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-300">Select Persona & Role</label>
            <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1 overscroll-contain border border-slate-800/80 rounded-xl p-2 bg-slate-950/60">
              {rolesList.map((item) => {
                const isSelected = selectedRole === item.role;
                return (
                  <div
                    key={item.role}
                    onClick={() => handleRoleSelect(item)}
                    className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition ${
                      isSelected
                        ? 'bg-indigo-600/20 border-indigo-500 text-white shadow-md'
                        : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                    }`}
                  >
                    <div className="space-y-0.5">
                      <div className="text-xs font-bold text-white flex items-center gap-2">
                        <span>{item.label}</span>
                        {isSelected && <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />}
                      </div>
                      <div className="text-[10px] text-slate-400">{item.desc}</div>
                      <div className="text-[10px] font-mono text-slate-500">{item.email}</div>
                    </div>

                    {/* OK / Select Button for each role item */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRoleSelect(item);
                        handleConfirmLogin();
                      }}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition shrink-0 ${
                        isSelected
                          ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-600/30'
                          : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
                      }`}
                    >
                      {isSelected ? 'OK ✓' : 'Select OK'}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Email & Password inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-slate-300">Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-1.5 text-xs bg-slate-900 border border-slate-800 rounded-lg text-white font-mono focus:border-indigo-500 focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-slate-300">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-1.5 text-xs bg-slate-900 border border-slate-800 rounded-lg text-white font-mono focus:border-indigo-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Prominent OK & Confirm Sign In Button */}
          <div className="pt-2 flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="w-1/3 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 font-semibold text-xs border border-slate-800 transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="w-2/3 py-3 rounded-xl bg-gradient-to-r from-emerald-600 via-indigo-600 to-indigo-500 hover:opacity-90 text-white font-extrabold text-xs shadow-xl shadow-emerald-600/30 flex items-center justify-center gap-2 transition"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-300" />
              <span>OK — Confirm Sign In ({currentRoleObj.label})</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
