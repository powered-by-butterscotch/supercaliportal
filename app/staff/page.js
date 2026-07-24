'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function StaffPage() {
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
      {/* Header Khusus Staff Portal */}
      <header className="sticky top-0 z-50 px-8 py-4 flex justify-between items-center bg-[#060812]/85 backdrop-blur-md border-b border-amber-500/30">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 bg-gradient-to-br from-amber-500 to-amber-700 rounded-xl flex items-center justify-center text-xl shadow-lg shadow-amber-500/30">
            <i className="fa-solid fa-user-shield"></i>
          </div>
          <div>
            <h1 className="text-xl font-black text-amber-400">
              SUPERCALI STAFF DESK
            </h1>
            <p className="text-xs text-slate-400 font-medium">Department Management Console & Document Verifier</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Link href="/" className="text-xs font-bold text-slate-400 hover:text-white transition-colors">
            ← Kembali ke City Hub
          </Link>
          <div className="flex items-center gap-2.5 bg-amber-500/10 border border-amber-500/30 px-4 py-2 rounded-full text-xs font-bold text-amber-400">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
            <span>Staff Security Portal Active</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto my-9 px-6">
        <div className="bg-slate-900/60 border border-white/10 rounded-3xl p-8 backdrop-blur-md shadow-2xl">
          {!staffLoggedIn ? (
            <div className="max-w-md mx-auto space-y-6 py-6">
              <div className="text-center space-y-2">
                <div className="w-16 h-16 bg-amber-500/20 border border-amber-500/40 rounded-2xl mx-auto flex items-center justify-center text-3xl text-amber-400">
                  <i className="fa-solid fa-lock"></i>
                </div>
                <h3 className="text-xl font-black text-white">Login Console Petugas & Dokter</h3>
                <p className="text-xs text-slate-400">Masukkan Instansi & Password Staff Resmi Anda.</p>
              </div>

              <form onSubmit={handleStaffLogin} className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase">PILIH INSTANSI ROLE</label>
                  <select value={staffDept} onChange={(e) => setStaffDept(e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-xl p-3.5 mt-1.5 text-white text-sm outline-none focus:border-amber-500">
                    <option value="safd">🚑 SAFD Medis (PIN: 1111)</option>
                    <option value="scvp">🚓 SCVP Polisi (PIN: 2222)</option>
                    <option value="gov">🏛️ City Hall Pemkot (PIN: 3333)</option>
                    <option value="all">👑 Super Admin (PIN: 1234)</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase">PASSWORD / PIN PERSONAL STAFF</label>
                  <input type="password" value={staffPin} onChange={(e) => setStaffPin(e.target.value)} placeholder="Masukkan PIN..." required className="w-full bg-black/40 border border-white/10 rounded-xl p-3.5 mt-1.5 text-white text-sm outline-none focus:border-amber-500" />
                </div>
                <button type="submit" className="w-full bg-gradient-to-r from-amber-500 to-amber-700 text-white font-extrabold p-4 rounded-xl shadow-lg shadow-amber-500/30 hover:scale-[1.01] transition-transform">
                  Verifikasi Password & Masuk Console
                </button>
              </form>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex justify-between items-center bg-white/5 p-4.5 rounded-2xl border border-white/10">
                <div>
                  <div className="text-xs text-slate-400 font-bold uppercase">AKUN PETUGAS TERVERIFIKASI</div>
                  <div className="text-base font-black text-amber-400 mt-0.5">{staffRoleName.toUpperCase()}</div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => setFilterDeptCategory('all')} className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${filterDeptCategory === 'all' ? 'bg-cyan-500 text-black font-extrabold' : 'bg-white/5 text-slate-300 hover:text-white'}`}>Semua Berkas</button>
                  <button onClick={() => setFilterDeptCategory('safd')} className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${filterDeptCategory === 'safd' ? 'bg-cyan-500 text-black font-extrabold' : 'bg-white/5 text-slate-300 hover:text-white'}`}>🚑 SAFD Medis</button>
                  <button onClick={() => setFilterDeptCategory('scvp')} className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${filterDeptCategory === 'scvp' ? 'bg-cyan-500 text-black font-extrabold' : 'bg-white/5 text-slate-300 hover:text-white'}`}>🚓 SCVP Polisi</button>
                  <button onClick={() => setFilterDeptCategory('gov')} className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${filterDeptCategory === 'gov' ? 'bg-cyan-500 text-black font-extrabold' : 'bg-white/5 text-slate-300 hover:text-white'}`}>🏛️ City Hall</button>
                </div>
              </div>

              <div className="border border-white/10 rounded-2xl overflow-hidden">
                <table className="w-full text-left">
                  <thead className="bg-white/5 text-xs text-slate-400 font-bold uppercase border-b border-white/10">
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
                      <tr key={req.id} className="hover:bg-white/5">
                        <td className="p-4">
                          <strong className="text-white">{req.name}</strong><br/>
                          <span className="text-xs text-cyan-400 font-mono font-bold">{req.cid}</span>
                        </td>
                        <td className="p-4 font-bold">{req.title}</td>
                        <td className="p-4 text-slate-400 text-xs max-w-xs">{req.reason}</td>
                        <td className="p-4">
                          <span className={`px-2.5 py-1 rounded-lg text-xs font-black ${req.status === 'APPROVED' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' : req.status === 'REJECTED' ? 'bg-red-500/20 text-red-400 border border-red-500/40' : 'bg-amber-500/20 text-amber-400 border border-amber-500/40'}`}>
                            {req.status}
                          </span>
                        </td>
                        <td className="p-4 space-x-2">
                          {req.status === 'PENDING' && (
                            <>
                              <button onClick={() => handleApprove(req.id, req.name, req.cid)} className="bg-emerald-500 text-white text-xs font-extrabold px-3.5 py-2 rounded-xl hover:bg-emerald-400 shadow-md shadow-emerald-500/20">✔ Setujui</button>
                              <button onClick={() => handleReject(req.id)} className="bg-red-500 text-white text-xs font-extrabold px-3.5 py-2 rounded-xl hover:bg-red-400 shadow-md shadow-red-500/20">❌ Tolak</button>
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
      </main>
    </div>
  );
}
