'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Home() {
  const [economyData, setEconomyData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEconomy() {
      try {
        const res = await fetch('/api/economy');
        const data = await res.json();
        setEconomyData(data);
      } catch (err) {
        console.error("Gagal mengambil data ekonomi:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchEconomy();
  }, []);

  return (
    <div className="min-h-screen">
      {/* Header Utama Supercali RP */}
      <header className="sticky top-0 z-50 px-8 py-4 flex justify-between items-center bg-[#060812]/85 backdrop-blur-md border-b border-amber-500/30">
        <div className="flex items-center gap-3.5">
          {/* Logo Brand Supercali Resmi (Crown & Star Badge) */}
          <div className="w-11 h-11 bg-gradient-to-br from-amber-400 via-amber-500 to-amber-700 rounded-xl flex items-center justify-center text-xl shadow-lg shadow-amber-500/30 text-black font-black">
            <i className="fa-solid fa-crown text-black"></i>
          </div>
          <div>
            <h1 className="text-xl font-black bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 bg-clip-text text-transparent tracking-wide">
              SUPERCALI CITY HUB
            </h1>
            <p className="text-xs text-slate-400 font-medium">Official Public Portal, Economy Market & Subdomain Gates</p>
          </div>
        </div>

        {/* Subdomain Gates Fast Navigation */}
        <div className="flex items-center gap-3 text-xs font-bold">
          <Link href="/warga" className="px-3.5 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20 transition-all flex items-center gap-1.5">
            <i className="fa-solid fa-id-card"></i> Gate Warga
          </Link>
          <Link href="/loket" className="px-3.5 py-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/20 transition-all flex items-center gap-1.5">
            <i className="fa-solid fa-building-columns"></i> Loket Terpadu
          </Link>
          <Link href="/staff" className="px-3.5 py-2 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 hover:bg-amber-500/20 transition-all flex items-center gap-1.5">
            <i className="fa-solid fa-user-shield"></i> Portal Direksi
          </Link>
          <div className="flex items-center gap-2 bg-slate-900 border border-white/10 px-3.5 py-2 rounded-xl text-slate-300 font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>FiveM API Live</span>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-6xl mx-auto my-8 px-6 space-y-8">
        
        {/* Banner Utama */}
        <div className="bg-gradient-to-r from-amber-600/20 via-yellow-700/15 to-orange-500/10 border border-amber-500/30 rounded-3xl p-8 flex justify-between items-center backdrop-blur-md relative overflow-hidden">
          <div className="space-y-2 z-10">
            <span className="px-3 py-1 rounded-md text-[10px] font-black bg-amber-500/20 text-amber-300 border border-amber-500/40 uppercase">OFFICIAL SUPERCALI ROLEPLAY</span>
            <h2 className="text-3xl font-black text-white">Selamat Datang di Ekosistem Kota Supercali RP</h2>
            <p className="text-xs text-slate-300 max-w-xl leading-relaxed">
              Pantau harga komoditas pasar 24 jam, daftarkan KTP Digital IC, ajukan permohonan layanan instansi, & buka portal khusus faksi Anda.
            </p>
          </div>
          <i className="fa-solid fa-crown text-8xl text-amber-500/15 absolute right-6 pointer-events-none"></i>
        </div>

        {/* 8 Subdomain Gates Grid */}
        <div className="space-y-4">
          <h3 className="text-sm font-black text-slate-300 uppercase tracking-wider flex items-center gap-2">
            <i className="fa-solid fa-network-wired text-amber-400"></i> NAVIGASI 8 SUBDOMAIN GATE RESMI SUPERCALI RP:
          </h3>
          <div className="grid grid-cols-4 gap-4">
            <Link href="/warga" className="bg-slate-900/60 border border-emerald-500/30 p-5 rounded-2xl backdrop-blur-md hover:scale-[1.02] transition-transform group">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xl mb-3 group-hover:bg-emerald-500 group-hover:text-black transition-colors">
                <i className="fa-solid fa-address-card"></i>
              </div>
              <strong className="text-white text-sm block group-hover:text-emerald-400">warga.supercali.tech</strong>
              <span className="text-xs text-slate-400">KTP Digital IC & DMV STNK</span>
            </Link>

            <Link href="/loket" className="bg-slate-900/60 border border-cyan-500/30 p-5 rounded-2xl backdrop-blur-md hover:scale-[1.02] transition-transform group">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-xl mb-3 group-hover:bg-cyan-500 group-hover:text-black transition-colors">
                <i className="fa-solid fa-building-columns"></i>
              </div>
              <strong className="text-white text-sm block group-hover:text-cyan-400">loket.supercali.tech</strong>
              <span className="text-xs text-slate-400">Loket 6 Faksi & Apply Job</span>
            </Link>

            <Link href="/staff" className="bg-slate-900/60 border border-amber-500/30 p-5 rounded-2xl backdrop-blur-md hover:scale-[1.02] transition-transform group">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center text-xl mb-3 group-hover:bg-amber-500 group-hover:text-black transition-colors">
                <i className="fa-solid fa-user-shield"></i>
              </div>
              <strong className="text-white text-sm block group-hover:text-amber-400">staff.supercali.tech</strong>
              <span className="text-xs text-slate-400">Console Direksi & SOP Tariff</span>
            </Link>

            <Link href="/scvp" className="bg-slate-900/60 border border-blue-500/30 p-5 rounded-2xl backdrop-blur-md hover:scale-[1.02] transition-transform group">
              <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center text-xl mb-3 group-hover:bg-blue-500 group-hover:text-white transition-colors">
                <i className="fa-solid fa-shield-halved"></i>
              </div>
              <strong className="text-white text-sm block group-hover:text-blue-400">scvp.supercali.tech</strong>
              <span className="text-xs text-slate-400">Vibe Patrol Police Gate</span>
            </Link>

            <Link href="/arcane" className="bg-slate-900/60 border border-red-500/30 p-5 rounded-2xl backdrop-blur-md hover:scale-[1.02] transition-transform group">
              <div className="w-10 h-10 rounded-xl bg-red-500/20 text-red-400 flex items-center justify-center text-xl mb-3 group-hover:bg-red-500 group-hover:text-white transition-colors">
                <i className="fa-solid fa-hospital"></i>
              </div>
              <strong className="text-white text-sm block group-hover:text-red-400">arcane.supercali.tech</strong>
              <span className="text-xs text-slate-400">Arcane Rescue EMS SAFD</span>
            </Link>

            <Link href="/ultraspeed" className="bg-slate-900/60 border border-orange-500/30 p-5 rounded-2xl backdrop-blur-md hover:scale-[1.02] transition-transform group">
              <div className="w-10 h-10 rounded-xl bg-orange-500/20 text-orange-400 flex items-center justify-center text-xl mb-3 group-hover:bg-orange-500 group-hover:text-black transition-colors">
                <i className="fa-solid fa-gauge-high"></i>
              </div>
              <strong className="text-white text-sm block group-hover:text-orange-400">ultraspeed.supercali.tech</strong>
              <span className="text-xs text-slate-400">UltraSpeed Mechanic Gate</span>
            </Link>

            <Link href="/kenclub" className="bg-slate-900/60 border border-pink-500/30 p-5 rounded-2xl backdrop-blur-md hover:scale-[1.02] transition-transform group">
              <div className="w-10 h-10 rounded-xl bg-pink-500/20 text-pink-400 flex items-center justify-center text-xl mb-3 group-hover:bg-pink-500 group-hover:text-white transition-colors">
                <i className="fa-solid fa-martini-glass-citrus"></i>
              </div>
              <strong className="text-white text-sm block group-hover:text-pink-400">kenclub.supercali.tech</strong>
              <span className="text-xs text-slate-400">KenClub VIP Nightlife</span>
            </Link>

            <Link href="/gemilangjaya" className="bg-slate-900/60 border border-amber-500/30 p-5 rounded-2xl backdrop-blur-md hover:scale-[1.02] transition-transform group">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center text-xl mb-3 group-hover:bg-amber-500 group-hover:text-black transition-colors">
                <i className="fa-solid fa-gem"></i>
              </div>
              <strong className="text-white text-sm block group-hover:text-amber-400">gemilangjaya.supercali.tech</strong>
              <span className="text-xs text-slate-400">Gemilang Auto & BattlePass</span>
            </Link>
          </div>
        </div>


        {/* Live Market Commodities Table ($5 - $45 Low-Pay Model) */}
        <div className="bg-slate-900/60 border border-white/10 rounded-3xl p-8 backdrop-blur-md shadow-2xl space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-black text-white flex items-center gap-2">
                <i className="fa-solid fa-chart-candlestick text-amber-400"></i> PASAR KOMODITAS RESMI KOTA 24 JAM
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">Model Ekonomi Low-Pay Supercali RP ($5 - $45 Target Payout Per Pekerjaan)</p>
            </div>
            <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-xl border border-emerald-500/30">
              ● SYNC OXMYSQL LIVE
            </span>
          </div>

          {loading ? (
            <div className="text-center py-8 text-slate-400 text-xs animate-pulse">Mengambil Data Live Ekonomi Supercali RP...</div>
          ) : (
            <div className="grid grid-cols-3 gap-4">
              {economyData?.commodities?.map((c, i) => (
                <div key={i} className="bg-black/40 border border-white/10 rounded-2xl p-5 space-y-3">
                  <div className="flex justify-between items-center border-b border-white/10 pb-2">
                    <strong className="text-sm text-white font-bold">{c.item_label || c.item_name}</strong>
                    <span className="text-xs font-mono font-black text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-md">${c.price}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs text-slate-400">
                    <span>Depot Jual:</span>
                    <span className="text-white font-medium">{c.depot_location || 'City Depot'}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
