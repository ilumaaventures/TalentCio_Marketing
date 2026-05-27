import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, BarChart3, BriefcaseBusiness, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { HERO_CONTENT } from '../content/marketingContent';
import { trackEvent } from '../lib/analytics';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export default function HeroSection() {
  const [firstPanel, secondPanel] = HERO_CONTENT.preview.panels;

  return (
    <section id="hero" className="relative overflow-hidden border-b border-slate-200 pt-[7.75rem]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_10%,rgba(42,86,246,0.12),transparent_26%),radial-gradient(circle_at_86%_12%,rgba(255,107,87,0.14),transparent_18%),linear-gradient(180deg,#ffffff_0%,#f5f8ff_100%)]" />
      <div className="absolute left-[4%] top-28 h-24 w-24 rounded-[28px] bg-[var(--primary-light)]" />
      <div className="absolute left-[10%] top-[20rem] h-8 w-8 rounded-full bg-[rgba(255,107,87,0.3)]" />
      <div className="absolute right-[9%] top-[9rem] h-40 w-40 rounded-full bg-blue-100/60 blur-2xl" />
      <div className="absolute right-[16%] top-[20rem] h-14 w-14 rounded-[20px] bg-[var(--accent-soft)]" />

      <div className="container-shell relative">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid items-center gap-10 pb-12 lg:min-h-[calc(100vh-130px)] lg:grid-cols-[minmax(0,1.08fr)_minmax(380px,0.92fr)]"
        >
          <div className="relative">
            <motion.span variants={itemVariants} className="section-kicker eyebrow-line">
              {HERO_CONTENT.kicker}
            </motion.span>
            <motion.h1 variants={itemVariants} className="homepage-hero-title mt-6 max-w-4xl text-slate-950">
              {HERO_CONTENT.headline}
            </motion.h1>
            <motion.p variants={itemVariants} className="mt-6 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
              {HERO_CONTENT.subheadline}
            </motion.p>

            <motion.div variants={itemVariants} className="mt-9 flex flex-wrap items-center gap-4">
              <Link
                to={HERO_CONTENT.cta1.href}
                className="btn-primary"
                onClick={() => trackEvent(HERO_CONTENT.cta1.event, { source: 'hero_section' })}
              >
                {HERO_CONTENT.cta1.label}
              </Link>
              <Link
                to={HERO_CONTENT.cta2.href}
                className="btn-secondary"
                onClick={() => trackEvent(HERO_CONTENT.cta2.event, { source: 'hero_section' })}
              >
                {HERO_CONTENT.cta2.label}
                <ArrowRight size={16} />
              </Link>
            </motion.div>

            <motion.div variants={itemVariants} className="mt-8 flex flex-wrap gap-3">
              <span className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm">Talent Solutions</span>
              <span className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm">HRMS Platform</span>
              <span className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm">Leadership Network</span>
            </motion.div>

            <motion.div variants={itemVariants} className="mt-10 grid gap-4 sm:grid-cols-3">
              {HERO_CONTENT.statCards.map((item) => (
                <div key={item.label} className="metric-block">
                  <p className="text-[0.72rem] font-bold uppercase tracking-[0.2em] text-slate-500">{item.label}</p>
                  <p className="mt-2 max-w-[15rem] text-lg font-bold text-slate-950">{item.value}</p>
                </div>
              ))}
            </motion.div>
          </div>

          <motion.div variants={itemVariants} className="relative">
            <div className="absolute -left-5 top-8 hidden rounded-[28px] bg-[var(--accent)] px-5 py-4 text-white shadow-[0_20px_45px_-26px_rgba(255,107,87,0.8)] lg:block">
              <p className="text-xs font-bold uppercase tracking-[0.22em]">Growth Focus</p>
              <p className="mt-2 text-lg font-bold">Human + tech execution</p>
            </div>

            <div className="editorial-panel relative overflow-hidden bg-slate-950 p-6 text-white sm:p-8">
              <div className="absolute inset-0 bg-[linear-gradient(145deg,#11204d_0%,#2a56f6_85%)]" />
              <div className="absolute right-5 top-5 h-24 w-24 rounded-full border border-white/18" />
              <div className="absolute bottom-5 left-5 h-16 w-16 rounded-[20px] bg-white/10" />
              <div className="relative">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.3em] text-blue-100">
                      {HERO_CONTENT.preview.badge}
                    </p>
                    <h2 className="hero-preview-title mt-3 max-w-xs font-bold">{HERO_CONTENT.preview.title}</h2>
                  </div>
                  <div className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-[0.68rem] font-bold uppercase tracking-[0.2em] text-blue-100">
                    Live System
                  </div>
                </div>

                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-[26px] border border-white/10 bg-white/[0.08] p-5 backdrop-blur-sm">
                    <div className="flex items-center gap-3">
                      <div className="rounded-2xl bg-emerald-400/20 p-3 text-emerald-200">
                        <CheckCircle2 size={20} />
                      </div>
                      <div>
                        <p className="text-sm text-blue-100">{firstPanel.label}</p>
                        <p className="text-2xl font-bold">{firstPanel.desc}</p>
                      </div>
                    </div>
                    <div className="mt-5 h-2 rounded-full bg-white/10">
                      <div
                        className="h-2 rounded-full bg-emerald-300"
                        style={{ width: `${firstPanel.pct || 78}%` }}
                      />
                    </div>
                  </div>

                  <div className="rounded-[26px] border border-white/10 bg-white/[0.08] p-5 backdrop-blur-sm">
                    <div className="flex items-center gap-3">
                      <div className="rounded-2xl bg-orange-400/20 p-3 text-orange-200">
                        <BriefcaseBusiness size={20} />
                      </div>
                      <div>
                        <p className="text-sm text-blue-100">{secondPanel.label}</p>
                        <p className="text-2xl font-bold">{secondPanel.desc}</p>
                      </div>
                    </div>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {(secondPanel.stages || []).map((stage, index) => (
                        <div
                          key={stage}
                          className="inline-flex items-center gap-2 rounded-full border border-white/14 bg-white/10 px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-blue-50"
                        >
                          <span className={`h-2 w-2 rounded-full ${
                            index === 0 ? 'bg-cyan-300' : index === 1 ? 'bg-amber-300' : 'bg-emerald-300'
                          }`} />
                          {stage}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-5 rounded-[26px] border border-white/10 bg-white/[0.08] p-5 backdrop-blur-sm">
                  <div className="flex items-center justify-between">
                    <p className="text-base font-semibold">Operational Snapshot</p>
                    <BarChart3 size={18} className="text-blue-100" />
                  </div>
                  <div className="mt-5 grid gap-4 sm:grid-cols-3">
                    {HERO_CONTENT.preview.metrics.map((metric) => (
                      <div key={metric.title} className="rounded-[20px] border border-white/[0.08] bg-white/10 px-4 py-3">
                        <p className="text-xs uppercase tracking-[0.18em] text-blue-100">{metric.title}</p>
                        <p className="mt-2 text-sm font-semibold text-white">{metric.value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-8 left-4 right-4 rounded-[24px] border border-slate-200 bg-white px-5 py-4 text-center text-sm font-semibold text-slate-700 shadow-[0_22px_60px_-36px_rgba(37,99,235,0.28)]">
              Talent Solutions | Platform | Opportunity Networks | Leadership Community
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
