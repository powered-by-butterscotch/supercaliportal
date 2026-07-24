'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function LoketPage() {
  const [selectedDept, setSelectedDept] = useState('arcane'); // arcane, scvp, rizz, whenthis, vanilla, highcouncil
  const [activeFormType, setActiveFormType] = useState('service'); // 'service' (layanan) or 'job' (apply job)
  const [formSuccess, setFormSuccess] = useState(false);

  // Track Status States
  const [trackCidInput, setTrackCidInput] = useState('');
  const [trackResult, setTrackResult] = useState(null);

  const depts = [
    { id: 'arcane', name: 'Arcane Rescue Center', icon: 'fa-hospital', category: 'Medis & SAFD EMS', color: 'from-red-500 to-rose-700', badge: 'EMS SAFD' },
    { id: 'scvp', name: 'Vibe Patrol SCVP', icon: 'fa-shield-halved', category: 'Kepolisian & Patroli', color: 'from-blue-500 to-indigo-700', badge: 'POLISI' },
    { id: 'rizz', name: 'Rizz Motor', icon: 'fa-wrench', category: 'Bengkel & Modifikasi', color: 'from-amber-500 to-orange-700', badge: 'MEKANIK' },
    { id: 'whenthis', name: 'When-This Burgershot', icon: 'fa-burger', category: 'Restoran & Kuliner', color: 'from-yellow-500 to-amber-600', badge: 'KULINER' },
    { id: 'vanilla', name: 'Vanilla Unicorn', icon: 'fa-martini-glass-citrus', category: 'Nightlife & Event Club', color: 'from-pink-500 to-purple-700', badge: 'CLUB VIP' },
    { id: 'highcouncil', name: 'High Council Pemkot', icon: 'fa-building-columns', category: 'Pemerintahan & DOJ', color: 'from-cyan-500 to-blue-700', badge: 'PEMKOT' },
  ];

  const currentDeptObj = depts.find(d => d.id === selectedDept);

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
        name: "Warga Registered",
        type: `Formulir ${activeFormType === 'job' ? 'Lamaran Kerja Whitelist' : 'Layanan Publik'} - ${currentDeptObj.name}`,
        status: "PENDING",
        desc: "Berkas lamaran / pengajuan telah diteruskan ke Discord & Tablet sc-pad Pengurus Instansi."
      });
    }
  };

  return (
    <div className="min-h-screen">
      {/* Header Resmi */}
      <header className="sticky top-0 z-50 px-8 py-4 flex justify-between items-center bg-[#060812]/85 backdrop-blur-md border-b border-white/10">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center text-xl shadow-lg shadow-cyan-500/30">
            <i className="fa-solid fa-file-signature"></i>
          </div>
          <div>
            <h1 className="text-xl font-black bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
              SUPERCALI LOKET TERPADU
            </h1>
            <p className="text-xs text-slate-400 font-medium">Portal Layanan Instansi, Bisnis & Pendaftaran Job Whitelist</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Link href="/" className="text-xs font-bold text-slate-400 hover:text-white transition-colors">
            ← Kembali ke City Hub
          </Link>
          <Link href="/staff" className="text-xs font-bold text-amber-400 hover:underline flex items-center gap-1.5">
            <i className="fa-solid fa-user-shield"></i> Portal Petugas
          </Link>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-6xl mx-auto my-8 px-6 space-y-8">
        
        {/* Selector Instansi / Faction Discord Cards */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-sm font-black text-slate-300 uppercase tracking-wider">
              <i className="fa-solid fa-list-check text-cyan-400 mr-2"></i> PILIH INSTANSI / BISNIS TUJUAN (SCP GREEN FLAG):
            </h2>
            <span className="text-xs text-slate-500 font-bold">6 Instansi Official Registered</span>
          </div>

          <div className="grid grid-cols-6 gap-3">
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

        {/* Selected Department Active Banner & Form Type Switcher */}
        <div className={`bg-gradient-to-r ${currentDeptObj.color} p-0.5 rounded-3xl shadow-2xl`}>
          <div className="bg-[#060812] rounded-[23px] p-6 backdrop-blur-md">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-4">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${currentDeptObj.color} flex items-center justify-center text-2xl text-white shadow-lg`}>
                  <i className={`fa-solid ${currentDeptObj.icon}`}></i>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-md text-[10px] font-black bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 uppercase">{currentDeptObj.badge}</span>
                    <span className="text-xs text-slate-400 font-medium">{currentDeptObj.category}</span>
                  </div>
                  <h3 className="text-2xl font-black text-white mt-0.5">{currentDeptObj.name}</h3>
                </div>
              </div>

              {/* Form Type Tabs: Layanan Publik VS Apply Job Whitelist */}
              <div className="flex gap-2 bg-white/5 p-1.5 rounded-2xl border border-white/10">
                <button
                  onClick={() => setActiveFormType('service')}
                  className={`px-5 py-2.5 rounded-xl text-xs font-extrabold transition-all flex items-center gap-2 ${activeFormType === 'service' ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/30' : 'text-slate-400 hover:text-white'}`}
                >
                  <i className="fa-solid fa-concierge-bell"></i> Layanan & Dokumen RP
                </button>
                <button
                  onClick={() => setActiveFormType('job')}
                  className={`px-5 py-2.5 rounded-xl text-xs font-extrabold transition-all flex items-center gap-2 ${activeFormType === 'job' ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-black shadow-lg shadow-amber-500/30' : 'text-slate-400 hover:text-white'}`}
                >
                  <i className="fa-solid fa-briefcase"></i> Apply Job Whitelist
                </button>
              </div>
            </div>

            {/* FORM 1: LAYANAN KHUSUS INSTANSI */}
            {activeFormType === 'service' && (
              <form onSubmit={handleFormSubmit} className="space-y-5 bg-slate-900/50 p-6 rounded-2xl border border-white/10">
                <h4 className="text-sm font-black text-cyan-400 uppercase tracking-wider flex items-center gap-2">
                  <i className="fa-solid fa-file-pen"></i> Form Pengajuan Layanan — {currentDeptObj.name}
                </h4>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-400 uppercase">Nama Lengkap Karakter IC</label>
                    <input type="text" placeholder="Nama IC Anda" required className="w-full bg-black/40 border border-white/10 rounded-xl p-3.5 mt-1.5 text-white text-sm focus:border-cyan-500 outline-none" />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-400 uppercase">Citizen ID (CID)</label>
                    <input type="text" placeholder="Contoh: USL99211" required className="w-full bg-black/40 border border-white/10 rounded-xl p-3.5 mt-1.5 text-white text-sm focus:border-cyan-500 outline-none" />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-400 uppercase">Nomor Telepon IC</label>
                    <input type="text" placeholder="Contoh: 0812-9988-1234" required className="w-full bg-black/40 border border-white/10 rounded-xl p-3.5 mt-1.5 text-white text-sm focus:border-cyan-500 outline-none" />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-400 uppercase">Layanan Requested</label>
                    <select className="w-full bg-black/40 border border-white/10 rounded-xl p-3.5 mt-1.5 text-white text-sm focus:border-cyan-500 outline-none">
                      {selectedDept === 'arcane' && (
                        <>
                          <option value="janji_temu">🏥 Janji Temu Dokter Spesialis SAFD</option>
                          <option value="surat_sehat">📄 Surat Keterangan Sehat & Jiwa</option>
                        </>
                      )}
                      {selectedDept === 'scvp' && (
                        <>
                          <option value="izin_jalan">🚓 Izin Jalan & Pengawalan SCVP</option>
                          <option value="lisensi_senjata">🔫 Permohonan Uji Lisensi Senjata Api</option>
                        </>
                      )}
                      {selectedDept === 'rizz' && (
                        <>
                          <option value="booking_servis">🔧 Booking Servis Mesin & Tuning VIP</option>
                          <option value="towing_request">🛞 Panggilan Towing / Derek Mobil</option>
                        </>
                      )}
                      {selectedDept === 'whenthis' && (
                        <>
                          <option value="catering">🍔 Pemesanan Katering Event / Pesta</option>
                          <option value="franchise">🏪 Permohonan Kerjasama Franchising</option>
                        </>
                      )}
                      {selectedDept === 'vanilla' && (
                        <>
                          <option value="vip_lounge">💃 Reservasi VIP Table / Lounge Club</option>
                          <option value="event_hall">🎉 Sewa Venue Hall untuk Event Pribadi</option>
                        </>
                      )}
                      {selectedDept === 'highcouncil' && (
                        <>
                          <option value="izin_usaha">🏛️ Pengajuan Izin Usaha Bisnis Baru</option>
                          <option value="bar_lawyer">⚖️ Pengajuan Lisensi Advokat BAR DOJ</option>
                        </>
                      )}
                    </select>
                  </div>
                  <div className="col-span-2">
                    <label className="text-xs font-bold text-slate-400 uppercase">Keperluan & Catatan Detail RP</label>
                    <textarea placeholder={`Jelaskan alasan pengajuan Anda kepada ${currentDeptObj.name}...`} required className="w-full bg-black/40 border border-white/10 rounded-xl p-3.5 mt-1.5 text-white text-sm focus:border-cyan-500 outline-none h-24"></textarea>
                  </div>
                </div>

                <button type="submit" className={`w-full bg-gradient-to-r ${currentDeptObj.color} text-white font-extrabold p-4 rounded-xl shadow-lg hover:scale-[1.01] transition-transform`}>
                  Kirim Pengajuan Layanan ke {currentDeptObj.name}
                </button>
              </form>
            )}

            {/* FORM 2: APPLY JOB WHITELIST */}
            {activeFormType === 'job' && (
              <form onSubmit={handleFormSubmit} className="space-y-5 bg-slate-900/50 p-6 rounded-2xl border border-amber-500/30">
                <div className="flex justify-between items-center border-b border-white/10 pb-3">
                  <h4 className="text-sm font-black text-amber-400 uppercase tracking-wider flex items-center gap-2">
                    <i className="fa-solid fa-id-card"></i> Form Pendaftaran Whitelist Job — {currentDeptObj.name}
                  </h4>
                  <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/30">STATUS HIRING: RECRUITMENT OPEN</span>
                </div>

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
                    <input type="text" placeholder="Contoh: @username_discord" required className="w-full bg-black/40 border border-white/10 rounded-xl p-3.5 mt-1.5 text-white text-sm focus:border-amber-500 outline-none" />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-400 uppercase">Umur OOC / Pengalaman RP</label>
                    <input type="text" placeholder="Contoh: 20 Tahun / 2 Tahun RP" required className="w-full bg-black/40 border border-white/10 rounded-xl p-3.5 mt-1.5 text-white text-sm focus:border-amber-500 outline-none" />
                  </div>
                  <div className="col-span-2">
                    <label className="text-xs font-bold text-slate-400 uppercase">Posisi / Jabatan Yang Dilamar</label>
                    <select className="w-full bg-black/40 border border-white/10 rounded-xl p-3.5 mt-1.5 text-white text-sm focus:border-amber-500 outline-none">
                      {selectedDept === 'arcane' && (
                        <>
                          <option>🚑 Paramedis / Trainee SAFD</option>
                          <option>🩺 Dokter Umum / Specialization</option>
                        </>
                      )}
                      {selectedDept === 'scvp' && (
                        <>
                          <option>🚓 Cadet / Officer Probation SCVP</option>
                          <option>🚔 Dispatcher / Tactical Support</option>
                        </>
                      )}
                      {selectedDept === 'rizz' && (
                        <>
                          <option>🔧 Junior Mechanic / Tow Driver</option>
                          <option>🛞 Tuning & Modification Specialist</option>
                        </>
                      )}
                      {selectedDept === 'whenthis' && (
                        <>
                          <option>🍔 Restaurant Staff / Kitchen Crew</option>
                          <option>🚚 Delivery Rider & Shift Manager</option>
                        </>
                      )}
                      {selectedDept === 'vanilla' && (
                        <>
                          <option>💃 Dancer / Entertainer VIP</option>
                          <option>🍸 Bartender & Lounge Security</option>
                        </>
                      )}
                      {selectedDept === 'highcouncil' && (
                        <>
                          <option>🏛️ Staff Administrasi Pemkot</option>
                          <option>⚖️ Jaksa Penuntut / Public Defender DOJ</option>
                        </>
                      )}
                    </select>
                  </div>
                  <div className="col-span-2">
                    <label className="text-xs font-bold text-slate-400 uppercase">Motivasi & Visi RP Anda di {currentDeptObj.name}</label>
                    <textarea placeholder="Jelaskan alasan kenapa Anda layak menjadi bagian dari tim kami..." required className="w-full bg-black/40 border border-white/10 rounded-xl p-3.5 mt-1.5 text-white text-sm focus:border-amber-500 outline-none h-28"></textarea>
                  </div>
                </div>

                <button type="submit" className="w-full bg-gradient-to-r from-amber-400 to-amber-600 text-black font-black p-4 rounded-xl shadow-lg shadow-amber-500/30 hover:scale-[1.01] transition-transform">
                  Kirim Lamaran Kerja ke {currentDeptObj.name}
                </button>
              </form>
            )}

            {/* Notification Toast */}
            {formSuccess && (
              <div className="mt-5 p-4 bg-emerald-500/15 border border-emerald-500/30 rounded-2xl flex items-center gap-4 text-emerald-400 animate-fadeIn">
                <i className="fa-solid fa-circle-check text-2xl"></i>
                <div>
                  <strong className="text-white">Pengajuan Berhasil Dikirim ke Discord Channel {currentDeptObj.name}!</strong>
                  <p className="text-xs mt-0.5">Pengurus {currentDeptObj.name} sedang memeriksa berkas Anda di Discord & Tablet sc-pad in-game.</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Lacak Status Section */}
        <div className="bg-slate-900/60 border border-white/10 rounded-3xl p-8 backdrop-blur-md">
          <h3 className="text-base font-black text-cyan-400 mb-4 flex items-center gap-2">
            <i className="fa-solid fa-magnifying-glass"></i> Lacak Status Lamaran / Pengajuan Berkas (by CID)
          </h3>
          <form onSubmit={handleTrackSubmit} className="flex gap-3">
            <input
              type="text"
              value={trackCidInput}
              onChange={(e) => setTrackCidInput(e.target.value)}
              placeholder="Masukkan CID Karakter Anda (contoh: USL99211)..."
              required
              className="flex-1 bg-black/40 border border-white/10 rounded-xl p-3.5 text-white text-sm focus:border-cyan-500 outline-none"
            />
            <button type="submit" className="bg-cyan-500 text-black font-extrabold px-6 py-3.5 rounded-xl hover:bg-cyan-400 transition-colors">
              Cari Berkas
            </button>
          </form>

          {trackResult && (
            <div className="mt-4 bg-black/40 border border-white/10 rounded-2xl p-5 space-y-3">
              <div className="flex justify-between items-center border-b border-white/10 pb-3">
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase">CITIZEN ID</span>
                  <strong className="text-lg text-white block">{trackResult.cid}</strong>
                </div>
                <span className="px-3 py-1 rounded-lg text-xs font-black bg-amber-500/20 text-amber-400 border border-amber-500/40 uppercase">
                  {trackResult.status}
                </span>
              </div>
              <div className="text-xs space-y-1">
                <span className="text-slate-400">Berkas:</span> <strong className="text-white">{trackResult.type}</strong><br/>
                <span className="text-slate-400">Status:</span> <span className="text-slate-300">{trackResult.desc}</span>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
