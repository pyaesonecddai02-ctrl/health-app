import React from 'react';
import { Scale, TrendingDown, TrendingUp, Minus, Activity } from 'lucide-react';

export function WeightCard({
  weight,
  setWeight,
  yesterdayWeight = 65.0,
  unit = 'kg',
  setUnit,
  userHeight = 168, // in cm
  onOpenDetail,
}) {
  // Convert value display if lbs is chosen
  const displayWeight = unit === 'lbs' ? (weight * 2.20462).toFixed(1) : weight.toFixed(1);
  const displayYesterday = unit === 'lbs' ? (yesterdayWeight * 2.20462).toFixed(1) : yesterdayWeight.toFixed(1);

  // Difference calculation (in chosen unit)
  const diff = Number((displayWeight - displayYesterday).toFixed(1));
  const absDiff = Math.abs(diff).toFixed(1);

  // Status: lost is positive for health goals (green), gained is red, steady is neutral
  const isLoss = diff < 0;
  const isGain = diff > 0;
  const isSteady = diff === 0;

  // BMI Calculation: weight (kg) / (height(m) ^ 2)
  const heightM = userHeight / 100;
  const bmi = heightM > 0 ? (weight / (heightM * heightM)).toFixed(1) : null;

  const getBmiCategory = (bmiValue) => {
    if (!bmiValue) return { label: 'Unknown', color: 'text-white/60' };
    const val = parseFloat(bmiValue);
    if (val < 18.5) return { label: 'Underweight', color: 'text-yellow-300' };
    if (val < 25) return { label: 'Normal Weight', color: 'text-emerald-300' };
    if (val < 30) return { label: 'Overweight', color: 'text-yellow-400' };
    return { label: 'Obese', color: 'text-rose-400' };
  };

  const bmiInfo = getBmiCategory(bmi);

  const handleWeightChange = (e) => {
    const val = parseFloat(e.target.value);
    if (isNaN(val)) return;

    if (unit === 'lbs') {
      // convert lbs back to kg for canonical state
      setWeight(val / 2.20462);
    } else {
      setWeight(val);
    }
  };

  const toggleUnit = (newUnit) => {
    if (setUnit) {
      setUnit(newUnit);
    }
  };

  return (
    <div className="glass-card p-6 flex flex-col justify-between relative overflow-hidden group">
      {/* Ambient background glow */}
      <div className="absolute -right-12 -top-12 w-40 h-40 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none group-hover:bg-indigo-500/25 transition-all duration-700" />

      <div>
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center text-indigo-300 shadow-[0_0_15px_rgba(99,102,241,0.3)]">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold text-lg text-white tracking-wide">Weight Tracking</h3>
              <p className="text-xs text-indigo-200/70">Daily weigh-in comparison</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {onOpenDetail && (
              <button
                type="button"
                onClick={() => onOpenDetail('weight')}
                title="View Weight & BMI Deep Dive"
                className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-white/50 hover:text-white transition cursor-pointer"
              >
                <Activity className="w-3.5 h-3.5" />
              </button>
            )}

            {/* Unit Switcher */}
            <div className="inline-flex rounded-lg bg-black/30 p-1 border border-white/10 text-xs">
              <button
                type="button"
                onClick={() => toggleUnit('kg')}
                className={`px-2.5 py-0.5 rounded-md font-medium transition ${
                  unit === 'kg'
                    ? 'bg-indigo-500 text-white shadow-sm font-semibold'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                kg
              </button>
              <button
                type="button"
                onClick={() => toggleUnit('lbs')}
                className={`px-2.5 py-0.5 rounded-md font-medium transition ${
                  unit === 'lbs'
                    ? 'bg-indigo-500 text-white shadow-sm font-semibold'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                lbs
              </button>
            </div>
          </div>
        </div>

        {/* Weight Input & Reading */}
        <div className="my-3 flex flex-wrap items-baseline justify-between gap-3">
          <div className="flex items-baseline gap-2">
            <input
              type="number"
              step="0.1"
              min="20"
              max="300"
              value={displayWeight}
              onChange={handleWeightChange}
              aria-label="Today's weight"
              className="glass-input text-3xl font-bold w-36 px-3 py-1 text-white focus:text-indigo-200"
            />
            <span className="text-sm font-medium text-white/60">{unit}</span>
          </div>

          {/* PRD Specified Difference Indicator: ⬇ green if lost, ⬆ red if gained */}
          <div className="flex items-center">
            {isLoss && (
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 font-semibold text-sm shadow-[0_0_12px_rgba(34,197,94,0.3)]">
                <TrendingDown className="w-4 h-4 text-emerald-400 stroke-[2.5]" />
                <span>⬇ {absDiff} {unit}</span>
                <span className="text-[10px] text-emerald-200/80 font-normal ml-0.5">(loss)</span>
              </div>
            )}

            {isGain && (
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-500/20 border border-rose-400/40 text-rose-300 font-semibold text-sm shadow-[0_0_12px_rgba(244,63,94,0.3)]">
                <TrendingUp className="w-4 h-4 text-rose-400 stroke-[2.5]" />
                <span>⬆ {absDiff} {unit}</span>
                <span className="text-[10px] text-rose-200/80 font-normal ml-0.5">(gain)</span>
              </div>
            )}

            {isSteady && (
              <div className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-white/10 border border-white/20 text-white/80 font-medium text-sm">
                <Minus className="w-4 h-4" />
                <span>0.0 {unit}</span>
                <span className="text-[10px] text-white/50 ml-0.5">(steady)</span>
              </div>
            )}
          </div>
        </div>

        {/* Yesterday's Baseline Context */}
        <div className="p-3 rounded-xl bg-white/5 border border-white/10 my-3 text-xs flex items-center justify-between">
          <span className="text-white/60">Yesterday's Record:</span>
          <span className="font-semibold text-white/90">
            {displayYesterday} {unit}
          </span>
        </div>

        {/* Body Mass Index (BMI) Insights */}
        {bmi && (
          <div className="mt-2 p-3 rounded-xl bg-black/20 border border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-indigo-300" />
              <span className="text-xs text-white/70">Estimated BMI:</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-white">{bmi}</span>
              <span className={`text-xs px-2 py-0.5 rounded-md bg-white/10 ${bmiInfo.color} font-medium`}>
                {bmiInfo.label}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Footer quick adjustments */}
      <div className="pt-4 mt-3 border-t border-white/10 flex items-center justify-between text-xs text-white/60">
        <span>Target: 62.0 {unit}</span>
        <div className="flex gap-1.5">
          <button
            type="button"
            onClick={() => setWeight((prev) => Math.max(30, prev - 0.1))}
            className="px-2 py-1 rounded bg-white/5 hover:bg-white/15 border border-white/10 text-white"
          >
            -0.1
          </button>
          <button
            type="button"
            onClick={() => setWeight((prev) => prev + 0.1)}
            className="px-2 py-1 rounded bg-white/5 hover:bg-white/15 border border-white/10 text-white"
          >
            +0.1
          </button>
        </div>
      </div>
    </div>
  );
}
