import React, { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { CheckCircle, FileText, LockKeyhole, Paperclip, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import api from '../api/axios';
import applicantApi from '../api/applicantApi';
import { useApplicantAuth } from '../context/ApplicantAuthContext';
import { trackEvent } from '../lib/analytics';

const allowedExtensions = ['pdf', 'doc', 'docx'];
const normalizeEmail = (value) => value.trim().toLowerCase();

const initialForm = {
  candidateName: '',
  email: '',
  mobile: '',
  currentCTC: '',
  expectedCTC: '',
  noticePeriod: '',
  coverNote: '',
  resume: null
};

const buildInitialForm = (applicant) => ({
  ...initialForm,
  candidateName: applicant ? `${applicant.firstName || ''} ${applicant.lastName || ''}`.trim() : '',
  email: applicant?.email || '',
  mobile: applicant?.mobile || ''
});

export default function ApplicationModal({ isOpen, onClose, jobId, jobTitle, companyName, alreadyApplied = false, onApplied }) {
  const location = useLocation();
  const { applicant, token, isLoggedIn } = useApplicantAuth();
  const [form, setForm] = useState(() => buildInitialForm(applicant));
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [profileData, setProfileData] = useState(null);
  const [profileCompletion, setProfileCompletion] = useState(null);
  const [usingProfileResume, setUsingProfileResume] = useState(false);
  const authRedirectState = {
    from: `${location.pathname}${location.search}${location.hash}`
  };

  useEffect(() => {
    if (!isOpen) {
      setForm(buildInitialForm(applicant));
      setErrors({});
      setProfileData(null);
      setProfileCompletion(null);
      setUsingProfileResume(false);
      return;
    }

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [isOpen, onClose, applicant]);

  useEffect(() => {
    if (!isOpen || !token) {
      return;
    }

    let ignore = false;
    applicantApi.get('/profile')
      .then((response) => {
        if (ignore) {
          return;
        }

        setProfileData(response.data.applicant);
        setProfileCompletion(response.data.completion || null);
        if (response.data.applicant?.resumeUrl) {
          setUsingProfileResume(true);
        }
      })
      .catch(() => {
        if (!ignore) {
          setProfileData(null);
          setProfileCompletion(null);
        }
      });

    return () => {
      ignore = true;
    };
  }, [isOpen, token]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    if (profileData) {
      setForm({
        ...initialForm,
        candidateName: `${profileData.firstName || ''} ${profileData.lastName || ''}`.trim(),
        email: profileData.email || '',
        mobile: profileData.mobile || '',
        currentCTC: profileData.currentCTC?.toString?.() || '',
        expectedCTC: profileData.expectedCTC?.toString?.() || '',
        noticePeriod: profileData.noticePeriod?.toString?.() || '',
        coverNote: '',
        resume: null
      });
      return;
    }

    if (applicant) {
      setForm((current) => ({
        ...current,
        candidateName: `${applicant.firstName || ''} ${applicant.lastName || ''}`.trim(),
        email: applicant.email || '',
        mobile: applicant.mobile || ''
      }));
    }
  }, [isOpen, profileData, applicant]);

  const fileName = useMemo(() => form.resume?.name || '', [form.resume]);

  const validate = () => {
    const nextErrors = {};

    if (!form.candidateName.trim()) {
      nextErrors.candidateName = 'Full name is required.';
    }

    const normalizedEmail = normalizeEmail(form.email);

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
      nextErrors.email = 'Enter a valid email address.';
    }

    if (!/^[6-9]\d{9}$/.test(form.mobile.trim())) {
      nextErrors.mobile = 'Enter a valid 10-digit Indian mobile number.';
    }

    if (!usingProfileResume && !form.resume) {
      nextErrors.resume = 'Resume is required.';
    } else if (!usingProfileResume && form.resume) {
      const extension = form.resume.name.split('.').pop()?.toLowerCase();

      if (!allowedExtensions.includes(extension)) {
        nextErrors.resume = 'Resume must be a PDF, DOC, or DOCX file.';
      } else if (form.resume.size > 5 * 1024 * 1024) {
        nextErrors.resume = 'Resume must be smaller than 5MB.';
      }
    }

    if (form.coverNote.length > 500) {
      nextErrors.coverNote = 'Cover note cannot exceed 500 characters.';
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (alreadyApplied) {
      return;
    }

    if (!validate()) {
      return;
    }

    try {
      setSubmitting(true);

      const payload = new FormData();
      payload.append('candidateName', form.candidateName.trim());
      payload.append('email', normalizeEmail(form.email));
      payload.append('mobile', form.mobile.trim());
      if (form.currentCTC) payload.append('currentCTC', form.currentCTC);
      if (form.expectedCTC) payload.append('expectedCTC', form.expectedCTC);
      if (form.noticePeriod) payload.append('noticePeriod', form.noticePeriod);
      if (form.coverNote.trim()) payload.append('coverNote', form.coverNote.trim());
      if (usingProfileResume && profileData?.resumeUrl) {
        payload.append('useProfileResume', 'true');
        payload.append('profileResumeUrl', profileData.resumeUrl);
        payload.append('profileResumePublicId', profileData.resumePublicId || '');
      } else {
        payload.append('resume', form.resume);
      }

      await api.post(`/public/jobs/${jobId}/apply`, payload, {
        headers: { Authorization: `Bearer ${token}` }
      });

      toast.success("Application submitted! We'll be in touch.");
      onApplied?.();
      onClose();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to submit application');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/60 px-4 py-6 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="surface-card max-h-[92vh] w-full max-w-2xl overflow-y-auto bg-white"
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between border-b border-slate-200 px-6 py-5">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-blue-700">Apply Now</p>
                <h2 className="mt-2 text-2xl font-bold text-slate-950">{jobTitle}</h2>
                <p className="mt-1 text-sm text-slate-500">{companyName}</p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-200 text-slate-500 transition hover:border-slate-300 hover:text-slate-800"
              >
                <X size={18} />
              </button>
            </div>

            {!isLoggedIn ? (
              <div className="p-6">
                <div className="rounded-[28px] border border-blue-100 bg-gradient-to-br from-blue-50 via-white to-slate-50 p-6">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-[0_18px_45px_-24px_rgba(17,92,185,0.95)]">
                    <LockKeyhole size={24} />
                  </div>
                  <h3 className="mt-5 text-2xl font-bold text-slate-950">Sign in to apply</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    You can browse every public job on TalentCIO without logging in. To submit an application,
                    please sign in or create an applicant account so you can track your status later.
                  </p>

                  <div className="mt-6 flex flex-wrap items-center gap-3">
                    <Link
                      to="/applicant/login"
                      state={authRedirectState}
                      onClick={() => {
                        trackEvent('applicant_sign_in_click', { source: 'application_modal' });
                        onClose();
                      }}
                      className="btn-primary"
                    >
                      Sign In to Apply
                    </Link>
                    <Link
                      to="/applicant/register"
                      state={authRedirectState}
                      onClick={onClose}
                      className="btn-secondary"
                    >
                      Create Account
                    </Link>
                  </div>

                  <p className="mt-4 text-xs font-medium uppercase tracking-[0.18em] text-slate-400">
                    Public viewing stays open. Applying requires an applicant login.
                  </p>
                </div>

                <div className="mt-5 flex flex-wrap items-center gap-3">
                  <button type="button" onClick={onClose} className="btn-secondary">
                    Close
                  </button>
                </div>
              </div>
            ) : alreadyApplied ? (
              <div className="p-6">
                <div className="rounded-2xl border border-blue-100 bg-blue-50 px-4 py-4 text-sm font-semibold text-blue-700">
                  You have already applied for this position. Check{' '}
                  <Link to="/my-applications" className="underline" onClick={onClose}>
                    My Applications
                  </Link>{' '}
                  to review your current status.
                </div>

                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <Link to="/my-applications" onClick={onClose} className="btn-primary">
                    View My Applications
                  </Link>
                  <button type="button" onClick={onClose} className="btn-secondary">
                    Close
                  </button>
                </div>
              </div>
            ) : (
              <form className="p-6" onSubmit={handleSubmit}>
                {token ? (
                  <div className="mb-5 rounded-2xl border border-blue-100 bg-blue-50 px-4 py-3">
                    <div className="flex items-start gap-2 text-sm text-blue-700">
                      <CheckCircle size={15} className="mt-0.5 shrink-0" />
                      <span>
                        <strong>Pre-filled from your profile.</strong>{' '}
                        <Link to="/profile" target="_blank" className="underline hover:no-underline" onClick={onClose}>
                          Update profile
                        </Link>{' '}
                        if anything has changed.
                      </span>
                    </div>
                  </div>
                ) : null}

                {token && profileCompletion && profileCompletion.score < 60 ? (
                  <div className="mb-5 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
                    Your profile is {profileCompletion.score}% complete. Finish it to make future applications faster.
                  </div>
                ) : null}

                <div className="grid gap-5 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label className="label-shell">Full Name*</label>
                  <input
                    className={`input-shell ${errors.candidateName ? 'border-red-300 focus:border-red-400 focus:ring-red-100' : ''}`}
                    value={form.candidateName}
                    onChange={(event) => setForm((current) => ({ ...current, candidateName: event.target.value }))}
                    placeholder="Your full name"
                  />
                  {errors.candidateName && <p className="mt-2 text-sm text-red-600">{errors.candidateName}</p>}
                </div>

                <div>
                  <label className="label-shell">Email Address*</label>
                  <input
                    type="email"
                    className={`input-shell ${errors.email ? 'border-red-300 focus:border-red-400 focus:ring-red-100' : ''}`}
                    value={form.email}
                    onChange={(event) => setForm((current) => ({ ...current, email: event.target.value.toLowerCase() }))}
                    placeholder="name@example.com"
                  />
                  {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email}</p>}
                </div>

                <div>
                  <label className="label-shell">Phone Number*</label>
                  <input
                    type="tel"
                    className={`input-shell ${errors.mobile ? 'border-red-300 focus:border-red-400 focus:ring-red-100' : ''}`}
                    value={form.mobile}
                    onChange={(event) => setForm((current) => ({ ...current, mobile: event.target.value.replace(/\D/g, '').slice(0, 10) }))}
                    placeholder="10-digit mobile number"
                  />
                  {errors.mobile && <p className="mt-2 text-sm text-red-600">{errors.mobile}</p>}
                </div>

                <div>
                  <label className="label-shell">Current CTC (LPA)</label>
                  <input
                    type="number"
                    className="input-shell"
                    value={form.currentCTC}
                    onChange={(event) => setForm((current) => ({ ...current, currentCTC: event.target.value }))}
                    placeholder="e.g. 8.5"
                  />
                </div>

                <div>
                  <label className="label-shell">Expected CTC (LPA)</label>
                  <input
                    type="number"
                    className="input-shell"
                    value={form.expectedCTC}
                    onChange={(event) => setForm((current) => ({ ...current, expectedCTC: event.target.value }))}
                    placeholder="e.g. 11"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="label-shell">Notice Period (days)</label>
                  <input
                    type="number"
                    className="input-shell"
                    value={form.noticePeriod}
                    onChange={(event) => setForm((current) => ({ ...current, noticePeriod: event.target.value }))}
                    placeholder="e.g. 30"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="label-shell">Cover Note</label>
                  <textarea
                    rows={4}
                    className={`input-shell resize-none ${errors.coverNote ? 'border-red-300 focus:border-red-400 focus:ring-red-100' : ''}`}
                    value={form.coverNote}
                    onChange={(event) => setForm((current) => ({ ...current, coverNote: event.target.value.slice(0, 500) }))}
                    placeholder="Share any context that can help the hiring team understand your fit."
                  />
                  <div className="mt-2 flex items-center justify-between">
                    {errors.coverNote ? <p className="text-sm text-red-600">{errors.coverNote}</p> : <span />}
                    <p className="text-xs text-slate-500">{form.coverNote.length}/500</p>
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label className="label-shell">Resume*</label>
                  {usingProfileResume && profileData?.resumeUrl ? (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3">
                        <div className="flex items-center gap-2 text-sm font-semibold text-emerald-700">
                          <FileText size={15} />
                          Using your saved resume
                          {profileData.resumeFileName ? (
                            <span className="text-xs font-normal text-emerald-600">({profileData.resumeFileName})</span>
                          ) : null}
                        </div>
                        <button
                          type="button"
                          onClick={() => setUsingProfileResume(false)}
                          className="text-xs font-semibold text-slate-500 underline hover:text-slate-700"
                        >
                          Upload different
                        </button>
                      </div>
                      {profileData.resumeUpdatedAt ? (
                        <p className="px-1 text-xs text-slate-400">
                          Last updated {new Date(profileData.resumeUpdatedAt).toLocaleDateString('en-IN', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric'
                          })}
                        </p>
                      ) : null}
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <label className={`flex cursor-pointer items-center gap-3 rounded-[24px] border border-dashed px-4 py-4 transition ${errors.resume ? 'border-red-300 bg-red-50' : 'border-slate-300 bg-slate-50 hover:border-blue-300 hover:bg-blue-50'}`}>
                        <div className="rounded-2xl bg-white p-3 text-blue-700 shadow-sm">
                          <Paperclip size={18} />
                        </div>
                        <div className="min-w-0">
                          <p className="truncate text-sm font-semibold text-slate-800">
                            {fileName || 'Upload PDF, DOC, or DOCX'}
                          </p>
                          <p className="mt-1 text-xs text-slate-500">Maximum file size: 5MB</p>
                        </div>
                        <input
                          type="file"
                          accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                          className="hidden"
                          onChange={(event) => setForm((current) => ({ ...current, resume: event.target.files?.[0] || null }))}
                        />
                      </label>
                      {profileData?.resumeUrl ? (
                        <button
                          type="button"
                          onClick={() => {
                            setUsingProfileResume(true);
                            setForm((current) => ({ ...current, resume: null }));
                          }}
                          className="text-xs font-semibold text-blue-600 hover:underline"
                        >
                          Use saved resume instead
                        </button>
                      ) : null}
                    </div>
                  )}
                  {errors.resume && <p className="mt-2 text-sm text-red-600">{errors.resume}</p>}
                </div>
                </div>

                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <button type="submit" disabled={submitting} className="btn-primary disabled:opacity-70">
                    {submitting ? 'Submitting...' : 'Submit Application'}
                  </button>
                  <button type="button" onClick={onClose} className="btn-secondary">
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
