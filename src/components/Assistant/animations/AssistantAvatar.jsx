import React from 'react';
import { motion } from 'framer-motion';
import { Bot, Volume2 } from 'lucide-react';

export default function AssistantAvatar({ isMinimized, isSpeaking, onClick, voiceEnabled }) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
      animate={{
        y: [0, -5, 0],
        rotate: isSpeaking ? [0, -3, 3, 0] : [0, 0.5, -0.5, 0]
      }}
      transition={{
        y: {
          duration: 2.4,
          repeat: Infinity,
          ease: 'easeInOut'
        },
        rotate: {
          duration: isSpeaking ? 0.85 : 3.2,
          repeat: Infinity,
          ease: 'easeInOut'
        }
      }}
      className={`group relative isolate flex items-center justify-center overflow-hidden rounded-full border border-white/55 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.95),rgba(205,224,255,0.72)_42%,rgba(17,92,185,0.96)_100%)] shadow-[0_30px_80px_-34px_rgba(17,92,185,0.9)] backdrop-blur-xl ${
        isMinimized ? 'h-18 w-18' : 'h-20 w-20'
      }`}
      aria-label="Open website assistant"
    >
      <motion.span
        className="absolute inset-[6px] rounded-full border border-white/35"
        animate={{
          scale: isSpeaking ? [1, 1.08, 1] : [1, 1.03, 1],
          opacity: isSpeaking ? [0.45, 0.9, 0.45] : [0.45, 0.65, 0.45]
        }}
        transition={{ duration: isSpeaking ? 0.9 : 2.2, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.85),transparent_42%)]" />
      <div className="absolute -right-2 top-2 h-10 w-10 rounded-full bg-cyan-200/70 blur-2xl" />
      <div className="absolute -left-3 bottom-1 h-12 w-12 rounded-full bg-orange-200/70 blur-2xl" />

      <div className="relative flex h-[62%] w-[62%] items-center justify-center rounded-full bg-white/90 shadow-[inset_0_1px_6px_rgba(255,255,255,0.8)]">
        <motion.div
          className="absolute top-[30%] flex w-[52%] items-center justify-between"
          animate={{ y: isSpeaking ? [0, -1, 0] : 0 }}
          transition={{ duration: 0.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <motion.span
            className="h-2.5 w-2.5 rounded-full bg-slate-900"
            animate={{ scaleY: [1, 0.2, 1] }}
            transition={{ duration: 4.2, repeat: Infinity, repeatDelay: 1.8 }}
          />
          <motion.span
            className="h-2.5 w-2.5 rounded-full bg-slate-900"
            animate={{ scaleY: [1, 0.2, 1] }}
            transition={{ duration: 4.2, repeat: Infinity, repeatDelay: 1.8, delay: 0.08 }}
          />
        </motion.div>

        <motion.div
          className="absolute bottom-[24%] h-3.5 w-7 rounded-b-full border-b-[3px] border-slate-900"
          animate={{
            scaleX: isSpeaking ? [0.8, 1.05, 0.78, 1] : [1, 0.96, 1],
            scaleY: isSpeaking ? [0.8, 1.2, 0.9, 1] : 1
          }}
          transition={{ duration: isSpeaking ? 0.52 : 2.4, repeat: Infinity, ease: 'easeInOut' }}
        />

        <div className="absolute -bottom-1 left-1/2 h-3 w-10 -translate-x-1/2 rounded-full bg-white/65 blur-md" />
        <Bot size={20} className="absolute text-blue-600/85" />
      </div>

      {voiceEnabled && (
        <motion.div
          className="absolute -right-1 -top-1 flex h-8 w-8 items-center justify-center rounded-full border border-white/70 bg-slate-950 text-white shadow-lg"
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Volume2 size={14} />
        </motion.div>
      )}
    </motion.button>
  );
}
