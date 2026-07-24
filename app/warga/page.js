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
    const clientId = process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID || process.env.DISCORD_CLIENT_ID || '';
    const currentOrigin = typeof window !== 'undefined' ? window.location.origin : 'https://warga.supercali.tech';
    const redirectUri = `${currentOrigin}/warga`;

    if (!clientId || clientId === '123456789012345678') {
      alert("PENTING: Set NEXT_PUBLIC_DISCORD_CLIENT_ID environment variable di hosting.");
      return;
    }

    window.location.href = `https://discord.com/oauth2/authorize?client_id=${clientId}&response_type=token&redirect_uri=${encodeURIComponent(redirectUri)}&scope=identify`;
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
      simStatus: 'AKTIF (SIM A & C SLAY)',
      weaponLicStatus: 'DITINJAU POLISI SCVP',
      medicalStatus: 'TERVERIFIKASI SAFD',
      citizenshipStatus: 'WARGA OFFICIAL SUPERCALI'
    };
    setRegisteredProfile(profile);
  };

  return (
    <div className="min-h-screen bg-[#060812] text-slate-100 font-sans pb-16">
      {/* Header Khusus Portal Warga */}
      <header className="sticky top-0 z-50 px-8 py-4 flex justify-between items-center bg-[#060812]/85 backdrop-blur-md border-b border-emerald-500/30">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 bg-gradient-to-br from-emerald-500 to-teal-700 rounded-xl flex items-center justify-center text-xl shadow-lg shadow-emerald-500/30 text-white">
            💳
          </div>
          <div>
            <h1 className="text-xl font-black bg-gradient-to-r from-emerald-300 via-teal-300 to-cyan-300 bg-clip-text text-transparent">
              SUPERCALI CITIZEN PORTAL ✨
            </h1>
            <p className="text-xs text-slate-400 font-medium">Portal Kependudukan Aesthetic, KTP Digital & STNK DMV</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Link href="/" className="text-xs font-bold text-slate-400 hover:text-white transition-colors">
            ← City Hub
          </Link>
          <Link href="/gemilangjaya" className="text-xs font-bold text-amber-300 hover:underline">
            💎 Gemilang Jaya
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
            <span className="px-3 py-1 rounded-md text-[10px] font-black bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 uppercase">PORTAL WARGA SLAY 💅</span>
            <h2 className="text-2xl font-black text-white mt-1">KTP Digital & Profile Warga Supercali RP ✨</h2>
            <p className="text-xs text-slate-300 mt-1">Login Discord, daftarkan biodata karakter IC kamu, & dapet KTP Digital super aesthetic real no fake!</p>
          </div>
          <i className="fa-solid fa-address-card text-4xl text-emerald-400/80"></i>
        </div>

        {/* CONDITION 1: BELUM LOGIN DISCORD */}
        {!discordLoggedIn && (
          <div className="bg-slate-900/60 border border-white/10 rounded-3xl p-10 backdrop-blur-md text-center max-w-lg mx-auto space-y-6 shadow-2xl">
            <div className="w-16 h-16 bg-[#5865F2]/20 border border-[#5865F2]/40 rounded-2xl mx-auto flex items-center justify-center text-3xl text-[#5865F2] shadow-lg shadow-[#5865F2]/20">
              <i className="fa-brands fa-discord"></i>
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-black text-white">Login Discord Dulu Brodie! ✨</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Buka KTP Digital & Profile IC kamu paling satset via Discord OAuth2. Safe & real no cap!
              </p>
            </div>

            <button
              onClick={handleDiscordLogin}
              className="w-full bg-[#5865F2] hover:bg-[#4752c4] text-white font-extrabold p-4 rounded-xl shadow-lg shadow-[#5865F2]/30 flex items-center justify-center gap-3 transition-transform hover:scale-[1.01]"
            >
              <i className="fa-brands fa-discord text-xl"></i> Login With Discord OAuth2
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
                <span className="text-xs text-emerald-400 font-semibold">✓ Verified Discord Warga Supercali RP</span>
              </div>
            </div>

            <h3 className="text-lg font-black text-emerald-400 flex items-center gap-2">
              📝 Form Biodata Karakter IC Warga (Satset No Ribet)
            </h3>

            <form onSubmit={handleRegisterCitizen} className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase">Nama Lengkap Karakter (IC)</label>
                  <input type="text" value={icName} onChange={(e) => setIcName(e.target.value)} placeholder="Contoh: Kenxzo Plenger" required className="w-full bg-black/40 border border-white/10 rounded-xl p-3.5 mt-1.5 text-white text-sm focus:border-emerald-500 outline-none" />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase">Citizen ID (CID)</label>
                  <input type="text" value={cid} onChange={(e) => setCid(e.target.value)} placeholder="Contoh: USL99211" required className="w-full bg-black/40 border border-white/10 rounded-xl p-3.5 mt-1.5 text-white text-sm focus:border-emerald-500 outline-none" />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase">Tanggal Lahir IC</label>
                  <input type="date" value={dob} onChange={(e) => setDob(e.target.value)} required className="w-full bg-black/40 border border-white/10 rounded-xl p-3.5 mt-1.5 text-white text-sm focus:border-emerald-500 outline-none" />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase">Gender IC</label>
                  <select value={gender} onChange={(e) => setGender(e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-xl p-3.5 mt-1.5 text-white text-sm focus:border-emerald-500 outline-none">
                    <option value="Laki-laki">Laki-laki</option>
                    <option value="Perempuan">Perempuan</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase">Nomor Telepon IC</label>
                  <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="555-0192" required className="w-full bg-black/40 border border-white/10 rounded-xl p-3.5 mt-1.5 text-white text-sm focus:border-emerald-500 outline-none" />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-400 uppercase">Pekerjaan Utama IC</label>
                <select value={job} onChange={(e) => setJob(e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-xl p-3.5 mt-1.5 text-white text-sm focus:border-emerald-500 outline-none">
                  <option value="Warga Sipil / Penambang">Warga Sipil / Penambang</option>
                  <option value="Mekanik UltraSpeed">Mekanik UltraSpeed</option>
                  <option value="Petugas Medis SAFD">Petugas Medis SAFD</option>
                  <option value="Kepolisian SCVP">Kepolisian SCVP</option>
                  <option value="Pengusaha / Pedagang">Pengusaha / Pedagang</option>
                  <option value="Executive KenClub">Executive KenClub</option>
                </select>
              </div>

              <button type="submit" className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-black p-4 rounded-xl shadow-lg shadow-emerald-500/30 transition-transform active:scale-95 text-sm">
                ✨ CETAK KTP DIGITAL SEKARANG!
              </button>
            </form>
          </div>
        )}

        {/* CONDITION 3: KTP DIGITAL RESMI WARGA */}
        {discordLoggedIn && registeredProfile && (
          <div className="space-y-6">
            
            <div className="flex gap-3 border-b border-white/10 pb-3">
              <button onClick={() => setActiveTab('profile')} className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${activeTab === 'profile' ? 'bg-emerald-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'}`}>
                💳 KTP Digital IC
              </button>
              <button onClick={() => setActiveTab('dmv')} className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${activeTab === 'dmv' ? 'bg-emerald-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'}`}>
                🚗 DMV Surat STNK Kendaraan
              </button>
            </div>

            {activeTab === 'profile' && (
              <div className="bg-gradient-to-br from-slate-900 via-teal-950/40 to-slate-900 border border-emerald-500/40 rounded-3xl p-8 backdrop-blur-xl shadow-2xl space-y-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none"></div>

                <div className="flex justify-between items-start border-b border-white/10 pb-5">
                  <div className="flex items-center gap-4">
                    <img src={discordUser.avatarUrl} alt="Avatar" className="w-16 h-16 rounded-2xl border-2 border-emerald-400 shadow-lg shadow-emerald-500/30" />
                    <div>
                      <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase">PASSPORT RESMI KOTA</span>
                      <h3 className="text-2xl font-black text-white mt-1">{registeredProfile.icName}</h3>
                      <p className="text-xs text-slate-400 font-mono">CID: {registeredProfile.cid} • {discordUser.username}</p>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] font-bold text-slate-500 uppercase block">Status Kependudukan</span>
                    <span className="text-xs font-black text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-lg border border-emerald-500/30 inline-block mt-1">
                      ✓ WARGA RESMI
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 text-xs">
                  <div className="bg-black/40 p-4 rounded-2xl border border-white/10">
                    <span className="text-slate-400 font-bold block">Tanggal Lahir:</span>
                    <span className="text-white font-mono text-sm">{registeredProfile.dob}</span>
                  </div>
                  <div className="bg-black/40 p-4 rounded-2xl border border-white/10">
                    <span className="text-slate-400 font-bold block">Gender IC:</span>
                    <span className="text-white text-sm">{registeredProfile.gender}</span>
                  </div>
                  <div className="bg-black/40 p-4 rounded-2xl border border-white/10">
                    <span className="text-slate-400 font-bold block">No. Telepon:</span>
                    <span className="text-cyan-300 font-mono text-sm">{registeredProfile.phone}</span>
                  </div>
                  <div className="bg-black/40 p-4 rounded-2xl border border-white/10">
                    <span className="text-slate-400 font-bold block">Pekerjaan Utama:</span>
                    <span className="text-amber-300 font-bold text-sm">{registeredProfile.job}</span>
                  </div>
                  <div className="bg-black/40 p-4 rounded-2xl border border-white/10">
                    <span className="text-slate-400 font-bold block">Status SIM:</span>
                    <span className="text-emerald-400 font-bold text-sm">{registeredProfile.simStatus}</span>
                  </div>
                  <div className="bg-black/40 p-4 rounded-2xl border border-white/10">
                    <span className="text-slate-400 font-bold block">Izin Senjata:</span>
                    <span className="text-purple-300 font-bold text-sm">{registeredProfile.weaponLicStatus}</span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'dmv' && (
              <div className="bg-slate-900/80 border border-white/10 rounded-3xl p-8 backdrop-blur-md shadow-2xl space-y-6">
                <h3 className="text-lg font-black text-emerald-400 flex items-center gap-2">
                  🚗 Pendaftaran DMV Surat STNK Kendaraan IC
                </h3>

                <form onSubmit={(e) => { e.preventDefault(); setVehSuccess(true); }} className="space-y-4 text-xs">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-slate-400 font-bold block mb-1">Model / Spawn Code Mobil</label>
                      <input type="text" placeholder="Contoh: g632019 / agerars" required className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-white outline-none focus:border-emerald-400" />
                    </div>
                    <div>
                      <label className="text-slate-400 font-bold block mb-1">Nomor Plat Mobil</label>
                      <input type="text" placeholder="Contoh: SC 9912" required className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-white font-mono outline-none focus:border-emerald-400" />
                    </div>
                  </div>

                  <button type="submit" className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black p-3.5 rounded-xl shadow-lg shadow-emerald-500/30 transition-transform">
                    📝 REGISTRASI STNK MOBIL SEKARANG
                  </button>
                </form>

                {vehSuccess && (
                  <div className="p-4 rounded-2xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-bold">
                    ✓ BERHASIL! Surat STNK Kendaraan berhasil didaftarkan di database DMV Kota Supercali RP!
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
