import React from 'react';
import { Clock3, Layers3, MapPin, Users2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const locationTone = {
  Remote: 'bg-emerald-50 text-emerald-700',
  Hybrid: 'bg-orange-50 text-orange-700',
  Onsite: 'bg-blue-50 text-blue-700'
};

const currencySymbols = {
  INR: 'Rs.',
  USD: '$',
  EUR: 'EUR'
};

const getInitials = (name = '') =>
  name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('') || 'TC';

const getRelativeDate = (value) => {
  const date = new Date(value);
  const differenceInMs = Date.now() - date.getTime();
  const days = Math.max(Math.floor(differenceInMs / (1000 * 60 * 60 * 24)), 0);

  if (days === 0) {
    return 'Today';
  }

  if (days === 1) {
    return '1 day ago';
  }

  if (days < 30) {
    return `${days} days ago`;
  }

  const months = Math.floor(days / 30);
  return `${months} month${months > 1 ? 's' : ''} ago`;
};

const formatSalary = (budget = {}) => {
  if (budget.isOpen) {
    return 'Compensation: Open';
  }

  if (!budget.min && !budget.max) {
    return 'Compensation shared during process';
  }

  const currency = currencySymbols[budget.currency] || budget.currency || 'Rs.';
  const min = budget.min ? `${currency} ${Number(budget.min).toLocaleString('en-IN')}` : '';
  const max = budget.max ? `${currency} ${Number(budget.max).toLocaleString('en-IN')}` : '';
  return `${min}${min && max ? ' - ' : ''}${max}`;
};

export default function JobCard({ job }) {
  const navigate = useNavigate();
  const company = job.companyId || {};
  const companyLabel = job.client || company.name || 'Hiring Partner';
  const logo = company.settings?.logo;
  const location = job.requirements?.location || 'Flexible';
  const department = job.roleDetails?.department || 'General';
  const title = job.roleDetails?.title || 'Open Role';

  const handleOpen = () => navigate(`/jobs/${job._id}`);

  return (
    <article
      className="surface-card relative cursor-pointer border-slate-200 p-5 transition hover:border-blue-200 hover:shadow-[0_30px_80px_-55px_rgba(17,92,185,0.55)]"
      onClick={handleOpen}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          handleOpen();
        }
      }}
      role="link"
      tabIndex={0}
    >
      <div className="absolute right-5 top-5 rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
        View & Apply
      </div>

      <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <div className="flex min-w-0 flex-1 items-start gap-4">
          {logo ? (
            <img src={logo} alt={companyLabel} className="h-14 w-14 rounded-2xl object-cover" />
          ) : (
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-blue-50 font-['Sora'] text-sm font-bold text-blue-700">
              {getInitials(companyLabel)}
            </div>
          )}

          <div className="min-w-0 flex-1">
            <div className="min-w-0 pr-28 sm:pr-32">
              <h2 className="truncate text-lg font-bold text-slate-950">{title}</h2>
              <p className="mt-1 text-xs font-medium text-slate-600 sm:text-sm">{companyLabel}</p>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <span className={`rounded-full px-3 py-1 text-[11px] font-semibold ${locationTone[location] || 'bg-slate-100 text-slate-700'}`}>
                {location}
              </span>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-[11px] font-semibold text-slate-700">
                {job.roleDetails?.employmentType || 'Role'}
              </span>
              <span className="rounded-full bg-white px-3 py-1 text-[11px] font-semibold text-slate-700 ring-1 ring-slate-200">
                {department}
              </span>
            </div>

            <div className="mt-4 flex flex-wrap gap-x-5 gap-y-3 text-xs text-slate-600 sm:text-sm">
              <div className="flex items-center gap-2">
                <Layers3 size={16} className="text-blue-600" />
                {department}
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={16} className="text-blue-600" />
                {location}
              </div>
              <div className="flex items-center gap-2">
                <Users2 size={16} className="text-blue-600" />
                {job.hiringDetails?.openPositions || 1} positions open
              </div>
              <div className="flex items-center gap-2">
                <Clock3 size={16} className="text-blue-600" />
                {getRelativeDate(job.createdAt)}
              </div>
            </div>
          </div>
        </div>

        <div className="w-full rounded-[24px] bg-slate-50 px-4 py-4 md:w-[280px] md:shrink-0">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Salary Range</p>
          <p className="mt-2 text-xs font-semibold text-slate-800 sm:text-sm">{formatSalary(job.hiringDetails?.budgetRange)}</p>
        </div>
      </div>
    </article>
  );
}
