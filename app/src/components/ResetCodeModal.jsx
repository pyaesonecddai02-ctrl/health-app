import React, { useState } from 'react';
import { X, AlertTriangle, RotateCcw, CheckCircle2, KeyRound } from 'lucide-react';
import { soundEngine } from '../utils/soundGenerator';

export function ResetCodeModal({ isOpen, onClose, onConfirmReset }) {
  const [resetCodeInput, setResetCodeInput] = useState('');
  const [error, setError] = useState('');
  const requiredCode = 'RESET';

  if (!isOpen) return null;

  const handleReset = (e) => {
    e.preventDefault();
    if (resetCodeInput.trim().toUpperCase() !== requiredCode) {
      setError(`Incorrect confirmation code. Please type "${requiredCode}".`);
      return;
    }

    soundEngine.playChime();
    onConfirmReset();
    setResetCodeInput('');
    setError('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-200">
      <div className="glass-panel w-full max-w-md p-6 relative border border-rose-500/30 shadow-2xl">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-lg text-white/50 hover:text-white hover:bg-white/10 transition cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-rose-500/20 border border-rose-400/40 flex items-center justify-center text-rose-300">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-lg text-white">Reset Health App Data</h3>
            <p className="text-xs text-white/60">Restore baseline biometric values</p>
          </div>
        </div>

        <p className="text-xs text-white/70 leading-relaxed mb-4 p-3 rounded-xl bg-white/5 border border-white/10">
          This action will restore all daily health records (Water, Steps, BP, Weight, Workouts, Meals) to default demonstration state.
        </p>

        <form onSubmit={handleReset} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-white/80 mb-1.5">
              Type <strong className="text-rose-300 font-mono tracking-wider">"{requiredCode}"</strong> to confirm reset:
            </label>
            <input
              type="text"
              required
              placeholder={requiredCode}
              value={resetCodeInput}
              onChange={(e) => {
                setResetCodeInput(e.target.value);
                setError('');
              }}
              className="glass-input font-mono text-center tracking-widest text-lg font-bold w-full p-2.5 text-rose-300 focus:text-white"
            />
            {error && <span className="text-[11px] text-rose-400 block mt-1">{error}</span>}
          </div>

          <div className="flex items-center justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-rose-500 hover:bg-rose-400 text-white font-bold text-xs flex items-center gap-1.5 shadow-[0_0_15px_rgba(244,63,94,0.4)] cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Confirm Data Reset</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
