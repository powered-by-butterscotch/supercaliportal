'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Home() {
  const [economyData, setEconomyData] = useState([]);
  const [serverConnected, setServerConnected] = useState(true);

  useEffect(() => {
    fetchLiveEconomy();
    const interval = setInterval(fetchLiveEconomy, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchLiveEconomy = async () => {
    try {
      const res = await fetch('/api/economy');
      const json = await res.json();
      if (json && json.data) {
        setEconomyData(json.data);
        setServerConnected(true);
      }
    } catch (e) {
      setServerConnected(false);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Header Khusus City Hub & Ekonomi Kota */}
      <header className="sticky top-0 z-50 px-8 py-4 flex justify-between items-center bg-[#060812]/85 backdrop-blur-md border-b border-white/10">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center text-xl shadow-lg shadow-cyan-500/30">
            <i className="fa-solid fa-city"></i>
          </div>
          <div>
            <h1 className="text-xl font-black bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
              SUPERCALI ROLEPLAY
            </h1>
            <p className="text-xs text-slate-400 font-medium">Official City Hub & Economic Analytics</p>
          </div>
        </div>

        <nav className="flex gap-3 items-center">
          <Link href="/loket" className="px-4 py-2.5 rounded-xl text-xs font-extrabold bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/20 transition-all flex items-center gap-2">
            <i className="fa-solid fa-hospital-user"></i> Portal Layanan Medis & Loket
          </Link>
          <Link href="/staff" className="px-4 py-2.5 rounded-xl text-xs font-extrabold bg-amber-500/10 border border-amber-500/30 text-amber-400 hover:bg-amber-500/20 transition-all flex items-center gap-2">
            <i className="fa-solid fa-user-shield"></i> Portal Petugas / Staff
          </Link>
        </nav>

        <div className="flex items-center gap-2.5 bg-emerald-500/10 border border-emerald-500/30 px-4 py-2 rounded-full text-xs font-bold text-emerald-400">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>Supercali RP Live Sync</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto my-9 px-6 space-y-6">
        {/* Banner */}
        <div className="bg-gradient-to-r from-cyan-500/15 via-blue-600/10 to-amber-500/10 border border-cyan-500/30 rounded-3xl p-7 flex justify-between items-center backdrop-blur-md">
          <div>
            <h2 className="text-2xl font-black text-white">Pasar & Analytics Ekonomi Kota Supercali</h2>
            <p className="text-xs text-slate-400 mt-1">Pantau grafik tren komoditas 24 jam & daftar harga pasar resmi Low-Pay Model ($5 - $45).</p>
          </div>
          <i className="fa-solid fa-chart-line text-4xl text-cyan-400/80"></i>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-4 gap-5">
          <div className="bg-slate-900/60 border border-white/10 rounded-2xl p-5 backdrop-blur-md">
            <div className="text-xs font-semibold text-slate-400">PAYCHECK STANDAR (10 MIN)</div>
            <div className="text-xl font-black text-white mt-1">$50 - $150</div>
          </div>
          <div className="bg-slate-900/60 border border-white/10 rounded-2xl p-5 backdrop-blur-md">
            <div className="text-xs font-semibold text-slate-400">TARGET PROFIT / JAM</div>
            <div className="text-xl font-black text-emerald-400 mt-1">$200 - $600</div>
          </div>
          <div className="bg-slate-900/60 border border-white/10 rounded-2xl p-5 backdrop-blur-md">
            <div className="text-xs font-semibold text-slate-400">HARGA MAKANAN STANDAR</div>
            <div className="text-xl font-black text-amber-400 mt-1">$15 - $40</div>
          </div>
          <div className="bg-slate-900/60 border border-white/10 rounded-2xl p-5 backdrop-blur-md">
            <div className="text-xs font-semibold text-slate-400">TARGET BELI MOBIL ($50K)</div>
            <div className="text-xl font-black text-purple-400 mt-1">~80 - 250 Jam</div>
          </div>
        </div>

        {/* Economy Table */}
        <div className="bg-slate-900/60 border border-white/10 rounded-3xl overflow-hidden backdrop-blur-md shadow-2xl">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/5 text-xs text-slate-400 font-bold uppercase border-b border-white/10">
                <th className="p-4 px-6">Komoditas / Barang</th>
                <th className="p-4 px-6">Kategori</th>
                <th className="p-4 px-6">Los Santos</th>
                <th className="p-4 px-6">Sandy Shores</th>
                <th className="p-4 px-6">Paleto Bay</th>
                <th className="p-4 px-6">Status Demand</th>
                <th className="p-4 px-6">Lokasi Jual Teruntung</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10 text-sm">
              {economyData.map((item, i) => (
                <tr key={i} className="hover:bg-white/5">
                  <td className="p-4 px-6 font-extrabold text-white">{item.item_name}</td>
                  <td className="p-4 px-6 text-slate-400">{item.category}</td>
                  <td className="p-4 px-6 font-mono font-bold">${item.price_ls} / item</td>
                  <td className="p-4 px-6 font-mono font-bold text-emerald-400">${item.price_sandy} / item</td>
                  <td className="p-4 px-6 font-mono font-bold text-emerald-400">${item.price_paleto} / item</td>
                  <td className="p-4 px-6">
                    <span className={`px-2.5 py-1 rounded-lg text-xs font-black ${item.demand_status === 'HIGH' ? 'bg-red-500/20 text-red-400 border border-red-500/40' : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'}`}>
                      {item.demand_status}
                    </span>
                  </td>
                  <td className="p-4 px-6 font-extrabold text-amber-400">{item.best_location}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
