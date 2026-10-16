import React, { useState, useEffect } from 'react';
import './App.css';
import { Navbar } from './components/Navbar';
import { DashboardOverview } from './components/DashboardOverview';
import { DailyLog } from './components/DailyLog';
import { AuthModal } from './components/AuthModal';
import { ProfileModal } from './components/ProfileModal';
import { MetricDetailModal } from './components/MetricDetailModal';
import { AdminDashboard } from './components/AdminDashboard';
import { HealthReportModal } from './components/HealthReportModal';
import { ThemeSwitcherModal } from './components/ThemeSwitcherModal';
import { ResetCodeModal } from './components/ResetCodeModal';
import { StreakAchievements } from './components/StreakAchievements';
import { AiInsightsCard } from './components/cards/AiInsightsCard';
import { AiChatbot } from './components/AiChatbot';
import {
  DEFAULT_PROFILE,
  YESTERDAY_DATA,
  INITIAL_MEALS,
  NATURE_THEMES,
  HISTORICAL_DATA_7_DAYS,
} from './data/mockData';
import { ShieldCheck, Sprout } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundEngine } from './utils/soundGenerator';

function App() {
  // Language selection: 'en' | 'my'
  const [lang, setLang] = useState(() => {
    try {
      const saved = localStorage.getItem('vitalis_lang');
      return saved || 'en';
    } catch {
      return 'en';
    }
  });

  // Load profile from localStorage or fallback to default
  const [profile, setProfile] = useState(() => {
    try {
      const saved = localStorage.getItem('vitalis_profile');
      return saved ? JSON.parse(saved) : DEFAULT_PROFILE;
    } catch {
      return DEFAULT_PROFILE;
    }
  });

  // Current nature background theme
  const [currentTheme, setCurrentTheme] = useState(() => {
    try {
      const saved = localStorage.getItem('vitalis_theme');
      return saved ? JSON.parse(saved) : NATURE_THEMES[0];
    } catch {
      return NATURE_THEMES[0];
    }
  });

  // Daily tracking state
  const [dailyState, setDailyState] = useState(() => {
    try {
      const saved = localStorage.getItem('vitalis_daily_state');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return {
      waterGlasses: 5,
      steps: 8600,
      weight: 64.5,
      bloodPressure: { systolic: 118, diastolic: 76 },
      meals: INITIAL_MEALS,
      unit: 'kg',
      sleepData: { hours: 7.5, qualityScore: 88, bedtime: '23:00', wakeTime: '07:00' },
      fastingData: { targetHours: 16, isActive: true, startTime: Date.now() - 14 * 3600 * 1000 },
      moodData: { currentMood: 'calm', stressLevel: 3, notes: 'Feeling refreshed and mindful today.' },
      workouts: [
        { id: 'w1', name: 'Morning HIIT Cardio', activity: 'HIIT', duration: 25, calories: 300, time: '07:30 AM' },
      ],
      medications: [
        { id: 'med1', name: 'Vitamin D3', dosage: '2000 IU', timeOfDay: 'Morning', taken: true },
        { id: 'med2', name: 'Omega-3 Fish Oil', dosage: '1000 mg', timeOfDay: 'Lunch', taken: true },
        { id: 'med3', name: 'Magnesium Glycinate', dosage: '400 mg', timeOfDay: 'Bedtime', taken: false },
      ],
    };
  });

  // Streak count
  const [streakCount, setStreakCount] = useState(6);

  // Auth & Modals
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [isThemesOpen, setIsThemesOpen] = useState(false);
  const [isResetCodeOpen, setIsResetCodeOpen] = useState(false);
  const [detailMetric, setDetailMetric] = useState(null);

  // Sync state changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('vitalis_lang', lang);
    } catch (err) {
      console.warn('Failed to save language', err);
    }
  }, [lang]);

  useEffect(() => {
    try {
      localStorage.setItem('vitalis_profile', JSON.stringify(profile));
    } catch (err) {
      console.warn('Failed to save profile', err);
    }
  }, [profile]);

  useEffect(() => {
    try {
      localStorage.setItem('vitalis_daily_state', JSON.stringify(dailyState));
    } catch (err) {
      console.warn('Failed to save daily state', err);
    }
  }, [dailyState]);

  useEffect(() => {
    try {
      localStorage.setItem('vitalis_theme', JSON.stringify(currentTheme));
    } catch (err) {
      console.warn('Failed to save theme', err);
    }
  }, [currentTheme]);

  // Goal trigger confetti celebrations
  useEffect(() => {
    if (dailyState.steps === 10000 || dailyState.waterGlasses === 8) {
      soundEngine.playChime();
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#34d399', '#38bdf8', '#f59e0b', '#ec4899'],
      });
    }
  }, [dailyState.steps, dailyState.waterGlasses]);

  // Handlers
  const handleSaveProfile = (updatedProfile) => {
    setProfile(updatedProfile);
  };

  const handleLogin = (userData) => {
    setIsLoggedIn(true);
    setProfile((prev) => ({
      ...prev,
      ...userData,
    }));
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setProfile((prev) => ({
      ...prev,
      role: 'user',
    }));
  };

  const handleResetDemoData = () => {
    setDailyState({
      waterGlasses: 5,
      steps: 8600,
      weight: 64.5,
      bloodPressure: { systolic: 118, diastolic: 76 },
      meals: INITIAL_MEALS,
      unit: 'kg',
      sleepData: { hours: 7.5, qualityScore: 88, bedtime: '23:00', wakeTime: '07:00' },
      fastingData: { targetHours: 16, isActive: true, startTime: Date.now() - 14 * 3600 * 1000 },
      moodData: { currentMood: 'calm', stressLevel: 3, notes: 'Feeling refreshed and mindful today.' },
      workouts: [
        { id: 'w1', name: 'Morning HIIT Cardio', activity: 'HIIT', duration: 25, calories: 300, time: '07:30 AM' },
      ],
      medications: [
        { id: 'med1', name: 'Vitamin D3', dosage: '2000 IU', timeOfDay: 'Morning', taken: true },
        { id: 'med2', name: 'Omega-3 Fish Oil', dosage: '1000 mg', timeOfDay: 'Lunch', taken: true },
        { id: 'med3', name: 'Magnesium Glycinate', dosage: '400 mg', timeOfDay: 'Bedtime', taken: false },
      ],
    });
    setProfile(DEFAULT_PROFILE);
    setCurrentTheme(NATURE_THEMES[0]);
  };

  return (
    <div
      className="nature-bg-container relative text-white font-sans selection:bg-emerald-500 selection:text-white transition-all duration-700"
      style={{ backgroundImage: `url(${currentTheme.url})` }}
    >
      {/* Translucent nature backdrop overlay */}
      <div className="nature-overlay" />

      {/* Main Content Wrap */}
      <div className="relative z-10 min-h-screen flex flex-col justify-between max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <div>
          {/* Global Glass Navbar */}
          <Navbar
            profile={profile}
            isLoggedIn={isLoggedIn}
            onOpenAuth={() => setIsAuthOpen(true)}
            onOpenProfile={() => setIsProfileOpen(true)}
            onLogout={handleLogout}
            onResetDemoData={handleResetDemoData}
            onOpenReport={() => setIsReportOpen(true)}
            onOpenThemes={() => setIsThemesOpen(true)}
            onOpenAdmin={() => setIsAdminOpen(true)}
            onOpenResetCode={() => setIsResetCodeOpen(true)}
            lang={lang}
            setLang={setLang}
          />

          {/* Daily Streak & Achievements Banner */}
          <StreakAchievements streakCount={streakCount} />

          <main className="space-y-8">
            {/* Feature 3: Dashboard & Analytics Overview Glass Pane */}
            <DashboardOverview
              profile={profile}
              dailyState={dailyState}
              onOpenProfile={() => setIsProfileOpen(true)}
            />

            {/* Smart AI Daily Health Assistant Card */}
            <AiInsightsCard dailyState={dailyState} profile={profile} />

            {/* Feature 2: Daily Log UI (All Health, Recovery, Workout & Medication Cards) */}
            <DailyLog
              dailyState={dailyState}
              setDailyState={setDailyState}
              profile={profile}
              yesterdayData={YESTERDAY_DATA}
              onOpenDetail={(metric) => setDetailMetric(metric)}
              lang={lang}
            />
          </main>
        </div>

        {/* Modern Nature Footer */}
        <footer className="mt-16 pt-8 pb-6 border-t border-white/10 text-center sm:text-left text-xs text-white/50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <Sprout className="w-3 h-3" />
            </div>
            <span>Vitalis Health Ecosystem • Modern Nature & Glassmorphism Suite</span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <button
              type="button"
              onClick={() => setIsAdminOpen(true)}
              className="text-amber-300 hover:text-amber-200 transition font-semibold"
            >
              Admin Portal
            </button>
            <span>•</span>
            <button
              type="button"
              onClick={() => setIsReportOpen(true)}
              className="text-emerald-300 hover:text-emerald-200 transition"
            >
              Print Health Report
            </button>
            <span>•</span>
            <span className="flex items-center gap-1 text-white/60">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Offline Local Storage Active</span>
            </span>
          </div>
        </footer>
      </div>

      {/* Floating Interactive AI Health Chatbot */}
      <AiChatbot dailyState={dailyState} profile={profile} lang={lang} />

      {/* Feature 1: Modals for Authentication & Profile Setup */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onLogin={handleLogin}
        user={profile}
      />

      <ProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        profile={profile}
        onSaveProfile={handleSaveProfile}
      />

      {/* Detail Deep Dive Modal */}
      <MetricDetailModal
        isOpen={Boolean(detailMetric)}
        onClose={() => setDetailMetric(null)}
        metricType={detailMetric}
        dailyState={dailyState}
        profile={profile}
      />

      {/* Admin Management Dashboard */}
      <AdminDashboard
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        currentUser={profile}
      />

      {/* Clinical Health Report Modal */}
      <HealthReportModal
        isOpen={isReportOpen}
        onClose={() => setIsReportOpen(false)}
        profile={profile}
        dailyState={dailyState}
        historicalData={HISTORICAL_DATA_7_DAYS}
      />

      {/* Nature Wallpaper Theme Switcher */}
      <ThemeSwitcherModal
        isOpen={isThemesOpen}
        onClose={() => setIsThemesOpen(false)}
        currentTheme={currentTheme}
        onSelectTheme={(theme) => setCurrentTheme(theme)}
      />

      {/* Confirmation Reset Code Modal */}
      <ResetCodeModal
        isOpen={isResetCodeOpen}
        onClose={() => setIsResetCodeOpen(false)}
        onConfirmReset={handleResetDemoData}
      />
    </div>
  );
}

export default App;
