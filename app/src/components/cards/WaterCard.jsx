import React from 'react';
import { Droplet, Plus, Minus, RotateCcw, Award } from 'lucide-react';

export function WaterCard({ waterGlasses, setWaterGlasses, goal = 8, onOpenDetail }) {
  const percentage = Math.min(Math.round((waterGlasses / goal) * 100), 100);
  const totalMl = waterGlasses * 250;
  const goalMl = goal * 250;

  const toggleGlass = (index) => {
    // If clicking on the exact current count, decrement by 1; otherwise set to that index + 1
    if (waterGlasses === index + 1) {
      setWaterGlasses(index);
    } else {
      setWaterGlasses(index + 1);
    }
  };

  const handleIncrement = () => {
    if (waterGlasses < 16) {
      setWaterGlasses((prev) => prev + 1);
    }
  };

  const handleDecrement = () => {
    if (waterGlasses > 0) {
      setWaterGlasses((prev) => prev - 1);
    }
  };

  const isCompleted = waterGlasses >= goal;

  return (
    <div className="glass-card p-6 flex flex-col justify-between relative overflow-hidden group">
      {/* Ambient background water glow */}
      <div
        className="absolute -right-12 -top-12 w-40 h-40 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none group-hover:bg-cyan-500/25 transition-all duration-700"
      />

      <div>
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-400/30 flex items-center justify-center text-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.3)]">
              <Droplet className="w-5 h-5 fill-cyan-400/50" />
            </div>
            <div>
              <h3 className="font-semibold text-lg text-white tracking-wide">Water Intake</h3>
              <p className="text-xs text-cyan-200/70">Goal: {goal} glasses (~{goalMl}ml)</p>
            </div>
          </div>

          {/* Badge & Detail button */}
          <div className="flex items-center gap-1.5">
            {onOpenDetail && (
              <button
                type="button"
                onClick={() => onOpenDetail('water')}
                title="View Hydration Deep Dive"
                className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-white/50 hover:text-white transition cursor-pointer"
              >
                <Award className="w-3.5 h-3.5" />
              </button>
            )}
            <span
              className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full border ${
                isCompleted
                  ? 'bg-emerald-500/20 border-emerald-400/40 text-emerald-300 shadow-[0_0_10px_rgba(16,185,129,0.3)]'
                  : 'bg-cyan-500/15 border-cyan-400/30 text-cyan-300'
              }`}
            >
              {isCompleted ? <Award className="w-3.5 h-3.5" /> : null}
              {percentage}%
            </span>
          </div>
        </div>

        {/* Big metric reading */}
        <div className="my-3 flex items-baseline justify-between">
          <div>
            <span className="text-3xl font-bold tracking-tight text-white">{waterGlasses}</span>
            <span className="text-sm font-medium text-white/60 ml-1">/ {goal} glasses</span>
          </div>
          <div className="text-sm text-cyan-300/90 font-medium">
            {totalMl.toLocaleString()} <span className="text-xs text-white/50">/ {goalMl.toLocaleString()} ml</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-black/25 h-2.5 rounded-full overflow-hidden p-0.5 border border-white/10 mb-5">
          <div
            className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-teal-400 transition-all duration-500 shadow-[0_0_12px_rgba(6,182,212,0.6)]"
            style={{ width: `${percentage}%` }}
          />
        </div>

        {/* 8 Interactive Glass Icons */}
        <div className="grid grid-cols-4 sm:grid-cols-8 gap-2.5 my-2">
          {Array.from({ length: goal }).map((_, index) => {
            const isFilled = index < waterGlasses;
            return (
              <button
                key={index}
                onClick={() => toggleGlass(index)}
                type="button"
                title={`Glass ${index + 1} (250ml) - Click to ${isFilled ? 'empty' : 'fill'}`}
                className={`relative group/glass flex flex-col items-center justify-end h-16 rounded-xl border p-1.5 transition-all duration-300 cursor-pointer ${
                  isFilled
                    ? 'bg-gradient-to-b from-cyan-500/20 to-cyan-500/40 border-cyan-400/60 shadow-[0_0_15px_rgba(6,182,212,0.4)] scale-105'
                    : 'bg-white/5 border-white/15 hover:border-cyan-400/40 hover:bg-white/10 hover:scale-102'
                }`}
              >
                {/* Visual Glass Cup Shape */}
                <div className="w-6 h-8 rounded-b-md border-2 border-white/40 relative overflow-hidden flex flex-col justify-end">
                  {/* Water fill level inside glass */}
                  <div
                    className={`w-full transition-all duration-300 ${
                      isFilled
                        ? 'h-full bg-gradient-to-t from-cyan-400 to-sky-300 shadow-inner'
                        : 'h-0'
                    }`}
                  />
                </div>
                <span
                  className={`text-[10px] mt-1 font-semibold transition-colors ${
                    isFilled ? 'text-cyan-200' : 'text-white/40'
                  }`}
                >
                  #{index + 1}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Quick Action Buttons */}
      <div className="pt-4 mt-3 border-t border-white/10 flex items-center justify-between text-xs">
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={handleDecrement}
            disabled={waterGlasses === 0}
            className="px-2.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 disabled:opacity-40 disabled:cursor-not-allowed border border-white/10 text-white flex items-center gap-1 transition"
          >
            <Minus className="w-3.5 h-3.5" />
            <span>-1 Glass</span>
          </button>
          <button
            type="button"
            onClick={handleIncrement}
            className="px-2.5 py-1.5 rounded-lg bg-cyan-500/30 hover:bg-cyan-500/40 border border-cyan-400/40 text-cyan-200 flex items-center gap-1 transition font-medium"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>+1 Glass</span>
          </button>
        </div>

        <button
          type="button"
          onClick={() => setWaterGlasses(0)}
          title="Reset daily water"
          className="p-1.5 text-white/50 hover:text-white/90 hover:bg-white/10 rounded-lg transition"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
