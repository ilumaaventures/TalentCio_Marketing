import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { AlertCircle, ArrowRight, Building2, CalendarRange, Clock3, Layers3, MapPin, Users2 } from 'lucide-react';
import api from '../api/axios';
import applicantApi from '../api/applicantApi';
import ApplicationModal from '../components/ApplicationModal';
import { useApplicantAuth } from '../context/ApplicantAuthContext';

const currencySymbols = {
  INR: 'Rs.',
  USD: '$',
  EUR: 'EUR'
};

const formatCurrency = (value, currency = 'INR') => {
  if (value === null || value === undefined || Number.isNaN(Number(value))) {
    return '';
  }

  return `${currencySymbols[currency] || currency} ${Number(value).toLocaleString('en-IN')}`;
};

function SkillChips({ title, items, tone = 'blue' }) {
  const toneClasses = {
    blue: 'border-blue-200 bg-blue-50 text-blue-700',
    slate: 'border-slate-200 bg-slate-100 text-slate-700'
  };

  return (
    <div>
      <h3 className="text-sm font-semibold text-slate-900">{title}</h3>
      <div className="mt-3 flex flex-wrap gap-2">
        {items?.length ? (
          items.map((item) => (
            <span key={item} className={`rounded-full border px-3 py-1 text-sm font-medium ${toneClasses[tone]}`}>
              {item}
            </span>
          ))
        ) : (
          <span className="text-sm text-slate-500">Not specified</span>
        )}
      </div>
    </div>
  );
}

