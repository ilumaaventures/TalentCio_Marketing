import React, { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import api from '../api/axios';

const modules = [
  { key: 'attendance', label: 'Attendance' },
  { key: 'talentAcquisition', label: 'Talent Acquisition' },
  { key: 'onboarding', label: 'Onboarding' },
  { key: 'leaves', label: 'Leaves' },
  { key: 'timesheet', label: 'Timesheets' },
  { key: 'projectManagement', label: 'Projects' },
  { key: 'helpdesk', label: 'Help Desk' },
  { key: 'meetingsOfMinutes', label: 'Meetings' }
];

const initialForm = {
  name: '',
  email: '',
  company: '',
  phone: '',
  teamSize: '',
  message: '',
  interestedModules: []
};

export default function DemoRequest() {
  const [form, setForm] = useState(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const toggleModule = (moduleKey) => {
    setForm((current) => ({
      ...current,
      interestedModules: current.interestedModules.includes(moduleKey)
        ? current.interestedModules.filter((item) => item !== moduleKey)
        : [...current.interestedModules, moduleKey]
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!form.name.trim() || !form.email.trim() || !form.company.trim()) {
      toast.error('Please fill in your name, work email, and company name.');
      return;
    }

    try {
      setSubmitting(true);
      await api.post('/public/demo-request', {
        ...form,
        name: form.name.trim(),
        email: form.email.trim(),
        company: form.company.trim()
      });
      setSuccess(true);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to submit your request');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="bg-[var(--surface)] pb-20 pt-28">
      <section className="container-shell">
        {success ? (
          <div className="surface-card mx-auto max-w-3xl px-6 py-14 text-center sm:px-10">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
              <CheckCircle2 size={36} />
            </div>
            <span className="section-kicker mt-6">Request Received</span>
            <h1 className="mt-5 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
              We have received your request
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-600">
              We have received your request. Our team will reach out within 24 hours to understand your
              workflows and recommend the right TalentCIO setup.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link to="/jobs" className="btn-primary">Browse Open Jobs</Link>
              <Link to="/" className="btn-secondary">Back to Home</Link>
            </div>
          </div>
        ) : (
          <div className="grid gap-10 lg:grid-cols-[0.95fr_minmax(0,1.05fr)]">
            <div className="pt-4">
              <span className="section-kicker">Request a Demo</span>
              <h1 className="section-title">
                See how TalentCIO fits your team before you commit
              </h1>
              <p className="section-copy">
                Tell us a bit about your company and priorities. We will tailor the walkthrough to the
                modules that matter most, from attendance and onboarding to hiring and help desk workflows.
              </p>

              <div className="surface-card mt-8 bg-[var(--dark)] p-6 text-white">
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-blue-200">What you can expect</p>
                <ul className="mt-5 space-y-4 text-sm leading-6 text-slate-200">
                  <li>Live product walkthrough matched to your company size and workflow complexity.</li>
                  <li>Suggested module mix across attendance, hiring, onboarding, projects, and employee operations.</li>
                  <li>Answers on rollout, permissions, pricing, and multi-tenant workspace setup.</li>
                </ul>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="surface-card p-6 sm:p-8">
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label className="label-shell">Full Name*</label>
                  <input
                    className="input-shell"
                    value={form.name}
                    onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
                    placeholder="Your full name"
                  />
                </div>

                <div>
                  <label className="label-shell">Work Email*</label>
                  <input
                    type="email"
                    className="input-shell"
                    value={form.email}
                    onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
                    placeholder="you@company.com"
                  />
                </div>

                <div>
                  <label className="label-shell">Company Name*</label>
                  <input
                    className="input-shell"
                    value={form.company}
                    onChange={(event) => setForm((current) => ({ ...current, company: event.target.value }))}
                    placeholder="Company name"
                  />
                </div>

                <div>
                  <label className="label-shell">Phone Number</label>
                  <input
                    className="input-shell"
                    value={form.phone}
                    onChange={(event) => setForm((current) => ({ ...current, phone: event.target.value }))}
                    placeholder="+91 98xxxxxx12"
                  />
                </div>

                <div>
                  <label className="label-shell">Team Size</label>
                  <select
                    className="input-shell"
                    value={form.teamSize}
                    onChange={(event) => setForm((current) => ({ ...current, teamSize: event.target.value }))}
                  >
                    <option value="">Select team size</option>
                    <option value="1-10">1-10</option>
                    <option value="11-50">11-50</option>
                    <option value="51-200">51-200</option>
                    <option value="200+">200+</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="label-shell">Which modules interest you?</label>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {modules.map((module) => (
                      <label
                        key={module.key}
                        className="flex items-center gap-3 rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-700 transition hover:border-blue-200 hover:bg-blue-50"
                      >
                        <input
                          type="checkbox"
                          checked={form.interestedModules.includes(module.key)}
                          onChange={() => toggleModule(module.key)}
                          className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                        />
                        {module.label}
                      </label>
                    ))}
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label className="label-shell">Message</label>
                  <textarea
                    rows={5}
                    className="input-shell resize-none"
                    value={form.message}
                    onChange={(event) => setForm((current) => ({ ...current, message: event.target.value }))}
                    placeholder="Share your current HR stack, rollout timeline, or team pain points."
                  />
                </div>
              </div>

              <button type="submit" disabled={submitting} className="btn-primary mt-8 w-full disabled:opacity-70">
                {submitting ? 'Submitting...' : 'Request My Demo'}
              </button>
            </form>
          </div>
        )}
      </section>
    </main>
  );
}
