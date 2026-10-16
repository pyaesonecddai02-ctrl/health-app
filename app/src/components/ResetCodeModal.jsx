import React, { useState } from 'react';
import {
  X,
  AlertTriangle,
  RotateCcw,
  Sparkles,
  Database,
  Trash2,
  CheckCircle2,
  Droplet,
  Footprints,
  Utensils,
  Dumbbell,
  Pill,
} from 'lucide-react';
import { soundEngine } from '../utils/soundGenerator';

export function ResetCodeModal({
  isOpen,
  onClose,
  onCleanReset,
  onDemoReset,
  onFactoryReset,
  lang = 'en',
}) {
  const [resetCodeInput, setResetCodeInput] = useState('');
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('clean'); // 'clean' | 'demo' | 'factory'
  const requiredCode = 'RESET';

  if (!isOpen) return null;

  const handleClean = () => {
    soundEngine.playChime();
    if (onCleanReset) onCleanReset();
    onClose();
  };

  const handleDemo = () => {
    soundEngine.playChime();
    if (onDemoReset) onDemoReset();
    onClose();
  };

  const handleFactorySubmit = (e) => {
    e.preventDefault();
    if (resetCodeInput.trim().toUpperCase() !== requiredCode) {
      setError(
        lang === 'my'
          ? `အတည်ပြုကုဒ် မှားယွင်းနေပါသည်။ ကျေးဇူးပြု၍ "${requiredCode}" ဟု ရိုက်ထည့်ပေးပါ။`
          : `Incorrect confirmation code. Please type "${requiredCode}".`
      );
      return;
    }

    soundEngine.playChime();
    if (onFactoryReset) onFactoryReset();
    setResetCodeInput('');
    setError('');
    onClose();
  };

  const isMy = lang === 'my';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
      <div className="glass-panel w-full max-w-lg p-6 relative border border-rose-500/30 shadow-[0_0_50px_rgba(244,63,94,0.25)] rounded-2xl">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-lg text-white/50 hover:text-white hover:bg-white/10 transition cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3.5 mb-5">
          <div className="w-12 h-12 rounded-2xl bg-rose-500/20 border border-rose-400/40 flex items-center justify-center text-rose-300 shadow-[0_0_20px_rgba(244,63,94,0.3)]">
            <RotateCcw className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-lg text-white">
              {isMy ? 'ကျန်းမာရေး မှတ်တမ်းများ Reset ပြုလုပ်ခြင်း' : 'Reset Health App Records'}
            </h3>
            <p className="text-xs text-rose-200/70">
              {isMy
                ? 'ရေ၊ ခြေလှမ်း၊ အစားအသောက်၊ လေ့ကျင့်ခန်း၊ ဆေးဝါး မှတ်တမ်းများကို ရွေးချယ်ရှင်းလင်းပါ'
                : 'Manage and reset your daily vitals, hydration, activities and medications'}
            </p>
          </div>
        </div>

        {/* Option Tabs */}
        <div className="flex items-center p-1 rounded-xl bg-white/5 border border-white/10 mb-5 gap-1">
          <button
            type="button"
            onClick={() => setActiveTab('clean')}
            className={`flex-1 py-2 px-2.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition cursor-pointer ${
              activeTab === 'clean'
                ? 'bg-rose-500 text-white shadow-md'
                : 'text-white/70 hover:text-white hover:bg-white/5'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isMy ? 'သန့်ရှင်းသော အသစ် (0)' : 'Clean Slate (0)'}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('demo')}
            className={`flex-1 py-2 px-2.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition cursor-pointer ${
              activeTab === 'demo'
                ? 'bg-teal-600 text-white shadow-md'
                : 'text-white/70 hover:text-white hover:bg-white/5'
            }`}
          >
            <Database className="w-3.5 h-3.5" />
            <span>{isMy ? 'နမူနာဒေတာ' : 'Demo Data'}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('factory')}
            className={`flex-1 py-2 px-2.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition cursor-pointer ${
              activeTab === 'factory'
                ? 'bg-amber-600 text-white shadow-md'
                : 'text-white/70 hover:text-white hover:bg-white/5'
            }`}
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>{isMy ? 'စက်ရုံထုတ် မူလ' : 'Factory Wipe'}</span>
          </button>
        </div>

        {/* Tab 1: Clean Slate (What the user explicitly asked for) */}
        {activeTab === 'clean' && (
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-3">
              <div className="flex items-center gap-2 text-rose-300 font-semibold text-xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>
                  {isMy
                    ? 'အောက်ပါ မှတ်တမ်းများအားလုံး သန့်ရှင်းသော 0 အခြေအနေသို့ ရောက်ရှိသွားပါမည်:'
                    : 'The following metrics will be reset to a pristine 0 baseline:'}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs text-white/80">
                <div className="flex items-center gap-2 p-2 rounded-lg bg-black/20 border border-white/5">
                  <Droplet className="w-4 h-4 text-cyan-400" />
                  <span>{isMy ? 'ရေသောက်: 0 ခွက် (0 ml)' : 'Water: 0 glasses (0 ml)'}</span>
                </div>
                <div className="flex items-center gap-2 p-2 rounded-lg bg-black/20 border border-white/5">
                  <Footprints className="w-4 h-4 text-emerald-400" />
                  <span>{isMy ? 'ခြေလှမ်း: 0 steps' : 'Steps: 0 steps'}</span>
                </div>
                <div className="flex items-center gap-2 p-2 rounded-lg bg-black/20 border border-white/5">
                  <Utensils className="w-4 h-4 text-amber-400" />
                  <span>{isMy ? 'အစားအသောက်: မှတ်တမ်းအလွတ်' : 'Meals: Cleared (0 logged)'}</span>
                </div>
                <div className="flex items-center gap-2 p-2 rounded-lg bg-black/20 border border-white/5">
                  <Dumbbell className="w-4 h-4 text-rose-400" />
                  <span>{isMy ? 'လေ့ကျင့်ခန်း: မှတ်တမ်းအလွတ်' : 'Workouts: Cleared (0 mins)'}</span>
                </div>
                <div className="flex items-center gap-2 p-2 rounded-lg bg-black/20 border border-white/5 col-span-2">
                  <Pill className="w-4 h-4 text-blue-400" />
                  <span>{isMy ? 'ဆေးဝါး/ဗီတာမင်: မသောက်ရသေးသည့် အခြေအနေ' : 'Medications: Reset to untaken'}</span>
                </div>
              </div>

              <p className="text-[11px] text-white/50 italic">
                {isMy
                  ? '* သင့် Profile အချက်အလက်နှင့် Theme အရောင်များကို ထိခိုက်မှုမရှိဘဲ နေ့စဉ် မှတ်တမ်းများကိုသာ သန့်ရှင်းပေးပါမည်။'
                  : '* Preserves your profile name & theme while wiping today\'s daily logs for a fresh start.'}
              </p>
            </div>

            <div className="flex items-center justify-end gap-2 pt-1">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold transition cursor-pointer"
              >
                {isMy ? 'မလုပ်တော့ပါ' : 'Cancel'}
              </button>
              <button
                type="button"
                onClick={handleClean}
                className="px-5 py-2.5 rounded-xl bg-rose-500 hover:bg-rose-400 text-white font-bold text-xs flex items-center gap-1.5 shadow-[0_0_20px_rgba(244,63,94,0.4)] transition cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>{isMy ? 'မှတ်တမ်းအားလုံး 0 သို့ ရှင်းလင်းမည်' : 'Reset All to 0 (Clean Slate)'}</span>
              </button>
            </div>
          </div>
        )}

        {/* Tab 2: Restore Demo Data */}
        {activeTab === 'demo' && (
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-3">
              <div className="flex items-center gap-2 text-teal-300 font-semibold text-xs">
                <Database className="w-4 h-4 text-teal-400" />
                <span>
                  {isMy
                    ? 'နမူနာ စမ်းသပ်ချက် အချက်အလက်များကို အလိုအလျောက် ပြန်လည်ဖြည့်သွင်းပေးပါမည်:'
                    : 'Restores comprehensive demonstration metrics for testing:'}
                </span>
              </div>

              <ul className="text-xs text-white/70 space-y-1.5 list-disc list-inside">
                <li>{isMy ? 'ရေသောက်: ၅ ခွက် (~၁,၂၅၀ ml)' : 'Water intake: 5 glasses (~1,250ml)'}</li>
                <li>{isMy ? 'ခြေလှမ်း: ၈,၆၀၀ steps (၈၆% ပြည့်)' : 'Steps: 8,600 steps (86% completed)'}</li>
                <li>{isMy ? 'အစားအသောက်: ကယ်လိုရီ နမူနာ ၃ မျိုး' : 'Sample meals & calorie counters'}</li>
                <li>{isMy ? 'လေ့ကျင့်ခန်း: Morning HIIT Cardio (၂၅ မိနစ်)' : 'Workout: Morning HIIT Cardio (25 mins)'}</li>
                <li>{isMy ? 'ဆေးဝါး: သောက်ပြီးသား ၂ မျိုး၊ မသောက်ရသေး ၁ မျိုး' : 'Medications: 2 taken, 1 pending'}</li>
              </ul>
            </div>

            <div className="flex items-center justify-end gap-2 pt-1">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold transition cursor-pointer"
              >
                {isMy ? 'မလုပ်တော့ပါ' : 'Cancel'}
              </button>
              <button
                type="button"
                onClick={handleDemo}
                className="px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-[0_0_20px_rgba(20,184,166,0.4)] transition cursor-pointer"
              >
                <Database className="w-4 h-4" />
                <span>{isMy ? 'နမူနာဒေတာ ပြန်ဖြည့်မည်' : 'Restore Demo Data'}</span>
              </button>
            </div>
          </div>
        )}

        {/* Tab 3: Full Factory Wipe (Requires Typing "RESET") */}
        {activeTab === 'factory' && (
          <form onSubmit={handleFactorySubmit} className="space-y-4">
            <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-xs text-rose-200/90 leading-relaxed">
              <div className="flex items-center gap-2 font-bold text-rose-300 mb-1.5">
                <AlertTriangle className="w-4 h-4" />
                <span>{isMy ? 'သတိပေးချက်: စက်ရုံထုတ် မူလအတိုင်း အကုန်ဖျက်မည်' : 'Warning: Complete Factory Reset'}</span>
              </div>
              <p>
                {isMy
                  ? 'Browser LocalStorage ထဲရှိ Profile၊ နေ့စဉ်မှတ်တမ်းများနှင့် ရွေးချယ်ထားသော Theme အားလုံးကို အပြီးသတ် ဖျက်ထုတ်ပါမည်။'
                  : 'Permanently deletes all stored profiles, custom themes, and cached metrics from your local browser storage.'}
              </p>
            </div>

            <div>
              <label className="block text-xs font-medium text-white/80 mb-1.5">
                {isMy ? (
                  <>အတည်ပြုရန် <strong className="text-rose-300 font-mono tracking-wider">"{requiredCode}"</strong> ဟု ရိုက်ထည့်ပါ:</>
                ) : (
                  <>Type <strong className="text-rose-300 font-mono tracking-wider">"{requiredCode}"</strong> to confirm:</>
                )}
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

            <div className="flex items-center justify-end gap-2 pt-1">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold transition cursor-pointer"
              >
                {isMy ? 'မလုပ်တော့ပါ' : 'Cancel'}
              </button>
              <button
                type="submit"
                className="px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-[0_0_15px_rgba(244,63,94,0.4)] transition cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>{isMy ? 'စက်ရုံထုတ် မူလအတိုင်း ရှင်းမည်' : 'Confirm Factory Wipe'}</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
