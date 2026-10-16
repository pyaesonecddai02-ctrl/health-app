import React from 'react';
import { Moon, Bed, Sun, Sparkles, Maximize2, ShieldCheck } from 'lucide-react';

export function SleepCard({
  sleepData,
  setSleepData,
  goal = 8.0,
  onOpenDetail,
}) {
  const hours = parseFloat(sleepData.hours) || 0;
  const percentage = Math.min(Math.round((hours / goal) * 100), 100);
  const isGoalMet = hours >= goal;

  const handleHoursChange = (delta) => {
    setSleepData((prev) => ({
      ...prev,
      hours: Math.max(0, Math.min(16, parseFloat((prev.hours + delta).toFixed(1)))),
    }));
  };

  return (
    <div className="glass-card p-6 flex flex-col justify-between relative overflow-hidden group">
      {/* Ambient background glow */}
      <div className="absolute -right-12 -top-12 w-40 h-40 bg-purple-500/15 rounded-full blur-3xl pointer-events-none group-hover:bg-purple-500/25 transition-all duration-700" />

      <div>
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-400/30 flex items-center justify-center text-purple-300 shadow-[0_0_15px_rgba(168,85,247,0.3)]">
              <Moon className="w-5 h-5 fill-purple-400/30" />
            </div>
            <div>
              <h3 className="font-semibold text-lg text-white tracking-wide">Sleep & Rest</h3>
              <p className="text-xs text-purple-200/70">Target: {goal} hrs restful sleep</p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => onOpenDetail('sleep')}
              title="View detailed sleep stages"
              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-white/50 hover:text-white transition cursor-pointer"
            >
              <Maximize2 className="w-3.5 h-3.5" />
            </button>
            <span
              className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full border ${
                isGoalMet
                  ? 'bg-emerald-500/20 border-emerald-400/40 text-emerald-300'
                  : 'bg-purple-500/20 border-purple-400/40 text-purple-300'
              }`}
            >
              {percentage}% Rested
            </span>
          </div>
        </div>

        {/* Big Reading */}
        <div className="my-3 flex items-baseline justify-between">
          <div>
            <span className="text-3xl font-bold tracking-tight text-white">{hours}</span>
            <span className="text-sm font-medium text-white/60 ml-1">/ {goal} hrs</span>
          </div>

          <div className="text-right text-xs">
            <span className="text-purple-300 font-semibold">
              Quality Score: {sleepData.qualityScore || 88}%
            </span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-black/25 h-2.5 rounded-full overflow-hidden p-0.5 border border-white/10 mb-4">
          <div
            className="h-full rounded-full bg-gradient-to-r from-purple-500 via-indigo-400 to-teal-400 transition-all duration-500 shadow-[0_0_12px_rgba(168,85,247,0.5)]"
            style={{ width: `${percentage}%` }}
          />
        </div>

        {/* Bedtime & Wakeup Inputs */}
        <div className="grid grid-cols-2 gap-2.5 my-3">
          <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 flex items-center gap-2">
            <Bed className="w-4 h-4 text-purple-300 shrink-0" />
            <div className="min-w-0">
              <span className="block text-[10px] text-white/50 leading-none">Bedtime</span>
              <input
                type="time"
                value={sleepData.bedtime || '23:00'}
                onChange={(e) =>
                  setSleepData((prev) => ({ ...prev, bedtime: e.target.value }))
                }
                className="bg-transparent text-xs font-semibold text-white focus:outline-none w-full"
              />
            </div>
          </div>

          <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 flex items-center gap-2">
            <Sun className="w-4 h-4 text-amber-300 shrink-0" />
            <div className="min-w-0">
              <span className="block text-[10px] text-white/50 leading-none">Wake up</span>
              <input
                type="time"
                value={sleepData.wakeTime || '07:00'}
                onChange={(e) =>
                  setSleepData((prev) => ({ ...prev, wakeTime: e.target.value }))
                }
                className="bg-transparent text-xs font-semibold text-white focus:outline-none w-full"
              />
            </div>
          </div>
        </div>

        {/* Sleep Stage Architecture breakdown pill */}
        <div className="p-2.5 rounded-xl bg-black/20 border border-white/10 text-[11px] space-y-1">
          <div className="flex justify-between text-white/60">
            <span>Sleep Architecture</span>
            <span className="text-purple-300 font-medium">Optimal REM</span>
          </div>
          <div className="h-1.5 w-full bg-white/10 rounded-full flex overflow-hidden">
            <div style={{ width: '25%' }} className="bg-indigo-500" title="Deep Sleep (25%)" />
            <div style={{ width: '50%' }} className="bg-purple-400" title="Light Sleep (50%)" />
            <div style={{ width: '25%' }} className="bg-teal-400" title="REM Sleep (25%)" />
          </div>
          <div className="flex justify-between text-[10px] text-white/40 pt-0.5">
            <span>Deep 1.8h</span>
            <span>Light 3.8h</span>
            <span>REM 1.9h</span>
          </div>
        </div>
      </div>

      {/* Footer Stepper */}
      <div className="pt-4 mt-3 border-t border-white/10 flex items-center justify-between text-xs">
        <span className="text-white/50">Adjust logged sleep:</span>
        <div className="flex gap-1.5">
          <button
            type="button"
            onClick={() => handleHoursChange(-0.5)}
            className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 border border-white/10 text-white"
          >
            -30m
          </button>
          <button
            type="button"
            onClick={() => handleHoursChange(0.5)}
            className="px-2.5 py-1 rounded-lg bg-purple-500/25 hover:bg-purple-500/35 border border-purple-400/40 text-purple-200 font-medium"
          >
            +30m
          </button>
        </div>
      </div>
    </div>
  );
}
