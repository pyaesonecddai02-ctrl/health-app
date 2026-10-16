import React, { useState } from 'react';
import { Utensils, Plus, Trash2, PieChart, Sparkles } from 'lucide-react';

export function DietCard({ meals, setMeals, targetCalories = 2000, onOpenDetail }) {
  const [mealName, setMealName] = useState('');
  const [calories, setCalories] = useState('');
  const [category, setCategory] = useState('Lunch');

  const totalCalories = meals.reduce((sum, item) => sum + (parseInt(item.calories, 10) || 0), 0);
  const remainingCalories = Math.max(0, targetCalories - totalCalories);
  const percentage = Math.min(Math.round((totalCalories / targetCalories) * 100), 100);
  const isOverTarget = totalCalories > targetCalories;

  const handleAddMeal = (e) => {
    e.preventDefault();
    if (!mealName.trim() || !calories || parseInt(calories, 10) <= 0) return;

    const newMeal = {
      id: Date.now().toString(),
      name: mealName.trim(),
      calories: parseInt(calories, 10),
      category,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMeals((prev) => [newMeal, ...prev]);
    setMealName('');
    setCalories('');
  };

  const handleDeleteMeal = (id) => {
    setMeals((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="glass-card p-6 flex flex-col justify-between relative overflow-hidden group">
      {/* Ambient background glow */}
      <div className="absolute -right-12 -top-12 w-40 h-40 bg-amber-500/15 rounded-full blur-3xl pointer-events-none group-hover:bg-amber-500/25 transition-all duration-700" />

      <div>
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-400/30 flex items-center justify-center text-amber-300 shadow-[0_0_15px_rgba(245,158,11,0.3)]">
              <Utensils className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold text-lg text-white tracking-wide">Diet & Calories</h3>
              <p className="text-xs text-amber-200/70">Daily target: {targetCalories.toLocaleString()} kcal</p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            {onOpenDetail && (
              <button
                type="button"
                onClick={() => onOpenDetail('diet')}
                title="View Nutrition Deep Dive"
                className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-white/50 hover:text-white transition cursor-pointer"
              >
                <PieChart className="w-3.5 h-3.5" />
              </button>
            )}
            {/* Running total badge */}
            <span
              className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full border ${
                isOverTarget
                  ? 'bg-rose-500/20 border-rose-400/40 text-rose-300'
                  : 'bg-amber-500/20 border-amber-400/40 text-amber-300'
              }`}
            >
              {percentage}% Target
            </span>
          </div>
        </div>

        {/* Calories Counter & Remaining */}
        <div className="my-3 flex items-baseline justify-between">
          <div>
            <span className="text-3xl font-bold tracking-tight text-white">
              {totalCalories.toLocaleString()}
            </span>
            <span className="text-sm font-medium text-white/60 ml-1">/ {targetCalories.toLocaleString()} kcal</span>
          </div>

          <div className="text-right text-xs">
            {isOverTarget ? (
              <span className="text-rose-400 font-semibold">
                +{totalCalories - targetCalories} kcal exceeded
              </span>
            ) : (
              <span className="text-emerald-300 font-medium">
                {remainingCalories.toLocaleString()} kcal left
              </span>
            )}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-black/25 h-2.5 rounded-full overflow-hidden p-0.5 border border-white/10 mb-4">
          <div
            className={`h-full rounded-full transition-all duration-500 ${
              isOverTarget
                ? 'bg-gradient-to-r from-amber-500 to-rose-500'
                : 'bg-gradient-to-r from-amber-400 to-emerald-400'
            }`}
            style={{ width: `${percentage}%` }}
          />
        </div>

        {/* Add Meal Form */}
        <form onSubmit={handleAddMeal} className="space-y-2 mb-4 p-3 rounded-xl bg-white/5 border border-white/10">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Meal Name (e.g. Oatmeal & Chia)"
              value={mealName}
              onChange={(e) => setMealName(e.target.value)}
              className="glass-input text-xs px-3 py-2 flex-1 text-white placeholder-white/40"
            />
            <input
              type="number"
              placeholder="Kcal"
              min="1"
              max="4000"
              value={calories}
              onChange={(e) => setCalories(e.target.value)}
              className="glass-input text-xs px-3 py-2 w-20 text-white placeholder-white/40"
            />
          </div>

          <div className="flex items-center justify-between gap-2">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="glass-input text-xs px-2.5 py-1.5 text-white/80 bg-slate-900/80 cursor-pointer"
            >
              <option value="Breakfast" className="bg-slate-900 text-white">Breakfast</option>
              <option value="Lunch" className="bg-slate-900 text-white">Lunch</option>
              <option value="Dinner" className="bg-slate-900 text-white">Dinner</option>
              <option value="Snack" className="bg-slate-900 text-white">Snack</option>
            </select>

            <button
              type="submit"
              disabled={!mealName.trim() || !calories}
              className="px-3 py-1.5 text-xs rounded-xl bg-amber-500/30 hover:bg-amber-500/40 border border-amber-400/40 text-amber-200 font-semibold disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5 transition shadow-sm"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Meal</span>
            </button>
          </div>
        </form>

        {/* Meals List View */}
        <div>
          <div className="flex items-center justify-between text-xs text-white/60 mb-2">
            <span>Logged Today ({meals.length})</span>
            <span className="text-[11px] text-amber-300">Running Sum: {totalCalories} kcal</span>
          </div>

          <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
            {meals.length === 0 ? (
              <div className="text-center py-4 text-xs text-white/40 italic">
                No meals logged yet today.
              </div>
            ) : (
              meals.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 text-xs transition group/item"
                >
                  <div className="flex flex-col min-w-0 pr-2">
                    <span className="font-medium text-white truncate">{item.name}</span>
                    <span className="text-[10px] text-white/50">
                      {item.category} • {item.time}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className="font-semibold text-amber-300 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                      {item.calories} kcal
                    </span>
                    <button
                      type="button"
                      onClick={() => handleDeleteMeal(item.id)}
                      title="Remove meal"
                      className="p-1 text-white/30 hover:text-rose-400 hover:bg-rose-500/10 rounded transition"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Quick Add Suggestions */}
      <div className="pt-3 mt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-white/50">
        <span className="flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-amber-300" />
          Quick snack:
        </span>
        <button
          type="button"
          onClick={() => {
            setMeals((prev) => [
              {
                id: Date.now().toString(),
                name: 'Crisp Apple & Almonds',
                calories: 160,
                category: 'Snack',
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              },
              ...prev,
            ]);
          }}
          className="text-amber-300/80 hover:text-amber-200 underline"
        >
          + Apple & Almonds (160 kcal)
        </button>
      </div>
    </div>
  );
}
