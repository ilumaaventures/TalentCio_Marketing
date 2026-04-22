import React, { useEffect, useState } from 'react';
import { GraduationCap, Pencil, Plus, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import applicantApi from '../../api/applicantApi';

const emptyForm = {
  degree: '',
  fieldOfStudy: '',
  institution: '',
  grade: '',
  startYear: '',
  endYear: '',
  isCurrent: false,
  description: ''
};

const toFormState = (item) => ({
  degree: item?.degree || '',
  fieldOfStudy: item?.fieldOfStudy || '',
  institution: item?.institution || '',
  grade: item?.grade || '',
  startYear: item?.startYear?.toString() || '',
  endYear: item?.endYear?.toString() || '',
  isCurrent: Boolean(item?.isCurrent),
  description: item?.description || ''
});

function EducationForm({ value, onChange, onSubmit, onCancel, submitting }) {
  return (
    <form onSubmit={onSubmit} className="rounded-[28px] border border-blue-200 bg-blue-50/60 p-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="label-shell">Degree*</label>
          <input className="input-shell" value={value.degree} onChange={(event) => onChange('degree', event.target.value)} required />
        </div>
        <div>
          <label className="label-shell">Field of Study</label>
          <input className="input-shell" value={value.fieldOfStudy} onChange={(event) => onChange('fieldOfStudy', event.target.value)} />
        </div>
        <div className="sm:col-span-2">
          <label className="label-shell">Institution*</label>
          <input className="input-shell" value={value.institution} onChange={(event) => onChange('institution', event.target.value)} required />
        </div>
        <div>
          <label className="label-shell">Grade / CGPA</label>
          <input className="input-shell" value={value.grade} onChange={(event) => onChange('grade', event.target.value)} />
        </div>
        <div className="flex items-center gap-3 pt-8">
          <input
            id="is-current-education"
            type="checkbox"
            checked={value.isCurrent}
            onChange={(event) => onChange('isCurrent', event.target.checked)}
            className="h-4 w-4 rounded border-slate-300 text-blue-600"
          />
          <label htmlFor="is-current-education" className="text-sm font-medium text-slate-700">Currently studying here</label>
        </div>
        <div>
          <label className="label-shell">Start Year</label>
          <input type="number" className="input-shell" value={value.startYear} onChange={(event) => onChange('startYear', event.target.value)} />
        </div>
        <div>
          <label className="label-shell">End Year</label>
          <input type="number" className="input-shell" value={value.endYear} onChange={(event) => onChange('endYear', event.target.value)} disabled={value.isCurrent} />
        </div>
        <div className="sm:col-span-2">
          <label className="label-shell">Description</label>
          <textarea rows={3} className="input-shell resize-none" value={value.description} onChange={(event) => onChange('description', event.target.value)} />
        </div>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-3">
        <button type="submit" disabled={submitting} className="btn-primary disabled:opacity-70">
          {submitting ? 'Saving...' : 'Save Education'}
        </button>
        <button type="button" onClick={onCancel} className="btn-secondary">Cancel</button>
      </div>
    </form>
  );
}

export default function EducationSection({ education = [], onProfileChange }) {
  const [items, setItems] = useState(education);
  const [adding, setAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const sorted = [...education].sort((left, right) => {
      const leftYear = left.isCurrent ? 9999 : Number(left.endYear || left.startYear || 0);
      const rightYear = right.isCurrent ? 9999 : Number(right.endYear || right.startYear || 0);
      return rightYear - leftYear;
    });
    setItems(sorted);
  }, [education]);

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
      const response = await applicantApi.post('/profile/education', form);
      onProfileChange(response.data, 'education');
      toast.success(response.data.message || 'Education added.');
      resetForm();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to add education.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleUpdate = async (event) => {
    event.preventDefault();
    try {
      setSubmitting(true);
      const response = await applicantApi.put(`/profile/education/${editingId}`, form);
      onProfileChange(response.data, 'education');
      toast.success(response.data.message || 'Education updated.');
      resetForm();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update education.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this education entry?')) {
      return;
    }

    try {
      const response = await applicantApi.delete(`/profile/education/${id}`);
      onProfileChange(response.data, 'education');
      toast.success(response.data.message || 'Education deleted.');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to delete education.');
    }
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h3 className="font-['Sora'] text-xl font-bold text-slate-950">Education</h3>
          <p className="mt-1 text-sm text-slate-500">Share your academic background and training credentials.</p>
        </div>
        <button type="button" onClick={() => { setAdding(true); setEditingId(null); setForm(emptyForm); }} className="btn-secondary">
          <Plus size={16} />
          Add Education
        </button>
      </div>

      {(adding || editingId) && (
        <EducationForm
          value={form}
          onChange={handleChange}
          onSubmit={editingId ? handleUpdate : handleAdd}
          onCancel={resetForm}
          submitting={submitting}
        />
      )}

      {!items.length && !adding ? (
        <div className="rounded-[28px] border border-dashed border-slate-300 bg-slate-50 px-6 py-10 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-blue-600 shadow-sm">
            <GraduationCap size={20} />
          </div>
          <p className="mt-4 text-sm font-semibold text-slate-700">No education entries added yet.</p>
          <p className="mt-2 text-sm text-slate-500">Education helps recruiters understand your foundation.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {items.map((item) => (
            <div key={item._id} className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h4 className="text-lg font-bold text-slate-950">{item.degree}</h4>
                  <p className="mt-1 text-sm font-medium text-slate-600">
                    {[item.fieldOfStudy, item.institution].filter(Boolean).join(' at ')}
                  </p>
                  <p className="mt-2 text-sm text-slate-500">
                    {[item.startYear, item.isCurrent ? 'Present' : item.endYear].filter(Boolean).join(' - ')}
                    {item.grade ? ` | ${item.grade}` : ''}
                  </p>
                  {item.description ? <p className="mt-3 text-sm leading-7 text-slate-600">{item.description}</p> : null}
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
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
