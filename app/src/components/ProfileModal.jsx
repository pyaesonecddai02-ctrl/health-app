import React, { useState } from 'react';
import { X, User, Heart, Scale, Ruler, CheckCircle2, Save } from 'lucide-react';

export function ProfileModal({ isOpen, onClose, profile, onSaveProfile }) {
  const [formData, setFormData] = useState({
    name: profile.name || '',
    age: profile.age || 29,
    gender: profile.gender || 'Female',
    height: profile.height || 168,
    baselineWeight: profile.baselineWeight || 65.0,
    dailyWaterGoal: profile.dailyWaterGoal || 8,
    dailyStepsGoal: profile.dailyStepsGoal || 10000,
    dailyCaloriesGoal: profile.dailyCaloriesGoal || 2000,
  });

  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'number' ? parseFloat(value) || 0 : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSaveProfile(formData);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-200">
      <div className="glass-panel w-full max-w-lg p-6 sm:p-8 relative border border-white/20 shadow-2xl max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-lg text-white/50 hover:text-white hover:bg-white/10 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-teal-500/20 border border-teal-400/30 flex items-center justify-center text-teal-300 shadow-[0_0_15px_rgba(20,184,166,0.3)]">
            <User className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white tracking-tight">Profile & Health Vitals</h2>
            <p className="text-xs text-white/60">Configure your baseline biometric parameters</p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Name */}
            <div className="sm:col-span-2">
              <label className="block text-xs font-medium text-white/70 mb-1">Full Name</label>
              <input
                type="text"
                required
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Sarah Miller"
                className="glass-input w-full px-3.5 py-2.5 text-sm text-white"
              />
            </div>

            {/* Age */}
            <div>
              <label className="block text-xs font-medium text-white/70 mb-1">Age (Years)</label>
              <input
                type="number"
                required
                min="10"
                max="120"
                name="age"
                value={formData.age}
                onChange={handleChange}
                className="glass-input w-full px-3.5 py-2.5 text-sm text-white"
              />
            </div>

            {/* Gender */}
            <div>
              <label className="block text-xs font-medium text-white/70 mb-1">Gender</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="glass-input w-full px-3.5 py-2.5 text-sm text-white bg-slate-900/80 cursor-pointer"
              >
                <option value="Female" className="bg-slate-900 text-white">Female</option>
                <option value="Male" className="bg-slate-900 text-white">Male</option>
                <option value="Non-binary" className="bg-slate-900 text-white">Non-binary</option>
                <option value="Other" className="bg-slate-900 text-white">Other / Prefer not to say</option>
              </select>
            </div>

            {/* Height */}
            <div>
              <label className="block text-xs font-medium text-white/70 mb-1 flex items-center gap-1.5">
                <Ruler className="w-3.5 h-3.5 text-teal-300" />
                <span>Height (cm)</span>
              </label>
              <input
                type="number"
                required
                min="80"
                max="250"
                name="height"
                value={formData.height}
                onChange={handleChange}
                className="glass-input w-full px-3.5 py-2.5 text-sm text-white"
              />
            </div>

            {/* Baseline Weight */}
            <div>
              <label className="block text-xs font-medium text-white/70 mb-1 flex items-center gap-1.5">
                <Scale className="w-3.5 h-3.5 text-indigo-300" />
                <span>Baseline Weight (kg)</span>
              </label>
              <input
                type="number"
                step="0.1"
                required
                min="25"
                max="300"
                name="baselineWeight"
                value={formData.baselineWeight}
                onChange={handleChange}
                className="glass-input w-full px-3.5 py-2.5 text-sm text-white"
              />
            </div>
          </div>

          {/* Daily Goals Sub-Section */}
          <div className="pt-3 border-t border-white/10">
            <h3 className="text-xs font-semibold text-white/80 uppercase tracking-wider mb-3">
              Daily Target Goals
            </h3>
            <div className="grid grid-cols-3 gap-2.5">
              <div>
                <label className="block text-[11px] text-white/60 mb-1">Water (Glasses)</label>
                <input
                  type="number"
                  min="4"
                  max="16"
                  name="dailyWaterGoal"
                  value={formData.dailyWaterGoal}
                  onChange={handleChange}
                  className="glass-input w-full px-2.5 py-1.5 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-[11px] text-white/60 mb-1">Steps (Daily)</label>
                <input
                  type="number"
                  step="500"
                  min="2000"
                  max="30000"
                  name="dailyStepsGoal"
                  value={formData.dailyStepsGoal}
                  onChange={handleChange}
                  className="glass-input w-full px-2.5 py-1.5 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-[11px] text-white/60 mb-1">Calories (kcal)</label>
                <input
                  type="number"
                  step="50"
                  min="1200"
                  max="5000"
                  name="dailyCaloriesGoal"
                  value={formData.dailyCaloriesGoal}
                  onChange={handleChange}
                  className="glass-input w-full px-2.5 py-1.5 text-xs text-white"
                />
              </div>
            </div>
          </div>

          {savedSuccess && (
            <div className="p-2.5 rounded-lg bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>Profile details updated successfully!</span>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white/80 text-xs font-medium transition cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-slate-950 font-bold text-xs transition shadow-[0_0_15px_rgba(20,184,166,0.4)] flex items-center gap-1.5 cursor-pointer"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Changes</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
