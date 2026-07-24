'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ArcanePage() {
  const [medSuccess, setMedSuccess] = useState(false);

  return (
    <div className="min-h-screen bg-[#060812] text-slate-100 font-sans pb-16">
      {/* Header Khusus Arcane EMS Gate */}
      <header className="sticky top-0 z-50 px-8 py-4 flex justify-between items-center bg-[#060812]/85 backdrop-blur-md border-b border-red-500/30">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 bg-gradient-to-br from-red-500 to-rose-700 rounded-xl flex items-center justify-center text-xl shadow-lg shadow-red-500/30 text-white font-black">
            🚑
          </div>
          <div>
            <h1 className="text-xl font-black bg-gradient-to-r from-red-300 via-rose-300 to-amber-300 bg-clip-text text-transparent">
              ARCANE RESCUE CENTER (SAFD EMS) ✨
            </h1>
            <p className="text-xs text-slate-400 font-medium">Official Medical Response & Hospital Care Portal (Real Doctor Vibes!)</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Link href="/" className="text-xs font-bold text-slate-400 hover:text-white transition-colors">
            ← City Hub
          </Link>
          <Link href="/gemilangjaya" className="text-xs font-bold text-amber-300 hover:underline">
            💎 Gemilang Jaya
          </Link>
          <div className="flex items-center gap-2.5 bg-red-500/10 border border-red-500/30 px-4 py-2 rounded-full text-xs font-bold text-red-400">
            <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse"></span>
            <span>EMS Ambulance Standby 24/7</span>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto my-9 px-6 space-y-6">
        <div className="bg-gradient-to-r from-red-600/20 via-rose-700/15 to-amber-500/10 border border-red-500/30 rounded-3xl p-7 flex justify-between items-center backdrop-blur-md">
          <div>
            <span className="px-3 py-1 rounded-md text-[10px] font-black bg-red-500/20 text-red-300 border border-red-500/40 uppercase">ARCANE EMS SAFD 💉</span>
            <h2 className="text-2xl font-black text-white mt-1">Portal Layanan Medis & Janji Temu Dokter ✨</h2>
            <p className="text-xs text-slate-300 mt-1">Konsultasi dokter spesialis, penerbitan Surat Sehat/Jiwa, & pendaftaran Paramedis SAFD satset no ribet brodie!</p>
          </div>
          <i className="fa-solid fa-user-doctor text-4xl text-red-400/80"></i>
        </div>

        {/* Form Pendaftaran Medis */}
        <div className="bg-slate-900/60 border border-white/10 rounded-3xl p-8 backdrop-blur-md shadow-2xl space-y-6">
          <h3 className="text-lg font-black text-red-400 flex items-center gap-2">
            🩺 Form Janji Temu & Konsultasi Dokter SAFD
          </h3>
          <form onSubmit={(e) => { e.preventDefault(); setMedSuccess(true); }} className="space-y-5 text-xs">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-slate-400 font-bold uppercase">Nama Pasien (IC)</label>
                <input type="text" placeholder="Nama IC Kamu" required className="w-full bg-black/40 border border-white/10 rounded-xl p-3.5 mt-1.5 text-white text-sm focus:border-red-500 outline-none" />
              </div>
              <div>
                <label className="text-slate-400 font-bold uppercase">Citizen ID (CID)</label>
                <input type="text" placeholder="Contoh: USL99211" required className="w-full bg-black/40 border border-white/10 rounded-xl p-3.5 mt-1.5 text-white text-sm focus:border-red-500 outline-none" />
              </div>
            </div>

            <div>
              <label className="text-slate-400 font-bold uppercase">Keluhan Kesehatan / Jenis Layanan</label>
              <textarea rows="4" placeholder="Ceritain keluhan kesehatan atau permohonan surat sehat kamu..." required className="w-full bg-black/40 border border-white/10 rounded-xl p-3.5 mt-1.5 text-white text-sm focus:border-red-500 outline-none"></textarea>
            </div>

            <button type="submit" className="w-full bg-gradient-to-r from-red-600 to-rose-700 hover:from-red-500 hover:to-rose-600 text-white font-black p-4 rounded-xl shadow-lg shadow-red-500/30 transition-transform text-sm">
              🏥 KIRIM JANJI TEMU MEDIS SATSET!
            </button>
          </form>

          {medSuccess && (
            <div className="p-4 rounded-2xl bg-red-500/20 text-red-300 border border-red-500/40 text-xs font-bold">
              ✨ SLAYYY! Pendaftaran janji temu medis berhasil dikirim. Dokter Arcane SAFD siap menangani kamu real no fake!
            </div>
          )}
        </div>

      </main>
    </div>
  );
}
