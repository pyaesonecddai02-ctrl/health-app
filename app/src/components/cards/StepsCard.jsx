import React from 'react';
import { Footprints, Trophy, Flame, Mountain, Zap, CheckCircle2 } from 'lucide-react';
import { STEP_MILESTONES } from '../../data/mockData';

export function StepsCard({ steps, setSteps, goal = 10000, onOpenDetail }) {
  const percentage = Math.min(Math.round((steps / goal) * 100), 100);
  const distanceKm = (steps * 0.00075).toFixed(2);
  const estCalories = Math.round(steps * 0.042);

  // Icon mapping for 5 milestones
  const milestoneIcons = [
    Footprints, // 2k
    Flame,      // 4k
    Mountain,   // 6k
    Zap,        // 8k
    Trophy      // 10k
  ];

  const handleSliderChange = (e) => {
    setSteps(Number(e.target.value));
  };

  const handleInputChange = (e) => {
    const val = e.target.value === '' ? 0 : Math.max(0, parseInt(e.target.value, 10) || 0);
    setSteps(val);
  };

  const addSteps = (delta) => {
    setSteps((prev) => Math.max(0, prev + delta));
  };

  return (
    <div className="glass-card p-6 flex flex-col justify-between relative overflow-hidden group">
      {/* Ambient background glow */}
      <div className="absolute -right-12 -top-12 w-40 h-40 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none group-hover:bg-emerald-500/25 transition-all duration-700" />

      <div>
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.3)]">
              <Footprints className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold text-lg text-white tracking-wide">Steps Tracker</h3>
              <p className="text-xs text-emerald-200/70">Goal: {goal.toLocaleString()} steps</p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            {onOpenDetail && (
              <button
                type="button"
                onClick={() => onOpenDetail('steps')}
                title="View Locomotion Deep Dive"
                className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-white/50 hover:text-white transition cursor-pointer"
              >
                <Trophy className="w-3.5 h-3.5" />
              </button>
            )}
            {/* Goal Completion Badge */}
            <span
              className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full border transition-all duration-300 ${
                steps >= goal
                  ? 'bg-emerald-500/25 border-emerald-400 text-emerald-300 glow-green'
                  : 'bg-white/10 border-white/20 text-white/80'
              }`}
            >
              {steps >= goal && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
              {percentage}% Achieved
            </span>
          </div>
        </div>

        {/* Current Steps Input & Reading */}
        <div className="flex flex-wrap items-baseline justify-between gap-3 my-2">
          <div className="flex items-baseline gap-2">
            <input
              type="number"
              min="0"
              max="50000"
              step="100"
              value={steps || ''}
              onChange={handleInputChange}
              aria-label="Today's step count"
              className="glass-input text-2xl sm:text-3xl font-bold w-36 sm:w-44 px-3 py-1 text-emerald-300 focus:text-white"
            />
            <span className="text-sm font-medium text-white/60">/ {goal.toLocaleString()}</span>
          </div>

          <div className="flex items-center gap-3 text-xs text-white/70">
            <span className="bg-white/5 border border-white/10 px-2.5 py-1 rounded-lg">
              📍 <strong className="text-white">{distanceKm}</strong> km
            </span>
            <span className="bg-white/5 border border-white/10 px-2.5 py-1 rounded-lg">
              🔥 <strong className="text-white">{estCalories}</strong> kcal
            </span>
          </div>
        </div>

        {/* Slider Input */}
        <div className="my-4">
          <input
            type="range"
            min="0"
            max="15000"
            step="100"
            value={steps}
            onChange={handleSliderChange}
            aria-label="Steps slider"
            className="w-full h-2 bg-black/40 rounded-lg appearance-none cursor-pointer accent-emerald-400 border border-white/15"
          />
          <div className="flex justify-between text-[11px] text-white/40 mt-1">
            <span>0</span>
            <span>5k</span>
            <span className="text-emerald-400 font-semibold">10k Goal</span>
            <span>15k+</span>
          </div>
        </div>

        {/* 5 Visual Milestones Horizontally (2k, 4k, 6k, 8k, 10k) */}
        <div className="mt-4 pt-2">
          <div className="flex items-center justify-between text-xs text-white/70 mb-2">
            <span className="font-medium text-[11px] uppercase tracking-wider text-white/60">Daily Milestones</span>
            <span className="text-[11px] text-emerald-300">
              {STEP_MILESTONES.filter((m) => steps >= m.threshold).length} / {STEP_MILESTONES.length} Unlocked
            </span>
          </div>

          <div className="grid grid-cols-5 gap-2 relative">
            {STEP_MILESTONES.map((milestone, idx) => {
              const isReached = steps >= milestone.threshold;
              const IconComp = milestoneIcons[idx] || Trophy;

              return (
                <div
                  key={milestone.threshold}
                  className={`flex flex-col items-center justify-center p-2 rounded-xl border text-center transition-all duration-300 relative ${
                    isReached
                      ? 'bg-emerald-500/25 border-emerald-400 text-emerald-200 shadow-[0_0_18px_rgba(34,197,94,0.45)] scale-102 ring-1 ring-emerald-400/50'
                      : 'bg-white/5 border-white/10 text-white/40 hover:bg-white/10'
                  }`}
                >
                  {/* Glowing Icon */}
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center mb-1 transition-all ${
                      isReached
                        ? 'bg-emerald-400 text-slate-950 font-bold shadow-[0_0_12px_rgba(52,211,153,0.8)]'
                        : 'bg-white/10 text-white/50'
                    }`}
                  >
                    <IconComp className="w-4 h-4" />
                  </div>

                  <span className={`text-[11px] font-bold ${isReached ? 'text-white' : 'text-white/50'}`}>
                    {milestone.label}
                  </span>
                  <span className="text-[9px] text-white/50 truncate w-full hidden sm:block">
                    {milestone.title}
                  </span>

                  {/* Reached badge dot */}
                  {isReached && (
                    <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full border border-black shadow-[0_0_6px_#34d399]" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Quick Increment Buttons */}
      <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between">
        <span className="text-xs text-white/50 font-medium">Quick add:</span>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => addSteps(500)}
            className="px-2.5 py-1 text-xs rounded-lg bg-white/10 hover:bg-emerald-500/20 hover:border-emerald-400/40 border border-white/10 text-white transition"
          >
            +500
          </button>
          <button
            type="button"
            onClick={() => addSteps(1000)}
            className="px-2.5 py-1 text-xs rounded-lg bg-white/10 hover:bg-emerald-500/20 hover:border-emerald-400/40 border border-white/10 text-white transition"
          >
            +1,000
          </button>
          <button
            type="button"
            onClick={() => addSteps(2500)}
            className="px-2.5 py-1 text-xs rounded-lg bg-emerald-500/25 hover:bg-emerald-500/35 border border-emerald-400/40 text-emerald-200 transition font-medium"
          >
            +2,500
          </button>
        </div>
      </div>
    </div>
  );
}
