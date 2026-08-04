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
    <section id="pricing" className="section-shell section-divider bg-white">
      <div className="container-shell">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <span className="section-kicker">Pricing</span>
            <h2 className="section-title">Flexible plans that grow with your workforce</h2>
            <p className="section-copy">
              Choose a plan based on team size, workflow scope, and the modules you want to activate first.
              Use yearly billing for a lower effective monthly cost and request a guided demo if you need
              help mapping the right rollout path.
            </p>
          </div>

          <div className="inline-flex rounded-full border border-black/[0.08] bg-[#f5f2ef]/80 p-1 shadow-sm">
            {['Monthly', 'Yearly'].map((cycle) => (
              <button
                key={cycle}
                type="button"
                onClick={() => setSelectedCycle(cycle)}
                className={`rounded-full px-5 py-2 font-['Nunito_Sans'] text-sm font-semibold transition-all duration-200 ${
                  selectedCycle === cycle
                    ? 'bg-[#ea7c00] text-white shadow-sm'
                    : 'text-[#444444] hover:text-[#ea7c00]'
                }`}
              >
                {cycle}
                {cycle === 'Yearly' && (
                  <span className={`ml-2 rounded-full px-2 py-0.5 text-[10px] font-bold ${
                    selectedCycle === cycle ? 'bg-white/20 text-white' : 'bg-[#ea7c00]/10 text-[#ea7c00]'
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
                initial={{ opacity: 0, y: 35, scale: plan.isPopular ? 0.94 : 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ type: 'spring', stiffness: 200, damping: 16, delay: index * 0.12 }}
                whileHover={{ y: plan.isPopular ? -10 : -7, scale: plan.isPopular ? 1.02 : 1.01 }}
                className={`relative flex flex-col justify-between rounded-[20px] p-7 transition-all duration-300 ${
                  plan.isPopular
                    ? 'border-2 border-[#ea7c00] bg-[#060606] text-white shadow-[0_15px_35px_rgba(234,124,0,0.2)]'
                    : 'border border-black/[0.06] bg-white text-[#282828] shadow-[0_5px_15px_rgba(0,0,0,0.04)] hover:border-[#ea7c00]/30 hover:shadow-[0_15px_30px_rgba(0,0,0,0.08)]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className={`inline-block rounded-full px-3 py-1 font-['Nunito_Sans'] text-[10px] font-bold uppercase tracking-[0.18em] ${
                      plan.isPopular ? 'bg-[#ea7c00] text-white' : 'bg-[#ea7c00]/10 text-[#ea7c00]'
                    }`}>
                      {plan.isPopular ? 'Most Popular' : 'Platform Plan'}
                    </span>
                    <p className={`font-['Nunito_Sans'] text-xs font-bold uppercase tracking-[0.2em] ${plan.isPopular ? 'text-white/70' : 'text-[#6c757d]'}`}>
                      {plan.name}
                    </p>
                  </div>

                  <h3 className={`mt-5 font-['Nunito_Sans'] text-3xl font-extrabold sm:text-4xl ${plan.isPopular ? 'text-white' : 'text-[#282828]'}`}>
                    {formatPlanPrice(displayPrice)}
                  </h3>
                  <p className={`mt-1 font-['Nunito_Sans'] text-xs font-medium ${plan.isPopular ? 'text-white/70' : 'text-[#6c757d]'}`}>
                    per {cycleLabel}
                  </p>
                  {selectedCycle === 'Yearly' && (
                    <p className={`mt-2 font-['Nunito_Sans'] text-xs font-semibold ${plan.isPopular ? 'text-emerald-300' : 'text-emerald-600'}`}>
                      Save {discountPercent}% compared with monthly billing
                    </p>
                  )}
                  <p className={`mt-4 font-['Nunito_Sans'] text-sm leading-relaxed ${plan.isPopular ? 'text-white/80' : 'text-[#444444]'}`}>
                    {plan.description}
                  </p>

                  <div className="mt-6 flex flex-wrap gap-2">
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${plan.isPopular ? 'bg-white/10 text-white' : 'bg-[#f5f2ef] text-[#444444]'}`}>
                      {typeof plan.maxUsers === 'number' ? `${plan.maxUsers} users` : plan.maxUsers}
                    </span>
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${plan.isPopular ? 'bg-white/10 text-white' : 'bg-[#f5f2ef] text-[#444444]'}`}>
                      {typeof plan.maxModules === 'number' ? `${plan.maxModules} modules` : `${plan.maxModules} modules`}
                    </span>
                  </div>

                  <ul className={`mt-7 space-y-3 font-['Nunito_Sans'] text-sm ${plan.isPopular ? 'text-white/90' : 'text-[#444444]'}`}>
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <span className={`mt-0.5 rounded-full p-1 ${plan.isPopular ? 'bg-[#ea7c00] text-white' : 'bg-[#ea7c00]/10 text-[#ea7c00]'}`}>
                          <Check size={12} />
                        </span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  to="/demo"
                  className={`mt-8 inline-flex w-full items-center justify-center rounded-full px-6 py-3.5 font-['Nunito_Sans'] text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
                    plan.isPopular
                      ? 'bg-[#ea7c00] text-white shadow-md hover:bg-[#d47000]'
                      : 'border border-[#ea7c00] bg-transparent text-[#ea7c00] hover:bg-[#ea7c00] hover:text-white'
                  }`}
                >
                  Request Demo
                </Link>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

