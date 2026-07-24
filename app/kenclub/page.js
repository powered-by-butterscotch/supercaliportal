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
    <div className="min-h-screen">
      {/* Header Khusus KenClub VIP Gate */}
      <header className="sticky top-0 z-50 px-8 py-4 flex justify-between items-center bg-[#060812]/85 backdrop-blur-md border-b border-pink-500/30">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 bg-gradient-to-br from-pink-500 to-purple-700 rounded-xl flex items-center justify-center text-xl shadow-lg shadow-pink-500/30 text-white">
            <i className="fa-solid fa-martini-glass-citrus"></i>
          </div>
          <div>
            <h1 className="text-xl font-black text-pink-400">
              KENCLUB VIP NIGHTLIFE GATE
            </h1>
            <p className="text-xs text-slate-400 font-medium">Official VIP Lounge, Event Venue & Nightlife Club Gate</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Link href="/" className="text-xs font-bold text-slate-400 hover:text-white transition-colors">
            ← City Hub
          </Link>
          <Link href="/loket" className="text-xs font-bold text-cyan-400 hover:underline">
            Loket Terpadu
          </Link>
          <div className="flex items-center gap-2.5 bg-pink-500/10 border border-pink-500/30 px-4 py-2 rounded-full text-xs font-bold text-pink-400">
            <span className="w-2 h-2 rounded-full bg-pink-400 animate-pulse"></span>
            <span>VIP Lounge Open Tonight</span>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto my-9 px-6 space-y-6">
        <div className="bg-gradient-to-r from-pink-600/20 via-purple-700/15 to-rose-500/10 border border-pink-500/30 rounded-3xl p-7 flex justify-between items-center backdrop-blur-md">
          <div>
            <span className="px-3 py-1 rounded-md text-[10px] font-black bg-pink-500/20 text-pink-300 border border-pink-500/40 uppercase">KENCLUB VIP NIGHTLIFE</span>
            <h2 className="text-2xl font-black text-white mt-1">Portal Resmi KenClub VIP Supercali</h2>
            <p className="text-xs text-slate-400 mt-1">Reservasi VIP Table / Lounge, sewa venue event hall, & pendaftaran Staff Entertainer / Security KenClub.</p>
          </div>
          <i className="fa-solid fa-champagne-glasses text-4xl text-pink-400/80"></i>
        </div>

        {/* Form Type Switcher */}
        <div className="flex gap-2 bg-white/5 p-1.5 rounded-2xl border border-white/10 w-fit">
          <button
            onClick={() => setActiveFormType('service')}
            className={`px-5 py-2.5 rounded-xl text-xs font-extrabold transition-all flex items-center gap-2 ${activeFormType === 'service' ? 'bg-pink-500 text-white shadow-lg shadow-pink-500/30' : 'text-slate-400 hover:text-white'}`}
          >
            <i className="fa-solid fa-concierge-bell"></i> Reservasi VIP Lounge & Event
          </button>
          <button
            onClick={() => setActiveFormType('job')}
            className={`px-5 py-2.5 rounded-xl text-xs font-extrabold transition-all flex items-center gap-2 ${activeFormType === 'job' ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-black shadow-lg shadow-amber-500/30' : 'text-slate-400 hover:text-white'}`}
          >
            <i className="fa-solid fa-briefcase"></i> Apply Job KenClub
          </button>
        </div>

        {activeFormType === 'service' ? (
          <div className="bg-slate-900/60 border border-white/10 rounded-3xl p-8 backdrop-blur-md shadow-2xl">
            <h3 className="text-lg font-black text-pink-400 mb-6 flex items-center gap-2">
              <i className="fa-solid fa-calendar-check"></i> Form Reservasi VIP Table & Venue Event KenClub
            </h3>
            <form onSubmit={handleFormSubmit} className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase">Nama Pemesan (IC)</label>
                  <input type="text" placeholder="Nama IC Anda" required className="w-full bg-black/40 border border-white/10 rounded-xl p-3.5 mt-1.5 text-white text-sm focus:border-pink-500 outline-none" />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase">Citizen ID (CID)</label>
                  <input type="text" placeholder="Contoh: USL99211" required className="w-full bg-black/40 border border-white/10 rounded-xl p-3.5 mt-1.5 text-white text-sm focus:border-pink-500 outline-none" />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase">Jenis Reservasi</label>
                  <select className="w-full bg-black/40 border border-white/10 rounded-xl p-3.5 mt-1.5 text-white text-sm focus:border-pink-500 outline-none">
                    <option>💃 Reservasi VIP Table / Sofa Lounge</option>
                    <option>🎉 Sewa Venue Main Hall untuk Private Event</option>
                    <option>🍾 Package Bottle VIP Service</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase">Tanggal & Jam Event</label>
                  <input type="datetime-local" required className="w-full bg-black/40 border border-white/10 rounded-xl p-3.5 mt-1.5 text-white text-sm focus:border-pink-500 outline-none" />
                </div>
                <div className="col-span-2">
                  <label className="text-xs font-bold text-slate-400 uppercase">Catatan Khusus / Jumlah Tamu VIP</label>
                  <textarea placeholder="Jelaskan jumlah rombongan atau request lagu/minuman khusus..." required className="w-full bg-black/40 border border-white/10 rounded-xl p-3.5 mt-1.5 text-white text-sm focus:border-pink-500 outline-none h-24"></textarea>
                </div>
              </div>
              <button type="submit" className="w-full bg-gradient-to-r from-pink-500 to-purple-700 text-white font-extrabold p-4 rounded-xl shadow-lg shadow-pink-500/30 hover:scale-[1.01] transition-transform">
                Kirim Reservasi ke Manager KenClub
              </button>
            </form>
          </div>
        ) : (
          <div className="bg-slate-900/60 border border-white/10 rounded-3xl p-8 backdrop-blur-md shadow-2xl">
            <h3 className="text-lg font-black text-pink-400 mb-6 flex items-center gap-2">
              <i className="fa-solid fa-id-card"></i> Form Pendaftaran Job Staff KenClub VIP
            </h3>
            <form onSubmit={handleFormSubmit} className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase">Nama Lengkap Karakter IC</label>
                  <input type="text" placeholder="Nama IC Anda" required className="w-full bg-black/40 border border-white/10 rounded-xl p-3.5 mt-1.5 text-white text-sm focus:border-pink-500 outline-none" />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase">Citizen ID (CID)</label>
                  <input type="text" placeholder="Contoh: USL99211" required className="w-full bg-black/40 border border-white/10 rounded-xl p-3.5 mt-1.5 text-white text-sm focus:border-pink-500 outline-none" />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase">Username Discord OOC</label>
                  <input type="text" placeholder="@username_discord" required className="w-full bg-black/40 border border-white/10 rounded-xl p-3.5 mt-1.5 text-white text-sm focus:border-pink-500 outline-none" />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase">Posisi Yang Dilamar</label>
                  <select className="w-full bg-black/40 border border-white/10 rounded-xl p-3.5 mt-1.5 text-white text-sm focus:border-pink-500 outline-none">
                    <option>💃 Dancer / Entertainer VIP KenClub</option>
                    <option>🍸 Bartender & Lounge Host</option>
                    <option>🛡️ KenClub Bouncer / Security Guard</option>
                  </select>
                </div>
                <div className="col-span-2">
                  <label className="text-xs font-bold text-slate-400 uppercase">Motivasi & Pengalaman RP Nightlife</label>
                  <textarea placeholder="Ceritakan kenapa Anda tertarik bergabung di KenClub VIP..." required className="w-full bg-black/40 border border-white/10 rounded-xl p-3.5 mt-1.5 text-white text-sm focus:border-pink-500 outline-none h-24"></textarea>
                </div>
              </div>
              <button type="submit" className="w-full bg-gradient-to-r from-pink-500 to-purple-700 text-white font-extrabold p-4 rounded-xl shadow-lg shadow-pink-500/30 hover:scale-[1.01] transition-transform">
                Kirim Lamaran ke Management KenClub VIP
              </button>
            </form>
          </div>
        )}

        {formSuccess && (
          <div className="p-4 bg-emerald-500/15 border border-emerald-500/30 rounded-2xl flex items-center gap-4 text-emerald-400">
            <i className="fa-solid fa-circle-check text-2xl"></i>
            <div>
              <strong className="text-white">Pengajuan Berhasil Dikirim ke Discord & Tablet Manager KenClub!</strong>
              <p className="text-xs mt-0.5">Management KenClub VIP akan menghubungi Anda secepatnya.</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
