import React, { useEffect, useRef, useState } from 'react';
import {
  Camera,
  FileText,
  Link as LinkIcon,
  Save,
  Upload,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { Link, useLocation } from 'react-router-dom';
import applicantApi from '../api/applicantApi';
import { useApplicantAuth } from '../context/ApplicantAuthContext';
import ProfileCompletion from '../components/profile/ProfileCompletion';
import ExperienceSection from '../components/profile/ExperienceSection';
import EducationSection from '../components/profile/EducationSection';

const POPULAR_SKILLS = ['React', 'Node.js', 'MongoDB', 'JavaScript', 'TypeScript', 'Recruitment', 'HR Operations', 'Project Management'];
const COMMON_LANGUAGES = ['English', 'Hindi', 'Tamil', 'Telugu', 'Kannada', 'Bengali'];
const JOB_TYPES = ['Full-time', 'Part-time', 'Contract', 'Freelance', 'Internship', 'Remote'];
const JOB_SEARCH_STATUSES = ['Actively Looking', 'Open to Opportunities', 'Not Looking'];
const SECTION_ITEMS = [
  { id: 'basicInfo', label: 'Basic Info' },
  { id: 'summary', label: 'Career Summary' },
  { id: 'workExperience', label: 'Work Experience' },
  { id: 'education', label: 'Education' },
  { id: 'skills', label: 'Skills' },
  { id: 'certifications', label: 'Certifications' },
  { id: 'languages', label: 'Languages' },
  { id: 'compensation', label: 'Compensation' },
  { id: 'links', label: 'Links' },
  { id: 'resume', label: 'Resume & Photo' }
];

const emptyCertification = {
  name: '',
  issuingOrganization: '',
  issueMonth: '',
  issueYear: '',
  expiryMonth: '',
  expiryYear: '',
  doesNotExpire: false,
  credentialId: '',
  credentialUrl: ''
};

const buildBasicForm = (profile) => ({
  firstName: profile?.firstName || '',
  lastName: profile?.lastName || '',
  mobile: profile?.mobile || '',
  headline: profile?.headline || '',
  currentCity: profile?.currentCity || '',
  currentState: profile?.currentState || '',
  currentCountry: profile?.currentCountry || 'India',
  willingToRelocate: Boolean(profile?.willingToRelocate),
  preferredLocationsText: (profile?.preferredLocations || []).join(', '),
  preferredJobTypes: profile?.preferredJobTypes || [],
  preferredDepartmentsText: (profile?.preferredDepartments || []).join(', '),
  jobSearchStatus: profile?.jobSearchStatus || 'Actively Looking',
  totalExperienceYears: profile?.totalExperienceYears !== undefined && profile?.totalExperienceYears !== null
    ? String(profile.totalExperienceYears)
    : ''
});

const buildLinksForm = (profile) => ({
  linkedinUrl: profile?.linkedinUrl || '',
  githubUrl: profile?.githubUrl || '',
  portfolioUrl: profile?.portfolioUrl || '',
  otherLinks: (profile?.otherLinks || []).length ? profile.otherLinks : [{ label: '', url: '' }]
});

const buildCompensationForm = (profile) => ({
  currentCTC: profile?.currentCTC?.toString?.() || '',
  expectedCTC: profile?.expectedCTC?.toString?.() || '',
  noticePeriod: profile?.noticePeriod?.toString?.() || ''
});

const formatDate = (value) => value ? new Date(value).toLocaleDateString('en-IN', {
  day: 'numeric',
  month: 'short',
  year: 'numeric'
}) : '';

const normalizeCommaList = (value, maxItems = null) => {
  const items = value
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);

  return maxItems ? items.slice(0, maxItems) : items;
};

