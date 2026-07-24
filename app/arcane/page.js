'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ArcanePage() {
  const [medSuccess, setMedSuccess] = useState(false);

  return (
    <div className="min-h-screen">
      {/* Header Khusus Arcane EMS Gate */}
      <header className="sticky top-0 z-50 px-8 py-4 flex justify-between items-center bg-[#060812]/85 backdrop-blur-md border-b border-red-500/30">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 bg-gradient-to-br from-red-500 to-rose-700 rounded-xl flex items-center justify-center text-xl shadow-lg shadow-red-500/30 text-white">
            <i className="fa-solid fa-hospital"></i>
          </div>
          <div>
            <h1 className="text-xl font-black text-red-400">
              ARCANE RESCUE CENTER (SAFD EMS)
            </h1>
            <p className="text-xs text-slate-400 font-medium">Official Medical Response & Hospital Care Portal</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Link href="/" className="text-xs font-bold text-slate-400 hover:text-white transition-colors">
            ← City Hub
          </Link>
          <Link href="/loket" className="text-xs font-bold text-cyan-400 hover:underline">
            Loket Terpadu
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
            <span className="px-3 py-1 rounded-md text-[10px] font-black bg-red-500/20 text-red-300 border border-red-500/40 uppercase">ARCANE RESCUE CENTER</span>
            <h2 className="text-2xl font-black text-white mt-1">Portal Layanan Medis & Janji Temu SAFD Dokter</h2>
            <p className="text-xs text-slate-400 mt-1">Konsultasi dokter spesialis, penerbitan Surat Keterangan Sehat/Jiwa, & pendaftaran Paramedis SAFD.</p>
          </div>
          <i className="fa-solid fa-user-doctor text-4xl text-red-400/80"></i>
        </div>

        {/* Form Pendaftaran Medis */}
        <div className="bg-slate-900/60 border border-white/10 rounded-3xl p-8 backdrop-blur-md shadow-2xl">
          <h3 className="text-lg font-black text-red-400 mb-6 flex items-center gap-2">
            <i className="fa-solid fa-calendar-check"></i> Form Pendaftaran Konsultasi & Janji Temu Dokter SAFD
          </h3>
          <form onSubmit={(e) => { e.preventDefault(); setMedSuccess(true); }} className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase">Nama Pasien (IC)</label>
                <input type="text" placeholder="Nama IC Anda" required className="w-full bg-black/40 border border-white/10 rounded-xl p-3.5 mt-1.5 text-white text-sm focus:border-red-500 outline-none" />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase">Citizen ID (CID)</label>
                <input type="text" placeholder="Contoh: USL99211" required className="w-full bg-black/40 border border-white/10 rounded-xl p-3.5 mt-1.5 text-white text-sm focus:border-red-500 outline-none" />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase">Dokter Tujuan</label>
                <select className="w-full bg-black/40 border border-white/10 rounded-xl p-3.5 mt-1.5 text-white text-sm focus:border-red-500 outline-none">
                  <option>Dr. Amara (Chief Medical SAFD)</option>
                  <option>Dr. Budi (Bedah & Trauma Center)</option>
                  <option>Dr. Siti (Psikiater & Kesehatan Jiwa)</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase">Tanggal & Jam Periksa RP</label>
                <input type="datetime-local" required className="w-full bg-black/40 border border-white/10 rounded-xl p-3.5 mt-1.5 text-white text-sm focus:border-red-500 outline-none" />
              </div>
              <div className="col-span-2">
                <label className="text-xs font-bold text-slate-400 uppercase">Keluhan Penyakit / Alasan Periksa</label>
                <textarea placeholder="Tuliskan keluhan penyakit atau alasan konsultasi..." required className="w-full bg-black/40 border border-white/10 rounded-xl p-3.5 mt-1.5 text-white text-sm focus:border-red-500 outline-none h-24"></textarea>
              </div>
            </div>
            <button type="submit" className="w-full bg-gradient-to-r from-red-500 to-rose-700 text-white font-extrabold p-4 rounded-xl shadow-lg shadow-red-500/30 hover:scale-[1.01] transition-transform">
              Kirim Pendaftaran ke Arcane Rescue Center
            </button>
          </form>

          {medSuccess && (
            <div className="mt-5 p-4 bg-emerald-500/15 border border-emerald-500/30 rounded-2xl flex items-center gap-4 text-emerald-400">
              <i className="fa-solid fa-circle-check text-2xl"></i>
              <div>
                <strong className="text-white">Pendaftaran Berhasil Dikirim ke SAFD Discord & Tablet Dokter!</strong>
                <p className="text-xs mt-0.5">Dokter SAFD Jaga akan mengonfirmasi jadwal periksa Anda.</p>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
