import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3, BriefcaseBusiness, Clock3, FileText, LifeBuoy, MessageSquare, Shield, UserPlus, Users } from 'lucide-react';

const features = [
  {
    icon: Users,
    title: 'Smart Attendance',
    desc: 'Geo-fencing, IP whitelisting, auto-checkout, and detailed attendance reports.'
  },
  {
    icon: BriefcaseBusiness,
    title: 'Talent Acquisition',
    desc: 'Full ATS pipeline with hiring requests, candidate tracking, and interview workflows.'
  },
  {
    icon: UserPlus,
    title: 'Onboarding Workflows',
    desc: 'Pre-onboarding portal, offer letters, declaration forms, and policy sign-offs.'
  },
  {
    icon: FileText,
    title: 'Leave Management',
    desc: 'Configurable leave policies, approval workflows, and real-time balances.'
  },
  {
    icon: BarChart3,
    title: 'Analytics & Reports',
    desc: 'Real-time dashboards for HR, hiring, attendance, and project performance.'
  },
  {
    icon: Shield,
    title: 'Role-Based Access',
    desc: 'Granular permissions across modules for Admins, Managers, and Employees.'
  },
  {
    icon: Clock3,
    title: 'Timesheets',
    desc: 'Project-wise time tracking, work logs, and export-ready data for payroll.'
  },
  {
    icon: LifeBuoy,
    title: 'Help Desk',
    desc: 'Internal ticketing with escalation rules, workflows, and SLA visibility.'
  },
  {
    icon: MessageSquare,
    title: 'Meetings & MoM',
    desc: 'Schedule meetings, record minutes, assign action items, and track discussions.'
  }
];

export default function FeaturesSection() {
  return (
    <section id="features" className="section-shell">
      <div className="container-shell">
        <div className="max-w-3xl">
          <span className="section-kicker">Features</span>
          <h2 className="section-title">Everything your HR team needs</h2>
          <p className="section-copy">
            From day one to every day, TalentCIO covers the complete employee lifecycle with connected
            workflows, real-time visibility, and fewer handoffs between tools.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <motion.article
                key={feature.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.35, delay: index * 0.04 }}
                className="group surface-card border-slate-200 p-6 transition hover:-translate-y-1 hover:border-blue-200"
              >
                <div className="flex items-start gap-4">
                  <div className="rounded-2xl bg-blue-50 p-3 text-blue-700 transition group-hover:bg-blue-600 group-hover:text-white">
                    <Icon size={22} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-slate-950">{feature.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-slate-600">{feature.desc}</p>
                  </div>
                </div>
                <div className="mt-6 h-1 w-14 rounded-full bg-blue-100 transition group-hover:w-24 group-hover:bg-blue-600" />
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
