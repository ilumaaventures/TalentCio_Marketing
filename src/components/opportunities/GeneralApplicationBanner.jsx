import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Briefcase, Sparkles, Send, FilePlus, ChevronRight, UserPlus } from 'lucide-react';
import GeneralApplicationModal from './GeneralApplicationModal';
import { useApplicantAuth } from '../../context/ApplicantAuthContext';

export default function GeneralApplicationBanner({
  variant = 'card', // 'card' | 'sidebar' | 'empty-state'
  title = "Don't see your relevant job opening?",
  subtitle = "Tell us which position you want to fill, share your details, and submit your resume. We will match your profile with upcoming openings."
}) {
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoggedIn } = useApplicantAuth();

  const handleCloseModal = () => {
    setModalOpen(false);
    // Clear openApplication state if still in location state
    if (location.state?.openApplication) {
      const newState = { ...location.state };
      delete newState.openApplication;
      navigate(`${location.pathname}${location.search}${location.hash}`, {
        replace: true,
        state: newState
      });
    }
  };

  // Auto-open application modal if candidate redirected back after login
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const hasSearchFlag = searchParams.get('openApplication') === 'true';
    const hasStateFlag = Boolean(location.state?.openApplication);

    if (isLoggedIn && (hasStateFlag || hasSearchFlag)) {
      // Prevent duplicate auto-open across multiple banner instances mounted on the same page
      if (window._generalAppModalAutoOpened) {
        return;
      }
      window._generalAppModalAutoOpened = true;

      setModalOpen(true);

      // Clean up history state and query params immediately to prevent reopening on back navigation
      const newState = { ...location.state };
      delete newState.openApplication;

      if (hasSearchFlag) {
        searchParams.delete('openApplication');
      }
      const newSearch = searchParams.toString() ? `?${searchParams.toString()}` : '';

      navigate(`${location.pathname}${newSearch}${location.hash}`, {
        replace: true,
        state: newState
      });

      // Reset global guard after brief delay
      setTimeout(() => {
        window._generalAppModalAutoOpened = false;
      }, 800);
    }
  }, [isLoggedIn, location, navigate]);

  const handleOpenModal = () => {
    if (!isLoggedIn) {
      navigate('/applicant/login', {
        state: {
          from: `${location.pathname}${location.search}${location.hash}`,
          openApplication: true
        }
      });
      return;
    }
    setModalOpen(true);
  };

  // Variant for Left Sidebar (under Department field)
  if (variant === 'sidebar') {
    return (
      <div className="mt-6 rounded-2xl border border-blue-100 bg-gradient-to-b from-blue-50/60 via-white to-slate-50 p-4 transition-all duration-200 hover:border-blue-200 hover:shadow-md">
        <div className="flex items-center gap-2 text-blue-700">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-100 text-blue-700 shadow-sm">
            <UserPlus size={16} />
          </div>
          <span className="text-xs font-bold uppercase tracking-wider text-blue-800">
            Unlisted Position?
          </span>
        </div>

        <h3 className="mt-2.5 text-sm font-bold text-slate-900">
          Can't find your desired role?
        </h3>

        <p className="mt-1 text-xs leading-relaxed text-slate-600">
          Submit your details, resume & specify which position you want to fill.
        </p>

        <button
          type="button"
          onClick={handleOpenModal}
          className="mt-3.5 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-3.5 py-2.5 text-xs font-semibold text-white shadow-sm transition-all hover:bg-blue-700 active:scale-[0.98]"
        >
          <FilePlus size={14} />
          Fill Details & Resume
        </button>

        <GeneralApplicationModal
          isOpen={modalOpen}
          onClose={handleCloseModal}
        />
      </div>
    );
  }

  // Variant for Empty Search Results State
  if (variant === 'empty-state') {
    return (
      <div className="mt-8 flex flex-col items-center rounded-[32px] border border-slate-200 bg-white p-8 text-center sm:p-12 shadow-sm">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 border border-blue-100 shadow-sm">
          <Briefcase size={30} />
        </div>

        <span className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3.5 py-1 text-xs font-bold text-blue-700 border border-blue-100">
          <Sparkles size={13} />
          Unlisted Role Application
        </span>

        <h3 className="mt-3 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
          {title}
        </h3>

        <p className="mt-3 max-w-xl text-sm leading-relaxed text-slate-600">
          {subtitle}
        </p>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
          <button
            type="button"
            onClick={handleOpenModal}
            className="btn-primary py-3.5 px-7 text-sm font-semibold inline-flex items-center gap-2.5 shadow-md shadow-blue-600/10 hover:scale-[1.02] active:scale-[0.98] transition"
          >
            <FilePlus size={18} />
            Fill Details & Submit Resume
          </button>
        </div>

        <GeneralApplicationModal
          isOpen={modalOpen}
          onClose={handleCloseModal}
        />
      </div>
    );
  }

  // Default Card variant for page sections
  return (
    <div className="relative overflow-hidden rounded-[32px] border border-slate-200 bg-white p-8 text-slate-900 shadow-xl shadow-slate-900/5 sm:p-10">
      <div className="relative z-10 flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3.5 py-1 text-xs font-bold text-blue-700">
            <Sparkles size={13} />
            Open Talent Network
          </div>

          <h3 className="mt-3 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl lg:text-4xl">
            {title}
          </h3>

          <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
            {subtitle}
          </p>
        </div>

        <div className="shrink-0 w-full sm:w-auto">
          <button
            type="button"
            onClick={handleOpenModal}
            className="btn-primary w-full sm:w-auto py-4 px-8 text-base font-semibold inline-flex items-center justify-center gap-3 rounded-2xl shadow-lg shadow-blue-600/15 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
          >
            <Send size={18} />
            Fill Details & Submit Resume
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      <GeneralApplicationModal
        isOpen={modalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
}
