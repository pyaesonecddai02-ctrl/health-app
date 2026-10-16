import React from 'react';
import {
  X,
  Droplet,
  Footprints,
  Scale,
  Heart,
  Utensils,
  Moon,
  Timer,
  Smile,
  ShieldCheck,
  TrendingUp,
  Info,
  CheckCircle2,
  Calendar,
} from 'lucide-react';

export function MetricDetailModal({
  isOpen,
  onClose,
  metricType,
  dailyState,
  profile,
}) {
  if (!isOpen || !metricType) return null;

  const renderContent = () => {
    switch (metricType) {
      case 'water':
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-4 rounded-xl bg-cyan-500/10 border border-cyan-400/30">
              <Droplet className="w-8 h-8 text-cyan-300 fill-cyan-400/30 shrink-0" />
              <div>
                <h4 className="font-bold text-white text-base">Optimal Hydration Protocol</h4>
                <p className="text-xs text-white/70">
                  Target: 2,000 ml (8 glasses). Currently logged: {dailyState.waterGlasses * 250} ml (
                  {Math.round((dailyState.waterGlasses / 8) * 100)}%).
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                <span className="text-white/50 block mb-1">Morning Kickstart</span>
                <p className="font-semibold text-white">500ml on waking</p>
                <span className="text-[11px] text-cyan-300">Reactivates gut & kidney filtration</span>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                <span className="text-white/50 block mb-1">Electrolyte Absorption</span>
                <p className="font-semibold text-white">Sip periodically</p>
                <span className="text-[11px] text-cyan-300">Better cell uptake than chugging</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-black/20 border border-white/10 text-xs space-y-2">
              <h5 className="font-semibold text-white flex items-center gap-1.5">
                <Info className="w-4 h-4 text-cyan-300" />
                <span>Hydration Biomarkers</span>
              </h5>
              <p className="text-white/80 leading-relaxed">
                Adequate water intake accelerates cognitive sharpness, lubricates synovial joints,
                and optimizes caloric basal metabolic rate by up to 3% throughout the day.
              </p>
            </div>
          </div>
        );

      case 'steps':
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-4 rounded-xl bg-emerald-500/10 border border-emerald-400/30">
              <Footprints className="w-8 h-8 text-emerald-300 shrink-0" />
              <div>
                <h4 className="font-bold text-white text-base">Daily Locomotion & Aerobic Vitals</h4>
                <p className="text-xs text-white/70">
                  Logged: {dailyState.steps.toLocaleString()} / 10,000 steps (
                  {(dailyState.steps * 0.00075).toFixed(2)} km covered)
                </p>
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between p-2.5 rounded-lg bg-white/5 border border-white/10">
                <span className="text-white/70">Warmup Baseline (2,000)</span>
                <span className="text-emerald-300 font-bold">
                  {dailyState.steps >= 2000 ? '✅ Unlocked' : 'Pending'}
                </span>
              </div>
              <div className="flex justify-between p-2.5 rounded-lg bg-white/5 border border-white/10">
                <span className="text-white/70">Metabolic Boost (6,000)</span>
                <span className="text-emerald-300 font-bold">
                  {dailyState.steps >= 6000 ? '✅ Unlocked' : 'Pending'}
                </span>
              </div>
              <div className="flex justify-between p-2.5 rounded-lg bg-white/5 border border-white/10">
                <span className="text-white/70">Peak Cardiovascular (10,000)</span>
                <span className="text-emerald-300 font-bold">
                  {dailyState.steps >= 10000 ? '🏆 Mastered' : `${10000 - dailyState.steps} steps remaining`}
                </span>
              </div>
            </div>

            <p className="text-xs text-white/70 leading-relaxed p-3 rounded-xl bg-black/20 border border-white/10">
              💡 10,000 steps burn approximately 420 kcal and significantly reduce resting blood pressure and fasting insulin resistance.
            </p>
          </div>
        );

      case 'weight':
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-4 rounded-xl bg-indigo-500/10 border border-indigo-400/30">
              <Scale className="w-8 h-8 text-indigo-300 shrink-0" />
              <div>
                <h4 className="font-bold text-white text-base">Weight Dynamics & Biometrics</h4>
                <p className="text-xs text-white/70">
                  Current: {dailyState.weight} {dailyState.unit} • Height: {profile.height} cm
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                <span className="text-white/50 block">Baseline Weight</span>
                <span className="text-lg font-bold text-white">{profile.baselineWeight} kg</span>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                <span className="text-white/50 block">Body Mass Index (BMI)</span>
                <span className="text-lg font-bold text-emerald-300">
                  {(dailyState.weight / ((profile.height / 100) ** 2)).toFixed(1)} (Normal)
                </span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-black/20 border border-white/10 text-xs">
              <h5 className="font-semibold text-white mb-1">Weigh-in Best Practices</h5>
              <p className="text-white/70 leading-relaxed">
                For consistent trend accuracy, weigh yourself first thing in the morning after using
                the restroom and before consuming food or fluids.
              </p>
            </div>
          </div>
        );

      case 'bp':
      case 'bloodpressure':
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-4 rounded-xl bg-rose-500/10 border border-rose-400/30">
              <Heart className="w-8 h-8 text-rose-300 shrink-0" />
              <div>
                <h4 className="font-bold text-white text-base">AHA Blood Pressure Classification</h4>
                <p className="text-xs text-white/70">
                  Logged: {dailyState.bloodPressure.systolic} / {dailyState.bloodPressure.diastolic} mmHg
                </p>
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <div className="p-2.5 rounded-lg bg-emerald-500/15 border border-emerald-400/30 flex justify-between items-center text-emerald-300">
                <span>Normal: &lt;120 AND &lt;80 mmHg</span>
                <span className="font-bold">Healthy Range</span>
              </div>
              <div className="p-2.5 rounded-lg bg-yellow-500/15 border border-yellow-400/30 flex justify-between items-center text-yellow-300">
                <span>Elevated: 120-129 AND &lt;80 mmHg</span>
                <span className="font-bold">Pre-hypertension</span>
              </div>
              <div className="p-2.5 rounded-lg bg-rose-500/15 border border-rose-400/30 flex justify-between items-center text-rose-300">
                <span>High: ≥130 OR ≥80 mmHg</span>
                <span className="font-bold">Hypertension</span>
              </div>
            </div>
          </div>
        );

      case 'diet':
        const totalCalories = dailyState.meals.reduce(
          (sum, m) => sum + (parseInt(m.calories, 10) || 0),
          0
        );
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-4 rounded-xl bg-amber-500/10 border border-amber-400/30">
              <Utensils className="w-8 h-8 text-amber-300 shrink-0" />
              <div>
                <h4 className="font-bold text-white text-base">Nutrition & Calorie Balance</h4>
                <p className="text-xs text-white/70">
                  Consumed: {totalCalories} / {profile.dailyCaloriesGoal || 2000} kcal
                </p>
              </div>
            </div>

            <div className="space-y-1.5 max-h-48 overflow-y-auto">
              {dailyState.meals.map((m) => (
                <div
                  key={m.id}
                  className="p-2.5 rounded-lg bg-white/5 border border-white/5 flex justify-between items-center text-xs"
                >
                  <div>
                    <span className="font-semibold text-white block">{m.name}</span>
                    <span className="text-[10px] text-white/50">{m.category} • {m.time}</span>
                  </div>
                  <span className="font-bold text-amber-300">{m.calories} kcal</span>
                </div>
              ))}
            </div>
          </div>
        );

      case 'sleep':
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-4 rounded-xl bg-purple-500/10 border border-purple-400/30">
              <Moon className="w-8 h-8 text-purple-300 shrink-0" />
              <div>
                <h4 className="font-bold text-white text-base">Sleep Cycle & Neuro-Restoration</h4>
                <p className="text-xs text-white/70">Target: 8.0 hrs • Quality Score: 88%</p>
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                <span className="font-semibold text-indigo-300 block mb-0.5">Deep Sleep (N3 Stage)</span>
                <p className="text-white/70">Crucial for human growth hormone release, physical tissue recovery, and brain waste clearance.</p>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                <span className="font-semibold text-teal-300 block mb-0.5">REM Sleep</span>
                <p className="text-white/70">Essential for emotional memory consolidation, problem solving, and neural plasticity.</p>
              </div>
            </div>
          </div>
        );

      case 'fasting':
        const targetFastingHours = dailyState.fastingData?.targetHours || 16;
        const currentFastingProtocol = dailyState.fastingData?.protocol || (targetFastingHours === 20 ? '20:4' : '16:8');
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-4 rounded-xl bg-orange-500/10 border border-orange-400/30">
              <Timer className="w-8 h-8 text-orange-300 shrink-0" />
              <div>
                <h4 className="font-bold text-white text-base">Fasting Autophagy Progression</h4>
                <p className="text-xs text-white/70">
                  {currentFastingProtocol === '20:4' ? '20:4 Warrior Diet (20h Fast / 4h Eat)' : '16:8 LeanGains (16h Fast / 8h Eat)'}
                </p>
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <div className="p-2.5 rounded-lg bg-white/5 border border-white/10 flex items-center justify-between">
                <span>0-4 Hours</span>
                <span className="text-white/60">Anabolic digestion & blood sugar stabilization</span>
              </div>
              <div className="p-2.5 rounded-lg bg-white/5 border border-white/10 flex items-center justify-between">
                <span>4-12 Hours</span>
                <span className="text-amber-300">Glycogen depletion & insulin drop</span>
              </div>
              <div className="p-2.5 rounded-lg bg-white/5 border border-white/10 flex items-center justify-between">
                <span>12-16 Hours</span>
                <span className="text-orange-400 font-semibold">Fat Burning & Ketone Production 🔥</span>
              </div>
              <div className="p-2.5 rounded-lg bg-emerald-500/15 border border-emerald-400/30 flex items-center justify-between text-emerald-300">
                <span>16-18 Hours</span>
                <span className="font-bold">Cellular Autophagy Active (16:8 Goal) ✨</span>
              </div>
              <div className="p-2.5 rounded-lg bg-teal-500/20 border border-teal-400/40 flex items-center justify-between text-teal-200">
                <span>18-20 Hours</span>
                <span className="font-bold">Deep Autophagy & HGH Surge (20:4 Warrior Goal) 🌟</span>
              </div>
              <div className="p-2.5 rounded-lg bg-cyan-500/15 border border-cyan-400/30 flex items-center justify-between text-cyan-200">
                <span>20+ Hours</span>
                <span className="font-bold">Peak Metabolic Rejuvenation & Insulin Sensitivity 🏆</span>
              </div>
            </div>
          </div>
        );

      case 'mood':
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-4 rounded-xl bg-teal-500/10 border border-teal-400/30">
              <Smile className="w-8 h-8 text-teal-300 shrink-0" />
              <div>
                <h4 className="font-bold text-white text-base">Emotional Equilibrium & Heart-Rate Variability</h4>
                <p className="text-xs text-white/70">Tracking mindfulness & daily cognitive stress</p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-black/20 border border-white/10 text-xs space-y-2">
              <h5 className="font-semibold text-white">Mindfulness Recommendation</h5>
              <p className="text-white/80 leading-relaxed">
                Daily conscious reflections help regulate the sympathetic nervous system, lowering
                cortisol and improving restorative sleep latency.
              </p>
            </div>
          </div>
        );

      case 'workout':
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-4 rounded-xl bg-rose-500/10 border border-rose-400/30">
              <TrendingUp className="w-8 h-8 text-rose-300 shrink-0" />
              <div>
                <h4 className="font-bold text-white text-base">Aerobic & Anaerobic Conditioning</h4>
                <p className="text-xs text-white/70">Target: 30 mins moderate-to-vigorous exercise</p>
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                <span className="font-semibold text-rose-300 block mb-0.5">High-Intensity Intervals (HIIT)</span>
                <p className="text-white/70">Triggers Excess Post-exercise Oxygen Consumption (EPOC), sustaining metabolic calorie burn for up to 14 hours post-workout.</p>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                <span className="font-semibold text-amber-300 block mb-0.5">Zone 2 Cardiovascular Base</span>
                <p className="text-white/70">Builds mitochondrial density, improves insulin sensitivity, and conditions cardiac stroke volume.</p>
              </div>
            </div>
          </div>
        );

      case 'medication':
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-4 rounded-xl bg-blue-500/10 border border-blue-400/30">
              <ShieldCheck className="w-8 h-8 text-blue-300 shrink-0" />
              <div>
                <h4 className="font-bold text-white text-base">Micronutrient Timing & Adherence</h4>
                <p className="text-xs text-white/70">Optimizing bio-availability and serum levels</p>
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                <span className="font-semibold text-blue-300 block mb-0.5">Fat-Soluble Vitamins (D3 & Omega-3)</span>
                <p className="text-white/70">Must be consumed with dietary healthy lipids (eggs, avocado, olive oil) for optimal intestinal absorption.</p>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                <span className="font-semibold text-teal-300 block mb-0.5">Evening Magnesium Glycinate</span>
                <p className="text-white/70">Calms central nervous system neurotransmitters and acts as a cofactor in over 300 enzymatic processes.</p>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-200">
      <div className="glass-panel w-full max-w-lg p-6 sm:p-8 relative border border-white/20 shadow-2xl">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-lg text-white/50 hover:text-white hover:bg-white/10 transition cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-4">
          <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-300">
            Metric Deep Dive
          </span>
          <h3 className="text-2xl font-bold text-white capitalize mt-0.5">
            {metricType} Insights
          </h3>
        </div>

        {renderContent()}

        <div className="mt-6 pt-4 border-t border-white/10 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition cursor-pointer"
          >
            Close Deep Dive
          </button>
        </div>
      </div>
    </div>
  );
}
