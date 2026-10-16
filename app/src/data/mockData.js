// Mock Health Data for Vitalis Health Tracking MVP & Advanced Suite

export const NATURE_THEMES = [
  {
    id: 'forest',
    name: 'Misty Pine Forest',
    tag: 'Calm & Grounding',
    url: 'https://images.unsplash.com/photo-1511497584788-87676104235f?auto=format&fit=crop&w=2560&q=85',
    accent: '#34d399',
  },
  {
    id: 'lake',
    name: 'Alpine Lake & Peaks',
    tag: 'Serene & Fresh',
    url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=2560&q=85',
    accent: '#38bdf8',
  },
  {
    id: 'stones',
    name: 'Zen River Stones',
    tag: 'Balance & Focus',
    url: 'https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&w=2560&q=85',
    accent: '#a78bfa',
  },
  {
    id: 'ocean',
    name: 'Deep Emerald Waters',
    tag: 'Deep Breath',
    url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2560&q=85',
    accent: '#2dd4bf',
  },
  {
    id: 'sunset',
    name: 'Golden Mountain Dawn',
    tag: 'Energy & Radiance',
    url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=2560&q=85',
    accent: '#fbbf24',
  },
];

export const DEFAULT_PROFILE = {
  name: "Sarah Miller",
  email: "sarah.miller@vitalis.health",
  role: "user", // "user" | "admin"
  age: 29,
  gender: "Female",
  height: 168, // cm
  baselineWeight: 65.0, // kg
  unit: "kg",
  dailyWaterGoal: 8, // glasses (2000 ml)
  dailyStepsGoal: 10000, // steps
  dailyCaloriesGoal: 2000, // kcal
  dailySleepGoal: 8.0, // hours
};

export const ADMIN_PROFILE = {
  name: "Dr. Alexander Reed",
  email: "admin@vitalis.health",
  role: "admin",
  age: 38,
  gender: "Male",
  height: 182,
  baselineWeight: 76.5,
  unit: "kg",
  dailyWaterGoal: 8,
  dailyStepsGoal: 12000,
  dailyCaloriesGoal: 2400,
  dailySleepGoal: 8.0,
};

export const YESTERDAY_DATA = {
  weight: 65.0,
  steps: 8420,
  waterGlasses: 7,
  bloodPressure: {
    systolic: 120,
    diastolic: 78,
  },
  calories: 1950,
  sleepHours: 7.2,
};

export const INITIAL_MEALS = [
  {
    id: "m1",
    name: "Avocado Sourdough & Poached Egg",
    calories: 380,
    category: "Breakfast",
    time: "08:15 AM",
  },
  {
    id: "m2",
    name: "Wild Salmon Bowl with Quinoa & Kale",
    calories: 590,
    category: "Lunch",
    time: "01:20 PM",
  },
  {
    id: "m3",
    name: "Organic Greek Yogurt & Blueberries",
    calories: 220,
    category: "Snack",
    time: "04:30 PM",
  },
];

export const STEP_MILESTONES = [
  { threshold: 2000, label: "2k", title: "Warmup" },
  { threshold: 4000, label: "4k", title: "Active" },
  { threshold: 6000, label: "6k", title: "Energized" },
  { threshold: 8000, label: "8k", title: "Endurance" },
  { threshold: 10000, label: "10k", title: "Peak Goal" },
];

export const HISTORICAL_DATA_7_DAYS = [
  { date: "Oct 9", steps: 7200, weight: 65.4, calories: 1980, sleep: 7.0 },
  { date: "Oct 10", steps: 8900, weight: 65.2, calories: 2050, sleep: 7.8 },
  { date: "Oct 11", steps: 10400, weight: 65.1, calories: 1890, sleep: 8.2 },
  { date: "Oct 12", steps: 6800, weight: 65.0, calories: 2120, sleep: 6.5 },
  { date: "Oct 13", steps: 11200, weight: 64.9, calories: 1850, sleep: 8.0 },
  { date: "Oct 14", steps: 9400, weight: 65.0, calories: 1950, sleep: 7.6 },
  { date: "Oct 15", steps: 8600, weight: 64.5, calories: 1190, sleep: 7.5 },
];

