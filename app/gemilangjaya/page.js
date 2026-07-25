'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function GemilangJayaPage() {
  const [activeTab, setActiveTab] = useState('showroom'); // showroom, battlepass, voucher, packages
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedClassFilter, setSelectedClassFilter] = useState('ALL');
  
  // State Citizen Identity Sync from /warga
  const [citizenSession, setCitizenSession] = useState(null);

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

  // State Toast Notification System (NO MORE ANCIENT BROWSER ALERTS!)
  const [toastNotification, setToastNotification] = useState(null);

  const showToast = (message, type = 'info') => {
    setToastNotification({ message, type });
    setTimeout(() => setToastNotification(null), 5000);
  };


  // State Voucher Redeem Player
  const [voucherCode, setVoucherCode] = useState('');
  const [claimResult, setClaimResult] = useState(null);

  const classSummaryData = [
    { classTag: 'S++', title: 'Lowkey Hypercars / Limited Edition', limit: '205 MPH (~330 km/h)', force: '0.44', mult: '5.0x', count: '18 Mobil (Season 1 Drops: 6)', color: 'bg-pink-500/20 text-pink-300 border-pink-500/40' },
    { classTag: 'S', title: 'Exotic Supercars / Flex Mode', limit: '180 MPH (~290 km/h)', force: '0.38', mult: '3.5x', count: '37 Mobil (Season 1 Drops: 8)', color: 'bg-purple-500/20 text-purple-300 border-purple-500/40' },
    { classTag: 'A', title: 'Sports Performance & Pure Muscle', limit: '160 MPH (~257 km/h)', force: '0.33', mult: '2.2x', count: '70 Mobil (Season 1 Drops: 12)', color: 'bg-blue-500/20 text-blue-300 border-blue-500/40' },
    { classTag: 'B', title: 'Sport Coupes & Street SUVs', limit: '140 MPH (~225 km/h)', force: '0.28', mult: '1.5x', count: '47 Mobil (Season 1 Drops: 10)', color: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' },
    { classTag: 'C', title: 'Daily Sedans & Cozy Rides', limit: '125 MPH (~200 km/h)', force: '0.25', mult: '1.0x', count: '205 Mobil (Season 1 Drops: 15)', color: 'bg-amber-500/20 text-amber-300 border-amber-500/40' },
    { classTag: 'D', title: 'Economical Compacts & Fun Utility', limit: '100 MPH (~160 km/h)', force: '0.20', mult: '0.7x', count: '11 Mobil (Season 1 Drops: 4)', color: 'bg-slate-500/20 text-slate-400 border-slate-500/40' }
  ];

  // PUBLIC SEASON 1 RELEASED CARS
  const season1ReleasedChips = {
    'S++': ['2019chiron', 'agerars', 'chironsupersport22', 'jesko', 'laferrariquadturbo', 'senna'],
    'S': ['18performante', '2f2fgtr34', '812mnsry', '911gtrs', 'amggtbs', 'gta5rp_veh_gtr33', 'r820', 'sf90'],
    'A': ['16charger', '18rs7', 'c63hr', 'charger21', 'm3g80', 'm4g82', 'm5cs22', 'mustang65', 'rmodmustang', 'rs7c8beast', 'taycan', 'vantage23'],
    'B': ['1016urus', 'g632019', 'g700brabusretuned', 'g900przemo6x6', 'mansoryg63', 'ramtrx6x6', 'rmodskyline34', 'rx7veilside', 'skyline', 'trx'],
    'C': ['2018s650p', 'bentaygam', 'bmwe39', 'c8', 'civic2020', 'evo9mr', 'fk8', 'gemera', 'gt63mt', 'ikx3mc2021', 'm5e60', 'maybach', 'model3', 'r34h', 'wraith'],
    'D': ['fortwo17', 'GODz61BUS', 'kart', 'van_blacklions']
  };

  const saveClaimToStorage = (itemObj) => {
    if (typeof window !== 'undefined') {
      const existing = localStorage.getItem('supercali_claimed_vouchers');
      let list = [];
      if (existing) {
        try { list = JSON.parse(existing); } catch (e) {}
      }
      list = [itemObj, ...list];
      localStorage.setItem('supercali_claimed_vouchers', JSON.stringify(list));
    }
  };

  const DEFAULT_VOUCHER_DB = [
    { code: 'GEMILANG-S1-VIP', type: 'MULTI', title: 'Gemilang Jaya VIP Season 1 Bundle', detail: 'Paket VIP Season 1: Hypercar Chiron + Custom PED Import + Luxury Villa Property + $1,000,000 Cash IC', vehicleCode: '2019chiron', isUsed: false, usedBy: null, date: '2026-07-25' },
    { code: 'PED-SULTAN-2026', type: 'PED', title: 'Custom Character PED Import Slot', detail: 'Slot Character Custom PED Import (sc-ped)', vehicleCode: 'sc-ped-slot', isUsed: false, usedBy: null, date: '2026-07-25' },
    { code: 'CHIRON-EXOTIC-2026', type: 'CHIRON', title: 'Bugatti Chiron SuperSport 2026', detail: 'Bugatti Chiron SuperSport 2026 (Class S++ Speed Demon)', vehicleCode: '2019chiron', isUsed: false, usedBy: null, date: '2026-07-25' },
    { code: 'VILLAMLO-402', type: 'VILLA', title: 'MLO Villa Gang HQ #402', detail: 'MLO Villa Gang HQ #402 (ps-housing)', vehicleCode: 'mlo-house-402', isUsed: false, usedBy: null, date: '2026-07-25' }
  ];

  const handleClaimVoucher = (e) => {
    e.preventDefault();
    const clean = voucherCode.trim().toUpperCase();
    if (!clean) return;

    let db = DEFAULT_VOUCHER_DB;
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('supercali_voucher_database');
      if (saved) {
        try { db = JSON.parse(saved); } catch (e) {}
      }
    }

    const index = db.findIndex(v => v.code.toUpperCase() === clean);
    if (index === -1) {
      setClaimResult({ success: false, title: '❌ KODE VOUCHER WRONG ATAU TIDAK ADA!', detail: 'Coba re-check kodenya brodie, pastiin typo-free yaa!' });
      showToast("❌ Kode Voucher tidak ditemukan di Database Kota!", "error");
      return;
    }

    const voucher = db[index];
    if (voucher.isUsed) {
      setClaimResult({ success: false, title: '❌ VOUCHER SUDAH PERNAH DIKLAIM!', detail: `Kode Voucher '${voucher.code}' sudah pernah digunakan oleh ${voucher.usedBy || 'Warga lain'}.` });
      showToast(`❌ Voucher sudah pernah diklaim oleh ${voucher.usedBy || 'Warga lain'}!`, "error");
      return;
    }

    // Mark as used & bind to active citizen
    const redeemerName = citizenSession ? `${citizenSession.icName} (CID: ${citizenSession.cid})` : 'Warga Anonymous';
    db[index].isUsed = true;
    db[index].usedBy = redeemerName;

    const claimObj = {
      code: voucher.vehicleCode || 'custom_reward',
      title: voucher.title,
      classTag: 'S++',
      detail: voucher.detail,
      redeemedDate: new Date().toISOString().split('T')[0]
    };

    if (typeof window !== 'undefined') {
      localStorage.setItem('supercali_voucher_database', JSON.stringify(db));
      saveClaimToStorage(claimObj);
    }

    setClaimResult({ success: true, title: '✨ SLAYYY! VOUCHER VALID & AKTIF!', detail: `Selamat ${redeemerName}! ${voucher.title} (${voucher.detail}) berhasil dikirim ke KTP/Garasi kamu!` });
    showToast(`✨ BERHASIL KLAIM: ${voucher.title}! Masuk ke Garasi / KTP kamu!`, "success");
  };



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

      {/* HEADER GEMILANG JAYA GATE */}
      <header className="sticky top-0 z-50 px-6 py-4 flex flex-col md:flex-row justify-between items-center bg-[#070a1a]/95 backdrop-blur-md border-b border-amber-500/30 gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 bg-gradient-to-br from-amber-400 via-orange-500 to-amber-700 rounded-2xl flex items-center justify-center text-2xl shadow-xl shadow-amber-500/30 text-slate-950 font-black animate-bounce">
            ✨
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-black bg-gradient-to-r from-amber-300 via-pink-400 to-yellow-200 bg-clip-text text-transparent">
                GEMILANG JAYA AUTO GROUP 🇦🇺🇺🇸
              </h1>
              <span className="bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                SEASON 1 DROPS • REAL NO FAKE
              </span>
            </div>
            <p className="text-xs text-slate-400 font-medium">Boutique Showroom, Battle Pass Slay Season 1 & Code Voucher Hub</p>
          </div>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          {citizenSession ? (
            <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1.5 rounded-xl text-xs">
              <span className="font-black text-white">{citizenSession.icName}</span>
              <span className="bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded font-mono font-bold text-[10px]">
                {citizenSession.cid}
              </span>
              <Link href="/warga/dashboard" className="bg-emerald-500/20 hover:bg-emerald-500/40 text-emerald-300 font-bold px-2 py-1 rounded text-[11px] ml-1">
                ⚙️ Dashboard
              </Link>
              <button
                onClick={() => {
                  if (typeof window !== 'undefined') localStorage.removeItem('supercali_citizen_session');
                  setCitizenSession(null);
                  showToast("Logout KTP Berhasil!", "info");
                }}
                className="text-red-400 hover:text-red-300 font-bold text-[11px] ml-1"
                title="Logout KTP"
              >
                🔒 Logout
              </button>
            </div>
          ) : (
            <Link href="/warga" className="bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 text-xs font-bold px-3 py-2 rounded-xl">
              💳 Login KTP
            </Link>
          )}

          <Link href="/adminplenger" className="bg-purple-600/30 hover:bg-purple-600/50 text-purple-300 text-xs font-black px-4 py-2.5 rounded-xl border border-purple-500/40 flex items-center gap-2 transition-all">
            👑 Secret Admin Gate
          </Link>
          <Link href="/" className="bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-300 px-4 py-2.5 rounded-xl border border-white/10 transition-colors">
            ← City Hub
          </Link>
        </div>

      </header>

      <main className="max-w-7xl mx-auto mt-6 px-4 md:px-6 space-y-6">
        
        {/* HERO BRANDING GEMILANG JAYA */}
        <div className="bg-gradient-to-r from-amber-950/70 via-purple-950/60 to-slate-900 border border-amber-500/40 p-8 rounded-3xl backdrop-blur-xl shadow-2xl relative overflow-hidden space-y-4">
          <div className="absolute -right-10 -top-10 w-60 h-60 bg-amber-500/10 rounded-full blur-3xl"></div>
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="space-y-2 max-w-2xl">
              <span className="bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-black px-3 py-1 rounded-lg">
                🔥 SEASON 1 DROPS • VIBES MELBOURNE X LA
              </span>
              <h2 className="text-3xl font-black text-white leading-tight">
                WELCOME TO GEMILANG JAYA AUTO DEALER! ✨
              </h2>
              <p className="text-xs text-slate-300 leading-relaxed">
                Tempat nongkrong & beli mobil paling aesthetic di Supercali RP! Dari daily cruiser sampe hypercar flex mode, plus Battle Pass 50 Tiers yang slay abis. Donasi berkelas, benefit langsung tumpah-tumpah! fr fr 💅🔥
              </p>
            </div>

            <div className="bg-black/60 border border-white/10 p-5 rounded-2xl space-y-2 text-right">
              <div className="text-[10px] font-black text-slate-400 uppercase">Season 1 Status</div>
              <div className="text-sm font-black text-emerald-400 flex items-center justify-end gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
                <span>65 CAR DROPS LIVE</span>
              </div>
              <div className="text-[11px] text-amber-300 font-mono font-bold">50 Battle Pass Tiers Active</div>
            </div>
          </div>
        </div>

        {/* CITIZEN IDENTITY INTEGRATION STATUS BAR */}
        <div className="bg-slate-900/90 border border-emerald-500/40 p-4 rounded-2xl backdrop-blur-md flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          {citizenSession ? (
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-emerald-500/20 border border-emerald-500/40 rounded-xl flex items-center justify-center text-emerald-300 font-bold">
                💳
              </div>
              <div className="text-xs">
                <div className="text-slate-400 font-bold">Terverifikasi KTP Warga Supercali:</div>
                <div className="font-black text-white flex items-center gap-2">
                  <span>{citizenSession.icName}</span>
                  <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-2 py-0.5 rounded text-[10px] font-mono">
                    CID: {citizenSession.cid}
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-amber-500/20 border border-amber-500/40 rounded-xl flex items-center justify-center text-amber-300 font-bold">
                💡
              </div>
              <div className="text-xs">
                <div className="text-white font-bold">Belum Login KTP Warga / Discord ID?</div>
                <div className="text-slate-400">Bikin KTP IC dulu biar donasi & mobil otomatis masuk ke garasi in-game kamu no ribet!</div>
              </div>
            </div>
          )}

          <Link
            href="/warga"
            className={`text-xs font-black px-4 py-2 rounded-xl transition-transform active:scale-95 ${
              citizenSession
                ? 'bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40'
                : 'bg-gradient-to-r from-amber-400 to-orange-500 text-slate-950 shadow-lg shadow-amber-500/20'
            }`}
          >
            {citizenSession ? '💳 KTP Warga Active ✓' : '⚡ Login KTP Warga Now →'}
          </Link>
        </div>

        {/* NAVIGATION TABS */}

        <div className="flex flex-wrap gap-3 p-2 bg-slate-900/80 border border-white/10 rounded-2xl backdrop-blur-md">
          <button
            onClick={() => setActiveTab('showroom')}
            className={`px-5 py-3 rounded-xl text-xs font-black flex items-center gap-2 transition-all ${
              activeTab === 'showroom' ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/30' : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            🏎️ Showroom Katalog Season 1
          </button>
          <button
            onClick={() => setActiveTab('battlepass')}
            className={`px-5 py-3 rounded-xl text-xs font-black flex items-center gap-2 transition-all ${
              activeTab === 'battlepass' ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/30' : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            🏆 Battle Pass Slay (50 Tiers)
          </button>
          <button
            onClick={() => setActiveTab('voucher')}
            className={`px-5 py-3 rounded-xl text-xs font-black flex items-center gap-2 transition-all ${
              activeTab === 'voucher' ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/30' : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            🎟️ Tuker Kode Voucher
          </button>
          <button
            onClick={() => setActiveTab('packages')}
            className={`px-5 py-3 rounded-xl text-xs font-black flex items-center gap-2 transition-all ${
              activeTab === 'packages' ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/30' : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            💎 Skema Donasi Sultan & Usaha
          </button>
        </div>

        {/* TAB 1: SHOWROOM KATALOG SEASON 1 */}
        {activeTab === 'showroom' && (
          <div className="space-y-6">
            <div className="bg-slate-900/80 border border-white/10 rounded-3xl p-6 backdrop-blur-md shadow-2xl space-y-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-white/10 pb-4">
                <div>
                  <h3 className="text-lg font-black text-white flex items-center gap-2">
                    🏎️ Katalog Season 1 Released Cars (65 Featured Vehicles)
                  </h3>
                  <p className="text-xs text-slate-400">Pilih mobil impian kamu! Sisa 323 mobil dirahasiakan & akan di-drop bertahap di Season 2 & 3.</p>
                </div>

                <div className="flex items-center gap-3 w-full md:w-auto">
                  <select
                    value={selectedClassFilter}
                    onChange={(e) => setSelectedClassFilter(e.target.value)}
                    className="bg-black/60 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white outline-none focus:border-amber-400"
                  >
                    <option value="ALL">Semua Class (S++ s/d D)</option>
                    <option value="S++">Class S++ (Hypercars)</option>
                    <option value="S">Class S (Supercars)</option>
                    <option value="A">Class A (Sports & Muscle)</option>
                    <option value="B">Class B (Coupe & SUV)</option>
                    <option value="C">Class C (Sedan & Daily)</option>
                    <option value="D">Class D (Compacts)</option>
                  </select>

                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Cari Kode Mobil (misal: chiron)..."
                    className="bg-black/60 border border-white/10 rounded-xl px-4 py-2 text-xs text-white outline-none focus:border-amber-400 w-full md:w-60"
                  />
                </div>
              </div>

              <div className="space-y-6">
                {classSummaryData
                  .filter(c => selectedClassFilter === 'ALL' || c.classTag === selectedClassFilter)
                  .map((c) => {
                    const releasedChips = season1ReleasedChips[c.classTag] || [];
                    const filteredChips = releasedChips.filter(chip => chip.toLowerCase().includes(searchQuery.toLowerCase()));

                    return (
                      <div key={c.classTag} className="bg-black/40 border border-white/10 rounded-2xl p-5 space-y-3">
                        <div className="flex justify-between items-center border-b border-white/10 pb-3">
                          <h4 className="text-sm font-black text-white flex items-center gap-2">
                            <span className={`px-2.5 py-1 rounded-md text-xs font-black ${c.color}`}>CLASS {c.classTag}</span>
                            <span>{c.title}</span>
                          </h4>
                          <span className="text-xs font-mono font-bold text-amber-300">{filteredChips.length} Drops Released</span>
                        </div>

                        <div className="flex flex-wrap gap-2.5 pt-1">
                          {filteredChips.map((chip, idx) => (
                            <button
                              key={idx}
                              onClick={() => {
                                navigator.clipboard.writeText(`/car ${chip}`);
                                showToast(`Spawn code '/car ${chip}' telah disalin brodie!`, "success");
                              }}
                              title="Klik buat salin spawn command"
                              className="bg-slate-900 border border-amber-500/30 hover:border-amber-400 px-3 py-1.5 rounded-xl text-xs font-mono text-cyan-300 hover:text-white transition-all active:scale-95 flex items-center gap-1.5"
                            >
                              <span className="text-[10px] text-amber-400 font-bold">✨ S1</span>
                              <code>{chip}</code>
                            </button>
                          ))}

                          <div className="bg-slate-950/80 border border-dashed border-white/20 px-3 py-1.5 rounded-xl text-xs font-mono text-slate-500 italic flex items-center gap-1">
                            🔒 + Locked Drops (Wait Season 2 Brody!)
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>

              <div className="bg-gradient-to-r from-purple-950/50 via-slate-900 to-indigo-950/50 border border-purple-500/30 p-6 rounded-2xl text-center space-y-2">
                <div className="text-xs font-black text-purple-300 uppercase tracking-widest flex items-center justify-center gap-2">
                  🔒 SEASON 2 & 3 UNCHAINED PACK IS COMING SOON!
                </div>
                <p className="text-xs text-slate-400">
                  Koleksi ride rahasia lainnya lagi disimpan rapi & bakal di-drop bertahap tiap ganti season! Stay tuned real no fake! 💅✨
                </p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: BATTLE PASS SEASON 1 (50 TIERS) */}
        {activeTab === 'battlepass' && (
          <div className="space-y-6">
            <div className="bg-slate-900/80 border border-white/10 rounded-3xl p-6 backdrop-blur-md space-y-4 shadow-xl">
              <div className="flex justify-between items-center border-b border-white/10 pb-3">
                <div>
                  <h4 className="text-base font-black text-white flex items-center gap-2">
                    🏆 Battle Pass Slay Season 1 (50 Tiers Overview)
                  </h4>
                  <p className="text-xs text-slate-400">Grind tier & klaim rewards gemash buat Free Pass & VIP Holders!</p>
                </div>
                <span className="bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-black px-3 py-1 rounded-xl">
                  SEASON 1 LIVE • SLAY IT
                </span>
              </div>

              <div className="grid md:grid-cols-3 gap-5 text-xs">
                <div className="bg-black/50 border border-white/10 p-5 rounded-2xl space-y-3">
                  <div className="font-black text-amber-300 text-sm flex justify-between border-b border-white/10 pb-2">
                    <span>Tier 1 - Tier 10</span>
                    <span className="text-[10px] text-slate-400 font-mono">Starter Vibes</span>
                  </div>
                  <div className="text-slate-300">✓ Free: Cash IC $50,000 & Bonus Garage Slot</div>
                  <div className="text-amber-400 font-bold">✓ VIP: Plate 'GEMILANG' + Priority Queue Tier 1 (Anti Antre)</div>
                </div>

                <div className="bg-black/50 border border-white/10 p-5 rounded-2xl space-y-3">
                  <div className="font-black text-amber-300 text-sm flex justify-between border-b border-white/10 pb-2">
                    <span>Tier 20 - Tier 30</span>
                    <span className="text-[10px] text-slate-400 font-mono">Mid Season Flex</span>
                  </div>
                  <div className="text-slate-300">✓ Free: Cash IC $300,000 & Repair Kit Pack</div>
                  <div className="text-purple-400 font-bold">✓ VIP: Custom Character PED Import Slot + Mercedes G63 AMG</div>
                </div>

                <div className="bg-black/50 border border-purple-500/40 p-5 rounded-2xl space-y-3 bg-purple-950/20">
                  <div className="font-black text-pink-300 text-sm flex justify-between border-b border-white/10 pb-2">
                    <span>Tier 40 - Tier 50 (MAX)</span>
                    <span className="text-[10px] text-pink-400 font-mono">Grand Finale Slay</span>
                  </div>
                  <div className="text-slate-300">✓ Free: Sporty Mustang 65</div>
                  <div className="text-pink-400 font-black">✓ VIP: HYPERCAR CHIRON / JESKO + Luxury Villa Property</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: PENUKARAN KODE VOUCHER */}
        {activeTab === 'voucher' && (
          <div className="space-y-6">
            <div className="max-w-xl mx-auto bg-slate-900/90 border border-amber-500/40 p-8 rounded-3xl backdrop-blur-xl shadow-2xl space-y-6">
              <div className="text-center space-y-2">
                <div className="w-16 h-16 bg-amber-500/20 border border-amber-500/40 rounded-2xl mx-auto flex items-center justify-center text-3xl text-amber-300">
                  🎟️
                </div>
                <h3 className="text-xl font-black text-white">PENUKARAN KODE VOUCHER GEMILANG JAYA</h3>
                <p className="text-xs text-slate-400">Masukin kode voucher donasi kamu brodie buat verifikasi di sini!</p>
              </div>

              <form onSubmit={handleClaimVoucher} className="space-y-4">
                <div>
                  <input
                    type="text"
                    value={voucherCode}
                    onChange={(e) => setVoucherCode(e.target.value)}
                    placeholder="Masukkan Kode Voucher (misal: GEMILANG-S1-VIP)..."
                    className="w-full bg-black/60 border border-amber-500/40 rounded-2xl p-4 text-center font-mono text-amber-300 font-bold text-lg tracking-wider outline-none focus:border-amber-400"
                  />
                </div>
                <button type="submit" className="w-full bg-gradient-to-r from-amber-400 via-orange-500 to-amber-600 text-slate-950 font-black p-4 rounded-2xl shadow-xl shadow-amber-500/30 hover:scale-[1.01] transition-transform text-sm">
                  🎁 KLAIM VOUCHER GEMILANG NOW!
                </button>
              </form>

              {claimResult && (
                <div className={`p-5 rounded-2xl text-xs space-y-1 border ${claimResult.success ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' : 'bg-red-500/20 text-red-300 border-red-500/40'}`}>
                  <div className="font-black text-sm">{claimResult.title}</div>
                  <div className="text-slate-300">{claimResult.detail}</div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 4: PAKET DONASI SULTAN & PERMIT USAHA */}
        {activeTab === 'packages' && (
          <div className="space-y-6">
            
            <div className="bg-slate-900/80 border border-amber-500/30 p-6 rounded-3xl backdrop-blur-md space-y-2">
              <h3 className="text-lg font-black text-amber-300 flex items-center gap-2">
                💎 SKEMA DONASI EKSKLUSIF & VALUASI TINGGI (REAL NO FAKE)
              </h3>
              <p className="text-xs text-slate-300">
                Aset kustom premium, server high-performance, & pengawalan VIP berkelas. Investasi nyata untuk pengalaman RP paling epic di Indonesia & Internasional! 🔥
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
              
              {/* SILVER TIER */}
              <div className="bg-slate-900/90 border border-slate-700 p-5 rounded-3xl space-y-4 hover:border-slate-500 transition-all">
                <div className="space-y-1">
                  <span className="bg-slate-800 text-slate-300 text-[10px] font-black px-2.5 py-1 rounded-md border border-slate-600">SILVER TIER • EXECUTIVE ACCESS</span>
                  <h4 className="text-xl font-black text-white">Rp 1.500.000 <span className="text-xs text-slate-400 font-mono">(~$100.00 USD)</span></h4>
                </div>
                <ul className="text-xs space-y-2 text-slate-300">
                  <li>✓ Anti Antre! Priority Queue Join (Tier 1)</li>
                  <li>✓ Custom Number Plate Mobil 'GEMILANG'</li>
                  <li>✓ 1x Slot Extra Garasi Mobil</li>
                  <li>✓ Badge Role Discord VIP Silver</li>
                </ul>
              </div>

              {/* GOLD TIER */}
              <div className="bg-slate-900/90 border border-amber-500/40 p-5 rounded-3xl space-y-4 hover:border-amber-400 transition-all shadow-lg shadow-amber-500/10">
                <div className="space-y-1">
                  <span className="bg-amber-500/20 text-amber-300 text-[10px] font-black px-2.5 py-1 rounded-md border border-amber-500/40">GOLD TIER • HIGH DEMAND</span>
                  <h4 className="text-xl font-black text-amber-300">Rp 4.500.000 <span className="text-xs text-amber-400/70 font-mono">(~$300.00 USD)</span></h4>
                </div>
                <ul className="text-xs space-y-2 text-slate-300">
                  <li>✓ Perks Silver Included</li>
                  <li>✓ 1x Custom Import Car (Class A / B)</li>
                  <li>✓ Priority Queue Join (Tier 2 High)</li>
                  <li>✓ Custom Nomot HP Cantik (NPWD)</li>
                </ul>
              </div>

              {/* PLATINUM TIER */}
              <div className="bg-slate-900/90 border border-purple-500/40 p-5 rounded-3xl space-y-4 hover:border-purple-400 transition-all shadow-xl shadow-purple-500/20 relative overflow-hidden">
                <div className="absolute -right-6 -top-6 w-20 h-20 bg-purple-500/20 rounded-full blur-xl"></div>
                <div className="space-y-1">
                  <span className="bg-purple-500/20 text-purple-300 text-[10px] font-black px-2.5 py-1 rounded-md border border-purple-500/40">PLATINUM TIER • AUTO SULTAN</span>
                  <h4 className="text-xl font-black text-purple-300">Rp 10.000.000 <span className="text-xs text-purple-400/70 font-mono">(~$650.00 USD)</span></h4>
                </div>
                <ul className="text-xs space-y-2 text-slate-300">
                  <li>✓ Perks Gold Included</li>
                  <li>✓ 1x Custom Exotic Car Class S</li>
                  <li>✓ Luxury Property Villa MLO</li>
                  <li>✓ Gang Turf / Business Import Permit</li>
                </ul>
              </div>

              {/* SUPREME BOSS TIER */}
              <div className="bg-gradient-to-b from-pink-950/40 to-slate-900 border border-pink-500/50 p-5 rounded-3xl space-y-4 hover:border-pink-400 transition-all shadow-xl shadow-pink-500/20">
                <div className="space-y-1">
                  <span className="bg-pink-500/20 text-pink-300 text-[10px] font-black px-2.5 py-1 rounded-md border border-pink-500/40">SUPREME BOSS • HIGH-ROLLER GOD</span>
                  <h4 className="text-xl font-black text-pink-300">Rp 25.000.000 <span className="text-xs text-pink-400/70 font-mono">(~$1,600.00 USD)</span></h4>
                </div>
                <ul className="text-xs space-y-2 text-slate-300">
                  <li>✓ Perks Platinum Included</li>
                  <li>✓ 1x Hypercar Class S++ (Chiron/Jesko)</li>
                  <li>✓ Custom Character PED Import Slot</li>
                  <li>✓ VIP Mansion Custom Property MLO</li>
                  <li>✓ Badge Direksi & VIP Plenger Club</li>
                </ul>
              </div>

            </div>

            {/* MODUL SEPARATE BUSINESS PURCHASES & ENTERPRISE PERMITS */}
            <div className="bg-gradient-to-r from-purple-950/70 via-slate-900 to-amber-950/70 border border-purple-500/40 p-5 sm:p-7 rounded-3xl backdrop-blur-xl shadow-2xl space-y-4">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-white/10 pb-4">
                <div>
                  <span className="bg-purple-500/20 text-purple-300 border border-purple-500/40 text-[10px] font-black px-2.5 py-1 rounded-md uppercase">
                    🏢 BUSINESS & ENTERPRISE PERMIT (TERPISAH DARI DONASI)
                  </span>
                  <h3 className="text-xl font-black text-white mt-1">Pembelian Franchise & Kepemilikan Usaha Kota ✨</h3>
                  <p className="text-xs text-slate-300">
                    Ingin punya bisnis sendiri di kota (Bengkel, Nightclub, Restaurant, atau Turf Geng)? Transaksi terpisah via kontrak lisensi resmi Direksi Admin Plenger!
                  </p>
                </div>
                <div className="bg-black/50 px-4 py-2 rounded-xl border border-white/10 text-xs font-mono text-amber-300 font-bold">
                  💼 Direct Contract Available
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
                <div className="bg-black/50 border border-white/10 p-4 rounded-2xl space-y-2">
                  <div className="font-black text-cyan-300 text-sm flex justify-between">
                    <span>Commercial Store / Stand</span>
                    <span className="text-emerald-400 font-mono">Rp 5.000.000</span>
                  </div>
                  <p className="text-slate-400">Lisensi minimarket, kedai makanan, atau barbershop kustom dengan MLO eksklusif.</p>
                </div>

                <div className="bg-black/50 border border-white/10 p-4 rounded-2xl space-y-2">
                  <div className="font-black text-amber-300 text-sm flex justify-between">
                    <span>Enterprise Franchise (Mechanic / Nightclub)</span>
                    <span className="text-emerald-400 font-mono">Rp 15.000.000 - Rp 35.000.000</span>
                  </div>
                  <p className="text-slate-400">Kepemilikan penuh bisnis besar seperti UltraSpeed Mechanic, KenClub VIP, atau Burgershot.</p>
                </div>

                <div className="bg-black/50 border border-purple-500/40 p-4 rounded-2xl space-y-2 bg-purple-950/20">
                  <div className="font-black text-pink-300 text-sm flex justify-between">
                    <span>Gang Turf & Monopoly Territory</span>
                    <span className="text-pink-400 font-mono">Custom Contract</span>
                  </div>
                  <p className="text-slate-400">Izin wilayah kekuasaan geng, HQ MLO custom, & monetisasi bisnis wilayah terpilih.</p>
                </div>
              </div>
            </div>


          </div>
        )}

      </main>
    </div>
  );
}
