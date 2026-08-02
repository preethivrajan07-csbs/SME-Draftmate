import React from 'react';
import { useProject } from '../context/ProjectContext';
import { CheckCircle2, ChevronRight } from 'lucide-react';

export const ProjectStepper: React.FC = () => {
  const { activeStep, setActiveStep } = useProject();

  const steps = [
    { num: 1, title: "1. Create" },
    { num: 2, title: "2. Details" },
    { num: 3, title: "3. Upload Docs" },
    { num: 4, title: "4. OCR Parse" },
    { num: 5, title: "5. Verify Data" },
    { num: 6, title: "6. AI Form" },
    { num: 7, title: "7. SEBI Audit" },
    { num: 8, title: "8. Generate DRHP" },
    { num: 9, title: "9. Review" },
    { num: 10, title: "10. Compare" },
    { num: 11, title: "11. Export" },
  ];

  return (
    <div className="w-full bg-slate-900/90 border-b border-slate-800 px-6 py-2.5 overflow-x-auto sticky top-[61px] z-30 backdrop-blur-md">
      <div className="flex items-center gap-1.5 min-w-max">
        {steps.map((s, idx) => {
          const isActive = activeStep === s.num;
          const isDone = activeStep > s.num;

          return (
            <React.Fragment key={s.num}>
              <button
                onClick={() => setActiveStep(s.num)}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold transition ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                    : isDone
                    ? 'bg-slate-800/80 text-emerald-400 border border-slate-700'
                    : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                {isDone ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <span>{s.num}.</span>}
                <span className="truncate">{s.title.split('. ')[1]}</span>
              </button>

              {idx < steps.length - 1 && <ChevronRight className="w-3 h-3 text-slate-600 shrink-0" />}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};
