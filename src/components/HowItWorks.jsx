import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Target, Layers, BrainCircuit } from 'lucide-react';
import { HOW_IT_WORKS_STEPS } from '../content/marketingContent';

const stepIcons = {
  Target,
  Layers,
  BrainCircuit
};

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="section-shell section-divider bg-[#f5f2ef]/40">
      <div className="container-shell">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:items-center">
          <div>
            <span className="section-kicker">How It Works</span>
            <h2 className="section-title max-w-3xl">How the TalentCIO ecosystem turns workforce needs into action</h2>
          </div>
          <p className="section-copy max-w-none lg:border-l lg:border-black/[0.08] lg:pl-8">
            The flow is intentionally simple: diagnose the workforce problem, route it to the right talentCIO
            layer, then execute with human expertise supported by technology.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1fr_auto_1fr_auto_1fr]">
          {HOW_IT_WORKS_STEPS.map((step, index) => {
            const IconComponent = stepIcons[step.icon] || Sparkles;

            return (
              <React.Fragment key={step.title}>
                <motion.article
                  initial={{ opacity: 0, scale: 0.88, y: 25 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ type: 'spring', stiffness: 220, damping: 18, delay: index * 0.1 }}
                  whileHover={{ y: -8 }}
                  className="group rounded-[20px] border border-black/[0.06] bg-white p-7 text-center shadow-[0_5px_15px_rgba(0,0,0,0.04)] transition-all duration-300 touch-pan-y hover:border-[#ea7c00]/40 hover:shadow-[0_15px_35px_rgba(234,124,0,0.12)]"
                >
                  <motion.div
                    whileHover={{ scale: 1.15, rotate: [0, -8, 8, 0] }}
                    transition={{ duration: 0.4 }}
                    className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#ea7c00] text-white shadow-[0_8px_20px_rgba(234,124,0,0.35)] transition-all duration-300 group-hover:bg-[#d47000] group-hover:shadow-[0_12px_28px_rgba(234,124,0,0.45)]"
                  >
                    <IconComponent className="h-7 w-7 stroke-[2]" />
                  </motion.div>
                  <h3 className="mt-5 font-['Nunito_Sans'] text-xl font-extrabold text-[#282828] transition-colors group-hover:text-[#ea7c00]">{step.title}</h3>
                  <p className="mt-3 font-['Nunito_Sans'] text-sm leading-relaxed text-[#444444]">{step.desc}</p>
                </motion.article>

                {index < HOW_IT_WORKS_STEPS.length - 1 && (
                  <div className="hidden items-center justify-center lg:flex">
                    <ArrowRight size={22} className="text-[#ea7c00]" />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </section>
  );
}
