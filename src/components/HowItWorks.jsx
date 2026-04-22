import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const steps = [
  {
    number: '01',
    title: 'Create Your Workspace',
    desc: 'Sign up, configure your company, and invite your team into a dedicated TalentCIO workspace.'
  },
  {
    number: '02',
    title: 'Enable Your Modules',
    desc: 'Turn on the exact features your team needs, from attendance and hiring to help desk and projects.'
  },
  {
    number: '03',
    title: 'Start Working Smarter',
    desc: 'Track, manage, and grow with live dashboards, approvals, and a single source of truth.'
  }
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="section-shell bg-[#e8f0fd]">
      <div className="container-shell">
        <div className="text-center">
          <span className="section-kicker">How It Works</span>
          <h2 className="section-title mx-auto max-w-3xl">A fast path from setup to everyday operations</h2>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1fr_auto_1fr_auto_1fr]">
          {steps.map((step, index) => (
            <React.Fragment key={step.number}>
              <motion.article
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.35, delay: index * 0.08 }}
                className="surface-card border-white/70 p-6 text-center"
              >
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[var(--primary)] text-xl font-bold text-white">
                  {step.number}
                </div>
                <h3 className="mt-5 text-2xl font-bold text-slate-950">{step.title}</h3>
                <p className="mt-4 text-sm leading-7 text-slate-600">{step.desc}</p>
              </motion.article>

              {index < steps.length - 1 && (
                <div className="hidden items-center justify-center lg:flex">
                  <ArrowRight size={22} className="text-blue-600" />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
