import React, { useState, useEffect } from 'react';
import { History, ShieldCheck, User } from 'lucide-react';
import { api } from '../services/api';
import { AuditLog } from '../types';

export const AuditLogsView: React.FC = () => {
  const [logs, setLogs] = useState<AuditLog[]>([]);

  useEffect(() => {
    api.getAuditLogs().then(setLogs);
  }, []);

  return (
    <div className="space-y-6 max-w-5xl mx-auto p-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <History className="w-5 h-5 text-indigo-400" />
            Platform Audit Trail & Compliance Activity Logs
          </h2>
          <p className="text-xs text-slate-400">Complete immutable record of AI generation, document verification, and merchant banker sign-offs</p>
        </div>
      </div>

      <div className="rounded-2xl glass-panel border border-slate-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-900/80 text-[10px] text-slate-400 uppercase tracking-wider border-b border-slate-800">
              <tr>
                <th className="p-3.5">Timestamp</th>
                <th className="p-3.5">User & Role</th>
                <th className="p-3.5">Action</th>
                <th className="p-3.5">Entity</th>
                <th className="p-3.5">Audit Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {logs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-900/50 transition">
                  <td className="p-3.5 font-mono text-[11px] text-slate-400">
                    {new Date(log.timestamp).toLocaleString()}
                  </td>
                  <td className="p-3.5">
                    <div className="font-semibold text-white">{log.user_email}</div>
                    <div className="text-[10px] text-indigo-400 capitalize">{log.user_role}</div>
                  </td>
                  <td className="p-3.5 font-mono font-bold text-indigo-300">{log.action}</td>
                  <td className="p-3.5 font-mono text-slate-400">{log.entity_type}</td>
                  <td className="p-3.5 text-slate-300 max-w-xs truncate">{log.details}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
