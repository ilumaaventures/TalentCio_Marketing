import React from 'react';
import { BriefcaseBusiness, ChevronLeft, ChevronRight, SearchX } from 'lucide-react';
import useJobs from '../hooks/useJobs';
import JobCard from '../components/JobCard';
import JobFilters from '../components/JobFilters';

function JobCardSkeleton() {
  return (
    <div className="surface-card animate-pulse p-6">
      <div className="h-12 w-12 rounded-2xl bg-slate-200" />
      <div className="mt-5 h-6 w-3/4 rounded-full bg-slate-200" />
      <div className="mt-3 h-4 w-1/2 rounded-full bg-slate-200" />
      <div className="mt-6 h-20 rounded-3xl bg-slate-100" />
      <div className="mt-5 h-11 rounded-full bg-slate-200" />
    </div>
  );
}

export default function Jobs() {
  const { jobs, loading, error, page, setPage, total, totalPages, filters, updateFilters, resetFilters } = useJobs();

  return (
    <main className="bg-[var(--surface)] pb-20 pt-28">
      <section className="container-shell">
        <div className="surface-card overflow-hidden">
          <div className="grid gap-8 lg:grid-cols-[300px_minmax(0,1fr)]">
            <aside className="border-b border-slate-200 bg-white px-5 py-6 lg:border-b-0 lg:border-r lg:px-6">
              <JobFilters filters={filters} onChange={updateFilters} onReset={resetFilters} />
            </aside>

            <div className="px-5 py-6 sm:px-8 sm:py-8">
              <div className="flex flex-col gap-4 border-b border-slate-200 pb-6 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <span className="section-kicker">Careers</span>
                  <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                    Open Positions
                  </h1>
                  <p className="mt-3 max-w-2xl text-base text-slate-600">
                    Explore public openings across companies using TalentCIO. Filter by role type,
                    location, and department to find the right fit.
                  </p>
                </div>

                <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">
                  <BriefcaseBusiness size={16} />
                  {total} roles live
                </div>
              </div>

              {error && (
                <div className="mt-6 rounded-3xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700">
                  {error}
                </div>
              )}

              {loading ? (
                <div className="mt-8 grid gap-6 md:grid-cols-2">
                  {Array.from({ length: 6 }).map((_, index) => (
                    <JobCardSkeleton key={index} />
                  ))}
                </div>
              ) : jobs.length ? (
                <>
                  <div className="mt-8 grid gap-6 md:grid-cols-2">
                    {jobs.map((job) => (
                      <JobCard key={job._id} job={job} />
                    ))}
                  </div>

                  <div className="mt-10 flex flex-col items-center justify-between gap-4 rounded-3xl border border-slate-200 bg-slate-50 px-5 py-4 sm:flex-row">
                    <p className="text-sm text-slate-600">
                      Page {page} of {Math.max(totalPages, 1)}
                    </p>
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => setPage((current) => Math.max(current - 1, 1))}
                        disabled={page <= 1}
                        className="btn-secondary disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <ChevronLeft size={16} />
                        Previous
                      </button>
                      <button
                        type="button"
                        onClick={() => setPage((current) => Math.min(current + 1, totalPages))}
                        disabled={page >= totalPages}
                        className="btn-primary disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        Next
                        <ChevronRight size={16} />
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="mt-10 flex flex-col items-center rounded-[32px] border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                    <SearchX size={34} />
                  </div>
                  <h2 className="mt-6 text-2xl font-bold text-slate-900">No open positions right now</h2>
                  <p className="mt-3 max-w-md text-sm leading-6 text-slate-600">
                    Check back soon for new opportunities, or clear the active filters to browse every
                    current listing.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
