import React from 'react';
import {
  Briefcase,
  CheckCircle,
  DollarSign,
  FileText,
  GraduationCap,
  Link as LinkIcon,
  Upload,
  User,
  Zap
} from 'lucide-react';

const ICON_MAP = {
  User,
  FileText,
  Briefcase,
  GraduationCap,
  Zap,
  DollarSign,
  Upload,
  Link: LinkIcon
};

const getMotivation = (score) => {
  if (score === 100) return { message: 'Your profile is fully complete and ready for recruiters.', tone: 'border-emerald-200 bg-emerald-50 text-emerald-700' };
  if (score >= 80) return { message: 'Almost there. A complete profile helps recruiters move faster.', tone: 'border-blue-200 bg-blue-50 text-blue-700' };
  if (score >= 60) return { message: 'Good progress. Complete a few more sections to stand out.', tone: 'border-amber-200 bg-amber-50 text-amber-700' };
  if (score >= 40) return { message: 'You are building momentum. Finish key sections to get noticed.', tone: 'border-orange-200 bg-orange-50 text-orange-700' };
  return { message: 'Complete your profile to apply faster and look stronger to employers.', tone: 'border-rose-200 bg-rose-50 text-rose-700' };
};

function CircularProgress({ score }) {
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - ((score / 100) * circumference);
  const stroke = score >= 80 ? '#059669' : score >= 60 ? '#2563eb' : score >= 40 ? '#d97706' : '#dc2626';

  return (
    <div className="relative flex h-36 w-36 shrink-0 items-center justify-center">
      <svg className="absolute -rotate-90" width="144" height="144" viewBox="0 0 144 144">
        <circle cx="72" cy="72" r={radius} fill="none" stroke="#e2e8f0" strokeWidth="10" />
        <circle
          cx="72"
          cy="72"
          r={radius}
          fill="none"
          stroke={stroke}
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset 0.8s ease, stroke 0.4s ease' }}
        />
      </svg>
      <div className="relative z-10 text-center">
        <span className="block font-['Sora'] text-3xl font-bold text-slate-950">{score}%</span>
        <span className="block text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">Complete</span>
      </div>
    </div>
  );
}

export default function ProfileCompletion({ completion, onSectionClick }) {
  if (!completion) {
    return null;
  }

  const { score, sections } = completion;
  const motivation = getMotivation(score);
  const incompleteSections = Object.entries(sections)
    .filter(([, section]) => !section.complete)
    .sort((left, right) => (right[1].max - right[1].earned) - (left[1].max - left[1].earned));

  return (
    <div className="surface-card overflow-hidden">
      <div className="h-1 w-full bg-slate-100">
        <div className="h-full bg-blue-600 transition-all duration-1000" style={{ width: `${score}%` }} />
      </div>

      <div className="p-6">
        <div className="mb-6 flex items-start gap-6">
          <CircularProgress score={score} />
          <div className="flex-1">
            <h3 className="font-['Sora'] text-lg font-bold text-slate-950">Profile Strength</h3>
            <div className={`mt-3 rounded-2xl border px-4 py-3 text-sm font-medium ${motivation.tone}`}>
              {motivation.message}
            </div>
            {incompleteSections[0] && (
              <p className="mt-3 text-xs text-slate-500">
                Next best step:{' '}
                <button
                  type="button"
                  onClick={() => onSectionClick?.(incompleteSections[0][0])}
                  className="font-semibold text-blue-600 hover:underline"
                >
                  complete {incompleteSections[0][1].label.toLowerCase()}
                </button>
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {Object.entries(sections).map(([key, section]) => {
            const Icon = ICON_MAP[section.icon] || User;

            return (
              <button
                key={key}
                type="button"
                onClick={() => onSectionClick?.(key)}
                className={`group relative rounded-2xl border p-3 text-center transition hover:border-blue-300 hover:bg-blue-50/60 ${
                  section.complete ? 'border-emerald-200 bg-emerald-50/60' : 'border-slate-200 bg-white'
                }`}
              >
                <div className={`mx-auto flex h-8 w-8 items-center justify-center rounded-full ${
                  section.complete ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-500 group-hover:bg-blue-100 group-hover:text-blue-600'
                }`}>
                  {section.complete ? <CheckCircle size={15} /> : <Icon size={15} />}
                </div>

                <div className="mt-3 h-1 w-full rounded-full bg-slate-200">
                  <div
                    className={`h-full rounded-full transition-all duration-700 ${section.complete ? 'bg-emerald-500' : 'bg-blue-500'}`}
                    style={{ width: `${section.pct}%` }}
                  />
                </div>

                <p className="mt-2 text-[10px] font-bold leading-tight text-slate-500">{section.label}</p>
                <p className="mt-1 text-[10px] text-slate-400">{section.earned}/{section.max}</p>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
