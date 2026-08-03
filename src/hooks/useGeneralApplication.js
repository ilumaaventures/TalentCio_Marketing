import { useState, useEffect } from 'react';
import { useApplicantAuth } from '../context/ApplicantAuthContext';
import { submitGeneralApplication } from '../api/generalApplicationApi';
import applicantApi from '../api/applicantApi';

const INITIAL_FORM = {
  desiredPosition: '',
  candidateName: '',
  email: '',
  mobile: '',
  currentCompany: '',
  totalExperienceYears: '',
  currentCTC: '',
  expectedCTC: '',
  noticePeriod: '',
  preferredLocation: '',
  coverNote: '',
  useProfileResume: false
};

export default function useGeneralApplication(defaultPosition = '') {
  const { applicant, isLoggedIn } = useApplicantAuth();
  
  const [formData, setFormData] = useState({
    ...INITIAL_FORM,
    desiredPosition: defaultPosition
  });
  const [resumeFile, setResumeFile] = useState(null);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [alreadyAppliedWarning, setAlreadyAppliedWarning] = useState(null);

  // Auto-fill logged in applicant profile info & lock email
  useEffect(() => {
    if (isLoggedIn && applicant) {
      const fullName = [applicant.firstName, applicant.lastName].filter(Boolean).join(' ');
      setFormData((prev) => ({
        ...prev,
        candidateName: prev.candidateName || fullName,
        email: applicant.email || '',
        mobile: prev.mobile || applicant.mobile || '',
        currentCTC: prev.currentCTC || (applicant.currentCTC ? String(applicant.currentCTC) : ''),
        expectedCTC: prev.expectedCTC || (applicant.expectedCTC ? String(applicant.expectedCTC) : ''),
        noticePeriod: prev.noticePeriod || (applicant.noticePeriod !== undefined ? String(applicant.noticePeriod) : ''),
        useProfileResume: Boolean(applicant.resumeUrl)
      }));
    } else {
      setFormData((prev) => ({ ...prev, email: '' }));
    }
  }, [isLoggedIn, applicant]);

  useEffect(() => {
    if (defaultPosition) {
      setFormData((prev) => ({ ...prev, desiredPosition: defaultPosition }));
    }
  }, [defaultPosition]);

  // Pre-check: if logged in, check if a general application was submitted within 3 months
  useEffect(() => {
    if (!isLoggedIn) {
      setAlreadyAppliedWarning(null);
      return;
    }
    applicantApi.get('/my-applications')
      .then(res => {
        const apps = res.data?.applications || [];
        const threeMonthsAgo = new Date();
        threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
        const recentGeneral = apps.find(a => !a.hiringRequestId && new Date(a.createdAt) >= threeMonthsAgo);
        if (recentGeneral) {
          const dateStr = new Date(recentGeneral.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
          setAlreadyAppliedWarning(`Your application was submitted on ${dateStr}. You can re-apply after 3 months.`);
        } else {
          setAlreadyAppliedWarning(null);
        }
      })
      .catch(() => {});
  }, [isLoggedIn]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    // Candidate cannot edit email if logged in
    if (name === 'email' && isLoggedIn) {
      return;
    }

    if (name === 'mobile') {
      const sanitized = value.replace(/\D/g, '').slice(0, 10);
      setFormData((prev) => ({ ...prev, mobile: sanitized }));
      if (errors.mobile) {
        setErrors((prev) => ({ ...prev, mobile: null }));
      }
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleFileChange = (file) => {
    if (!file) return;
    
    // Validate file type (PDF, DOC, DOCX) and size (< 5MB)
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    const maxSizeBytes = 5 * 1024 * 1024; // 5MB

    if (!allowedTypes.includes(file.type) && !file.name.match(/\.(pdf|doc|docx)$/i)) {
      setErrors((prev) => ({ ...prev, resume: 'Only PDF, DOC, and DOCX files are allowed.' }));
      return;
    }

    if (file.size > maxSizeBytes) {
      setErrors((prev) => ({ ...prev, resume: 'File size must be less than 5MB.' }));
      return;
    }

    setResumeFile(file);
    setFormData((prev) => ({ ...prev, useProfileResume: false }));
    setErrors((prev) => ({ ...prev, resume: null }));
  };

  const validate = () => {
    const newErrors = {};

    const token = localStorage.getItem('applicant_token');
    if (!isLoggedIn || !token) {
      setError('Please log in first to submit your candidate application.');
      newErrors.auth = 'Please log in first to submit your candidate application.';
      setErrors(newErrors);
      return false;
    }

    if (!formData.desiredPosition?.trim()) {
      newErrors.desiredPosition = 'Please specify the position you want to fill.';
    }

    if (!formData.candidateName?.trim()) {
      newErrors.candidateName = 'Full name is required.';
    }

    const currentEmail = applicant?.email || formData.email;
    if (!currentEmail?.trim()) {
      newErrors.email = 'Email address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(currentEmail.trim())) {
      newErrors.email = 'Please enter a valid email address.';
    }

    const mobileDigits = (formData.mobile || '').replace(/\D/g, '');
    if (!mobileDigits) {
      newErrors.mobile = 'Mobile phone number is required.';
    } else if (mobileDigits.length !== 10) {
      newErrors.mobile = 'Mobile phone number must be exactly 10 digits.';
    }

    if (!formData.useProfileResume && !resumeFile) {
      newErrors.resume = 'Please attach your resume file.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();

    setError(null);
    setSuccessMessage(null);

    if (!validate()) {
      return false;
    }

    setLoading(true);

    try {
      const data = new FormData();
      data.append('desiredPosition', formData.desiredPosition.trim());
      data.append('candidateName', formData.candidateName.trim());
      data.append('email', formData.email.trim().toLowerCase());
      data.append('mobile', formData.mobile.trim());

      if (formData.currentCompany) data.append('currentCompany', formData.currentCompany.trim());
      if (formData.totalExperienceYears) data.append('totalExperienceYears', formData.totalExperienceYears);
      if (formData.currentCTC) data.append('currentCTC', formData.currentCTC);
      if (formData.expectedCTC) data.append('expectedCTC', formData.expectedCTC);
      if (formData.noticePeriod) data.append('noticePeriod', formData.noticePeriod);
      if (formData.preferredLocation) data.append('preferredLocation', formData.preferredLocation);
      if (formData.coverNote) data.append('coverNote', formData.coverNote);

      if (formData.useProfileResume && applicant?.resumeUrl) {
        data.append('useProfileResume', 'true');
        data.append('profileResumeUrl', applicant.resumeUrl);
        if (applicant.resumePublicId) {
          data.append('profileResumePublicId', applicant.resumePublicId);
        }
      } else if (resumeFile) {
        data.append('resume', resumeFile);
      }

      const res = await submitGeneralApplication(data);
      setSuccessMessage(res.message || 'Application submitted successfully!');
      setIsSubmitted(true);
      return true;
    } catch (err) {
      if (err.response?.data?.alreadyApplied) {
        setAlreadyAppliedWarning(err.response.data.message);
      } else {
        const msg = err.response?.data?.message || err.message || 'Failed to submit application. Please try again.';
        setError(msg);
      }
      return false;
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      ...INITIAL_FORM,
      desiredPosition: defaultPosition
    });
    setResumeFile(null);
    setErrors({});
    setError(null);
    setSuccessMessage(null);
    setIsSubmitted(false);
    setAlreadyAppliedWarning(null);
  };

  return {
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
    setFormData
  };
}
