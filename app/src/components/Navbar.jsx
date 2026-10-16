import React from 'react';
import {
  Leaf,
  Settings,
  LogOut,
  LogIn,
  Shield,
  FileText,
  Image,
  RefreshCw,
} from 'lucide-react';
import { AmbientPlayer } from './AmbientPlayer';

export function Navbar({
  profile,
  isLoggedIn,
  onOpenAuth,
  onOpenProfile,
  onLogout,
  onResetDemoData,
  onOpenReport,
  onOpenThemes,
  onOpenAdmin,
  onOpenResetCode,
  lang = 'en',
  setLang,
}) {
  const initials = profile.name
    ? profile.name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .slice(0, 2)
        .toUpperCase()
    : 'U';

  const isAdmin = profile.role === 'admin';

  return (
    <header className="sticky top-0 z-40 w-full mb-6">
      <div className="glass-panel mx-auto px-4 sm:px-6 py-3 flex items-center justify-between border-b border-white/15">
        {/* Brand / Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center text-slate-950 shadow-[0_0_20px_rgba(52,211,153,0.5)]">
            <Leaf className="w-5 h-5 fill-slate-950 stroke-[2.2]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-black tracking-tight text-white">Vitalis</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 uppercase tracking-widest">
                Suite Pro
              </span>
              {isAdmin && (
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/40 uppercase tracking-widest flex items-center gap-1">
                  <Shield className="w-3 h-3" /> Admin
                </span>
              )}
            </div>
            <p className="text-[11px] text-emerald-200/60 hidden sm:block">
              Modern Nature & Glassmorphism Health Ecosystem
            </p>
          </div>
        </div>

        {/* Right side controls */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Nature Ambience Sound Player */}
          <AmbientPlayer />

          {/* Language Switcher Button (🇲🇲 / 🇬🇧) */}
          {setLang && (
            <button
              type="button"
              onClick={() => setLang(lang === 'en' ? 'my' : 'en')}
              title="Toggle Language (မြန်မာ / English)"
              className="px-2.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/15 text-white/90 border border-white/10 text-xs font-semibold flex items-center gap-1 transition cursor-pointer"
            >
              <span>{lang === 'en' ? '🇲🇲 မြန်မာ' : '🇬🇧 EN'}</span>
            </button>
          )}

          {/* Theme Wallpaper Switcher Button */}
          <button
            type="button"
            onClick={onOpenThemes}
            title="Switch Nature Backdrop Theme"
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/70 hover:text-white border border-white/10 transition cursor-pointer"
          >
            <Image className="w-4 h-4" />
          </button>

          {/* PDF Report Export Button */}
          <button
            type="button"
            onClick={onOpenReport}
            title="Generate Certified Health Report (PDF/Print)"
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/70 hover:text-white border border-white/10 transition cursor-pointer hidden sm:flex items-center gap-1.5 text-xs"
          >
            <FileText className="w-4 h-4 text-emerald-300" />
            <span className="hidden md:inline">Report</span>
          </button>

          {/* Admin Dashboard trigger (Always easily accessible or visible if Admin) */}
          <button
            type="button"
            onClick={onOpenAdmin}
            title="Open Admin Management Console"
            className={`p-2 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer ${
              isAdmin
                ? 'bg-amber-500/25 hover:bg-amber-500/35 border-amber-400/50 text-amber-200 shadow-[0_0_12px_rgba(245,158,11,0.3)]'
                : 'bg-white/5 hover:bg-white/10 border-white/10 text-white/60 hover:text-white'
            }`}
          >
            <Shield className="w-4 h-4 text-amber-300" />
            <span className="hidden lg:inline">Admin Console</span>
          </button>

          {/* Reset App Data with Security Code */}
          {onOpenResetCode && (
            <button
              type="button"
              onClick={onOpenResetCode}
              title="Reset App Data with Security Code"
              className="p-2 rounded-xl bg-white/5 hover:bg-rose-500/20 text-white/60 hover:text-rose-300 border border-white/10 transition cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          )}

          {/* Profile Button */}
          <button
            type="button"
            onClick={onOpenProfile}
            className="flex items-center gap-2 p-1.5 sm:px-3 sm:py-1.5 rounded-xl glass-button text-xs font-semibold cursor-pointer"
          >
            <div className="w-7 h-7 rounded-lg bg-teal-400/25 border border-teal-300/40 text-teal-200 flex items-center justify-center font-bold text-xs shadow-inner">
              {initials}
            </div>
            <div className="text-left hidden sm:block">
              <span className="block text-white font-medium leading-none">{profile.name}</span>
              <span className="text-[10px] text-white/50">{profile.age} yrs • {profile.baselineWeight}kg</span>
            </div>
          </button>

          {/* Auth Button */}
          {isLoggedIn ? (
            <button
              type="button"
              onClick={onLogout}
              title="Sign Out"
              className="p-2 rounded-xl bg-white/5 hover:bg-rose-500/20 text-white/60 hover:text-rose-300 border border-white/10 transition cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={onOpenAuth}
              className="px-3 py-1.5 rounded-xl bg-emerald-500/25 hover:bg-emerald-500/35 text-emerald-300 border border-emerald-400/40 text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer shadow-[0_0_12px_rgba(52,211,153,0.3)]"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Sign In</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
