import React, { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { MessageSquareText, Sparkles } from 'lucide-react';

export default function AssistantBubble({
  activeSection,
  isTyping,
  message,
  memory,
  onTypingComplete
}) {
  const [typedText, setTypedText] = useState('');

  const wordCount = useMemo(
    () => message?.text?.trim().split(/\s+/).filter(Boolean).length || 0,
    [message?.text]
  );

  useEffect(() => {
    if (!message?.text) {
      setTypedText('');
      return undefined;
    }

    let frame = 0;
    setTypedText('');

    const interval = window.setInterval(() => {
      frame += 1;
      setTypedText(message.text.slice(0, frame));

      if (frame >= message.text.length) {
        window.clearInterval(interval);
        onTypingComplete?.();
      }
    }, message.text.length > 180 ? 10 : 16);

    return () => window.clearInterval(interval);
  }, [message?.id, message?.text, onTypingComplete]);

  if (!message) {
    return null;
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={message.id}
        initial={{ opacity: 0, y: 20, scale: 0.985 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 14, scale: 0.99 }}
        transition={{ duration: 0.28, ease: 'easeOut' }}
        className="space-y-3"
      >
        {message.question && (
          <div className="flex justify-end">
            <div className="max-w-[88%] rounded-[22px] rounded-br-md bg-[linear-gradient(145deg,#0f172a,#1e293b)] px-4 py-3 text-sm leading-6 text-white shadow-[0_18px_36px_-24px_rgba(15,23,42,0.7)]">
              {message.question}
            </div>
          </div>
        )}

        <div className="relative overflow-hidden rounded-[26px] border border-slate-200 bg-white px-4 py-4 shadow-[0_22px_48px_-34px_rgba(15,23,42,0.3)] sm:px-5">
          <div className="absolute inset-x-0 top-0 h-16 bg-[linear-gradient(180deg,rgba(37,99,235,0.08),transparent)]" />

          <div className="relative">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-[16px] bg-[linear-gradient(145deg,#0f172a,#2563eb)] text-white shadow-[0_14px_28px_-18px_rgba(37,99,235,0.7)]">
                <MessageSquareText size={18} />
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.24em] text-blue-700">
                    <Sparkles size={12} />
                    {message.contextLabel}
                  </span>

                  {activeSection?.label && (
                    <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500">
                      Viewing {activeSection.label}
                    </span>
                  )}
                </div>

                <p className="mt-4 whitespace-pre-line text-[15px] leading-7 text-slate-800">
                  {typedText}
                  {isTyping && (
                    <span className="ml-1 inline-flex items-center gap-1 align-middle">
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-blue-500 [animation-delay:-0.2s]" />
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-blue-400 [animation-delay:-0.1s]" />
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400" />
                    </span>
                  )}
                </p>

                <div className="mt-5 flex flex-wrap gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
                  <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5">{wordCount} words</span>
                  <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5">{memory.visitedSectionKeys.length} sections explored</span>
                  <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5">{memory.visitedActionIds.length} jumps used</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
