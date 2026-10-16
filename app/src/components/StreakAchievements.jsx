import React from 'react';
import { Flame, Trophy, Award, Sparkles, CheckCircle2 } from 'lucide-react';
import { ACHIEVEMENTS } from '../data/mockData';
import confetti from 'canvas-confetti';
import { soundEngine } from '../utils/soundGenerator';

export function StreakAchievements({ streakCount = 6 }) {
  const triggerCelebration = (badgeTitle) => {
    soundEngine.playChime();
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#34d399', '#06b6d4', '#f59e0b', '#a855f7'],
    });
  };

  return (
    <div className="glass-card p-4 sm:p-5 mb-8 border border-white/15 relative overflow-hidden">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Streak highlight */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-orange-500 to-amber-400 flex items-center justify-center text-slate-950 shadow-[0_0_20px_rgba(249,115,22,0.5)]">
            <Flame className="w-7 h-7 fill-slate-950 stroke-[2.5]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-black text-white">{streakCount}-Day Streak!</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-orange-500/20 text-orange-300 border border-orange-400/40 uppercase">
                Active Fire
              </span>
            </div>
            <p className="text-xs text-white/60">
              You're building lifelong vitality. Log today's metrics to keep the flame alive!
            </p>
          </div>
        </div>

        {/* Badges Carousel / Row */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
          {ACHIEVEMENTS.map((badge) => (
            <button
              key={badge.id}
              type="button"
              onClick={() => triggerCelebration(badge.title)}
              title={`${badge.title}: ${badge.desc} (Click to celebrate)`}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold shrink-0 transition-all cursor-pointer ${
                badge.unlocked
                  ? 'bg-white/10 hover:bg-white/20 border-white/20 text-white shadow-sm hover:scale-105'
                  : 'bg-black/20 border-white/5 text-white/30 cursor-not-allowed'
              }`}
            >
              <span className="text-base">{badge.icon}</span>
              <span className="text-[11px] truncate max-w-[100px]">{badge.title}</span>
              {badge.unlocked && (
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_5px_#34d399]" />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
