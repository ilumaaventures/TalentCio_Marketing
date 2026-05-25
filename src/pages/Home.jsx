import React from 'react';
import { Link } from 'react-router-dom';
import CTASection from '../components/CTASection';
import FaqSection from '../components/FaqSection';
import FeaturesSection from '../components/FeaturesSection';
import HeroSection from '../components/HeroSection';
import HowItWorks from '../components/HowItWorks';
import ModulesShowcase from '../components/ModulesShowcase';
import PricingSection from '../components/PricingSection';
import Seo from '../components/Seo';
import TestimonialsSection from '../components/TestimonialsSection';
import {
  BRAND_DESCRIPTION,
  ECOSYSTEM_VERTICALS,
  FLAGSHIP_PROGRAMS,
  HOMEPAGE_FAQS,
  HOMEPAGE_MARKET_PARAGRAPH,
  INDUSTRIES_SERVED,
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
  taleex: '/taleex',
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
        <HeroSection />

        <section id="ecosystem" className="section-shell pt-10">
          <div className="container-shell">
            <div className="max-w-3xl">
              <span className="section-kicker">The Ecosystem</span>
              <h2 className="section-title">One connected ecosystem across talent solutions, platform, opportunities, and community</h2>
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {ECOSYSTEM_VERTICALS.map((vertical) => (
                <article key={vertical.id} className="surface-card p-6">
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">{vertical.number}</p>
                  <h3 className="mt-4 text-2xl font-bold text-slate-950">{vertical.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-slate-600">{vertical.subtitle}</p>
                  <Link to={routeMap[vertical.id]} className="mt-5 inline-flex text-sm font-semibold text-blue-700">
                    Explore
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="market-overview" className="section-shell bg-[var(--surface)]">
          <div className="container-shell">
            <div className="surface-card p-6 sm:p-8">
              <span className="section-kicker">Market Context</span>
              <h2 className="homepage-market-title mt-4 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                Talent markets are accelerating faster than fragmented systems can handle
              </h2>
              <p className="mt-5 max-w-4xl text-base leading-8 text-slate-600">
                {HOMEPAGE_MARKET_PARAGRAPH}
              </p>
              <div className="mt-6 flex flex-wrap gap-3 text-sm font-semibold text-blue-700">
                {Object.values(MARKET_SOURCES).map((source) => (
                  <a key={source.url} href={source.url} target="_blank" rel="noreferrer">
                    {source.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        <FeaturesSection />
        <ModulesShowcase />
        <HowItWorks />

        <section id="programs-preview" className="section-shell">
          <div className="container-shell">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div className="max-w-3xl">
                <span className="section-kicker">Flagship Programs</span>
                <h2 className="section-title">Signature programs for professionals and organizations</h2>
              </div>
              <Link to="/programs" className="text-sm font-semibold text-blue-700">View all programs</Link>
            </div>

            <div className="mt-10 grid gap-6 lg:grid-cols-2">
              {FLAGSHIP_PROGRAMS.map((program) => (
                <article key={program.id} className="surface-card p-6">
                  <h3 className="text-2xl font-bold text-slate-950">{program.title}</h3>
                  <p className="mt-2 text-sm font-semibold text-slate-500">{program.subtitle}</p>
                  <p className="mt-4 text-sm leading-7 text-slate-600">{program.positioning}</p>
                  <Link to={`/programs#${program.id}`} className="mt-5 inline-flex text-sm font-semibold text-blue-700">
                    Learn more
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="industries-preview" className="section-shell bg-[var(--surface)]">
          <div className="container-shell">
            <div className="surface-card p-6 sm:p-8">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div className="max-w-3xl">
                  <span className="section-kicker">Industries</span>
                  <h2 className="section-title">Built for varied workforce realities across sectors</h2>
                </div>
                <Link to="/industries" className="text-sm font-semibold text-blue-700">See industries</Link>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                {INDUSTRIES_SERVED.map((industry) => (
                  <span key={industry.name} className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-700">
                    {industry.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <PricingSection />
        <TestimonialsSection />
        <FaqSection />
        <CTASection />
      </main>
    </>
  );
}
