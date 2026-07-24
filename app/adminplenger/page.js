'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function AdminPlengerPage() {
  const [adminPin, setAdminPin] = useState('');
  const [isAuthorized, setIsAuthorized] = useState(false);

  // Vehicle Balancing Data State
  const [vehicleBalancingList, setVehicleBalancingList] = useState([
    { id: 'v-1', name: 'Pfister Comet S2 (Super)', class: 'SUPER CAR', topSpeed: '215 km/h', accel: '3.2s (0-100)', handling: 'S+ (Track Spec)', price: '$4,500', balanceStatus: 'BALANCED' },
    { id: 'v-2', name: 'Bravado Gauntlet Hellfire (Muscle)', class: 'MUSCLE', topSpeed: '205 km/h', accel: '3.4s (0-100)', handling: 'B+ (Drift Spec)', price: '$2,800', balanceStatus: 'BALANCED' },
    { id: 'v-3', name: 'Vapid Stanier SCVP Cruiser (Police)', class: 'EMERGENCY', topSpeed: '220 km/h', accel: '3.1s (0-100)', handling: 'A+ (Pursuit Spec)', price: '$0 (Instansi)', balanceStatus: 'BUFFED FOR PURSUIT' },
    { id: 'v-4', name: 'Vapid Speedo SAFD Rescue (EMS)', class: 'EMERGENCY', topSpeed: '185 km/h', accel: '4.5s (0-100)', handling: 'A (Heavy Spec)', price: '$0 (Instansi)', balanceStatus: 'BALANCED' },
    { id: 'v-5', name: 'Karin Futo GTX (Tuner)', class: 'COMPACT TUNER', topSpeed: '175 km/h', accel: '4.8s (0-100)', handling: 'A+ (Touge Spec)', price: '$850', balanceStatus: 'BALANCED' },
  ]);

  const handleAdminAuth = (e) => {
    e.preventDefault();
    if (adminPin === '7777' || adminPin === '1234' || adminPin === 'plenger') {
      setIsAuthorized(true);
    } else {
      alert("AKSES ADMIN PLENGER DITOLAK! PIN Rahasia Salah.");
    }
  };

  return (
    <div className="min-h-screen">
      {/* Header Khusus Secret Admin Plenger Gate */}
      <header className="sticky top-0 z-50 px-8 py-4 flex justify-between items-center bg-[#060812]/90 backdrop-blur-md border-b border-purple-500/40">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 bg-gradient-to-br from-purple-600 to-indigo-900 rounded-xl flex items-center justify-center text-xl shadow-lg shadow-purple-500/30 text-white font-black">
            <i className="fa-solid fa-user-ninja"></i>
          </div>
          <div>
            <h1 className="text-xl font-black bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 bg-clip-text text-transparent">
              ADMIN PLENGER DASHBOARD (YANG TAU-TAU AJA)
            </h1>
            <p className="text-xs text-slate-400 font-medium">Secret Admin Portal & Management Vehicle Balancing Report</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Link href="/" className="text-xs font-bold text-slate-400 hover:text-white transition-colors">
            ← City Hub
          </Link>
          <div className="flex items-center gap-2 bg-purple-500/10 border border-purple-500/40 px-4 py-2 rounded-full text-xs font-bold text-purple-400">
            <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse"></span>
            <span>Secret Plenger Level Active</span>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto my-9 px-6 space-y-6">
        {!isAuthorized ? (
          /* SECRET LOGIN GATE */
          <div className="max-w-md mx-auto my-16 bg-slate-900/80 border border-purple-500/40 rounded-3xl p-8 backdrop-blur-md shadow-2xl text-center space-y-6">
            <div className="w-16 h-16 bg-purple-500/20 border border-purple-500/40 rounded-2xl mx-auto flex items-center justify-center text-3xl text-purple-400 shadow-lg shadow-purple-500/20">
              <i className="fa-solid fa-lock text-purple-400"></i>
            </div>
            <div className="space-y-1">
              <h3 className="text-xl font-black text-white">SECRET ADMIN PLENGER PORTAL</h3>
              <p className="text-xs text-slate-400">Halaman ini khusus internal Admin Plenger High Management. Masukkan PIN Rahasia (7777 / 1234).</p>
            </div>

            <form onSubmit={handleAdminAuth} className="space-y-4">
              <div>
                <input
                  type="password"
                  value={adminPin}
                  onChange={(e) => setAdminPin(e.target.value)}
                  placeholder="Masukkan PIN Rahasia Plenger..."
                  required
                  className="w-full bg-black/60 border border-purple-500/40 rounded-xl p-4 text-white text-center font-mono text-lg outline-none focus:border-purple-400"
                />
              </div>
              <button type="submit" className="w-full bg-gradient-to-r from-purple-600 to-indigo-800 text-white font-black p-4 rounded-xl shadow-lg shadow-purple-500/30 hover:scale-[1.01] transition-transform">
                Masuk Dashboard Admin Plenger
              </button>
            </form>
          </div>
        ) : (
          /* SECRET ADMIN DASHBOARD & VEHICLE BALANCING REPORT */
          <div className="space-y-6">
            
            {/* Banner Plenger */}
            <div className="bg-gradient-to-r from-purple-900/40 via-indigo-900/30 to-slate-900 border border-purple-500/40 rounded-3xl p-7 flex justify-between items-center backdrop-blur-md">
              <div>
                <span className="px-3 py-1 rounded-md text-[10px] font-black bg-purple-500/20 text-purple-300 border border-purple-500/40 uppercase">CONFIDENTIAL ADMIN REPORT</span>
                <h2 className="text-2xl font-black text-white mt-1">Management Vehicle Balancing Report Supercali RP</h2>
                <p className="text-xs text-slate-400 mt-1">Laporan balancing top-speed, akselerasi, handling, & penyesuaian harga kendaraan berdasarkan Ekonomi Low-Pay Kota ($5 - $45 Payout).</p>
              </div>
              <i className="fa-solid fa-car-tunnel text-4xl text-purple-400/80"></i>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-4 gap-5">
              <div className="bg-purple-950/40 border border-purple-500/30 rounded-2xl p-5 backdrop-blur-md">
                <div className="text-xs font-bold text-purple-400 uppercase">TOTAL VEHICLE TYPES</div>
                <div className="text-2xl font-black text-purple-300 mt-1">142 Models</div>
              </div>
              <div className="bg-emerald-950/40 border border-emerald-500/30 rounded-2xl p-5 backdrop-blur-md">
                <div className="text-xs font-bold text-emerald-400 uppercase">BALANCED CLASSES</div>
                <div className="text-2xl font-black text-emerald-400 mt-1">100% Verified</div>
              </div>
              <div className="bg-cyan-950/40 border border-cyan-500/30 rounded-2xl p-5 backdrop-blur-md">
                <div className="text-xs font-bold text-cyan-400 uppercase">POLICE PURSUIT SPEED</div>
                <div className="text-2xl font-black text-cyan-300 mt-1">220 km/h (Cap)</div>
              </div>
              <div className="bg-amber-950/40 border border-amber-500/30 rounded-2xl p-5 backdrop-blur-md">
                <div className="text-xs font-bold text-amber-400 uppercase">ECONOMY PRICE RANGE</div>
                <div className="text-2xl font-black text-amber-300 mt-1">$500 - $4,500</div>
              </div>
            </div>

            {/* Main Vehicle Balancing Table Report */}
            <div className="bg-slate-900/60 border border-purple-500/30 rounded-3xl overflow-hidden backdrop-blur-md shadow-2xl">
              <div className="p-5 border-b border-purple-500/30 flex justify-between items-center bg-purple-950/20">
                <h3 className="text-sm font-black text-purple-300 uppercase tracking-wider flex items-center gap-2">
                  <i className="fa-solid fa-sliders text-purple-400"></i> MANAGEMENT VEHICLE BALANCING SPECS REPORT
                </h3>
                <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/30">
                  STATUS: STABLE ROLEPLAY BALANCED
                </span>
              </div>

              <table className="w-full text-left">
                <thead className="bg-white/5 text-xs text-slate-400 font-bold uppercase border-b border-white/10">
                  <tr>
                    <th className="p-4 px-6">Nama & Model Kendaraan</th>
                    <th className="p-4 px-6">Kelas Kendaraan</th>
                    <th className="p-4 px-6">Top Speed Cap</th>
                    <th className="p-4 px-6">Akselerasi (0-100)</th>
                    <th className="p-4 px-6">Handling Index</th>
                    <th className="p-4 px-6">Harga Ekonomi</th>
                    <th className="p-4 px-6">Status Balancing</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10 text-sm">
                  {vehicleBalancingList.map(v => (
                    <tr key={v.id} className="hover:bg-purple-950/20 transition-colors">
                      <td className="p-4 px-6 font-bold text-white">{v.name}</td>
                      <td className="p-4 px-6">
                        <span className="px-2.5 py-1 rounded-md text-[10px] font-black bg-purple-500/20 text-purple-300 border border-purple-500/40 uppercase">
                          {v.class}
                        </span>
                      </td>
                      <td className="p-4 px-6 font-mono text-cyan-400 font-bold">{v.topSpeed}</td>
                      <td className="p-4 px-6 font-mono text-slate-300">{v.accel}</td>
                      <td className="p-4 px-6 font-semibold text-amber-400">{v.handling}</td>
                      <td className="p-4 px-6 font-mono font-black text-emerald-400">{v.price}</td>
                      <td className="p-4 px-6">
                        <span className="px-2.5 py-1 rounded-lg text-xs font-black bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 uppercase">
                          {v.balanceStatus}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Secret Admin Notes */}
            <div className="bg-slate-900/60 border border-white/10 rounded-2xl p-5 backdrop-blur-md text-xs space-y-2">
              <span className="text-purple-400 font-bold uppercase tracking-widest block">🔒 CATATAN RAHASIA ADMIN PLENGER:</span>
              <p className="text-slate-400 leading-relaxed">
                Rasio balancing kendaraan ini disesuaikan khusus dengan kecepatan respon pursuit SCVP Police Cruiser (Cap 220 km/h) agar kejar-kejaran RP seimbang & realistis. Seluruh harga jual dealer berada di kisaran $500 - $4,500 menyesuaikan gaji kerja sipil Low-Pay ($5 - $45).
              </p>
            </div>

          </div>
        )}
      </main>
    </div>
  );
}
