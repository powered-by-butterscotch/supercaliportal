'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function StaffPage() {
  const [staffDept, setStaffDept] = useState('safd');
  const [staffPin, setStaffPin] = useState('');
  const [staffLoggedIn, setStaffLoggedIn] = useState(false);
  const [staffRoleName, setStaffRoleName] = useState('');
  const [filterDeptCategory, setFilterDeptCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Selected Detail Modal State
  const [selectedRequestModal, setSelectedRequestModal] = useState(null);
  const [rejectReasonModal, setRejectReasonModal] = useState(null);
  const [customRejectInput, setCustomRejectInput] = useState('');
  const [printCertificateModal, setPrintCertificateModal] = useState(null);

  const [staffRequests, setStaffRequests] = useState([
    { 
      id: 'req-1', 
      name: 'Kenxzo Kenxzo', 
      cid: 'USL99211', 
      phone: '0812-9988-1234',
      dept: 'safd', 
      deptName: 'Arcane Rescue Center',
      title: '🏥 Janji Temu Dokter SAFD (Dr. Amara)', 
      reason: 'Pemeriksaan rutin setelah operasi kecelakaan balap mobil di Vinewood Hills.',
      date: '2026-07-25 14:00',
      status: 'PENDING',
      officerNote: '-'
    },
    { 
      id: 'req-2', 
      name: 'John Doe', 
      cid: 'JHN88211', 
      phone: '0857-1122-3344',
      dept: 'scvp', 
      deptName: 'Vibe Patrol SCVP',
      title: '🔫 Pengajuan Lisensi Senjata Api (SCVP)', 
      reason: 'Untuk keamanan diri saat bertugas di daerah perbatasan Sandy Shores yang rawan perampokan.',
      date: '2026-07-24 18:30',
      status: 'PENDING',
      officerNote: '-'
    },
    { 
      id: 'req-3', 
      name: 'Siti Aminah', 
      cid: 'STI44311', 
      phone: '0813-4455-6677',
      dept: 'gov', 
      deptName: 'High Council Pemkot',
      title: '🏛️ Pengajuan Izin Usaha Kedai Kopi (Ken Bar)', 
      reason: 'Proposal usaha warkop kekinian & lounge santai di Legion Square.',
      date: '2026-07-24 16:15',
      status: 'PENDING',
      officerNote: '-'
    }
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
      alert("AKSES DITOLAK! Autentikasi Password Staff / Instansi Salah!");
    }
  };

  const handleApprove = (id, name, cid) => {
    setStaffRequests(prev => prev.map(r => r.id === id ? { ...r, status: 'APPROVED', officerNote: 'DISETUJUI OLEH PETUGAS - STAMP VERIFIED' } : r));
    alert(`SUKSES! Berkas resmi untuk ${name} (CID: ${cid}) telah DISETUJUI & terbit ke tablet sc-pad in-game!`);
  };

  const handleRejectConfirm = (id) => {
    if (!customRejectInput.trim()) {
      alert("Masukkan alasan penolakan!");
      return;
    }
    setStaffRequests(prev => prev.map(r => r.id === id ? { ...r, status: 'REJECTED', officerNote: customRejectInput } : r));
    setRejectReasonModal(null);
    setCustomRejectInput('');
  };

  const pendingCount = staffRequests.filter(r => r.status === 'PENDING').length;
  const approvedCount = staffRequests.filter(r => r.status === 'APPROVED').length;
  const rejectedCount = staffRequests.filter(r => r.status === 'REJECTED').length;

  const filteredRequests = staffRequests.filter(r => {
    const matchDept = filterDeptCategory === 'all' || r.dept === filterDeptCategory;
    const matchStatus = filterStatus === 'all' || r.status === filterStatus;
    const matchQuery = r.name.toLowerCase().includes(searchQuery.toLowerCase()) || r.cid.toLowerCase().includes(searchQuery.toLowerCase());
    return matchDept && matchStatus && matchQuery;
  });

  return (
    <div className="min-h-screen">
      {/* Header Khusus Staff Portal */}
      <header className="sticky top-0 z-50 px-8 py-4 flex justify-between items-center bg-[#060812]/85 backdrop-blur-md border-b border-amber-500/30">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 bg-gradient-to-br from-amber-500 to-amber-700 rounded-xl flex items-center justify-center text-xl shadow-lg shadow-amber-500/30 text-white">
            <i className="fa-solid fa-user-shield"></i>
          </div>
          <div>
            <h1 className="text-xl font-black text-amber-400">
              SUPERCALI STAFF MANAGEMENT CONSOLE
            </h1>
            <p className="text-xs text-slate-400 font-medium">Department Management, Verifier & Certificate Generator</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Link href="/" className="text-xs font-bold text-slate-400 hover:text-white transition-colors">
            ← Kembali ke City Hub
          </Link>
          <div className="flex items-center gap-2.5 bg-amber-500/10 border border-amber-500/30 px-4 py-2 rounded-full text-xs font-bold text-amber-400">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
            <span>Security Officer Active</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto my-8 px-6">
        {!staffLoggedIn ? (
          /* LOGIN GATE SECURED (NO PASSWORD SPILL) */
          <div className="max-w-md mx-auto my-12 bg-slate-900/60 border border-white/10 rounded-3xl p-8 backdrop-blur-md shadow-2xl space-y-6">
            <div className="text-center space-y-2">
              <div className="w-16 h-16 bg-amber-500/20 border border-amber-500/40 rounded-2xl mx-auto flex items-center justify-center text-3xl text-amber-400 shadow-lg shadow-amber-500/20">
                <i className="fa-solid fa-vault"></i>
              </div>
              <h3 className="text-xl font-black text-white">Login Console Petugas & Dokter</h3>
              <p className="text-xs text-slate-400">Masukkan Role Instansi & Password Staff Rahasia Anda.</p>
            </div>

            <form onSubmit={handleStaffLogin} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase">PILIH ROLE INSTANSI</label>
                <select value={staffDept} onChange={(e) => setStaffDept(e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-xl p-3.5 mt-1.5 text-white text-sm outline-none focus:border-amber-500">
                  <option value="safd">🚑 SAFD Medis (Arcane Rescue Center)</option>
                  <option value="scvp">🚓 SCVP Polisi (Vibe Patrol Police)</option>
                  <option value="gov">🏛️ City Hall Pemkot (High Council)</option>
                  <option value="all">👑 Super Admin High Council</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase">PASSWORD / PIN PERSONAL STAFF</label>
                <input type="password" value={staffPin} onChange={(e) => setStaffPin(e.target.value)} placeholder="Masukkan PIN Staff Rahasia..." required className="w-full bg-black/40 border border-white/10 rounded-xl p-3.5 mt-1.5 text-white text-sm outline-none focus:border-amber-500" />
              </div>
              <button type="submit" className="w-full bg-gradient-to-r from-amber-500 to-amber-700 text-white font-extrabold p-4 rounded-xl shadow-lg shadow-amber-500/30 hover:scale-[1.01] transition-transform">
                Verifikasi Autentikasi Staff
              </button>
            </form>
          </div>
        ) : (
          /* ADVANCED DASHBOARD CONSOLE */
          <div className="space-y-6">
            
            {/* Live Analytics Bar */}
            <div className="grid grid-cols-4 gap-5">
              <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-5 backdrop-blur-md">
                <div className="text-xs font-bold text-amber-400 uppercase">PENDING REQUESTS</div>
                <div className="text-2xl font-black text-amber-400 mt-1">{pendingCount} Berkas</div>
              </div>
              <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-5 backdrop-blur-md">
                <div className="text-xs font-bold text-emerald-400 uppercase">BERKAS DISETUJUI</div>
                <div className="text-2xl font-black text-emerald-400 mt-1">{approvedCount} Terbit</div>
              </div>
              <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-5 backdrop-blur-md">
                <div className="text-xs font-bold text-red-400 uppercase">BERKAS DITOLAK</div>
                <div className="text-2xl font-black text-red-400 mt-1">{rejectedCount} Berkas</div>
              </div>
              <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-2xl p-5 backdrop-blur-md">
                <div className="text-xs font-bold text-cyan-400 uppercase">AKUN PETUGAS ACTIVE</div>
                <div className="text-lg font-black text-cyan-300 mt-1 truncate">{staffRoleName}</div>
              </div>
            </div>

            {/* Filter & Search Bar */}
            <div className="bg-slate-900/60 border border-white/10 rounded-2xl p-4 backdrop-blur-md flex justify-between items-center gap-4 flex-wrap">
              <div className="flex gap-2 items-center">
                <span className="text-xs font-bold text-slate-400 mr-2 uppercase">INSTANSI:</span>
                <button onClick={() => setFilterDeptCategory('all')} className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${filterDeptCategory === 'all' ? 'bg-cyan-500 text-black' : 'bg-white/5 text-slate-400 hover:text-white'}`}>Semua</button>
                <button onClick={() => setFilterDeptCategory('safd')} className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${filterDeptCategory === 'safd' ? 'bg-cyan-500 text-black' : 'bg-white/5 text-slate-400 hover:text-white'}`}>🚑 SAFD Medis</button>
                <button onClick={() => setFilterDeptCategory('scvp')} className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${filterDeptCategory === 'scvp' ? 'bg-cyan-500 text-black' : 'bg-white/5 text-slate-400 hover:text-white'}`}>🚓 SCVP Polisi</button>
                <button onClick={() => setFilterDeptCategory('gov')} className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${filterDeptCategory === 'gov' ? 'bg-cyan-500 text-black' : 'bg-white/5 text-slate-400 hover:text-white'}`}>🏛️ Pemkot</button>
              </div>

              <div className="flex gap-2 items-center">
                <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="bg-black/40 border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white outline-none">
                  <option value="all">SEMUA STATUS</option>
                  <option value="PENDING">PENDING</option>
                  <option value="APPROVED">APPROVED</option>
                  <option value="REJECTED">REJECTED</option>
                </select>

                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Cari Nama / CID..."
                  className="bg-black/40 border border-white/10 rounded-xl px-3.5 py-1.5 text-xs text-white outline-none w-44 focus:border-amber-500"
                />
              </div>
            </div>

            {/* Main Table Console */}
            <div className="bg-slate-900/60 border border-white/10 rounded-3xl overflow-hidden backdrop-blur-md shadow-2xl">
              <table className="w-full text-left">
                <thead className="bg-white/5 text-xs text-slate-400 font-bold uppercase border-b border-white/10">
                  <tr>
                    <th className="p-4 px-6">Nama & CID Warga</th>
                    <th className="p-4 px-6">Instansi & Layanan</th>
                    <th className="p-4 px-6">Catatan / Proposal RP</th>
                    <th className="p-4 px-6">Status</th>
                    <th className="p-4 px-6">Aksi Petugas</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10 text-sm">
                  {filteredRequests.map(req => (
                    <tr key={req.id} className="hover:bg-white/5">
                      <td className="p-4 px-6">
                        <strong className="text-white block">{req.name}</strong>
                        <span className="text-xs text-cyan-400 font-mono font-bold">{req.cid}</span>
                      </td>
                      <td className="p-4 px-6 font-bold">{req.title}</td>
                      <td className="p-4 px-6 text-slate-400 text-xs max-w-xs truncate">{req.reason}</td>
                      <td className="p-4 px-6">
                        <span className={`px-2.5 py-1 rounded-lg text-xs font-black ${req.status === 'APPROVED' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' : req.status === 'REJECTED' ? 'bg-red-500/20 text-red-400 border border-red-500/40' : 'bg-amber-500/20 text-amber-400 border border-amber-500/40'}`}>
                          {req.status}
                        </span>
                      </td>
                      <td className="p-4 px-6 space-x-2">
                        <button onClick={() => setSelectedRequestModal(req)} className="bg-white/10 hover:bg-white/20 text-white text-xs font-bold px-3 py-1.5 rounded-lg border border-white/10">
                          👁️ Detail
                        </button>
                        
                        {req.status === 'PENDING' && (
                          <>
                            <button onClick={() => handleApprove(req.id, req.name, req.cid)} className="bg-emerald-500 hover:bg-emerald-400 text-white text-xs font-extrabold px-3 py-1.5 rounded-lg shadow-md shadow-emerald-500/20">
                              ✔ Setujui
                            </button>
                            <button onClick={() => setRejectReasonModal(req)} className="bg-red-500 hover:bg-red-400 text-white text-xs font-extrabold px-3 py-1.5 rounded-lg shadow-md shadow-red-500/20">
                              ❌ Tolak
                            </button>
                          </>
                        )}

                        {req.status === 'APPROVED' && (
                          <button onClick={() => setPrintCertificateModal(req)} className="bg-amber-500 hover:bg-amber-400 text-black text-xs font-black px-3 py-1.5 rounded-lg shadow-md shadow-amber-500/20">
                            🖨️ Cetak Surat
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>

      {/* MODAL DETAIL BERKAS */}
      {selectedRequestModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-white/10 rounded-3xl max-w-lg w-full p-6 space-y-5 shadow-2xl animate-fadeIn">
            <div className="flex justify-between items-center border-b border-white/10 pb-3">
              <h3 className="text-base font-black text-amber-400 flex items-center gap-2">
                <i className="fa-solid fa-file-invoice"></i> Detail Berkas Pengajuan Warga
              </h3>
              <button onClick={() => setSelectedRequestModal(null)} className="text-slate-400 hover:text-white text-lg font-bold">✕</button>
            </div>
            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3 bg-black/30 p-4 rounded-xl border border-white/5">
                <div><span className="text-slate-400">Nama IC:</span> <strong className="text-white block text-sm">{selectedRequestModal.name}</strong></div>
                <div><span className="text-slate-400">Citizen ID (CID):</span> <strong className="text-cyan-400 block text-sm font-mono">{selectedRequestModal.cid}</strong></div>
                <div><span className="text-slate-400">Nomor Telepon:</span> <span className="text-white block">{selectedRequestModal.phone}</span></div>
                <div><span className="text-slate-400">Tanggal Pengajuan:</span> <span className="text-white block">{selectedRequestModal.date}</span></div>
              </div>
              <div>
                <span className="text-slate-400 font-bold uppercase">Layanan Requested:</span>
                <p className="text-white text-sm font-extrabold mt-0.5">{selectedRequestModal.title}</p>
              </div>
              <div>
                <span className="text-slate-400 font-bold uppercase">Detail Catatan / Proposal RP:</span>
                <p className="text-slate-300 mt-1 bg-black/40 p-3 rounded-xl border border-white/5 leading-relaxed">{selectedRequestModal.reason}</p>
              </div>
            </div>
            <button onClick={() => setSelectedRequestModal(null)} className="w-full bg-white/10 text-white font-bold p-3 rounded-xl hover:bg-white/20">Tutup Modal</button>
          </div>
        </div>
      )}

      {/* MODAL INPUT ALASAN TOLAK */}
      {rejectReasonModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-red-500/30 rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <h3 className="text-base font-black text-red-400 flex items-center gap-2">
              <i className="fa-solid fa-circle-xmark"></i> Alasan Penolakan Berkas — {rejectReasonModal.name}
            </h3>
            <textarea 
              value={customRejectInput} 
              onChange={(e) => setCustomRejectInput(e.target.value)} 
              placeholder="Tuliskan catatan alasan penolakan untuk warga..." 
              className="w-full bg-black/40 border border-white/10 rounded-xl p-3.5 text-white text-xs outline-none focus:border-red-500 h-24"
            ></textarea>
            <div className="flex gap-2">
              <button onClick={() => setRejectReasonModal(null)} className="flex-1 bg-white/10 text-white font-bold p-3 rounded-xl">Batal</button>
              <button onClick={() => handleRejectConfirm(rejectReasonModal.id)} className="flex-1 bg-red-500 text-white font-extrabold p-3 rounded-xl hover:bg-red-400">Konfirmasi Tolak</button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL CETAK SURAT RESMI */}
      {printCertificateModal && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-950 border-2 border-amber-500/40 rounded-3xl max-w-lg w-full p-8 space-y-6 shadow-2xl text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10 font-black text-8xl text-amber-400">SUPERCALI</div>
            <div className="space-y-1">
              <div className="w-12 h-12 bg-amber-500/20 border border-amber-500/40 rounded-xl mx-auto flex items-center justify-center text-amber-400 text-xl">
                <i className="fa-solid fa-stamp"></i>
              </div>
              <h2 className="text-xl font-black text-amber-400 tracking-wider">SURAT KETERANGAN RESMI KOTA</h2>
              <p className="text-[10px] text-slate-400 uppercase tracking-widest font-mono">SUPERCALI PUBLIC SERVICES • CERTIFICATE NO: SC-DOC-99812</p>
            </div>
            
            <div className="bg-black/50 border border-amber-500/20 p-5 rounded-2xl text-left text-xs space-y-2">
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="text-slate-400">NAMA LENGKAP:</span>
                <strong className="text-white font-mono">{printCertificateModal.name}</strong>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="text-slate-400">CITIZEN ID (CID):</span>
                <strong className="text-cyan-400 font-mono">{printCertificateModal.cid}</strong>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="text-slate-400">STATUS DOKUMEN:</span>
                <strong className="text-emerald-400 font-mono">VERIFIED & APPROVED</strong>
              </div>
              <div className="pt-2">
                <span className="text-slate-400 block text-[10px]">KEPERLUAN:</span>
                <p className="text-white text-xs font-semibold mt-0.5">{printCertificateModal.title}</p>
              </div>
            </div>

            <div className="flex justify-between items-center text-[10px] text-slate-400 pt-2">
              <span>TERBIT: {new Date().toLocaleDateString()}</span>
              <span className="text-amber-400 font-bold">STEMPEL KOTA: VERIFIED OK</span>
            </div>

            <div className="flex gap-2">
              <button onClick={() => window.print()} className="flex-1 bg-amber-400 text-black font-black p-3 rounded-xl hover:bg-amber-300">🖨️ Print Document PDF</button>
              <button onClick={() => setPrintCertificateModal(null)} className="bg-white/10 text-white font-bold p-3 rounded-xl px-5">Tutup</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
