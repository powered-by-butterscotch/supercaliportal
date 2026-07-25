'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function LoketPage() {
  const [selectedDept, setSelectedDept] = useState('arcane');
  const [activeFormType, setActiveFormType] = useState('service');
  const [formSuccess, setFormSuccess] = useState(false);

  // Track Status States
  const [trackCidInput, setTrackCidInput] = useState('');
  const [trackResult, setTrackResult] = useState(null);

  const depts = [
    { id: 'arcane', name: 'Arcane Rescue Center', icon: 'fa-hospital', category: 'Medis & SAFD EMS', color: 'from-red-500 to-rose-700', badge: 'EMS SAFD' },
    { id: 'scvp', name: 'Vibe Patrol SCVP', icon: 'fa-shield-halved', category: 'Kepolisian & Patroli', color: 'from-blue-500 to-indigo-700', badge: 'POLISI' },
    { id: 'ultraspeed', name: 'UltraSpeed Mechanic', icon: 'fa-gauge-high', category: 'Bengkel & Modifikasi Super', color: 'from-amber-500 to-orange-700', badge: 'ULTRASPEED' },
    { id: 'whenthis', name: 'When-This Burgershot', icon: 'fa-burger', category: 'Restoran & Kuliner', color: 'from-yellow-500 to-amber-600', badge: 'KULINER' },
    { id: 'kenclub', name: 'KenClub VIP', icon: 'fa-martini-glass-citrus', category: 'Nightlife & Event VIP Club', color: 'from-pink-500 to-purple-700', badge: 'KENCLUB' },
    { id: 'highcouncil', name: 'High Council Pemkot', icon: 'fa-building-columns', category: 'Pemerintahan & DOJ', color: 'from-cyan-500 to-blue-700', badge: 'PEMKOT' },
  ];

  const currentDeptObj = depts.find(d => d.id === selectedDept) || depts[0];

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setFormSuccess(true);
    setTimeout(() => setFormSuccess(false), 8000);
  };

  const handleTrackSubmit = (e) => {
    e.preventDefault();
    if (trackCidInput.trim()) {
      setTrackResult({
        cid: trackCidInput.trim().toUpperCase(),
        name: "Warga Slay Registered",
        type: `Formulir ${activeFormType === 'job' ? 'Lamaran Kerja Whitelist' : 'Layanan Publik'} - ${currentDeptObj.name}`,
        status: "APPROVED FR FR",
        desc: "Berkas pengajuan kamu udah terusan ke Discord & Tablet pengurus instansi. Gak pake ribet brodie!"
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#060812] text-slate-100 font-sans pb-16">
      {/* Header Resmi */}
      <header className="sticky top-0 z-50 px-8 py-4 flex justify-between items-center bg-[#060812]/85 backdrop-blur-md border-b border-cyan-500/30">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center text-xl shadow-lg shadow-cyan-500/30 text-white font-black">
            🏛️
          </div>
          <div>
            <h1 className="text-xl font-black bg-gradient-to-r from-cyan-300 via-teal-300 to-blue-300 bg-clip-text text-transparent">
              SUPERCALI LOKET TERPADU ✨
            </h1>
            <p className="text-xs text-slate-400 font-medium">Portal Layanan Instansi, Bisnis & Apply Job Whitelist (Satset No Ribet!)</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Link href="/" className="text-xs font-bold text-slate-400 hover:text-white transition-colors">
            ← City Hub
          </Link>
          <Link href="/staff" className="text-xs font-bold text-amber-400 hover:underline flex items-center gap-1.5">
            🛡️ Console Petugas
          </Link>
        </div>
      </header>

      <main className="max-w-6xl mx-auto my-8 px-6 space-y-8">
        
        {/* Selector Instansi */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-sm font-black text-slate-300 uppercase tracking-wider flex items-center gap-2">
              <i className="fa-solid fa-list-check text-cyan-400"></i> PILIH INSTANSI / BISNIS TUJUAN (GREEN FLAG ONLY! 💅):
            </h2>
            <span className="text-xs text-cyan-400 font-bold">6 Instansi Registered</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">

            {depts.map((d) => (
              <button
                key={d.id}
                onClick={() => setSelectedDept(d.id)}
                className={`p-4 rounded-2xl border transition-all text-left flex flex-col justify-between h-32 relative overflow-hidden group ${selectedDept === d.id ? 'border-cyan-400 bg-white/10 shadow-lg shadow-cyan-500/20 scale-[1.03]' : 'border-white/10 bg-slate-900/60 hover:bg-white/5 opacity-80 hover:opacity-100'}`}
              >
                <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${d.color} flex items-center justify-center text-white text-base shadow-md`}>
                  <i className={`fa-solid ${d.icon}`}></i>
                </div>
                <div>
                  <span className="text-[10px] font-black text-cyan-400 uppercase tracking-widest block">{d.badge}</span>
                  <strong className="text-xs text-white font-extrabold block leading-tight mt-0.5 group-hover:text-cyan-300">{d.name}</strong>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Form Area */}
        <div className="bg-slate-900/80 border border-white/10 rounded-3xl p-8 backdrop-blur-md shadow-2xl space-y-6">
          <div className="flex justify-between items-center border-b border-white/10 pb-4">
            <div>
              <span className="bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase">LOKET OFFICIAL</span>
              <h3 className="text-xl font-black text-white mt-1">{currentDeptObj.name} ({currentDeptObj.category})</h3>
            </div>

            <div className="flex gap-2 bg-black/50 p-1.5 rounded-2xl border border-white/10">
              <button onClick={() => setActiveFormType('service')} className={`px-4 py-2 rounded-xl text-xs font-black transition-all ${activeFormType === 'service' ? 'bg-cyan-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'}`}>
                📝 Pengajuan Layanan
              </button>
              <button onClick={() => setActiveFormType('job')} className={`px-4 py-2 rounded-xl text-xs font-black transition-all ${activeFormType === 'job' ? 'bg-cyan-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'}`}>
                💼 Apply Job Whitelist
              </button>
            </div>
          </div>

          <form onSubmit={handleFormSubmit} className="space-y-5 text-xs">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-slate-400 font-bold block mb-1">Nama Karakter (IC)</label>
                <input type="text" placeholder="Contoh: Dimas Support" required className="w-full bg-black/50 border border-white/10 rounded-xl p-3.5 text-white outline-none focus:border-cyan-400" />
              </div>
              <div>
                <label className="text-slate-400 font-bold block mb-1">Citizen ID (CID)</label>
                <input type="text" placeholder="Contoh: USL88192" required className="w-full bg-black/50 border border-white/10 rounded-xl p-3.5 text-white font-mono outline-none focus:border-cyan-400" />
              </div>
            </div>

            <div>
              <label className="text-slate-400 font-bold block mb-1">Detail Permohonan / Alasan Melamar Job</label>
              <textarea rows="4" placeholder="Jelaskan kebutuhan permohonan atau pengalamamu brodie..." required className="w-full bg-black/50 border border-white/10 rounded-xl p-3.5 text-white outline-none focus:border-cyan-400"></textarea>
            </div>

            <button type="submit" className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-black p-4 rounded-xl shadow-lg shadow-cyan-500/30 transition-transform active:scale-95 text-sm">
              ⚡ SUBMIT BERKAS SATSET SEKARANG!
            </button>
          </form>

          {formSuccess && (
            <div className="p-4 rounded-2xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-xs font-bold">
              ✨ SLAYYY! Berkas berhasil dikirim ke tablet pengurus instansi {currentDeptObj.name}. Pantau statusnya di bawah ya brodie!
            </div>
          )}

          {/* Cek Status Pengajuan */}
          <div className="border-t border-white/10 pt-6 space-y-4">
            <h4 className="text-sm font-black text-slate-300 uppercase">🔍 Cek Status Pengajuan Berkas (Anti H2H)</h4>
            <form onSubmit={handleTrackSubmit} className="flex gap-3">
              <input
                type="text"
                value={trackCidInput}
                onChange={(e) => setTrackCidInput(e.target.value)}
                placeholder="Masukkan CID Karakter Kamu..."
                className="bg-black/50 border border-white/10 rounded-xl p-3 text-xs text-white outline-none focus:border-cyan-400 flex-1 font-mono"
              />
              <button type="submit" className="bg-cyan-500 text-slate-950 font-black px-5 py-3 rounded-xl text-xs shadow-md">
                LACAK BERKAS
              </button>
            </form>

            {trackResult && (
              <div className="bg-black/40 border border-cyan-500/30 p-4 rounded-2xl text-xs space-y-1">
                <div className="font-black text-cyan-300 flex justify-between">
                  <span>CID: {trackResult.cid}</span>
                  <span className="text-emerald-400">{trackResult.status}</span>
                </div>
                <div className="text-white font-bold">{trackResult.type}</div>
                <div className="text-slate-400">{trackResult.desc}</div>
              </div>
            )}
          </div>
        </div>

      </main>
    </div>
  );
}
