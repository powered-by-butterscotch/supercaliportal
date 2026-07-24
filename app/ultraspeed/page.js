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
    <div className="min-h-screen">
      {/* Header Khusus UltraSpeed Mechanic Gate */}
      <header className="sticky top-0 z-50 px-8 py-4 flex justify-between items-center bg-[#060812]/85 backdrop-blur-md border-b border-amber-500/30">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 bg-gradient-to-br from-amber-500 to-orange-700 rounded-xl flex items-center justify-center text-xl shadow-lg shadow-amber-500/30 text-white">
            <i className="fa-solid fa-gauge-high"></i>
          </div>
          <div>
            <h1 className="text-xl font-black text-amber-400">
              ULTRASPEED MECHANIC PORTAL
            </h1>
            <p className="text-xs text-slate-400 font-medium">Official Mechanic Shop, Tuning VIP & Towing Call Gate</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Link href="/" className="text-xs font-bold text-slate-400 hover:text-white transition-colors">
            ← City Hub
          </Link>
          <Link href="/loket" className="text-xs font-bold text-cyan-400 hover:underline">
            Loket Terpadu
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
            <span className="px-3 py-1 rounded-md text-[10px] font-black bg-amber-500/20 text-amber-300 border border-amber-500/40 uppercase">ULTRASPEED MECHANIC</span>
            <h2 className="text-2xl font-black text-white mt-1">Portal Resmi Bengkel & Modifikasi UltraSpeed</h2>
            <p className="text-xs text-slate-400 mt-1">Booking servis mesin, tuning VIP, panggilan towing derek, & pendaftaran Mekanik Whitelist.</p>
          </div>
          <i className="fa-solid fa-wrench text-4xl text-amber-400/80"></i>
        </div>

        {/* Form Type Switcher */}
        <div className="flex gap-2 bg-white/5 p-1.5 rounded-2xl border border-white/10 w-fit">
          <button
            onClick={() => setActiveFormType('service')}
            className={`px-5 py-2.5 rounded-xl text-xs font-extrabold transition-all flex items-center gap-2 ${activeFormType === 'service' ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/30' : 'text-slate-400 hover:text-white'}`}
          >
            <i className="fa-solid fa-concierge-bell"></i> Booking Servis & Towing
          </button>
          <button
            onClick={() => setActiveFormType('job')}
            className={`px-5 py-2.5 rounded-xl text-xs font-extrabold transition-all flex items-center gap-2 ${activeFormType === 'job' ? 'bg-gradient-to-r from-amber-400 to-orange-500 text-black shadow-lg shadow-amber-500/30' : 'text-slate-400 hover:text-white'}`}
          >
            <i className="fa-solid fa-briefcase"></i> Apply Job Mekanik
          </button>
        </div>

        {activeFormType === 'service' ? (
          <div className="bg-slate-900/60 border border-white/10 rounded-3xl p-8 backdrop-blur-md shadow-2xl">
            <h3 className="text-lg font-black text-amber-400 mb-6 flex items-center gap-2">
              <i className="fa-solid fa-calendar-check"></i> Form Booking Servis & Panggilan Towing UltraSpeed
            </h3>
            <form onSubmit={handleFormSubmit} className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase">Nama Pelanggan (IC)</label>
                  <input type="text" placeholder="Nama IC Anda" required className="w-full bg-black/40 border border-white/10 rounded-xl p-3.5 mt-1.5 text-white text-sm focus:border-amber-500 outline-none" />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase">Citizen ID (CID)</label>
                  <input type="text" placeholder="Contoh: USL99211" required className="w-full bg-black/40 border border-white/10 rounded-xl p-3.5 mt-1.5 text-white text-sm focus:border-amber-500 outline-none" />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase">Jenis Kendaraan & Plat</label>
                  <input type="text" placeholder="Contoh: Elegy RH8 (Plat: SC 992)" required className="w-full bg-black/40 border border-white/10 rounded-xl p-3.5 mt-1.5 text-white text-sm focus:border-amber-500 outline-none" />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase">Jenis Layanan Requested</label>
                  <select className="w-full bg-black/40 border border-white/10 rounded-xl p-3.5 mt-1.5 text-white text-sm focus:border-amber-500 outline-none">
                    <option>🔧 Booking Servis Mesin & Tuning VIP</option>
                    <option>🛞 Panggilan Derek / Towing Darurat</option>
                    <option>🎨 Custom Repaint & Bodykit Modification</option>
                  </select>
                </div>
                <div className="col-span-2">
                  <label className="text-xs font-bold text-slate-400 uppercase">Catatan Keluhan Mesin / Catatan Modifikasi</label>
                  <textarea placeholder="Jelaskan detail kerusakan atau keinginan modifikasi..." required className="w-full bg-black/40 border border-white/10 rounded-xl p-3.5 mt-1.5 text-white text-sm focus:border-amber-500 outline-none h-24"></textarea>
                </div>
              </div>
              <button type="submit" className="w-full bg-gradient-to-r from-amber-500 to-orange-700 text-white font-extrabold p-4 rounded-xl shadow-lg shadow-amber-500/30 hover:scale-[1.01] transition-transform">
                Kirim Booking ke UltraSpeed Mechanic
              </button>
            </form>
          </div>
        ) : (
          <div className="bg-slate-900/60 border border-white/10 rounded-3xl p-8 backdrop-blur-md shadow-2xl">
            <h3 className="text-lg font-black text-amber-400 mb-6 flex items-center gap-2">
              <i className="fa-solid fa-id-card"></i> Form Pendaftaran Job Mekanik UltraSpeed
            </h3>
            <form onSubmit={handleFormSubmit} className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase">Nama Lengkap Karakter IC</label>
                  <input type="text" placeholder="Nama IC Anda" required className="w-full bg-black/40 border border-white/10 rounded-xl p-3.5 mt-1.5 text-white text-sm focus:border-amber-500 outline-none" />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase">Citizen ID (CID)</label>
                  <input type="text" placeholder="Contoh: USL99211" required className="w-full bg-black/40 border border-white/10 rounded-xl p-3.5 mt-1.5 text-white text-sm focus:border-amber-500 outline-none" />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase">Username Discord OOC</label>
                  <input type="text" placeholder="@username_discord" required className="w-full bg-black/40 border border-white/10 rounded-xl p-3.5 mt-1.5 text-white text-sm focus:border-amber-500 outline-none" />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase">Posisi Yang Dilamar</label>
                  <select className="w-full bg-black/40 border border-white/10 rounded-xl p-3.5 mt-1.5 text-white text-sm focus:border-amber-500 outline-none">
                    <option>🔧 Junior Mechanic / Towing Driver</option>
                    <option>🛞 Tuning & Modification Specialist</option>
                  </select>
                </div>
                <div className="col-span-2">
                  <label className="text-xs font-bold text-slate-400 uppercase">Pengalaman RP & Alasan Melamar</label>
                  <textarea placeholder="Ceritakan pengalaman RP Anda sebagai Mekanik..." required className="w-full bg-black/40 border border-white/10 rounded-xl p-3.5 mt-1.5 text-white text-sm focus:border-amber-500 outline-none h-24"></textarea>
                </div>
              </div>
              <button type="submit" className="w-full bg-amber-400 text-black font-black p-4 rounded-xl shadow-lg shadow-amber-500/30 hover:scale-[1.01] transition-transform">
                Kirim Lamaran ke Pengurus UltraSpeed Mechanic
              </button>
            </form>
          </div>
        )}

        {formSuccess && (
          <div className="p-4 bg-emerald-500/15 border border-emerald-500/30 rounded-2xl flex items-center gap-4 text-emerald-400">
            <i className="fa-solid fa-circle-check text-2xl"></i>
            <div>
              <strong className="text-white">Pengajuan Berhasil Dikirim ke Discord & Tablet UltraSpeed!</strong>
              <p className="text-xs mt-0.5">Staf UltraSpeed Mechanic akan memproses pengajuan Anda secepatnya.</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
