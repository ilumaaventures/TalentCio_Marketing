import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';
import { HOMEPAGE_FAQ_GROUPS } from '../content/marketingContent';

export default function FaqSection() {
  const [activeGroup, setActiveGroup] = useState(HOMEPAGE_FAQ_GROUPS[0]?.title || '');
  const [openKey, setOpenKey] = useState(`${HOMEPAGE_FAQ_GROUPS[0]?.title || ''}-0`);
  const currentGroup =
    HOMEPAGE_FAQ_GROUPS.find((group) => group.title === activeGroup) || HOMEPAGE_FAQ_GROUPS[0];

  return (
    <section id="faq" className="section-shell section-divider bg-white">
      <div className="container-shell">
        <div className="max-w-3xl">
          <span className="section-kicker">FAQ</span>
          <h2 className="section-title">Frequently asked questions about TalentCIO</h2>
          <p className="section-copy">
            These are the questions buyers usually ask when comparing TalentCIO with fragmented hiring,
            workforce, and employee operations tools.
          </p>
        </div>

        <div className="mt-12">
          <div className="flex flex-wrap gap-2.5">
            {HOMEPAGE_FAQ_GROUPS.map((group) => (
              <button
                key={group.title}
                type="button"
                onClick={() => {
                  setActiveGroup(group.title);
                  setOpenKey(`${group.title}-0`);
                }}
                className={`rounded-full px-5 py-2 font-['Nunito_Sans'] text-sm font-semibold transition-all duration-200 ${
                  activeGroup === group.title
                    ? 'bg-[#ea7c00] text-white shadow-sm'
                    : 'border border-black/[0.08] bg-[#f5f2ef]/60 text-[#444444] hover:border-[#ea7c00] hover:text-[#ea7c00]'
                }`}
              >
                {group.title}
              </button>
            ))}
          </div>

          <div className="mt-8">
            <div className="mb-5">
              <h3 className="faq-group-title font-['Nunito_Sans'] text-2xl font-bold text-[#282828]">{currentGroup.title}</h3>
              <p className="mt-1.5 font-['Nunito_Sans'] text-sm leading-relaxed text-[#6c757d]">{currentGroup.intro}</p>
            </div>

            <div className="grid gap-3.5">
              {currentGroup.items.map((item, index) => {
                const itemKey = `${currentGroup.title}-${index}`;
                const isOpen = openKey === itemKey;

                return (
                  <motion.article
                    key={item.question}
                    initial={{ opacity: 0, x: -18 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.35, delay: index * 0.05 }}
                    whileHover={{ x: 4, transition: { duration: 0.2 } }}
                    className="overflow-hidden rounded-[16px] border border-black/[0.06] bg-white transition-all duration-200 touch-pan-y hover:border-[#ea7c00]/30"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenKey(isOpen ? '' : itemKey)}
                      className="flex w-full items-center justify-between gap-4 p-5 text-left transition hover:bg-[#f5f2ef]/30 sm:px-7 sm:py-5"
                      aria-expanded={isOpen}
                    >
                      <span className="faq-question font-['Nunito_Sans'] text-base font-bold text-[#282828] sm:text-lg">{item.question}</span>
                      <span
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
                          isOpen ? 'rotate-180 bg-[#ea7c00] text-white shadow-xs' : 'border border-black/[0.08] bg-[#f5f2ef]/60 text-[#444444]'
                        }`}
                      >
                        <ChevronDown size={16} />
                      </span>
                    </button>

                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25 }}
                        className="border-t border-black/[0.06] bg-[#f5f2ef]/20 p-5 sm:px-7 sm:py-5"
                      >
                        <p className="max-w-4xl font-['Nunito_Sans'] text-sm leading-relaxed text-[#444444]">{item.answer}</p>
                      </motion.div>
                    )}
                  </motion.article>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

