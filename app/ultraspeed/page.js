'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function UltraSpeedPage() {
  const [activeFormType, setActiveFormType] = useState('service');
  const [formSuccess, setFormSuccess] = useState(false);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setFormSuccess(true);
    setTimeout(() => setFormSuccess(false), 8000);
  };

  return (
    <div className="min-h-screen bg-[#060812] text-slate-100 font-sans pb-16">
      {/* Header Khusus UltraSpeed Mechanic Gate */}
      <header className="sticky top-0 z-50 px-8 py-4 flex justify-between items-center bg-[#060812]/85 backdrop-blur-md border-b border-amber-500/30">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 bg-gradient-to-br from-amber-500 to-orange-700 rounded-xl flex items-center justify-center text-xl shadow-lg shadow-amber-500/30 text-white font-black">
            🔧
          </div>
          <div>
            <h1 className="text-xl font-black bg-gradient-to-r from-amber-300 via-yellow-300 to-orange-300 bg-clip-text text-transparent">
              ULTRASPEED MECHANIC PORTAL ✨
            </h1>
            <p className="text-xs text-slate-400 font-medium">Official Mechanic Shop, Modif Auto Ganteng & Towing Gate</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Link href="/" className="text-xs font-bold text-slate-400 hover:text-white transition-colors">
            ← City Hub
          </Link>
          <Link href="/gemilangjaya" className="text-xs font-bold text-amber-300 hover:underline">
            💎 Gemilang Jaya
          </Link>
          <div className="flex items-center gap-2.5 bg-amber-500/10 border border-amber-500/30 px-4 py-2 rounded-full text-xs font-bold text-amber-400">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
            <span>Pit-Stop On-Duty 24/7</span>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto my-9 px-6 space-y-6">
        <div className="bg-gradient-to-r from-amber-600/20 via-orange-700/15 to-yellow-500/10 border border-amber-500/30 rounded-3xl p-7 flex justify-between items-center backdrop-blur-md">
          <div>
            <span className="px-3 py-1 rounded-md text-[10px] font-black bg-amber-500/20 text-amber-300 border border-amber-500/40 uppercase">ULTRASPEED MECHANIC 🏎️</span>
            <h2 className="text-2xl font-black text-white mt-1">Portal Modif Auto Ganteng & Towing Service ✨</h2>
            <p className="text-xs text-slate-300 mt-1">Booking tune-up mesin, upgrade modif bodykit, panggilan derek towing, & apply Mekanik Whitelist satset brodie!</p>
          </div>
          <i className="fa-solid fa-wrench text-4xl text-amber-400/80"></i>
        </div>

        {/* Form Type Switcher */}
        <div className="flex gap-2 bg-white/5 p-1.5 rounded-2xl border border-white/10 w-fit">
          <button
            onClick={() => setActiveFormType('service')}
            className={`px-5 py-2.5 rounded-xl text-xs font-extrabold transition-all flex items-center gap-2 ${activeFormType === 'service' ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/30' : 'text-slate-400 hover:text-white'}`}
          >
            🚗 Modif / Service Booking
          </button>
          <button
            onClick={() => setActiveFormType('towing')}
            className={`px-5 py-2.5 rounded-xl text-xs font-extrabold transition-all flex items-center gap-2 ${activeFormType === 'towing' ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/30' : 'text-slate-400 hover:text-white'}`}
          >
            🚨 Emergency Towing Call
          </button>
        </div>

        <div className="bg-slate-900/60 border border-white/10 rounded-3xl p-8 backdrop-blur-md shadow-2xl space-y-6">
          <h3 className="text-lg font-black text-amber-400 flex items-center gap-2">
            ⚙️ {activeFormType === 'service' ? 'Booking Servis / Tuning VIP Ride' : 'Panggilan Towing Derek Darurat'}
          </h3>

          <form onSubmit={handleFormSubmit} className="space-y-5 text-xs">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-slate-400 font-bold uppercase">Nama Pemilik Ride (IC)</label>
                <input type="text" placeholder="Nama IC Kamu" required className="w-full bg-black/40 border border-white/10 rounded-xl p-3.5 mt-1.5 text-white text-sm focus:border-amber-400 outline-none" />
              </div>
              <div>
                <label className="text-slate-400 font-bold uppercase">Model Ride / Plat Mobil</label>
                <input type="text" placeholder="Contoh: g632019 / SC 9912" required className="w-full bg-black/40 border border-white/10 rounded-xl p-3.5 mt-1.5 text-white text-sm focus:border-amber-400 outline-none" />
              </div>
            </div>

            <div>
              <label className="text-slate-400 font-bold uppercase">Detail Upgrade / Lokasi Mogok</label>
              <textarea rows="4" placeholder="Ceritain detail modif yang kamu mau atau lokasi mogoknya brodie..." required className="w-full bg-black/40 border border-white/10 rounded-xl p-3.5 mt-1.5 text-white text-sm focus:border-amber-400 outline-none"></textarea>
            </div>

            <button type="submit" className="w-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-slate-950 font-black p-4 rounded-xl shadow-lg shadow-amber-500/30 transition-transform text-sm">
              🏎️ KIRIM REQUEST MEKANIK SATSET!
            </button>
          </form>

          {formSuccess && (
            <div className="p-4 rounded-2xl bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-bold">
              ✨ SLAYYY! Request servis / derek towing berhasil terkirim ke pit-stop UltraSpeed. Mekanik meluncur real no fake!
            </div>
          )}
        </div>

      </main>
    </div>
  );
}
