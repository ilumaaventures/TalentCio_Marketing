import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, Sparkles, Volume2, VolumeX, X } from 'lucide-react';
import AssistantActions from './AssistantActions';
import AssistantBubble from './AssistantBubble';
import useAssistant from './useAssistant';
import AssistantAvatar from './animations/AssistantAvatar';

export default function Assistant() {
  const {
    actions,
    activeSection,
    canUseVoice,
    dismissAssistant,
    handleAction,
    hasNotification,
    isTyping,
    isVisible,
    memory,
    message,
    minimizeAssistant,
    openAssistant,
    panelState,
    pendingActionId,
    setHasNotification,
    setIsTyping,
    suggestedAction,
    toggleVoice,
    voiceEnabled
  } = useAssistant();

  if (!isVisible) {
    return null;
  }

  if (panelState === 'hidden') {
    return (
      <div className="pointer-events-none fixed bottom-4 right-4 z-[70] sm:bottom-6 sm:right-6">
        <motion.button
          type="button"
          onClick={openAssistant}
          initial={{ opacity: 0, y: 18, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          className="pointer-events-auto inline-flex items-center gap-3 rounded-full border border-white/60 bg-white/85 px-4 py-3 text-sm font-semibold text-slate-700 shadow-[0_24px_55px_-30px_rgba(15,23,42,0.45)] backdrop-blur-xl"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-950 text-white">
            <Sparkles size={18} />
          </span>
          Reopen Guide
        </motion.button>
      </div>
    );
  }

  const isExpanded = panelState === 'expanded';

  return (
    <div className="pointer-events-none fixed bottom-4 right-4 z-[70] flex max-w-[calc(100vw-1.5rem)] justify-end sm:bottom-6 sm:right-6 sm:max-w-[420px]">
      <div className="pointer-events-auto flex w-full flex-col items-end gap-3">
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, y: 22, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 18, scale: 0.98 }}
              transition={{ duration: 0.28, ease: 'easeOut' }}
              className="flex max-h-[calc(100dvh-8rem)] w-full flex-col overflow-hidden rounded-[32px] border border-white/55 bg-[linear-gradient(145deg,rgba(255,255,255,0.8),rgba(241,247,255,0.7))] p-4 shadow-[0_35px_85px_-44px_rgba(15,23,42,0.7)] backdrop-blur-2xl sm:max-h-[calc(100dvh-9rem)] sm:p-5"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.2em] text-blue-700">
                    <Sparkles size={12} />
                    Website Assistant
                  </p>
                  <h2 className="mt-3 text-lg font-bold text-slate-950">
                    {activeSection?.label || 'Interactive Guide'}
                  </h2>
                  <p className="mt-1 text-sm text-slate-500">
                    Scroll-aware onboarding, highlights, and quick jumps.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  {canUseVoice && (
                    <button
                      type="button"
                      onClick={toggleVoice}
                      className={`inline-flex h-11 w-11 items-center justify-center rounded-2xl border transition ${
                        voiceEnabled
                          ? 'border-blue-200 bg-blue-50 text-blue-700'
                          : 'border-white/60 bg-white/70 text-slate-500'
                      }`}
                      aria-label={voiceEnabled ? 'Turn voice off' : 'Turn voice on'}
                    >
                      {voiceEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={minimizeAssistant}
                    className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/60 bg-white/70 text-slate-500 transition hover:text-slate-900"
                    aria-label="Minimize assistant"
                  >
                    <ChevronDown size={18} />
                  </button>

                  <button
                    type="button"
                    onClick={dismissAssistant}
                    className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/60 bg-white/70 text-slate-500 transition hover:text-red-600"
                    aria-label="Close assistant"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>

              <div className="mt-4 min-h-0 flex-1 overflow-y-auto pr-1 scrollbar-hidden">
                <AssistantBubble
                  activeSection={activeSection}
                  isTyping={isTyping}
                  memory={memory}
                  message={message}
                  onTypingComplete={() => setIsTyping(false)}
                />

                <div className="mt-4">
                  <AssistantActions
                    actions={actions}
                    onAction={(action) => {
                      setHasNotification(false);
                      handleAction(action);
                    }}
                    pendingActionId={pendingActionId}
                    suggestedAction={suggestedAction}
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex items-end gap-3">
          {!isExpanded && (
            <motion.button
              type="button"
              onClick={openAssistant}
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              className="hidden rounded-full border border-white/60 bg-white/80 px-4 py-3 text-sm font-semibold text-slate-700 shadow-[0_20px_45px_-28px_rgba(15,23,42,0.45)] backdrop-blur-xl sm:inline-flex"
            >
              Open Guide
            </motion.button>
          )}

          <div className="relative">
            <AssistantAvatar
              isMinimized={!isExpanded}
              isSpeaking={isTyping}
              onClick={isExpanded ? minimizeAssistant : openAssistant}
              voiceEnabled={voiceEnabled}
            />

            {hasNotification && !isExpanded && (
              <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-400 opacity-75" />
                <span className="relative inline-flex h-4 w-4 rounded-full border border-white bg-orange-500" />
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
