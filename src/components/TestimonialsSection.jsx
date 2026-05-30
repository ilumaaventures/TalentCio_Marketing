import React from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import { MARKET_SIGNALS } from '../content/marketingContent';

const clientHighlights = [
  {
    name: 'Workforce Leaders',
    role: 'HR & Talent Teams',
    quote:
      'Organizations need partners who can connect hiring, people operations, and technology without adding more complexity.',
    image:
      'https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=1200&q=80'
  }
];

export default function TestimonialsSection() {
  return (
    <section id="insights" className="section-shell section-divider bg-white">
      <div className="container-shell">
        <div className="max-w-3xl">
          <span className="section-kicker eyebrow-line">Insights & Trust</span>
          <h2 className="section-title">What decision-makers need from a modern HR advisory partner</h2>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-[minmax(0,1.45fr)_repeat(2,minmax(0,0.75fr))]">
          {clientHighlights.map((highlight, index) => (
            <motion.article
              key={highlight.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.35, delay: index * 0.06 }}
              className="editorial-panel overflow-hidden p-0 lg:col-span-1"
            >
              <div className="grid h-full gap-0 sm:grid-cols-[240px_minmax(0,1fr)] lg:grid-cols-[320px_minmax(0,1fr)]">
                <img
                  src={highlight.image}
                  alt="Digital workforce dashboard and analytics workspace"
                  className="h-full min-h-[320px] w-full object-cover"
                />
                <div className="flex min-w-0 flex-col justify-between p-6 sm:p-8">
                  <div>
                    <div className="inline-flex rounded-full bg-[var(--accent-soft)] p-3 text-[var(--accent)]">
                      <Quote className="h-5 w-5" />
                    </div>
                    <p className="mt-5 max-w-[26rem] text-xl font-semibold leading-8 text-slate-900 sm:text-2xl">
                      {highlight.quote}
                    </p>
                  </div>
                  <div className="mt-8 border-t border-slate-200 pt-5">
                    <p className="font-semibold text-slate-950">{highlight.name}</p>
                    <p className="mt-1 text-sm text-slate-500">{highlight.role}</p>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}

          {MARKET_SIGNALS.slice(0, 2).map((signal, index) => (
            <motion.article
              key={signal.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.35, delay: (index + 1) * 0.06 }}
              className="editorial-panel p-6"
            >
              <p className="inline-flex rounded-full bg-[var(--primary-light)] px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-[var(--primary)]">{signal.title}</p>
              <p className="mt-5 text-5xl font-bold tracking-[-0.05em] text-slate-950">{signal.value}</p>
              <p className="mt-6 text-base leading-8 text-slate-700">{signal.detail}</p>
              <div className="mt-8 border-t border-slate-200 pt-5">
                <p className="font-semibold text-slate-950">{signal.source.label}</p>
                <a
                  href={signal.source.url}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-1 inline-flex text-sm text-[var(--primary)] transition hover:text-[var(--primary-hover)]"
                >
                  {signal.source.date}
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
