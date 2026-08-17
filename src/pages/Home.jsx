import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Brain, LayoutPanelTop, Users, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import CTASection from '../components/CTASection';
import FaqSection from '../components/FaqSection';
import FeaturesSection from '../components/FeaturesSection';
import HowItWorks from '../components/HowItWorks';
import ModulesShowcase from '../components/ModulesShowcase';
import PricingSection from '../components/PricingSection';
import Seo from '../components/Seo';
import TestimonialsSection from '../components/TestimonialsSection';
import { Hero as CanvasHero } from '../components/ui/demo';
import {
  BRAND_DESCRIPTION,
  ECOSYSTEM_VERTICALS,
  HOMEPAGE_FAQS,
  HOMEPAGE_MARKET_PARAGRAPH,
  MARKET_SOURCES,
  PAGE_COPY,
  SITE_URL,
  buildFAQSchema,
  buildOrganizationSchema,
  buildWebSiteSchema
} from '../content/marketingContent';
import usePrerenderReady from '../hooks/usePrerenderReady';

const routeMap = {
  solutions: '/solutions',
  platform: '/features',
  talentsphere: '/talentsphere'
};

const verticalIcons = {
  solutions: ShieldCheck,
  platform: LayoutPanelTop,
  talentsphere: Users
};

export default function Home() {
  usePrerenderReady();

  return (
    <>
      <Seo
        title={PAGE_COPY.home.title}
        description={PAGE_COPY.home.description}
        canonical={SITE_URL}
        schema={{
          '@context': 'https://schema.org',
          '@graph': [
            {
              '@type': 'WebPage',
              name: 'talentCIO',
              url: SITE_URL,
              description: PAGE_COPY.home.description
            },
            buildOrganizationSchema(),
            buildWebSiteSchema(),
            buildFAQSchema(HOMEPAGE_FAQS),
            {
              '@type': 'Thing',
              name: 'Talent Intelligence Ecosystem',
              description: BRAND_DESCRIPTION
            }
          ]
        }}
      />

      <main className="homepage-shell">
        <CanvasHero />

        <section id="ecosystem" className="section-shell section-divider bg-white">
          <div className="container-shell">
            <div className="grid gap-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:items-center">
              <div>
                <span className="section-kicker">The Ecosystem</span>
                <h2 className="section-title">
                  One connected ecosystem across talent solutions, platform, community, and flagship programs
                </h2>
              </div>
              <p className="section-copy max-w-none lg:border-l lg:border-black/[0.08] lg:pl-8">
                TalentCIO brings strategic hiring, workforce software, leadership community, and flagship
                programs into one structured operating system for workforce growth instead of a stack of
                disconnected point solutions.
              </p>
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {ECOSYSTEM_VERTICALS.map((vertical, index) => {
                const IconComponent = verticalIcons[vertical.id] || Brain;
                const cardAnimations = [
                  { initial: { opacity: 0, y: 35, rotate: -1.5 }, animate: { opacity: 1, y: 0, rotate: 0 } },
                  { initial: { opacity: 0, y: 40, scale: 0.93 }, animate: { opacity: 1, y: 0, scale: 1 } },
                  { initial: { opacity: 0, y: 35, rotate: 1.5 }, animate: { opacity: 1, y: 0, rotate: 0 } }
                ];
                const anim = cardAnimations[index % 3];

                return (
                  <motion.article
                    key={vertical.id}
                    initial={anim.initial}
                    whileInView={anim.animate}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.5, delay: index * 0.1, ease: 'easeOut' }}
                    whileHover={{ y: -8, scale: 1.015 }}
                    className="group flex flex-col items-center rounded-[20px] border border-black/[0.06] bg-white p-7 text-center shadow-[0_5px_15px_rgba(0,0,0,0.04)] transition-all duration-300 touch-pan-y hover:border-[#ea7c00]/40 hover:shadow-[0_15px_35px_rgba(234,124,0,0.12)] sm:p-8"
                  >
                    <motion.div
                      whileHover={{ scale: 1.12, rotate: [0, -6, 6, 0] }}
                      transition={{ duration: 0.35 }}
                      className="flex h-14 w-14 items-center justify-center rounded-xl border border-[#ea7c00]/20 bg-[#ea7c00]/10 text-[#ea7c00] transition-all duration-300 group-hover:bg-[#ea7c00] group-hover:text-white"
                    >
                      <IconComponent className="h-7 w-7 stroke-[1.8]" />
                    </motion.div>
                    <h3 className="mt-6 font-['Nunito_Sans'] text-xl font-extrabold text-[#282828] transition-colors group-hover:text-[#ea7c00]">
                      {vertical.title}
                    </h3>
                    <p className="mt-3 flex-1 font-['Nunito_Sans'] text-sm leading-relaxed text-[#444444]">
                      {vertical.subtitle}
                    </p>
                    <Link
                      to={routeMap[vertical.id]}
                      className="mt-6 inline-flex items-center gap-2 font-['Nunito_Sans'] text-xs font-bold uppercase tracking-wider text-[#ea7c00] transition-colors hover:text-[#d47000]"
                    >
                      Explore
                      <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                    </Link>
                  </motion.article>
                );
              })}
            </div>
          </div>
        </section>

        <section id="market-overview" className="section-shell section-divider bg-[#f5f2ef]/40">
          <div className="container-shell">
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5 }}
              className="rounded-[20px] border border-black/[0.06] bg-white shadow-[0_5px_15px_rgba(0,0,0,0.04)] transition-all duration-300 touch-pan-y hover:shadow-[0_12px_30px_rgba(0,0,0,0.06)]"
            >
              <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(260px,0.9fr)] lg:p-10">
                <div>
                  <span className="section-kicker">Market Context</span>
                  <h2 className="section-title mt-4 max-w-3xl">
                    Talent markets are accelerating faster than fragmented systems can handle
                  </h2>
                  <p className="mt-4 max-w-4xl font-['Nunito_Sans'] text-sm leading-relaxed text-[#444444] sm:text-base">
                    {HOMEPAGE_MARKET_PARAGRAPH}
                  </p>
                </div>
                <div className="border-l-0 border-t border-black/[0.06] pt-6 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
                  <p className="font-['Nunito_Sans'] text-xs font-bold uppercase tracking-[0.2em] text-[#ea7c00]">Reference Signals</p>
                  <div className="mt-4 space-y-3">
                    {Object.values(MARKET_SOURCES).map((source, index) => (
                      <motion.a
                        key={source.url}
                        href={source.url}
                        target="_blank"
                        rel="noreferrer"
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.35, delay: index * 0.08 }}
                        whileHover={{ x: 4 }}
                        className="block rounded-[14px] border border-black/[0.06] bg-[#f5f2ef]/40 px-4 py-3.5 transition-all duration-200 touch-pan-y hover:border-[#ea7c00]/40 hover:bg-white hover:shadow-xs"
                      >
                        <p className="font-['Nunito_Sans'] text-xs font-bold uppercase tracking-[0.16em] text-[#282828]">{source.label}</p>
                        <p className="mt-1 font-['Nunito_Sans'] text-xs text-[#6c757d]">{source.date}</p>
                      </motion.a>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <FeaturesSection />
        <ModulesShowcase />
        <HowItWorks />

        <PricingSection />
        <TestimonialsSection />
        <FaqSection />
        <CTASection showConsultationButton={false} />
      </main>
    </>
  );
}
