import React, { useState } from 'react';
import { Smile, Heart, Wind, MessageSquare, Maximize2, Sparkles } from 'lucide-react';

export function MoodWellnessCard({
  moodData,
  setMoodData,
  onOpenDetail,
}) {
  const [isBreathing, setIsBreathing] = useState(false);
  const [breathText, setBreathText] = useState('Inhale');

  const moods = [
    { id: 'energetic', label: 'Energetic', emoji: '⚡', color: 'from-amber-400 to-orange-500' },
    { id: 'calm', label: 'Calm', emoji: '🌿', color: 'from-emerald-400 to-teal-500' },
    { id: 'focused', label: 'Focused', emoji: '🎯', color: 'from-cyan-400 to-blue-500' },
    { id: 'stressed', label: 'Stressed', emoji: '🌪️', color: 'from-rose-400 to-red-500' },
    { id: 'tired', label: 'Tired', emoji: '😴', color: 'from-indigo-400 to-purple-500' },
  ];

  const handleStartBreathing = () => {
    setIsBreathing(true);
    setBreathText('Inhale gently (4s)...');
    setTimeout(() => setBreathText('Hold (4s)...'), 4000);
    setTimeout(() => setBreathText('Exhale slowly (4s)...'), 8000);
    setTimeout(() => {
      setBreathText('Mind refreshed!');
      setTimeout(() => setIsBreathing(false), 2000);
    }, 12000);
  };

  return (
    <div className="glass-card p-6 flex flex-col justify-between relative overflow-hidden group">
      {/* Ambient background glow */}
      <div className="absolute -right-12 -top-12 w-40 h-40 bg-teal-500/15 rounded-full blur-3xl pointer-events-none group-hover:bg-teal-500/25 transition-all duration-700" />

      <div>
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-500/20 border border-teal-400/30 flex items-center justify-center text-teal-300 shadow-[0_0_15px_rgba(20,184,166,0.3)]">
              <Smile className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold text-lg text-white tracking-wide">Mind & Mood</h3>
              <p className="text-xs text-teal-200/70">Mental wellness & stress tracking</p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onOpenDetail('mood')}
            title="View mental wellness breakdown"
            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-white/50 hover:text-white transition cursor-pointer"
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 5 Mood Selector Buttons */}
        <div className="my-2">
          <label className="block text-xs font-medium text-white/60 mb-2">
            How are you feeling right now?
          </label>
          <div className="grid grid-cols-5 gap-1.5">
            {moods.map((m) => {
              const isSelected = moodData.currentMood === m.id;
              return (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setMoodData((prev) => ({ ...prev, currentMood: m.id }))}
                  className={`flex flex-col items-center justify-center py-2 px-1 rounded-xl border text-center transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-teal-500/25 border-teal-400 shadow-[0_0_12px_rgba(20,184,166,0.4)] scale-105'
                      : 'bg-white/5 border-white/10 hover:bg-white/10 text-white/60'
                  }`}
                >
                  <span className="text-xl mb-1">{m.emoji}</span>
                  <span className="text-[10px] font-semibold text-white truncate w-full">
                    {m.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Stress Level Slider (1 to 10) */}
        <div className="my-4 p-3 rounded-xl bg-white/5 border border-white/10">
          <div className="flex justify-between items-center text-xs mb-1.5">
            <span className="text-white/60">Stress Level:</span>
            <span
              className={`font-bold px-2 py-0.5 rounded text-xs ${
                moodData.stressLevel <= 3
                  ? 'bg-emerald-500/20 text-emerald-300'
                  : moodData.stressLevel <= 6
                  ? 'bg-yellow-500/20 text-yellow-300'
                  : 'bg-rose-500/20 text-rose-300'
              }`}
            >
              {moodData.stressLevel} / 10 •{' '}
              {moodData.stressLevel <= 3 ? 'Low' : moodData.stressLevel <= 6 ? 'Moderate' : 'High'}
            </span>
          </div>
          <input
            type="range"
            min="1"
            max="10"
            value={moodData.stressLevel}
            onChange={(e) =>
              setMoodData((prev) => ({ ...prev, stressLevel: parseInt(e.target.value, 10) }))
            }
            className="w-full h-1.5 bg-black/40 rounded-lg appearance-none cursor-pointer accent-teal-400"
          />
        </div>

        {/* Daily Reflection Note */}
        <div>
          <label className="block text-[11px] text-white/50 mb-1 flex items-center gap-1">
            <MessageSquare className="w-3 h-3 text-teal-300" />
            <span>Daily Mindful Note:</span>
          </label>
          <input
            type="text"
            placeholder="What brought you peace or joy today?"
            value={moodData.notes || ''}
            onChange={(e) => setMoodData((prev) => ({ ...prev, notes: e.target.value }))}
            className="glass-input text-xs w-full px-3 py-2 text-white placeholder-white/40"
          />
        </div>
      </div>

      {/* 1-Minute Breath exercise trigger */}
      <div className="pt-3 mt-3 border-t border-white/10 flex items-center justify-between">
        {isBreathing ? (
          <div className="flex items-center gap-2 text-xs text-teal-300 font-semibold animate-pulse w-full justify-center py-1">
            <Wind className="w-4 h-4 animate-spin" />
            <span>{breathText}</span>
          </div>
        ) : (
          <button
            type="button"
            onClick={handleStartBreathing}
            className="w-full py-1.5 rounded-lg bg-teal-500/20 hover:bg-teal-500/30 border border-teal-400/30 text-teal-200 text-xs font-semibold flex items-center justify-center gap-2 transition"
          >
            <Wind className="w-3.5 h-3.5" />
            <span>Take 1-Min Mindful Breath</span>
          </button>
        )}
      </div>
    </div>
  );
}
