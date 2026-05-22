import React, { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { MessageSquareText, Sparkles } from 'lucide-react';

export default function AssistantBubble({ activeSection, isTyping, message, memory, onTypingComplete }) {
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
    }, message.text.length > 140 ? 12 : 18);

    return () => window.clearInterval(interval);
  }, [message?.id, message?.text, onTypingComplete]);

  if (!message) {
    return null;
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={message.id}
        initial={{ opacity: 0, y: 24, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.98 }}
        transition={{ duration: 0.28, ease: 'easeOut' }}
        className="relative overflow-hidden rounded-[28px] border border-white/55 bg-white/75 p-4 shadow-[0_24px_60px_-32px_rgba(15,23,42,0.55)] backdrop-blur-2xl"
      >
        <div className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent" />
        <div className="flex items-start gap-3">
          <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-slate-950 text-white shadow-[0_18px_35px_-20px_rgba(15,23,42,0.8)]">
            <MessageSquareText size={18} />
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.22em] text-blue-700">
                <Sparkles size={12} />
                {message.contextLabel}
              </span>
              {activeSection?.label && (
                <span className="rounded-full border border-slate-200 bg-white/70 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                  Now Viewing {activeSection.label}
                </span>
              )}
            </div>

            <p className="mt-3 whitespace-pre-line text-sm leading-7 text-slate-700 sm:text-[15px]">
              {typedText}
              {isTyping && (
                <span className="ml-1 inline-flex items-center gap-1 align-middle">
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-blue-500 [animation-delay:-0.2s]" />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-blue-400 [animation-delay:-0.1s]" />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400" />
                </span>
              )}
            </p>

            <div className="mt-4 flex flex-wrap items-center gap-2 text-[11px] font-medium uppercase tracking-[0.16em] text-slate-400">
              <span>{wordCount} words</span>
              <span>{memory.visitedSectionKeys.length} sections explored</span>
              <span>{memory.visitedActionIds.length} guided jumps used</span>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
