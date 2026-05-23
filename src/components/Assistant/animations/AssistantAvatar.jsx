import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquareText, Sparkles } from 'lucide-react';

export default function AssistantAvatar({ isMinimized, onClick }) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ scale: 1.04, y: -1 }}
      whileTap={{ scale: 0.985 }}
      animate={{
        y: [0, -2, 0],
        rotate: [0, 0.35, 0]
      }}
      transition={{
        y: {
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut'
        },
        rotate: {
          duration: 4.8,
          repeat: Infinity,
          ease: 'easeInOut'
        }
      }}
      className={`group relative isolate flex items-center justify-center overflow-hidden rounded-[20px] border border-slate-200/70 bg-[linear-gradient(145deg,#f7fbff_0%,#dbeafe_38%,#93c5fd_100%)] shadow-[0_18px_36px_-24px_rgba(15,23,42,0.34)] ${
        isMinimized ? 'h-[52px] w-[52px]' : 'h-[58px] w-[58px]'
      }`}
      aria-label="Open website assistant"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_26%_24%,rgba(255,255,255,0.95),transparent_38%),radial-gradient(circle_at_80%_82%,rgba(29,78,216,0.12),transparent_34%)]" />
      <div className="absolute inset-[4px] rounded-[16px] border border-white/75 bg-[linear-gradient(180deg,rgba(255,255,255,0.92),rgba(239,246,255,0.84))]" />

      <motion.div
        className="absolute h-[70%] w-[70%] rounded-full opacity-95"
        style={{
          backgroundImage:
            'conic-gradient(from 180deg, rgba(15,23,42,0.04), rgba(29,78,216,0.78), rgba(255,255,255,0.95), rgba(59,130,246,0.28), rgba(15,23,42,0.04))'
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
      />

      <motion.div
        className="absolute h-[54%] w-[54%] rounded-full border border-white/70 bg-[linear-gradient(145deg,rgba(255,255,255,0.98),rgba(219,234,254,0.88))] shadow-[inset_0_1px_0_rgba(255,255,255,0.94),0_8px_18px_-14px_rgba(37,99,235,0.55)]"
        animate={{ rotate: -360 }}
        transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
      />

      <div className="relative flex h-[38%] w-[38%] items-center justify-center rounded-[12px] bg-[linear-gradient(145deg,#0f172a,#1d4ed8)] text-white shadow-[0_14px_22px_-16px_rgba(29,78,216,0.78)]">
        <MessageSquareText size={isMinimized ? 14 : 16} strokeWidth={2.15} />
      </div>

      <div className="absolute right-[7px] top-[7px] flex h-[13px] w-[13px] items-center justify-center rounded-full border border-white/75 bg-white/92 text-blue-600 shadow-sm">
        <Sparkles size={7} strokeWidth={2.6} />
      </div>
    </motion.button>
  );
}
