import React, { useRef } from 'react';
import { 
  Briefcase, 
  Upload, 
  CheckCircle2, 
  Sparkles, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  FileText, 
  Clock, 
  Coins, 
  AlertCircle,
  X,
  FileCheck,
  Building2,
  LockKeyhole,
  LogIn,
  ShieldCheck
} from 'lucide-react';
import useGeneralApplication from '../../hooks/useGeneralApplication';

export default function GeneralApplicationForm({ 
  defaultPosition = '', 
  onSuccess = null, 
  onCancel = null,
  embedded = false 
}) {
  const fileInputRef = useRef(null);
  const {
    formData,
    resumeFile,
    errors,
    loading,
    error,
    successMessage,
    isSubmitted,
    applicant,
    isLoggedIn,
    alreadyAppliedWarning,
    handleChange,
    handleFileChange,
    handleSubmit,
    resetForm,
    setResumeFile
  } = useGeneralApplication(defaultPosition);

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  const onSubmit = async (e) => {
    const ok = await handleSubmit(e);
    if (ok && onSuccess) {
      setTimeout(() => {
        onSuccess();
      }, 2500);
    }
  };

  if (isSubmitted) {
    return (
      <div className={`flex flex-col items-center justify-center text-center ${embedded ? 'py-8 px-4' : 'py-10 px-6'}`}>
        <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 shadow-lg shadow-emerald-500/10">
          <CheckCircle2 size={42} />
          <span className="absolute -top-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-emerald-600 text-white text-xs font-bold shadow">
            ✓
          </span>
        </div>
        
        <span className="mt-5 inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3.5 py-1 text-xs font-semibold text-emerald-700 border border-emerald-200">
          <Sparkles size={13} />
          Application Received
        </span>

        <h3 className="mt-3 text-2xl font-bold text-slate-900 sm:text-3xl tracking-tight">
          Thank you, {formData.candidateName}!
        </h3>
        
        <p className="mt-2.5 max-w-md text-sm leading-relaxed text-slate-600">
          {successMessage || "Your candidate details and resume have been submitted to our talent team."}
        </p>

        <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50/80 p-5 text-left w-full max-w-md shadow-sm">
          <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-slate-400 border-b border-slate-200 pb-2.5">
            <span>Submission Summary</span>
            <span className="text-emerald-600 font-bold">Active Profile</span>
          </div>
          <div className="mt-3 space-y-2 text-sm text-slate-700">
            <div className="flex justify-between items-center">
              <span className="text-slate-500">Position Requested:</span>
              <span className="font-semibold text-slate-900 bg-blue-50 text-blue-700 px-2.5 py-0.5 rounded-lg border border-blue-100 text-xs">
                {formData.desiredPosition}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-500">Candidate Email:</span>
              <span className="font-medium text-slate-800 text-xs">{formData.email}</span>
            </div>
            {formData.mobile && (
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Phone Number:</span>
                <span className="font-medium text-slate-800 text-xs">{formData.mobile}</span>
              </div>
            )}
            <div className="flex justify-between items-center">
              <span className="text-slate-500">Resume Attached:</span>
              <span className="font-semibold text-emerald-600 text-xs flex items-center gap-1">
                <FileCheck size={13} />
                {formData.useProfileResume ? 'Saved Profile Resume' : (resumeFile?.name || 'Uploaded Resume')}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-3 justify-center">
          <button
            type="button"
            onClick={onCancel || resetForm}
            className="btn-primary text-sm px-6 py-2.5 rounded-xl font-semibold shadow-md shadow-blue-500/20"
          >
            Done
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      {!isLoggedIn && (
        <div className="rounded-2xl border border-amber-200 bg-amber-50/80 p-4 sm:p-5 text-amber-900 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-500 text-white shadow-sm">
                <LockKeyhole size={20} />
              </div>
              <div>
                <h4 className="text-sm font-bold text-amber-950">Login Required to Submit Application</h4>
                <p className="mt-0.5 text-xs text-amber-800">
                  Please log in to your candidate account first. Your email address will be automatically linked to this application.
                </p>
              </div>
            </div>
            <a
              href="/applicant/login"
              className="shrink-0 inline-flex items-center justify-center gap-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white px-4 py-2.5 text-xs font-bold transition shadow-sm"
            >
              <LogIn size={14} /> Log In / Register
            </a>
          </div>
        </div>
      )}

      {error && (
        <div className="flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          <AlertCircle size={18} className="mt-0.5 shrink-0 text-red-500" />
          <div>
            <div className="font-semibold">Submission Failed</div>
            <div className="mt-0.5 text-xs text-red-600">{error}</div>
          </div>
        </div>
      )}

      {/* SECTION 1: Target Position Field - REQUIRED */}
      <div className="rounded-2xl border border-amber-200/70 bg-gradient-to-r from-[#fff6ee] via-white to-amber-50/40 p-4 sm:p-5 shadow-sm">
        <label htmlFor="desiredPosition" className="flex flex-wrap items-center justify-between gap-2 text-sm font-bold text-slate-900">
          <span className="flex items-center gap-2">
            <Briefcase size={16} className="text-[#ea7c00]" />
            Which position do you want to fill? <span className="text-red-500">*</span>
          </span>
          <span className="text-[11px] font-semibold text-[#ea7c00] bg-[#fff6ee] px-2.5 py-0.5 rounded-full border border-[#ea7c00]/20">
            Required
          </span>
        </label>
        <p className="mt-1 text-xs text-slate-500">
          Enter the exact role, job title, or domain you are seeking (e.g., Full Stack Developer, HR Specialist, Product Manager)
        </p>
        <div className="relative mt-2.5">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
            <Briefcase size={16} />
          </div>
          <input
            type="text"
            id="desiredPosition"
            name="desiredPosition"
            value={formData.desiredPosition}
            onChange={handleChange}
            placeholder="e.g. Senior React Developer / Talent Acquisition Lead / Marketing Manager"
            className={`w-full rounded-xl border bg-white pl-10 pr-4 py-3 text-sm text-slate-900 shadow-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 transition ${
              errors.desiredPosition
                ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
                : 'border-slate-200 focus:border-[#ea7c00] focus:ring-[#ea7c00]/20'
            }`}
          />
        </div>
        {errors.desiredPosition && (
          <p className="mt-1.5 text-xs font-medium text-red-600">{errors.desiredPosition}</p>
        )}
      </div>

      {/* SECTION 2: Candidate Personal Details */}
      <div className="space-y-4">
        <div className="text-xs font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100 pb-1.5">
          Personal Information
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {/* Full Name */}
          <div>
            <label htmlFor="candidateName" className="block text-xs font-semibold text-slate-700">
              Full Name <span className="text-red-500">*</span>
            </label>
            <div className="relative mt-1.5">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                <User size={15} />
              </div>
              <input
                type="text"
                id="candidateName"
                name="candidateName"
                value={formData.candidateName}
                onChange={handleChange}
                placeholder="e.g. Sarthak Sinha"
                className={`w-full rounded-xl border bg-white pl-10 pr-3 py-2.5 text-sm text-slate-900 shadow-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 transition ${
                  errors.candidateName
                    ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
                    : 'border-slate-200 focus:border-[#ea7c00] focus:ring-[#ea7c00]/20'
                }`}
              />
            </div>
            {errors.candidateName && (
              <p className="mt-1 text-xs font-medium text-red-600">{errors.candidateName}</p>
            )}
          </div>

          {/* Email Address */}
          <div>
            <label htmlFor="email" className="block text-xs font-semibold text-slate-700">
              Email Address <span className="text-red-500">*</span>
            </label>
            <div className="relative mt-1.5">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                <Mail size={15} />
              </div>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                readOnly={isLoggedIn}
                placeholder={isLoggedIn ? formData.email : "e.g. sarthak.sinha@gmail.com"}
                className={`w-full rounded-xl border pl-10 pr-3 py-2.5 text-sm text-slate-900 shadow-sm transition ${
                  isLoggedIn
                    ? 'bg-slate-100/90 border-slate-200 text-slate-600 font-medium cursor-not-allowed'
                    : errors.email
                    ? 'bg-white border-red-300 focus:border-red-500 focus:ring-red-200'
                    : 'bg-white border-slate-200 focus:border-[#ea7c00] focus:ring-[#ea7c00]/20'
                }`}
              />
            </div>
            {errors.email && (
              <p className="mt-1 text-xs font-medium text-red-600">{errors.email}</p>
            )}
          </div>

          {/* Phone / Mobile */}
          <div>
            <label htmlFor="mobile" className="block text-xs font-semibold text-slate-700">
              Phone / Mobile Number <span className="text-red-500">*</span>
            </label>
            <div className="relative mt-1.5">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                <Phone size={15} />
              </div>
              <input
                type="tel"
                id="mobile"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                maxLength={10}
                placeholder="10-digit mobile number"
                className={`w-full rounded-xl border bg-white pl-10 pr-3 py-2.5 text-sm text-slate-900 shadow-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 transition ${
                  errors.mobile
                    ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
                    : 'border-slate-200 focus:border-[#ea7c00] focus:ring-[#ea7c00]/20'
                }`}
              />
            </div>
            {errors.mobile && (
              <p className="mt-1 text-xs font-medium text-red-600">{errors.mobile}</p>
            )}
          </div>

          {/* Current Company */}
          <div>
            <label htmlFor="currentCompany" className="block text-xs font-semibold text-slate-700">
              Current Company
            </label>
            <div className="relative mt-1.5">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                <Building2 size={15} />
              </div>
              <input
                type="text"
                id="currentCompany"
                name="currentCompany"
                value={formData.currentCompany}
                onChange={handleChange}
                placeholder="e.g. Acme Corp / TechCorp"
                className="w-full rounded-xl border border-slate-200 bg-white pl-10 pr-3 py-2.5 text-sm text-slate-900 shadow-sm placeholder:text-slate-400 focus:border-[#ea7c00] focus:outline-none focus:ring-2 focus:ring-[#ea7c00]/20 transition"
              />
            </div>
          </div>

          {/* Preferred Location */}
          <div className="sm:col-span-2">
            <label htmlFor="preferredLocation" className="block text-xs font-semibold text-slate-700">
              Preferred Location / Work Mode
            </label>
            <div className="relative mt-1.5">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                <MapPin size={15} />
              </div>
              <input
                type="text"
                id="preferredLocation"
                name="preferredLocation"
                value={formData.preferredLocation}
                onChange={handleChange}
                placeholder="e.g. Remote / New York / Hybrid"
                className="w-full rounded-xl border border-slate-200 bg-white pl-10 pr-3 py-2.5 text-sm text-slate-900 shadow-sm placeholder:text-slate-400 focus:border-[#ea7c00] focus:outline-none focus:ring-2 focus:ring-[#ea7c00]/20 transition"
              />
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 3: Salary & Experience Details - 2 Columns on desktop for spacious layout */}
      <div className="space-y-4">
        <div className="text-xs font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100 pb-1.5">
          Professional Details
        </div>
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
          {/* Total Experience */}
          <div>
            <label htmlFor="totalExperienceYears" className="block text-xs font-semibold text-slate-700">
              Experience (Yrs)
            </label>
            <div className="relative mt-1.5">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                <Clock size={15} />
              </div>
              <input
                type="number"
                id="totalExperienceYears"
                name="totalExperienceYears"
                step="0.5"
                min="0"
                value={formData.totalExperienceYears}
                onChange={handleChange}
                placeholder="e.g. 5"
                className="w-full rounded-xl border border-slate-200 bg-white pl-10 pr-3 py-2.5 text-sm text-slate-900 shadow-sm placeholder:text-slate-400 focus:border-[#ea7c00] focus:outline-none focus:ring-2 focus:ring-[#ea7c00]/20 transition"
              />
            </div>
          </div>

          {/* Current CTC */}
          <div>
            <label htmlFor="currentCTC" className="block text-xs font-semibold text-slate-700">
              Current CTC (LPA)
            </label>
            <div className="relative mt-1.5">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                <Coins size={15} />
              </div>
              <input
                type="number"
                id="currentCTC"
                name="currentCTC"
                step="0.5"
                min="0"
                value={formData.currentCTC}
                onChange={handleChange}
                placeholder="e.g. 3"
                className="w-full rounded-xl border border-slate-200 bg-white pl-10 pr-3 py-2.5 text-sm text-slate-900 shadow-sm placeholder:text-slate-400 focus:border-[#ea7c00] focus:outline-none focus:ring-2 focus:ring-[#ea7c00]/20 transition"
              />
            </div>
          </div>

          {/* Expected CTC */}
          <div>
            <label htmlFor="expectedCTC" className="block text-xs font-semibold text-slate-700">
              Expected CTC (LPA)
            </label>
            <div className="relative mt-1.5">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                <Coins size={15} />
              </div>
              <input
                type="number"
                id="expectedCTC"
                name="expectedCTC"
                step="0.5"
                min="0"
                value={formData.expectedCTC}
                onChange={handleChange}
                placeholder="e.g. 6"
                className="w-full rounded-xl border border-slate-200 bg-white pl-10 pr-3 py-2.5 text-sm text-slate-900 shadow-sm placeholder:text-slate-400 focus:border-[#ea7c00] focus:outline-none focus:ring-2 focus:ring-[#ea7c00]/20 transition"
              />
            </div>
          </div>

          {/* Notice Period */}
          <div>
            <label htmlFor="noticePeriod" className="block text-xs font-semibold text-slate-700">
              Notice Period
            </label>
            <div className="relative mt-1.5">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                <Clock size={15} />
              </div>
              <select
                id="noticePeriod"
                name="noticePeriod"
                value={formData.noticePeriod}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-200 bg-white pl-10 pr-8 py-2.5 text-sm text-slate-900 shadow-sm focus:border-[#ea7c00] focus:outline-none focus:ring-2 focus:ring-[#ea7c00]/20 transition appearance-none cursor-pointer"
              >
                <option value="">Select Notice Period</option>
                <option value="0">Immediate</option>
                <option value="15">15 Days</option>
                <option value="30">30 Days</option>
                <option value="60">60 Days</option>
                <option value="90">90 Days</option>
                <option value="More than 90 Days">&gt; 90 Days</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400">
                <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                  <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 4: Resume Upload Dropzone */}
      <div className="space-y-2">
        <label className="block text-xs font-semibold text-slate-700">
          Submit Resume / CV <span className="text-red-500">*</span>
        </label>

        {isLoggedIn && applicant?.resumeUrl && (
          <div className="rounded-xl border border-amber-200 bg-[#fff6ee] p-3 shadow-sm mb-3">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                name="useProfileResume"
                checked={formData.useProfileResume}
                onChange={handleChange}
                className="h-4 w-4 rounded border-slate-300 text-[#ea7c00] focus:ring-[#ea7c00]"
              />
              <div className="flex items-center gap-2 text-xs text-slate-800 font-semibold">
                <FileCheck size={16} className="text-[#ea7c00] shrink-0" />
                Use saved profile resume from your candidate account
              </div>
            </label>
          </div>
        )}

        {(!formData.useProfileResume || !isLoggedIn || !applicant?.resumeUrl) && (
          <div
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`group relative flex flex-col items-center justify-center rounded-2xl border-2 border-dashed p-6 text-center cursor-pointer transition-all duration-200 ${
              errors.resume
                ? 'border-red-300 bg-red-50/40 hover:bg-red-50/70'
                : resumeFile
                  ? 'border-emerald-300 bg-emerald-50/30 hover:bg-emerald-50/50'
                  : 'border-slate-300 bg-slate-50/60 hover:border-[#ea7c00] hover:bg-[#fff6ee]/40'
            }`}
          >
            <input
              type="file"
              ref={fileInputRef}
              accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
              onChange={(e) => handleFileChange(e.target.files[0])}
              className="hidden"
            />

            {resumeFile ? (
              <div className="flex items-center gap-3 text-left w-full max-w-md bg-white p-3 rounded-xl border border-emerald-200 shadow-sm">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                  <FileText size={20} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-bold text-slate-900 truncate">
                    {resumeFile.name}
                  </div>
                  <div className="text-[11px] text-slate-500">
                    {(resumeFile.size / (1024 * 1024)).toFixed(2)} MB • Click or drop to replace
                  </div>
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setResumeFile(null);
                  }}
                  className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-red-100 hover:text-red-600 transition"
                  title="Remove file"
                >
                  <X size={14} />
                </button>
              </div>
            ) : (
              <>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#fff6ee] text-[#ea7c00] border border-[#ea7c00]/20 shadow-sm transition-transform duration-200 group-hover:scale-110">
                  <Upload size={22} />
                </div>
                <div className="mt-3 text-sm font-bold text-slate-800">
                  Click to upload or drag & drop your resume
                </div>
                <div className="mt-1 text-xs text-slate-500">
                  Accepted formats: PDF, DOC, DOCX (Max 5MB)
                </div>
              </>
            )}
          </div>
        )}

        {errors.resume && (
          <p className="mt-1.5 text-xs font-medium text-red-600">{errors.resume}</p>
        )}
      </div>

      {/* Cover Note */}
      <div>
        <label htmlFor="coverNote" className="block text-xs font-semibold text-slate-700">
          Cover Note / Message for Hiring Manager (Optional)
        </label>
        <textarea
          id="coverNote"
          name="coverNote"
          rows={3}
          value={formData.coverNote}
          onChange={handleChange}
          placeholder="Briefly highlight your key skills, accomplishments, or role preferences..."
          className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white p-3 text-sm text-slate-900 shadow-sm placeholder:text-slate-400 focus:border-[#ea7c00] focus:outline-none focus:ring-2 focus:ring-[#ea7c00]/20 transition"
        />
      </div>

      {/* Already Applied Warning - shown at bottom of form */}
      {alreadyAppliedWarning && (
        <div className="flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800 shadow-sm">
          <Clock size={18} className="mt-0.5 shrink-0 text-amber-500" />
          <div>
            <div className="font-semibold text-amber-900">Application Already Submitted</div>
            <div className="mt-0.5 text-xs text-amber-700">{alreadyAppliedWarning}</div>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className="btn-secondary py-2.5 px-6 text-sm"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          disabled={loading || !!alreadyAppliedWarning}
          className="btn-primary py-3 px-7 text-sm font-semibold inline-flex items-center gap-2 shadow-lg shadow-[#ea7c00]/20 disabled:opacity-60 transition-transform active:scale-98"
        >
          {loading ? (
            <>
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              Submitting Application...
            </>
          ) : (
            <>
              <Sparkles size={16} />
              Submit Details & Resume
            </>
          )}
        </button>
      </div>
    </form>
  );
}
