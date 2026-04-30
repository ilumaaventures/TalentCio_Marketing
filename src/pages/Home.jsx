import React from 'react';
import CTASection from '../components/CTASection';
import FeaturesSection from '../components/FeaturesSection';
import HeroSection from '../components/HeroSection';
import HowItWorks from '../components/HowItWorks';
import ModulesShowcase from '../components/ModulesShowcase';
import PricingSection from '../components/PricingSection';
import Seo from '../components/Seo';
import TestimonialsSection from '../components/TestimonialsSection';
import { HOMEPAGE_MARKET_PARAGRAPH, MARKET_SOURCES, PAGE_COPY, SITE_URL } from '../content/marketingContent';

export default function Home() {
  return (
    <>
      <Seo
        title={PAGE_COPY.home.title}
        description={PAGE_COPY.home.description}
        canonical={SITE_URL}
        schema={{
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name: 'TalentCIO',
          url: SITE_URL,
          description: PAGE_COPY.home.description
        }}
      />

      <main>
        <HeroSection />

        <section className="section-shell pt-10">
          <div className="container-shell">
            <div className="surface-card p-6 sm:p-8">
              <span className="section-kicker">India HR Market</span>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                Market demand is moving faster than disconnected HR stacks
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
        <PricingSection />
        <TestimonialsSection />
        <CTASection />
      </main>
    </>
  );
}
