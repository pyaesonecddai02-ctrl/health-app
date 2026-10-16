import React, { useState, useEffect } from 'react';
import { Timer, Play, Square, Sparkles, Maximize2, Zap, Flame } from 'lucide-react';

export function FastingCard({
  fastingData,
  setFastingData,
  onOpenDetail,
}) {
  const targetHours = fastingData.targetHours || 16;
  const isFasting = fastingData.isActive;

  // Calculate elapsed hours based on startTime
  const [elapsedSeconds, setElapsedSeconds] = useState(() => {
    if (!fastingData.startTime) return 14 * 3600; // default 14 hrs
    return Math.floor((Date.now() - fastingData.startTime) / 1000);
  });

  useEffect(() => {
    let timer;
    if (isFasting) {
      timer = setInterval(() => {
        setElapsedSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isFasting]);

  const elapsedHours = elapsedSeconds / 3600;
  const progressPercent = Math.min(Math.round((elapsedHours / targetHours) * 100), 100);

  const hoursDisplay = Math.floor(elapsedSeconds / 3600);
  const minutesDisplay = Math.floor((elapsedSeconds % 3600) / 60);

  // Fasting biological stage
  const getFastingStage = (hrs) => {
    if (hrs < 4) return { label: 'Anabolic Phase', color: 'text-white/60' };
    if (hrs < 12) return { label: 'Blood Sugar Drop', color: 'text-amber-300' };
    if (hrs < 14) return { label: 'Fat Burning Zone 🔥', color: 'text-orange-400' };
    if (hrs < 16) return { label: 'Ketosis Active ⚡', color: 'text-emerald-300' };
    return { label: 'Autophagy & Cell Renewal 🌟', color: 'text-teal-300' };
  };

  const stage = getFastingStage(elapsedHours);

  const toggleFast = () => {
    if (isFasting) {
      setFastingData((prev) => ({ ...prev, isActive: false }));
    } else {
      setFastingData((prev) => ({
        ...prev,
        isActive: true,
        startTime: Date.now(),
      }));
      setElapsedSeconds(0);
    }
  };

  return (
    <div className="glass-card p-6 flex flex-col justify-between relative overflow-hidden group">
      {/* Ambient background glow */}
      <div className="absolute -right-12 -top-12 w-40 h-40 bg-orange-500/15 rounded-full blur-3xl pointer-events-none group-hover:bg-orange-500/25 transition-all duration-700" />

      <div>
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange-500/20 border border-orange-400/30 flex items-center justify-center text-orange-300 shadow-[0_0_15px_rgba(249,115,22,0.3)]">
              <Timer className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold text-lg text-white tracking-wide">16:8 Fasting Timer</h3>
              <p className="text-xs text-orange-200/70">Metabolic rest & autophagy</p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => onOpenDetail('fasting')}
              title="View fasting stage timeline"
              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-white/50 hover:text-white transition cursor-pointer"
            >
              <Maximize2 className="w-3.5 h-3.5" />
            </button>
            <span
              className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full border ${
                isFasting
                  ? 'bg-orange-500/20 border-orange-400/40 text-orange-300'
                  : 'bg-white/10 border-white/20 text-white/60'
              }`}
            >
              {isFasting ? 'Fasting Active' : 'Eating Window'}
            </span>
          </div>
        </div>

        {/* Big Reading */}
        <div className="my-3 flex items-baseline justify-between">
          <div>
            <span className="text-3xl font-bold tracking-tight text-white">
              {hoursDisplay}h {minutesDisplay}m
            </span>
            <span className="text-sm font-medium text-white/60 ml-1.5">/ {targetHours}h Goal</span>
          </div>

          <div className="text-right text-xs">
            <span className="text-orange-300 font-semibold">{progressPercent}% Completed</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-black/25 h-2.5 rounded-full overflow-hidden p-0.5 border border-white/10 mb-4">
          <div
            className="h-full rounded-full bg-gradient-to-r from-orange-500 via-amber-400 to-emerald-400 transition-all duration-500 shadow-[0_0_12px_rgba(249,115,22,0.5)]"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Biological Stage Indicator */}
        <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <Flame className="w-4 h-4 text-orange-400" />
            <span className="text-white/70">Current State:</span>
          </div>
          <span className={`font-semibold ${stage.color}`}>{stage.label}</span>
        </div>
      </div>

      {/* Start / Stop Fast Toggle Button */}
      <div className="pt-4 mt-3 border-t border-white/10 flex items-center justify-between">
        <span className="text-xs text-white/50">Window: 16h Fast / 8h Eat</span>
        <button
          type="button"
          onClick={toggleFast}
          className={`px-4 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer ${
            isFasting
              ? 'bg-rose-500/20 hover:bg-rose-500/30 border border-rose-400/40 text-rose-300'
              : 'bg-emerald-500/25 hover:bg-emerald-500/35 border border-emerald-400/40 text-emerald-300'
          }`}
        >
          {isFasting ? (
            <>
              <Square className="w-3.5 h-3.5 fill-current" />
              <span>End Fast</span>
            </>
          ) : (
            <>
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Start Fast</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
