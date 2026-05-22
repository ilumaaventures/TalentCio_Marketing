import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Compass, Sparkles } from 'lucide-react';

export default function AssistantActions({ actions, onAction, pendingActionId, suggestedAction }) {
  return (
    <div className="space-y-3">
      {suggestedAction && (
        <button
          type="button"
          onClick={() => onAction(suggestedAction)}
          className="group flex w-full items-center justify-between rounded-[24px] border border-blue-200/80 bg-[linear-gradient(135deg,rgba(17,92,185,0.12),rgba(255,255,255,0.7))] px-4 py-3 text-left shadow-[0_18px_35px_-28px_rgba(17,92,185,0.7)] transition hover:border-blue-300 hover:bg-[linear-gradient(135deg,rgba(17,92,185,0.18),rgba(255,255,255,0.9))]"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-950 text-white">
              <Compass size={18} />
            </div>
            <div>
              <p className="inline-flex items-center gap-2 text-sm font-bold text-slate-900">
                Suggested Next Step
                <Sparkles size={14} className="text-blue-600" />
              </p>
              <p className="mt-1 text-sm text-slate-600">Jump to {suggestedAction.label}</p>
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
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.24, delay: index * 0.04 }}
              onClick={() => onAction(action)}
              className={`rounded-[22px] border px-3 py-3 text-left transition ${
                isPending
                  ? 'border-blue-500 bg-blue-600 text-white shadow-[0_20px_38px_-24px_rgba(17,92,185,0.95)]'
                  : 'border-white/60 bg-white/65 text-slate-700 hover:border-blue-200 hover:bg-blue-50/85 hover:text-blue-700'
              }`}
            >
              <span className="block text-sm font-semibold">{action.label}</span>
              <span className={`mt-2 block text-xs ${isPending ? 'text-blue-100' : 'text-slate-500'}`}>
                {action.path === '/' ? 'Scroll and spotlight' : 'Open and guide'}
              </span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
