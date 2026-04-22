import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { BriefcaseBusiness, ClipboardCheck, FileClock, Headset, LayoutPanelTop, ListChecks, MessagesSquare, ShieldCheck } from 'lucide-react';

const modules = [
  {
    key: 'attendance',
    label: 'Attendance',
    icon: ClipboardCheck,
    summary: 'Real-time check-in, check-out, geo-fencing, IP verification, and auto-checkout.',
    bullets: ['Geo-fenced and IP-aware check-ins', 'Overtime and attendance reporting', 'Auto-checkout controls', 'Location-aware compliance'],
    plans: ['Starter', 'Growth', 'Enterprise']
  },
  {
    key: 'talentAcquisition',
    label: 'Talent Acquisition',
    icon: BriefcaseBusiness,
    summary: 'Structured requisitions, pipelines, candidate workflows, and interview coordination.',
    bullets: ['Hiring requests and approvals', 'Bulk import and public job board', 'Interview workflows and dashboards', 'Candidate pipeline visibility'],
    plans: ['Growth', 'Enterprise']
  },
  {
    key: 'onboarding',
    label: 'Onboarding',
    icon: FileClock,
    summary: 'Offer letters, pre-onboarding access, policies, declarations, and joining readiness.',
    bullets: ['Pre-onboarding login portal', 'Offer and declaration templates', 'Policy acknowledgment workflows', 'Document collection before joining'],
    plans: ['Growth', 'Enterprise']
  },
  {
    key: 'leaves',
    label: 'Leaves',
    icon: ListChecks,
    summary: 'Flexible policies, balances, approvals, and visibility across teams.',
    bullets: ['Policy configuration by company', 'Real-time balances and approvals', 'Leave dashboards and exports', 'Employee self-service requests'],
    plans: ['Starter', 'Growth', 'Enterprise']
  },
  {
    key: 'projects',
    label: 'Projects',
    icon: LayoutPanelTop,
    summary: 'Business units, clients, projects, and time-linked operational visibility.',
    bullets: ['Business unit and client setup', 'Project-wise tracking', 'Operational project details', 'Works with timesheets and reporting'],
    plans: ['Growth', 'Enterprise']
  },
  {
    key: 'helpdesk',
    label: 'Help Desk',
    icon: Headset,
    summary: 'Internal ticketing with escalation rules and SLA-driven workflows.',
    bullets: ['Ticket queues and statuses', 'Escalation rules and routing', 'Workflow-backed support handling', 'Operational SLA visibility'],
    plans: ['Growth', 'Enterprise']
  },
  {
    key: 'meetings',
    label: 'Meetings',
    icon: MessagesSquare,
    summary: 'Meetings, minutes of meeting, action items, and tracked discussions.',
    bullets: ['Meeting scheduling', 'MoM capture and sharing', 'Action item follow-through', 'Team discussion trails'],
    plans: ['Growth', 'Enterprise']
  },
  {
    key: 'users',
    label: 'Users & Roles',
    icon: ShieldCheck,
    summary: 'Users, employee profiles, dossier records, and permission-led access control.',
    bullets: ['Role-based permissions', 'User and profile management', 'Employee dossier visibility', 'Secure access per module'],
    plans: ['Starter', 'Growth', 'Enterprise']
  }
];

export default function ModulesShowcase() {
  const [activeKey, setActiveKey] = useState(modules[0].key);
  const activeModule = modules.find((item) => item.key === activeKey) || modules[0];
  const ActiveIcon = activeModule.icon;

  return (
    <section id="modules" className="section-shell">
      <div className="container-shell">
        <div className="max-w-3xl">
          <span className="section-kicker">Modules</span>
          <h2 className="section-title">Choose the capabilities your team actually needs</h2>
          <p className="section-copy">
            TalentCIO is modular by design. Turn on the workflows that fit your operating model and add more
            as your organization grows.
          </p>
        </div>

        <div className="mt-12 grid gap-6 xl:grid-cols-[300px_minmax(0,1fr)]">
          <div className="surface-card p-3">
            <div className="grid gap-2">
              {modules.map((module) => {
                const Icon = module.icon;
                const isActive = module.key === activeKey;

                return (
                  <button
                    key={module.key}
                    type="button"
                    onClick={() => setActiveKey(module.key)}
                    className={`flex items-center gap-3 rounded-[22px] px-4 py-4 text-left transition ${
                      isActive
                        ? 'bg-[var(--primary)] text-white shadow-[0_18px_45px_-28px_rgba(17,92,185,0.85)]'
                        : 'bg-white text-slate-700 hover:bg-blue-50'
                    }`}
                  >
                    <div className={`rounded-2xl p-2.5 ${isActive ? 'bg-white/15' : 'bg-blue-50 text-blue-700'}`}>
                      <Icon size={18} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold">{module.label}</p>
                      <p className={`mt-1 text-xs ${isActive ? 'text-blue-100' : 'text-slate-500'}`}>{module.summary}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="surface-card overflow-hidden bg-slate-950 text-white">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeModule.key}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -18 }}
                className="grid gap-6 bg-[linear-gradient(135deg,#0d1b2a_10%,#115cb9_100%)] p-6 lg:grid-cols-[minmax(0,1.05fr)_320px] sm:p-8"
              >
                <div>
                  <div className="flex items-center gap-3">
                    <div className="rounded-2xl bg-white/10 p-3 text-blue-100">
                      <ActiveIcon size={20} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold uppercase tracking-[0.22em] text-blue-100">Module</p>
                      <h3 className="mt-1 text-3xl font-bold">{activeModule.label}</h3>
                    </div>
                  </div>

                  <p className="mt-5 max-w-2xl text-base leading-7 text-slate-100">{activeModule.summary}</p>

                  <ul className="mt-6 space-y-3 text-sm text-slate-100">
                    {activeModule.bullets.map((bullet) => (
                      <li key={bullet} className="flex items-start gap-3">
                        <span className="mt-1 h-2 w-2 rounded-full bg-orange-300" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8 flex flex-wrap gap-2">
                    {activeModule.plans.map((plan) => (
                      <span key={plan} className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold text-white">
                        Available on: {plan}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="rounded-[30px] border border-white/10 bg-white/10 p-5 backdrop-blur-sm">
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-100">Mockup Preview</p>
                  <div className="mt-5 rounded-[24px] bg-white p-4 text-slate-900 shadow-[0_30px_80px_-45px_rgba(15,23,42,0.55)]">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs uppercase tracking-[0.18em] text-slate-400">{activeModule.label}</p>
                        <p className="mt-1 text-lg font-bold">Operational Snapshot</p>
                      </div>
                      <div className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">
                        Live
                      </div>
                    </div>

                    <div className="mt-5 grid gap-3">
                      {activeModule.bullets.slice(0, 3).map((bullet, index) => (
                        <div key={bullet} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Metric {index + 1}</p>
                          <p className="mt-2 text-sm font-semibold text-slate-800">{bullet}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
