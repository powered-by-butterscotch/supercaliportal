'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function WargaPage() {
  const [discordLoggedIn, setDiscordLoggedIn] = useState(false);
  const [discordUser, setDiscordUser] = useState(null);
  
  // Citizen Registration States
  const [icName, setIcName] = useState('');
  const [cid, setCid] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('Laki-laki');
  const [job, setJob] = useState('Warga Sipil / Penambang');
  const [phone, setPhone] = useState('');

  const [registeredProfile, setRegisteredProfile] = useState(null);
  const [activeTab, setActiveTab] = useState('profile');
  const [vehSuccess, setVehSuccess] = useState(false);

  // Catch Discord OAuth2 Hash Token Redirect
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash;
      if (hash && hash.includes('access_token=')) {
        const params = new URLSearchParams(hash.substring(1));
        const accessToken = params.get('access_token');
        if (accessToken) {
          fetchDiscordUserData(accessToken);
        }
      }
    }
  }, []);

  const fetchDiscordUserData = async (token) => {
    try {
      const res = await fetch('https://discord.com/api/users/@me', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const user = await res.json();
        const discordProfile = {
          username: user.username,
          discriminator: user.discriminator || '0',
          avatarUrl: user.avatar 
            ? `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png` 
            : 'https://cdn.discordapp.com/embed/avatars/0.png',
          discordId: user.id
        };
        setDiscordUser(discordProfile);
        setDiscordLoggedIn(true);
      }
    } catch (e) {
      console.error("Gagal mengambil data Discord:", e);
    }
  };

  const handleDiscordLogin = () => {
    const clientId = process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID || '123456789012345678';
    
    // Redirect langsung ke URL Resmi Discord OAuth2 Authorization
    const currentOrigin = typeof window !== 'undefined' ? window.location.origin : 'https://warga.supercali.tech';
    const redirectUri = `${currentOrigin}/warga`;
    const discordAuthUrl = `https://discord.com/api/oauth2/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=token&scope=identify`;
    
    if (!process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID) {
      const userClientId = prompt("Masukkan Discord Client ID Application Anda dari Discord Developer Portal:", "123456789012345678");
      if (userClientId) {
        const realAuthUrl = `https://discord.com/api/oauth2/authorize?client_id=${userClientId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=token&scope=identify`;
        window.location.href = realAuthUrl;
        return;
      }
    }

    window.location.href = discordAuthUrl;
  };

  const handleRegisterCitizen = (e) => {
    e.preventDefault();
    const profile = {
      icName,
      cid: cid.toUpperCase(),
      dob,
      gender,
      job,
      phone,
      joinedDate: new Date().toLocaleDateString(),
      simStatus: 'AKTIF (SIM A & C)',
      weaponLicStatus: 'DITINJAU POLISI SCVP',
      medicalStatus: 'TERVERIFIKASI SAFD',
      citizenshipStatus: 'WARGA RESMI SUPERCALI RP'
    };
    setRegisteredProfile(profile);
  };

  return (
    <div className="min-h-screen">
      {/* Header Khusus Portal Warga */}
      <header className="sticky top-0 z-50 px-8 py-4 flex justify-between items-center bg-[#060812]/85 backdrop-blur-md border-b border-emerald-500/30">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 bg-gradient-to-br from-emerald-500 to-teal-700 rounded-xl flex items-center justify-center text-xl shadow-lg shadow-emerald-500/30 text-white">
            <i className="fa-solid fa-address-card"></i>
          </div>
          <div>
            <h1 className="text-xl font-black text-emerald-400">
              SUPERCALI CITIZEN PORTAL
            </h1>
            <p className="text-xs text-slate-400 font-medium">Portal Kependudukan Digital, Profile Warga & DMV</p>
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
            <span>Citizen Passport Active</span>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto my-9 px-6 space-y-6">
        
        {/* Banner Welcome */}
        <div className="bg-gradient-to-r from-emerald-600/20 via-teal-700/15 to-cyan-500/10 border border-emerald-500/30 rounded-3xl p-7 flex justify-between items-center backdrop-blur-md">
          <div>
            <span className="px-3 py-1 rounded-md text-[10px] font-black bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 uppercase">PORTAL SIPIL WARGA KOTA</span>
            <h2 className="text-2xl font-black text-white mt-1">KTP Digital & Profile Kependudukan Supercali RP</h2>
            <p className="text-xs text-slate-400 mt-1">Login via Discord, daftarkan identitas karakter IC Anda, & dapatkan Kartu KTP Digital Resmi Kota.</p>
          </div>
          <i className="fa-solid fa-passport text-4xl text-emerald-400/80"></i>
        </div>

        {/* CONDITION 1: BELUM LOGIN DISCORD */}
        {!discordLoggedIn && (
          <div className="bg-slate-900/60 border border-white/10 rounded-3xl p-10 backdrop-blur-md text-center max-w-lg mx-auto space-y-6 shadow-2xl">
            <div className="w-16 h-16 bg-[#5865F2]/20 border border-[#5865F2]/40 rounded-2xl mx-auto flex items-center justify-center text-3xl text-[#5865F2] shadow-lg shadow-[#5865F2]/20">
              <i className="fa-brands fa-discord"></i>
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-black text-white">Login Dengan Akun Discord Warga</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Untuk mengakses KTP Digital & Profile Kependudukan Kota Supercali RP, silakan lakukan otentikasi akun Discord Anda terlebih dahulu.
              </p>
            </div>

            <button
              onClick={handleDiscordLogin}
              className="w-full bg-[#5865F2] hover:bg-[#4752c4] text-white font-extrabold p-4 rounded-xl shadow-lg shadow-[#5865F2]/30 flex items-center justify-center gap-3 transition-transform hover:scale-[1.01]"
            >
              <i className="fa-brands fa-discord text-xl"></i> Login Dengan Discord OAuth2 (Official Redirect)
            </button>
          </div>
        )}

        {/* CONDITION 2: SUDAH LOGIN DISCORD TAPI BELUM DAFTAR IC */}
        {discordLoggedIn && !registeredProfile && (
          <div className="bg-slate-900/60 border border-white/10 rounded-3xl p-8 backdrop-blur-md shadow-2xl space-y-6">
            <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/10">
              <img src={discordUser.avatarUrl} alt="Discord Avatar" className="w-12 h-12 rounded-full border-2 border-emerald-400" />
              <div>
                <strong className="text-white text-base block">{discordUser.username}#{discordUser.discriminator}</strong>
                <span className="text-xs text-emerald-400 font-semibold">✓ Terautentikasi Discord OAuth2 Server Supercali RP</span>
              </div>
            </div>

            <h3 className="text-lg font-black text-emerald-400 flex items-center gap-2">
              <i className="fa-solid fa-file-signature"></i> Formulir Pendaftaran Biodata Karakter IC Warga Pertama Kali
            </h3>

            <form onSubmit={handleRegisterCitizen} className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase">Nama Lengkap Karakter (IC)</label>
                  <input type="text" value={icName} onChange={(e) => setIcName(e.target.value)} placeholder="Contoh: Kenxzo Kenxzo" required className="w-full bg-black/40 border border-white/10 rounded-xl p-3.5 mt-1.5 text-white text-sm focus:border-emerald-500 outline-none" />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase">Citizen ID (CID)</label>
                  <input type="text" value={cid} onChange={(e) => setCid(e.target.value)} placeholder="Contoh: USL99211" required className="w-full bg-black/40 border border-white/10 rounded-xl p-3.5 mt-1.5 text-white text-sm focus:border-emerald-500 outline-none" />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase">Tanggal Lahir IC</label>
                  <input type="date" value={dob} onChange={(e) => setDob(e.target.value)} required className="w-full bg-black/40 border border-white/10 rounded-xl p-3.5 mt-1.5 text-white text-sm focus:border-emerald-500 outline-none" />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase">Jenis Kelamin Karakter</label>
                  <select value={gender} onChange={(e) => setGender(e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-xl p-3.5 mt-1.5 text-white text-sm focus:border-emerald-500 outline-none">
                    <option value="Laki-laki">Laki-laki (Male)</option>
                    <option value="Perempuan">Perempuan (Female)</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase">Pekerjaan Utama IC</label>
                  <input type="text" value={job} onChange={(e) => setJob(e.target.value)} placeholder="Contoh: Penambang Emas / SAFD Paramedis" required className="w-full bg-black/40 border border-white/10 rounded-xl p-3.5 mt-1.5 text-white text-sm focus:border-emerald-500 outline-none" />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase">Nomor Telepon IC</label>
                  <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Contoh: 0812-9988-1234" required className="w-full bg-black/40 border border-white/10 rounded-xl p-3.5 mt-1.5 text-white text-sm focus:border-emerald-500 outline-none" />
                </div>
              </div>

              <button type="submit" className="w-full bg-gradient-to-r from-emerald-500 to-teal-700 text-black font-black p-4 rounded-xl shadow-lg shadow-emerald-500/30 hover:scale-[1.01] transition-transform">
                Terbitkan Kartu KTP Digital & Passport Warga
              </button>
            </form>
          </div>
        )}

        {/* CONDITION 3: PROFILE SUDAH TERDAFTAR (KARTU KTP DIGITAL RESMI) */}
        {registeredProfile && (
          <div className="space-y-6">
            
            {/* Tab Navigation Warga */}
            <div className="flex gap-2 bg-white/5 p-1.5 rounded-2xl border border-white/10 w-fit">
              <button
                onClick={() => setActiveTab('profile')}
                className={`px-5 py-2.5 rounded-xl text-xs font-extrabold transition-all flex items-center gap-2 ${activeTab === 'profile' ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/30' : 'text-slate-400 hover:text-white'}`}
              >
                <i className="fa-solid fa-id-card"></i> KTP Digital IC
              </button>
              <button
                onClick={() => setActiveTab('dmv')}
                className={`px-5 py-2.5 rounded-xl text-xs font-extrabold transition-all flex items-center gap-2 ${activeTab === 'dmv' ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/30' : 'text-slate-400 hover:text-white'}`}
              >
                <i className="fa-solid fa-car"></i> DMV Registrasi STNK
              </button>
            </div>

            {/* KARTU KTP DIGITAL PASSPORT DISPLAY */}
            {activeTab === 'profile' && (
              <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 border-2 border-emerald-500/40 rounded-3xl p-8 backdrop-blur-md shadow-2xl relative overflow-hidden space-y-6">
                <div className="absolute top-0 right-0 p-8 opacity-10 font-black text-8xl text-emerald-400 pointer-events-none">SUPERCALI</div>

                {/* Passport Header */}
                <div className="flex justify-between items-center border-b border-white/10 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-emerald-500/20 border border-emerald-500/40 rounded-xl flex items-center justify-center text-emerald-400 text-lg">
                      <i className="fa-solid fa-city"></i>
                    </div>
                    <div>
                      <h3 className="text-base font-black text-white tracking-wider">KARTU TANDA KEPENDUDUKAN (KTP DIGITAL)</h3>
                      <p className="text-[10px] text-emerald-400 font-mono">SUPERCALI ROLEPLAY • OFFICIAL CITIZEN PASSPORT</p>
                    </div>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-black bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 uppercase">
                    STATUS: {registeredProfile.citizenshipStatus}
                  </span>
                </div>

                {/* Passport Content Grid */}
                <div className="grid grid-cols-3 gap-6 items-center">
                  <div className="text-center space-y-2 border-r border-white/10 pr-6">
                    <img src={discordUser.avatarUrl} alt="Discord Avatar" className="w-28 h-28 rounded-2xl mx-auto border-2 border-emerald-400 object-cover shadow-lg" />
                    <div>
                      <strong className="text-white text-sm block font-extrabold">{discordUser.username}#{discordUser.discriminator}</strong>
                      <span className="text-[10px] text-slate-400 font-mono">Discord Verified Warga</span>
                    </div>
                  </div>

                  <div className="col-span-2 grid grid-cols-2 gap-4 text-xs">
                    <div>
                      <span className="text-slate-400 font-bold uppercase text-[10px]">NAMA LENGKAP KARAKTER:</span>
                      <strong className="text-white text-base block font-black mt-0.5">{registeredProfile.icName}</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 font-bold uppercase text-[10px]">CITIZEN ID (CID):</span>
                      <strong className="text-cyan-400 text-base block font-mono font-black mt-0.5">{registeredProfile.cid}</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 font-bold uppercase text-[10px]">PEKERJAAN UTAMA:</span>
                      <span className="text-amber-400 font-bold block mt-0.5">{registeredProfile.job}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 font-bold uppercase text-[10px]">NOMOR TELEPON IC:</span>
                      <span className="text-white font-mono block mt-0.5">{registeredProfile.phone}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 font-bold uppercase text-[10px]">TANGGAL LAHIR IC:</span>
                      <span className="text-white block mt-0.5">{registeredProfile.dob}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 font-bold uppercase text-[10px]">JENIS KELAMIN:</span>
                      <span className="text-white block mt-0.5">{registeredProfile.gender}</span>
                    </div>
                  </div>
                </div>

                {/* Status Lisensi & Verifikasi Instansi */}
                <div className="bg-black/50 border border-white/10 rounded-2xl p-5 grid grid-cols-3 gap-4 text-xs">
                  <div>
                    <span className="text-slate-400 text-[10px] font-bold block">STATUS SIM KENDARAAN:</span>
                    <strong className="text-emerald-400 font-bold block mt-0.5"><i className="fa-solid fa-id-card mr-1"></i> {registeredProfile.simStatus}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[10px] font-bold block">LISENSI SENJATA SCVP:</span>
                    <strong className="text-amber-400 font-bold block mt-0.5"><i className="fa-solid fa-gun mr-1"></i> {registeredProfile.weaponLicStatus}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[10px] font-bold block">SURAT SEHAT SAFD:</span>
                    <strong className="text-emerald-400 font-bold block mt-0.5"><i className="fa-solid fa-hospital mr-1"></i> {registeredProfile.medicalStatus}</strong>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-between items-center pt-2">
                  <span className="text-[10px] text-slate-400 font-mono">TERBIT SEJAK: {registeredProfile.joinedDate} • SUPERCALI RP OFFICIAL PASS</span>
                  <button onClick={() => window.print()} className="bg-emerald-500 text-black font-extrabold px-5 py-2.5 rounded-xl hover:bg-emerald-400 transition-transform">
                    🖨️ Print KTP Digital PDF
                  </button>
                </div>
              </div>
            )}

            {/* DMV VEHICLE REGISTRATION */}
            {activeTab === 'dmv' && (
              <div className="bg-slate-900/60 border border-white/10 rounded-3xl p-8 backdrop-blur-md shadow-2xl space-y-6">
                <h3 className="text-lg font-black text-emerald-400 flex items-center gap-2">
                  <i className="fa-solid fa-car"></i> Registrasi Kendaraan Pribadi DMV & STNK (Atas Nama {registeredProfile.icName})
                </h3>
                <form onSubmit={(e) => { e.preventDefault(); setVehSuccess(true); }} className="space-y-5">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-slate-400 uppercase">Nama Pemilik Kendaraan</label>
                      <input type="text" value={registeredProfile.icName} readOnly className="w-full bg-black/40 border border-white/10 rounded-xl p-3.5 mt-1.5 text-white text-sm outline-none" />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-slate-400 uppercase">Citizen ID (CID)</label>
                      <input type="text" value={registeredProfile.cid} readOnly className="w-full bg-black/40 border border-white/10 rounded-xl p-3.5 mt-1.5 text-white text-sm outline-none" />
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
          </div>
        )}

      </main>
    </div>
  );
}
