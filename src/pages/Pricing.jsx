import React from 'react';
import { Link } from 'react-router-dom';
import CTASection from '../components/CTASection';
import PricingSection from '../components/PricingSection';
import Seo from '../components/Seo';
import { PAGE_COPY, SITE_URL } from '../content/marketingContent';
import usePrerenderReady from '../hooks/usePrerenderReady';

const pageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'talentCIO Pricing',
  url: `${SITE_URL}/pricing`,
  description: PAGE_COPY.pricing.description
};

export default function Pricing() {
  usePrerenderReady();

  return (
    <>
      <Seo
        title={PAGE_COPY.pricing.title}
        description={PAGE_COPY.pricing.description}
        canonical={`${SITE_URL}/pricing`}
        schema={pageSchema}
      />

      <main className="bg-white pb-20 pt-28">
        <section className="container-shell">
          <div id="pricing-overview" className="surface-card overflow-hidden px-6 py-10 sm:px-10 sm:py-12">
            <span className="section-kicker">Pricing</span>
            <h1 className="section-title">{PAGE_COPY.pricing.h1}</h1>
            <p className="section-copy max-w-3xl">
              talentCIO Platform pricing is designed to stay modular. Start with the workflows you need now,
              then expand as your team size, process depth, and operational complexity increase.
            </p>

            <div className="mt-8 grid gap-4 lg:grid-cols-3">
              {[
                {
                  title: 'What affects pricing',
                  body: 'Team size, selected workflows, rollout scope, and whether you need a focused implementation or a broader ecosystem engagement.'
                },
                {
                  title: 'What buyers need to see',
                  body: 'Clear INR pricing, included modules, billing cadence, support scope, and any onboarding or implementation requirements.'
                },
                {
                  title: 'How to choose a plan',
                  body: 'Start with the operational workflows you need now, then scale into broader platform and workforce needs as the organization grows.'
                }
              ].map((item) => (
                <article key={item.title} className="rounded-[28px] border border-slate-200 bg-slate-50 p-5">
                  <h2 className="text-xl font-bold text-slate-950">{item.title}</h2>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{item.body}</p>
                </article>
              ))}
            </div>

            <div className="mt-8">
              <Link to="/demo" className="btn-primary">
                Request Pricing Guidance
              </Link>
            </div>
          </div>
        </section>

        <PricingSection />
        <CTASection />
      </main>
    </>
  );
}
