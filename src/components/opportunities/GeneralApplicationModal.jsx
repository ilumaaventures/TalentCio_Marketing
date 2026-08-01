import React, { useEffect } from 'react';
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

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto p-4 sm:p-6">
          {/* Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="relative w-full max-w-2xl max-h-[90vh] flex flex-col rounded-[28px] border border-white/60 bg-white shadow-2xl overflow-hidden z-10"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/80 px-6 py-4 sm:px-8">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-md shadow-blue-500/20">
                  <Briefcase size={20} />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-900 sm:text-xl">
                    Submit Candidate Application
                  </h2>
                  <p className="text-xs text-slate-500">
                    Tell us which position you want to fill & upload your details
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
                aria-label="Close dialog"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Content - Scrollable Form Body */}
            <div className="overflow-y-auto p-6 sm:p-8 scrollbar-hidden">
              <GeneralApplicationForm
                defaultPosition={defaultPosition}
                onSuccess={onClose}
                onCancel={onClose}
              />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
