'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function SCVPPage() {
  const [reportSuccess, setReportSuccess] = useState(false);

  return (
    <div className="min-h-screen">
      {/* Header Khusus Police SCVP Gate */}
      <header className="sticky top-0 z-50 px-8 py-4 flex justify-between items-center bg-[#060812]/85 backdrop-blur-md border-b border-blue-500/30">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 bg-gradient-to-br from-blue-600 to-indigo-800 rounded-xl flex items-center justify-center text-xl shadow-lg shadow-blue-500/30 text-white">
            <i className="fa-solid fa-shield-halved"></i>
          </div>
          <div>
            <h1 className="text-xl font-black text-blue-400">
              VIBE PATROL SCVP POLICE GATE
            </h1>
            <p className="text-xs text-slate-400 font-medium">Official Police Department & Criminality Response Portal</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Link href="/" className="text-xs font-bold text-slate-400 hover:text-white transition-colors">
            ← City Hub
          </Link>
          <Link href="/loket" className="text-xs font-bold text-cyan-400 hover:underline">
            Loket Terpadu
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
            <span className="px-3 py-1 rounded-md text-[10px] font-black bg-blue-500/20 text-blue-300 border border-blue-500/40 uppercase">VIBE PATROL SCVP</span>
            <h2 className="text-2xl font-black text-white mt-1">Portal Layanan Kepolisian Resmi Supercali RP</h2>
            <p className="text-xs text-slate-400 mt-1">Laporan kejahatan darurat, uji lisensi senjata api, izin pengawalan, & pendaftaran Cadet SCVP.</p>
          </div>
          <i className="fa-solid fa-handcuffs text-4xl text-blue-400/80"></i>
        </div>

        <div className="grid grid-cols-3 gap-5">
          <div className="bg-slate-900/60 border border-white/10 rounded-2xl p-5 backdrop-blur-md">
            <div className="text-xs font-bold text-slate-400">STATUS PATROLI KOTA</div>
            <div className="text-lg font-black text-emerald-400 mt-1"><i className="fa-solid fa-shield text-sm mr-1"></i> CODE 1 - KONDUSIF</div>
          </div>
          <div className="bg-slate-900/60 border border-white/10 rounded-2xl p-5 backdrop-blur-md">
            <div className="text-xs font-bold text-slate-400">OFFICER ON-DUTY</div>
            <div className="text-lg font-black text-blue-400 mt-1"><i className="fa-solid fa-user-police text-sm mr-1"></i> 12 OFFICERS ACTIVE</div>
          </div>
          <div className="bg-slate-900/60 border border-white/10 rounded-2xl p-5 backdrop-blur-md">
            <div className="text-xs font-bold text-slate-400">REKRUTMEN CADET</div>
            <div className="text-lg font-black text-amber-400 mt-1"><i className="fa-solid fa-id-card text-sm mr-1"></i> OPEN RECRUITMENT</div>
          </div>
        </div>

        {/* Laporan Darurat Form */}
        <div className="bg-slate-900/60 border border-white/10 rounded-3xl p-8 backdrop-blur-md shadow-2xl">
          <h3 className="text-lg font-black text-blue-400 mb-6 flex items-center gap-2">
            <i className="fa-solid fa-bullhorn"></i> Formulir Pelaporan Kejahatan / Panggilan Darurat SCVP
          </h3>
          <form onSubmit={(e) => { e.preventDefault(); setReportSuccess(true); }} className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase">Nama Pelapor (IC)</label>
                <input type="text" placeholder="Nama IC Anda" required className="w-full bg-black/40 border border-white/10 rounded-xl p-3.5 mt-1.5 text-white text-sm focus:border-blue-500 outline-none" />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase">Citizen ID (CID)</label>
                <input type="text" placeholder="Contoh: USL99211" required className="w-full bg-black/40 border border-white/10 rounded-xl p-3.5 mt-1.5 text-white text-sm focus:border-blue-500 outline-none" />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase">Lokasi Kejadian (TKP)</label>
                <input type="text" placeholder="Contoh: Legion Square / Sandy Shores Bank" required className="w-full bg-black/40 border border-white/10 rounded-xl p-3.5 mt-1.5 text-white text-sm focus:border-blue-500 outline-none" />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase">Jenis Kejadian</label>
                <select className="w-full bg-black/40 border border-white/10 rounded-xl p-3.5 mt-1.5 text-white text-sm focus:border-blue-500 outline-none">
                  <option>🚨 Perampokan / Pencurian</option>
                  <option>💥 Penembakan / Penganiayaan</option>
                  <option>🚗 Kecelakaan Balap Liar</option>
                  <option>🔫 Pelanggaran Senjata Api</option>
                </select>
              </div>
              <div className="col-span-2">
                <label className="text-xs font-bold text-slate-400 uppercase">Kronologi Kejadian RP</label>
                <textarea placeholder="Ceritakan kronologi singkat kejadian..." required className="w-full bg-black/40 border border-white/10 rounded-xl p-3.5 mt-1.5 text-white text-sm focus:border-blue-500 outline-none h-24"></textarea>
              </div>
            </div>
            <button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-indigo-800 text-white font-extrabold p-4 rounded-xl shadow-lg shadow-blue-500/30 hover:scale-[1.01] transition-transform">
              Kirim Laporan Darurat ke Dispatch SCVP
            </button>
          </form>

          {reportSuccess && (
            <div className="mt-5 p-4 bg-emerald-500/15 border border-emerald-500/30 rounded-2xl flex items-center gap-4 text-emerald-400">
              <i className="fa-solid fa-circle-check text-2xl"></i>
              <div>
                <strong className="text-white">Laporan Berhasil Diteruskan ke Dispatch SCVP Discord & Game Tablet!</strong>
                <p className="text-xs mt-0.5">Officer terdekat akan merespon panggilan Anda secepatnya.</p>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
