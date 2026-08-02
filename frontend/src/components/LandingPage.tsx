import React, { useState } from 'react';
import { 
  Sparkles, 
  ShieldCheck, 
  Cpu, 
  FileText, 
  Zap, 
  Scale, 
  Lock, 
  ArrowRight, 
  CheckCircle2, 
  HelpCircle, 
  Building2,
  Check,
  ChevronDown
} from 'lucide-react';

interface LandingPageProps {
  onStartWorkflow: () => void;
  onOpenAuth: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onStartWorkflow, onOpenAuth }) => {
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  const features = [
    {
      icon: Cpu,
      title: "Google Gemini 2.5 Flash DRHP Generator",
      description: "Generates professional SEBI ICDR compliant DRHP sections (Risk Factors, Capital Structure, Financials, Objects of Issue) backed by structured prompts."
    },
    {
      icon: FileText,
      title: "OCR Document Intelligence",
      description: "Extracts CIN, PAN, GST, Board of Directors, and balance sheet tables from PDF/DOCX uploads with confidence scoring and side-by-side verification."
    },
    {
      icon: Scale,
      title: "Deterministic SEBI Validation Engine",
      description: "Runs 25+ automated checks for NSE Emerge / BSE SME rules (Post-issue capital cap <= 25 Cr, 20% promoter lock-in for 3 years, EBITDA track record)."
    },
    {
      icon: Zap,
      title: "RAG SEBI Knowledge Base",
      description: "Retrieves exact SEBI ICDR 2018 clauses, circulars, and disclosure checklists directly into the drafting workflow with source citations."
    },
    {
      icon: ShieldCheck,
      title: "Merchant Banker & Legal Workspace",
      description: "Role-based review workspace with inline commenting, section-by-section approval flags, and visual side-by-side version comparison."
    },
    {
      icon: Lock,
      title: "Cryptographic Evidence Package",
      description: "Bundles final DRHP draft, OCR records, validation audit logs, and citations into a ZIP archive secured with a SHA256 integrity hash."
    }
  ];

  const steps = [
    "Create Project", "Company Details", "Upload Docs", "OCR Extraction", 
    "Data Verification", "AI Questionnaire", "Compliance Audit", 
    "Generate DRHP", "Human Review", "Version Compare", "Final Export"
  ];

  const faqs = [
    {
      q: "Does SME DraftMate guarantee legal SEBI approval?",
      a: "No. SME DraftMate is an AI-assisted drafting and compliance validation tool. Final legal responsibility remains strictly with registered Merchant Bankers, Legal Counsel, and Compliance Officers."
    },
    {
      q: "Which stock exchange SME platforms are supported?",
      a: "SME DraftMate fully supports both NSE EMERGE and BSE SME platforms, adhering strictly to SEBI ICDR 2018 SME guidelines."
    },
    {
      q: "Can I switch AI Providers (e.g. Google Gemini to OpenAI)?",
      a: "Yes! SME DraftMate includes a provider abstraction layer. You can switch between Google Gemini 2.5 Flash, OpenAI-compatible models, or local fallback models via configuration."
    },
    {
      q: "How does the evidence package SHA256 digest work?",
      a: "Every exported package generates a cryptographic SHA-256 hash across all underlying drafts, OCR logs, and validation reports to ensure anti-tamper compliance."
    }
  ];

  return (
    <div className="space-y-16 py-6 pb-16 px-4 max-w-7xl mx-auto">
      {/* Hero Section */}
      <section className="relative text-center space-y-8 pt-8">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card border border-indigo-500/30 text-xs font-semibold text-indigo-300">
          <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
          <span>Enterprise AI Prospectus Drafting & SEBI ICDR Compliance</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight max-w-4xl mx-auto leading-tight text-white">
          Draft SEBI SME IPO Prospectuses in <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-cyan-400 to-emerald-400">Minutes, Not Weeks</span>
        </h1>

        <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
          AI-assisted DRHP generator with OCR document intelligence, deterministic SEBI rule validation, RAG knowledge retrieval, and cryptographic evidence packaging.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <button
            onClick={onStartWorkflow}
            className="px-6 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm shadow-xl shadow-indigo-600/30 flex items-center gap-2.5 transition transform hover:-translate-y-0.5"
          >
            <span>Launch SME Prospectus Generator</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={onOpenAuth}
            className="px-6 py-3.5 rounded-xl glass-card hover:bg-slate-800/80 text-slate-200 font-semibold text-sm border border-slate-700 flex items-center gap-2 transition"
          >
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Sign In / Demo Accounts</span>
          </button>
        </div>

        {/* Hero Interactive Preview Card */}
        <div className="mt-12 p-6 rounded-2xl glass-panel border border-slate-800 shadow-2xl relative max-w-5xl mx-auto text-left">
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-rose-500/80" />
              <div className="w-3 h-3 rounded-full bg-amber-500/80" />
              <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
              <span className="text-xs font-mono text-slate-400 ml-2">Apex Auto Components Ltd — DRHP Workspace</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-300 font-semibold border border-emerald-500/30">
                SEBI ICDR Score: 88.5%
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800">
              <div className="text-xs text-slate-400 mb-1">Company Master</div>
              <div className="text-sm font-semibold text-white">Apex Auto Components Ltd</div>
              <div className="text-xs text-indigo-400 font-mono mt-1">CIN: U34100MH2016PLC284910</div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800">
              <div className="text-xs text-slate-400 mb-1">OCR Verification</div>
              <div className="text-sm font-semibold text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" /> 98.4% Confidence
              </div>
              <div className="text-xs text-slate-400 mt-1">Audited Financials FY 24-26</div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800">
              <div className="text-xs text-slate-400 mb-1">AI Generation</div>
              <div className="text-sm font-semibold text-cyan-400 flex items-center gap-1">
                <Sparkles className="w-4 h-4" /> Gemini 2.5 Flash
              </div>
              <div className="text-xs text-slate-400 mt-1">4 DRHP Sections Drafted</div>
            </div>
          </div>
        </div>
      </section>

      {/* 11-Step Interactive Workflow */}
      <section className="space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold text-white">Complete 11-Step SME IPO Workflow</h2>
          <p className="text-xs text-slate-400">Structured process following SEBI ICDR 2018 and NSE Emerge / BSE SME guidelines</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {steps.map((step, idx) => (
            <div key={idx} className="p-3 rounded-xl glass-card border border-slate-800 flex items-center gap-2.5">
              <div className="w-6 h-6 rounded-full bg-indigo-600/30 text-indigo-300 font-bold text-xs flex items-center justify-center shrink-0">
                {idx + 1}
              </div>
              <span className="text-xs font-medium text-slate-200">{step}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Feature Cards Grid */}
      <section className="space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold text-white">Enterprise Platform Features</h2>
          <p className="text-xs text-slate-400">Engineered for SME Promoters, Merchant Bankers & Compliance Specialists</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div key={idx} className="p-6 rounded-2xl glass-card glass-card-hover border border-slate-800 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-semibold text-white">{feat.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{feat.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Pricing Tiers */}
      <section className="space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold text-white">Simple, Transparent Pricing</h2>
          <p className="text-xs text-slate-400">Scalable plans for individual SME issuers to leading Merchant Banking institutions</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {/* Plan 1 */}
          <div className="p-6 rounded-2xl glass-card border border-slate-800 space-y-6">
            <div>
              <h3 className="text-lg font-bold text-white">SME Issuer</h3>
              <p className="text-xs text-slate-400">For single SME IPO drafting</p>
            </div>
            <div className="text-3xl font-extrabold text-white">₹49,000 <span className="text-xs font-normal text-slate-400">/ project</span></div>
            <ul className="space-y-2 text-xs text-slate-300">
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Full 11-Step DRHP Workflow</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> OCR Document Extraction</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> SEBI ICDR Validation Engine</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> SHA256 Evidence Package ZIP</li>
            </ul>
            <button onClick={onStartWorkflow} className="w-full py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs border border-slate-700 transition">
              Get Started
            </button>
          </div>

          {/* Plan 2 - Featured */}
          <div className="p-6 rounded-2xl glass-panel border-2 border-indigo-500 shadow-xl shadow-indigo-600/20 space-y-6 relative">
            <div className="absolute -top-3 right-4 px-3 py-0.5 rounded-full bg-indigo-600 text-white font-bold text-[10px] uppercase tracking-wider">
              Most Popular
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Merchant Banker</h3>
              <p className="text-xs text-slate-400">For Category 1 Merchant Bankers</p>
            </div>
            <div className="text-3xl font-extrabold text-white">₹1,99,000 <span className="text-xs font-normal text-slate-400">/ year</span></div>
            <ul className="space-y-2 text-xs text-slate-300">
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Unlimited SME IPO Projects</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Multi-Role Review Workspace</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Gemini 2.5 Flash / OpenAI Key Integration</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Version Comparison Diff Tool</li>
            </ul>
            <button onClick={onStartWorkflow} className="w-full py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition shadow-lg shadow-indigo-600/30">
              Start Banker Trial
            </button>
          </div>

          {/* Plan 3 */}
          <div className="p-6 rounded-2xl glass-card border border-slate-800 space-y-6">
            <div>
              <h3 className="text-lg font-bold text-white">Legal & Advisory</h3>
              <p className="text-xs text-slate-400">For legal law firms & audit teams</p>
            </div>
            <div className="text-3xl font-extrabold text-white">Custom <span className="text-xs font-normal text-slate-400">enterprise</span></div>
            <ul className="space-y-2 text-xs text-slate-300">
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Custom SEBI Checklist Rules</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Dedicated Private Vector DB</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> On-Premise / Private Cloud Deploy</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> 24/7 Priority Legal Support</li>
            </ul>
            <button onClick={onStartWorkflow} className="w-full py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs border border-slate-700 transition">
              Contact Sales
            </button>
          </div>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="space-y-6 max-w-3xl mx-auto">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold text-white">Frequently Asked Questions</h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div key={idx} className="rounded-xl glass-card border border-slate-800 overflow-hidden">
              <button
                onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                className="w-full p-4 text-left flex items-center justify-between text-xs font-semibold text-white hover:bg-slate-800/50 transition"
              >
                <span>{faq.q}</span>
                <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${activeFaq === idx ? 'rotate-180 text-indigo-400' : ''}`} />
              </button>
              {activeFaq === idx && (
                <div className="p-4 pt-0 text-xs text-slate-300 border-t border-slate-800/60 leading-relaxed bg-slate-900/30">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Legal Footer */}
      <footer className="border-t border-slate-800/80 pt-8 text-center space-y-3">
        <div className="flex items-center justify-center gap-2 text-xs text-slate-400">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>SME DraftMate — Compliant with SEBI (ICDR) Regulations, 2018</span>
        </div>
        <p className="text-[11px] text-slate-500 max-w-2xl mx-auto">
          Disclaimer: SME DraftMate provides AI-assisted document preparation and automated rule checking. It does not replace independent legal advice or official SEBI regulatory verification. Final DRHP sign-off is the sole responsibility of registered Merchant Bankers and legal counsel.
        </p>
      </footer>
    </div>
  );
};
