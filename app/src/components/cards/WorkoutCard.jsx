import React, { useState, useEffect } from 'react';
import { Dumbbell, Play, Pause, RotateCcw, Plus, Trash2, Flame, Timer, Sparkles, Maximize2 } from 'lucide-react';
import { soundEngine } from '../../utils/soundGenerator';

export function WorkoutCard({
  workouts = [],
  setWorkouts,
  onOpenDetail,
}) {
  const [activity, setActivity] = useState('HIIT');
  const [duration, setDuration] = useState(25);
  const [customName, setCustomName] = useState('');

  // Built-in interval timer state
  const [timerRunning, setTimerRunning] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(45);
  const [timerPhase, setTimerPhase] = useState('work'); // 'work' | 'rest'

  const activityRates = {
    'Running': 10.5,
    'Cycling': 8.5,
    'HIIT': 12.0,
    'Yoga': 4.5,
    'Strength': 7.5,
  };

  useEffect(() => {
    let interval = null;
    if (timerRunning) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => {
          if (prev <= 1) {
            soundEngine.playChime();
            if (timerPhase === 'work') {
              setTimerPhase('rest');
              return 15; // 15s rest
            } else {
              setTimerPhase('work');
              return 45; // 45s work
            }
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timerRunning, timerPhase]);

  const handleAddWorkout = (e) => {
    e.preventDefault();
    const rate = activityRates[activity] || 8.0;
    const burned = Math.round(duration * rate);

    const newEntry = {
      id: Date.now().toString(),
      name: customName.trim() || `${activity} Session`,
      activity,
      duration: parseInt(duration, 10),
      calories: burned,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setWorkouts((prev) => [newEntry, ...prev]);
    setCustomName('');
  };

  const handleDeleteWorkout = (id) => {
    setWorkouts((prev) => prev.filter((item) => item.id !== id));
  };

  const totalWorkoutMinutes = workouts.reduce((sum, w) => sum + (parseInt(w.duration, 10) || 0), 0);
  const totalBurned = workouts.reduce((sum, w) => sum + (parseInt(w.calories, 10) || 0), 0);

  return (
    <div className="glass-card p-6 flex flex-col justify-between relative overflow-hidden group">
      {/* Ambient glow */}
      <div className="absolute -right-12 -top-12 w-40 h-40 bg-rose-500/15 rounded-full blur-3xl pointer-events-none group-hover:bg-rose-500/25 transition-all duration-700" />

      <div>
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-rose-500/20 border border-rose-400/30 flex items-center justify-center text-rose-300 shadow-[0_0_15px_rgba(244,63,94,0.3)]">
              <Dumbbell className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold text-lg text-white tracking-wide">Workout & Fitness</h3>
              <p className="text-xs text-rose-200/70">Movement & calorie burn tracking</p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => onOpenDetail('workout')}
              title="View Workout Deep Dive"
              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-white/50 hover:text-white transition cursor-pointer"
            >
              <Maximize2 className="w-3.5 h-3.5" />
            </button>
            <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full border bg-rose-500/20 border-rose-400/40 text-rose-300">
              {totalWorkoutMinutes}m • {totalBurned} kcal
            </span>
          </div>
        </div>

        {/* Guided Interval Timer Bar */}
        <div className="p-3 rounded-xl bg-black/30 border border-white/10 mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Timer className="w-4 h-4 text-rose-300 animate-pulse" />
            <div>
              <span className="block text-[10px] text-white/50 leading-none">
                Interval Timer ({timerPhase.toUpperCase()})
              </span>
              <span className="text-lg font-black text-white">{timerSeconds}s</span>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => setTimerRunning(!timerRunning)}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition flex items-center gap-1 ${
                timerRunning
                  ? 'bg-amber-500/30 border border-amber-400 text-amber-200'
                  : 'bg-rose-500/30 border border-rose-400 text-rose-200'
              }`}
            >
              {timerRunning ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
              <span>{timerRunning ? 'Pause' : 'Start'}</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setTimerRunning(false);
                setTimerSeconds(45);
                setTimerPhase('work');
              }}
              className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white/60 hover:text-white"
            >
              <RotateCcw className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Quick Log Form */}
        <form onSubmit={handleAddWorkout} className="space-y-2 mb-4 p-3 rounded-xl bg-white/5 border border-white/10">
          <div className="flex gap-2">
            <select
              value={activity}
              onChange={(e) => setActivity(e.target.value)}
              className="glass-input text-xs px-2.5 py-2 text-white bg-slate-900/80 cursor-pointer w-28"
            >
              <option value="HIIT" className="bg-slate-900 text-white">⚡ HIIT</option>
              <option value="Running" className="bg-slate-900 text-white">🏃 Running</option>
              <option value="Cycling" className="bg-slate-900 text-white">🚴 Cycling</option>
              <option value="Strength" className="bg-slate-900 text-white">🏋️ Strength</option>
              <option value="Yoga" className="bg-slate-900 text-white">🧘 Yoga</option>
            </select>

            <input
              type="number"
              min="5"
              max="180"
              placeholder="Mins"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="glass-input text-xs px-2.5 py-2 w-20 text-white"
            />

            <button
              type="submit"
              className="flex-1 py-2 rounded-xl bg-rose-500/25 hover:bg-rose-500/35 border border-rose-400/40 text-rose-200 font-bold text-xs flex items-center justify-center gap-1 transition"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Log Session</span>
            </button>
          </div>
        </form>

        {/* Workouts History List */}
        <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
          {workouts.length === 0 ? (
            <div className="text-center py-3 text-xs text-white/40 italic">
              No fitness workouts logged yet today.
            </div>
          ) : (
            workouts.map((w) => (
              <div
                key={w.id}
                className="flex items-center justify-between p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 text-xs transition"
              >
                <div>
                  <span className="font-semibold text-white block">{w.name}</span>
                  <span className="text-[10px] text-white/50">{w.duration} mins • {w.time}</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="font-semibold text-rose-300 bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/20">
                    🔥 {w.calories} kcal
                  </span>
                  <button
                    type="button"
                    onClick={() => handleDeleteWorkout(w.id)}
                    className="p-1 text-white/30 hover:text-rose-400 rounded transition"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="pt-3 mt-3 border-t border-white/10 flex items-center justify-between text-xs text-white/50">
        <span>Daily fitness goal: 30 mins</span>
        <span className="text-emerald-300 font-medium">
          {totalWorkoutMinutes >= 30 ? 'Goal Completed! 🏆' : `${30 - totalWorkoutMinutes} mins left`}
        </span>
      </div>
    </div>
  );
}