export default function JobDetail() {
  const { id } = useParams();
  const { isLoggedIn, profileCompletion } = useApplicantAuth();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [alreadyApplied, setAlreadyApplied] = useState(false);

  useEffect(() => {
    let isActive = true;

    const fetchJob = async () => {
      try {
        setLoading(true);
        setError('');
        const response = await api.get(`/public/jobs/${id}`);

        if (!isActive) {
          return;
        }

        setJob(response.data.job);
      } catch (fetchError) {
        if (!isActive) {
          return;
        }

        setError(fetchError.response?.data?.message || 'This position is no longer available or has been filled.');
      } finally {
        if (isActive) {
          setLoading(false);
        }
      }
    };

    fetchJob();

    return () => {
      isActive = false;
    };
  }, [id]);

  useEffect(() => {
    let ignore = false;

    if (!isLoggedIn || !job?._id) {
      setAlreadyApplied(false);
      return undefined;
    }

    applicantApi.get('/my-applications')
      .then((response) => {
        if (!ignore) {
          const hasApplied = (response.data.applications || []).some(
            (application) => application.hiringRequestId?._id === job._id
          );
          setAlreadyApplied(hasApplied);
        }
      })
      .catch(() => {
        if (!ignore) {
          setAlreadyApplied(false);
        }
      });

    return () => {
      ignore = true;
    };
  }, [isLoggedIn, job?._id]);

  if (loading) {
    return (
      <main className="container-shell pt-28 pb-20">
        <div className="surface-card animate-pulse p-8">
          <div className="h-5 w-40 rounded-full bg-slate-200" />
          <div className="mt-6 h-12 w-2/3 rounded-2xl bg-slate-200" />
          <div className="mt-4 h-5 w-1/2 rounded-full bg-slate-200" />
          <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,2fr)_360px]">
            <div className="h-[480px] rounded-[28px] bg-slate-100" />
            <div className="h-[320px] rounded-[28px] bg-slate-100" />
          </div>
        </div>
      </main>
    );
  }

  if (error || !job) {
    return (
      <main className="container-shell pt-28 pb-20">
        <div className="surface-card px-6 py-14 text-center sm:px-10">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-red-50 text-red-600">
            <AlertCircle size={30} />
          </div>
          <h1 className="mt-6 text-3xl font-bold text-slate-950">This position is no longer available</h1>
          <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-slate-600">
            {error || 'The job may have been filled, unpublished, or removed from the public board.'}
          </p>
          <Link to="/jobs" className="btn-primary mt-8">
            Browse other roles
          </Link>
        </div>
      </main>
    );
  }

  const budget = job.hiringDetails?.budgetRange || {};
  const salaryLabel =
    budget.isOpen
      ? 'Open'
      : budget.min || budget.max
      ? `${formatCurrency(budget.min, budget.currency)}${budget.min && budget.max ? ' - ' : ''}${formatCurrency(budget.max, budget.currency)}`
      : 'Compensation shared during the process';

  const company = job.companyId || {};
  const companyLabel = job.client || company.name || 'Hiring Partner';
  const reportingManager = job.roleDetails?.reportingManager;
  const jobDescription = job.publicJobDescription || job.jobDescription;

  return (
    <main className="bg-[var(--surface)] pb-20 pt-28">
      <section className="container-shell">
        <div className="surface-card overflow-hidden px-5 py-6 sm:px-8 sm:py-8">
          <nav className="text-sm text-slate-500">
            <Link to="/" className="hover:text-blue-700">Home</Link>
            <span className="mx-2">/</span>
            <Link to="/jobs" className="hover:text-blue-700">Jobs</Link>
            <span className="mx-2">/</span>
            <span className="text-slate-800">{job.roleDetails?.title}</span>
          </nav>

          <div className="mt-6 flex flex-col gap-5 border-b border-slate-200 pb-5">
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-blue-50 px-3 py-1 text-sm font-semibold text-blue-700">
                {job.requirements?.location || 'Flexible'}
              </span>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-700">
                {job.roleDetails?.employmentType || 'Role'}
              </span>
              <span className="rounded-full bg-orange-50 px-3 py-1 text-sm font-semibold text-orange-700">
                {job.hiringDetails?.priority || 'Medium'} priority
              </span>
            </div>

            <div>
              <h1 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-5xl">
                {job.roleDetails?.title}
              </h1>
              <div className="mt-5 flex flex-wrap items-center gap-4 text-sm text-slate-600">
                <span className="inline-flex items-center gap-2">
                  <Building2 size={16} />
                  {companyLabel}
                </span>
                <span className="inline-flex items-center gap-2">
                  <MapPin size={16} />
                  {job.requirements?.location || 'Flexible'}
                </span>
                <span className="inline-flex items-center gap-2">
                  <Layers3 size={16} />
                  {job.roleDetails?.department}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-5 grid gap-8 lg:grid-cols-[minmax(0,2fr)_360px]">
            <div className="space-y-8">
              <section className="rounded-[28px] border border-slate-200 bg-white p-6">
                <h2 className="text-2xl font-bold text-slate-950">About This Role</h2>
                <div className="mt-4 grid gap-4 text-sm text-slate-600 sm:grid-cols-2">
                  <div className="rounded-2xl bg-slate-50 p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Purpose</p>
                    <p className="mt-2 text-sm text-slate-700">{job.purpose || 'Growth-driven hiring'}</p>
                  </div>
                  <div className="rounded-2xl bg-slate-50 p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Reporting Manager</p>
                    <p className="mt-2 text-sm text-slate-700">
                      {reportingManager ? `${reportingManager.firstName || ''} ${reportingManager.lastName || ''}`.trim() : 'Shared during interviews'}
                    </p>
                  </div>
                </div>
                <p className="mt-5 whitespace-pre-wrap text-base leading-7 text-slate-600">
                  {jobDescription ||
                    `Join ${companyLabel || 'our client'} as part of the ${job.roleDetails?.department} team and help build reliable, scalable people operations.`}
                </p>
              </section>

              <section className="rounded-[28px] border border-slate-200 bg-white p-6">
                <h2 className="text-2xl font-bold text-slate-950">Requirements</h2>
                <div className="mt-6 space-y-6">
                  <SkillChips title="Must-have technical skills" items={job.requirements?.mustHaveSkills?.technical} />
                  <SkillChips title="Must-have soft skills" items={job.requirements?.mustHaveSkills?.softSkills} />
                  <SkillChips title="Nice-to-have skills" items={job.requirements?.niceToHaveSkills} tone="slate" />
                </div>

                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl bg-slate-50 p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Experience</p>
                    <p className="mt-2 text-sm text-slate-700">
                      {job.requirements?.experienceMin ?? 0} - {job.requirements?.experienceMax ?? 0} years
                    </p>
                  </div>
                  <div className="rounded-2xl bg-slate-50 p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Shift</p>
                    <p className="mt-2 text-sm text-slate-700">{job.requirements?.shift || 'Standard business hours'}</p>
                  </div>
                </div>
              </section>

              <section className="rounded-[28px] border border-slate-200 bg-white p-6">
                <h2 className="text-2xl font-bold text-slate-950">Compensation</h2>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl bg-slate-50 p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Budget Range</p>
                    <p className="mt-2 text-sm text-slate-700">{salaryLabel}</p>
                  </div>
                  <div className="rounded-2xl bg-slate-50 p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Open Positions</p>
                    <p className="mt-2 text-sm text-slate-700">{job.hiringDetails?.openPositions || 1}</p>
                  </div>
                  <div className="rounded-2xl bg-slate-50 p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Expected Joining Date</p>
                    <p className="mt-2 text-sm text-slate-700">
                      {job.hiringDetails?.expectedJoiningDate
                        ? new Date(job.hiringDetails.expectedJoiningDate).toLocaleDateString('en-IN', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric'
                          })
                        : 'To be discussed'}
                    </p>
                  </div>
                  <div className="rounded-2xl bg-slate-50 p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Company</p>
                    <p className="mt-2 text-sm text-slate-700">
                      {company.industry || 'HR technology'}{company.country ? `, ${company.country}` : ''}
                    </p>
                  </div>
                </div>
              </section>

              <section className="rounded-[28px] border border-slate-200 bg-white p-6">
                <h2 className="text-2xl font-bold text-slate-950">How to Apply</h2>
                <p className="mt-4 text-base leading-7 text-slate-600">
                  Submit your profile with an up-to-date resume and any helpful context in the cover note.
                  Our team reviews public applications directly inside TalentCIO and reaches out to shortlisted
                  candidates with next steps.
                </p>
              </section>
            </div>

            <aside className="space-y-4 lg:sticky lg:top-24 lg:h-fit">
              <div className="surface-card border-blue-100 bg-gradient-to-br from-blue-50 to-white p-6">
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-blue-700">Apply Now</p>
                <h2 className="mt-3 text-2xl font-bold text-slate-950">{job.roleDetails?.title}</h2>
                <div className="mt-5 space-y-3 text-sm text-slate-600">
                  <p>{companyLabel}</p>
                  <p>{job.requirements?.location || 'Flexible'}</p>
                  <p>{job.roleDetails?.employmentType || 'Role'}</p>
                </div>
                <button type="button" onClick={() => setIsModalOpen(true)} className="btn-primary mt-8 w-full">
                  {alreadyApplied ? 'View Application Status' : isLoggedIn ? 'Apply Now' : 'Sign in to apply in 30 seconds'}
                  <ArrowRight size={16} />
                </button>
                {isLoggedIn && profileCompletion && profileCompletion.score < 60 ? (
                  <p className="mt-3 text-xs font-medium text-amber-700">
                    Complete your profile to speed up future applications.
                  </p>
                ) : null}
              </div>

              <div className="rounded-[28px] border border-slate-200 bg-white p-6">
                <h3 className="text-lg font-bold text-slate-950">Role Snapshot</h3>
                <div className="mt-5 space-y-4 text-sm text-slate-600">
                  <div className="flex items-center gap-3">
                    <MapPin size={16} className="text-blue-600" />
                    {job.requirements?.location || 'Flexible'}
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock3 size={16} className="text-blue-600" />
                    {job.roleDetails?.employmentType}
                  </div>
                  <div className="flex items-center gap-3">
                    <Users2 size={16} className="text-blue-600" />
                    {job.hiringDetails?.openPositions || 1} positions open
                  </div>
                  <div className="flex items-center gap-3">
                    <CalendarRange size={16} className="text-blue-600" />
                    Posted {new Date(job.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <ApplicationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        jobId={job._id}
        jobTitle={job.roleDetails?.title}
        companyName={companyLabel}
        alreadyApplied={alreadyApplied}
        onApplied={() => setAlreadyApplied(true)}
      />
    </main>
  );
}
