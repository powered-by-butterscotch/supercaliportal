'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function WargaDashboardPage() {
  const [citizenSession, setCitizenSession] = useState(null);
  const [activeTab, setActiveTab] = useState('ktp'); // ktp, garage, orders, permits

  // Toast Notification System
  const [toastNotification, setToastNotification] = useState(null);

  const showToast = (message, type = 'info') => {
    setToastNotification({ message, type });
    setTimeout(() => setToastNotification(null), 5000);
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('supercali_citizen_session');
      if (saved) {
        try {
          setCitizenSession(JSON.parse(saved));
        } catch (e) {
          console.error("Error parsing citizen session", e);
        }
      }
    }
  }, []);

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('supercali_citizen_session');
    }
    setCitizenSession(null);
    showToast("Logout KTP Warga Berhasil!", "info");
    setTimeout(() => {
      window.location.href = '/warga';
    }, 1000);
  };

  // Mock Active Orders & Garage Assets linked to Citizen Session
  const mockOrders = [
    { id: 'ORD-9912', item: '🏎️ Bugatti Chiron SuperSport 2026 (Class S++)', status: 'INJECTED TO GARAGE', date: '2026-07-25', source: 'Gemilang Jaya Dealer' },
    { id: 'ORD-8821', item: '🏠 MLO Villa Gang HQ #402', status: 'KEYS DELIVERED', date: '2026-07-24', source: 'Gemilang Jaya Real Estate' },
    { id: 'ORD-7710', item: '💎 Donasi Supreme Boss Perks (Rp 25M)', status: 'ACTIVE VIP MEMBER', date: '2026-07-22', source: 'High-Roller Club' }
  ];

  const mockGarage = [
    { code: '2019chiron', name: 'Bugatti Chiron SuperSport', class: 'S++', plate: 'GEMILANG', state: 'Stored in Garage 1' },
    { code: 'g632019', name: 'Mercedes-AMG G63', class: 'B', plate: 'SC 9912', state: 'Stored in Garage 2' },
    { code: 'civic2020', name: 'Honda Civic Type R', class: 'C', plate: 'SC 1022', state: 'Impounded (SCVP)' }
  ];

  return (
    <div className="min-h-screen bg-[#050713] text-slate-100 font-sans pb-20 relative">
      
      {/* GLASSMORPHISM TOAST NOTIFICATION SYSTEM */}
      {toastNotification && (
        <div className="fixed top-5 right-5 z-50 animate-bounce">
          <div className={`p-4 rounded-2xl border backdrop-blur-xl shadow-2xl flex items-center gap-3 text-xs font-black text-white ${
            toastNotification.type === 'error' ? 'bg-red-950/90 border-red-500/50 text-red-300' :
            toastNotification.type === 'success' ? 'bg-emerald-950/90 border-emerald-500/50 text-emerald-300' :
            'bg-amber-950/90 border-amber-500/50 text-amber-300'
          }`}>
            <i className={`text-lg fa-solid ${
              toastNotification.type === 'error' ? 'fa-circle-xmark text-red-400' :
              toastNotification.type === 'success' ? 'fa-circle-check text-emerald-400' :
              'fa-bell text-amber-400'
            }`}></i>
            <span>{toastNotification.message}</span>
          </div>
        </div>
      )}

      {/* HEADER DASHBOARD WARGA */}
      <header className="sticky top-0 z-50 px-6 py-4 flex flex-col md:flex-row justify-between items-center bg-[#070a1a]/95 backdrop-blur-md border-b border-emerald-500/30 gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-700 rounded-2xl flex items-center justify-center text-2xl shadow-xl shadow-emerald-500/30 text-white font-black">
            💳
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-black bg-gradient-to-r from-emerald-300 via-teal-300 to-cyan-300 bg-clip-text text-transparent">
                CITIZEN DASHBOARD WARGA ✨
              </h1>
              <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase">
                OFFICIAL KTP PORTAL
              </span>
            </div>
            <p className="text-xs text-slate-400 font-medium">Personal Identity, Garasi Mobil, & Riwayat Pesanan Gemilang Jaya</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {citizenSession && (
            <button
              onClick={handleLogout}
              className="bg-red-500/20 hover:bg-red-500/30 text-red-300 border border-red-500/40 text-xs font-bold px-3 py-2 rounded-xl transition-colors flex items-center gap-1.5"
            >
              🔒 Logout KTP
            </button>
          )}
          <Link href="/gemilangjaya" className="bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-xs font-bold px-4 py-2 rounded-xl transition-colors">
            💎 Gemilang Jaya
          </Link>
          <Link href="/warga" className="bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-300 px-4 py-2 rounded-xl border border-white/10 transition-colors">
            ← Edit KTP
          </Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto mt-6 px-4 md:px-6 space-y-6">
        
        {/* CITIZEN PROFILE HERO BANNER */}
        <div className="bg-gradient-to-r from-emerald-950/70 via-slate-900 to-teal-950/70 border border-emerald-500/40 p-8 rounded-3xl backdrop-blur-xl shadow-2xl relative overflow-hidden space-y-4">
          <div className="absolute -right-10 -top-10 w-60 h-60 bg-emerald-500/10 rounded-full blur-3xl"></div>

          {citizenSession ? (
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div className="flex items-center gap-5">
                <div className="w-16 h-16 bg-emerald-500/20 border-2 border-emerald-400 rounded-2xl flex items-center justify-center text-3xl text-emerald-300 shadow-xl">
                  👤
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h2 className="text-2xl font-black text-white">{citizenSession.icName}</h2>
                    <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-mono font-bold px-2.5 py-0.5 rounded-lg">
                      CID: {citizenSession.cid}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300">
                    Pekerjaan: <span className="text-emerald-300 font-bold">{citizenSession.job || 'Warga Sipil'}</span> • Phone: <span className="font-mono text-cyan-300">{citizenSession.phone || '0812-9988-1234'}</span>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="bg-black/60 border border-white/10 p-4 rounded-2xl text-right">
                  <div className="text-[10px] font-black text-slate-400 uppercase">Status SIM IC</div>
                  <div className="text-xs font-black text-emerald-400">AKTIF (SIM A & C SLAY)</div>
                </div>
                <div className="bg-black/60 border border-white/10 p-4 rounded-2xl text-right">
                  <div className="text-[10px] font-black text-slate-400 uppercase">Status Warga</div>
                  <div className="text-xs font-black text-amber-300">VERIFIED IC CITIZEN</div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 bg-amber-500/20 border border-amber-500/40 rounded-2xl mx-auto flex items-center justify-center text-3xl text-amber-300">
                💡
              </div>
              <div>
                <h2 className="text-xl font-black text-white">BELUM MEMILIKI SESI KTP WARGA!</h2>
                <p className="text-xs text-slate-400 mt-1">Bikin atau login KTP Warga dulu untuk melihat garasi & riwayat pesanan kamu.</p>
              </div>
              <Link href="/warga" className="inline-block bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-xs font-black px-6 py-3 rounded-xl shadow-lg shadow-emerald-500/30 hover:scale-[1.02] transition-transform">
                ⚡ BUAT KTP WARGA SEKARANG →
              </Link>
            </div>
          )}
        </div>

        {citizenSession && (
          <div className="space-y-6">
            
            {/* NAVIGATION TABS */}
            <div className="flex flex-wrap gap-3 p-2 bg-slate-900/80 border border-white/10 rounded-2xl backdrop-blur-md">
              <button
                onClick={() => setActiveTab('ktp')}
                className={`px-5 py-3 rounded-xl text-xs font-black flex items-center gap-2 transition-all ${
                  activeTab === 'ktp' ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/30' : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                💳 Kartu KTP Digital IC
              </button>
              <button
                onClick={() => setActiveTab('orders')}
                className={`px-5 py-3 rounded-xl text-xs font-black flex items-center gap-2 transition-all ${
                  activeTab === 'orders' ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/30' : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                📦 Riwayat Pesanan & Donasi ({mockOrders.length})
              </button>
              <button
                onClick={() => setActiveTab('garage')}
                className={`px-5 py-3 rounded-xl text-xs font-black flex items-center gap-2 transition-all ${
                  activeTab === 'garage' ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/30' : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                🏎️ Garasi Mobil IC ({mockGarage.length})
              </button>
            </div>

            {/* TAB 1: KARTU KTP DIGITAL IC */}
            {activeTab === 'ktp' && (
              <div className="bg-slate-900/90 border border-emerald-500/40 rounded-3xl p-8 backdrop-blur-xl shadow-2xl space-y-6 max-w-3xl mx-auto">
                <div className="flex justify-between items-start border-b border-white/10 pb-4">
                  <div>
                    <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] font-black px-2.5 py-1 rounded-md uppercase">
                      OFFICIAL STATE IDENTIFICATION CARD
                    </span>
                    <h3 className="text-2xl font-black text-white mt-1">KARTU TANDA KEPENDUDUKAN SUPERCALI</h3>
                  </div>
                  <span className="text-3xl">🏛️</span>
                </div>

                <div className="grid md:grid-cols-2 gap-6 text-xs">
                  <div className="space-y-3">
                    <div>
                      <div className="text-slate-400 font-bold uppercase text-[10px]">Nama Lengkap Character (IC)</div>
                      <div className="text-base font-black text-white">{citizenSession.icName}</div>
                    </div>
                    <div>
                      <div className="text-slate-400 font-bold uppercase text-[10px]">Citizen ID (CID)</div>
                      <div className="text-sm font-mono font-bold text-emerald-300">{citizenSession.cid}</div>
                    </div>
                    <div>
                      <div className="text-slate-400 font-bold uppercase text-[10px]">Tanggal Lahir / Jenis Kelamin</div>
                      <div className="text-sm text-slate-200">{citizenSession.dob || '1998-05-12'} • {citizenSession.gender || 'Laki-laki'}</div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <div className="text-slate-400 font-bold uppercase text-[10px]">Pekerjaan / Instansi</div>
                      <div className="text-sm font-bold text-amber-300">{citizenSession.job || 'Warga Sipil / Penambang'}</div>
                    </div>
                    <div>
                      <div className="text-slate-400 font-bold uppercase text-[10px]">No. Telepon Cantik (NPWD)</div>
                      <div className="text-sm font-mono text-cyan-300">{citizenSession.phone || '0812-9988-1234'}</div>
                    </div>
                    <div>
                      <div className="text-slate-400 font-bold uppercase text-[10px]">Status Medis & Kepolisian</div>
                      <div className="text-xs text-emerald-400 font-bold">✓ Sehat Jasmani (Arcane SAFD) • Clear Criminal Record</div>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10 flex justify-between items-center text-[10px] font-mono text-slate-500">
                  <span>ISSUED BY SUPERCALI HIGH COUNCIL</span>
                  <span>ID: SC-KTP-2026-VERIFIED</span>
                </div>
              </div>
            )}

            {/* TAB 2: RIWAYAT PESANAN & DONASI */}
            {activeTab === 'orders' && (
              <div className="bg-slate-900/80 border border-white/10 rounded-3xl p-6 backdrop-blur-md space-y-4 shadow-xl">
                <div className="flex justify-between items-center border-b border-white/10 pb-3">
                  <div>
                    <h3 className="text-base font-black text-white flex items-center gap-2">
                      📦 Riwayat Pesanan & Klaim Donasi Gemilang Jaya
                    </h3>
                    <p className="text-xs text-slate-400">Daftar transaksi, voucher terpakai, & status klaim aset IC kamu.</p>
                  </div>
                  <span className="bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-black px-3 py-1 rounded-xl">
                    {mockOrders.length} Active Orders
                  </span>
                </div>

                <div className="space-y-3 text-xs">
                  {mockOrders.map((ord) => (
                    <div key={ord.id} className="bg-black/50 border border-white/10 p-4 rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-amber-300 font-bold">{ord.id}</span>
                          <span className="bg-slate-800 text-slate-300 border border-slate-700 text-[10px] px-2 py-0.5 rounded font-bold">
                            {ord.source}
                          </span>
                        </div>
                        <div className="font-black text-white text-sm">{ord.item}</div>
                      </div>

                      <div className="text-right space-y-1">
                        <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] font-black px-2.5 py-1 rounded-lg block">
                          {ord.status}
                        </span>
                        <span className="text-[10px] font-mono text-slate-500">{ord.date}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 3: GARASI MOBIL IC */}
            {activeTab === 'garage' && (
              <div className="bg-slate-900/80 border border-white/10 rounded-3xl p-6 backdrop-blur-md space-y-4 shadow-xl">
                <div className="flex justify-between items-center border-b border-white/10 pb-3">
                  <div>
                    <h3 className="text-base font-black text-white flex items-center gap-2">
                      🏎️ Inventory Garasi Mobil IC ({citizenSession.icName})
                    </h3>
                    <p className="text-xs text-slate-400">Daftar kendaraan yang terdaftar di database `player_vehicles` QBCore.</p>
                  </div>
                  <Link href="/gemilangjaya" className="bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-xs font-bold px-3 py-1.5 rounded-xl">
                    + Tambah Mobil Baru
                  </Link>
                </div>

                <div className="grid md:grid-cols-3 gap-4 text-xs">
                  {mockGarage.map((car, idx) => (
                    <div key={idx} className="bg-black/50 border border-white/10 p-5 rounded-2xl space-y-3">
                      <div className="flex justify-between items-center border-b border-white/10 pb-2">
                        <span className="bg-purple-500/20 text-purple-300 border border-purple-500/40 text-[10px] font-black px-2 py-0.5 rounded">
                          CLASS {car.class}
                        </span>
                        <span className="font-mono text-cyan-300 font-bold">{car.plate}</span>
                      </div>

                      <div>
                        <div className="font-black text-white text-sm">{car.name}</div>
                        <div className="text-[10px] font-mono text-slate-400">Spawn Code: /car {car.code}</div>
                      </div>

                      <div className="text-slate-400 text-[11px] flex justify-between items-center pt-2 border-t border-white/10">
                        <span>Status Garasi:</span>
                        <span className="text-emerald-400 font-bold">{car.state}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        )}

      </main>
    </div>
  );
}
