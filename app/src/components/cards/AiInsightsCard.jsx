import React from 'react';
import { Sparkles, Bot, TrendingUp, CheckCircle2, AlertCircle, ArrowUpRight } from 'lucide-react';

export function AiInsightsCard({ dailyState, profile }) {
  const { waterGlasses, steps, weight, bloodPressure, meals } = dailyState;
  const totalCalories = meals.reduce((sum, m) => sum + (parseInt(m.calories, 10) || 0), 0);

  // Dynamic Vitality Score algorithm
  let score = 50;
  if (waterGlasses >= 8) score += 12;
  else score += Math.round((waterGlasses / 8) * 10);

  if (steps >= 10000) score += 15;
  else score += Math.round((steps / 10000) * 12);

  if (bloodPressure.systolic < 120 && bloodPressure.diastolic < 80) score += 13;
  else if (bloodPressure.systolic < 130 && bloodPressure.diastolic < 80) score += 8;

  if (totalCalories > 1400 && totalCalories <= 2200) score += 10;
  else score += 5;

  score = Math.min(100, Math.max(30, score));

  // Dynamic AI Suggestions
  const suggestions = [];

  if (waterGlasses < 8) {
    suggestions.push({
      type: 'hydration',
      text: `You have logged ${waterGlasses}/8 glasses (${waterGlasses * 250}ml). Drinking ${8 - waterGlasses} more glasses before evening will optimize metabolic hydration.`,
      icon: '💧',
    });
  } else {
    suggestions.push({
      type: 'hydration',
      text: `Perfect hydration target achieved (${waterGlasses * 250}ml)! Cellular recovery and energy efficiency are maximized.`,
      icon: '🌟',
    });
  }

  if (steps < 10000) {
    const remainingSteps = 10000 - steps;
    suggestions.push({
      type: 'steps',
      text: `You're ${remainingSteps.toLocaleString()} steps away from the 10,000 Peak Goal. A brisk 20-minute evening walk will complete it!`,
      icon: '👟',
    });
  } else {
    suggestions.push({
      type: 'steps',
      text: `Outstanding! You've conquered ${steps.toLocaleString()} steps today. Active calorie expenditure is on point.`,
      icon: '🏆',
    });
  }

  if (bloodPressure.systolic >= 130 || bloodPressure.diastolic >= 80) {
    suggestions.push({
      type: 'bp',
      text: `Blood pressure reading (${bloodPressure.systolic}/${bloodPressure.diastolic}) is elevated. Consider taking a 5-minute deep breathing break and reducing sodium.`,
      icon: '❤️',
    });
  }

  return (
    <div className="glass-panel p-6 sm:p-8 relative overflow-hidden border border-emerald-400/30 my-8">
      {/* Ambient background glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-slate-950 shadow-[0_0_20px_rgba(52,211,153,0.5)]">
              <Bot className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-lg text-white">Vitalis AI Health Assistant</h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 uppercase tracking-wider">
                  Live Insights
                </span>
              </div>
              <p className="text-xs text-emerald-200/70">
                Personalized biometric recommendations synthesized from your daily inputs
              </p>
            </div>
          </div>

          {/* Daily Vitality Score */}
          <div className="flex items-center gap-3 glass-card px-4 py-2 border-emerald-400/40">
            <div className="text-right">
              <span className="text-[10px] text-white/60 block leading-tight">Daily Vitality Score</span>
              <span className="text-xs font-semibold text-emerald-300">
                {score >= 85 ? 'Optimal Flow' : score >= 70 ? 'Good Equilibrium' : 'Action Recommended'}
              </span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-400/50 flex items-center justify-center text-emerald-300 font-extrabold text-xl shadow-[0_0_15px_rgba(52,211,153,0.4)]">
              {score}
            </div>
          </div>
        </div>

        {/* Suggestions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
          {suggestions.map((item, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-xl bg-white/5 border border-white/10 hover:border-emerald-400/30 transition flex items-start gap-3"
            >
              <span className="text-2xl shrink-0 p-1 rounded-lg bg-black/20">{item.icon}</span>
              <div className="text-xs">
                <p className="text-white/90 leading-relaxed font-medium">{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
