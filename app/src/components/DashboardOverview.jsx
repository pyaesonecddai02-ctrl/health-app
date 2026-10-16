import React, { useState } from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import {
  TrendingUp,
  Calendar,
  Footprints,
  Scale,
  Flame,
  Droplet,
  ChevronDown,
  Sparkles,
} from 'lucide-react';
import { HISTORICAL_DATA_7_DAYS, HISTORICAL_DATA_30_DAYS } from '../data/mockData';

// Custom Glassmorphic Tooltip for Recharts
const CustomTooltip = ({ active, payload, label, metric, unit }) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass-panel p-3 text-xs shadow-2xl border border-white/20 rounded-xl">
        <p className="font-semibold text-white/80 mb-1">{label}</p>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
          <span className="text-white/70 capitalize">{metric}:</span>
          <span className="font-bold text-white text-sm">
            {payload[0].value.toLocaleString()} {unit}
          </span>
        </div>
      </div>
    );
  }
  return null;
};

export function DashboardOverview({ profile, dailyState, onOpenProfile }) {
  const [timeRange, setTimeRange] = useState('7d'); // '7d' | '30d'
  const [metric, setMetric] = useState('steps'); // 'steps' | 'weight' | 'calories'

  const rawData = timeRange === '7d' ? HISTORICAL_DATA_7_DAYS : HISTORICAL_DATA_30_DAYS;

  // Clone and inject today's live data at the latest point so chart reflects user's edits!
  const chartData = rawData.map((item, idx) => {
    if (idx === rawData.length - 1) {
      const todayCalories = dailyState.meals.reduce(
        (sum, m) => sum + (parseInt(m.calories, 10) || 0),
        0
      );
      return {
        ...item,
        steps: dailyState.steps,
        weight: dailyState.weight,
        calories: todayCalories,
      };
    }
    return item;
  });

  // Metric visual configuration
  const metricConfigs = {
    steps: {
      label: 'Daily Steps',
      color: '#34d399', // Emerald
      gradientId: 'stepsGrad',
      unit: 'steps',
      icon: Footprints,
      avg: Math.round(chartData.reduce((acc, curr) => acc + curr.steps, 0) / chartData.length),
      current: dailyState.steps,
      goal: profile.dailyStepsGoal || 10000,
    },
    weight: {
      label: 'Body Weight',
      color: '#818cf8', // Indigo
      gradientId: 'weightGrad',
      unit: dailyState.unit || 'kg',
      icon: Scale,
      avg: (chartData.reduce((acc, curr) => acc + curr.weight, 0) / chartData.length).toFixed(1),
      current: dailyState.weight,
      goal: 62.0,
    },
    calories: {
      label: 'Calories Consumed',
      color: '#fbbf24', // Amber
      gradientId: 'caloriesGrad',
      unit: 'kcal',
      icon: Flame,
      avg: Math.round(chartData.reduce((acc, curr) => acc + curr.calories, 0) / chartData.length),
      current: dailyState.meals.reduce((sum, m) => sum + (parseInt(m.calories, 10) || 0), 0),
      goal: profile.dailyCaloriesGoal || 2000,
    },
  };

  const activeConfig = metricConfigs[metric];
  const ActiveIcon = activeConfig.icon;

  // Format today's date
  const todayFormatted = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date());

  return (
    <div className="glass-panel p-6 sm:p-8 relative overflow-hidden mb-8 border border-white/20">
      {/* Nature ambient lighting orbs */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Banner: Greeting, Date, and User Profile Link */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/10 relative z-10">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-400 mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Vitality Dashboard • Phase 1 MVP</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-teal-200 to-cyan-300">{profile.name}</span> 🌿
          </h1>
          <p className="text-sm text-white/70 mt-1 flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-emerald-400" />
            <span>{todayFormatted}</span>
          </p>
        </div>

        {/* Quick KPI Highlights row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          <div className="glass-card px-3 py-2 text-center">
            <div className="text-[10px] text-cyan-300 flex items-center justify-center gap-1">
              <Droplet className="w-3 h-3" /> Water
            </div>
            <div className="text-sm font-bold text-white mt-0.5">
              {dailyState.waterGlasses}/8 <span className="text-[10px] text-white/50">glasses</span>
            </div>
          </div>

          <div className="glass-card px-3 py-2 text-center">
            <div className="text-[10px] text-emerald-300 flex items-center justify-center gap-1">
              <Footprints className="w-3 h-3" /> Steps
            </div>
            <div className="text-sm font-bold text-white mt-0.5">
              {dailyState.steps.toLocaleString()}
            </div>
          </div>

          <div className="glass-card px-3 py-2 text-center">
            <div className="text-[10px] text-indigo-300 flex items-center justify-center gap-1">
              <Scale className="w-3 h-3" /> Weight
            </div>
            <div className="text-sm font-bold text-white mt-0.5">
              {dailyState.weight} <span className="text-[10px] text-white/50">{dailyState.unit}</span>
            </div>
          </div>

          <div className="glass-card px-3 py-2 text-center">
            <div className="text-[10px] text-amber-300 flex items-center justify-center gap-1">
              <Flame className="w-3 h-3" /> Calories
            </div>
            <div className="text-sm font-bold text-white mt-0.5">
              {dailyState.meals.reduce((sum, m) => sum + (parseInt(m.calories, 10) || 0), 0)} <span className="text-[10px] text-white/50">kcal</span>
            </div>
          </div>
        </div>
      </div>

      {/* Chart Controls Bar */}
      <div className="mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
        {/* Metric Selector Tabs */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-black/40 border border-white/10 w-fit">
          <button
            type="button"
            onClick={() => setMetric('steps')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition ${
              metric === 'steps'
                ? 'bg-emerald-500/30 text-emerald-300 border border-emerald-400/40 shadow-[0_0_12px_rgba(52,211,153,0.3)]'
                : 'text-white/60 hover:text-white hover:bg-white/5'
            }`}
          >
            <Footprints className="w-3.5 h-3.5" />
            <span>Steps</span>
          </button>

          <button
            type="button"
            onClick={() => setMetric('weight')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition ${
              metric === 'weight'
                ? 'bg-indigo-500/30 text-indigo-300 border border-indigo-400/40 shadow-[0_0_12px_rgba(99,102,241,0.3)]'
                : 'text-white/60 hover:text-white hover:bg-white/5'
            }`}
          >
            <Scale className="w-3.5 h-3.5" />
            <span>Weight</span>
          </button>

          <button
            type="button"
            onClick={() => setMetric('calories')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition ${
              metric === 'calories'
                ? 'bg-amber-500/30 text-amber-300 border border-amber-400/40 shadow-[0_0_12px_rgba(245,158,11,0.3)]'
                : 'text-white/60 hover:text-white hover:bg-white/5'
            }`}
          >
            <Flame className="w-3.5 h-3.5" />
            <span>Calories</span>
          </button>
        </div>

        {/* 7-Day vs 30-Day Range Toggle */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-white/50">View:</span>
          <div className="inline-flex rounded-xl bg-black/40 p-1 border border-white/10 text-xs">
            <button
              type="button"
              onClick={() => setTimeRange('7d')}
              className={`px-3 py-1 rounded-lg font-medium transition ${
                timeRange === '7d'
                  ? 'bg-white/20 text-white shadow-sm font-semibold border border-white/20'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              7-Day Trend
            </button>
            <button
              type="button"
              onClick={() => setTimeRange('30d')}
              className={`px-3 py-1 rounded-lg font-medium transition ${
                timeRange === '30d'
                  ? 'bg-white/20 text-white shadow-sm font-semibold border border-white/20'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              30-Day Trend
            </button>
          </div>
        </div>
      </div>

      {/* Metric summary banner */}
      <div className="mt-4 mb-2 flex items-center justify-between text-xs text-white/70">
        <div className="flex items-center gap-2">
          <ActiveIcon className="w-4 h-4 text-emerald-400" />
          <span className="font-semibold text-white">{activeConfig.label}</span>
          <span className="text-white/40">•</span>
          <span>Period Average: <strong className="text-white">{activeConfig.avg.toLocaleString()} {activeConfig.unit}</strong></span>
        </div>
        <div className="text-[11px] text-white/50">
          Target: {activeConfig.goal.toLocaleString()} {activeConfig.unit}
        </div>
      </div>

      {/* Interactive Recharts Analytics Chart */}
      <div className="w-full h-64 sm:h-72 mt-2 pt-2 relative z-10">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
            <defs>
              <linearGradient id={activeConfig.gradientId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={activeConfig.color} stopOpacity={0.45} />
                <stop offset="95%" stopColor={activeConfig.color} stopOpacity={0.02} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.08)" vertical={false} />

            <XAxis
              dataKey="date"
              stroke="rgba(255, 255, 255, 0.45)"
              tickLine={false}
              axisLine={{ stroke: 'rgba(255, 255, 255, 0.15)' }}
              tick={{ fill: 'rgba(255, 255, 255, 0.6)', fontSize: 11 }}
            />

            <YAxis
              stroke="rgba(255, 255, 255, 0.45)"
              tickLine={false}
              axisLine={{ stroke: 'rgba(255, 255, 255, 0.15)' }}
              tick={{ fill: 'rgba(255, 255, 255, 0.6)', fontSize: 11 }}
              domain={metric === 'weight' ? ['dataMin - 1', 'dataMax + 1'] : [0, 'auto']}
            />

            <Tooltip
              content={<CustomTooltip metric={activeConfig.label} unit={activeConfig.unit} />}
            />

            <Area
              type="monotone"
              dataKey={metric}
              stroke={activeConfig.color}
              strokeWidth={2.5}
              fillOpacity={1}
              fill={`url(#${activeConfig.gradientId})`}
              dot={{
                r: 3,
                fill: activeConfig.color,
                stroke: '#0f172a',
                strokeWidth: 2,
              }}
              activeDot={{
                r: 6,
                fill: activeConfig.color,
                stroke: '#ffffff',
                strokeWidth: 2,
                boxShadow: '0 0 10px rgba(255, 255, 255, 0.8)',
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
