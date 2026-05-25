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
    <section id="hero" className="relative overflow-hidden pt-28">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(17,92,185,0.18),transparent_35%),radial-gradient(circle_at_80%_20%,rgba(249,115,22,0.12),transparent_26%)]" />
      <div className="absolute left-[-120px] top-28 h-64 w-64 rounded-full bg-blue-200/40 blur-3xl" />
      <div className="absolute right-[-60px] top-40 h-52 w-52 rounded-full bg-cyan-100/70 blur-3xl" />

      <div className="container-shell relative">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid items-center gap-12 pb-10 lg:min-h-[calc(100vh-120px)] lg:grid-cols-[1.05fr_minmax(0,0.95fr)]"
        >
          <div>
            <motion.span variants={itemVariants} className="section-kicker">
              {HERO_CONTENT.kicker}
            </motion.span>
            <motion.h1 variants={itemVariants} className="homepage-hero-title mt-5 max-w-3xl text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
              {HERO_CONTENT.headline}
            </motion.h1>
            <motion.p variants={itemVariants} className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
              {HERO_CONTENT.subheadline}
            </motion.p>

            <motion.div variants={itemVariants} className="mt-8 flex flex-wrap items-center gap-3">
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

            <motion.div variants={itemVariants} className="mt-10 grid gap-4 sm:grid-cols-3">
              {HERO_CONTENT.statCards.map((item) => (
                <div key={item.label} className="rounded-[26px] border border-white/70 bg-white/80 p-4 shadow-[0_20px_50px_-35px_rgba(15,23,42,0.5)] backdrop-blur-xl">
                  <p className="text-sm font-semibold text-slate-500">{item.label}</p>
                  <p className="mt-2 text-base font-bold text-slate-900">{item.value}</p>
                </div>
              ))}
            </motion.div>
          </div>

          <motion.div variants={itemVariants} className="relative">
            <div className="surface-card relative overflow-hidden bg-slate-950 p-6 text-white">
              <div className="absolute inset-0 bg-[linear-gradient(145deg,rgba(17,92,185,0.88),rgba(13,27,42,0.96))]" />
              <div className="relative">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.22em] text-blue-100">
                      {HERO_CONTENT.preview.badge}
                    </p>
                    <h2 className="hero-preview-title mt-2 text-2xl font-bold">{HERO_CONTENT.preview.title}</h2>
                  </div>
                  <div className="rounded-full bg-white/10 px-4 py-2 text-xs font-semibold text-blue-100">
                    talentCIO Suite
                  </div>
                </div>

                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-[26px] border border-white/10 bg-white/10 p-5 backdrop-blur-sm">
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

                  <div className="rounded-[26px] border border-white/10 bg-white/10 p-5 backdrop-blur-sm">
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

                <div className="mt-5 rounded-[26px] border border-white/10 bg-white/10 p-5 backdrop-blur-sm">
                  <div className="flex items-center justify-between">
                    <p className="text-base font-semibold">Operational Snapshot</p>
                    <BarChart3 size={18} className="text-blue-100" />
                  </div>
                  <div className="mt-5 grid gap-4 sm:grid-cols-3">
                    {HERO_CONTENT.preview.metrics.map((metric) => (
                      <div key={metric.title} className="rounded-2xl bg-white/10 px-4 py-3">
                        <p className="text-xs uppercase tracking-[0.18em] text-blue-100">{metric.title}</p>
                        <p className="mt-2 text-sm font-semibold text-white">{metric.value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-6 left-4 right-4 rounded-full border border-blue-100/80 bg-white/95 px-5 py-4 text-center text-sm font-semibold text-slate-700 shadow-[0_22px_60px_-30px_rgba(15,23,42,0.45)]">
              Talent Solutions | Platform | Opportunity Networks | Leadership Community
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
