import React, { useState } from 'react';
import { useProject } from '../context/ProjectContext';
import { MessageSquare, CheckCircle2, ArrowRight, UserCheck, Send, ShieldCheck } from 'lucide-react';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';

export const ReviewerWorkspaceStep: React.FC<{ onNext: () => void }> = ({ onNext }) => {
  const { activeProject, drhpSections, refreshProjectData } = useProject();
  const { user } = useAuth();
  
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState<any[]>([]);

  React.useEffect(() => {
    if (activeProject) {
      api.getComments(activeProject.id).then(setComments);
    }
  }, [activeProject]);

  const handleAddComment = async () => {
    if (commentText.trim() && activeProject) {
      const c = await api.addComment(activeProject.id, "RISK_FACTORS", commentText);
      setComments([c, ...comments]);
      setCommentText('');
    }
  };

  const handleToggleStatus = async (sectionId: number, statusVal: string) => {
    await api.updateSectionStatus(sectionId, statusVal);
    await refreshProjectData();
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto p-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <UserCheck className="w-5 h-5 text-indigo-400" />
            Step 9: Merchant Banker & Legal Review Workspace
          </h2>
          <p className="text-xs text-slate-400">Collaborative inline commenting, track changes, and role-based section approvals</p>
        </div>

        <button
          onClick={onNext}
          className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs shadow-lg shadow-indigo-600/25 flex items-center gap-2 transition"
        >
          <span>Proceed to Version Compare (Step 10)</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Section Approval Cards */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="text-sm font-bold text-white">DRHP Section Sign-Off Status</h3>

          <div className="space-y-3">
            {drhpSections.map((sec) => (
              <div key={sec.id} className="p-4 rounded-xl glass-card border border-slate-800 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-white">{sec.title}</div>
                  <div className="text-[10px] text-slate-400">Version {sec.version} • Last updated today</div>
                </div>

                <div className="flex items-center gap-3">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                    sec.status === 'Approved' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-indigo-500/20 text-indigo-300'
                  }`}>
                    {sec.status}
                  </span>

                  <button
                    onClick={() => handleToggleStatus(sec.id, sec.status === 'Approved' ? 'In Review' : 'Approved')}
                    className="px-3 py-1 rounded bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white transition"
                  >
                    {sec.status === 'Approved' ? 'Revoke Approval' : 'Approve Section'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Review Comments Stream */}
        <div className="space-y-4">
          <div className="p-5 rounded-2xl glass-panel border border-slate-800 space-y-4">
            <h3 className="text-xs font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-2">
              <MessageSquare className="w-4 h-4 text-indigo-400" />
              Reviewer Discussion Thread
            </h3>

            {/* Comment Input */}
            <div className="space-y-2">
              <textarea
                rows={3}
                placeholder="Add review comment as Merchant Banker / Legal Counsel..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                className="w-full bg-slate-900 p-3 rounded-xl border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none"
              />
              <button
                onClick={handleAddComment}
                className="w-full py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs flex items-center justify-center gap-1.5 transition"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Post Comment</span>
              </button>
            </div>

            {/* Comments List */}
            <div className="space-y-3 max-h-[320px] overflow-y-auto pt-2">
              {comments.map((c) => (
                <div key={c.id} className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-xs space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-indigo-300">{c.author_name}</span>
                    <span className="text-[10px] text-slate-500">Just now</span>
                  </div>
                  <p className="text-slate-300 leading-relaxed">{c.comment_text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
