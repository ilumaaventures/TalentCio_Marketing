import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Flame } from 'lucide-react';
import { Link } from 'react-router-dom';
import api from '../api/axios';

const fallbackPlans = [
  {
    name: 'Starter',
    description: 'Built for small teams getting out of spreadsheets.',
    price: 2999,
    billingCycle: 'Monthly',
    maxUsers: 25,
    maxModules: 4,
    features: ['Attendance and leaves', 'Basic approvals', 'Employee profiles', 'Standard support'],
    includedModules: ['attendance', 'leaves', 'userManagement', 'employeeDossier'],
    trialDays: 14,
    isPopular: false
  },
  {
    name: 'Growth',
    description: 'For scaling teams managing both HR operations and hiring.',
    price: 6999,
    billingCycle: 'Monthly',
    maxUsers: 100,
    maxModules: 8,
    features: ['Everything in Starter', 'Talent acquisition', 'Onboarding workflows', 'Help desk and meetings'],
    includedModules: ['attendance', 'leaves', 'talentAcquisition', 'onboarding', 'helpdesk', 'meetingsOfMinutes', 'userManagement', 'timesheet'],
    trialDays: 21,
    isPopular: true
  },
  {
    name: 'Enterprise',
    description: 'Designed for multi-function teams that need the full suite.',
    price: null,
    billingCycle: 'Monthly',
    maxUsers: 9999,
    maxModules: 999,
    features: ['Unlimited users', 'All modules', 'Advanced onboarding', 'Priority support'],
    includedModules: ['attendance', 'leaves', 'talentAcquisition', 'projectManagement', 'helpdesk', 'meetingsOfMinutes', 'onboarding', 'timesheet', 'employeeDossier', 'userManagement'],
    trialDays: 30,
    isPopular: false
  }
];

const formatPlanPrice = (price) => {
  if (price === null || price === undefined) {
    return 'Custom';
  }

  return `Rs. ${Number(price).toLocaleString('en-IN')}`;
};

const groupPlansByName = (plans) =>
  plans.reduce((accumulator, plan) => {
    const key = plan.name?.trim().toLowerCase() || `plan-${accumulator.length}`;
    accumulator[key] = accumulator[key] || [];
    accumulator[key].push(plan);
    return accumulator;
  }, {});

function getDisplayPlans(plans, selectedCycle) {
  const groupedPlans = groupPlansByName(plans);

  return Object.values(groupedPlans)
    .map((group) => {
      const exact = group.find((plan) => plan.billingCycle === selectedCycle);
      if (exact) {
        return {
          ...exact,
          displayCycle: exact.billingCycle,
          displayPrice: exact.price,
          derivedYearly: false
        };
      }

      const monthlyPlan = group.find((plan) => plan.billingCycle === 'Monthly') || group[0];

      if (selectedCycle === 'Yearly' && monthlyPlan) {
        return {
          ...monthlyPlan,
          displayCycle: 'Yearly',
          displayPrice: monthlyPlan.price === null ? null : Math.round(monthlyPlan.price * 12 * 0.8),
          derivedYearly: monthlyPlan.price !== null
        };
      }

      return {
        ...monthlyPlan,
        displayCycle: monthlyPlan.billingCycle || 'Monthly',
        displayPrice: monthlyPlan.price,
        derivedYearly: false
      };
    })
    .sort((left, right) => {
      const leftPrice = left.displayPrice === null ? Number.MAX_SAFE_INTEGER : left.displayPrice;
      const rightPrice = right.displayPrice === null ? Number.MAX_SAFE_INTEGER : right.displayPrice;
      return leftPrice - rightPrice;
    });
}

function PricingSkeleton() {
  return (
    <div className="surface-card animate-pulse p-6">
      <div className="h-5 w-28 rounded-full bg-slate-200" />
      <div className="mt-5 h-8 w-1/2 rounded-full bg-slate-200" />
      <div className="mt-4 h-4 w-2/3 rounded-full bg-slate-100" />
      <div className="mt-8 space-y-3">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="h-4 rounded-full bg-slate-100" />
        ))}
      </div>
      <div className="mt-8 h-11 rounded-full bg-slate-200" />
    </div>
  );
}

