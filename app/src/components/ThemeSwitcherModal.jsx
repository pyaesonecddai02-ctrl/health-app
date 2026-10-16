import React from 'react';
import { X, Image, Check, Sparkles } from 'lucide-react';
import { NATURE_THEMES } from '../data/mockData';

export function ThemeSwitcherModal({ isOpen, onClose, currentTheme, onSelectTheme }) {
  if (!isOpen) return null;

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

        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-300">
            <Image className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-xl text-white">Nature Atmosphere & Themes</h3>
            <p className="text-xs text-white/60">Choose your soothing nature sanctuary backdrop</p>
          </div>
        </div>

        {/* Theme List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[60vh] overflow-y-auto pr-1">
          {NATURE_THEMES.map((theme) => {
            const isSelected = currentTheme.id === theme.id;
            return (
              <button
                key={theme.id}
                type="button"
                onClick={() => {
                  onSelectTheme(theme);
                  onClose();
                }}
                className={`relative group rounded-xl overflow-hidden border p-3 text-left transition-all cursor-pointer h-28 flex flex-col justify-end ${
                  isSelected
                    ? 'border-emerald-400 ring-2 ring-emerald-400/50 shadow-[0_0_20px_rgba(52,211,153,0.4)]'
                    : 'border-white/15 hover:border-white/40'
                }`}
              >
                {/* Background image preview */}
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                  style={{ backgroundImage: `url(${theme.url})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent" />

                <div className="relative z-10">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white text-sm">{theme.name}</span>
                    {isSelected && (
                      <span className="w-5 h-5 rounded-full bg-emerald-400 text-slate-950 flex items-center justify-center">
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] text-white/70 block mt-0.5">{theme.tag}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
