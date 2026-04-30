import React from 'react';
import { motion } from 'framer-motion';
import { MARKET_SIGNALS } from '../content/marketingContent';

export default function TestimonialsSection() {
  return (
    <section className="section-shell">
      <div className="container-shell">
        <div className="max-w-3xl">
          <span className="section-kicker">Market Signals</span>
          <h2 className="section-title">Why connected HR operations matter right now</h2>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {MARKET_SIGNALS.map((signal, index) => (
            <motion.article
              key={signal.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.35, delay: index * 0.06 }}
              className="surface-card p-6"
            >
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">{signal.title}</p>
              <p className="mt-4 text-4xl font-bold text-slate-950">{signal.value}</p>
              <p className="mt-6 text-base leading-8 text-slate-700">{signal.detail}</p>
              <div className="mt-8 border-t border-slate-200 pt-5">
                <p className="font-semibold text-slate-950">{signal.source.label}</p>
                <a
                  href={signal.source.url}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-1 inline-flex text-sm text-blue-700 transition hover:text-blue-800"
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
