import React from 'react';
import { Link } from 'react-router-dom';
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
                <span className="section-kicker eyebrow-line">The Ecosystem</span>
                <h2 className="section-title">
                  One connected ecosystem across talent solutions, platform, community, and flagship programs
                </h2>
              </div>
              <p className="section-copy max-w-none lg:border-l lg:border-slate-200 lg:pl-8">
                TalentCIO brings strategic hiring, workforce software, leadership community, and flagship
                programs into one structured operating system for workforce growth instead of a stack of
                disconnected point solutions.
              </p>
            </div>

            <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {ECOSYSTEM_VERTICALS.map((vertical) => (
                <article key={vertical.id} className="editorial-panel group p-6 sm:p-7">
                  <div className="flex items-start justify-between gap-4">
                    <p className="text-xs font-bold uppercase tracking-[0.28em] text-slate-500">{vertical.number}</p>
                    <span className="h-11 w-11 rounded-2xl bg-[var(--primary-light)] transition group-hover:bg-[var(--primary)]" />
                  </div>
                  <h3 className="mt-10 text-[1.65rem] font-bold tracking-[-0.04em] text-slate-950">{vertical.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-slate-600">{vertical.subtitle}</p>
                  <Link to={routeMap[vertical.id]} className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-[var(--primary)]">
                    Explore
                    <span className="inline-block h-px w-10 bg-[var(--primary)]" />
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="market-overview" className="section-shell section-divider bg-[var(--surface)]">
          <div className="container-shell">
            <div className="editorial-panel">
              <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(260px,0.9fr)] lg:p-10">
                <div>
                  <span className="section-kicker eyebrow-line">Market Context</span>
                  <h2 className="section-title mt-5 max-w-3xl">
                    Talent markets are accelerating faster than fragmented systems can handle
                  </h2>
                  <p className="mt-5 max-w-4xl text-base leading-8 text-slate-600">
                    {HOMEPAGE_MARKET_PARAGRAPH}
                  </p>
                </div>
                <div className="border-l-0 border-t border-slate-200 pt-6 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
                  <p className="text-xs font-bold uppercase tracking-[0.3em] text-slate-500">Reference Signals</p>
                  <div className="mt-5 space-y-4">
                    {Object.values(MARKET_SOURCES).map((source) => (
                      <a
                        key={source.url}
                        href={source.url}
                        target="_blank"
                        rel="noreferrer"
                        className="block rounded-[22px] border border-slate-200 bg-white px-4 py-4 transition hover:border-blue-200 hover:shadow-sm"
                      >
                        <p className="text-sm font-bold uppercase tracking-[0.18em] text-slate-900">{source.label}</p>
                        <p className="mt-2 text-sm leading-6 text-slate-600">{source.date}</p>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
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