export default function ApplicantProfile() {
  const location = useLocation();
  const { applicant, setApplicantProfile } = useApplicantAuth();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);
  const [completion, setCompletion] = useState(null);
  const [savedSection, setSavedSection] = useState('');

  const [basicForm, setBasicForm] = useState(buildBasicForm(null));
  const [summary, setSummary] = useState('');
  const [skills, setSkills] = useState([]);
  const [skillName, setSkillName] = useState('');
  const [skillLevel, setSkillLevel] = useState('Intermediate');
  const [languages, setLanguages] = useState([]);
  const [languageName, setLanguageName] = useState('');
  const [languageProficiency, setLanguageProficiency] = useState('Professional');
  const [linksForm, setLinksForm] = useState(buildLinksForm(null));
  const [compensationForm, setCompensationForm] = useState(buildCompensationForm(null));
  const [certifications, setCertifications] = useState([]);
  const [certificationForm, setCertificationForm] = useState(emptyCertification);
  const [editingCertId, setEditingCertId] = useState('');
  const milestoneRef = useRef(0);

  useEffect(() => {
    let ignore = false;

    applicantApi.get('/profile')
      .then((response) => {
        if (ignore) return;
        const { applicant: applicantProfile, completion: completionData } = response.data;
        setProfile(applicantProfile);
        setCompletion(completionData);
        setApplicantProfile(applicantProfile, completionData);
        milestoneRef.current = completionData?.score || 0;
      })
      .catch(() => {
        if (!ignore) {
          toast.error('Failed to load your profile.');
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
  }, [setApplicantProfile]);

  useEffect(() => {
    if (!profile) return;
    setBasicForm(buildBasicForm(profile));
    setSummary(profile.summary || '');
    setSkills(profile.skills || []);
    setLanguages(profile.languages || []);
    setLinksForm(buildLinksForm(profile));
    setCompensationForm(buildCompensationForm(profile));
    setCertifications(profile.certifications || []);
  }, [profile]);

  useEffect(() => {
    if (!savedSection) return undefined;
    const timeout = window.setTimeout(() => setSavedSection(''), 1500);
    return () => window.clearTimeout(timeout);
  }, [savedSection]);

  useEffect(() => {
    if (!loading && location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, [loading, location.hash]);

  const handleProfileResponse = (data, sectionKey) => {
    const previousScore = completion?.score || 0;
    setProfile(data.applicant);
    setCompletion(data.completion);
    setApplicantProfile(data.applicant, data.completion);
    setSavedSection(sectionKey);

    [60, 80, 100].forEach((threshold) => {
      if (previousScore < threshold && (data.completion?.score || 0) >= threshold) {
        toast.success(`Profile is now ${data.completion.score}% complete.`);
      }
    });
    milestoneRef.current = data.completion?.score || milestoneRef.current;
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      window.history.replaceState(null, '', `#${sectionId}`);
    }
  };

  const handleBasicSave = async () => {
    try {
      const response = await applicantApi.put('/profile/basic', {
        firstName: basicForm.firstName,
        lastName: basicForm.lastName,
        mobile: basicForm.mobile,
        headline: basicForm.headline,
        currentCity: basicForm.currentCity,
        currentState: basicForm.currentState,
        currentCountry: basicForm.currentCountry,
        willingToRelocate: basicForm.willingToRelocate,
        preferredLocations: normalizeCommaList(basicForm.preferredLocationsText, 3),
        preferredJobTypes: basicForm.preferredJobTypes,
        preferredDepartments: normalizeCommaList(basicForm.preferredDepartmentsText),
        jobSearchStatus: basicForm.jobSearchStatus,
        totalExperienceYears: basicForm.totalExperienceYears
      });
      handleProfileResponse(response.data, 'basicInfo');
      toast.success(response.data.message || 'Basic info updated.');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update basic info.');
    }
  };

  const handleSummarySave = async () => {
    try {
      const response = await applicantApi.put('/profile/summary', { summary });
      handleProfileResponse(response.data, 'summary');
      toast.success(response.data.message || 'Summary updated.');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update summary.');
    }
  };

  const handleSkillsSave = async () => {
    try {
      const response = await applicantApi.put('/profile/skills', { skills });
      handleProfileResponse(response.data, 'skills');
      toast.success(response.data.message || 'Skills updated.');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update skills.');
    }
  };

  const handleLanguagesSave = async () => {
    try {
      const response = await applicantApi.put('/profile/languages', { languages });
      handleProfileResponse(response.data, 'languages');
      toast.success(response.data.message || 'Languages updated.');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update languages.');
    }
  };

  const handleCompensationSave = async () => {
    try {
      const response = await applicantApi.put('/profile/compensation', compensationForm);
      handleProfileResponse(response.data, 'compensation');
      toast.success(response.data.message || 'Compensation updated.');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update compensation.');
    }
  };

  const handleLinksSave = async () => {
    try {
      const response = await applicantApi.put('/profile/links', linksForm);
      handleProfileResponse(response.data, 'links');
      toast.success(response.data.message || 'Links updated.');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update links.');
    }
  };

  const handleCertificationSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = editingCertId
        ? await applicantApi.put(`/profile/certification/${editingCertId}`, certificationForm)
        : await applicantApi.post('/profile/certification', certificationForm);

      handleProfileResponse(response.data, 'certifications');
      toast.success(response.data.message || (editingCertId ? 'Certification updated.' : 'Certification added.'));
      setCertificationForm(emptyCertification);
      setEditingCertId('');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to save certification.');
    }
  };

  const handleCertificationDelete = async (certId) => {
    if (!window.confirm('Delete this certification?')) {
      return;
    }

    try {
      const response = await applicantApi.delete(`/profile/certification/${certId}`);
      handleProfileResponse(response.data, 'certifications');
      toast.success(response.data.message || 'Certification deleted.');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to delete certification.');
    }
  };

  const handleResumeUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const payload = new FormData();
      payload.append('resume', file);
      const response = await applicantApi.post('/profile/resume', payload);
      handleProfileResponse(response.data, 'resume');
      toast.success(response.data.message || 'Resume uploaded.');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to upload resume.');
    } finally {
      event.target.value = '';
    }
  };

  const handlePhotoUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const payload = new FormData();
      payload.append('photo', file);
      const response = await applicantApi.post('/profile/photo', payload);
      handleProfileResponse(response.data, 'resume');
      toast.success(response.data.message || 'Profile photo updated.');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to upload photo.');
    } finally {
      event.target.value = '';
    }
  };

  const addSkill = (name, level = skillLevel) => {
    const normalizedName = name.trim();
    if (!normalizedName) return;
    if (skills.some((skill) => skill.name.toLowerCase() === normalizedName.toLowerCase())) return;
    setSkills((current) => [...current, { name: normalizedName, level }]);
    setSkillName('');
  };

  const addLanguage = (language) => {
    const normalized = language.trim();
    if (!normalized) return;
    if (languages.some((item) => item.language.toLowerCase() === normalized.toLowerCase())) return;
    setLanguages((current) => [...current, { language: normalized, proficiency: languageProficiency }]);
    setLanguageName('');
  };

  if (loading) {
    return (
      <main className="bg-[var(--surface)] pb-20 pt-28">
        <section className="container-shell">
          <div className="grid gap-6 lg:grid-cols-[320px_minmax(0,1fr)]">
            <div className="surface-card h-80 animate-pulse bg-slate-100" />
            <div className="space-y-4">
              {[1, 2, 3].map((item) => (
                <div key={item} className="surface-card h-56 animate-pulse bg-slate-100" />
              ))}
            </div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="bg-[var(--surface)] pb-20 pt-28">
      <section className="container-shell">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="section-kicker">My Profile</span>
            <h1 className="mt-3 text-3xl font-bold text-slate-950">Build your applicant profile</h1>
            <p className="mt-2 max-w-2xl text-sm leading-7 text-slate-600">
              Keep your professional information updated so job applications are faster and richer every time.
            </p>
          </div>
          <Link to="/my-applications" className="btn-secondary">Back to Dashboard</Link>
        </div>

        <div className="grid gap-6 lg:grid-cols-[320px_minmax(0,1fr)]">
          <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
            <ProfileCompletion completion={completion} onSectionClick={scrollToSection} />
            <div className="surface-card p-4">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">Jump To</p>
              <div className="mt-3 grid gap-2">
                {SECTION_ITEMS.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => scrollToSection(item.id)}
                    className="rounded-2xl px-3 py-2 text-left text-sm font-medium text-slate-600 transition hover:bg-blue-50 hover:text-blue-700"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          <div className="space-y-6">
            <section id="basicInfo" className="surface-card p-6">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <h2 className="font-['Sora'] text-2xl font-bold text-slate-950">Basic Info</h2>
                  <p className="mt-1 text-sm text-slate-500">Keep your headline, location, and job preferences current.</p>
                </div>
                {savedSection === 'basicInfo' ? <span className="text-sm font-semibold text-emerald-600">Saved</span> : null}
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="label-shell">First Name</label>
                  <input className="input-shell" value={basicForm.firstName} onChange={(event) => setBasicForm((current) => ({ ...current, firstName: event.target.value }))} />
                </div>
                <div>
                  <label className="label-shell">Last Name</label>
                  <input className="input-shell" value={basicForm.lastName} onChange={(event) => setBasicForm((current) => ({ ...current, lastName: event.target.value }))} />
                </div>
                <div>
                  <label className="label-shell">Mobile Number</label>
                  <input className="input-shell" value={basicForm.mobile} onChange={(event) => setBasicForm((current) => ({ ...current, mobile: event.target.value.replace(/\D/g, '').slice(0, 10) }))} />
                </div>
                <div>
                  <label className="label-shell">Professional Headline</label>
                  <input className="input-shell" maxLength={120} value={basicForm.headline} onChange={(event) => setBasicForm((current) => ({ ...current, headline: event.target.value }))} placeholder="Senior React Developer | Hiring-ready Frontend Engineer" />
                </div>
                <div>
                  <label className="label-shell">Current City</label>
                  <input className="input-shell" value={basicForm.currentCity} onChange={(event) => setBasicForm((current) => ({ ...current, currentCity: event.target.value }))} />
                </div>
                <div>
                  <label className="label-shell">Current State</label>
                  <input className="input-shell" value={basicForm.currentState} onChange={(event) => setBasicForm((current) => ({ ...current, currentState: event.target.value }))} />
                </div>
                <div>
                  <label className="label-shell">Current Country</label>
                  <input className="input-shell" value={basicForm.currentCountry} onChange={(event) => setBasicForm((current) => ({ ...current, currentCountry: event.target.value }))} />
                </div>
                <div>
                  <label className="label-shell">Total Experience (years)</label>
                  <input type="number" step="0.1" className="input-shell" value={basicForm.totalExperienceYears} onChange={(event) => setBasicForm((current) => ({ ...current, totalExperienceYears: event.target.value }))} />
                </div>
                <div>
                  <label className="label-shell">Job Search Status</label>
                  <select className="input-shell" value={basicForm.jobSearchStatus} onChange={(event) => setBasicForm((current) => ({ ...current, jobSearchStatus: event.target.value }))}>
                    {JOB_SEARCH_STATUSES.map((item) => <option key={item} value={item}>{item}</option>)}
                  </select>
                </div>
                <div className="flex items-center gap-3 pt-8">
                  <input
                    id="willing-to-relocate"
                    type="checkbox"
                    checked={basicForm.willingToRelocate}
                    onChange={(event) => setBasicForm((current) => ({ ...current, willingToRelocate: event.target.checked }))}
                    className="h-4 w-4 rounded border-slate-300 text-blue-600"
                  />
                  <label htmlFor="willing-to-relocate" className="text-sm font-medium text-slate-700">Willing to relocate</label>
                </div>
                <div className="sm:col-span-2">
                  <label className="label-shell">Preferred Job Types</label>
                  <div className="flex flex-wrap gap-2">
                    {JOB_TYPES.map((jobType) => {
                      const selected = basicForm.preferredJobTypes.includes(jobType);
                      return (
                        <button
                          key={jobType}
                          type="button"
                          onClick={() => setBasicForm((current) => ({
                            ...current,
                            preferredJobTypes: selected
                              ? current.preferredJobTypes.filter((item) => item !== jobType)
                              : [...current.preferredJobTypes, jobType]
                          }))}
                          className={`rounded-full border px-3 py-2 text-sm font-semibold transition ${selected ? 'border-blue-200 bg-blue-50 text-blue-700' : 'border-slate-200 bg-white text-slate-600 hover:border-blue-200 hover:text-blue-700'}`}
                        >
                          {jobType}
                        </button>
                      );
                    })}
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <label className="label-shell">Preferred Locations</label>
                  <input className="input-shell" value={basicForm.preferredLocationsText} onChange={(event) => setBasicForm((current) => ({ ...current, preferredLocationsText: event.target.value }))} placeholder="Bengaluru, Chennai, Remote" />
                  <p className="mt-2 text-xs text-slate-400">Add up to 3 preferred locations, separated by commas.</p>
                </div>
                <div className="sm:col-span-2">
                  <label className="label-shell">Preferred Departments</label>
                  <input className="input-shell" value={basicForm.preferredDepartmentsText} onChange={(event) => setBasicForm((current) => ({ ...current, preferredDepartmentsText: event.target.value }))} placeholder="Engineering, Product, Recruitment" />
                </div>
              </div>

              <div className="mt-5">
                <button type="button" onClick={handleBasicSave} className="btn-primary">
                  <Save size={16} />
                  Save Basic Info
                </button>
              </div>
            </section>

            <section id="summary" className="surface-card p-6">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <h2 className="font-['Sora'] text-2xl font-bold text-slate-950">Career Summary</h2>
                  <p className="mt-1 text-sm text-slate-500">Describe your background, strengths, and the kind of work you want next.</p>
                </div>
                {savedSection === 'summary' ? <span className="text-sm font-semibold text-emerald-600">Saved</span> : null}
              </div>
              <textarea
                rows={6}
                className="input-shell resize-none"
                value={summary}
                maxLength={1000}
                onChange={(event) => setSummary(event.target.value)}
                placeholder="Write a concise summary of your experience, strengths, and career goals."
              />
              <div className="mt-3 flex items-center justify-between text-xs text-slate-400">
                <span>A summary of 50+ characters improves completion.</span>
                <span>{summary.length}/1000</span>
              </div>
              <div className="mt-5">
                <button type="button" onClick={handleSummarySave} className="btn-primary">
                  <Save size={16} />
                  Save Summary
                </button>
              </div>
            </section>

            <section id="workExperience" className="surface-card p-6">
              <ExperienceSection experiences={profile?.workExperience || []} onProfileChange={handleProfileResponse} />
            </section>

            <section id="education" className="surface-card p-6">
              <EducationSection education={profile?.education || []} onProfileChange={handleProfileResponse} />
            </section>

            <section id="skills" className="surface-card p-6">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <h2 className="font-['Sora'] text-2xl font-bold text-slate-950">Skills</h2>
                  <p className="mt-1 text-sm text-slate-500">List the key skills you want recruiters to notice first.</p>
                </div>
                {savedSection === 'skills' ? <span className="text-sm font-semibold text-emerald-600">Saved</span> : null}
              </div>

              <div className="grid gap-4 sm:grid-cols-[minmax(0,1fr)_180px_auto]">
                <input
                  className="input-shell"
                  value={skillName}
                  onChange={(event) => setSkillName(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' || event.key === ',') {
                      event.preventDefault();
                      addSkill(skillName);
                    }
                  }}
                  placeholder="Add a skill and press Enter"
                />
                <select className="input-shell" value={skillLevel} onChange={(event) => setSkillLevel(event.target.value)}>
                  {['Beginner', 'Intermediate', 'Advanced', 'Expert'].map((level) => <option key={level} value={level}>{level}</option>)}
                </select>
                <button type="button" onClick={() => addSkill(skillName)} className="btn-secondary">Add Skill</button>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {POPULAR_SKILLS.map((item) => (
                  <button key={item} type="button" onClick={() => addSkill(item)} className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 transition hover:border-blue-200 hover:text-blue-700">
                    {item}
                  </button>
                ))}
              </div>

              <div className="mt-5 flex flex-wrap gap-3">
                {skills.map((skill) => (
                  <div key={skill.name} className="flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-2">
                    <span className="text-sm font-semibold text-blue-700">{skill.name}</span>
                    <select
                      className="rounded-full border border-blue-200 bg-white px-2 py-1 text-xs font-semibold text-slate-600"
                      value={skill.level}
                      onChange={(event) => setSkills((current) => current.map((item) => item.name === skill.name ? { ...item, level: event.target.value } : item))}
                    >
                      {['Beginner', 'Intermediate', 'Advanced', 'Expert'].map((level) => <option key={level} value={level}>{level}</option>)}
                    </select>
                    <button type="button" onClick={() => setSkills((current) => current.filter((item) => item.name !== skill.name))} className="text-xs font-bold text-slate-400 hover:text-red-600">
                      X
                    </button>
                  </div>
                ))}
              </div>

              <div className="mt-5">
                <button type="button" onClick={handleSkillsSave} className="btn-primary">
                  <Save size={16} />
                  Save Skills
                </button>
              </div>
            </section>

            <section id="certifications" className="surface-card p-6">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <h2 className="font-['Sora'] text-2xl font-bold text-slate-950">Certifications</h2>
                  <p className="mt-1 text-sm text-slate-500">Optional, but useful if you want to show verified credentials.</p>
                </div>
                {savedSection === 'certifications' ? <span className="text-sm font-semibold text-emerald-600">Saved</span> : null}
              </div>

              <form onSubmit={handleCertificationSubmit} className="rounded-[28px] border border-slate-200 bg-slate-50 p-5">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="label-shell">Certification Name</label>
                    <input className="input-shell" value={certificationForm.name} onChange={(event) => setCertificationForm((current) => ({ ...current, name: event.target.value }))} required />
                  </div>
                  <div>
                    <label className="label-shell">Issuing Organization</label>
                    <input className="input-shell" value={certificationForm.issuingOrganization} onChange={(event) => setCertificationForm((current) => ({ ...current, issuingOrganization: event.target.value }))} />
                  </div>
                  <div>
                    <label className="label-shell">Issue Month</label>
                    <input type="number" min="1" max="12" className="input-shell" value={certificationForm.issueMonth} onChange={(event) => setCertificationForm((current) => ({ ...current, issueMonth: event.target.value }))} />
                  </div>
                  <div>
                    <label className="label-shell">Issue Year</label>
                    <input type="number" className="input-shell" value={certificationForm.issueYear} onChange={(event) => setCertificationForm((current) => ({ ...current, issueYear: event.target.value }))} />
                  </div>
                  <div className="flex items-center gap-3 pt-8 sm:col-span-2">
                    <input
                      id="cert-no-expiry"
                      type="checkbox"
                      checked={certificationForm.doesNotExpire}
                      onChange={(event) => setCertificationForm((current) => ({ ...current, doesNotExpire: event.target.checked }))}
                      className="h-4 w-4 rounded border-slate-300 text-blue-600"
                    />
                    <label htmlFor="cert-no-expiry" className="text-sm font-medium text-slate-700">This credential does not expire</label>
                  </div>
                  {!certificationForm.doesNotExpire && (
                    <>
                      <div>
                        <label className="label-shell">Expiry Month</label>
                        <input type="number" min="1" max="12" className="input-shell" value={certificationForm.expiryMonth} onChange={(event) => setCertificationForm((current) => ({ ...current, expiryMonth: event.target.value }))} />
                      </div>
                      <div>
                        <label className="label-shell">Expiry Year</label>
                        <input type="number" className="input-shell" value={certificationForm.expiryYear} onChange={(event) => setCertificationForm((current) => ({ ...current, expiryYear: event.target.value }))} />
                      </div>
                    </>
                  )}
                  <div>
                    <label className="label-shell">Credential ID</label>
                    <input className="input-shell" value={certificationForm.credentialId} onChange={(event) => setCertificationForm((current) => ({ ...current, credentialId: event.target.value }))} />
                  </div>
                  <div>
                    <label className="label-shell">Credential URL</label>
                    <input className="input-shell" value={certificationForm.credentialUrl} onChange={(event) => setCertificationForm((current) => ({ ...current, credentialUrl: event.target.value }))} />
                  </div>
                </div>

                <div className="mt-5 flex flex-wrap items-center gap-3">
                  <button type="submit" className="btn-primary">
                    <Save size={16} />
                    {editingCertId ? 'Update Certification' : 'Add Certification'}
                  </button>
                  {editingCertId ? (
                    <button type="button" onClick={() => { setEditingCertId(''); setCertificationForm(emptyCertification); }} className="btn-secondary">
                      Cancel
                    </button>
                  ) : null}
                </div>
              </form>

              <div className="mt-5 space-y-4">
                {certifications.map((certification) => (
                  <div key={certification._id} className="rounded-[28px] border border-slate-200 bg-white p-5">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <h4 className="text-lg font-bold text-slate-950">{certification.name}</h4>
                        <p className="mt-1 text-sm text-slate-600">{certification.issuingOrganization || 'Organization not specified'}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button type="button" onClick={() => { setEditingCertId(certification._id); setCertificationForm({ ...emptyCertification, ...certification, issueMonth: certification.issueMonth?.toString() || '', issueYear: certification.issueYear?.toString() || '', expiryMonth: certification.expiryMonth?.toString() || '', expiryYear: certification.expiryYear?.toString() || '' }); scrollToSection('certifications'); }} className="btn-secondary">Edit</button>
                        <button type="button" onClick={() => handleCertificationDelete(certification._id)} className="rounded-full border border-red-200 bg-red-50 px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-100">Delete</button>
                      </div>
                    </div>
                    {certification.credentialUrl ? (
                      <a href={certification.credentialUrl} target="_blank" rel="noreferrer" className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:underline">
                        <LinkIcon size={14} />
                        Open credential
                      </a>
                    ) : null}
                  </div>
                ))}
              </div>
            </section>

            <section id="languages" className="surface-card p-6">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <h2 className="font-['Sora'] text-2xl font-bold text-slate-950">Languages</h2>
                  <p className="mt-1 text-sm text-slate-500">List the languages you can work in confidently.</p>
                </div>
                {savedSection === 'languages' ? <span className="text-sm font-semibold text-emerald-600">Saved</span> : null}
              </div>

              <div className="grid gap-4 sm:grid-cols-[minmax(0,1fr)_220px_auto]">
                <input className="input-shell" value={languageName} onChange={(event) => setLanguageName(event.target.value)} placeholder="Add a language" />
                <select className="input-shell" value={languageProficiency} onChange={(event) => setLanguageProficiency(event.target.value)}>
                  {['Elementary', 'Conversational', 'Professional', 'Native'].map((level) => <option key={level} value={level}>{level}</option>)}
                </select>
                <button type="button" onClick={() => addLanguage(languageName)} className="btn-secondary">Add Language</button>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {COMMON_LANGUAGES.map((item) => (
                  <button key={item} type="button" onClick={() => addLanguage(item)} className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 transition hover:border-blue-200 hover:text-blue-700">
                    {item}
                  </button>
                ))}
              </div>

              <div className="mt-5 flex flex-wrap gap-3">
                {languages.map((language) => (
                  <div key={language.language} className="flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-2">
                    <span className="text-sm font-semibold text-blue-700">{language.language}</span>
                    <select
                      className="rounded-full border border-blue-200 bg-white px-2 py-1 text-xs font-semibold text-slate-600"
                      value={language.proficiency}
                      onChange={(event) => setLanguages((current) => current.map((item) => item.language === language.language ? { ...item, proficiency: event.target.value } : item))}
                    >
                      {['Elementary', 'Conversational', 'Professional', 'Native'].map((level) => <option key={level} value={level}>{level}</option>)}
                    </select>
                    <button type="button" onClick={() => setLanguages((current) => current.filter((item) => item.language !== language.language))} className="text-xs font-bold text-slate-400 hover:text-red-600">
                      X
                    </button>
                  </div>
                ))}
              </div>

              <div className="mt-5">
                <button type="button" onClick={handleLanguagesSave} className="btn-primary">
                  <Save size={16} />
                  Save Languages
                </button>
              </div>
            </section>

            <section id="compensation" className="surface-card p-6">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <h2 className="font-['Sora'] text-2xl font-bold text-slate-950">Compensation & Availability</h2>
                  <p className="mt-1 text-sm text-slate-500">Recruiters use this to match you with relevant opportunities.</p>
                </div>
                {savedSection === 'compensation' ? <span className="text-sm font-semibold text-emerald-600">Saved</span> : null}
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <div>
                  <label className="label-shell">Current CTC (LPA)</label>
                  <input type="number" className="input-shell" value={compensationForm.currentCTC} onChange={(event) => setCompensationForm((current) => ({ ...current, currentCTC: event.target.value }))} />
                </div>
                <div>
                  <label className="label-shell">Expected CTC (LPA)</label>
                  <input type="number" className="input-shell" value={compensationForm.expectedCTC} onChange={(event) => setCompensationForm((current) => ({ ...current, expectedCTC: event.target.value }))} />
                </div>
                <div>
                  <label className="label-shell">Notice Period (days)</label>
                  <input type="number" className="input-shell" value={compensationForm.noticePeriod} onChange={(event) => setCompensationForm((current) => ({ ...current, noticePeriod: event.target.value }))} />
                </div>
              </div>

              <div className="mt-5">
                <button type="button" onClick={handleCompensationSave} className="btn-primary">
                  <Save size={16} />
                  Save Compensation
                </button>
              </div>
            </section>

            <section id="links" className="surface-card p-6">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <h2 className="font-['Sora'] text-2xl font-bold text-slate-950">Links & Presence</h2>
                  <p className="mt-1 text-sm text-slate-500">Add your public profiles and portfolio links.</p>
                </div>
                {savedSection === 'links' ? <span className="text-sm font-semibold text-emerald-600">Saved</span> : null}
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="label-shell">LinkedIn URL</label>
                  <input className="input-shell" value={linksForm.linkedinUrl} onChange={(event) => setLinksForm((current) => ({ ...current, linkedinUrl: event.target.value }))} />
                </div>
                <div>
                  <label className="label-shell">GitHub URL</label>
                  <input className="input-shell" value={linksForm.githubUrl} onChange={(event) => setLinksForm((current) => ({ ...current, githubUrl: event.target.value }))} />
                </div>
                <div className="sm:col-span-2">
                  <label className="label-shell">Portfolio / Website</label>
                  <input className="input-shell" value={linksForm.portfolioUrl} onChange={(event) => setLinksForm((current) => ({ ...current, portfolioUrl: event.target.value }))} />
                </div>
              </div>

              <div className="mt-5 space-y-3">
                {linksForm.otherLinks.map((item, index) => (
                  <div key={`${item.label}-${index}`} className="grid gap-3 sm:grid-cols-[180px_minmax(0,1fr)_auto]">
                    <input className="input-shell" placeholder="Label" value={item.label} onChange={(event) => setLinksForm((current) => ({ ...current, otherLinks: current.otherLinks.map((entry, entryIndex) => entryIndex === index ? { ...entry, label: event.target.value } : entry) }))} />
                    <input className="input-shell" placeholder="URL" value={item.url} onChange={(event) => setLinksForm((current) => ({ ...current, otherLinks: current.otherLinks.map((entry, entryIndex) => entryIndex === index ? { ...entry, url: event.target.value } : entry) }))} />
                    <button type="button" onClick={() => setLinksForm((current) => ({ ...current, otherLinks: current.otherLinks.filter((_, entryIndex) => entryIndex !== index) }))} className="btn-secondary">Remove</button>
                  </div>
                ))}
                {linksForm.otherLinks.length < 3 ? (
                  <button type="button" onClick={() => setLinksForm((current) => ({ ...current, otherLinks: [...current.otherLinks, { label: '', url: '' }] }))} className="btn-secondary">
                    Add Other Link
                  </button>
                ) : null}
              </div>

              <div className="mt-5">
                <button type="button" onClick={handleLinksSave} className="btn-primary">
                  <Save size={16} />
                  Save Links
                </button>
              </div>
            </section>

            <section id="resume" className="surface-card p-6">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <h2 className="font-['Sora'] text-2xl font-bold text-slate-950">Resume & Photo</h2>
                  <p className="mt-1 text-sm text-slate-500">Your saved resume can be reused when you apply to jobs.</p>
                </div>
                {savedSection === 'resume' ? <span className="text-sm font-semibold text-emerald-600">Saved</span> : null}
              </div>

              <div className="grid gap-6 lg:grid-cols-[220px_minmax(0,1fr)]">
                <div className="rounded-[28px] border border-slate-200 bg-slate-50 p-5 text-center">
                  <div className="mx-auto flex h-28 w-28 items-center justify-center overflow-hidden rounded-full bg-blue-50 text-3xl font-bold text-blue-700">
                    {profile?.profilePhotoUrl ? (
                      <img src={profile.profilePhotoUrl} alt={applicant?.firstName || 'Applicant'} className="h-full w-full object-cover" />
                    ) : (
                      <span>{applicant?.firstName?.charAt(0)?.toUpperCase() || 'A'}</span>
                    )}
                  </div>
                  <label className="btn-secondary mt-5 cursor-pointer">
                    <Camera size={16} />
                    Upload Photo
                    <input type="file" accept="image/*" className="hidden" onChange={handlePhotoUpload} />
                  </label>
                </div>

                <div className="rounded-[28px] border border-slate-200 bg-white p-5">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">Saved Resume</p>
                      <h3 className="mt-2 text-lg font-bold text-slate-950">
                        {profile?.resumeFileName || 'No resume uploaded yet'}
                      </h3>
                      {profile?.resumeUpdatedAt ? (
                        <p className="mt-2 text-sm text-slate-500">Updated {formatDate(profile.resumeUpdatedAt)}</p>
                      ) : (
                        <p className="mt-2 text-sm text-slate-500">Uploading a resume unlocks faster applications.</p>
                      )}
                    </div>
                    {profile?.resumeUrl ? (
                      <a href={profile.resumeUrl} target="_blank" rel="noreferrer" className="btn-secondary">
                        <FileText size={16} />
                        View Resume
                      </a>
                    ) : null}
                  </div>

                  <label className="btn-primary mt-5 cursor-pointer">
                    <Upload size={16} />
                    Upload / Replace Resume
                    <input type="file" accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" className="hidden" onChange={handleResumeUpload} />
                  </label>
                </div>
              </div>
            </section>
          </div>
        </div>
      </section>
    </main>
  );
}
