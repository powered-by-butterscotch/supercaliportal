'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function WargaPage() {
  const [activeTab, setActiveTab] = useState('ktp');
  const [ktpSuccess, setKtpSuccess] = useState(false);
  const [vehSuccess, setVehSuccess] = useState(false);

  return (
    <div className="min-h-screen">
      {/* Header Khusus Citizen Gate / Portal Warga */}
      <header className="sticky top-0 z-50 px-8 py-4 flex justify-between items-center bg-[#060812]/85 backdrop-blur-md border-b border-emerald-500/30">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 bg-gradient-to-br from-emerald-500 to-teal-700 rounded-xl flex items-center justify-center text-xl shadow-lg shadow-emerald-500/30 text-white">
            <i className="fa-solid fa-address-card"></i>
          </div>
          <div>
            <h1 className="text-xl font-black text-emerald-400">
              SUPERCALI CITIZEN PORTAL
            </h1>
            <p className="text-xs text-slate-400 font-medium">Portal Kependudukan Digital, DMV & Hak Warga Sipil</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Link href="/" className="text-xs font-bold text-slate-400 hover:text-white transition-colors">
            ← City Hub
          </Link>
          <Link href="/loket" className="text-xs font-bold text-cyan-400 hover:underline">
            Loket Terpadu
          </Link>
          <div className="flex items-center gap-2.5 bg-emerald-500/10 border border-emerald-500/30 px-4 py-2 rounded-full text-xs font-bold text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Layanan Sipil Terintegrasi</span>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto my-9 px-6 space-y-6">
        <div className="bg-gradient-to-r from-emerald-600/20 via-teal-700/15 to-cyan-500/10 border border-emerald-500/30 rounded-3xl p-7 flex justify-between items-center backdrop-blur-md">
          <div>
            <span className="px-3 py-1 rounded-md text-[10px] font-black bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 uppercase">PORTAL SIPIL WARGA KOTA</span>
            <h2 className="text-2xl font-black text-white mt-1">Selamat Datang di Portal Kependudukan Supercali RP</h2>
            <p className="text-xs text-slate-400 mt-1">Registrasi KTP Digital IC, pendaftaran STNK DMV Kendaraan, & Panduan Karir Pekerjaan Sipil.</p>
          </div>
          <i className="fa-solid fa-passport text-4xl text-emerald-400/80"></i>
        </div>

        {/* Tab Selector Warga */}
        <div className="flex gap-2 bg-white/5 p-1.5 rounded-2xl border border-white/10 w-fit">
          <button
            onClick={() => setActiveTab('ktp')}
            className={`px-5 py-2.5 rounded-xl text-xs font-extrabold transition-all flex items-center gap-2 ${activeTab === 'ktp' ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/30' : 'text-slate-400 hover:text-white'}`}
          >
            <i className="fa-solid fa-id-card"></i> KTP Digital IC
          </button>
          <button
            onClick={() => setActiveTab('dmv')}
            className={`px-5 py-2.5 rounded-xl text-xs font-extrabold transition-all flex items-center gap-2 ${activeTab === 'dmv' ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/30' : 'text-slate-400 hover:text-white'}`}
          >
            <i className="fa-solid fa-car"></i> Registrasi DMV & STNK
          </button>
          <button
            onClick={() => setActiveTab('jobs')}
            className={`px-5 py-2.5 rounded-xl text-xs font-extrabold transition-all flex items-center gap-2 ${activeTab === 'jobs' ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/30' : 'text-slate-400 hover:text-white'}`}
          >
            <i className="fa-solid fa-briefcase"></i> Info Karir Sipil
          </button>
        </div>

        {/* TAB 1: REGISTRASI KTP DIGITAL IC */}
        {activeTab === 'ktp' && (
          <div className="bg-slate-900/60 border border-white/10 rounded-3xl p-8 backdrop-blur-md shadow-2xl space-y-6">
            <h3 className="text-lg font-black text-emerald-400 flex items-center gap-2">
              <i className="fa-solid fa-address-card"></i> Formulir Registrasi KTP Digital & Passport IC
            </h3>
            <form onSubmit={(e) => { e.preventDefault(); setKtpSuccess(true); }} className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase">Nama Lengkap Karakter (IC)</label>
                  <input type="text" placeholder="Contoh: Kenxzo Kenxzo" required className="w-full bg-black/40 border border-white/10 rounded-xl p-3.5 mt-1.5 text-white text-sm focus:border-emerald-500 outline-none" />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase">Citizen ID (CID)</label>
                  <input type="text" placeholder="Contoh: USL99211" required className="w-full bg-black/40 border border-white/10 rounded-xl p-3.5 mt-1.5 text-white text-sm focus:border-emerald-500 outline-none" />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase">Tanggal Lahir IC</label>
                  <input type="date" required className="w-full bg-black/40 border border-white/10 rounded-xl p-3.5 mt-1.5 text-white text-sm focus:border-emerald-500 outline-none" />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase">Jenis Kelamin Karakter</label>
                  <select className="w-full bg-black/40 border border-white/10 rounded-xl p-3.5 mt-1.5 text-white text-sm focus:border-emerald-500 outline-none">
                    <option>Laki-laki (Male)</option>
                    <option>Perempuan (Female)</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase">Pekerjaan Utama IC</label>
                  <input type="text" placeholder="Contoh: Penambang / Paramedis SAFD" required className="w-full bg-black/40 border border-white/10 rounded-xl p-3.5 mt-1.5 text-white text-sm focus:border-emerald-500 outline-none" />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase">Nomor Telepon IC</label>
                  <input type="text" placeholder="Contoh: 0812-9988-1234" required className="w-full bg-black/40 border border-white/10 rounded-xl p-3.5 mt-1.5 text-white text-sm focus:border-emerald-500 outline-none" />
                </div>
              </div>
              <button type="submit" className="w-full bg-gradient-to-r from-emerald-500 to-teal-700 text-black font-black p-4 rounded-xl shadow-lg shadow-emerald-500/30 hover:scale-[1.01] transition-transform">
                Terbitkan KTP Digital IC Warga
              </button>
            </form>

            {ktpSuccess && (
              <div className="p-4 bg-emerald-500/15 border border-emerald-500/30 rounded-2xl flex items-center gap-4 text-emerald-400">
                <i className="fa-solid fa-circle-check text-2xl"></i>
                <div>
                  <strong className="text-white">KTP Digital Terdaftar di Database Kota & Tablet sc-pad!</strong>
                  <p className="text-xs mt-0.5">Identitas resmi Anda telah aktif di seluruh instansi kepolisian & medis.</p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: REGISTRASI DMV & STNK */}
        {activeTab === 'dmv' && (
          <div className="bg-slate-900/60 border border-white/10 rounded-3xl p-8 backdrop-blur-md shadow-2xl space-y-6">
            <h3 className="text-lg font-black text-emerald-400 flex items-center gap-2">
              <i className="fa-solid fa-car"></i> Registrasi Kendaraan Pribadi & DMV STNK
            </h3>
            <form onSubmit={(e) => { e.preventDefault(); setVehSuccess(true); }} className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase">Nama Pemilik Kendaraan</label>
                  <input type="text" placeholder="Nama IC Anda" required className="w-full bg-black/40 border border-white/10 rounded-xl p-3.5 mt-1.5 text-white text-sm focus:border-emerald-500 outline-none" />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase">Citizen ID (CID)</label>
                  <input type="text" placeholder="Contoh: USL99211" required className="w-full bg-black/40 border border-white/10 rounded-xl p-3.5 mt-1.5 text-white text-sm focus:border-emerald-500 outline-none" />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase">Merk & Model Kendaraan</label>
                  <input type="text" placeholder="Contoh: Sultan RS / Elegy RH8" required className="w-full bg-black/40 border border-white/10 rounded-xl p-3.5 mt-1.5 text-white text-sm focus:border-emerald-500 outline-none" />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase">Nomor Plat Kendaraan</label>
                  <input type="text" placeholder="Contoh: SC 9921" required className="w-full bg-black/40 border border-white/10 rounded-xl p-3.5 mt-1.5 text-white text-sm focus:border-emerald-500 outline-none" />
                </div>
              </div>
              <button type="submit" className="w-full bg-gradient-to-r from-emerald-500 to-teal-700 text-black font-black p-4 rounded-xl shadow-lg shadow-emerald-500/30 hover:scale-[1.01] transition-transform">
                Registrasi STNK Kendaraan DMV
              </button>
            </form>

            {vehSuccess && (
              <div className="p-4 bg-emerald-500/15 border border-emerald-500/30 rounded-2xl flex items-center gap-4 text-emerald-400">
                <i className="fa-solid fa-circle-check text-2xl"></i>
                <div>
                  <strong className="text-white">STNK Kendaraan Berhasil Terdaftar di Database DMV SCVP!</strong>
                  <p className="text-xs mt-0.5">Plat nomor Anda telah terverifikasi aman dari razia kepolisian.</p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: INFO KARIR SIPIL */}
        {activeTab === 'jobs' && (
          <div className="grid grid-cols-2 gap-5">
            <div className="bg-slate-900/60 border border-white/10 rounded-3xl p-6 backdrop-blur-md space-y-3">
              <div className="w-10 h-10 bg-amber-500/20 text-amber-400 rounded-xl flex items-center justify-center text-xl font-bold">
                <i className="fa-solid fa-[#000] fa-pickaxe"></i> ⛏️
              </div>
              <h4 className="text-base font-black text-white">Tambang Emas (Gold Nugget)</h4>
              <p className="text-xs text-slate-400 leading-relaxed">Lokasi penambangan emas murni di Pegunungan Ron Alternates. Harga jual teruntung di Paleto Bay Depot ($42 / item).</p>
            </div>
            <div className="bg-slate-900/60 border border-white/10 rounded-3xl p-6 backdrop-blur-md space-y-3">
              <div className="w-10 h-10 bg-emerald-500/20 text-emerald-400 rounded-xl flex items-center justify-center text-xl font-bold">
                🌲
              </div>
              <h4 className="text-base font-black text-white">Perkayuan (Processed Wood)</h4>
              <p className="text-xs text-slate-400 leading-relaxed">Penebangan & pengolahan kayu olahan di Hutan Paleto. Harga jual teruntung di Industrial Los Santos ($15 / item).</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
