import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Sparkles, X, Briefcase } from 'lucide-react';
import GeneralApplicationForm from './GeneralApplicationForm';

export default function GeneralApplicationModal({
  isOpen,
  onClose,
  defaultPosition = ''
}) {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (typeof document === 'undefined') return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 overflow-hidden">
          {/* Full-screen Dark Gray Overlay - Less Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-[2px] transition-opacity"
          />

          {/* Modal Container - Centered & Scrollable */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 12 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 flex flex-col w-full max-w-2xl max-h-[85vh] sm:max-h-[90vh] my-auto rounded-3xl border border-slate-200 bg-white shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Accent Bar */}
            <div className="h-1.5 w-full shrink-0 bg-gradient-to-r from-[#ea7c00] via-amber-500 to-[#d47000]" />

            {/* Modal Header */}
            <div className="flex shrink-0 items-center justify-between border-b border-slate-100 bg-slate-50/90 px-6 py-4 sm:px-8">
              <div className="flex items-center gap-3.5">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#ea7c00] text-white shadow-md shadow-[#ea7c00]/20">
                  <Briefcase size={22} />
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h2 className="text-lg font-bold text-slate-950 sm:text-xl">
                      Submit Candidate Application
                    </h2>
                    <span className="hidden sm:inline-flex items-center gap-1 rounded-full bg-[#fff6ee] border border-[#ea7c00]/20 px-2.5 py-0.5 text-[11px] font-bold text-[#ea7c00]">
                      <Sparkles size={11} /> Open Talent Network
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Specify your target role & share your profile details with our hiring team
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 active:scale-95"
                aria-label="Close dialog"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Content Body - Scrollable */}
            <div className="flex-1 min-h-0 overflow-y-auto p-6 sm:p-8">
              <GeneralApplicationForm
                defaultPosition={defaultPosition}
                onSuccess={onClose}
                onCancel={onClose}
              />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}
