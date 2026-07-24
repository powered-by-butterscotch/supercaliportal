'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function StaffPage() {
  const [staffDept, setStaffDept] = useState('safd');
  const [staffPin, setStaffPin] = useState('');
  const [staffLoggedIn, setStaffLoggedIn] = useState(false);
  const [staffRoleName, setStaffRoleName] = useState('');
  
  // Custom Toast Notification State (Goodbye Majapahit Browser Alerts!)
  const [toastNotification, setToastNotification] = useState(null);

  const showToast = (message, type = 'info') => {
    setToastNotification({ message, type });
    setTimeout(() => setToastNotification(null), 5000);
  };

  // Navigation Tabs
  const [activeTab, setActiveTab] = useState('requests'); // 'requests', 'memos', 'roster', 'handbook'

  const [filterDeptCategory, setFilterDeptCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Selected Detail Modal State
  const [selectedRequestModal, setSelectedRequestModal] = useState(null);
  const [rejectReasonModal, setRejectReasonModal] = useState(null);
  const [customRejectInput, setCustomRejectInput] = useState('');
  const [printCertificateModal, setPrintCertificateModal] = useState(null);

  // 1. STATE BERKAS WARGA
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

  // 2. STATE SURAT-MENYURAT DIREKSI & INTER-AGENCY MEMO
  const [memos, setMemos] = useState([
    {
      id: 'memo-101',
      memoNo: 'SC-MEMO/GOV/2026/001',
      senderDept: 'High Council Pemkot',
      targetDept: 'Vibe Patrol SCVP & SAFD Medis',
      title: '📜 Himbauan Ketertiban & Patroli Skala Besar Konser KenClub',
      content: 'Diberitahukan kepada seluruh jajaran SCVP & SAFD untuk menempatkan 5 personil on-duty di area KenClub Legion Square malam ini.',
      date: '2026-07-24 19:00',
      status: 'TERKIRIM & SYNCED SC-PAD'
    },
    {
      id: 'memo-102',
      memoNo: 'SC-MEMO/SAFD/2026/004',
      senderDept: 'Arcane Rescue Center (SAFD)',
      targetDept: 'High Council Pemkot',
      title: '🏥 Permohonan Penambahan Ambulans Unit Resusitasi',
      content: 'Pengajuan anggaran dana pengadaan 2 unit Ambulans Vapid Speedo tambahan untuk Paleto Bay Clinic.',
      date: '2026-07-24 15:30',
      status: 'TERKIRIM & SYNCED SC-PAD'
    }
  ]);

  const [newMemoTitle, setNewMemoTitle] = useState('');
  const [newMemoTarget, setNewMemoTarget] = useState('Semua Instansi / Public');
  const [newMemoContent, setNewMemoContent] = useState('');

  // 3. STATE ANGGOTA / FACTION ROSTER MANAGEMENT
  const [roster, setRoster] = useState([
    { id: 'ros-1', name: 'Dr. Amara', cid: 'AMR11902', dept: 'safd', rank: 'Chief Medical Officer (Grade 4)', status: 'ON-DUTY', casesHandled: 42 },
    { id: 'ros-2', name: 'Officer Budi', cid: 'BDI88712', dept: 'scvp', rank: 'Sergeant First Class (Grade 3)', status: 'ON-DUTY', casesHandled: 28 },
    { id: 'ros-3', name: 'Mekanik Udin', cid: 'UDN99123', dept: 'ultraspeed', rank: 'Head Tuner (Grade 3)', status: 'OFF-DUTY', casesHandled: 54 },
  ]);

  // 4. HANDBOOK & TARIF PENANGANAN LOW-PAY ECONOMY ($5 - $45)
  const handbookData = {
    safd: {
      title: "🏥 HANDBOOK SOP DIREKSI SAFD (ARCANE RESCUE)",
      sopRules: [
        "SOP 1: Respon Panggilan Darurat EMS 911 Maksimal 3 Menit.",
        "SOP 2: Setiap Operasi Bedah Harus Disertai Surat Keterangan Medis.",
        "SOP 3: Dilarang Keras Meninggalkan Pasien Tanpa Penanganan Resusitasi."
      ],
      tariffList: [
        { service: "Pertolongan Pertama / Obat P3K", price: "$5 - $10" },
        { service: "Pemeriksaan Dokter & Surat Sehat", price: "$15" },
        { service: "Tindakan Bedah Darurat & Surgery", price: "$35 - $45" },
      ]
    },
    scvp: {
      title: "🚓 HANDBOOK SOP DIREKSI POLISI (VIBE PATROL SCVP)",
      sopRules: [
        "SOP 1: Penggunaan Senjata Api Hanya Saat CODE 3 (Bahayakan Nyawa).",
        "SOP 2: Hak Miranda Warga Wajib Dibatalkan Jika Buron Berbahaya.",
        "SOP 3: Razia Senjata Ilegal Wajib Disertai Surat Izin Penggeledahan High Council."
      ],
      tariffList: [
        { service: "Denda Pelanggaran Lampu Merah / Speeding", price: "$10 - $15" },
        { service: "Denda Balap Liar / Mengemudi Tanpa SIM", price: "$25" },
        { service: "Denda Kepemilikan Senjata Api Ilegal & DPO", price: "$40 - $45" },
      ]
    },
    ultraspeed: {
      title: "🔧 HANDBOOK SOP DIREKSI BENGKEL ULTRASPEED MECHANIC",
      sopRules: [
        "SOP 1: Derek / Towing Kendaraan Wajib Konfirmasi Plat Nomor Owner.",
        "SOP 2: Modifikasi Engine VIP Wajib Dilakukan Di Pit-Stop Resmi.",
        "SOP 3: Garansi Servis Mesin Berlaku 24 Jam RP."
      ],
      tariffList: [
        { service: "Servis Mesin Ringan / Ganti Oli", price: "$10" },
        { service: "Panggilan Towing Derek Darurat", price: "$15" },
        { service: "Tuning Engine Stage 3 & VIP Bodykit", price: "$35 - $45" },
      ]
    },
    gov: {
      title: "🏛️ HANDBOOK SOP DIREKSI PEMKOT (HIGH COUNCIL)",
      sopRules: [
        "SOP 1: Pengesahan Izin Usaha Bisnis Baru Wajib Lolos Verifikasi Loket.",
        "SOP 2: Pengangkatan Pejabat Faksi Wajib Disetujui High Council.",
        "SOP 3: Audit Anggaran Kas Faksi Dilakukan Setiap Minggu."
      ],
      tariffList: [
        { service: "Penerbitan KTP Digital & Passport IC", price: "$5" },
        { service: "Pendaftaran STNK DMV Kendaraan", price: "$15" },
        { service: "Pengesahan Akta Izin Usaha Bisnis", price: "$40 - $45" },
      ]
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
      showToast(`Selamat Datang, ${role}! Verifikasi PIN Direksi Berhasil.`, 'success');
    } else {
      showToast("AKSES DITOLAK! PIN Direksi / Staff Yang Anda Masukkan Salah!", 'error');
    }
  };

  const handleApprove = (id, name, cid) => {
    setStaffRequests(prev => prev.map(r => r.id === id ? { ...r, status: 'APPROVED', officerNote: 'DISETUJUI OLEH PETUGAS - STAMP VERIFIED' } : r));
    showToast(`SUKSES! Berkas untuk ${name} (CID: ${cid}) telah DISETUJUI & terbit ke tablet sc-pad in-game!`, 'success');
  };

  const handleRejectConfirm = (id) => {
    if (!customRejectInput.trim()) {
      showToast("Tuliskan alasan penolakan berkas!", 'warning');
      return;
    }
    setStaffRequests(prev => prev.map(r => r.id === id ? { ...r, status: 'REJECTED', officerNote: customRejectInput } : r));
    setRejectReasonModal(null);
    setCustomRejectInput('');
    showToast("Berkas warga resmi DITOLAK.", 'error');
  };

  const handleCreateMemo = (e) => {
    e.preventDefault();
    const memoObj = {
      id: `memo-${Date.now()}`,
      memoNo: `SC-MEMO/${staffDept.toUpperCase()}/2026/00${memos.length + 1}`,
      senderDept: staffRoleName,
      targetDept: newMemoTarget,
      title: newMemoTitle,
      content: newMemoContent,
      date: new Date().toLocaleString(),
      status: 'TERKIRIM & SYNCED SC-PAD'
    };
    setMemos([memoObj, ...memos]);
    setNewMemoTitle('');
    setNewMemoContent('');
    showToast("Surat Memo Resmi Direksi Berhasil Diterbitkan & Sync ke Tablet sc-pad!", 'success');
  };

  const handlePromoteRank = (id) => {
    setRoster(prev => prev.map(m => m.id === id ? { ...m, rank: `${m.rank} (Promoted)` } : m));
    showToast("Pangkat Anggota Faksi Telah Ditingkatkan & Sync ke Database QBCore!", 'success');
  };

  const currentHandbook = handbookData[staffDept] || handbookData.safd;

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
    <div className="min-h-screen relative">
      
      {/* MODERN GLASSMORPHISM TOAST NOTIFICATION (NO MORE MAJAPAHIT BROWSER ALERTS!) */}
      {toastNotification && (
        <div className="fixed top-5 right-5 z-50 animate-bounce">
          <div className={`p-4 rounded-2xl border backdrop-blur-md shadow-2xl flex items-center gap-3 text-xs font-black text-white ${toastNotification.type === 'error' ? 'bg-red-950/80 border-red-500/50 text-red-300' : toastNotification.type === 'success' ? 'bg-emerald-950/80 border-emerald-500/50 text-emerald-300' : toastNotification.type === 'warning' ? 'bg-amber-950/80 border-amber-500/50 text-amber-300' : 'bg-cyan-950/80 border-cyan-500/50 text-cyan-300'}`}>
            <i className={`text-lg fa-solid ${toastNotification.type === 'error' ? 'fa-circle-xmark text-red-400' : toastNotification.type === 'success' ? 'fa-circle-check text-emerald-400' : 'fa-bell text-amber-400'}`}></i>
            <span>{toastNotification.message}</span>
          </div>
        </div>
      )}

      {/* Header Khusus Staff Portal */}
      <header className="sticky top-0 z-40 px-8 py-4 flex justify-between items-center bg-[#060812]/85 backdrop-blur-md border-b border-amber-500/30">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 bg-gradient-to-br from-amber-500 to-amber-700 rounded-xl flex items-center justify-center text-xl shadow-lg shadow-amber-500/30 text-white">
            <i className="fa-solid fa-user-shield"></i>
          </div>
          <div>
            <h1 className="text-xl font-black text-amber-400">
              SUPERCALI DIREKSI & STAFF CONSOLE
            </h1>
            <p className="text-xs text-slate-400 font-medium">Handbook SOP Instansi, Tarif Penanganan ($5-$45), Memos & Roster</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Link href="/" className="text-xs font-bold text-slate-400 hover:text-white transition-colors">
            ← Kembali ke City Hub
          </Link>
          <div className="flex items-center gap-2.5 bg-amber-500/10 border border-amber-500/30 px-4 py-2 rounded-full text-xs font-bold text-amber-400">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
            <span>Director Console Active</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto my-8 px-6">
        {!staffLoggedIn ? (
          /* LOGIN GATE SECURED WITH DIREKSI FACTION PIN */
          <div className="max-w-md mx-auto my-12 bg-slate-900/60 border border-white/10 rounded-3xl p-8 backdrop-blur-md shadow-2xl space-y-6">
            <div className="text-center space-y-2">
              <div className="w-16 h-16 bg-amber-500/20 border border-amber-500/40 rounded-2xl mx-auto flex items-center justify-center text-3xl text-amber-400 shadow-lg shadow-amber-500/20">
                <i className="fa-solid fa-vault"></i>
              </div>
              <h3 className="text-xl font-black text-white">Login Portal Direksi Faksi & Petugas</h3>
              <p className="text-xs text-slate-400">Pilih Faksi Anda & Masukkan PIN Direksi Rahasia.</p>
            </div>

            <form onSubmit={handleStaffLogin} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase">PILIH FAKSI DIREKSI</label>
                <select value={staffDept} onChange={(e) => setStaffDept(e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-xl p-3.5 mt-1.5 text-white text-sm outline-none focus:border-amber-500">
                  <option value="safd">🚑 Direksi SAFD Medis (Arcane Rescue)</option>
                  <option value="scvp">🚓 Direksi SCVP Polisi (Vibe Patrol)</option>
                  <option value="ultraspeed">🔧 Direksi UltraSpeed Mechanic</option>
                  <option value="gov">🏛️ Direksi High Council Pemkot</option>
                  <option value="all">👑 Super Admin High Council</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase">PIN DIREKSI / STAFF RAHASIA</label>
                <input type="password" value={staffPin} onChange={(e) => setStaffPin(e.target.value)} placeholder="Masukkan PIN Direksi..." required className="w-full bg-black/40 border border-white/10 rounded-xl p-3.5 mt-1.5 text-white text-sm outline-none focus:border-amber-500" />
              </div>
              <button type="submit" className="w-full bg-gradient-to-r from-amber-500 to-amber-700 text-white font-extrabold p-4 rounded-xl shadow-lg shadow-amber-500/30 hover:scale-[1.01] transition-transform">
                Verifikasi Autentikasi Direksi
              </button>
            </form>
          </div>
        ) : (
          /* ADVANCED DASHBOARD DIREKSI FACTION CONSOLE */
          <div className="space-y-6">
            
            {/* Navigation Tabs Direksi */}
            <div className="flex justify-between items-center bg-slate-900/60 p-2 rounded-2xl border border-white/10 backdrop-blur-md">
              <div className="flex gap-2">
                <button
                  onClick={() => setActiveTab('requests')}
                  className={`px-4 py-2.5 rounded-xl text-xs font-extrabold transition-all flex items-center gap-2 ${activeTab === 'requests' ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/30' : 'text-slate-400 hover:text-white'}`}
                >
                  <i className="fa-solid fa-inbox"></i> Berkas Warga ({pendingCount})
                </button>
                <button
                  onClick={() => setActiveTab('handbook')}
                  className={`px-4 py-2.5 rounded-xl text-xs font-extrabold transition-all flex items-center gap-2 ${activeTab === 'handbook' ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/30' : 'text-slate-400 hover:text-white'}`}
                >
                  <i className="fa-solid fa-book-bookmark"></i> Handbook SOP & Tarif Ekonomi ($5-$45)
                </button>
                <button
                  onClick={() => setActiveTab('memos')}
                  className={`px-4 py-2.5 rounded-xl text-xs font-extrabold transition-all flex items-center gap-2 ${activeTab === 'memos' ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/30' : 'text-slate-400 hover:text-white'}`}
                >
                  <i className="fa-solid fa-paper-plane"></i> Surat Menyurat Direksi ({memos.length})
                </button>
                <button
                  onClick={() => setActiveTab('roster')}
                  className={`px-4 py-2.5 rounded-xl text-xs font-extrabold transition-all flex items-center gap-2 ${activeTab === 'roster' ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/30' : 'text-slate-400 hover:text-white'}`}
                >
                  <i className="fa-solid fa-users-gear"></i> Kelola Anggota ({roster.length})
                </button>
              </div>

              <div className="text-xs font-bold text-amber-400 px-4 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/30">
                <i className="fa-solid fa-user-shield mr-1"></i> DIREKSI: {staffRoleName}
              </div>
            </div>

            {/* TAB 1: BERKAS & LAMARAN WARGA */}
            {activeTab === 'requests' && (
              <div className="space-y-6">
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
                    <div className="text-xs font-bold text-cyan-400 uppercase">TABLET SC-PAD SYNC</div>
                    <div className="text-lg font-black text-cyan-300 mt-1">ONLINE REALTIME</div>
                  </div>
                </div>

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

            {/* TAB 2: HANDBOOK SOP & TARIF PENANGANAN LOW-PAY ECONOMY ($5 - $45) */}
            {activeTab === 'handbook' && (
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-amber-600/20 to-orange-700/20 border border-amber-500/30 rounded-3xl p-7 flex justify-between items-center backdrop-blur-md">
                  <div>
                    <span className="px-3 py-1 rounded-md text-[10px] font-black bg-amber-500/20 text-amber-300 border border-amber-500/40 uppercase">SOP DIREKSI & WHITELIST HANDBOOK</span>
                    <h2 className="text-2xl font-black text-white mt-1">{currentHandbook.title}</h2>
                    <p className="text-xs text-slate-400 mt-1">Panduan standar operasional prosedur & daftar tarif penanganan resmi berdasarkan Ekonomi Low-Pay Kota ($5 - $45).</p>
                  </div>
                  <i className="fa-solid fa-book-open-reader text-4xl text-amber-400"></i>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  {/* SOP Rules */}
                  <div className="bg-slate-900/60 border border-white/10 rounded-3xl p-6 backdrop-blur-md space-y-4">
                    <h4 className="text-sm font-black text-amber-400 uppercase tracking-wider flex items-center gap-2">
                      <i className="fa-solid fa-gavel"></i> Aturan SOP Direksi Instansi
                    </h4>
                    <div className="space-y-3">
                      {currentHandbook.sopRules.map((rule, idx) => (
                        <div key={idx} className="bg-black/40 p-4 rounded-xl border border-white/5 text-xs text-white font-medium flex items-center gap-3">
                          <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-xs">{idx + 1}</span>
                          <span>{rule}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tariff & Penalty Price List ($5 - $45) */}
                  <div className="bg-slate-900/60 border border-white/10 rounded-3xl p-6 backdrop-blur-md space-y-4">
                    <h4 className="text-sm font-black text-emerald-400 uppercase tracking-wider flex items-center gap-2">
                      <i className="fa-solid fa-sack-dollar"></i> Standar Tarif Penanganan / Denda ($5 - $45)
                    </h4>
                    <div className="space-y-3">
                      {currentHandbook.tariffList.map((item, idx) => (
                        <div key={idx} className="bg-black/40 p-4 rounded-xl border border-white/5 flex justify-between items-center text-xs">
                          <span className="text-slate-300 font-medium">{item.service}</span>
                          <strong className="text-emerald-400 font-mono font-black text-sm bg-emerald-500/10 px-3 py-1 rounded-lg border border-emerald-500/30">{item.price}</strong>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: SURAT MENYURAT DIREKSI & INTER-AGENCY MEMO */}
            {activeTab === 'memos' && (
              <div className="space-y-6">
                <div className="bg-slate-900/60 border border-amber-500/30 rounded-3xl p-6 backdrop-blur-md shadow-2xl space-y-4">
                  <h3 className="text-base font-black text-amber-400 flex items-center gap-2">
                    <i className="fa-solid fa-pen-to-square"></i> Form Penerbitan Surat Menyurat & Memo Direksi (Sync Tablet sc-pad)
                  </h3>
                  <form onSubmit={handleCreateMemo} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-bold text-slate-400 uppercase">Judul / Perihal Surat Resmi</label>
                        <input type="text" value={newMemoTitle} onChange={(e) => setNewMemoTitle(e.target.value)} placeholder="Contoh: Himbauan Keamanan & Pengawalan Event KenClub" required className="w-full bg-black/40 border border-white/10 rounded-xl p-3.5 mt-1 text-white text-sm focus:border-amber-500 outline-none" />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-slate-400 uppercase">Instansi Tujuan Surat</label>
                        <select value={newMemoTarget} onChange={(e) => setNewMemoTarget(e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-xl p-3.5 mt-1 text-white text-sm focus:border-amber-500 outline-none">
                          <option>Semua Instansi & Warga Public</option>
                          <option>🚓 Vibe Patrol SCVP (Kepolisian)</option>
                          <option>🚑 Arcane Rescue Center (SAFD Medis)</option>
                          <option>🔧 UltraSpeed Mechanic (Bengkel)</option>
                          <option>💃 KenClub VIP (Nightlife)</option>
                          <option>🏛️ High Council Pemkot (Government)</option>
                        </select>
                      </div>
                      <div className="col-span-2">
                        <label className="text-xs font-bold text-slate-400 uppercase">Isi Pesan Surat Memo Resmi Direksi</label>
                        <textarea value={newMemoContent} onChange={(e) => setNewMemoContent(e.target.value)} placeholder="Tuliskan instruksi atau pengumuman surat resmi instansi..." required className="w-full bg-black/40 border border-white/10 rounded-xl p-3.5 mt-1 text-white text-sm focus:border-amber-500 outline-none h-24"></textarea>
                      </div>
                    </div>
                    <button type="submit" className="w-full bg-gradient-to-r from-amber-500 to-amber-700 text-white font-extrabold p-3.5 rounded-xl shadow-lg shadow-amber-500/30 hover:scale-[1.01] transition-transform">
                       Terbitkan & Kirim Surat Memo Direksi (Auto-Sync to sc-pad Tablet)
                    </button>
                  </form>
                </div>

                <div className="space-y-4">
                  <h4 className="text-sm font-black text-slate-300 uppercase tracking-wider">
                    <i className="fa-solid fa-folder-open text-amber-400 mr-2"></i> DAFTAR ARSIP SURAT RESMI INSTANSI DIREKSI:
                  </h4>
                  <div className="space-y-3">
                    {memos.map((m) => (
                      <div key={m.id} className="bg-slate-900/60 border border-white/10 rounded-2xl p-5 backdrop-blur-md space-y-2">
                        <div className="flex justify-between items-center border-b border-white/10 pb-2">
                          <div className="flex items-center gap-3">
                            <span className="px-2.5 py-1 rounded-md text-[10px] font-mono font-black bg-amber-500/20 text-amber-400 border border-amber-500/40">{m.memoNo}</span>
                            <strong className="text-white text-sm">{m.title}</strong>
                          </div>
                          <span className="text-xs text-emerald-400 font-bold bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/30">{m.status}</span>
                        </div>
                        <div className="flex justify-between text-xs text-slate-400 pt-1">
                          <span><strong>Pengirim:</strong> {m.senderDept}</span>
                          <span><strong>Tujuan:</strong> {m.targetDept}</span>
                          <span><strong>Tanggal:</strong> {m.date}</span>
                        </div>
                        <p className="text-xs text-slate-300 bg-black/40 p-3 rounded-xl border border-white/5">{m.content}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 4: KELOLA ANGGOTA FACTION ROSTER */}
            {activeTab === 'roster' && (
              <div className="space-y-6">
                <div className="bg-slate-900/60 border border-white/10 rounded-3xl overflow-hidden backdrop-blur-md shadow-2xl">
                  <div className="p-5 border-b border-white/10 flex justify-between items-center">
                    <h4 className="text-sm font-black text-white uppercase flex items-center gap-2">
                      <i className="fa-solid fa-users text-amber-400"></i> Faction Member Roster Management (Direct Sync QBCore & sc-pad)
                    </h4>
                    <span className="text-xs text-emerald-400 font-bold">3 Officers Registered</span>
                  </div>
                  <table className="w-full text-left">
                    <thead className="bg-white/5 text-xs text-slate-400 font-bold uppercase border-b border-white/10">
                      <tr>
                        <th className="p-4 px-6">Nama Officer / Staf</th>
                        <th className="p-4 px-6">Citizen ID (CID)</th>
                        <th className="p-4 px-6">Pangkat / Jabatan</th>
                        <th className="p-4 px-6">Total Penanganan Cases</th>
                        <th className="p-4 px-6">Status Game</th>
                        <th className="p-4 px-6">Aksi Direksi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/10 text-sm">
                      {roster.map(member => (
                        <tr key={member.id} className="hover:bg-white/5">
                          <td className="p-4 px-6 font-bold text-white">{member.name}</td>
                          <td className="p-4 px-6 font-mono text-cyan-400 font-bold">{member.cid}</td>
                          <td className="p-4 px-6 text-amber-400 font-semibold">{member.rank}</td>
                          <td className="p-4 px-6 font-bold text-emerald-400 font-mono">{member.casesHandled} Kasus Ditangani</td>
                          <td className="p-4 px-6">
                            <span className={`px-2.5 py-1 rounded-lg text-xs font-black ${member.status === 'ON-DUTY' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' : 'bg-slate-500/20 text-slate-400 border border-slate-500/40'}`}>
                              {member.status}
                            </span>
                          </td>
                          <td className="p-4 px-6 space-x-2">
                            <button onClick={() => handlePromoteRank(member.id)} className="bg-amber-500 hover:bg-amber-400 text-black text-xs font-black px-3 py-1.5 rounded-lg shadow-md">
                              ⭐ Naik Pangkat
                            </button>
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
