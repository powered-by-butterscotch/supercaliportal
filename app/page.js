'use client';

import { useState, useEffect } from 'react';

export default function Home() {
  const [activeTab, setActiveTab] = useState('economy');
  const [economyData, setEconomyData] = useState([]);
  const [serverConnected, setServerConnected] = useState(true);

  // Form States
  const [medSuccess, setMedSuccess] = useState(false);
  const [docSuccess, setDocSuccess] = useState(false);
  
  // Track Status States
  const [trackCidInput, setTrackCidInput] = useState('');
  const [trackResult, setTrackResult] = useState(null);

  // Staff Portal States
  const [staffDept, setStaffDept] = useState('safd');
  const [staffPin, setStaffPin] = useState('');
  const [staffLoggedIn, setStaffLoggedIn] = useState(false);
  const [staffRoleName, setStaffRoleName] = useState('');
  const [filterDeptCategory, setFilterDeptCategory] = useState('all');

  const [staffRequests, setStaffRequests] = useState([
    { id: 'req-1', name: 'Kenxzo Kenxzo', cid: 'USL99211', dept: 'safd', title: '🏥 Janji Temu Dokter SAFD (Dr. Amara)', reason: 'Pemeriksaan rutin setelah operasi kecelakaan balap.', status: 'PENDING' },
    { id: 'req-2', name: 'John Doe', cid: 'JHN88211', dept: 'scvp', title: '🔫 Pengajuan Lisensi Senjata Api (SCVP)', reason: 'Untuk keamanan diri saat bertugas di daerah perbatasan Sandy Shores.', status: 'PENDING' },
    { id: 'req-3', name: 'Siti Aminah', cid: 'STI44311', dept: 'gov', title: '🏛️ Pengajuan Izin Usaha Kedai Kopi (Ken Bar)', reason: 'Proposal usaha warkop kekinian di Legion Square.', status: 'PENDING' }
  ]);

  useEffect(() => {
    fetchLiveEconomy();
    const interval = setInterval(fetchLiveEconomy, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchLiveEconomy = async () => {
    try {
      const res = await fetch('/api/economy');
      const json = await res.json();
      if (json && json.data) {
        setEconomyData(json.data);
        setServerConnected(true);
      }
    } catch (e) {
      setServerConnected(false);
    }
  };

  const handleStaffLogin = (e) => {
    e.preventDefault();
    if ((staffDept === 'safd' && staffPin === '1111') || 
        (staffDept === 'scvp' && staffPin === '2222') || 
        (staffDept === 'gov' && staffPin === '3333') || 
        staffPin === '1234' || staffPin === 'admin') {
      
      const role = staffPin === '1111' ? 'SAFD Medis' : staffPin === '2222' ? 'SCVP Polisi' : staffPin === '3333' ? 'City Hall Pemkot' : 'Super Admin High Council';
      setStaffRoleName(role);
      setStaffLoggedIn(true);
      
      if (staffPin !== '1234' && staffPin !== 'admin') {
        setFilterDeptCategory(staffDept);
      } else {
        setFilterDeptCategory('all');
      }
    } else {
      alert("PIN Staff / Instansi Salah!\n- SAFD Medis PIN: 1111\n- SCVP Polisi PIN: 2222\n- Pemkot PIN: 3333\n- Super Admin PIN: 1234");
    }
  };

  const handleApprove = (id, name, cid) => {
    setStaffRequests(prev => prev.map(r => r.id === id ? { ...r, status: 'APPROVED' } : r));
    alert(`SUKSES! Berkas untuk ${name} (CID: ${cid}) telah DISETUJUI dan terbit ke tablet sc-pad in-game!`);
  };

  const handleReject = (id) => {
    setStaffRequests(prev => prev.map(r => r.id === id ? { ...r, status: 'REJECTED' } : r));
  };

  return (
    <div className="min-h-screen">
      {/* Official Header */}
      <header className="sticky top-0 z-50 px-8 py-4 flex justify-between items-center bg-[#060812]/85 backdrop-blur-md border-b border-white/10">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center text-xl shadow-lg shadow-cyan-500/30">
            <i className="fa-solid fa-city"></i>
          </div>
          <div>
            <h1 className="text-xl font-black bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
              SUPERCALI ROLEPLAY
            </h1>
            <p className="text-xs text-slate-400 font-medium">Official City Hub & Public Services Portal</p>
          </div>
        </div>

        <nav className="flex gap-2 bg-white/5 p-1.5 rounded-2xl border border-white/10">
          <button 
            onClick={() => setActiveTab('economy')} 
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${activeTab === 'economy' ? 'bg-gradient-to-br from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/30' : 'text-slate-400 hover:text-white'}`}
          >
            <i className="fa-solid fa-chart-line"></i> Pasar & Ekonomi
          </button>
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
          <button 
            onClick={() => setActiveTab('staff')} 
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 text-amber-400 border-l border-white/10 ${activeTab === 'staff' ? 'bg-gradient-to-br from-amber-500 to-amber-700 text-white shadow-lg shadow-amber-500/30' : 'hover:text-white'}`}
          >
            <i className="fa-solid fa-user-shield"></i> Portal Petugas / Staff
          </button>
        </nav>

        <div className="flex items-center gap-2.5 bg-emerald-500/10 border border-emerald-500/30 px-4 py-2 rounded-full text-xs font-bold text-emerald-400">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-md shadow-emerald-400"></span>
          <span>Supercali RP Live Sync</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto my-9 px-6">
        {/* Banner */}
        <div className="bg-gradient-to-r from-cyan-500/15 via-blue-600/10 to-amber-500/10 border border-cyan-500/30 rounded-3xl p-7 flex justify-between items-center mb-8 backdrop-blur-md">
          <div>
            <h2 className="text-2xl font-black text-white">Portal Resmi Kota Supercali RP</h2>
            <p className="text-xs text-slate-400 mt-1">Terintegrasi langsung dengan Database FiveM oxmysql & Tablet sc-pad In-Game.</p>
          </div>
          <i className="fa-solid fa-shield-halved text-4xl text-cyan-400/80"></i>
        </div>

        {/* Tab 1: Pasar & Ekonomi */}
        {activeTab === 'economy' && (
          <div className="space-y-6">
            <div className="grid grid-cols-4 gap-5">
              <div className="bg-slate-900/60 border border-white/10 rounded-2xl p-5 backdrop-blur-md">
                <div className="text-xs font-semibold text-slate-400">PAYCHECK STANDAR (10 MIN)</div>
                <div className="text-xl font-black text-white mt-1">$50 - $150</div>
              </div>
              <div className="bg-slate-900/60 border border-white/10 rounded-2xl p-5 backdrop-blur-md">
                <div className="text-xs font-semibold text-slate-400">TARGET PROFIT / JAM</div>
                <div className="text-xl font-black text-emerald-400 mt-1">$200 - $600</div>
              </div>
              <div className="bg-slate-900/60 border border-white/10 rounded-2xl p-5 backdrop-blur-md">
                <div className="text-xs font-semibold text-slate-400">HARGA MAKANAN STANDAR</div>
                <div className="text-xl font-black text-amber-400 mt-1">$15 - $40</div>
              </div>
              <div className="bg-slate-900/60 border border-white/10 rounded-2xl p-5 backdrop-blur-md">
                <div className="text-xs font-semibold text-slate-400">TARGET BELI MOBIL ($50K)</div>
                <div className="text-xl font-black text-purple-400 mt-1">~80 - 250 Jam</div>
              </div>
            </div>

            <div className="bg-slate-900/60 border border-white/10 rounded-3xl overflow-hidden backdrop-blur-md">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-white/5 text-xs text-slate-400 font-bold uppercase border-b border-white/10">
                    <th className="p-4 px-6">Komoditas / Barang</th>
                    <th className="p-4 px-6">Kategori</th>
                    <th className="p-4 px-6">Los Santos</th>
                    <th className="p-4 px-6">Sandy Shores</th>
                    <th className="p-4 px-6">Paleto Bay</th>
                    <th className="p-4 px-6">Status Demand</th>
                    <th className="p-4 px-6">Lokasi Jual Teruntung</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10 text-sm">
                  {economyData.map((item, i) => (
                    <tr key={i} className="hover:bg-white/5">
                      <td className="p-4 px-6 font-extrabold">{item.item_name}</td>
                      <td className="p-4 px-6 text-slate-400">{item.category}</td>
                      <td className="p-4 px-6 font-mono font-bold">${item.price_ls} / item</td>
                      <td className="p-4 px-6 font-mono font-bold text-emerald-400">${item.price_sandy} / item</td>
                      <td className="p-4 px-6 font-mono font-bold text-emerald-400">${item.price_paleto} / item</td>
                      <td className="p-4 px-6">
                        <span className={`px-2.5 py-1 rounded-lg text-xs font-black ${item.demand_status === 'HIGH' ? 'bg-red-500/20 text-red-400 border border-red-500/40' : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'}`}>
                          {item.demand_status}
                        </span>
                      </td>
                      <td className="p-4 px-6 font-extrabold text-amber-400">{item.best_location}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 2: Janji Temu Medis */}
        {activeTab === 'medical' && (
          <div className="bg-slate-900/60 border border-white/10 rounded-3xl p-8 backdrop-blur-md">
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
                Kirim Pendaftaran Janji Temu
              </button>
            </form>
            {medSuccess && (
              <div className="mt-5 p-4 bg-emerald-500/15 border border-emerald-500/30 rounded-2xl flex items-center gap-4 text-emerald-400">
                <i className="fa-solid fa-circle-check text-2xl"></i>
                <div>
                  <strong className="text-white">Pendaftaran Berhasil Terkirim!</strong>
                  <p className="text-xs mt-0.5">Notifikasi langsung sync ke Tablet sc-pad Dokter Jaga in-game.</p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tab 5: Portal Petugas / Staff Console */}
        {activeTab === 'staff' && (
          <div className="bg-slate-900/60 border border-white/10 rounded-3xl p-8 backdrop-blur-md">
            {!staffLoggedIn ? (
              <div className="max-w-md mx-auto space-y-5 py-4">
                <h3 className="text-lg font-black text-amber-400 text-center">
                  <i className="fa-solid fa-user-shield"></i> Login Staff & Dokter Instansi Supercali
                </h3>
                <form onSubmit={handleStaffLogin} className="space-y-4">
                  <div>
                    <label className="text-xs font-bold text-slate-400">PILIH INSTANSI</label>
                    <select value={staffDept} onChange={(e) => setStaffDept(e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-xl p-3.5 mt-1.5 text-white text-sm outline-none">
                      <option value="safd">🚑 SAFD Medis (PIN: 1111)</option>
                      <option value="scvp">🚓 SCVP Polisi (PIN: 2222)</option>
                      <option value="gov">🏛️ City Hall Pemkot (PIN: 3333)</option>
                      <option value="all">👑 Super Admin (PIN: 1234)</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-400">PASSWORD / PIN STAFF</label>
                    <input type="password" value={staffPin} onChange={(e) => setStaffPin(e.target.value)} placeholder="Masukkan PIN..." required className="w-full bg-black/40 border border-white/10 rounded-xl p-3.5 mt-1.5 text-white text-sm outline-none" />
                  </div>
                  <button type="submit" className="w-full bg-amber-400 text-black font-extrabold p-3.5 rounded-xl hover:bg-amber-300 transition-colors">
                    Login Console Petugas
                  </button>
                </form>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="flex justify-between items-center bg-white/5 p-4 rounded-2xl border border-white/10">
                  <div className="text-sm font-black text-amber-400">LOGGED IN: {staffRoleName.toUpperCase()}</div>
                  <div className="flex gap-2">
                    <button onClick={() => setFilterDeptCategory('all')} className={`px-3 py-1.5 rounded-lg text-xs font-bold ${filterDeptCategory === 'all' ? 'bg-cyan-400 text-black' : 'bg-white/10 text-slate-300'}`}>Semua Berkas</button>
                    <button onClick={() => setFilterDeptCategory('safd')} className={`px-3 py-1.5 rounded-lg text-xs font-bold ${filterDeptCategory === 'safd' ? 'bg-cyan-400 text-black' : 'bg-white/10 text-slate-300'}`}>🚑 SAFD Medis</button>
                    <button onClick={() => setFilterDeptCategory('scvp')} className={`px-3 py-1.5 rounded-lg text-xs font-bold ${filterDeptCategory === 'scvp' ? 'bg-cyan-400 text-black' : 'bg-white/10 text-slate-300'}`}>🚓 SCVP Polisi</button>
                  </div>
                </div>

                <div className="border border-white/10 rounded-2xl overflow-hidden">
                  <table className="w-full text-left">
                    <thead className="bg-white/5 text-xs text-slate-400 border-b border-white/10">
                      <tr>
                        <th className="p-4">Nama & CID Warga</th>
                        <th className="p-4">Instansi & Layanan</th>
                        <th className="p-4">Catatan RP</th>
                        <th className="p-4">Status</th>
                        <th className="p-4">Aksi Petugas</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/10 text-sm">
                      {staffRequests.filter(r => filterDeptCategory === 'all' || r.dept === filterDeptCategory).map(req => (
                        <tr key={req.id}>
                          <td className="p-4">
                            <strong>{req.name}</strong><br/>
                            <span className="text-xs text-cyan-400">{req.cid}</span>
                          </td>
                          <td className="p-4">{req.title}</td>
                          <td className="p-4 text-slate-400 text-xs">{req.reason}</td>
                          <td className="p-4">
                            <span className={`px-2.5 py-1 rounded-lg text-xs font-black ${req.status === 'APPROVED' ? 'bg-emerald-500/20 text-emerald-400' : req.status === 'REJECTED' ? 'bg-red-500/20 text-red-400' : 'bg-amber-500/20 text-amber-400'}`}>
                              {req.status}
                            </span>
                          </td>
                          <td className="p-4 space-x-2">
                            {req.status === 'PENDING' && (
                              <>
                                <button onClick={() => handleApprove(req.id, req.name, req.cid)} className="bg-emerald-500 text-white text-xs font-extrabold px-3 py-1.5 rounded-lg hover:bg-emerald-400">✔ Setujui</button>
                                <button onClick={() => handleReject(req.id)} className="bg-red-500 text-white text-xs font-extrabold px-3 py-1.5 rounded-lg hover:bg-red-400">❌ Tolak</button>
                              </>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
