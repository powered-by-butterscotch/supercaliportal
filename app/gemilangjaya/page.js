'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function GemilangJayaPage() {
  const [activeTab, setActiveTab] = useState('showroom'); // showroom, battlepass, voucher, packages
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedClassFilter, setSelectedClassFilter] = useState('ALL');
  
  // State Voucher Redeem Player
  const [voucherCode, setVoucherCode] = useState('');
  const [claimResult, setClaimResult] = useState(null);

  const classSummaryData = [
    { classTag: 'S++', title: 'Hypercars / Limited Edition', limit: '205 MPH (~330 km/h)', force: '0.44', mult: '5.0x', count: '18 Mobil (Season 1 Released: 6)', color: 'bg-pink-500/20 text-pink-300 border-pink-500/40' },
    { classTag: 'S', title: 'Supercars / Exotic Sports', limit: '180 MPH (~290 km/h)', force: '0.38', mult: '3.5x', count: '37 Mobil (Season 1 Released: 8)', color: 'bg-purple-500/20 text-purple-300 border-purple-500/40' },
    { classTag: 'A', title: 'Sports Performance & Muscle', limit: '160 MPH (~257 km/h)', force: '0.33', mult: '2.2x', count: '70 Mobil (Season 1 Released: 12)', color: 'bg-blue-500/20 text-blue-300 border-blue-500/40' },
    { classTag: 'B', title: 'Sport Coupes & Performance SUVs', limit: '140 MPH (~225 km/h)', force: '0.28', mult: '1.5x', count: '47 Mobil (Season 1 Released: 10)', color: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' },
    { classTag: 'C', title: 'Executive Sedans & Standard SUVs', limit: '125 MPH (~200 km/h)', force: '0.25', mult: '1.0x', count: '205 Mobil (Season 1 Released: 15)', color: 'bg-amber-500/20 text-amber-300 border-amber-500/40' },
    { classTag: 'D', title: 'Compacts, Hatchbacks & Utility', limit: '100 MPH (~160 km/h)', force: '0.20', mult: '0.7x', count: '11 Mobil (Season 1 Released: 4)', color: 'bg-slate-500/20 text-slate-400 border-slate-500/40' }
  ];

  // PUBLIC SEASON 1 RELEASED CARS (EXCLUSIVES FOR SEASON 1)
  const season1ReleasedChips = {
    'S++': ['2019chiron', 'agerars', 'chironsupersport22', 'jesko', 'laferrariquadturbo', 'senna'],
    'S': ['18performante', '2f2fgtr34', '812mnsry', '911gtrs', 'amggtbs', 'gta5rp_veh_gtr33', 'r820', 'sf90'],
    'A': ['16charger', '18rs7', 'c63hr', 'charger21', 'm3g80', 'm4g82', 'm5cs22', 'mustang65', 'rmodmustang', 'rs7c8beast', 'taycan', 'vantage23'],
    'B': ['1016urus', 'g632019', 'g700brabusretuned', 'g900przemo6x6', 'mansoryg63', 'ramtrx6x6', 'rmodskyline34', 'rx7veilside', 'skyline', 'trx'],
    'C': ['2018s650p', 'bentaygam', 'bmwe39', 'c8', 'civic2020', 'evo9mr', 'fk8', 'gemera', 'gt63mt', 'ikx3mc2021', 'm5e60', 'maybach', 'model3', 'r34h', 'wraith'],
    'D': ['fortwo17', 'GODz61BUS', 'kart', 'van_blacklions']
  };

  const handleClaimVoucher = (e) => {
    e.preventDefault();
    const clean = voucherCode.trim().toUpperCase();
    if (!clean) return;

    if (clean === 'GEMILANG-S1-VIP') {
      setClaimResult({ success: true, title: '✅ VOUCHER VALID & AKTIF!', detail: 'Paket VIP Season 1: Hypercar Chiron + Custom PED Import + Luxury Villa Property + $1,000,000 Cash' });
    } else if (clean === 'PED-SULTAN-2026') {
      setClaimResult({ success: true, title: '✅ VOUCHER VALID!', detail: 'Custom Character PED Import Slot' });
    } else if (clean === 'CHIRON-EXOTIC-2026') {
      setClaimResult({ success: true, title: '✅ VOUCHER VALID!', detail: 'Hypercar Chiron SuperSport 2026 (Class S++)' });
    } else {
      setClaimResult({ success: false, title: '❌ KODE VOUCHER TIDAK VALID', detail: 'Kode voucher salah, kadaluarsa, atau sudah pernah diklaim.' });
    }
  };

  return (
    <div className="min-h-screen bg-[#050713] text-slate-100 font-sans pb-20">
      {/* HEADER GEMILANG JAYA GATE */}
      <header className="sticky top-0 z-50 px-6 py-4 flex flex-col md:flex-row justify-between items-center bg-[#070a1a]/95 backdrop-blur-md border-b border-amber-500/30 gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 bg-gradient-to-br from-amber-500 via-orange-600 to-amber-900 rounded-2xl flex items-center justify-center text-2xl shadow-xl shadow-amber-500/30 text-slate-950 font-black">
            <i className="fa-solid fa-gem"></i>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-black bg-gradient-to-r from-amber-300 via-orange-300 to-yellow-200 bg-clip-text text-transparent">
                GEMILANG JAYA AUTO GROUP
              </h1>
              <span className="bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                SEASON 1 DROPS
              </span>
            </div>
            <p className="text-xs text-slate-400 font-medium">Official Auto Dealer, Battle Pass Season 1, & Code Voucher Redemption Portal</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/adminplenger" className="bg-purple-600/30 hover:bg-purple-600/50 text-purple-300 text-xs font-black px-4 py-2.5 rounded-xl border border-purple-500/40 flex items-center gap-2 transition-all">
            <i className="fa-solid fa-user-shield"></i> Console Direksi Admin
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
                🔥 SEASON 1 FEATURED DROPS
              </span>
              <h2 className="text-3xl font-black text-white leading-tight">
                GEMILANG JAYA AUTO DEALER & BATTLE PASS SEASON 1
              </h2>
              <p className="text-xs text-slate-300 leading-relaxed">
                Rilis Perdana Season 1! Koleksi Showroom Eksklusif In-Game, Custom Character PED Imports, Luxury Property Villa MLO, & Sistem In-Game Claim Code (<code className="text-amber-300 font-bold">/claimcode</code>).
              </p>
            </div>

            <div className="bg-black/60 border border-white/10 p-5 rounded-2xl space-y-2 text-right">
              <div className="text-xs font-bold text-slate-400">IN-GAME REDEEM COMMAND:</div>
              <div className="font-mono text-sm text-cyan-300 font-black bg-slate-900 px-3 py-2 rounded-xl border border-white/10">
                <code>/claimcode [KODE_VOUCHER]</code>
              </div>
            </div>
          </div>
        </div>

        {/* NAVIGATION TABS */}
        <div className="flex flex-wrap gap-2 p-1.5 bg-slate-900/80 border border-white/10 rounded-2xl backdrop-blur-md">
          <button
            onClick={() => setActiveTab('showroom')}
            className={`px-5 py-3 rounded-xl text-xs font-black flex items-center gap-2 transition-all ${
              activeTab === 'showroom' ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/30' : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <i className="fa-solid fa-car-side"></i> Showroom Season 1 Drops
          </button>
          <button
            onClick={() => setActiveTab('battlepass')}
            className={`px-5 py-3 rounded-xl text-xs font-black flex items-center gap-2 transition-all ${
              activeTab === 'battlepass' ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/30' : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <i className="fa-solid fa-trophy"></i> Battle Pass Season 1 (50 Tiers)
          </button>
          <button
            onClick={() => setActiveTab('voucher')}
            className={`px-5 py-3 rounded-xl text-xs font-black flex items-center gap-2 transition-all ${
              activeTab === 'voucher' ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/30' : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <i className="fa-solid fa-ticket"></i> Penukaran Kode Voucher
          </button>
          <button
            onClick={() => setActiveTab('packages')}
            className={`px-5 py-3 rounded-xl text-xs font-black flex items-center gap-2 transition-all ${
              activeTab === 'packages' ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/30' : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <i className="fa-solid fa-gem"></i> Paket Donasi VIP Gemilang
          </button>
        </div>

        {/* TAB 1: SHOWROOM KATALOG MOBIL (SEASON 1 RELEASED + MYSTERY LOCKED TEASER) */}
        {activeTab === 'showroom' && (
          <div className="space-y-6">
            <div className="bg-slate-900/80 border border-white/10 rounded-3xl p-6 backdrop-blur-md shadow-2xl space-y-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-white/10 pb-4">
                <div>
                  <h3 className="text-base font-black text-white flex items-center gap-2">
                    <i className="fa-solid fa-car text-amber-400"></i> Katalog Release Season 1 (Rilis Bertahap)
                  </h3>
                  <p className="text-xs text-slate-400">Koleksi mobil Season 1 yang sudah rilis & dapat dibeli IC atau diklaim via Voucher Donasi.</p>
                </div>
                
                <div className="flex items-center gap-3 w-full md:w-auto">
                  <select
                    value={selectedClassFilter}
                    onChange={(e) => setSelectedClassFilter(e.target.value)}
                    className="bg-black/50 border border-white/10 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-amber-400"
                  >
                    <option value="ALL">Semua Class (S++ s/d D)</option>
                    <option value="S++">Class S++ Only</option>
                    <option value="S">Class S Only</option>
                    <option value="A">Class A Only</option>
                    <option value="B">Class B Only</option>
                    <option value="C">Class C Only</option>
                    <option value="D">Class D Only</option>
                  </select>

                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Cari Mobil Season 1..."
                    className="bg-black/50 border border-white/10 rounded-xl px-4 py-2 text-xs text-white outline-none focus:border-amber-400 w-full md:w-64"
                  />
                </div>
              </div>

              <div className="space-y-6">
                {classSummaryData
                  .filter(c => selectedClassFilter === 'ALL' || c.classTag === selectedClassFilter)
                  .map((c) => {
                    const rawChips = season1ReleasedChips[c.classTag] || [];
                    const filteredChips = rawChips.filter(chip => chip.toLowerCase().includes(searchQuery.toLowerCase()));

                    return (
                      <div key={c.classTag} className="bg-black/40 border border-white/10 rounded-2xl p-5 space-y-3">
                        <div className="flex justify-between items-center border-b border-white/10 pb-3">
                          <h4 className="text-sm font-black text-white flex items-center gap-2">
                            <span className={`px-2.5 py-1 rounded-md text-xs font-black ${c.color}`}>CLASS {c.classTag}</span>
                            <span>{c.title} (Limit: {c.limit})</span>
                          </h4>
                          <span className="text-xs font-mono font-bold text-amber-300">{filteredChips.length} Released in Season 1</span>
                        </div>

                        <div className="flex flex-wrap gap-2 pt-1">
                          {filteredChips.map((chip, idx) => (
                            <button
                              key={idx}
                              onClick={() => {
                                navigator.clipboard.writeText(`/car ${chip}`);
                                alert(`Spawn command /car ${chip} telah disalin!`);
                              }}
                              title="Klik untuk menyalin spawn command /car"
                              className="bg-slate-900 border border-amber-500/30 hover:border-amber-400 px-3 py-1.5 rounded-xl text-xs font-mono text-cyan-300 hover:text-white transition-all active:scale-95 flex items-center gap-1.5"
                            >
                              <span className="text-[10px] text-amber-400 font-bold">✨ S1</span>
                              <code>{chip}</code>
                            </button>
                          ))}

                          {/* MYSTERY LOCKED TEASER CARDS FOR SEASON 2 */}
                          <div className="bg-slate-950/80 border border-dashed border-white/20 px-3 py-1.5 rounded-xl text-xs font-mono text-slate-500 italic flex items-center gap-1">
                            <i className="fa-solid fa-lock text-amber-500/60"></i>
                            <span>+ Locked Unreleased Drops (Releasing Season 2)</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>

              {/* TEASER BANNER UNTUK SEASON 2 */}
              <div className="bg-gradient-to-r from-purple-950/50 via-slate-900 to-indigo-950/50 border border-purple-500/30 p-6 rounded-2xl text-center space-y-2">
                <div className="text-xs font-black text-purple-300 uppercase tracking-widest flex items-center justify-center gap-2">
                  <i className="fa-solid fa-lock text-amber-400"></i> SEASON 2 & 3 UNCHAINED HYPERCAR PACK
                </div>
                <p className="text-xs text-slate-400">
                  Ratusan kendaraan custom eksklusif lainnya disimpan rapi di Vault Direksi Admin Plenger & akan dirilis secara bertahap setiap update musim baru! 🚀
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
                    <i className="fa-solid fa-trophy text-amber-300"></i> Gemilang Jaya Battle Pass Season 1 (50 Tiers Overview)
                  </h4>
                  <p className="text-xs text-slate-400">Daftar hadiah Battle Pass Musiman untuk Player Regular (Free Pass) & VIP Pass Holders.</p>
                </div>
                <span className="bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-black px-3 py-1 rounded-xl">
                  SEASON 1 LIVE
                </span>
              </div>

              <div className="grid md:grid-cols-3 gap-5 text-xs">
                <div className="bg-black/50 border border-white/10 p-5 rounded-2xl space-y-3">
                  <div className="font-black text-amber-300 text-sm flex justify-between border-b border-white/10 pb-2">
                    <span>Tier 1 - Tier 10</span>
                    <span className="text-[10px] text-slate-400 font-mono">Starter Pack</span>
                  </div>
                  <div className="text-slate-300">✓ Free: Cash $50,000 & Garasi Slot Extra</div>
                  <div className="text-amber-400 font-bold">✓ VIP: Custom Plate 'GEMILANG' + Priority Queue Tier 1</div>
                </div>

                <div className="bg-black/50 border border-white/10 p-5 rounded-2xl space-y-3">
                  <div className="font-black text-amber-300 text-sm flex justify-between border-b border-white/10 pb-2">
                    <span>Tier 20 - Tier 30</span>
                    <span className="text-[10px] text-slate-400 font-mono">Mid Season</span>
                  </div>
                  <div className="text-slate-300">✓ Free: Cash $300,000 & Repair Pack</div>
                  <div className="text-purple-400 font-bold">✓ VIP: Custom Character PED Import Slot + G63 AMG</div>
                </div>

                <div className="bg-black/50 border border-purple-500/40 p-5 rounded-2xl space-y-3 bg-purple-950/20">
                  <div className="font-black text-pink-300 text-sm flex justify-between border-b border-white/10 pb-2">
                    <span>Tier 40 - Tier 50 (MAX)</span>
                    <span className="text-[10px] text-pink-400 font-mono">Grand Finale</span>
                  </div>
                  <div className="text-slate-300">✓ Free: Mobil Class A (Mustang 65)</div>
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
                  <i className="fa-solid fa-ticket"></i>
                </div>
                <h3 className="text-xl font-black text-white">PENUKARAN KODE VOUCHER GEMILANG JAYA</h3>
                <p className="text-xs text-slate-400">Masukkan kode voucher resmi donasi Anda untuk memverifikasi klaim di portal web.</p>
              </div>

              <form onSubmit={handleClaimVoucher} className="space-y-4">
                <div>
                  <input
                    type="text"
                    value={voucherCode}
                    onChange={(e) => setVoucherCode(e.target.value)}
                    placeholder="Contoh: GEMILANG-S1-VIP..."
                    className="w-full bg-black/70 border border-amber-500/40 rounded-2xl p-4 text-center font-mono text-lg text-amber-300 font-bold outline-none focus:border-amber-400"
                  />
                </div>
                <button type="submit" className="w-full bg-gradient-to-r from-amber-500 to-orange-600 text-black font-black p-4 rounded-2xl shadow-xl shadow-amber-500/30 hover:scale-[1.01] transition-transform text-xs">
                  🎁 VERIFIKASI KODE VOUCHER
                </button>
              </form>

              {claimResult && (
                <div className={`p-4 rounded-2xl text-xs space-y-1 border ${claimResult.success ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' : 'bg-red-500/20 text-red-300 border-red-500/40'}`}>
                  <div className="font-black text-sm">{claimResult.title}</div>
                  <div>{claimResult.detail}</div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 4: PAKET DONASI VIP GEMILANG */}
        {activeTab === 'packages' && (
          <div className="space-y-6">
            <div className="grid md:grid-cols-4 gap-5">
              <div className="bg-slate-900/90 border border-slate-700 p-5 rounded-3xl space-y-4 hover:border-slate-500 transition-all">
                <div className="space-y-1">
                  <span className="bg-slate-800 text-slate-300 text-[10px] font-black px-2.5 py-1 rounded-md border border-slate-600">SILVER TIER</span>
                  <h4 className="text-xl font-black text-white">Rp 150.000 / $15</h4>
                </div>
                <ul className="text-xs space-y-2 text-slate-300">
                  <li>✓ Priority Queue Join Server (Tier 1)</li>
                  <li>✓ Custom Number Plate Mobil</li>
                  <li>✓ 1x Slot Garasi Tambahan</li>
                  <li>✓ Role Discord VIP Silver</li>
                </ul>
              </div>

              <div className="bg-slate-900/90 border border-amber-500/40 p-5 rounded-3xl space-y-4 hover:border-amber-400 transition-all shadow-lg shadow-amber-500/10">
                <div className="space-y-1">
                  <span className="bg-amber-500/20 text-amber-300 text-[10px] font-black px-2.5 py-1 rounded-md border border-amber-500/40">GOLD TIER</span>
                  <h4 className="text-xl font-black text-amber-300">Rp 350.000 / $35</h4>
                </div>
                <ul className="text-xs space-y-2 text-slate-300">
                  <li>✓ Perks Silver Included</li>
                  <li>✓ 1x Custom Car Import (Class A/B)</li>
                  <li>✓ Priority Queue Join (Tier 2 High)</li>
                  <li>✓ Custom Phone Number (NPWD)</li>
                </ul>
              </div>

              <div className="bg-slate-900/90 border border-purple-500/40 p-5 rounded-3xl space-y-4 hover:border-purple-400 transition-all shadow-xl shadow-purple-500/20 relative overflow-hidden">
                <div className="absolute -right-6 -top-6 w-20 h-20 bg-purple-500/20 rounded-full blur-xl"></div>
                <div className="space-y-1">
                  <span className="bg-purple-500/20 text-purple-300 text-[10px] font-black px-2.5 py-1 rounded-md border border-purple-500/40">PLATINUM TIER</span>
                  <h4 className="text-xl font-black text-purple-300">Rp 750.000 / $75</h4>
                </div>
                <ul className="text-xs space-y-2 text-slate-300">
                  <li>✓ Perks Gold Included</li>
                  <li>✓ 1x Custom Car Class S (Exotic)</li>
                  <li>✓ Custom MLO House Property</li>
                  <li>✓ Gang Turf/Business Import Permit</li>
                </ul>
              </div>

              <div className="bg-gradient-to-b from-pink-950/40 to-slate-900 border border-pink-500/50 p-5 rounded-3xl space-y-4 hover:border-pink-400 transition-all shadow-xl shadow-pink-500/20">
                <div className="space-y-1">
                  <span className="bg-pink-500/20 text-pink-300 text-[10px] font-black px-2.5 py-1 rounded-md border border-pink-500/40">SUPREME BOSS</span>
                  <h4 className="text-xl font-black text-pink-300">Rp 1.500.000 / $150</h4>
                </div>
                <ul className="text-xs space-y-2 text-slate-300">
                  <li>✓ Perks Platinum Included</li>
                  <li>✓ 1x Hypercar Class S++ (Agera/Chiron)</li>
                  <li>✓ Custom Character PED Import Slot</li>
                  <li>✓ VIP Mansion Custom MLO</li>
                  <li>✓ Badge Direksi & VIP Plenger Club</li>
                </ul>
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
