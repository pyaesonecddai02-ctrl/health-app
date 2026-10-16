import React from 'react';
import { Heart, Activity, AlertCircle, ShieldCheck, AlertTriangle } from 'lucide-react';

export function BloodPressureCard({ bloodPressure, setBloodPressure, onOpenDetail }) {
  const systolic = bloodPressure.systolic || 0;
  const diastolic = bloodPressure.diastolic || 0;

  // PRD Classification Logic:
  // Normal: Systolic < 120 AND Diastolic < 80 -> Green
  // Elevated: Systolic 120-129 AND Diastolic < 80 -> Yellow
  // High: Systolic >= 130 OR Diastolic >= 80 -> Red
  const getStatus = () => {
    if (!systolic || !diastolic) {
      return {
        level: 'Unknown',
        title: 'Enter Values',
        colorClass: 'text-white/60 border-white/20 bg-white/10',
        glowClass: '',
        accentColor: '#94a3b8',
        icon: Activity,
        description: 'Please enter both Systolic and Diastolic readings',
      };
    }

    if (systolic < 120 && diastolic < 80) {
      return {
        level: 'Normal',
        title: 'Normal (Optimal)',
        colorClass: 'text-emerald-300 border-emerald-400/50 bg-emerald-500/20',
        glowClass: 'glow-green',
        accentColor: '#22c55e',
        icon: ShieldCheck,
        description: 'Your blood pressure is in the healthy optimal zone (<120 / <80 mmHg).',
      };
    }

    if (systolic >= 120 && systolic <= 129 && diastolic < 80) {
      return {
        level: 'Elevated',
        title: 'Elevated',
        colorClass: 'text-yellow-300 border-yellow-400/50 bg-yellow-500/20',
        glowClass: 'glow-yellow',
        accentColor: '#eab308',
        icon: AlertTriangle,
        description: 'Systolic is slightly elevated (120-129 mmHg). Maintain hydration & light activity.',
      };
    }

    // High: >= 130 systolic OR >= 80 diastolic
    return {
      level: 'High',
      title: 'High (Hypertension)',
      colorClass: 'text-rose-300 border-rose-400/50 bg-rose-500/20',
      glowClass: 'glow-red',
      accentColor: '#ef4444',
      icon: AlertCircle,
      description: 'Blood pressure is elevated (≥130 or ≥80 mmHg). Consider rest and consulting a physician.',
    };
  };

  const status = getStatus();
  const StatusIcon = status.icon;

  const handleSystolicChange = (e) => {
    const val = parseInt(e.target.value, 10);
    setBloodPressure((prev) => ({
      ...prev,
      systolic: isNaN(val) ? '' : Math.max(0, Math.min(val, 250)),
    }));
  };

  const handleDiastolicChange = (e) => {
    const val = parseInt(e.target.value, 10);
    setBloodPressure((prev) => ({
      ...prev,
      diastolic: isNaN(val) ? '' : Math.max(0, Math.min(val, 160)),
    }));
  };

  return (
    <div className="glass-card p-6 flex flex-col justify-between relative overflow-hidden group">
      {/* Ambient background glow matching status color */}
      <div
        className="absolute -right-12 -top-12 w-40 h-40 rounded-full blur-3xl pointer-events-none transition-all duration-700 opacity-20 group-hover:opacity-30"
        style={{ backgroundColor: status.accentColor }}
      />

      <div>
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl border flex items-center justify-center transition-colors"
              style={{
                backgroundColor: `${status.accentColor}25`,
                borderColor: `${status.accentColor}50`,
                color: status.accentColor,
              }}
            >
              <Heart className="w-5 h-5 fill-current animate-heart-pulse" />
            </div>
            <div>
              <h3 className="font-semibold text-lg text-white tracking-wide">Blood Pressure</h3>
              <p className="text-xs text-white/60">Systolic / Diastolic (mmHg)</p>
            </div>
          </div>

          {/* Dynamic Status Pill & Detail trigger */}
          <div className="flex items-center gap-1.5">
            {onOpenDetail && (
              <button
                type="button"
                onClick={() => onOpenDetail('bloodpressure')}
                title="View AHA Blood Pressure Deep Dive"
                className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-white/50 hover:text-white transition cursor-pointer"
              >
                <Activity className="w-3.5 h-3.5" />
              </button>
            )}
            <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${status.colorClass} ${status.glowClass}`}>
              <StatusIcon className="w-3.5 h-3.5" />
              <span>{status.title}</span>
            </div>
          </div>
        </div>

        {/* Two Input Fields: Systolic and Diastolic */}
        <div className="grid grid-cols-2 gap-3 my-4">
          <div className="p-3 rounded-xl bg-white/5 border border-white/10">
            <label className="block text-xs font-medium text-white/60 mb-1.5">
              Systolic (SYS)
            </label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min="60"
                max="240"
                placeholder="120"
                value={systolic}
                onChange={handleSystolicChange}
                aria-label="Systolic value"
                className="glass-input text-2xl font-bold w-full px-3 py-1 text-white focus:text-white"
              />
              <span className="text-xs text-white/40">mmHg</span>
            </div>
            <span className="text-[10px] text-white/40 mt-1 block">Normal: &lt;120</span>
          </div>

          <div className="p-3 rounded-xl bg-white/5 border border-white/10">
            <label className="block text-xs font-medium text-white/60 mb-1.5">
              Diastolic (DIA)
            </label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min="40"
                max="150"
                placeholder="80"
                value={diastolic}
                onChange={handleDiastolicChange}
                aria-label="Diastolic value"
                className="glass-input text-2xl font-bold w-full px-3 py-1 text-white focus:text-white"
              />
              <span className="text-xs text-white/40">mmHg</span>
            </div>
            <span className="text-[10px] text-white/40 mt-1 block">Normal: &lt;80</span>
          </div>
        </div>

        {/* Status Analysis Box */}
        <div className={`p-3 rounded-xl border text-xs transition-all ${status.colorClass}`}>
          <div className="flex items-start gap-2">
            <StatusIcon className="w-4 h-4 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-white/95">{status.title}</p>
              <p className="text-white/80 mt-0.5 leading-relaxed">{status.description}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Preset Buttons for testing */}
      <div className="pt-4 mt-3 border-t border-white/10 flex items-center justify-between text-xs text-white/60">
        <span className="text-[11px] text-white/50">Presets:</span>
        <div className="flex gap-1.5">
          <button
            type="button"
            onClick={() => setBloodPressure({ systolic: 115, diastolic: 75 })}
            className="px-2 py-1 rounded bg-white/5 hover:bg-emerald-500/20 border border-white/10 text-emerald-300 text-[11px]"
          >
            Normal (115/75)
          </button>
          <button
            type="button"
            onClick={() => setBloodPressure({ systolic: 124, diastolic: 78 })}
            className="px-2 py-1 rounded bg-white/5 hover:bg-yellow-500/20 border border-white/10 text-yellow-300 text-[11px]"
          >
            Elevated (124/78)
          </button>
          <button
            type="button"
            onClick={() => setBloodPressure({ systolic: 135, diastolic: 85 })}
            className="px-2 py-1 rounded bg-white/5 hover:bg-rose-500/20 border border-white/10 text-rose-300 text-[11px]"
          >
            High (135/85)
          </button>
        </div>
      </div>
    </div>
  );
}
