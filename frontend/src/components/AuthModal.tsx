import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { UserRole } from '../types';
import { X, ShieldCheck, Sparkles, CheckCircle2, UserCheck, ArrowRight, Check } from 'lucide-react';

export const AuthModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const { login } = useAuth();
  const [selectedRole, setSelectedRole] = useState<UserRole>('promoter');
  const [email, setEmail] = useState('promoter@apexauto.co.in');
  const [password, setPassword] = useState('password123');

  // Complete 100% lock on background page scrolling for mobile and desktop
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      const originalPosition = document.body.style.position;
      const originalWidth = document.body.style.width;

      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';

      return () => {
        document.body.style.overflow = originalOverflow;
        document.body.style.position = originalPosition;
        document.body.style.width = originalWidth;
      };
    }
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
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 overscroll-none select-none">
      <div 
        className="w-full max-w-lg glass-panel border border-slate-800 rounded-2xl shadow-2xl p-6 relative space-y-5 max-h-[85vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl bg-slate-900 text-slate-400 hover:text-white border border-slate-800 transition"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="space-y-1 shrink-0">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-semibold border border-indigo-500/30">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Select Persona & Sign In</span>
          </div>
          <h2 className="text-xl font-extrabold text-white">Sign In to SME DraftMate</h2>
          <p className="text-xs text-slate-400">Choose your active persona from the list below and click OK to confirm.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 flex-1 flex flex-col justify-between overflow-hidden">
          {/* Scroll-contained Roles List with strict overscroll containment */}
          <div className="space-y-2 overflow-hidden flex-1 flex flex-col">
            <label className="text-xs font-bold text-slate-300">Choose Role Persona</label>
            <div className="space-y-2 overflow-y-auto max-h-[260px] pr-1.5 overscroll-contain border border-slate-800 rounded-xl p-2 bg-slate-950/80">
              {rolesList.map((item) => {
                const isSelected = selectedRole === item.role;
                return (
                  <div
                    key={item.role}
                    onClick={() => handleRoleSelect(item)}
                    className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition ${
                      isSelected
                        ? 'bg-indigo-600/25 border-indigo-500 text-white shadow-lg ring-1 ring-indigo-500'
                        : 'bg-slate-900/60 border-slate-800/80 text-slate-400 hover:text-slate-200 hover:border-slate-700'
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

                    {/* OK / Confirm Action Button */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRoleSelect(item);
                        handleConfirmLogin();
                      }}
                      className={`px-3.5 py-2 rounded-xl text-xs font-extrabold transition shrink-0 flex items-center gap-1 ${
                        isSelected
                          ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-600/30'
                          : 'bg-slate-800 hover:bg-indigo-600 text-slate-300 hover:text-white border border-slate-700'
                      }`}
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>{isSelected ? 'OK ✓' : 'OK'}</span>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Email & Password inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 shrink-0">
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

          {/* Bottom Confirmation OK Button */}
          <div className="pt-3 flex items-center gap-3 shrink-0">
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
              <span>OK — Sign In as {currentRoleObj.label}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
