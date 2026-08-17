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
    <section id="why-talentcio" className="section-shell section-divider bg-[#f5f2ef]/50">
      <div className="container-shell">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-end">
          <div className="max-w-3xl">
            <span className="section-kicker">Why talentCIO</span>
            <h2 className="section-title">
              People strategy backed by technology, execution, and accountability
            </h2>
            <p className="section-copy">
              TalentCIO is designed for teams that need more than a vendor. We combine consulting judgment,
              operational support, and modern workforce tools to create a more dependable HR growth engine.
            </p>
          </div>

          <div className="rounded-[20px] border border-black/[0.06] bg-white p-4 shadow-[0_5px_15px_rgba(0,0,0,0.04)]">
            <img
              src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80"
              alt="Workforce analytics dashboard on a laptop screen"
              className="h-[240px] w-full rounded-[16px] object-cover"
            />
          </div>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {WHY_TALENTCIO.map((feature, index) => {
            const Icon = iconMap[feature.icon] || Brain;

            return (
              <motion.article
                key={feature.id}
                initial={{ opacity: 0, y: 28, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, delay: index * 0.07, ease: [0.21, 0.47, 0.32, 0.98] }}
                whileHover={{ y: -7, transition: { duration: 0.25 } }}
                className="group rounded-[20px] border border-black/[0.06] bg-white p-7 shadow-[0_5px_15px_rgba(0,0,0,0.04)] transition-all duration-300 touch-pan-y hover:border-[#ea7c00]/40 hover:shadow-[0_15px_35px_rgba(234,124,0,0.12)]"
              >
                <div className="flex items-start gap-4">
                  <motion.div
                    whileHover={{ rotate: [0, -8, 8, 0], scale: 1.08 }}
                    transition={{ duration: 0.4 }}
                    className="rounded-xl border border-[#ea7c00]/20 bg-[#ea7c00]/10 p-3.5 text-[#ea7c00] transition-all duration-300 group-hover:bg-[#ea7c00] group-hover:text-white"
                  >
                    <Icon size={22} />
                  </motion.div>
                  <div className="flex-1">
                    <h3 className="font-['Nunito_Sans'] text-lg font-extrabold text-[#282828] transition-colors group-hover:text-[#ea7c00]">{feature.title}</h3>
                    <p className="mt-2.5 font-['Nunito_Sans'] text-sm leading-relaxed text-[#444444]">{feature.body}</p>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

