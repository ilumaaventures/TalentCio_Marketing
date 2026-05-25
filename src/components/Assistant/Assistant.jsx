import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, Sparkles, X } from 'lucide-react';
import AssistantActions from './AssistantActions';
import AssistantBubble from './AssistantBubble';
import useAssistant from './useAssistant';
import AssistantAvatar from './animations/AssistantAvatar';

const RESIZE_STORAGE_KEY = 'talentcio-assistant-panel-size';

function getViewportBounds() {
  if (typeof window === 'undefined') {
    return {
      minWidth: 360,
      maxWidth: 620,
      minHeight: 460,
      maxHeight: 820
    };
  }

  const maxWidth = Math.min(620, window.innerWidth - 24);
  const maxHeight = Math.min(820, window.innerHeight - 24);

  return {
    minWidth: Math.min(360, maxWidth),
    maxWidth,
    minHeight: Math.min(460, maxHeight),
    maxHeight
  };
}

function clampSize(size) {
  const bounds = getViewportBounds();

  return {
    width: Math.min(Math.max(size.width, bounds.minWidth), bounds.maxWidth),
    height: Math.min(Math.max(size.height, bounds.minHeight), bounds.maxHeight)
  };
}

function readStoredSize() {
  if (typeof window === 'undefined') {
    return {
      size: clampSize({ width: 448, height: 560 })
    };
  }

  try {
    const rawValue = window.localStorage.getItem(RESIZE_STORAGE_KEY);

    if (!rawValue) {
      return {
        size: clampSize({ width: 448, height: 560 })
      };
    }

    const parsed = JSON.parse(rawValue);
    return {
      size: clampSize({
        width: Number(parsed?.width) || 448,
        height: Number(parsed?.height) || 560
      })
    };
  } catch {
    return {
      size: clampSize({ width: 448, height: 560 })
    };
  }
}

