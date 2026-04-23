import React, { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Briefcase, Clock, ExternalLink, LogOut, MapPin } from 'lucide-react';
import toast from 'react-hot-toast';
import applicantApi from '../api/applicantApi';
import { useApplicantAuth } from '../context/ApplicantAuthContext';
import ProfileCompletion from '../components/profile/ProfileCompletion';

const statusColor = (status) => {
  switch (status) {
    case 'Shortlisted':
      return 'border-sky-200 bg-sky-50 text-sky-700';
    case 'Rejected':
      return 'border-red-200 bg-red-50 text-red-700';
    case 'Transferred':
      return 'border-blue-200 bg-blue-50 text-blue-700';
    case 'Pending Review':
      return 'border-amber-200 bg-amber-50 text-amber-700';
    default:
      return 'border-slate-200 bg-slate-100 text-slate-600';
  }
};

const statusDescription = (status) => {
  switch (status) {
    case 'Pending Review':
      return 'Your application is in the review queue.';
    case 'Shortlisted':
      return 'The team has shortlisted your profile for the next step.';
    case 'Rejected':
      return 'Your profile was not selected for this role.';
    case 'Transferred':
      return 'Your profile has been moved into the active hiring pipeline.';
    default:
      return '';
  }
};

const formatDate = (value) => new Date(value).toLocaleDateString('en-IN', {
  day: 'numeric',
  month: 'short',
  year: 'numeric'
});

export default function MyApplications() {
  const navigate = useNavigate();
  const { applicant, logout, profileCompletion } = useApplicantAuth();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const completion = profileCompletion;

  useEffect(() => {
    let ignore = false;

    applicantApi.get('/my-applications')
      .then((response) => {
        if (ignore) {
          return;
        }

        setApplications(response.data.applications || []);
      })
      .catch(() => {
        if (!ignore) {
          toast.error('Failed to load your dashboard.');
        }
      })
      .finally(() => {
        if (!ignore) {
          setLoading(false);
        }
      });

    return () => {
      ignore = true;
    };
  }, []);

  const stats = useMemo(() => ([
    { label: 'Total Applied', value: applications.length, borderClass: 'border-b-blue-400' },
    { label: 'Pending Review', value: applications.filter((item) => item.reviewStatus === 'Pending Review').length, borderClass: 'border-b-amber-400' },
    { label: 'Shortlisted', value: applications.filter((item) => item.reviewStatus === 'Shortlisted').length, borderClass: 'border-b-sky-400' },
    { label: 'In Pipeline', value: applications.filter((item) => item.reviewStatus === 'Transferred').length, borderClass: 'border-b-emerald-400' }
  ]), [applications]);

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully.');
  };

  return (
    <main className="bg-[var(--surface)] pb-20 pt-28">
      <section className="container-shell">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <span className="section-kicker">My Dashboard</span>
            <h1 className="mt-3 text-3xl font-bold text-slate-950">Hello, {applicant?.firstName}</h1>
            <p className="mt-1 text-sm text-slate-500">{applicant?.email}</p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/profile"
              className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-4 py-2.5 text-sm font-semibold text-amber-700 transition hover:bg-amber-100"
            >
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-amber-400 text-[10px] font-bold text-white">
                {completion?.score || 0}%
              </span>
              Edit Profile
            </Link>
            <Link to="/jobs" className="btn-secondary">Browse Jobs</Link>
            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-2 rounded-full border border-red-200 bg-red-50 px-4 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-100"
            >
              <LogOut size={15} />
              Sign Out
            </button>
          </div>
        </div>

        {completion && completion.score < 80 && (
          <div className="mb-6">
            <ProfileCompletion
              completion={completion}
              onSectionClick={(section) => navigate(`/profile#${section}`)}
            />
          </div>
        )}

        <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {stats.map((item) => (
            <div key={item.label} className={`surface-card border-b-4 ${item.borderClass} p-5`}>
              <span className="block text-3xl font-light text-slate-800">{item.value}</span>
              <span className="mt-1 block text-xs font-bold uppercase tracking-widest text-slate-400">{item.label}</span>
            </div>
          ))}
        </div>

        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((item) => (
              <div key={item} className="surface-card animate-pulse p-6">
                <div className="h-5 w-1/3 rounded-full bg-slate-200" />
                <div className="mt-3 h-4 w-1/4 rounded-full bg-slate-200" />
                <div className="mt-4 h-10 rounded-2xl bg-slate-100" />
              </div>
            ))}
          </div>
        ) : applications.length === 0 ? (
          <div className="surface-card px-6 py-16 text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-blue-50 text-blue-400">
              <Briefcase size={34} />
            </div>
            <h2 className="mt-6 text-xl font-bold text-slate-800">No applications yet</h2>
            <p className="mt-2 text-sm text-slate-500">Start applying to open positions and you will see them here.</p>
            <Link to="/jobs" className="btn-primary mt-6">Browse Open Jobs</Link>
          </div>
        ) : (
          <div className="space-y-4">
            {applications.map((application) => {
              const job = application.hiringRequestId;
              const company = job?.companyId;

              return (
                <div key={application._id} className="surface-card p-6 transition hover:border-blue-200">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-50 font-['Sora'] text-sm font-bold text-blue-700">
                        {company?.name?.charAt(0)?.toUpperCase() || 'TC'}
                      </div>

                      <div>
                        <h3 className="text-base font-bold text-slate-950">
                          {job?.roleDetails?.title || 'Position'}
                        </h3>
                        <p className="mt-0.5 text-sm text-slate-500">{company?.name || job?.client || 'TalentCIO Company'}</p>
                        <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-slate-500">
                          <span className="inline-flex items-center gap-1">
                            <MapPin size={12} />
                            {job?.requirements?.location || 'Flexible'}
                          </span>
                          <span className="inline-flex items-center gap-1">
                            <Clock size={12} />
                            Applied {formatDate(application.createdAt)}
                          </span>
                          {job?.roleDetails?.employmentType && (
                            <span className="rounded-full bg-slate-100 px-2 py-0.5 font-medium">
                              {job.roleDetails.employmentType}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col items-start gap-3 sm:items-end">
                      <span className={`rounded-full border px-3 py-1 text-xs font-bold ${statusColor(application.reviewStatus)}`}>
                        {application.reviewStatus}
                      </span>
                      {job?._id && job?.isPublic && job?.status === 'Approved' && (
                        <Link
                          to={`/jobs/${job._id}`}
                          className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:underline"
                        >
                          View Job
                          <ExternalLink size={11} />
                        </Link>
                      )}
                    </div>
                  </div>

                  {statusDescription(application.reviewStatus) && (
                    <div className={`mt-4 rounded-2xl border px-4 py-3 text-sm ${statusColor(application.reviewStatus)}`}>
                      {statusDescription(application.reviewStatus)}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}
