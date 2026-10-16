import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Mail,
  Lock,
  LogIn,
  UserPlus,
  Sparkles,
  CheckCircle2,
  Shield,
  KeyRound,
  RotateCw,
  ArrowLeft,
  Check,
} from 'lucide-react';
import { ADMIN_PROFILE, DEFAULT_PROFILE } from '../data/mockData';
import { soundEngine } from '../utils/soundGenerator';

export function AuthModal({ isOpen, onClose, onLogin, user }) {
  // Modes: 'signin' | 'signup' | 'forgot' | 'verify'
  const [authMode, setAuthMode] = useState('signin');
  const [email, setEmail] = useState(user?.email || 'sarah.miller@vitalis.health');
  const [password, setPassword] = useState('••••••••••••');
  const [name, setName] = useState(user?.name || 'Sarah Miller');
  const [newPassword, setNewPassword] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // 6-digit Reset Code / OTP state
  const [otp, setOtp] = useState(['8', '4', '9', '2', '0', '1']);
  const [generatedCode, setGeneratedCode] = useState('849201');
  const [resendCountdown, setResendCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const otpInputRefs = useRef([]);

  // Countdown timer for "Resend Code"
  useEffect(() => {
    let timer = null;
    if (authMode === 'verify' && resendCountdown > 0) {
      timer = setInterval(() => {
        setResendCountdown((prev) => {
          if (prev <= 1) {
            setCanResend(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [authMode, resendCountdown]);

  if (!isOpen) return null;

  const handleOtpChange = (index, value) => {
    if (value.length > 1) {
      value = value[value.length - 1];
    }
    const updated = [...otp];
    updated[index] = value;
    setOtp(updated);

    // Auto-advance to next input
    if (value && index < 5) {
      otpInputRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpInputRefs.current[index - 1]?.focus();
    }
  };

  const handleSendResetCode = (e) => {
    e.preventDefault();
    if (!email) return;

    // Generate random 6-digit code
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedCode(code);
    setOtp(code.split(''));
    setResendCountdown(60);
    setCanResend(false);
    setSuccessMsg(`Reset Code ${code} sent to ${email}!`);
    soundEngine.playChime();

    setTimeout(() => {
      setSuccessMsg('');
      setAuthMode('verify');
    }, 900);
  };

  const handleResendCode = () => {
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedCode(code);
    setOtp(code.split(''));
    setResendCountdown(60);
    setCanResend(false);
    setSuccessMsg(`Fresh Reset Code sent: ${code}`);
    soundEngine.playChime();
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  const handleVerifyAndResetPassword = (e) => {
    e.preventDefault();
    const enteredCode = otp.join('');
    if (enteredCode !== generatedCode) {
      alert('Invalid Reset Code. Please enter the 6-digit code provided.');
      return;
    }

    setSuccessMsg('Password successfully reset! Logging in...');
    soundEngine.playChime();

    setTimeout(() => {
      onLogin({
        name: user?.name || 'Sarah Miller',
        email: email || 'sarah.miller@vitalis.health',
        role: email.toLowerCase().includes('admin') ? 'admin' : 'user',
        isLoggedIn: true,
      });
      setSuccessMsg('');
      setAuthMode('signin');
      onClose();
    }, 1000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isAdmin = email.toLowerCase().includes('admin');
    setSuccessMsg(isAdmin ? 'Logging in with Administrator Privileges...' : 'Welcome back!');
    soundEngine.playChime();
    setTimeout(() => {
      onLogin({
        name: isAdmin ? 'Dr. Alexander Reed' : (authMode === 'signup' ? name : (user?.name || 'Sarah Miller')),
        email: email || 'user@vitalis.health',
        role: isAdmin ? 'admin' : 'user',
        isLoggedIn: true,
      });
      setSuccessMsg('');
      onClose();
    }, 600);
  };

  const handleQuickAdminLogin = () => {
    setSuccessMsg('Connecting as Administrator (Superuser)...');
    soundEngine.playChime();
    setTimeout(() => {
      onLogin({
        ...ADMIN_PROFILE,
        isLoggedIn: true,
      });
      setSuccessMsg('');
      onClose();
    }, 500);
  };

  const handleQuickUserLogin = () => {
    setSuccessMsg('Connecting as Standard User...');
    soundEngine.playChime();
    setTimeout(() => {
      onLogin({
        ...DEFAULT_PROFILE,
        isLoggedIn: true,
      });
      setSuccessMsg('');
      onClose();
    }, 500);
  };

  const handleGoogleAuth = () => {
    setSuccessMsg('Connecting with Google...');
    soundEngine.playChime();
    setTimeout(() => {
      onLogin({
        name: 'Sarah Miller',
        email: 'sarah.miller@gmail.com',
        role: 'user',
        isLoggedIn: true,
      });
      setSuccessMsg('');
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-md animate-in fade-in duration-200">
      <div className="glass-panel w-full max-w-md p-6 sm:p-8 relative border border-white/20 shadow-2xl">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-lg text-white/50 hover:text-white hover:bg-white/10 transition cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-300 mx-auto mb-3 shadow-[0_0_20px_rgba(16,185,129,0.3)]">
            {authMode === 'forgot' || authMode === 'verify' ? (
              <KeyRound className="w-6 h-6" />
            ) : (
              <Sparkles className="w-6 h-6" />
            )}
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            {authMode === 'signup' && 'Create Vitalis Account'}
            {authMode === 'signin' && 'Welcome to Vitalis'}
            {authMode === 'forgot' && 'Reset Password'}
            {authMode === 'verify' && 'Enter Reset Code'}
          </h2>
          <p className="text-xs text-white/60 mt-1">
            {authMode === 'verify'
              ? 'Enter the 6-digit verification code sent to your email'
              : authMode === 'forgot'
              ? 'Enter your email to receive a password reset code'
              : 'Sign in to access your synchronized health metrics'}
          </p>
        </div>

        {/* 1-Click Demo Logins for Testing (only in signin mode) */}
        {authMode === 'signin' && (
          <div className="grid grid-cols-2 gap-2 mb-4">
            <button
              type="button"
              onClick={handleQuickUserLogin}
              className="py-2 px-3 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition cursor-pointer"
            >
              <span>👤 User Demo</span>
            </button>
            <button
              type="button"
              onClick={handleQuickAdminLogin}
              className="py-2 px-3 rounded-xl bg-amber-500/25 hover:bg-amber-500/35 border border-amber-400/40 text-amber-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition cursor-pointer shadow-[0_0_12px_rgba(245,158,11,0.3)]"
            >
              <Shield className="w-3.5 h-3.5 text-amber-300" />
              <span>🛡️ Admin Login</span>
            </button>
          </div>
        )}

        {/* Continue with Google button (in signin & signup) */}
        {(authMode === 'signin' || authMode === 'signup') && (
          <>
            <button
              type="button"
              onClick={handleGoogleAuth}
              className="w-full flex items-center justify-center gap-3 py-2.5 px-4 rounded-xl bg-white text-slate-900 font-semibold text-sm hover:bg-slate-100 transition shadow-md cursor-pointer"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>Continue with Google</span>
            </button>

            <div className="flex items-center my-4 gap-3">
              <div className="flex-1 h-px bg-white/10" />
              <span className="text-[11px] uppercase tracking-wider text-white/40">or with email</span>
              <div className="flex-1 h-px bg-white/10" />
            </div>
          </>
        )}

        {/* Success message banner */}
        {successMsg && (
          <div className="mb-4 p-2.5 rounded-lg bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* 1. SIGN IN & SIGN UP FORMS */}
        {(authMode === 'signin' || authMode === 'signup') && (
          <form onSubmit={handleSubmit} className="space-y-3">
            {authMode === 'signup' && (
              <div>
                <label className="block text-xs font-medium text-white/70 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Sarah Miller"
                  className="glass-input w-full px-3.5 py-2 text-sm text-white"
                />
              </div>
            )}

            <div>
              <label className="block text-xs font-medium text-white/70 mb-1">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="sarah@example.com"
                  className="glass-input w-full pl-10 pr-3.5 py-2 text-sm text-white"
                />
                <Mail className="w-4 h-4 text-white/40 absolute left-3.5 top-2.5" />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="block text-xs font-medium text-white/70">Password</label>
                {authMode === 'signin' && (
                  <button
                    type="button"
                    onClick={() => setAuthMode('forgot')}
                    className="text-[11px] text-emerald-300 hover:text-emerald-200 underline cursor-pointer"
                  >
                    Forgot Password? (Reset Code)
                  </button>
                )}
              </div>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="glass-input w-full pl-10 pr-3.5 py-2 text-sm text-white"
                />
                <Lock className="w-4 h-4 text-white/40 absolute left-3.5 top-2.5" />
              </div>
            </div>

            <button
              type="submit"
              className="w-full mt-2 py-2.5 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold text-sm transition shadow-[0_0_20px_rgba(16,185,129,0.4)] cursor-pointer flex items-center justify-center gap-2"
            >
              {authMode === 'signup' ? <UserPlus className="w-4 h-4" /> : <LogIn className="w-4 h-4" />}
              <span>{authMode === 'signup' ? 'Create Free Account' : 'Sign In to Tracker'}</span>
            </button>
          </form>
        )}

        {/* 2. FORGOT PASSWORD (REQUEST RESET CODE) */}
        {authMode === 'forgot' && (
          <form onSubmit={handleSendResetCode} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-white/70 mb-1">
                Your Registered Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="glass-input w-full pl-10 pr-3.5 py-2.5 text-sm text-white"
                />
                <Mail className="w-4 h-4 text-white/40 absolute left-3.5 top-3" />
              </div>
              <span className="text-[11px] text-white/50 block mt-1.5">
                We will generate a 6-digit security Reset Code for verification.
              </span>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold text-sm transition shadow-[0_0_20px_rgba(16,185,129,0.4)] cursor-pointer flex items-center justify-center gap-2"
            >
              <KeyRound className="w-4 h-4" />
              <span>Send Reset Code (ကုဒ်ပို့ပါ)</span>
            </button>

            <button
              type="button"
              onClick={() => setAuthMode('signin')}
              className="w-full py-1.5 text-xs text-white/60 hover:text-white flex items-center justify-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Sign In</span>
            </button>
          </form>
        )}

        {/* 3. ENTER 6-DIGIT RESET CODE & RESEND CODE BUTTON */}
        {authMode === 'verify' && (
          <form onSubmit={handleVerifyAndResetPassword} className="space-y-4">
            {/* Demo Reset Code Helper Pill */}
            <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-400/40 text-center text-xs">
              <span className="text-emerald-200/80 block text-[11px]">Security Verification Code:</span>
              <strong className="text-xl font-mono tracking-widest text-emerald-300 block my-1">
                {generatedCode}
              </strong>
              <button
                type="button"
                onClick={() => setOtp(generatedCode.split(''))}
                className="text-[10px] text-emerald-300 underline hover:text-white"
              >
                Auto-fill Code
              </button>
            </div>

            {/* 6 Digit Input Boxes */}
            <div>
              <label className="block text-xs font-medium text-white/70 mb-2 text-center">
                Enter 6-Digit Reset Code (ကုဒ်ချပါ)
              </label>
              <div className="flex justify-between gap-2 max-w-xs mx-auto">
                {otp.map((digit, idx) => (
                  <input
                    key={idx}
                    ref={(el) => (otpInputRefs.current[idx] = el)}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(idx, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                    className="w-11 h-12 text-center text-xl font-bold font-mono glass-input text-emerald-300 focus:text-white border-white/20 focus:border-emerald-400"
                  />
                ))}
              </div>
            </div>

            {/* Resend Code Section with Timer */}
            <div className="text-center pt-1">
              {canResend ? (
                <button
                  type="button"
                  onClick={handleResendCode}
                  className="text-xs font-semibold text-emerald-300 hover:text-emerald-200 flex items-center justify-center gap-1.5 mx-auto underline cursor-pointer"
                >
                  <RotateCw className="w-3.5 h-3.5" />
                  <span>Resend Code (ကုဒ်ပြန်ပို့ရန် နှိပ်ပါ)</span>
                </button>
              ) : (
                <span className="text-xs text-white/50 flex items-center justify-center gap-1">
                  <RotateCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Resend Code in <strong className="text-white">{resendCountdown}s</strong></span>
                </span>
              )}
            </div>

            {/* New Password Input */}
            <div>
              <label className="block text-xs font-medium text-white/70 mb-1">
                New Password (စကားဝှက်အသစ်)
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  placeholder="Enter new strong password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="glass-input w-full pl-10 pr-3.5 py-2 text-sm text-white"
                />
                <Lock className="w-4 h-4 text-white/40 absolute left-3.5 top-2.5" />
              </div>
            </div>

            {/* Confirm Reset Button */}
            <button
              type="submit"
              className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold text-sm transition shadow-[0_0_20px_rgba(16,185,129,0.4)] cursor-pointer flex items-center justify-center gap-2"
            >
              <Check className="w-4 h-4 stroke-[3]" />
              <span>Confirm & Reset Password</span>
            </button>

            <button
              type="button"
              onClick={() => setAuthMode('forgot')}
              className="w-full py-1 text-xs text-white/60 hover:text-white flex items-center justify-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Change Email</span>
            </button>
          </form>
        )}

        {/* Toggle sign up / sign in */}
        {authMode !== 'forgot' && authMode !== 'verify' && (
          <div className="mt-4 text-center text-xs text-white/60">
            {authMode === 'signup' ? (
              <p>
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => setAuthMode('signin')}
                  className="text-emerald-300 hover:text-emerald-200 font-semibold underline ml-1 cursor-pointer"
                >
                  Sign In
                </button>
              </p>
            ) : (
              <p>
                Don't have an account yet?{' '}
                <button
                  type="button"
                  onClick={() => setAuthMode('signup')}
                  className="text-emerald-300 hover:text-emerald-200 font-semibold underline ml-1 cursor-pointer"
                >
                  Sign Up
                </button>
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
