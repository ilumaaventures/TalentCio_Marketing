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
    <section id="projects" className="section-shell section-divider bg-white">
      <div className="container-shell">
        <div className="max-w-3xl">
          <span className="section-kicker">Modules</span>
          <h2 className="section-title section-title-compact">Choose the capabilities your team actually needs</h2>
          <p className="section-copy">
            TalentCIO is modular by design. Turn on the workflows that fit your operating model and add more
            as your organization grows.
          </p>
        </div>

        <div className="mt-12 grid gap-6 xl:grid-cols-[340px_minmax(0,1fr)] xl:items-stretch">
          <div className="rounded-[20px] border border-black/[0.06] bg-[#f5f2ef]/60 p-3 xl:h-[620px]">
            <div className="grid max-h-full gap-2.5 overflow-y-auto pr-1 scrollbar-hidden">
              {modules.map((module) => {
                const Icon = module.icon;
                const isActive = module.key === activeKey;

                return (
                  <button
                    key={module.key}
                    type="button"
                    onClick={() => setActiveKey(module.key)}
                    className={`flex items-center gap-3.5 rounded-[16px] border p-4 text-left transition-all duration-200 ${
                      isActive
                        ? 'border-[#ea7c00] bg-[#ea7c00] text-white shadow-[0_8px_20px_rgba(234,124,0,0.25)]'
                        : 'border-transparent bg-white text-[#444444] hover:border-black/[0.08] hover:bg-white/80'
                    }`}
                  >
                    <div className={`rounded-xl p-2.5 ${isActive ? 'bg-white/20 text-white' : 'bg-[#ea7c00]/10 text-[#ea7c00]'}`}>
                      <Icon size={18} />
                    </div>
                    <div>
                      <p className="font-['Nunito_Sans'] text-sm font-bold">{module.label}</p>
                      <p className={`mt-1 font-['Nunito_Sans'] text-xs leading-normal ${isActive ? 'text-white/90' : 'text-[#6c757d]'}`}>{module.summary}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="relative overflow-hidden rounded-[20px] border border-black/[0.06] bg-[#060606] text-white shadow-xl xl:h-[620px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeModule.key}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="grid h-full gap-6 bg-[radial-gradient(ellipse_at_top_right,rgba(234,124,0,0.18),transparent_70%)] p-6 lg:grid-cols-[minmax(0,1.05fr)_320px] sm:p-8"
              >
                <div className="flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3">
                      <div className="rounded-xl bg-[#ea7c00]/20 p-3 text-[#ea7c00]">
                        <ActiveIcon size={22} />
                      </div>
                      <div>
                        <span className="text-[0.68rem] font-bold uppercase tracking-[0.2em] text-[#ea7c00]">Module</span>
                        <h3 className="mt-0.5 font-['Nunito_Sans'] text-2xl font-extrabold text-white sm:text-3xl">{activeModule.label}</h3>
                      </div>
                    </div>

                    <p className="mt-5 max-w-2xl font-['Nunito_Sans'] text-base leading-relaxed text-white/80">{activeModule.summary}</p>

                    <ul className="mt-6 space-y-3 font-['Nunito_Sans'] text-sm text-white/90">
                      {activeModule.bullets.map((bullet) => (
                        <li key={bullet} className="flex items-start gap-3">
                          <span className="mt-1.5 h-2 w-2 rounded-full bg-[#ea7c00]" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-8 flex flex-wrap gap-2">
                    {activeModule.plans.map((plan) => (
                      <span key={plan} className="rounded-full border border-white/15 bg-white/10 px-3.5 py-1 text-xs font-semibold text-white/90">
                        Available on: {plan}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex h-full flex-col rounded-[16px] border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
                  <p className="text-[0.68rem] font-bold uppercase tracking-[0.2em] text-[#ea7c00]">Mockup Preview</p>
                  <div className="mt-4 flex-1 rounded-[14px] bg-white p-4 text-[#282828] shadow-lg">
                    <div className="flex items-center justify-between border-b border-black/[0.06] pb-3">
                      <div>
                        <p className="text-[10px] uppercase tracking-[0.16em] text-[#6c757d]">{activeModule.label}</p>
                        <p className="mt-0.5 font-['Nunito_Sans'] text-base font-bold text-[#282828]">Operational Snapshot</p>
                      </div>
                      <div className="rounded-full bg-[#ea7c00]/15 px-3 py-1 text-[11px] font-bold text-[#ea7c00]">
                        Live
                      </div>
                    </div>

                    <div className="mt-4 grid gap-2.5">
                      {activeModule.bullets.slice(0, 3).map((bullet, index) => (
                        <div key={bullet} className="rounded-[10px] border border-black/[0.06] bg-[#f5f2ef]/50 px-3.5 py-2.5">
                          <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#6c757d]">Metric 0{index + 1}</p>
                          <p className="mt-1 font-['Nunito_Sans'] text-xs font-semibold text-[#444444]">{bullet}</p>
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
