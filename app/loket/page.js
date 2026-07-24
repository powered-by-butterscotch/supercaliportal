'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function LoketPage() {
  const [activeTab, setActiveTab] = useState('medical');
  const [medSuccess, setMedSuccess] = useState(false);
  const [docSuccess, setDocSuccess] = useState(false);
  
  const [trackCidInput, setTrackCidInput] = useState('');
  const [trackResult, setTrackResult] = useState(null);

  const handleTrackSubmit = (e) => {
    e.preventDefault();
    if (trackCidInput.trim()) {
      setTrackResult({
        cid: trackCidInput.trim().toUpperCase(),
        name: "Warga Registered",
        type: "Janji Temu Dokter SAFD & Surat Sehat",
        status: "PENDING",
        desc: "Sedang ditinjau oleh Dokter Jaga di Tablet sc-pad in-game."
      });
    }
  };

  return (
    <div className="min-h-screen">
      {/* Header Khusus Subdomain Loket & Medis */}
      <header className="sticky top-0 z-50 px-8 py-4 flex justify-between items-center bg-[#060812]/85 backdrop-blur-md border-b border-white/10">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center text-xl shadow-lg shadow-cyan-500/30">
            <i className="fa-solid fa-hospital-user"></i>
          </div>
          <div>
            <h1 className="text-xl font-black bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
              SUPERCALI PUBLIC SERVICES
            </h1>
            <p className="text-xs text-slate-400 font-medium">Official Medical Appointments & Government Licensing Portal</p>
          </div>
        </div>

        <nav className="flex gap-2 bg-white/5 p-1.5 rounded-2xl border border-white/10">
          <button 
            onClick={() => setActiveTab('medical')} 
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${activeTab === 'medical' ? 'bg-gradient-to-br from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/30' : 'text-slate-400 hover:text-white'}`}
          >
            <i className="fa-solid fa-user-doctor"></i> Janji Temu Medis
          </button>
          <button 
            onClick={() => setActiveTab('documents')} 
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${activeTab === 'documents' ? 'bg-gradient-to-br from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/30' : 'text-slate-400 hover:text-white'}`}
          >
            <i className="fa-solid fa-file-signature"></i> SC Loket Dokumen
          </button>
          <button 
            onClick={() => setActiveTab('track')} 
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${activeTab === 'track' ? 'bg-gradient-to-br from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/30' : 'text-slate-400 hover:text-white'}`}
          >
            <i className="fa-solid fa-magnifying-glass"></i> Lacak Status CID
          </button>
        </nav>

        <div className="flex items-center gap-3">
          <Link href="/staff" className="text-xs font-bold text-amber-400 hover:underline flex items-center gap-1.5">
            <i className="fa-solid fa-user-shield"></i> Portal Petugas
          </Link>
          <div className="flex items-center gap-2.5 bg-emerald-500/10 border border-emerald-500/30 px-4 py-2 rounded-full text-xs font-bold text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>SCVP & SAFD Portal Live</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto my-9 px-6">
        <div className="bg-gradient-to-r from-cyan-500/15 via-blue-600/10 to-emerald-500/10 border border-cyan-500/30 rounded-3xl p-7 flex justify-between items-center mb-8 backdrop-blur-md">
          <div>
            <h2 className="text-2xl font-black text-white">Portal Layanan Publik & Kesehatan Resmi</h2>
            <p className="text-xs text-slate-400 mt-1">Buat janji temu medis dokter SAFD/EMS, ajukan Surat Sehat, Izin Jalan Polisi (SCVP), atau Izin Usaha Pemkot.</p>
          </div>
          <i className="fa-solid fa-heart-pulse text-4xl text-cyan-400/80"></i>
        </div>

        {/* Tab Janji Temu Medis */}
        {activeTab === 'medical' && (
          <div className="bg-slate-900/60 border border-white/10 rounded-3xl p-8 backdrop-blur-md shadow-2xl">
            <h3 className="text-lg font-black text-cyan-400 mb-6 flex items-center gap-2">
              <i className="fa-solid fa-calendar-check"></i> Formulir Pendaftaran Janji Temu Medis (SAFD / EMS)
            </h3>
            <form onSubmit={(e) => { e.preventDefault(); setMedSuccess(true); }} className="space-y-6">
              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase">Nama Lengkap Karakter IC</label>
                  <input type="text" placeholder="Contoh: Kenxzo Kenxzo" required className="w-full bg-black/40 border border-white/10 rounded-xl p-3.5 mt-2 text-white text-sm focus:border-cyan-500 outline-none" />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase">Citizen ID (CID)</label>
                  <input type="text" placeholder="Contoh: USL99211" required className="w-full bg-black/40 border border-white/10 rounded-xl p-3.5 mt-2 text-white text-sm focus:border-cyan-500 outline-none" />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase">Nomor Telepon IC</label>
                  <input type="text" placeholder="Contoh: 0812-9988-1234" required className="w-full bg-black/40 border border-white/10 rounded-xl p-3.5 mt-2 text-white text-sm focus:border-cyan-500 outline-none" />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase">Dokter Tujuan</label>
                  <select className="w-full bg-black/40 border border-white/10 rounded-xl p-3.5 mt-2 text-white text-sm focus:border-cyan-500 outline-none">
                    <option value="dr_amara">Dr. Amara (Chief Medical SAFD)</option>
                    <option value="dr_budi">Dr. Budi (Dokter Umum & Bedah)</option>
                  </select>
                </div>
                <div className="col-span-2">
                  <label className="text-xs font-bold text-slate-400 uppercase">Keluhan Medis / Catatan RP</label>
                  <textarea placeholder="Tuliskan keluhan penyakit atau alasan konsultasi RP..." required className="w-full bg-black/40 border border-white/10 rounded-xl p-3.5 mt-2 text-white text-sm focus:border-cyan-500 outline-none h-24"></textarea>
                </div>
              </div>
              <button type="submit" className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-extrabold p-4 rounded-xl shadow-lg shadow-cyan-500/30 hover:scale-[1.01] transition-transform">
                Kirim Pendaftaran Janji Temu Medis
              </button>
            </form>
            {medSuccess && (
              <div className="mt-5 p-4 bg-emerald-500/15 border border-emerald-500/30 rounded-2xl flex items-center gap-4 text-emerald-400">
                <i className="fa-solid fa-circle-check text-2xl"></i>
                <div>
                  <strong className="text-white">Pendaftaran Janji Temu Berhasil Dikirim!</strong>
                  <p className="text-xs mt-0.5">Notifikasi langsung sync ke Tablet sc-pad Dokter Jaga in-game.</p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tab Loket Dokumen */}
        {activeTab === 'documents' && (
          <div className="bg-slate-900/60 border border-white/10 rounded-3xl p-8 backdrop-blur-md shadow-2xl">
            <h3 className="text-lg font-black text-amber-400 mb-6 flex items-center gap-2">
              <i className="fa-solid fa-file-contract"></i> Formulir Pengajuan Dokumen Resmi (SC Loket Digital)
            </h3>
            <form onSubmit={(e) => { e.preventDefault(); setDocSuccess(true); }} className="space-y-6">
              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase">Nama Lengkap Karakter</label>
                  <input type="text" placeholder="Nama IC Anda" required className="w-full bg-black/40 border border-white/10 rounded-xl p-3.5 mt-2 text-white text-sm focus:border-amber-500 outline-none" />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase">Citizen ID (CID)</label>
                  <input type="text" placeholder="Contoh: USL99211" required className="w-full bg-black/40 border border-white/10 rounded-xl p-3.5 mt-2 text-white text-sm focus:border-amber-500 outline-none" />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase">Tipe Dokumen / Izin Resmi</label>
                  <select className="w-full bg-black/40 border border-white/10 rounded-xl p-3.5 mt-2 text-white text-sm focus:border-amber-500 outline-none">
                    <option value="surat_sehat">🏥 Surat Keterangan Sehat (Dokter SAFD)</option>
                    <option value="izin_scvp">🚓 Izin Jalan SCVP (Vibe Patrol Police)</option>
                    <option value="izin_senjata">🔫 Pengajuan Lisensi Senjata Api Resmi</option>
                    <option value="izin_usaha">🏛️ Pengajuan Izin Usaha / Bisnis Baru (City Hall)</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase">Kontak Discord / WA</label>
                  <input type="text" placeholder="@username / 0812xxxx" required className="w-full bg-black/40 border border-white/10 rounded-xl p-3.5 mt-2 text-white text-sm focus:border-amber-500 outline-none" />
                </div>
                <div className="col-span-2">
                  <label className="text-xs font-bold text-slate-400 uppercase">Proposal / Alasan Keperluan RP</label>
                  <textarea placeholder="Jelaskan keperluan pengajuan izin atau proposal bisnis Anda..." required className="w-full bg-black/40 border border-white/10 rounded-xl p-3.5 mt-2 text-white text-sm focus:border-amber-500 outline-none h-24"></textarea>
                </div>
              </div>
              <button type="submit" className="w-full bg-gradient-to-r from-amber-500 to-amber-700 text-white font-extrabold p-4 rounded-xl shadow-lg shadow-amber-500/30 hover:scale-[1.01] transition-transform">
                Kirim Pengajuan Dokumen ke Instansi
              </button>
            </form>
            {docSuccess && (
              <div className="mt-5 p-4 bg-emerald-500/15 border border-emerald-500/30 rounded-2xl flex items-center gap-4 text-emerald-400">
                <i className="fa-solid fa-circle-check text-2xl"></i>
                <div>
                  <strong className="text-white">Pengajuan Dokumen Berhasil Dikirim!</strong>
                  <p className="text-xs mt-0.5">Staf instansi terkait sedang meninjau berkas di tablet sc-pad in-game.</p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tab Lacak Status CID */}
        {activeTab === 'track' && (
          <div className="bg-slate-900/60 border border-white/10 rounded-3xl p-8 backdrop-blur-md shadow-2xl">
            <h3 className="text-lg font-black text-blue-400 mb-6 flex items-center gap-2">
              <i className="fa-solid fa-magnifying-glass"></i> Pelacakan Status Pengajuan Dokumen & Janji Temu
            </h3>
            <form onSubmit={handleTrackSubmit} className="flex gap-3 mb-6">
              <input 
                type="text" 
                value={trackCidInput}
                onChange={(e) => setTrackCidInput(e.target.value)}
                placeholder="Masukkan Citizen ID (CID) Anda (contoh: USL99211)..." 
                required 
                className="flex-1 bg-black/40 border border-white/10 rounded-xl p-3.5 text-white text-sm focus:border-blue-500 outline-none" 
              />
              <button type="submit" className="bg-blue-600 text-white font-bold px-6 py-3.5 rounded-xl hover:bg-blue-500 transition-colors">
                Cari Status
              </button>
            </form>

            {trackResult && (
              <div className="bg-black/30 border border-white/10 rounded-2xl p-6 space-y-4">
                <div className="flex justify-between items-center border-b border-white/10 pb-3">
                  <div>
                    <span className="text-xs text-slate-500 font-semibold uppercase">CITIZEN ID (CID)</span>
                    <strong className="text-xl text-white block">{trackResult.cid}</strong>
                  </div>
                  <span className="px-3 py-1 rounded-lg text-xs font-black bg-amber-500/20 text-amber-400 border border-amber-500/40 uppercase">
                    {trackResult.status}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-slate-400 text-xs">Nama Karakter:</span>
                    <strong className="text-white block mt-0.5">{trackResult.name}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 text-xs">Jenis Layanan:</span>
                    <strong className="text-white block mt-0.5">{trackResult.type}</strong>
                  </div>
                  <div className="col-span-2">
                    <span className="text-slate-400 text-xs">Catatan Status:</span>
                    <p className="text-slate-300 text-xs mt-1">{trackResult.desc}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
