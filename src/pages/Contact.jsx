import React from 'react';
import { Mail, PhoneCall } from 'lucide-react';
import { Link } from 'react-router-dom';
import CTASection from '../components/CTASection';
import Seo from '../components/Seo';
import { PAGE_COPY, SITE_URL } from '../content/marketingContent';

const pageSchema = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  name: 'Contact TalentCIO',
  url: `${SITE_URL}/contact`,
  description: PAGE_COPY.contact.description
};

export default function Contact() {
  return (
    <>
      <Seo
        title={PAGE_COPY.contact.title}
        description={PAGE_COPY.contact.description}
        canonical={`${SITE_URL}/contact`}
        schema={pageSchema}
      />

      <main className="bg-white pb-20 pt-28">
        <section className="container-shell">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_420px]">
            <div className="surface-card p-6 sm:p-10">
              <span className="section-kicker">Contact</span>
              <h1 className="section-title">Talk to the TalentCIO team</h1>
              <p className="section-copy max-w-3xl">
                Use the demo page for product walkthroughs, commercial discussions, or rollout planning.
                This page supports direct contact for teams that already know what they need and want to
                reach the team quickly.
              </p>

              <div className="mt-8 grid gap-4 md:grid-cols-2">
                <article className="rounded-[28px] border border-slate-200 bg-slate-50 p-5">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-blue-700">
                    <Mail size={20} />
                  </div>
                  <h2 className="mt-4 text-xl font-bold text-slate-950">Email</h2>
                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    Reach the team for platform questions, implementation scope, and commercial follow-up.
                  </p>
                  <a href="mailto:hello@talentcio.in" className="mt-4 inline-flex text-sm font-semibold text-blue-700">
                    hello@talentcio.in
                  </a>
                </article>

                <article className="rounded-[28px] border border-slate-200 bg-slate-50 p-5">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-blue-700">
                    <PhoneCall size={20} />
                  </div>
                  <h2 className="mt-4 text-xl font-bold text-slate-950">Best next step</h2>
                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    For the fastest response, submit your business details through the demo form so the
                    team can route the conversation correctly.
                  </p>
                  <Link to="/demo" className="mt-4 inline-flex text-sm font-semibold text-blue-700">
                    Open the demo request form
                  </Link>
                </article>
              </div>
            </div>

            <aside className="surface-card h-fit bg-[var(--dark)] p-6 text-white">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-200">Before you reach out</p>
              <div className="mt-5 space-y-4 text-sm leading-7 text-slate-200">
                <p>Share your team size, modules of interest, and expected rollout timeline.</p>
                <p>Note whether the conversation is about attendance, hiring, onboarding, or the broader suite.</p>
                <p>If you need pricing, ask for approved INR plans rather than indicative or sample quotes.</p>
              </div>

              <div className="mt-6">
                <Link to="/demo" className="inline-flex w-full items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-blue-700 transition hover:bg-blue-50">
                  Request a Demo
                </Link>
              </div>
            </aside>
          </div>
        </section>

        <CTASection />
      </main>
    </>
  );
}
