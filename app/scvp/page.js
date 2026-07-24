'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function SCVPPage() {
  const [reportSuccess, setReportSuccess] = useState(false);

  return (
    <div className="min-h-screen bg-[#060812] text-slate-100 font-sans pb-16">
      {/* Header Khusus Police SCVP Gate */}
      <header className="sticky top-0 z-50 px-8 py-4 flex justify-between items-center bg-[#060812]/85 backdrop-blur-md border-b border-blue-500/30">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 bg-gradient-to-br from-blue-600 to-indigo-800 rounded-xl flex items-center justify-center text-xl shadow-lg shadow-blue-500/30 text-white font-black">
            🚓
          </div>
          <div>
            <h1 className="text-xl font-black bg-gradient-to-r from-blue-300 via-indigo-300 to-cyan-300 bg-clip-text text-transparent">
              VIBE PATROL SCVP POLICE GATE ✨
            </h1>
            <p className="text-xs text-slate-400 font-medium">Police Department & Emergency Dispatch Portal (US x AU Duty Slay)</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Link href="/" className="text-xs font-bold text-slate-400 hover:text-white transition-colors">
            ← City Hub
          </Link>
          <Link href="/gemilangjaya" className="text-xs font-bold text-amber-300 hover:underline">
            💎 Gemilang Jaya
          </Link>
          <div className="flex items-center gap-2.5 bg-blue-500/10 border border-blue-500/30 px-4 py-2 rounded-full text-xs font-bold text-blue-400">
            <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
            <span>Dispatch On-Duty 24/7</span>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto my-9 px-6 space-y-6">
        <div className="bg-gradient-to-r from-blue-600/20 via-indigo-700/15 to-cyan-500/10 border border-blue-500/30 rounded-3xl p-7 flex justify-between items-center backdrop-blur-md">
          <div>
            <span className="px-3 py-1 rounded-md text-[10px] font-black bg-blue-500/20 text-blue-300 border border-blue-500/40 uppercase">VIBE PATROL SCVP 🚓</span>
            <h2 className="text-2xl font-black text-white mt-1">Portal Layanan Kepolisian Official ✨</h2>
            <p className="text-xs text-slate-300 mt-1">Laporan darurat TKP, pengajuan lisensi senjata api, izin pengawalan, & pendaftaran Cadet SCVP satset brodie!</p>
          </div>
          <i className="fa-solid fa-handcuffs text-4xl text-blue-400/80"></i>
        </div>

        <div className="grid grid-cols-3 gap-5 text-xs">
          <div className="bg-slate-900/60 border border-white/10 rounded-2xl p-5 backdrop-blur-md">
            <div className="text-[10px] font-black text-slate-400">STATUS PATROLI KOTA</div>
            <div className="text-base font-black text-emerald-400 mt-1">🛡️ CODE 1 - KONDUSIF SLAY</div>
          </div>
          <div className="bg-slate-900/60 border border-white/10 rounded-2xl p-5 backdrop-blur-md">
            <div className="text-[10px] font-black text-slate-400">OFFICER ON-DUTY</div>
            <div className="text-base font-black text-blue-400 mt-1">👮 12 OFFICERS ACTIVE</div>
          </div>
          <div className="bg-slate-900/60 border border-white/10 rounded-2xl p-5 backdrop-blur-md">
            <div className="text-[10px] font-black text-slate-400">REKRUTMEN CADET</div>
            <div className="text-base font-black text-amber-400 mt-1">💼 OPEN RECRUITMENT</div>
          </div>
        </div>

        {/* Laporan Darurat Form */}
        <div className="bg-slate-900/60 border border-white/10 rounded-3xl p-8 backdrop-blur-md shadow-2xl space-y-6">
          <h3 className="text-lg font-black text-blue-400 flex items-center gap-2">
            📢 Laporan Kejahatan / Panggilan Darurat SCVP (Satset Action)
          </h3>
          <form onSubmit={(e) => { e.preventDefault(); setReportSuccess(true); }} className="space-y-5 text-xs">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-slate-400 font-bold uppercase">Nama Pelapor (IC)</label>
                <input type="text" placeholder="Nama IC Kamu" required className="w-full bg-black/40 border border-white/10 rounded-xl p-3.5 mt-1.5 text-white text-sm focus:border-blue-500 outline-none" />
              </div>
              <div>
                <label className="text-slate-400 font-bold uppercase">Citizen ID (CID)</label>
                <input type="text" placeholder="Contoh: USL99211" required className="w-full bg-black/40 border border-white/10 rounded-xl p-3.5 mt-1.5 text-white text-sm focus:border-blue-500 outline-none" />
              </div>
            </div>

            <div>
              <label className="text-slate-400 font-bold uppercase">Detail Kejadian / Lokasi TKP</label>
              <textarea rows="4" placeholder="Ceritain kronologi singkatnya brodie..." required className="w-full bg-black/40 border border-white/10 rounded-xl p-3.5 mt-1.5 text-white text-sm focus:border-blue-500 outline-none"></textarea>
            </div>

            <button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-500 hover:to-indigo-600 text-white font-black p-4 rounded-xl shadow-lg shadow-blue-500/30 transition-transform text-sm">
              🚨 KIRIM LAPORAN PATROLI SATSET!
            </button>
          </form>

          {reportSuccess && (
            <div className="p-4 rounded-2xl bg-blue-500/20 text-blue-300 border border-blue-500/40 text-xs font-bold">
              ✨ SLAYYY! Laporan darurat berhasil dikirim ke Dispatcher Unit SCVP. Petugas siap meluncur ke TKP fr fr!
            </div>
          )}
        </div>

      </main>
    </div>
  );
}
