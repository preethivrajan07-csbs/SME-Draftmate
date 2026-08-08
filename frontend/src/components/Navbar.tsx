import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useProject } from '../context/ProjectContext';
import { UserRole } from '../types';
import { ShieldCheck, UserCheck, ChevronDown, Bell, Search, Sparkles, Building2 } from 'lucide-react';

export const Navbar: React.FC<{ onOpenAuth: () => void }> = ({ onOpenAuth }) => {
  const { user, switchRole, isAuthenticated } = useAuth();
  const { activeProject } = useProject();
  const [showRoleMenu, setShowRoleMenu] = useState(false);

  const roleLabels: Record<UserRole, { title: string; color: string }> = {
    promoter: { title: "SME Promoter", color: "bg-indigo-500/20 text-indigo-400 border-indigo-500/40" },
    banker: { title: "Merchant Banker", color: "bg-emerald-500/20 text-emerald-400 border-emerald-500/40" },
    legal: { title: "Legal Reviewer", color: "bg-cyan-500/20 text-cyan-400 border-cyan-500/40" },
    compliance: { title: "Compliance Officer", color: "bg-amber-500/20 text-amber-400 border-amber-500/40" },
    admin: { title: "Administrator", color: "bg-rose-500/20 text-rose-400 border-rose-500/40" },
  };

  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-slate-800/80 px-6 py-3.5 flex items-center justify-between">
      {/* Brand Logo */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-indigo-500/20">
          <Sparkles className="w-5 h-5 text-white" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-lg tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-slate-400">
              SME DraftMate
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              SEBI ICDR 2018
            </span>
          </div>
          <p className="text-xs text-slate-400 hidden sm:block">AI-Powered SEBI SME IPO Prospectus Generator</p>
        </div>
      </div>

      {/* Active Project Indicator */}
      {activeProject && (
        <div className="hidden lg:flex items-center gap-2.5 px-3.5 py-1.5 rounded-lg bg-slate-900/80 border border-slate-800">
          <Building2 className="w-4 h-4 text-indigo-400" />
          <span className="text-xs font-medium text-slate-300">Issuer:</span>
          <span className="text-xs font-semibold text-white">{activeProject.company_name}</span>
          <span className="text-[11px] px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-mono">
            {activeProject.exchange}
          </span>
        </div>
      )}

      {/* Actions & Role Switcher */}
      <div className="flex items-center gap-3">
        {/* Global Search */}
        <div className="relative hidden md:block">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search SEBI regulations..."
            className="w-48 xl:w-64 pl-9 pr-3 py-1.5 text-xs bg-slate-900/90 border border-slate-800 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
          />
        </div>

        <button className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition">
          <Bell className="w-4 h-4" />
        </button>

        {/* Role Switcher Menu */}
        {user ? (
          <div className="relative">
            <button
              onClick={() => setShowRoleMenu(!showRoleMenu)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg glass-card hover:bg-slate-800/80 border border-slate-700 transition"
            >
              <div className="w-7 h-7 rounded-full bg-indigo-600 flex items-center justify-center text-xs font-bold text-white">
                {user.full_name.charAt(0)}
              </div>
              <div className="text-left hidden sm:block">
                <div className="text-xs font-semibold text-white leading-tight">{user.full_name}</div>
                <div className="text-[10px] text-slate-400">{user.organization}</div>
              </div>
              <span className={`text-[10px] font-semibold px-2 py-0.5 rounded border ${roleLabels[user.role].color}`}>
                {roleLabels[user.role].title}
              </span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {showRoleMenu && (
              <div className="absolute right-0 mt-2 w-72 glass-panel rounded-2xl shadow-2xl border border-slate-800 py-2 z-50 overscroll-contain max-h-[320px] overflow-y-auto">
                <div className="px-3 py-1.5 border-b border-slate-800 text-[11px] font-semibold text-slate-400 uppercase tracking-wider flex items-center justify-between">
                  <span>Switch Active Persona</span>
                  <span className="text-[10px] text-indigo-400 font-mono">Select & Confirm</span>
                </div>
                <div className="p-1 space-y-1">
                  {(Object.keys(roleLabels) as UserRole[]).map((r) => {
                    const isCurrent = user.role === r;
                    return (
                      <button
                        key={r}
                        onClick={() => {
                          switchRole(r);
                          setShowRoleMenu(false);
                        }}
                        className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-center justify-between transition ${
                          isCurrent ? 'bg-indigo-600/20 border border-indigo-500/40 text-white font-bold' : 'text-slate-300 hover:bg-slate-900 border border-transparent'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <UserCheck className="w-4 h-4 text-indigo-400 shrink-0" />
                          <span>{roleLabels[r].title}</span>
                        </div>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded transition ${
                          isCurrent ? 'bg-emerald-500 text-white shadow-sm' : 'bg-slate-800 text-slate-400 hover:bg-indigo-600 hover:text-white'
                        }`}>
                          {isCurrent ? 'OK ✓' : 'Switch OK'}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        ) : (
          <button
            onClick={onOpenAuth}
            className="px-4 py-2 text-xs font-semibold rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/25 transition"
          >
            Sign In / Register
          </button>
        )}
      </div>
    </header>
  );
};
