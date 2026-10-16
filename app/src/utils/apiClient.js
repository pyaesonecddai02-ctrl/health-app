// Vitalis Unified API Client for Railway Backend & Netlify Frontend

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export async function checkApiHealth() {
  try {
    const res = await fetch(`${API_BASE_URL}/health`);
    if (!res.ok) throw new Error('API offline');
    return await res.json();
  } catch (err) {
    return { status: 'offline', error: err.message };
  }
}

export async function syncVitalsToBackend(vitalsData) {
  try {
    const res = await fetch(`${API_BASE_URL}/api/vitals`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(vitalsData),
    });
    return await res.json();
  } catch (err) {
    console.warn('Backend sync deferred (offline local mode):', err.message);
    return null;
  }
}

export async function fetchVitalsFromBackend() {
  try {
    const res = await fetch(`${API_BASE_URL}/api/vitals`);
    if (!res.ok) return null;
    const json = await res.json();
    return json.data;
  } catch {
    return null;
  }
}

export async function askDrVitalisApi(message, lang = 'en') {
  try {
    const res = await fetch(`${API_BASE_URL}/api/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, lang }),
    });
    const json = await res.json();
    return json.reply;
  } catch {
    return null;
  }
}

export { API_BASE_URL };
