import React, { useState } from 'react';
import {
  Shield,
  Users,
  Activity,
  CheckCircle2,
  AlertCircle,
  Search,
  Settings,
  Database,
  ArrowUpRight,
  TrendingUp,
  UserCheck,
  UserX,
  X,
} from 'lucide-react';
import { MOCK_ADMIN_USERS } from '../data/mockData';

export function AdminDashboard({ isOpen, onClose, currentUser }) {
  const [users, setUsers] = useState(MOCK_ADMIN_USERS);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('users'); // 'users' | 'settings' | 'logs'
  const [systemNotice, setSystemNotice] = useState('System operational • All data streams synced.');

  if (!isOpen) return null;

  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleUserRole = (id) => {
    setUsers((prev) =>
      prev.map((u) => {
        if (u.id === id) {
          const newRole = u.role === 'admin' ? 'user' : 'admin';
          return { ...u, role: newRole };
        }
        return u;
      })
    );
  };

  const toggleUserStatus = (id) => {
    setUsers((prev) =>
      prev.map((u) => {
        if (u.id === id) {
          const newStatus = u.status === 'Active' ? 'Suspended' : 'Active';
          return { ...u, status: newStatus };
        }
        return u;
      })
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-lg animate-in fade-in duration-200">
      <div className="glass-panel w-full max-w-5xl p-6 sm:p-8 relative border border-white/20 shadow-2xl max-h-[92vh] overflow-y-auto">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-white/50 hover:text-white hover:bg-white/10 transition cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Admin Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-rose-500 flex items-center justify-center text-slate-950 shadow-[0_0_20px_rgba(245,158,11,0.4)]">
              <Shield className="w-6 h-6 stroke-[2.3]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-black text-white tracking-tight">
                  Vitalis Admin Console
                </h2>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/40 uppercase tracking-widest">
                  Administrator Mode
                </span>
              </div>
              <p className="text-xs text-white/60">
                Logged in as <strong className="text-white">{currentUser?.name || 'Administrator'}</strong> ({currentUser?.email})
              </p>
            </div>
          </div>

          {/* Quick Tabs */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-black/40 border border-white/10 text-xs">
            <button
              type="button"
              onClick={() => setActiveTab('users')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition ${
                activeTab === 'users' ? 'bg-amber-500/30 text-amber-300 border border-amber-400/40' : 'text-white/60 hover:text-white'
              }`}
            >
              Users Directory ({users.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('settings')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition ${
                activeTab === 'settings' ? 'bg-amber-500/30 text-amber-300 border border-amber-400/40' : 'text-white/60 hover:text-white'
              }`}
            >
              Global Targets
            </button>
          </div>
        </div>

        {/* Global KPI Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-6">
          <div className="glass-card p-4">
            <span className="text-xs text-white/50 block">Registered Users</span>
            <span className="text-2xl font-bold text-white mt-1 block">1,248</span>
            <span className="text-[11px] text-emerald-300 flex items-center gap-1 mt-1">
              <TrendingUp className="w-3 h-3" /> +14% this week
            </span>
          </div>

          <div className="glass-card p-4">
            <span className="text-xs text-white/50 block">Active Today</span>
            <span className="text-2xl font-bold text-white mt-1 block">842</span>
            <span className="text-[11px] text-emerald-300">67.4% daily engagement</span>
          </div>

          <div className="glass-card p-4">
            <span className="text-xs text-white/50 block">Avg Vitality Score</span>
            <span className="text-2xl font-bold text-amber-300 mt-1 block">86.4 / 100</span>
            <span className="text-[11px] text-white/60">Community average</span>
          </div>

          <div className="glass-card p-4">
            <span className="text-xs text-white/50 block">Database Sync</span>
            <span className="text-2xl font-bold text-emerald-300 mt-1 block">99.98%</span>
            <span className="text-[11px] text-emerald-300">Operational</span>
          </div>
        </div>

        {/* Users Directory Tab */}
        {activeTab === 'users' && (
          <div className="space-y-4">
            {/* Search input */}
            <div className="relative">
              <Search className="w-4 h-4 text-white/40 absolute left-3.5 top-3" />
              <input
                type="text"
                placeholder="Search by name, email, or biometric status..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="glass-input w-full pl-10 pr-4 py-2.5 text-xs text-white"
              />
            </div>

            {/* Table */}
            <div className="overflow-x-auto rounded-xl border border-white/10 bg-black/20">
              <table className="w-full text-left text-xs">
                <thead className="bg-white/5 text-white/60 uppercase text-[10px] tracking-wider border-b border-white/10">
                  <tr>
                    <th className="p-3">User & Email</th>
                    <th className="p-3">Role</th>
                    <th className="p-3">Steps Today</th>
                    <th className="p-3">Blood Pressure</th>
                    <th className="p-3">Health Score</th>
                    <th className="p-3">Status</th>
                    <th className="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {filteredUsers.map((u) => (
                    <tr key={u.id} className="hover:bg-white/5 transition">
                      <td className="p-3">
                        <span className="font-semibold text-white block">{u.name}</span>
                        <span className="text-[11px] text-white/50">{u.email}</span>
                      </td>
                      <td className="p-3">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            u.role === 'admin'
                              ? 'bg-amber-500/20 text-amber-300 border border-amber-400/40'
                              : 'bg-white/10 text-white/70'
                          }`}
                        >
                          {u.role.toUpperCase()}
                        </span>
                      </td>
                      <td className="p-3 font-semibold text-emerald-300">
                        {u.steps.toLocaleString()}
                      </td>
                      <td className="p-3 text-white/80">{u.bp}</td>
                      <td className="p-3">
                        <span className="font-bold text-white">{u.healthScore}</span>
                        <span className="text-white/40">/100</span>
                      </td>
                      <td className="p-3">
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                            u.status === 'Active' || u.status === 'Superadmin'
                              ? 'bg-emerald-500/20 text-emerald-300'
                              : 'bg-rose-500/20 text-rose-300'
                          }`}
                        >
                          {u.status}
                        </span>
                      </td>
                      <td className="p-3 text-right space-x-2">
                        <button
                          type="button"
                          onClick={() => toggleUserRole(u.id)}
                          className="px-2 py-1 rounded bg-white/10 hover:bg-white/20 text-white/80 text-[10px] transition"
                        >
                          {u.role === 'admin' ? 'Revoke Admin' : 'Make Admin'}
                        </button>
                        <button
                          type="button"
                          onClick={() => toggleUserStatus(u.id)}
                          className={`px-2 py-1 rounded text-[10px] transition ${
                            u.status === 'Active'
                              ? 'bg-rose-500/20 hover:bg-rose-500/30 text-rose-300'
                              : 'bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300'
                          }`}
                        >
                          {u.status === 'Active' ? 'Suspend' : 'Activate'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Global Targets & System Settings Tab */}
        {activeTab === 'settings' && (
          <div className="space-y-4 text-xs">
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-3">
              <h4 className="font-bold text-white text-sm">System Health Baselines</h4>
              <p className="text-white/60">
                Configure default target baseline benchmarks for newly registered accounts.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div>
                  <label className="block text-white/50 mb-1">Default Daily Water</label>
                  <input
                    type="number"
                    defaultValue={8}
                    className="glass-input w-full p-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-white/50 mb-1">Default Step Threshold</label>
                  <input
                    type="number"
                    defaultValue={10000}
                    className="glass-input w-full p-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-white/50 mb-1">Default Calories Cap</label>
                  <input
                    type="number"
                    defaultValue={2000}
                    className="glass-input w-full p-2 text-white"
                  />
                </div>
              </div>

              <button
                type="button"
                onClick={() => alert('Global baseline targets updated successfully!')}
                className="mt-2 px-4 py-2 rounded-xl bg-emerald-500/30 hover:bg-emerald-500/40 border border-emerald-400/40 text-emerald-200 font-semibold"
              >
                Save Global Defaults
              </button>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-white/50">
          <span>{systemNotice}</span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition cursor-pointer"
          >
            Close Admin Console
          </button>
        </div>
      </div>
    </div>
  );
}
