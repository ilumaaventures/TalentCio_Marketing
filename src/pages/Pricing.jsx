import React from 'react';
import { Link } from 'react-router-dom';
import CTASection from '../components/CTASection';
import PricingSection from '../components/PricingSection';
import Seo from '../components/Seo';
import { PAGE_COPY, SITE_URL } from '../content/marketingContent';

const pageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'TalentCIO Pricing',
  url: `${SITE_URL}/pricing`,
  description: PAGE_COPY.pricing.description
};

export default function Pricing() {
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
          <div className="surface-card overflow-hidden px-6 py-10 sm:px-10 sm:py-12">
            <span className="section-kicker">Pricing</span>
            <h1 className="section-title">TalentCIO pricing should stay transparent and real</h1>
            <p className="section-copy max-w-3xl">
              Use this page to explain how TalentCIO pricing changes by module scope, workforce size,
              implementation needs, and rollout complexity. Publish only real INR plans here. If your live
              pricing API is not ready yet, keep the page honest and route buyers to a demo.
            </p>

            <div className="mt-8 rounded-[28px] border border-amber-200 bg-amber-50 p-5 text-sm leading-7 text-amber-900">
              Add actual INR plan names, limits, and billing cycles only after they are approved for public
              release. Avoid placeholder prices, sample discounts, or invented package tiers.
            </div>

            <div className="mt-8 grid gap-4 lg:grid-cols-3">
              {[
                {
                  title: 'What affects pricing',
                  body: 'User count, selected modules, and whether you need a narrower rollout or a full suite implementation.'
                },
                {
                  title: 'What buyers need to see',
                  body: 'Clear INR pricing, included modules, billing cadence, support scope, and any onboarding or implementation charges.'
                },
                {
                  title: 'What to do until plans are live',
                  body: 'Keep this page indexable with honest explanatory copy and send commercial conversations to the demo form.'
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
