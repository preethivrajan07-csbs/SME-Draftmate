import React, { useState, useEffect } from 'react';
import { BookOpen, Search, Filter, ExternalLink, ShieldCheck } from 'lucide-react';
import { api } from '../services/api';
import { KnowledgeItem } from '../types';

export const KnowledgeBaseView: React.FC = () => {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<string>('');
  const [items, setItems] = useState<KnowledgeItem[]>([]);

  useEffect(() => {
    api.searchKB(query, category).then(setItems);
  }, [query, category]);

  return (
    <div className="space-y-6 max-w-5xl mx-auto p-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-indigo-400" />
            SEBI RAG Knowledge Base & Regulatory Index
          </h2>
          <p className="text-xs text-slate-400">Searchable repository of SEBI ICDR Regulations, NSE EMERGE Circulars & Disclosure Checklists</p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search regulations (e.g., 'Promoter lock-in', 'EBITDA', 'Schedule VI')..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
          />
        </div>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-200 focus:outline-none"
        >
          <option value="">All Categories</option>
          <option value="Eligibility">Eligibility</option>
          <option value="Capital Structure">Capital Structure</option>
          <option value="Financial Disclosures">Financial Disclosures</option>
          <option value="Risk Factors">Risk Factors</option>
          <option value="Legal">Legal</option>
        </select>
      </div>

      {/* Regulations Results */}
      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.id} className="p-5 rounded-2xl glass-card border border-slate-800 space-y-3">
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  {item.id}
                </span>
                <h3 className="text-sm font-bold text-white mt-1.5">{item.title}</h3>
                <div className="text-[11px] text-slate-400">{item.source}</div>
              </div>

              <span className="text-[10px] font-semibold px-2.5 py-1 rounded bg-slate-800 text-slate-300">
                {item.category}
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed bg-slate-950 p-3 rounded-xl border border-slate-800/80 font-sans">
              {item.content}
            </p>

            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              {item.tags?.map((t, idx) => (
                <span key={idx} className="text-[10px] px-2 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800 font-mono">
                  #{t}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
