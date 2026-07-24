'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function KenClubPage() {
  const [activeFormType, setActiveFormType] = useState('service');
  const [formSuccess, setFormSuccess] = useState(false);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setFormSuccess(true);
    setTimeout(() => setFormSuccess(false), 8000);
  };

  return (
    <div className="min-h-screen bg-[#060812] text-slate-100 font-sans pb-16">
      {/* Header Khusus KenClub VIP Gate */}
      <header className="sticky top-0 z-50 px-8 py-4 flex justify-between items-center bg-[#060812]/85 backdrop-blur-md border-b border-pink-500/30">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 bg-gradient-to-br from-pink-500 to-purple-700 rounded-xl flex items-center justify-center text-xl shadow-lg shadow-pink-500/30 text-white font-black">
            🍸
          </div>
          <div>
            <h1 className="text-xl font-black bg-gradient-to-r from-pink-300 via-purple-300 to-rose-300 bg-clip-text text-transparent">
              KENCLUB VIP NIGHTLIFE GATE ✨
            </h1>
            <p className="text-xs text-slate-400 font-medium">Official Executive Lounge, Party Slay Venue & High-Roller Club</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Link href="/" className="text-xs font-bold text-slate-400 hover:text-white transition-colors">
            ← City Hub
          </Link>
          <Link href="/gemilangjaya" className="text-xs font-bold text-amber-300 hover:underline">
            💎 Gemilang Jaya
          </Link>
          <div className="flex items-center gap-2.5 bg-pink-500/10 border border-pink-500/30 px-4 py-2 rounded-full text-xs font-bold text-pink-400">
            <span className="w-2 h-2 rounded-full bg-pink-400 animate-pulse"></span>
            <span>VIP Party Slay Open Tonight</span>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto my-9 px-6 space-y-6">
        <div className="bg-gradient-to-r from-pink-600/20 via-purple-700/15 to-rose-500/10 border border-pink-500/30 rounded-3xl p-7 flex justify-between items-center backdrop-blur-md">
          <div>
            <span className="px-3 py-1 rounded-md text-[10px] font-black bg-pink-500/20 text-pink-300 border border-pink-500/40 uppercase">KENCLUB VIP NIGHTLIFE 🍸✨</span>
            <h2 className="text-2xl font-black text-white mt-1">Portal KenClub Executive Nightlife ✨</h2>
            <p className="text-xs text-slate-300 mt-1">Reservasi VIP Table / Lounge, sewa party venue hall, & join Staff Entertainer KenClub slay abis!</p>
          </div>
          <i className="fa-solid fa-champagne-glasses text-4xl text-pink-400/80"></i>
        </div>

        {/* Form Type Switcher */}
        <div className="flex gap-2 bg-white/5 p-1.5 rounded-2xl border border-white/10 w-fit">
          <button
            onClick={() => setActiveFormType('service')}
            className={`px-5 py-2.5 rounded-xl text-xs font-extrabold transition-all flex items-center gap-2 ${activeFormType === 'service' ? 'bg-pink-500 text-white shadow-lg shadow-pink-500/30' : 'text-slate-400 hover:text-white'}`}
          >
            🍾 Reservasi VIP Lounge
          </button>
          <button
            onClick={() => setActiveFormType('event')}
            className={`px-5 py-2.5 rounded-xl text-xs font-extrabold transition-all flex items-center gap-2 ${activeFormType === 'event' ? 'bg-pink-500 text-white shadow-lg shadow-pink-500/30' : 'text-slate-400 hover:text-white'}`}
          >
            🎉 Sewa Venue Event
          </button>
        </div>

        <div className="bg-slate-900/60 border border-white/10 rounded-3xl p-8 backdrop-blur-md shadow-2xl space-y-6">
          <h3 className="text-lg font-black text-pink-400 flex items-center gap-2">
            ✨ {activeFormType === 'service' ? 'Booking Table / VIP Lounge KenClub' : 'Form Pengajuan Party Venue Booking'}
          </h3>

          <form onSubmit={handleFormSubmit} className="space-y-5 text-xs">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-slate-400 font-bold uppercase">Nama Pemesan (IC)</label>
                <input type="text" placeholder="Nama IC Kamu" required className="w-full bg-black/40 border border-white/10 rounded-xl p-3.5 mt-1.5 text-white text-sm focus:border-pink-500 outline-none" />
              </div>
              <div>
                <label className="text-slate-400 font-bold uppercase">Citizen ID (CID)</label>
                <input type="text" placeholder="Contoh: USL99211" required className="w-full bg-black/40 border border-white/10 rounded-xl p-3.5 mt-1.5 text-white text-sm focus:border-pink-500 outline-none" />
              </div>
            </div>

            <div>
              <label className="text-slate-400 font-bold uppercase">Detail Reservasi / Party Requirements</label>
              <textarea rows="4" placeholder="Ceritain tanggal party atau jumlah tamu VIP kamu brodie..." required className="w-full bg-black/40 border border-white/10 rounded-xl p-3.5 mt-1.5 text-white text-sm focus:border-pink-500 outline-none"></textarea>
            </div>

            <button type="submit" className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-400 hover:to-purple-500 text-white font-black p-4 rounded-xl shadow-lg shadow-pink-500/30 transition-transform text-sm">
              ✨ BOOKING VIP TABLE SATSET NOW!
            </button>
          </form>

          {formSuccess && (
            <div className="p-4 rounded-2xl bg-pink-500/20 text-pink-300 border border-pink-500/40 text-xs font-bold">
              ✨ SLAYYY! Reservasi VIP Table kamu udah masuk ke manager KenClub. Get ready for party slay real no fake!
            </div>
          )}
        </div>

      </main>
    </div>
  );
}
