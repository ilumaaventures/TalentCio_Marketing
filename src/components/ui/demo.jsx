import { useEffect } from 'react';
import { BadgeCheck, BriefcaseBusiness, CalendarDays, PhoneCall } from 'lucide-react';

import { destroyCanvas, renderCanvas } from '@/components/ui/canvas';
import { HERO_CONTENT } from '@/content/marketingContent';

const trustPoints = [
  'Strategic hiring advisory',
  'Platform-led workforce operations',
  'Leadership and talent community'
];

const heroHeadlineLines = [
  'Transforming',
  'Workforces',
  'Through Human',
  'Intelligence &',
  'Technology'
];

export function Hero() {
  useEffect(() => {
    renderCanvas('home-canvas');

    return () => {
      destroyCanvas();
    };
  }, []);

  return (
    <section
      id="home"
      className="relative overflow-hidden border-b border-slate-200 bg-[radial-gradient(circle_at_top_left,rgba(47,157,161,0.14),transparent_24%),radial-gradient(circle_at_88%_14%,rgba(255,127,102,0.12),transparent_18%),linear-gradient(180deg,#ffffff_0%,#f7fbfb_100%)] pt-28"
    >
      <canvas
        id="home-canvas"
        className="pointer-events-none absolute inset-0 z-0 mx-auto opacity-80"
      />
      <div className="absolute left-[4%] top-28 h-28 w-28 rounded-full bg-[var(--primary-light)] blur-2xl" />
      <div className="absolute right-[6%] top-24 h-40 w-40 rounded-full bg-[var(--accent-soft)] blur-3xl" />
      <div className="absolute left-[8%] top-[24rem] h-10 w-10 rounded-full border border-[var(--primary)]/20 bg-white" />

      <div className="container-shell relative z-10 pb-14">
        <div className="grid items-start gap-10 lg:min-h-[calc(100vh-138px)] lg:grid-cols-[minmax(0,0.92fr)_minmax(360px,1.08fr)] lg:items-stretch">
          <div className="flex flex-col">
            <div className="relative w-full max-w-[41rem] py-2 lg:max-w-none">
              <span className="section-kicker">Talent Intelligence Ecosystem</span>
              <h1
                className="homepage-hero-title mt-5 max-w-[11.5ch] leading-[0.96] tracking-[-0.05em] text-slate-950"
                aria-label={HERO_CONTENT.headline}
              >
                {heroHeadlineLines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </h1>
            </div>

            <div className="mt-7 lg:mt-8">
              <p className="max-w-[44rem] text-[1rem] leading-7 text-slate-600 sm:text-[1.06rem] sm:leading-8">
                {HERO_CONTENT.subheadline}
              </p>

              <div className="mt-8 flex flex-wrap gap-3.5">
                {trustPoints.map((point) => (
                  <span
                    key={point}
                    className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 shadow-[0_14px_35px_-28px_rgba(25,50,73,0.35)]"
                  >
                    <BadgeCheck className="h-4 w-4 text-[var(--primary)]" />
                    {point}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="relative flex h-full">
            <div className="editorial-panel flex h-full w-full bg-white p-4 sm:p-5">
              <div className="grid h-full w-full gap-4 lg:grid-cols-[minmax(0,1fr)_252px]">
                <div className="relative overflow-hidden rounded-[28px] bg-slate-100">
                  <img
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1200&q=80"
                    alt="HR advisor consulting with a client"
                    className="h-full min-h-[420px] w-full object-cover"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-[linear-gradient(180deg,transparent,rgba(25,50,73,0.82))] p-6 text-white">
                    <p className="text-xs font-bold uppercase tracking-[0.24em] text-white/80">People Advisory</p>
                    <h2 className="mt-2 max-w-[12ch] text-[1.9rem] font-bold leading-tight">Workforce strategy that stays practical and measurable</h2>
                  </div>
                </div>

                <div className="flex h-full flex-col gap-4">
                  <div className="flex-1 rounded-[26px] bg-[var(--primary-light)] p-5 sm:p-6">
                    <div className="flex items-center gap-3">
                      <div className="rounded-2xl bg-white p-3 text-[var(--primary)] shadow-sm">
                        <CalendarDays className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-[1.05rem] font-bold leading-snug text-slate-950 sm:text-[1.15rem]">Talent Intelligence Solutions</p>
                      </div>
                    </div>
                    <p className="mt-4 max-w-[18rem] text-[0.92rem] leading-6 text-slate-600 sm:text-[0.96rem]">
                      Strategic talent and workforce solutions, hiring intelligence and human-centered consulting
                    </p>
                  </div>

                  <div className="flex-1 rounded-[26px] bg-[var(--accent-soft)] p-5 sm:p-6">
                    <div className="flex items-center gap-3">
                      <div className="rounded-2xl bg-white p-3 text-[var(--accent)] shadow-sm">
                        <BriefcaseBusiness className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Coverage</p>
                        <p className="text-[1.05rem] font-bold leading-snug text-slate-950 sm:text-[1.15rem]">Hiring to exit workflows</p>
                      </div>
                    </div>
                    <p className="mt-4 max-w-[18rem] text-[0.92rem] leading-6 text-slate-600 sm:text-[0.96rem]">
                      Support across recruitment, onboarding, attendance, employee operations, performance, and growth.
                    </p>
                  </div>

                  <div className="flex-1 rounded-[26px] bg-[var(--dark)] p-5 text-white shadow-[0_22px_60px_-36px_rgba(25,50,73,0.65)] sm:p-6">
                    <div className="flex items-center gap-3">
                      <div className="rounded-2xl bg-white/10 p-3 text-white">
                        <PhoneCall className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/70">Talk to us</p>
                        <p className="text-[1.05rem] font-bold leading-snug sm:text-[1.15rem]">Advisory + platform guidance</p>
                      </div>
                    </div>
                    <p className="mt-4 max-w-[18rem] text-[0.92rem] leading-6 text-slate-200 sm:text-[0.96rem]">
                      Start with a consulting discussion and we&apos;ll guide you to the right TalentCIO path.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
