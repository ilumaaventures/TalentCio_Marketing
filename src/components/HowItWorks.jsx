import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { HOW_IT_WORKS_STEPS } from '../content/marketingContent';

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="section-shell section-divider bg-[var(--surface)]">
      <div className="container-shell">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:items-end">
          <div>
            <span className="section-kicker eyebrow-line">How It Works</span>
            <h2 className="section-title max-w-3xl">How the TalentCIO ecosystem turns workforce needs into action</h2>
          </div>
          <p className="section-copy max-w-none lg:border-l lg:border-slate-200 lg:pl-8">
            The flow is intentionally simple: diagnose the workforce problem, route it to the right talentCIO
            layer, then execute with human expertise supported by technology.
          </p>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-[1fr_auto_1fr_auto_1fr]">
          {HOW_IT_WORKS_STEPS.map((step, index) => (
            <React.Fragment key={step.number}>
              <motion.article
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.35, delay: index * 0.08 }}
                className="editorial-panel p-6 text-center"
              >
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[var(--primary)] text-xl font-bold text-white shadow-[0_18px_40px_-20px_rgba(42,86,246,0.6)]">
                  {step.number}
                </div>
                <h3 className="mt-5 text-2xl font-bold text-slate-950">{step.title}</h3>
                <p className="mt-4 text-sm leading-7 text-slate-600">{step.desc}</p>
              </motion.article>

              {index < HOW_IT_WORKS_STEPS.length - 1 && (
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
