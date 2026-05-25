import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Compass, Sparkles } from 'lucide-react';

export default function AssistantActions({ actions, onAction, pendingActionId, suggestedAction }) {
  return (
    <div className="space-y-4">
      <div>
        <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-slate-500">
          Guided Shortcuts
        </p>
      </div>

      {suggestedAction && (
        <button
          type="button"
          onClick={() => onAction(suggestedAction)}
          className="group flex w-full items-center justify-between overflow-hidden rounded-[24px] border border-blue-200 bg-[linear-gradient(135deg,#eff6ff_0%,#ffffff_72%)] px-4 py-4 text-left shadow-[0_18px_36px_-28px_rgba(37,99,235,0.42)] transition hover:border-blue-300 hover:shadow-[0_20px_40px_-26px_rgba(37,99,235,0.5)]"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-[16px] bg-[linear-gradient(145deg,#0f172a,#2563eb)] text-white shadow-[0_14px_24px_-16px_rgba(37,99,235,0.72)]">
              <Compass size={18} />
            </div>
            <div>
              <p className="inline-flex items-center gap-2 text-sm font-bold text-slate-900">
                Suggested Next Step
                <Sparkles size={14} className="text-blue-600" />
              </p>
              <p className="mt-1 text-sm text-slate-600">
                Jump to {suggestedAction.label}
              </p>
            </div>
          </div>

          <ArrowUpRight size={18} className="text-blue-600 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </button>
      )}

      <div className="grid grid-cols-2 gap-2.5">
        {actions.map((action, index) => {
          const isPending = pendingActionId === action.id;

          return (
            <motion.button
              key={action.id}
              type="button"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.24, delay: index * 0.04 }}
              onClick={() => onAction(action)}
              className={`rounded-[20px] border px-3 py-3.5 text-left transition ${
                isPending
                  ? 'border-blue-500 bg-[linear-gradient(145deg,#2563eb,#1d4ed8)] text-white shadow-[0_18px_34px_-22px_rgba(37,99,235,0.9)]'
                  : 'border-slate-200 bg-white text-slate-800 hover:border-blue-200 hover:bg-blue-50/70 hover:text-blue-700'
              }`}
            >
              <span className="block text-sm font-semibold">{action.label}</span>
              <span className={`mt-2 block text-xs leading-5 ${isPending ? 'text-blue-100' : 'text-slate-500'}`}>
                {action.helperText || (action.path === '/' ? 'Scroll and highlight' : 'Open and guide')}
              </span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