export default function PricingSection() {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCycle, setSelectedCycle] = useState('Monthly');

  useEffect(() => {
    let ignore = false;

    const fetchPlans = async () => {
      try {
        const response = await api.get('/public/plans');
        if (!ignore) {
          setPlans(response.data.plans || []);
        }
      } catch (error) {
        if (!ignore) {
          setPlans([]);
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    };

    fetchPlans();

    return () => {
      ignore = true;
    };
  }, []);

  const activePlans = getDisplayPlans(plans.length ? plans : fallbackPlans, selectedCycle);

  return (
    <section id="pricing" className="section-shell bg-[var(--surface)]">
      <div className="container-shell">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <span className="section-kicker">Pricing</span>
            <h2 className="section-title">Flexible plans that grow with your workforce</h2>
            <p className="section-copy">
              Pull pricing from your live TalentCIO plans, while keeping a polished fallback experience for
              first-time visitors and early deployments.
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
                  <span className={`ml-2 rounded-full px-2 py-0.5 text-[11px] font-bold ${selectedCycle === cycle ? 'bg-white/15 text-white' : 'bg-orange-50 text-orange-700'}`}>
                    20% off
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-12 grid gap-6 xl:grid-cols-3">
          {loading
            ? Array.from({ length: 3 }).map((_, index) => <PricingSkeleton key={index} />)
            : activePlans.map((plan, index) => (
                <motion.article
                  key={`${plan.name}-${plan.displayCycle}`}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.35, delay: index * 0.06 }}
                  className={`surface-card relative p-6 ${plan.isPopular ? 'border-2 border-blue-500 bg-blue-950 text-white' : ''}`}
                >
                  {plan.isPopular && (
                    <div className="absolute right-6 top-6 inline-flex items-center gap-2 rounded-full bg-orange-400 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-slate-950">
                      <Flame size={14} />
                      Most Popular
                    </div>
                  )}

                  <p className={`text-sm font-semibold uppercase tracking-[0.22em] ${plan.isPopular ? 'text-blue-100' : 'text-slate-500'}`}>
                    {plan.name}
                  </p>
                  <h3 className={`mt-5 text-4xl font-bold ${plan.isPopular ? 'text-white' : 'text-slate-950'}`}>
                    {formatPlanPrice(plan.displayPrice)}
                  </h3>
                  <p className={`mt-2 text-sm ${plan.isPopular ? 'text-blue-100' : 'text-slate-500'}`}>
                    per {plan.displayCycle === 'Yearly' ? 'year' : 'month'}
                  </p>
                  <p className={`mt-5 text-sm leading-7 ${plan.isPopular ? 'text-slate-200' : 'text-slate-600'}`}>
                    {plan.description}
                  </p>

                  <div className="mt-6 flex flex-wrap gap-2">
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${plan.isPopular ? 'bg-white/10 text-white' : 'bg-blue-50 text-blue-700'}`}>
                      {plan.maxUsers >= 9999 ? 'Unlimited users' : `${plan.maxUsers} users`}
                    </span>
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${plan.isPopular ? 'bg-white/10 text-white' : 'bg-slate-100 text-slate-700'}`}>
                      {plan.maxModules >= 999 ? 'All modules' : `${plan.maxModules} modules`}
                    </span>
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${plan.isPopular ? 'bg-orange-400 text-slate-950' : 'bg-orange-50 text-orange-700'}`}>
                      {plan.trialDays || 14}-day trial
                    </span>
                  </div>

                  {plan.derivedYearly && (
                    <p className={`mt-4 text-xs font-semibold ${plan.isPopular ? 'text-blue-100' : 'text-slate-500'}`}>
                      Yearly view derived from monthly pricing with a 20% discount.
                    </p>
                  )}

                  <ul className={`mt-8 space-y-3 text-sm ${plan.isPopular ? 'text-slate-100' : 'text-slate-700'}`}>
                    {(plan.features?.length ? plan.features : plan.includedModules || []).map((feature) => (
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
              ))}
        </div>
      </div>
    </section>
  );
}
