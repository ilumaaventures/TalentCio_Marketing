import React, { useEffect, useMemo, useState } from 'react';
import { Briefcase, Pencil, Plus, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import applicantApi from '../../api/applicantApi';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const emptyForm = {
  jobTitle: '',
  companyName: '',
  employmentType: 'Full-time',
  location: '',
  locationType: 'Onsite',
  startMonth: '',
  startYear: '',
  endMonth: '',
  endYear: '',
  isCurrent: false,
  description: '',
  skillsText: ''
};

const toSkillsArray = (skillsText) => skillsText
  .split(',')
  .map((item) => item.trim())
  .filter(Boolean);

const calcDuration = (startMonth, startYear, endMonth, endYear, isCurrent) => {
  if (!startYear) {
    return '';
  }

  const start = new Date(Number(startYear), Math.max((Number(startMonth) || 1) - 1, 0), 1);
  const end = isCurrent
    ? new Date()
    : new Date(Number(endYear || startYear), Math.max((Number(endMonth) || 1) - 1, 0), 1);

  const diffMonths = Math.max(((end.getFullYear() - start.getFullYear()) * 12) + (end.getMonth() - start.getMonth()), 0);
  const years = Math.floor(diffMonths / 12);
  const months = diffMonths % 12;
  const parts = [];

  if (years > 0) parts.push(`${years} yr${years > 1 ? 's' : ''}`);
  if (months > 0) parts.push(`${months} mo`);
  return parts.join(' ') || 'Less than a month';
};

const toFormState = (item) => ({
  jobTitle: item?.jobTitle || '',
  companyName: item?.companyName || '',
  employmentType: item?.employmentType || 'Full-time',
  location: item?.location || '',
  locationType: item?.locationType || 'Onsite',
  startMonth: item?.startMonth?.toString() || '',
  startYear: item?.startYear?.toString() || '',
  endMonth: item?.endMonth?.toString() || '',
  endYear: item?.endYear?.toString() || '',
  isCurrent: Boolean(item?.isCurrent),
  description: item?.description || '',
  skillsText: (item?.skills || []).join(', ')
});

function ExperienceForm({ value, onChange, onSubmit, onCancel, submitting }) {
  return (
    <form
      onSubmit={onSubmit}
      className="rounded-[28px] border border-blue-200 bg-blue-50/60 p-5"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="label-shell">Job Title*</label>
          <input className="input-shell" value={value.jobTitle} onChange={(event) => onChange('jobTitle', event.target.value)} required />
        </div>
        <div>
          <label className="label-shell">Company Name*</label>
          <input className="input-shell" value={value.companyName} onChange={(event) => onChange('companyName', event.target.value)} required />
        </div>
        <div>
          <label className="label-shell">Employment Type</label>
          <select className="input-shell" value={value.employmentType} onChange={(event) => onChange('employmentType', event.target.value)}>
            {['Full-time', 'Part-time', 'Contract', 'Freelance', 'Internship'].map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="label-shell">Location</label>
          <input className="input-shell" value={value.location} onChange={(event) => onChange('location', event.target.value)} />
        </div>
        <div>
          <label className="label-shell">Location Type</label>
          <select className="input-shell" value={value.locationType} onChange={(event) => onChange('locationType', event.target.value)}>
            {['Onsite', 'Remote', 'Hybrid'].map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>
        <div className="flex items-center gap-3 pt-8">
          <input
            id="is-current-role"
            type="checkbox"
            checked={value.isCurrent}
            onChange={(event) => onChange('isCurrent', event.target.checked)}
            className="h-4 w-4 rounded border-slate-300 text-blue-600"
          />
          <label htmlFor="is-current-role" className="text-sm font-medium text-slate-700">I currently work here</label>
        </div>
        <div>
          <label className="label-shell">Start Month</label>
          <select className="input-shell" value={value.startMonth} onChange={(event) => onChange('startMonth', event.target.value)}>
            <option value="">Select month</option>
            {MONTHS.map((month, index) => (
              <option key={month} value={index + 1}>{month}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="label-shell">Start Year*</label>
          <input type="number" className="input-shell" value={value.startYear} onChange={(event) => onChange('startYear', event.target.value)} required />
        </div>
        <div>
          <label className="label-shell">End Month</label>
          <select className="input-shell" value={value.endMonth} onChange={(event) => onChange('endMonth', event.target.value)} disabled={value.isCurrent}>
            <option value="">Select month</option>
            {MONTHS.map((month, index) => (
              <option key={month} value={index + 1}>{month}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="label-shell">End Year</label>
          <input type="number" className="input-shell" value={value.endYear} onChange={(event) => onChange('endYear', event.target.value)} disabled={value.isCurrent} />
        </div>
        <div className="sm:col-span-2">
          <label className="label-shell">Description</label>
          <textarea rows={4} className="input-shell resize-none" value={value.description} onChange={(event) => onChange('description', event.target.value)} />
        </div>
        <div className="sm:col-span-2">
          <label className="label-shell">Skills Used</label>
          <input
            className="input-shell"
            value={value.skillsText}
            onChange={(event) => onChange('skillsText', event.target.value)}
            placeholder="React, Node.js, Team Leadership"
          />
          <p className="mt-2 text-xs text-slate-400">Separate skills with commas.</p>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-3">
        <button type="submit" disabled={submitting} className="btn-primary disabled:opacity-70">
          {submitting ? 'Saving...' : 'Save Experience'}
        </button>
        <button type="button" onClick={onCancel} className="btn-secondary">Cancel</button>
      </div>
    </form>
  );
}

export default function ExperienceSection({ experiences = [], onProfileChange }) {
  const [items, setItems] = useState(experiences);
  const [adding, setAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [expandedId, setExpandedId] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const sorted = [...experiences].sort((left, right) => {
      const leftYear = left.isCurrent ? 9999 : Number(left.endYear || left.startYear || 0);
      const rightYear = right.isCurrent ? 9999 : Number(right.endYear || right.startYear || 0);
      return rightYear - leftYear;
    });
    setItems(sorted);
  }, [experiences]);

  const hasItems = useMemo(() => items.length > 0, [items]);

  const resetForm = () => {
    setForm(emptyForm);
    setAdding(false);
    setEditingId(null);
  };

  const handleChange = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleAdd = async (event) => {
    event.preventDefault();
    try {
      setSubmitting(true);
      const response = await applicantApi.post('/profile/experience', {
        ...form,
        skills: toSkillsArray(form.skillsText)
      });
      onProfileChange(response.data, 'experience');
      toast.success(response.data.message || 'Experience added.');
      resetForm();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to add experience.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleUpdate = async (event) => {
    event.preventDefault();
    try {
      setSubmitting(true);
      const response = await applicantApi.put(`/profile/experience/${editingId}`, {
        ...form,
        skills: toSkillsArray(form.skillsText)
      });
      onProfileChange(response.data, 'experience');
      toast.success(response.data.message || 'Experience updated.');
      resetForm();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update experience.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this experience entry?')) {
      return;
    }

    try {
      const response = await applicantApi.delete(`/profile/experience/${id}`);
      onProfileChange(response.data, 'experience');
      toast.success(response.data.message || 'Experience deleted.');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to delete experience.');
    }
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h3 className="font-['Sora'] text-xl font-bold text-slate-950">Work Experience</h3>
          <p className="mt-1 text-sm text-slate-500">Add your work history to help recruiters understand your background.</p>
        </div>
        <button type="button" onClick={() => { setAdding(true); setEditingId(null); setForm(emptyForm); }} className="btn-secondary">
          <Plus size={16} />
          Add Experience
        </button>
      </div>

      {(adding || editingId) && (
        <ExperienceForm
          value={form}
          onChange={handleChange}
          onSubmit={editingId ? handleUpdate : handleAdd}
          onCancel={resetForm}
          submitting={submitting}
        />
      )}

      {!hasItems && !adding ? (
        <div className="rounded-[28px] border border-dashed border-slate-300 bg-slate-50 px-6 py-10 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-blue-600 shadow-sm">
            <Briefcase size={20} />
          </div>
          <p className="mt-4 text-sm font-semibold text-slate-700">No work experience added yet.</p>
          <p className="mt-2 text-sm text-slate-500">Adding your work history increases recruiter interest.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {items.map((item) => (
            <div key={item._id} className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h4 className="text-lg font-bold text-slate-950">{item.jobTitle}</h4>
                    <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">{item.employmentType}</span>
                  </div>
                  <p className="mt-1 text-sm font-medium text-slate-600">
                    {item.companyName}
                    {item.location ? `, ${item.location}` : ''}
                  </p>
                  <p className="mt-2 text-sm text-slate-500">
                    {item.startYear ? `${MONTHS[(item.startMonth || 1) - 1]} ${item.startYear}` : 'Start date not set'}
                    {' - '}
                    {item.isCurrent ? 'Present' : `${MONTHS[(item.endMonth || 1) - 1]} ${item.endYear || ''}`.trim()}
                    {item.startYear ? ` (${calcDuration(item.startMonth, item.startYear, item.endMonth, item.endYear, item.isCurrent)})` : ''}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setEditingId(item._id);
                      setAdding(false);
                      setForm(toFormState(item));
                    }}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-200 text-slate-500 transition hover:border-blue-200 hover:text-blue-700"
                  >
                    <Pencil size={16} />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(item._id)}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-200 text-slate-500 transition hover:border-red-200 hover:text-red-600"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              {(item.description || item.skills?.length) && (
                <div className="mt-4">
                  {item.description && (
                    <>
                      <button
                        type="button"
                        onClick={() => setExpandedId((current) => current === item._id ? null : item._id)}
                        className="text-sm font-semibold text-blue-600 hover:underline"
                      >
                        {expandedId === item._id ? 'Hide description' : 'Show description'}
                      </button>
                      {expandedId === item._id && (
                        <p className="mt-3 whitespace-pre-wrap text-sm leading-7 text-slate-600">{item.description}</p>
                      )}
                    </>
                  )}

                  {item.skills?.length ? (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {item.skills.map((skill) => (
                        <span key={skill} className="rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                          {skill}
                        </span>
                      ))}
                    </div>
                  ) : null}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
