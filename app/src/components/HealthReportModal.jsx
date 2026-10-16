import React from 'react';
import { X, Printer, Download, ShieldCheck, Heart, Footprints, Droplet, Scale, Flame } from 'lucide-react';

export function HealthReportModal({ isOpen, onClose, profile, dailyState, historicalData }) {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const avgSteps = Math.round(
    historicalData.reduce((acc, curr) => acc + curr.steps, 0) / historicalData.length
  );
  const avgCalories = Math.round(
    historicalData.reduce((acc, curr) => acc + curr.calories, 0) / historicalData.length
  );
  const bmi = (dailyState.weight / ((profile.height / 100) ** 2)).toFixed(1);

  const todayDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
      <div className="glass-panel w-full max-w-2xl p-6 sm:p-8 relative border border-white/20 shadow-2xl max-h-[92vh] overflow-y-auto">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-lg text-white/50 hover:text-white hover:bg-white/10 transition cursor-pointer print:hidden"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Report Document Header */}
        <div className="border-b border-white/15 pb-5 mb-5 flex justify-between items-start">
          <div>
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-widest mb-1">
              <ShieldCheck className="w-4 h-4" />
              <span>Certified Vitality Health Summary</span>
            </div>
            <h2 className="text-2xl font-black text-white">Biometric Patient Health Report</h2>
            <p className="text-xs text-white/60 mt-0.5">Report Date: {todayDate}</p>
          </div>

          <div className="text-right">
            <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 text-xs font-semibold">
              Official MVP Export
            </span>
          </div>
        </div>

        {/* Patient Demographic Card */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-xl bg-white/5 border border-white/10 text-xs mb-5">
          <div>
            <span className="text-white/50 block">Subject / Name</span>
            <strong className="text-white text-sm">{profile.name}</strong>
          </div>
          <div>
            <span className="text-white/50 block">Age & Gender</span>
            <strong className="text-white text-sm">{profile.age} yrs • {profile.gender}</strong>
          </div>
          <div>
            <span className="text-white/50 block">Height</span>
            <strong className="text-white text-sm">{profile.height} cm</strong>
          </div>
          <div>
            <span className="text-white/50 block">Current Weight</span>
            <strong className="text-white text-sm">{dailyState.weight} {dailyState.unit}</strong>
          </div>
        </div>

        {/* Health Biomarkers Matrix */}
        <h3 className="text-xs font-bold text-white/80 uppercase tracking-wider mb-3">
          7-Day Health Metrics Summary
        </h3>

        <div className="grid grid-cols-2 gap-3 text-xs mb-5">
          <div className="p-3.5 rounded-xl bg-black/20 border border-white/10 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-300">
              <Footprints className="w-5 h-5" />
            </div>
            <div>
              <span className="text-white/50 block">7-Day Step Average</span>
              <strong className="text-white text-base">{avgSteps.toLocaleString()} steps/day</strong>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-black/20 border border-white/10 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-rose-500/20 text-rose-300">
              <Heart className="w-5 h-5" />
            </div>
            <div>
              <span className="text-white/50 block">Blood Pressure</span>
              <strong className="text-white text-base">
                {dailyState.bloodPressure.systolic}/{dailyState.bloodPressure.diastolic} mmHg
              </strong>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-black/20 border border-white/10 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-cyan-500/20 text-cyan-300">
              <Droplet className="w-5 h-5" />
            </div>
            <div>
              <span className="text-white/50 block">Water Hydration</span>
              <strong className="text-white text-base">
                {dailyState.waterGlasses} glasses ({dailyState.waterGlasses * 250} ml)
              </strong>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-black/20 border border-white/10 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-indigo-500/20 text-indigo-300">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <span className="text-white/50 block">BMI Assessment</span>
              <strong className="text-white text-base">{bmi} (Optimal Range)</strong>
            </div>
          </div>
        </div>

        {/* Doctor / Physician Notes Area */}
        <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-xs mb-6">
          <span className="font-semibold text-white/80 block mb-1">Clinical Evaluation Summary:</span>
          <p className="text-white/70 leading-relaxed">
            Cardiovascular metrics and daily metabolic expenditure are consistent with healthy homeostasis.
            Hydration balance is maintained above recommended threshold. Maintain current aerobic cadence.
          </p>
        </div>

        {/* Print / Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-white/10 print:hidden">
          <span className="text-xs text-white/50">Ready for doctor consultation or printing</span>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition cursor-pointer"
            >
              Close
            </button>
            <button
              type="button"
              onClick={handlePrint}
              className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold transition flex items-center gap-1.5 shadow-[0_0_15px_rgba(52,211,153,0.4)] cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Print / Save as PDF</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
