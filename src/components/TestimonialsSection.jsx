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
    <section id="insights" className="section-shell section-divider bg-[#f5f2ef]/40">
      <div className="container-shell">
        <div className="max-w-3xl">
          <span className="section-kicker">Insights & Trust</span>
          <h2 className="section-title">What decision-makers need from a modern HR advisory partner</h2>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-[minmax(0,1.45fr)_repeat(2,minmax(0,0.75fr))]">
          {clientHighlights.map((highlight, index) => (
            <motion.article
              key={highlight.name}
              initial={{ opacity: 0, x: -35 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.25 }}
              transition={{ duration: 0.5, delay: index * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
              className="overflow-hidden rounded-[20px] border border-black/[0.06] bg-white shadow-[0_5px_15px_rgba(0,0,0,0.04)] transition-all duration-300 hover:border-[#ea7c00]/30 hover:shadow-[0_15px_35px_rgba(234,124,0,0.1)] lg:col-span-1"
            >
              <div className="grid h-full gap-0 sm:grid-cols-[240px_minmax(0,1fr)] lg:grid-cols-[300px_minmax(0,1fr)]">
                <img
                  src={highlight.image}
                  alt="Digital workforce dashboard and analytics workspace"
                  className="h-full min-h-[300px] w-full object-cover"
                />
                <div className="flex min-w-0 flex-col justify-between p-6 sm:p-8">
                  <div>
                    <div className="inline-flex rounded-full bg-[#ea7c00]/10 p-3 text-[#ea7c00]">
                      <Quote className="h-5 w-5" />
                    </div>
                    <p className="mt-4 max-w-[26rem] font-['Nunito_Sans'] text-xl font-bold leading-relaxed text-[#282828] sm:text-2xl">
                      {highlight.quote}
                    </p>
                  </div>
                  <div className="mt-6 border-t border-black/[0.06] pt-4">
                    <p className="font-['Nunito_Sans'] font-extrabold text-[#282828]">{highlight.name}</p>
                    <p className="mt-0.5 font-['Nunito_Sans'] text-xs font-medium text-[#6c757d]">{highlight.role}</p>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}

          {MARKET_SIGNALS.slice(0, 2).map((signal, index) => (
            <motion.article
              key={signal.title}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: false, amount: 0.25 }}
              transition={{ duration: 0.45, delay: (index + 1) * 0.1, ease: 'easeOut' }}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
              className="flex flex-col justify-between rounded-[20px] border border-black/[0.06] bg-white p-7 shadow-[0_5px_15px_rgba(0,0,0,0.04)] transition-all duration-300 hover:border-[#ea7c00]/30 hover:shadow-[0_15px_30px_rgba(0,0,0,0.08)]"
            >
              <div>
                <span className="inline-block rounded-full bg-[#ea7c00]/10 px-3 py-1 font-['Nunito_Sans'] text-[10px] font-bold uppercase tracking-[0.18em] text-[#ea7c00]">{signal.title}</span>
                <p className="mt-4 font-['Nunito_Sans'] text-4xl font-extrabold tracking-tight text-[#282828] sm:text-5xl">{signal.value}</p>
                <p className="mt-4 font-['Nunito_Sans'] text-sm leading-relaxed text-[#444444]">{signal.detail}</p>
              </div>
              <div className="mt-6 border-t border-black/[0.06] pt-4">
                <p className="font-['Nunito_Sans'] text-xs font-bold text-[#282828]">{signal.source.label}</p>
                <a
                  href={signal.source.url}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-0.5 font-['Nunito_Sans'] text-xs font-medium text-[#ea7c00] transition hover:underline"
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
