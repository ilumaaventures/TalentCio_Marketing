import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { HOMEPAGE_FAQ_GROUPS } from '../content/marketingContent';

export default function FaqSection() {
  const [activeGroup, setActiveGroup] = useState(HOMEPAGE_FAQ_GROUPS[0]?.title || '');
  const [openKey, setOpenKey] = useState(`${HOMEPAGE_FAQ_GROUPS[0]?.title || ''}-0`);
  const currentGroup =
    HOMEPAGE_FAQ_GROUPS.find((group) => group.title === activeGroup) || HOMEPAGE_FAQ_GROUPS[0];

  return (
    <section className="section-shell bg-white">
      <div className="container-shell">
        <div className="max-w-3xl">
          <span className="section-kicker">FAQ</span>
          <h2 className="section-title">Frequently asked questions about TalentCIO</h2>
          <p className="section-copy">
            These are the questions buyers usually ask when comparing TalentCIO with disconnected HR,
            hiring, and employee operations tools.
          </p>
        </div>

        <div className="mt-12">
          <div className="flex flex-wrap gap-3">
            {HOMEPAGE_FAQ_GROUPS.map((group) => (
              <button
                key={group.title}
                type="button"
                onClick={() => {
                  setActiveGroup(group.title);
                  setOpenKey(`${group.title}-0`);
                }}
                className={`rounded-full px-5 py-2.5 text-sm font-semibold transition ${
                  activeGroup === group.title
                    ? 'bg-[var(--primary)] text-white shadow-[0_16px_40px_-24px_rgba(17,92,185,0.9)]'
                    : 'border border-slate-200 bg-white text-slate-600 hover:border-blue-200 hover:text-blue-700'
                }`}
              >
                {group.title}
              </button>
            ))}
          </div>

          <div className="mt-8">
            <div className="mb-4">
              <h3 className="faq-group-title text-2xl font-bold text-slate-950">{currentGroup.title}</h3>
              <p className="mt-2 text-sm leading-7 text-slate-600">{currentGroup.intro}</p>
            </div>

            <div className="grid gap-4">
              {currentGroup.items.map((item, index) => {
                const itemKey = `${currentGroup.title}-${index}`;
                const isOpen = openKey === itemKey;

                return (
                  <article key={item.question} className="surface-card overflow-hidden">
                    <button
                      type="button"
                      onClick={() => setOpenKey(isOpen ? '' : itemKey)}
                      className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left sm:px-8"
                      aria-expanded={isOpen}
                    >
                      <span className="faq-question text-lg font-semibold text-slate-950">{item.question}</span>
                      <span
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-slate-600 transition ${
                          isOpen ? 'rotate-180 border-blue-200 bg-blue-50 text-blue-700' : ''
                        }`}
                      >
                        <ChevronDown size={18} />
                      </span>
                    </button>

                    {isOpen && (
                      <div className="border-t border-slate-200 px-6 py-5 sm:px-8">
                        <p className="max-w-4xl text-sm leading-8 text-slate-600">{item.answer}</p>
                      </div>
                    )}
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
