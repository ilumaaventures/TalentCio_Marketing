import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { Link } from 'react-router-dom';

const predefinedPlans = [
  {
    name: 'Starter',
    description: 'For small teams that want to replace spreadsheets with a clean HR operations base.',
    monthlyPrice: 1499,
    yearlyPrice: 14995,
    maxUsers: 25,
    maxModules: 4,
    features: [
      'Attendance and leave workflows',
      'Employee profiles and records',
      'Basic approval flows',
      'Email support'
    ],
    isPopular: false
  },
  {
    name: 'Growth',
    description: 'For growing businesses running both people operations and active hiring in one system.',
    monthlyPrice: 3499,
    yearlyPrice: 34995,
    maxUsers: 100,
    maxModules: 8,
    features: [
      'Everything in Starter',
      'Talent acquisition workflows',
      'Onboarding management',
      'Help desk and meeting workflows'
    ],
    isPopular: true
  },
  {
    name: 'Enterprise',
    description: 'For larger organizations that need the full suite, deeper controls, and tailored rollout support.',
    monthlyPrice: 7499,
    yearlyPrice: 74995,
    maxUsers: 'Unlimited',
    maxModules: 'All',
    features: [
      'All modules included',
      'Advanced permissions',
      'Priority support',
      'Implementation assistance'
    ],
    isPopular: false
  }
];

const formatPlanPrice = (price) => `Rs. ${Number(price).toLocaleString('en-IN')}`;
const getDiscountPercent = (monthlyPrice, yearlyPrice) =>
  Math.round((1 - yearlyPrice / (monthlyPrice * 12)) * 100);

export default function PricingSection() {
  const [selectedCycle, setSelectedCycle] = useState('Monthly');

  return (
    <section id="pricing" className="section-shell bg-[var(--surface)]">
      <div className="container-shell">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <span className="section-kicker">Pricing</span>
            <h2 className="section-title">Flexible plans that grow with your workforce</h2>
            <p className="section-copy">
              Choose a plan based on your team size, module needs, and rollout scope. Yearly billing gives
              you a lower effective monthly cost than the standard monthly plan, and this month all plans
              include a 50% special-offer reduction.
            </p>
          </div>

          <div className="inline-flex rounded-full border border-slate-200 bg-white p-1 shadow-sm">
            {['Monthly', 'Yearly'].map((cycle) => (
              <button
                key={cycle}
                type="button"
                onClick={() => setSelectedCycle(cycle)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                  selectedCycle === cycle
                    ? 'bg-[var(--primary)] text-white'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {cycle}
                {cycle === 'Yearly' && (
                  <span className={`ml-2 rounded-full px-2 py-0.5 text-[11px] font-bold ${
                    selectedCycle === cycle ? 'bg-white/15 text-white' : 'bg-emerald-50 text-emerald-700'
                  }`}>
                    Save up to 17%
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-12 grid gap-6 xl:grid-cols-3">
          {predefinedPlans.map((plan, index) => {
            const displayPrice = selectedCycle === 'Yearly' ? plan.yearlyPrice : plan.monthlyPrice;
            const cycleLabel = selectedCycle === 'Yearly' ? 'year' : 'month';
            const discountPercent = getDiscountPercent(plan.monthlyPrice, plan.yearlyPrice);

            return (
              <motion.article
                key={`${plan.name}-${selectedCycle}`}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.35, delay: index * 0.06 }}
                className={`surface-card p-6 ${plan.isPopular ? 'border-2 border-blue-500 bg-blue-950 text-white' : ''}`}
              >
                <div className={`inline-flex rounded-full px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] ${
                  plan.isPopular ? 'bg-orange-400 text-slate-950' : 'bg-orange-50 text-orange-700'
                }`}>
                  50% Off This Month
                </div>
                <p className={`text-sm font-semibold uppercase tracking-[0.22em] ${plan.isPopular ? 'text-blue-100' : 'text-slate-500'}`}>
                  {plan.name}
                </p>
                <h3 className={`mt-5 text-4xl font-bold ${plan.isPopular ? 'text-white' : 'text-slate-950'}`}>
                  {formatPlanPrice(displayPrice)}
                </h3>
                <p className={`mt-2 text-sm ${plan.isPopular ? 'text-blue-100' : 'text-slate-500'}`}>
                  per {cycleLabel}
                </p>
                {selectedCycle === 'Yearly' && (
                  <p className={`mt-2 text-xs font-semibold ${plan.isPopular ? 'text-emerald-200' : 'text-emerald-700'}`}>
                    Save {discountPercent}% compared with monthly billing
                  </p>
                )}
                <p className={`mt-5 text-sm leading-7 ${plan.isPopular ? 'text-slate-200' : 'text-slate-600'}`}>
                  {plan.description}
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  <span className={`rounded-full px-3 py-1 text-xs font-semibold ${plan.isPopular ? 'bg-white/10 text-white' : 'bg-blue-50 text-blue-700'}`}>
                    {typeof plan.maxUsers === 'number' ? `${plan.maxUsers} users` : plan.maxUsers}
                  </span>
                  <span className={`rounded-full px-3 py-1 text-xs font-semibold ${plan.isPopular ? 'bg-white/10 text-white' : 'bg-slate-100 text-slate-700'}`}>
                    {typeof plan.maxModules === 'number' ? `${plan.maxModules} modules` : `${plan.maxModules} modules`}
                  </span>
                </div>

                <ul className={`mt-8 space-y-3 text-sm ${plan.isPopular ? 'text-slate-100' : 'text-slate-700'}`}>
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <span className={`mt-0.5 rounded-full p-1 ${plan.isPopular ? 'bg-white/10 text-white' : 'bg-blue-50 text-blue-700'}`}>
                        <Check size={12} />
                      </span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  to="/demo"
                  className={`mt-8 inline-flex w-full items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition ${
                    plan.isPopular
                      ? 'bg-white text-blue-700 hover:bg-blue-50'
                      : 'bg-[var(--primary)] text-white hover:bg-[var(--primary-hover)]'
                  }`}
                >
                  Start Free Trial
                </Link>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