export const HISTORICAL_DATA_30_DAYS = [
  { date: "Sep 16", steps: 8100, weight: 66.8, calories: 2150, sleep: 7.2 },
  { date: "Sep 18", steps: 9400, weight: 66.5, calories: 2020, sleep: 7.5 },
  { date: "Sep 20", steps: 7800, weight: 66.4, calories: 1990, sleep: 6.8 },
  { date: "Sep 22", steps: 10200, weight: 66.1, calories: 1880, sleep: 8.1 },
  { date: "Sep 24", steps: 8900, weight: 66.0, calories: 2050, sleep: 7.4 },
  { date: "Sep 26", steps: 11500, weight: 65.8, calories: 1900, sleep: 8.4 },
  { date: "Sep 28", steps: 7600, weight: 65.9, calories: 2100, sleep: 6.9 },
  { date: "Sep 30", steps: 9800, weight: 65.6, calories: 1940, sleep: 7.8 },
  { date: "Oct 2", steps: 10600, weight: 65.5, calories: 1870, sleep: 7.6 },
  { date: "Oct 4", steps: 8400, weight: 65.3, calories: 2010, sleep: 7.3 },
  { date: "Oct 6", steps: 9100, weight: 65.2, calories: 1920, sleep: 7.9 },
  { date: "Oct 8", steps: 10800, weight: 65.4, calories: 1850, sleep: 8.0 },
  { date: "Oct 10", steps: 8900, weight: 65.2, calories: 2050, sleep: 7.5 },
  { date: "Oct 12", steps: 6800, weight: 65.0, calories: 2120, sleep: 6.7 },
  { date: "Oct 14", steps: 9400, weight: 65.0, calories: 1950, sleep: 7.8 },
  { date: "Oct 15", steps: 8600, weight: 64.5, calories: 1190, sleep: 7.5 },
];

export const ACHIEVEMENTS = [
  { id: 'streak_5', title: 'Consistency King', desc: 'Maintain a 5-day active tracking streak', icon: '🔥', unlocked: true },
  { id: 'water_hero', title: 'Hydration Hero', desc: 'Reach 8 glasses of pure water 3 days in a row', icon: '💧', unlocked: true },
  { id: 'step_master', title: '10K Pioneer', desc: 'Conquer the 10,000 steps daily threshold', icon: '👟', unlocked: true },
  { id: 'bp_optimal', title: 'Heart Guardian', desc: 'Maintain normal blood pressure readings (<120/80)', icon: '❤️', unlocked: true },
  { id: 'zen_mind', title: 'Zen Master', desc: 'Practice mindful relaxation and log daily mood', icon: '🧘', unlocked: true },
  { id: 'fast_champion', title: '16:8 Fasting Master', desc: 'Successfully complete a 16-hour fasting window', icon: '⏳', unlocked: false },
];

export const MOCK_ADMIN_USERS = [
  { id: 'u1', name: 'Sarah Miller', email: 'sarah.miller@vitalis.health', role: 'user', steps: 8600, water: 6, weight: 64.5, bp: '118/76 (Normal)', status: 'Active', healthScore: 92, joinDate: '2026-08-10' },
  { id: 'u2', name: 'James Wilson', email: 'j.wilson@gmail.com', role: 'user', steps: 11400, water: 8, weight: 78.2, bp: '122/79 (Elevated)', status: 'Active', healthScore: 88, joinDate: '2026-09-01' },
  { id: 'u3', name: 'Elena Rostova', email: 'elena.r@vitalis.health', role: 'user', steps: 4300, water: 4, weight: 58.0, bp: '114/72 (Normal)', status: 'Active', healthScore: 76, joinDate: '2026-09-14' },
  { id: 'u4', name: 'Marcus Chen', email: 'mchen@techcorp.io', role: 'user', steps: 9800, water: 7, weight: 72.1, bp: '134/86 (High)', status: 'Review Needed', healthScore: 71, joinDate: '2026-07-22' },
  { id: 'u5', name: 'Amina Al-Mansoor', email: 'amina.m@oasis.co', role: 'user', steps: 12500, water: 8, weight: 61.4, bp: '116/74 (Normal)', status: 'Active', healthScore: 96, joinDate: '2026-06-30' },
  { id: 'u6', name: 'Dr. Alexander Reed', email: 'admin@vitalis.health', role: 'admin', steps: 10200, water: 8, weight: 76.5, bp: '119/78 (Normal)', status: 'Superadmin', healthScore: 95, joinDate: '2026-01-01' },
];
