import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Enable Cross-Origin Resource Sharing for Netlify & local dev
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());

// In-memory data store with realistic initial data
let currentVitals = {
  waterGlasses: 5,
  steps: 8600,
  weight: 64.5,
  unit: 'kg',
  bloodPressure: { systolic: 118, diastolic: 76 },
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
  meals: [
    { id: 'm1', name: 'Avocado Sourdough & Poached Egg', calories: 380, category: 'Breakfast', time: '08:15 AM' },
    { id: 'm2', name: 'Wild Salmon Bowl with Quinoa', calories: 590, category: 'Lunch', time: '01:20 PM' },
    { id: 'm3', name: 'Organic Greek Yogurt & Blueberries', calories: 220, category: 'Snack', time: '04:30 PM' },
  ],
};

let users = [
  { id: 'u1', name: 'Sarah Miller', email: 'sarah.miller@vitalis.health', role: 'user', steps: 8600, water: 6, weight: 64.5, bp: '118/76 (Normal)', status: 'Active', healthScore: 92 },
  { id: 'u2', name: 'Dr. Alexander Reed', email: 'admin@vitalis.health', role: 'admin', steps: 10200, water: 8, weight: 76.5, bp: '119/78 (Normal)', status: 'Superadmin', healthScore: 95 },
  { id: 'u3', name: 'James Wilson', email: 'j.wilson@gmail.com', role: 'user', steps: 11400, water: 8, weight: 78.2, bp: '122/79 (Elevated)', status: 'Active', healthScore: 88 },
  { id: 'u4', name: 'Elena Rostova', email: 'elena.r@vitalis.health', role: 'user', steps: 4300, water: 4, weight: 58.0, bp: '114/72 (Normal)', status: 'Active', healthScore: 76 },
];

const historical7Days = [
  { date: 'Oct 10', steps: 8900, weight: 65.2, calories: 2050, sleep: 7.8 },
  { date: 'Oct 11', steps: 10400, weight: 65.1, calories: 1890, sleep: 8.2 },
  { date: 'Oct 12', steps: 6800, weight: 65.0, calories: 2120, sleep: 6.5 },
  { date: 'Oct 13', steps: 11200, weight: 64.9, calories: 1850, sleep: 8.0 },
  { date: 'Oct 14', steps: 9400, weight: 65.0, calories: 1950, sleep: 7.6 },
  { date: 'Oct 15', steps: 8600, weight: 64.5, calories: 1190, sleep: 7.5 },
  { date: 'Oct 16', steps: 9200, weight: 64.4, calories: 1780, sleep: 7.8 },
];

// --- ROUTES ---

// Health Checks (Crucial for Railway)
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', uptime: process.uptime(), timestamp: new Date().toISOString() });
});

app.get('/', (req, res) => {
  res.json({
    service: 'Vitalis Health Ecosystem REST API',
    status: 'online',
    platform: 'Railway Cloud Engine',
    version: '1.0.0',
    endpoints: [
      '/health',
      '/api/vitals',
      '/api/history',
      '/api/auth/login',
      '/api/auth/reset-code',
      '/api/admin/users',
      '/api/chat',
    ],
  });
});

// Vitals Endpoints
app.get('/api/vitals', (req, res) => {
  res.json({ success: true, data: currentVitals });
});

app.post('/api/vitals', (req, res) => {
  currentVitals = { ...currentVitals, ...req.body };
  res.json({ success: true, message: 'Vitals synchronized successfully', data: currentVitals });
});

// History Analytics
app.get('/api/history', (req, res) => {
  res.json({ success: true, data: historical7Days });
});

// Auth & Password Reset Code
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  const isAdmin = email && email.toLowerCase().includes('admin');
  res.json({
    success: true,
    user: {
      name: isAdmin ? 'Dr. Alexander Reed' : 'Sarah Miller',
      email: email || 'sarah.miller@vitalis.health',
      role: isAdmin ? 'admin' : 'user',
      token: 'jwt_mock_token_vitalis_' + Date.now(),
    },
  });
});

app.post('/api/auth/reset-code', (req, res) => {
  const { email } = req.body;
  const resetCode = Math.floor(100000 + Math.random() * 900000).toString();
  res.json({
    success: true,
    message: `Security Reset Code sent to ${email}`,
    code: resetCode, // for demo convenience
    expiresIn: 300,
  });
});

// Admin Users Management
app.get('/api/admin/users', (req, res) => {
  res.json({ success: true, count: users.length, data: users });
});

app.patch('/api/admin/users/:id', (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  users = users.map((u) => (u.id === id ? { ...u, ...updates } : u));
  const updatedUser = users.find((u) => u.id === id);
  res.json({ success: true, data: updatedUser });
});

// Dr. Vitalis AI Advice Endpoint
app.post('/api/chat', (req, res) => {
  const { message, lang = 'en' } = req.body;
  const q = (message || '').toLowerCase();

  let reply = '';
  if (q.includes('vital') || q.includes('analyze') || q.includes('today')) {
    reply = lang === 'my'
      ? `📊 **ယနေ့ ဇီဝကျန်းမာရေး သုံးသပ်ချက် (Railway API):**\n• ရေ: ${currentVitals.waterGlasses}/8 ခွက်\n• ခြေလှမ်း: ${currentVitals.steps} ခြေလှမ်း\n• သွေးပေါင်ချိန်: ${currentVitals.bloodPressure.systolic}/${currentVitals.bloodPressure.diastolic} mmHg (ပုံမှန်ဇုန်)`
      : `📊 **Live Biometric Telemetry (Railway API):**\n• Hydration: ${currentVitals.waterGlasses}/8 glasses\n• Steps: ${currentVitals.steps} logged\n• BP: ${currentVitals.bloodPressure.systolic}/${currentVitals.bloodPressure.diastolic} mmHg (Optimal Homeostasis)`;
  } else {
    reply = lang === 'my'
      ? `Dr. Vitalis API မှ ကြိုဆိုပါသည်။ သင်၏ ဇီဝဒေတာများကို Railway Cloud မှ တိုက်ရိုက် စိစစ်သုံးသပ်ပေးနေပါသည်ခင်ဗျာ။`
      : `Dr. Vitalis Railway Cloud Advisor: Your biometric equilibrium is stable. Continue consistent hydration and aerobic cadence.`;
  }

  res.json({ success: true, reply, timestamp: new Date().toISOString() });
});

// Start Express Listener
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🌿 Vitalis API Server running on port ${PORT}`);
  console.log(`🔗 Health check available at: http://localhost:${PORT}/health`);
});

export default app;
