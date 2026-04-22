import React from 'react';
import { Filter, RotateCcw } from 'lucide-react';

const locationOptions = ['Onsite', 'Remote', 'Hybrid'];
const typeOptions = ['Full-time', 'Intern', 'Contract', 'Freelance'];

export default function JobFilters({ filters, onChange, onReset }) {
  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Filter size={16} className="text-blue-700" />
          <h2 className="text-base font-bold text-slate-950">Filters</h2>
        </div>
        <button type="button" onClick={onReset} className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-blue-700">
          <RotateCcw size={14} />
          Reset
        </button>
      </div>

      <div className="mt-6 space-y-5">
        <div>
          <label className="label-shell">Search</label>
          <input
            className="input-shell"
            placeholder="Title, department, client"
            value={filters.search}
            onChange={(event) => onChange({ search: event.target.value })}
          />
        </div>

        <div>
          <label className="label-shell">Location</label>
          <select
            className="input-shell"
            value={filters.location}
            onChange={(event) => onChange({ location: event.target.value })}
          >
            <option value="">All locations</option>
            {locationOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="label-shell">Employment Type</label>
          <select
            className="input-shell"
            value={filters.type}
            onChange={(event) => onChange({ type: event.target.value })}
          >
            <option value="">All types</option>
            {typeOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="label-shell">Department</label>
          <input
            className="input-shell"
            placeholder="Search department"
            value={filters.department}
            onChange={(event) => onChange({ department: event.target.value })}
          />
        </div>
      </div>
    </div>
  );
}
