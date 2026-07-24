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
    { classTag: 'S++', title: 'Hypercars / Limited Edition', limit: '205 MPH (~330 km/h)', force: '0.44', mult: '5.0x', count: '18 Mobil', color: 'bg-pink-500/20 text-pink-300 border-pink-500/40' },
    { classTag: 'S', title: 'Supercars / Exotic Sports', limit: '180 MPH (~290 km/h)', force: '0.38', mult: '3.5x', count: '37 Mobil', color: 'bg-purple-500/20 text-purple-300 border-purple-500/40' },
    { classTag: 'A', title: 'Sports Performance & Muscle', limit: '160 MPH (~257 km/h)', force: '0.33', mult: '2.2x', count: '70 Mobil', color: 'bg-blue-500/20 text-blue-300 border-blue-500/40' },
    { classTag: 'B', title: 'Sport Coupes & Performance SUVs', limit: '140 MPH (~225 km/h)', force: '0.28', mult: '1.5x', count: '47 Mobil', color: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' },
    { classTag: 'C', title: 'Executive Sedans & Standard SUVs', limit: '125 MPH (~200 km/h)', force: '0.25', mult: '1.0x', count: '205 Mobil', color: 'bg-amber-500/20 text-amber-300 border-amber-500/40' },
    { classTag: 'D', title: 'Compacts, Hatchbacks & Utility', limit: '100 MPH (~160 km/h)', force: '0.20', mult: '0.7x', count: '11 Mobil', color: 'bg-slate-500/20 text-slate-400 border-slate-500/40' }
  ];

  const classVehicleChips = {
    'S++': ['2019chiron', 'agerars', 'chironspeedhunter', 'chironsuper', 'chironsupersport22', 'f1', 'f12rp', 'GODzKSTERZOTACHA', 'jesko', 'laferrariquadturbo', 'pagani_zonda_cinque', 'rmodpagani', 'senna', 'sian', 'terzo', 'terzo1'],
    'S': ['18performante', '2f2fgtr34', '488animated', '488mishasp', '488sp', '812mnsry', '911gtrs', 'amggtbs', 'c8p1', 'contgt2011', 'ferrari812super', 'GODzDUKESGT2RSV2', 'gt3hycade', 'gta5rp_veh_gtr33', 'gtr50', 'gtrh', 'ikx3abt20', 'ikx3sf90custom', 'manssupersnake', 'por911gt3', 'r820', 'r8beastedit', 'rmodgtr', 'rmodr8alpil', 'rmodr8alpilx', 'rmodr8c', 'rs6abt20', 'rs6rabt20', 'sf90'],
    'A': ['16charger', '18rs7', '2ncsbmwm8', 'c63hr', 'cayennemecqq', 'charger21', 'chargerf8', 'ckbmwm4offwhite', 'demon', 'evox', 'GODzDEMONUTE', 'GODzVIPS63AMG', 'gta5rp_veh_c63s', 'hellcatf9', 'hellcatlb', 'HellcatMagnum21', 'm3g80', 'm3g80mp', 'm3mafia', 'm3s', 'm4c', 'M4CC', 'm4g82', 'm4hr', 'm4lb2', 'm4speedhunter', 'm5cs22', 'm5e60', 'm5prime', 'm8benzo', 'm8hc', 'mansrs6', 'mercec63s', 'merse63', 'mustang65', 'playaturbozr1', 'rmodcharger', 'rmode63s', 'rmodm3e36', 'rmodm4', 'rmodm4gts', 'rmodm4Unikat', 'rmodmustang', 'rr21shelbystreet', 'rs5mans', 'rs615', 'rs666', 'rs6abtkit', 'rs6c8', 'rs7', 'rs721', 'rs7beast', 'rs7c821', 'rs7c8beast', 'rs7wide', 's63coupe', 's63msc', 'Shelbytacoma4x4', 'taycan', 'taycanani', 'vantage23'],
    'B': ['1016urus', '16topcargle', '2ncsx7', '350z', '6x6', 'a45', 'camaro68t', 'camarodragmachine', 'escaladeprime', 'g632019', 'G63Sam', 'g65', 'g700brabusretuned', 'g81hr', 'g900przemo6x6', 'GODzKRCRX7FD', 'GODzOOF6x6', 'gta5rp_veh_gle1', 'hyundaiveloster', 'manhartx7', 'mansoryg63', 'mansurus', 'q8hycade', 'q8prior', 'ramtrx6x6', 'rmodg65', 'rmodskyline34', 'rmodx6', 'rr21camarowide', 'rx7', 'rx7veilside', 'sex6', 'silviagd', 'skyline', 'trx', 'Urus_Stretch_6', 'urusbeastedit', 'x6wz', 'zx6r'],
    'C': ['1016rwdevo', '17mansorypnmr', '2018s650p', '204spetro', '21sierra', '24mss', '2f2fgts', '74civrswb', '77Monte', '911turbos', 'amrevu23mg', 'animfk8hr', 'banana', 'ben17', 'bentaygam', 'bmwe39', 'boss302', 'boss429', 'c8', 'C8WidebodyLC', 'carboDRCustoM', 'carrera19', 'carsonswbc6', 'cayen19', 'cb650r', 'centuria', 'choilambo', 'chr20', 'civic2020', 'cooperworks', 'cp9a', 'cu2', 'cx30wz', 'daytonasp3', 'dc5', 'DLCyber', 'dzdaytona', 'e39touring', 'e55', 'e92bb', 'EK9', 'eleanor', 'eli', 'evo9', 'evo9mr', 'evoss', 'f450', 'f450c', 'f550rbc', 'f812', 'f8kspider', 'fcxl', 'ffrs', 'FGT', 'firebirdwz', 'fk8', 'fmagnum', 'fnfmits', 'fnfmk4', 'fpaceprior', 'fprotozwb', 'ftecnica', 'furai', 'gcmlamboultimae', 'gemera', 'gl63', 'GLK', 'gmcev2', 'GODz67ELGT500', 'GODz95GSX', 'GODzBMWS1000RR', 'GODzDRIFTCAT', 'GODzHYCADER34', 'GODzRB26SUBI', 'GODzRZRPROLFTD', 'GODzYAMR1', 'gstbird1', 'gsthoonitruck1', 'gt17', 'gt63', 'gt63mt', 'gta5rp_veh_ferrari19', 'gtz34be', 'gxone', 'h2m', 'HellstingerwbSC', 'hexerz2', 'hycadeevo', 'hycadesti', 'ikx3mc2021', 'ikx3rebel22', 'impalag', 'impronta4', 'jcw', 'jcwc', 'jes21', 'kawagala', 'lbwk35', 'lc500', 'lightningdually22', 'loweyezv', 'm135iwb', 'm6e24', 'mach1', 'mache', 'machewb', 'mans65', 'mansgt', 'mayb900', 'maybach', 'mayg600p', 'mgt', 'mi8', 'mlnovitec', 'model', 'model3', 'models', 'modelx', 'mteche39', 'mxpan', 'na6', 'nsx17', 'ocnetrongt', 'ody18', 'owlbelair2', 'oycdefender', 'panamturs21', 'polestar1', 'porche911speedhunter', 'priorgt63s', 'project8', 'r34h', 'r355', 'r35secret', 'rapger19', 'rd', 'revueltobeast', 'rmod240sx', 'rmodbentley1', 'rmodbiposto', 'rmodf40', 'rmodfordgt', 'rmodgt63', 'rmodjeepg', 'rmodr50', 'rmodsvj', 'rmodzl1', 'rrghostbyv', 'rroctane', 'rtruck', 's1', 's15', 's500w222', 's550kev', 's8d4', 'scubieblob', 'SHEL', 'sinacp', 'singer', 'subisti08', 'suv_triaden', 'swl', 'TCZjc', 'techart17', 'teslapd', 'teslaroad', 'thewolftruck', 'tieens', 'topcargt63', 'ToraRTRShow', 'ugcprime350', 'unmarkedjl', 'v60hr', 'variszupra', 'venuum911', 'w222wald', 'waldw222', 'wraith', 'xkgt', 'yoti', 'yzfr6', 'yzfr7', 'zl1', 'zx10r'],
    'D': ['fortwo17', 'GODz61BUS', 'kart', 'mlbrabus', 'RYGBus', 'van_blacklions', 'van_vagos', 'vanzwb06']
  };

  const handleClaimVoucher = (e) => {
    e.preventDefault();
    const clean = voucherCode.trim().toUpperCase();
    if (!clean) return;

    if (clean === 'GEMILANG-S1-VIP') {
      setClaimResult({ success: true, title: '✅ VOUCHER VALID & AKTIF!', detail: 'Paket VIP Season 1: Hypercar Chiron + PED Hash + Villa #402 MLO + $1,000,000 Cash' });
    } else if (clean === 'PED-SULTAN-2026') {
      setClaimResult({ success: true, title: '✅ VOUCHER VALID!', detail: 'Custom PED Import Hash (cs_martinmadrazo)' });
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
                PUBLIC GATE & CATALOG
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
                🏆 OFFICIAL DEALERSHIP & DONATION HUB
              </span>
              <h2 className="text-3xl font-black text-white leading-tight">
                GEMILANG JAYA AUTO DEALER & BATTLE PASS SEASON 1
              </h2>
              <p className="text-xs text-slate-300 leading-relaxed">
                Pusat transaksi kendaraan resmi kota Supercali RP (`jg-dealership`), katalog mobil musiman (388 Vehicles), Custom PED Import (`sc-ped`), MLO Properties (`ps-housing`), dan penukaran voucher in-game (`/claimcode`).
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
            <i className="fa-solid fa-car-side"></i> Showroom Katalog Mobil (388 Vehicles)
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

        {/* TAB 1: SHOWROOM KATALOG MOBIL (388 VEHICLES) */}
        {activeTab === 'showroom' && (
          <div className="space-y-6">
            <div className="bg-slate-900/80 border border-white/10 rounded-3xl p-6 backdrop-blur-md shadow-2xl space-y-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-white/10 pb-4">
                <h3 className="text-base font-black text-white flex items-center gap-2">
                  <i className="fa-solid fa-car text-amber-400"></i> Gemilang Jaya Searchable Vehicle Database (388 Vehicles)
                </h3>
                
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
                    placeholder="Cari Kode Mobil (Contoh: agerars)..."
                    className="bg-black/50 border border-white/10 rounded-xl px-4 py-2 text-xs text-white outline-none focus:border-amber-400 w-full md:w-64"
                  />
                </div>
              </div>

              <div className="space-y-6">
                {classSummaryData
                  .filter(c => selectedClassFilter === 'ALL' || c.classTag === selectedClassFilter)
                  .map((c) => {
                    const rawChips = classVehicleChips[c.classTag] || [];
                    const filteredChips = rawChips.filter(chip => chip.toLowerCase().includes(searchQuery.toLowerCase()));

                    return (
                      <div key={c.classTag} className="bg-black/40 border border-white/10 rounded-2xl p-5 space-y-3">
                        <div className="flex justify-between items-center border-b border-white/10 pb-3">
                          <h4 className="text-sm font-black text-white flex items-center gap-2">
                            <span className={`px-2.5 py-1 rounded-md text-xs font-black ${c.color}`}>CLASS {c.classTag}</span>
                            <span>{c.title} (Limit: {c.limit})</span>
                          </h4>
                          <span className="text-xs font-mono font-bold text-slate-400">{filteredChips.length} Mobil</span>
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
                              className="bg-slate-900 border border-white/10 hover:border-amber-400 px-2.5 py-1 rounded-lg text-xs font-mono text-cyan-300 hover:text-white transition-all active:scale-95"
                            >
                              <code>{chip}</code>
                            </button>
                          ))}
                        </div>
                      </div>
                    );
                  })}
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
                  <div className="text-purple-400 font-bold">✓ VIP: Custom PED Slot (`sc-ped`) + G63 AMG</div>
                </div>

                <div className="bg-black/50 border border-purple-500/40 p-5 rounded-2xl space-y-3 bg-purple-950/20">
                  <div className="font-black text-pink-300 text-sm flex justify-between border-b border-white/10 pb-2">
                    <span>Tier 40 - Tier 50 (MAX)</span>
                    <span className="text-[10px] text-pink-400 font-mono">Grand Finale</span>
                  </div>
                  <div className="text-slate-300">✓ Free: Mobil Class A (Mustang 65)</div>
                  <div className="text-pink-400 font-black">✓ VIP: HYPERCAR CHIRON / JESKO + MLO Villa #402</div>
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
                  <li>✓ Custom MLO House Property (`ps-housing`)</li>
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
                  <li>✓ Custom PED Slot (`sc-ped`)</li>
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
