import React, { useState } from 'react';
import { Pill, Check, Plus, Trash2, Clock, Sparkles, Maximize2, ShieldCheck } from 'lucide-react';
import { soundEngine } from '../../utils/soundGenerator';

export function MedicationCard({
  medications = [],
  setMedications,
  onOpenDetail,
}) {
  const [name, setName] = useState('');
  const [dosage, setDosage] = useState('');
  const [timeOfDay, setTimeOfDay] = useState('Morning');

  const takenCount = medications.filter((m) => m.taken).length;
  const totalCount = medications.length;
  const adherence = totalCount > 0 ? Math.round((takenCount / totalCount) * 100) : 100;

  const toggleTaken = (id) => {
    setMedications((prev) =>
      prev.map((m) => {
        if (m.id === id) {
          const nextTaken = !m.taken;
          if (nextTaken) {
            soundEngine.playChime();
          }
          return { ...m, taken: nextTaken };
        }
        return m;
      })
    );
  };

  const handleAddMed = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newMed = {
      id: Date.now().toString(),
      name: name.trim(),
      dosage: dosage.trim() || 'Daily',
      timeOfDay,
      taken: false,
    };

    setMedications((prev) => [...prev, newMed]);
    setName('');
    setDosage('');
  };

  const handleDeleteMed = (id) => {
    setMedications((prev) => prev.filter((m) => m.id !== id));
  };

  return (
    <div className="glass-card p-6 flex flex-col justify-between relative overflow-hidden group">
      {/* Ambient glow */}
      <div className="absolute -right-12 -top-12 w-40 h-40 bg-blue-500/15 rounded-full blur-3xl pointer-events-none group-hover:bg-blue-500/25 transition-all duration-700" />

      <div>
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-400/30 flex items-center justify-center text-blue-300 shadow-[0_0_15px_rgba(59,130,246,0.3)]">
              <Pill className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold text-lg text-white tracking-wide">Pills & Supplements</h3>
              <p className="text-xs text-blue-200/70">Daily vitamins & medication reminder</p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => onOpenDetail('medication')}
              title="View Supplement Deep Dive"
              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-white/50 hover:text-white transition cursor-pointer"
            >
              <Maximize2 className="w-3.5 h-3.5" />
            </button>
            <span
              className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full border ${
                adherence === 100
                  ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300'
                  : 'bg-blue-500/20 border-blue-400 text-blue-300'
              }`}
            >
              {adherence}% Adherence
            </span>
          </div>
        </div>

        {/* Adherence Progress Bar */}
        <div className="mb-4">
          <div className="flex justify-between text-xs text-white/60 mb-1">
            <span>Daily Intake Progress</span>
            <span className="font-bold text-white">
              {takenCount} of {totalCount} completed
            </span>
          </div>
          <div className="w-full bg-black/30 h-2 rounded-full overflow-hidden p-0.5 border border-white/10">
            <div
              className="h-full rounded-full bg-gradient-to-r from-blue-500 to-teal-400 transition-all duration-500"
              style={{ width: `${adherence}%` }}
            />
          </div>
        </div>

        {/* Add Medication Form */}
        <form onSubmit={handleAddMed} className="space-y-2 mb-4 p-3 rounded-xl bg-white/5 border border-white/10">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Name (e.g. Magnesium)"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="glass-input text-xs px-3 py-1.5 flex-1 text-white"
            />
            <input
              type="text"
              placeholder="Dose (400mg)"
              value={dosage}
              onChange={(e) => setDosage(e.target.value)}
              className="glass-input text-xs px-2.5 py-1.5 w-24 text-white"
            />
          </div>

          <div className="flex items-center justify-between gap-2">
            <select
              value={timeOfDay}
              onChange={(e) => setTimeOfDay(e.target.value)}
              className="glass-input text-xs px-2.5 py-1.5 text-white bg-slate-900/80 cursor-pointer"
            >
              <option value="Morning" className="bg-slate-900 text-white">🌅 Morning</option>
              <option value="Lunch" className="bg-slate-900 text-white">☀️ Lunch</option>
              <option value="Evening" className="bg-slate-900 text-white">🌆 Evening</option>
              <option value="Bedtime" className="bg-slate-900 text-white">🌙 Bedtime</option>
            </select>

            <button
              type="submit"
              disabled={!name.trim()}
              className="px-3 py-1.5 rounded-xl bg-blue-500/25 hover:bg-blue-500/35 border border-blue-400/40 text-blue-200 font-semibold text-xs flex items-center gap-1 transition cursor-pointer disabled:opacity-40"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Pill</span>
            </button>
          </div>
        </form>

        {/* Medication List */}
        <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
          {medications.length === 0 ? (
            <div className="text-center py-3 text-xs text-white/40 italic">
              No daily supplements or pills configured.
            </div>
          ) : (
            medications.map((m) => (
              <div
                key={m.id}
                onClick={() => toggleTaken(m.id)}
                className={`flex items-center justify-between p-2.5 rounded-xl border transition-all cursor-pointer ${
                  m.taken
                    ? 'bg-emerald-500/15 border-emerald-400/40 text-emerald-200'
                    : 'bg-white/5 border-white/10 hover:bg-white/10 text-white'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div
                    className={`w-5 h-5 rounded-md flex items-center justify-center border transition ${
                      m.taken
                        ? 'bg-emerald-400 text-slate-950 border-emerald-400'
                        : 'border-white/30 bg-black/20'
                    }`}
                  >
                    {m.taken && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </div>
                  <div>
                    <span className={`text-xs font-semibold block ${m.taken ? 'line-through opacity-80' : ''}`}>
                      {m.name}
                    </span>
                    <span className="text-[10px] text-white/50">
                      {m.dosage} • {m.timeOfDay}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteMed(m.id);
                  }}
                  className="p-1 text-white/30 hover:text-rose-400 rounded transition"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="pt-3 mt-3 border-t border-white/10 flex items-center justify-between text-xs text-white/50">
        <span>Click checkbox to mark taken</span>
        <span className="text-blue-300 font-medium">Automatic Chime Alert</span>
      </div>
    </div>
  );
}
