import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRightLeft, Brain, Network, TrendingUp, Users } from 'lucide-react';
import { WHY_TALENTCIO } from '../content/marketingContent';

const iconMap = {
  Brain,
  Network,
  Users,
  ArrowRightLeft,
  TrendingUp
};

export default function FeaturesSection() {
  return (
    <section id="why-talentcio" className="section-shell">
      <div className="container-shell">
        <div className="max-w-3xl">
          <span className="section-kicker">Why talentCIO</span>
          <h2 className="section-title">Why organizations choose a connected talent ecosystem</h2>
          <p className="section-copy">
            TalentCIO is built around the idea that workforce outcomes improve when human expertise,
            intelligent technology, and connected networks work together instead of in silos.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {WHY_TALENTCIO.map((feature, index) => {
            const Icon = iconMap[feature.icon] || Brain;

            return (
              <motion.article
                key={feature.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.35, delay: index * 0.04 }}
                className="group surface-card border-slate-200 p-6 transition hover:-translate-y-1 hover:border-blue-200"
              >
                <div className="flex items-start gap-4">
                  <div className="rounded-2xl bg-blue-50 p-3 text-blue-700 transition group-hover:bg-blue-600 group-hover:text-white">
                    <Icon size={22} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-slate-950">{feature.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-slate-600">{feature.body}</p>
                  </div>
                </div>
                <div className="mt-6 h-1 w-14 rounded-full bg-blue-100 transition group-hover:w-24 group-hover:bg-blue-600" />
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
