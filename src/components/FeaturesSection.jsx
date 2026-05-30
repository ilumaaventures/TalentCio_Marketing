import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRightLeft, BadgeCheck, Brain, Network, TrendingUp, Users } from 'lucide-react';
import { WHY_TALENTCIO } from '../content/marketingContent';

const iconMap = {
  Brain,
  Network,
  Users,
  ArrowRightLeft,
  TrendingUp,
  BadgeCheck
};

export default function FeaturesSection() {
  return (
    <section id="why-talentcio" className="section-shell section-divider bg-[var(--surface)]">
      <div className="container-shell">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-end">
          <div className="max-w-3xl">
            <span className="section-kicker eyebrow-line">Why talentCIO</span>
            <h2 className="section-title">
              People strategy backed by technology, execution, and accountability
            </h2>
            <p className="section-copy">
              TalentCIO is designed for teams that need more than a vendor. We combine consulting judgment,
              operational support, and modern workforce tools to create a more dependable HR growth engine.
            </p>
          </div>

          <div className="rounded-[30px] border border-slate-200 bg-white p-5 shadow-sm">
            <img
              src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80"
              alt="HR and business consulting team meeting"
              className="h-[240px] w-full rounded-[24px] object-cover"
            />
          </div>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {WHY_TALENTCIO.map((feature, index) => {
            const Icon = iconMap[feature.icon] || Brain;

            return (
              <motion.article
                key={feature.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.35, delay: index * 0.04 }}
                className="group editorial-panel p-6 transition hover:-translate-y-1 hover:border-blue-200"
              >
                <div className="flex items-start gap-4">
                  <div className="rounded-2xl border border-[var(--primary)]/10 bg-[var(--primary-light)] p-3 text-[var(--primary)] transition group-hover:border-[var(--primary)] group-hover:bg-[var(--primary)] group-hover:text-white">
                    <Icon size={22} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-slate-950">{feature.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-slate-600">{feature.body}</p>
                  </div>
                </div>
                <div className="mt-8 flex items-center justify-between border-t border-slate-200 pt-4 text-[0.72rem] font-bold uppercase tracking-[0.18em] text-slate-500">
                  <span>Advisory strength</span>
                  <span className="rounded-full bg-[var(--accent-soft)] px-3 py-1 text-[var(--accent)]">0{index + 1}</span>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