export default function Assistant() {
  const initialPanelStateRef = useRef(readStoredSize());
  const [panelDimensions, setPanelDimensions] = useState(() => initialPanelStateRef.current.size);
  const [isResizing, setIsResizing] = useState(false);
  const resizeStateRef = useRef(null);
  const {
    actions,
    activeSection,
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
    suggestedAction
  } = useAssistant();

  useEffect(() => {
    const handleViewportResize = () => {
      setPanelDimensions((current) => clampSize(current));
    };

    window.addEventListener('resize', handleViewportResize);
    return () => window.removeEventListener('resize', handleViewportResize);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    window.localStorage.setItem(
      RESIZE_STORAGE_KEY,
      JSON.stringify({
        width: panelDimensions.width,
        height: panelDimensions.height
      })
    );
  }, [panelDimensions.height, panelDimensions.width]);

  useEffect(() => {
    if (!isResizing) {
      document.body.style.removeProperty('user-select');
      document.body.style.removeProperty('cursor');
      return undefined;
    }

    document.body.style.setProperty('user-select', 'none');
    document.body.style.setProperty('cursor', 'nesw-resize');

    const handlePointerMove = (event) => {
      if (!resizeStateRef.current) {
        return;
      }

      const deltaX = resizeStateRef.current.startX - event.clientX;
      const deltaY = resizeStateRef.current.startY - event.clientY;
      const nextSize = clampSize({
        width: resizeStateRef.current.startWidth + deltaX,
        height: resizeStateRef.current.startHeight + deltaY
      });

      setPanelDimensions(nextSize);
    };

    const stopResizing = () => {
      resizeStateRef.current = null;
      setIsResizing(false);
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', stopResizing);
    window.addEventListener('pointercancel', stopResizing);

    return () => {
      document.body.style.removeProperty('user-select');
      document.body.style.removeProperty('cursor');
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', stopResizing);
      window.removeEventListener('pointercancel', stopResizing);
    };
  }, [isResizing]);

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
          className="pointer-events-auto inline-flex items-center gap-3 rounded-[24px] border border-slate-200/80 bg-white px-4 py-3 text-left shadow-[0_24px_48px_-28px_rgba(15,23,42,0.32)]"
        >
          <span className="inline-flex h-11 w-11 items-center justify-center rounded-[18px] bg-[linear-gradient(145deg,#0f172a,#2563eb)] text-white shadow-[0_14px_32px_-18px_rgba(37,99,235,0.7)]">
            <Sparkles size={18} />
          </span>
          <span>
            <span className="block text-[10px] font-bold uppercase tracking-[0.24em] text-slate-400">Assistant</span>
            <span className="mt-0.5 block text-sm font-semibold text-slate-900">Open Concierge</span>
          </span>
        </motion.button>
      </div>
    );
  }

  const isExpanded = panelState === 'expanded';

  const startResizing = (event) => {
    event.preventDefault();
    event.stopPropagation();

    resizeStateRef.current = {
      startX: event.clientX,
      startY: event.clientY,
      startWidth: panelDimensions.width,
      startHeight: panelDimensions.height
    };

    setIsResizing(true);
  };

  return (
    <div className="pointer-events-none fixed bottom-4 right-4 z-[70] flex max-w-[calc(100vw-1.5rem)] justify-end sm:bottom-6 sm:right-6">
      <div className="pointer-events-auto flex w-full flex-col items-end gap-3">
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 18, scale: 0.98 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="relative overflow-hidden rounded-[30px] border border-slate-200 bg-white shadow-[0_38px_90px_-46px_rgba(15,23,42,0.55)]"
              style={{
                width: `${panelDimensions.width}px`,
                height: `${panelDimensions.height}px`,
                maxWidth: 'calc(100vw - 1.5rem)',
                maxHeight: 'calc(100vh - 1.5rem)'
              }}
            >
              <div className="relative flex h-full min-h-0 flex-col">
                <div className="relative overflow-hidden border-b border-slate-800/60 bg-[linear-gradient(135deg,#081225_0%,#0f172a_38%,#1d4ed8_100%)] px-5 pb-2 pt-3 text-white sm:px-6">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.14),transparent_34%),radial-gradient(circle_at_85%_15%,rgba(96,165,250,0.28),transparent_26%)]" />
                  <div className="absolute -right-10 top-2 h-20 w-20 rounded-full bg-white/10 blur-3xl" />
                  <div className="absolute -left-6 bottom-0 h-16 w-16 rounded-full bg-blue-300/10 blur-2xl" />

                  <div className="relative">
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <div className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.22em] text-blue-100 backdrop-blur-md">
                          <Sparkles size={12} />
                          TalentCIO Concierge
                        </div>

                        <div className="mt-2 flex flex-wrap items-center gap-2">
                          <h2 className="text-[1.55rem] font-bold tracking-tight text-white">
                            {activeSection?.label || 'Website Guide'}
                          </h2>
                          {/* <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em] text-slate-200"> */}
                            {/* <span className="h-2 w-2 rounded-full bg-emerald-300" /> */}
                            {/* Ready */}
                          {/* </span> */}
                        </div>

                        <p className="mt-1 max-w-sm text-[11px] leading-[1.1rem] text-slate-200/80">
                          Ask fast.
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={minimizeAssistant}
                          className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/15 bg-white/10 text-slate-100 transition hover:bg-white/15"
                          aria-label="Minimize assistant"
                        >
                          <ChevronDown size={18} />
                        </button>

                        <button
                          type="button"
                          onClick={dismissAssistant}
                          className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/15 bg-white/10 text-slate-100 transition hover:bg-white/15 hover:text-red-100"
                          aria-label="Close assistant"
                        >
                          <X size={18} />
                        </button>
                      </div>
                    </div>

                  </div>
                </div>

                <div className="min-h-0 flex-1 overflow-y-auto bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)] px-5 py-4 scrollbar-hidden sm:px-6">
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

              </div>

              <button
                type="button"
                onPointerDown={startResizing}
                className={`assistant-resize-handle absolute bottom-2 left-2 z-20 inline-flex h-9 w-9 cursor-nesw-resize touch-none select-none items-end justify-start rounded-full border border-slate-200/80 bg-white/92 p-2 text-slate-400 opacity-75 shadow-[0_16px_32px_-22px_rgba(15,23,42,0.45)] transition hover:border-blue-200 hover:text-blue-600 hover:opacity-100 ${
                  isResizing ? 'border-blue-300 text-blue-600' : ''
                }`}
                aria-label="Resize assistant panel"
              >
                <span className="pointer-events-none flex flex-col items-start gap-1">
                  <span className="h-[2px] w-4 rounded-full bg-current opacity-90" />
                  <span className="h-[2px] w-3 rounded-full bg-current opacity-75" />
                  <span className="h-[2px] w-2 rounded-full bg-current opacity-60" />
                </span>
              </button>
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
              className="hidden rounded-[20px] border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-800 shadow-[0_20px_40px_-24px_rgba(15,23,42,0.3)] sm:inline-flex"
            >
              Open Concierge
            </motion.button>
          )}

          <div className="relative">
            <AssistantAvatar
              isMinimized={!isExpanded}
              onClick={isExpanded ? minimizeAssistant : openAssistant}
            />

            {hasNotification && !isExpanded && (
              <span className="absolute -right-1 -top-1 flex h-[16px] w-[16px]">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400/80 opacity-70" />
                <span className="relative inline-flex h-[16px] w-[16px] rounded-full border-2 border-white bg-[linear-gradient(145deg,#0f172a,#2563eb)] shadow-sm" />
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
