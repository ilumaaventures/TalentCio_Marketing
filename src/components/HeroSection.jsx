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
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
};

export default function HeroSection() {
  const [firstPanel, secondPanel] = HERO_CONTENT.preview.panels;

  return (
    <section id="hero" className="relative overflow-hidden border-b border-black/[0.06] bg-gradient-to-b from-white via-[#f5f2ef]/40 to-[#f5f2ef]/70 pt-[7.5rem] pb-12 sm:pt-[8.5rem] lg:pt-[9rem]">
      {/* Background Decorative Accents */}
      <div className="absolute -left-20 top-20 h-72 w-72 rounded-full bg-[#ea7c00]/5 blur-3xl" />
      <div className="absolute right-0 top-40 h-96 w-96 rounded-full bg-amber-500/5 blur-3xl" />

      <div className="container-shell relative">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid items-center gap-12 lg:min-h-[calc(100vh-140px)] lg:grid-cols-[minmax(0,1.1fr)_minmax(380px,0.9fr)]"
        >
          {/* Hero Left Content */}
          <div className="relative">
            <motion.span variants={itemVariants} className="section-kicker">
              <span className="h-2 w-2 rounded-full bg-[#ea7c00]" />
              {HERO_CONTENT.kicker}
            </motion.span>
            
            <motion.h1 variants={itemVariants} className="homepage-hero-title mt-5 font-['Nunito_Sans'] text-[2.2rem] font-extrabold leading-[1.15] text-[#282828] sm:text-[3rem] lg:text-[3.5rem]">
              {HERO_CONTENT.headline}
            </motion.h1>
            
            <motion.p variants={itemVariants} className="mt-5 max-w-2xl font-['Nunito_Sans'] text-[1.05rem] leading-relaxed text-[#444444] sm:text-[1.15rem]">
              {HERO_CONTENT.subheadline}
            </motion.p>

            <motion.div variants={itemVariants} className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                to={HERO_CONTENT.cta1.href}
                className="btn-primary rounded-full px-8 py-3.5 text-sm font-bold uppercase tracking-wider"
                onClick={() => trackEvent(HERO_CONTENT.cta1.event, { source: 'hero_section' })}
              >
                {HERO_CONTENT.cta1.label}
              </Link>
              <Link
                to={HERO_CONTENT.cta2.href}
                className="btn-secondary rounded-full px-8 py-3.5 text-sm font-bold uppercase tracking-wider"
                onClick={() => trackEvent(HERO_CONTENT.cta2.event, { source: 'hero_section' })}
              >
                {HERO_CONTENT.cta2.label}
                <ArrowRight size={16} />
              </Link>
            </motion.div>

            <motion.div variants={itemVariants} className="mt-8 flex flex-wrap gap-2.5">
              <span className="rounded-full border border-black/[0.06] bg-white px-4 py-1.5 text-xs font-semibold text-[#444444] shadow-xs">Talent Solutions</span>
              <span className="rounded-full border border-black/[0.06] bg-white px-4 py-1.5 text-xs font-semibold text-[#444444] shadow-xs">HRMS Platform</span>
              <span className="rounded-full border border-black/[0.06] bg-white px-4 py-1.5 text-xs font-semibold text-[#444444] shadow-xs">Leadership Network</span>
            </motion.div>

            <motion.div variants={itemVariants} className="mt-9 grid gap-4 sm:grid-cols-3">
              {HERO_CONTENT.statCards.map((item) => (
                <div key={item.label} className="rounded-[16px] border border-black/[0.06] bg-white px-4 py-4 shadow-[0_4px_12px_rgba(0,0,0,0.03)] transition duration-300 hover:shadow-[0_8px_20px_rgba(0,0,0,0.06)]">
                  <p className="text-[0.7rem] font-bold uppercase tracking-[0.16em] text-[#6c757d]">{item.label}</p>
                  <p className="mt-1.5 font-['Nunito_Sans'] text-base font-extrabold text-[#282828]">{item.value}</p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Hero Right Visual Showcase */}
          <motion.div variants={itemVariants} className="relative">
            <div className="absolute -left-6 -top-6 z-10 hidden rounded-[16px] bg-gradient-to-r from-[#ea7c00] to-[#d47000] px-5 py-3.5 text-white shadow-lg lg:block">
              <p className="text-[0.68rem] font-bold uppercase tracking-[0.2em] text-white/90">Growth Focus</p>
              <p className="mt-1 font-['Nunito_Sans'] text-base font-bold">Human + Tech Intelligence</p>
            </div>

            <div className="editorial-panel relative overflow-hidden rounded-[20px] bg-[#060606] p-6 text-white shadow-2xl sm:p-8">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(234,124,0,0.22),transparent_70%)]" />
              <div className="absolute right-5 top-5 h-28 w-28 rounded-full border border-white/10" />
              <div className="relative">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="inline-block rounded-full bg-[#ea7c00]/20 px-3 py-1 text-[0.68rem] font-bold uppercase tracking-[0.2em] text-[#ea7c00]">
                      {HERO_CONTENT.preview.badge}
                    </span>
                    <h2 className="hero-preview-title mt-3 font-['Nunito_Sans'] text-xl font-bold text-white sm:text-2xl">{HERO_CONTENT.preview.title}</h2>
                  </div>
                  <div className="rounded-full border border-white/15 bg-white/10 px-3.5 py-1.5 text-[0.65rem] font-bold uppercase tracking-[0.2em] text-white/90">
                    Live System
                  </div>
                </div>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-[16px] border border-white/10 bg-white/[0.06] p-5 backdrop-blur-sm">
                    <div className="flex items-center gap-3">
                      <div className="rounded-xl bg-[#ea7c00]/20 p-2.5 text-[#ea7c00]">
                        <CheckCircle2 size={20} />
                      </div>
                      <div>
                        <p className="text-xs text-white/70">{firstPanel.label}</p>
                        <p className="font-['Nunito_Sans'] text-lg font-bold text-white">{firstPanel.desc}</p>
                      </div>
                    </div>
                    <div className="mt-4 h-2 rounded-full bg-white/10">
                      <div
                        className="h-2 rounded-full bg-[#ea7c00]"
                        style={{ width: `${firstPanel.pct || 78}%` }}
                      />
                    </div>
                  </div>

                  <div className="rounded-[16px] border border-white/10 bg-white/[0.06] p-5 backdrop-blur-sm">
                    <div className="flex items-center gap-3">
                      <div className="rounded-xl bg-amber-500/20 p-2.5 text-amber-400">
                        <BriefcaseBusiness size={20} />
                      </div>
                      <div>
                        <p className="text-xs text-white/70">{secondPanel.label}</p>
                        <p className="font-['Nunito_Sans'] text-lg font-bold text-white">{secondPanel.desc}</p>
                      </div>
                    </div>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {(secondPanel.stages || []).map((stage, index) => (
                        <div
                          key={stage}
                          className="inline-flex items-center gap-1.5 rounded-full border border-white/14 bg-white/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/90"
                        >
                          <span className={`h-1.5 w-1.5 rounded-full ${
                            index === 0 ? 'bg-[#ea7c00]' : index === 1 ? 'bg-amber-400' : 'bg-emerald-400'
                          }`} />
                          {stage}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-4 rounded-[16px] border border-white/10 bg-white/[0.06] p-5 backdrop-blur-sm">
                  <div className="flex items-center justify-between">
                    <p className="font-['Nunito_Sans'] text-sm font-bold text-white">Operational Snapshot</p>
                    <BarChart3 size={18} className="text-[#ea7c00]" />
                  </div>
                  <div className="mt-4 grid gap-3 sm:grid-cols-3">
                    {HERO_CONTENT.preview.metrics.map((metric) => (
                      <div key={metric.title} className="rounded-[12px] border border-white/[0.08] bg-white/5 px-3.5 py-2.5">
                        <p className="text-[10px] uppercase tracking-[0.16em] text-white/60">{metric.title}</p>
                        <p className="mt-1 font-['Nunito_Sans'] text-xs font-bold text-white">{metric.value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 rounded-[16px] border border-black/[0.06] bg-white px-5 py-3.5 text-center font-['Nunito_Sans'] text-xs font-semibold text-[#444444] shadow-sm">
              Talent Solutions &bull; Platform &bull; Opportunity Networks &bull; Leadership Community
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

