'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function AdminPlengerPage() {
  const [adminPin, setAdminPin] = useState('');
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const classSummaryData = [
    { classTag: 'S++', title: 'Hypercars / Limited Edition', limit: '205 MPH (~330 km/h)', force: '0.44', mult: '5.0x', count: '18 Mobil', treatment: 'Service W16 Quad-Turbo Engine, Slick Tyres & Ceramic Brakes', color: 'bg-pink-500/20 text-pink-300 border-pink-500/40' },
    { classTag: 'S', title: 'Supercars / Exotic Sports', limit: '180 MPH (~290 km/h)', force: '0.38', mult: '3.5x', count: '37 Mobil', treatment: 'Service V12 Engine Swap, Dual Turbo, High-end Parts', color: 'bg-purple-500/20 text-purple-300 border-purple-500/40' },
    { classTag: 'A', title: 'Sports Performance & Muscle', limit: '160 MPH (~257 km/h)', force: '0.33', mult: '2.2x', count: '70 Mobil', treatment: 'Tuning V8 Engine Swap, Exhaust & Sport Suspension', color: 'bg-blue-500/20 text-blue-300 border-blue-500/40' },
    { classTag: 'B', title: 'Sport Coupes & Performance SUVs', limit: '140 MPH (~225 km/h)', force: '0.28', mult: '1.5x', count: '47 Mobil', treatment: 'Service V6/I4 Turbo Engine & Bodywork', color: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' },
    { classTag: 'C', title: 'Executive Sedans & Standard SUVs', limit: '125 MPH (~200 km/h)', force: '0.25', mult: '1.0x', count: '205 Mobil', treatment: 'Service harian & ganti oli standar', color: 'bg-amber-500/20 text-amber-300 border-amber-500/40' },
    { classTag: 'D', title: 'Compacts, Hatchbacks & Utility', limit: '100 MPH (~160 km/h)', force: '0.20', mult: '0.7x', count: '11 Mobil', treatment: 'Perbaikan ekonomis & perawatan ringan', color: 'bg-slate-500/20 text-slate-400 border-slate-500/40' }
  ];

  const classVehicleChips = {
    'S++': [
      '2019chiron', 'agerars', 'chironspeedhunter', 'chironsuper', 'chironsupersport22', 'f1', 'f12rp', 'GODzKSTERZOTACHA', 'jesko', 'laferrariquadturbo', 'pagani_zonda_cinque', 'rmodpagani', 'senna', 'sian', 'terzo', 'terzo1'
    ],
    'S': [
      '18performante', '2f2fgtr34', '488animated', '488mishasp', '488sp', '812mnsry', '911gtrs', 'amggtbs', 'c8p1', 'contgt2011', 'ferrari812super', 'GODzDUKESGT2RSV2', 'gt3hycade', 'gta5rp_veh_gtr33', 'gtr50', 'gtrh', 'ikx3abt20', 'ikx3sf90custom', 'manssupersnake', 'por911gt3', 'r820', 'r8beastedit', 'rmodgtr', 'rmodr8alpil', 'rmodr8alpilx', 'rmodr8c', 'rs6abt20', 'rs6rabt20', 'sf90'
    ],
    'A': [
      '16charger', '18rs7', '2ncsbmwm8', 'c63hr', 'cayennemecqq', 'charger21', 'chargerf8', 'ckbmwm4offwhite', 'demon', 'evox', 'GODzDEMONUTE', 'GODzVIPS63AMG', 'gta5rp_veh_c63s', 'hellcatf9', 'hellcatlb', 'HellcatMagnum21', 'm3g80', 'm3g80mp', 'm3mafia', 'm3s', 'm4c', 'M4CC', 'm4g82', 'm4hr', 'm4lb2', 'm4speedhunter', 'm5cs22', 'm5e60', 'm5prime', 'm8benzo', 'm8hc', 'mansrs6', 'mercec63s', 'merse63', 'mustang65', 'playaturbozr1', 'rmodcharger', 'rmode63s', 'rmodm3e36', 'rmodm4', 'rmodm4gts', 'rmodm4Unikat', 'rmodmustang', 'rr21shelbystreet', 'rs5mans', 'rs615', 'rs666', 'rs6abtkit', 'rs6c8', 'rs7', 'rs721', 'rs7beast', 'rs7c821', 'rs7c8beast', 'rs7wide', 's63coupe', 's63msc', 'Shelbytacoma4x4', 'taycan', 'taycanani', 'vantage23'
    ],
    'B': [
      '1016urus', '16topcargle', '2ncsx7', '350z', '6x6', 'a45', 'camaro68t', 'camarodragmachine', 'escaladeprime', 'g632019', 'G63Sam', 'g65', 'g700brabusretuned', 'g81hr', 'g900przemo6x6', 'GODzKRCRX7FD', 'GODzOOF6x6', 'gta5rp_veh_gle1', 'hyundaiveloster', 'manhartx7', 'mansoryg63', 'mansurus', 'q8hycade', 'q8prior', 'ramtrx6x6', 'rmodg65', 'rmodskyline34', 'rmodx6', 'rr21camarowide', 'rx7', 'rx7veilside', 'sex6', 'silviagd', 'skyline', 'trx', 'Urus_Stretch_6', 'urusbeastedit', 'x6wz', 'zx6r'
    ],
    'C': [
      '1016rwdevo', '17mansorypnmr', '2018s650p', '204spetro', '21sierra', '24mss', '2f2fgts', '74civrswb', '77Monte', '911turbos', 'amrevu23mg', 'animfk8hr', 'banana', 'ben17', 'bentaygam', 'bmwe39', 'boss302', 'boss429', 'c8', 'C8WidebodyLC', 'carboDRCustoM', 'carrera19', 'carsonswbc6', 'cayen19', 'cb650r', 'centuria', 'choilambo', 'chr20', 'civic2020', 'cooperworks', 'cp9a', 'cu2', 'cx30wz', 'daytonasp3', 'dc5', 'DLCyber', 'dzdaytona', 'e39touring', 'e55', 'e92bb', 'EK9', 'eleanor', 'eli', 'evo9', 'evo9mr', 'evoss', 'f450', 'f450c', 'f550rbc', 'f812', 'f8kspider', 'fcxl', 'ffrs', 'FGT', 'firebirdwz', 'fk8', 'fmagnum', 'fnfmits', 'fnfmk4', 'fpaceprior', 'fprotozwb', 'ftecnica', 'furai', 'gcmlamboultimae', 'gemera', 'gl63', 'GLK', 'gmcev2', 'GODz67ELGT500', 'GODz95GSX', 'GODzBMWS1000RR', 'GODzDRIFTCAT', 'GODzHYCADER34', 'GODzRB26SUBI', 'GODzRZRPROLFTD', 'GODzYAMR1', 'gstbird1', 'gsthoonitruck1', 'gt17', 'gt63', 'gt63mt', 'gta5rp_veh_ferrari19', 'gtz34be', 'gxone', 'h2m', 'HellstingerwbSC', 'hexerz2', 'hycadeevo', 'hycadesti', 'ikx3mc2021', 'ikx3rebel22', 'impalag', 'impronta4', 'jcw', 'jcwc', 'jes21', 'kawagala', 'lbwk35', 'lc500', 'lightningdually22', 'loweyezv', 'm135iwb', 'm6e24', 'mach1', 'mache', 'machewb', 'mans65', 'mansgt', 'mayb900', 'maybach', 'mayg600p', 'mgt', 'mi8', 'mlnovitec', 'model', 'model3', 'models', 'modelx', 'mteche39', 'mxpan', 'na6', 'nsx17', 'ocnetrongt', 'ody18', 'owlbelair2', 'oycdefender', 'panamturs21', 'polestar1', 'porche911speedhunter', 'priorgt63s', 'project8', 'r34h', 'r355', 'r35secret', 'rapger19', 'rd', 'revueltobeast', 'rmod240sx', 'rmodbentley1', 'rmodbiposto', 'rmodf40', 'rmodfordgt', 'rmodgt63', 'rmodjeepg', 'rmodr50', 'rmodsvj', 'rmodzl1', 'rrghostbyv', 'rroctane', 'rtruck', 's1', 's15', 's500w222', 's550kev', 's8d4', 'scubieblob', 'SHEL', 'sinacp', 'singer', 'subisti08', 'suv_triaden', 'swl', 'TCZjc', 'techart17', 'teslapd', 'teslaroad', 'thewolftruck', 'tieens', 'topcargt63', 'ToraRTRShow', 'ugcprime350', 'unmarkedjl', 'v60hr', 'variszupra', 'venuum911', 'w222wald', 'waldw222', 'wraith', 'xkgt', 'yoti', 'yzfr6', 'yzfr7', 'zl1', 'zx10r'
    ],
    'D': [
      'fortwo17', 'GODz61BUS', 'kart', 'mlbrabus', 'RYGBus', 'van_blacklions', 'van_vagos', 'vanzwb06'
    ]
  };

  const handleAdminAuth = (e) => {
    e.preventDefault();
    if (adminPin === '7777' || adminPin === '1234' || adminPin === 'plenger') {
      setIsAuthorized(true);
    } else {
      alert("AKSES ADMIN PLENGER DITOLAK! PIN Rahasia Salah.");
    }
  };

  return (
    <div className="min-h-screen">
      {/* Header Khusus Secret Admin Plenger Gate */}
      <header className="sticky top-0 z-50 px-8 py-4 flex justify-between items-center bg-[#060812]/90 backdrop-blur-md border-b border-purple-500/40">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 bg-gradient-to-br from-purple-600 to-indigo-900 rounded-xl flex items-center justify-center text-xl shadow-lg shadow-purple-500/30 text-white font-black">
            <i className="fa-solid fa-crown"></i>
          </div>
          <div>
            <h1 className="text-xl font-black bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 bg-clip-text text-transparent">
              Katalog & Laporan Kalibrasi Kendaraan Supercali RP (388 Mobil)
            </h1>
            <p className="text-xs text-slate-400 font-medium">Rekapitulasi Lengkap 388 Kendaraan Kota Beserta Pembagian Kasta Performa & Tarif Mekanik</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button onClick={() => window.print()} className="bg-purple-500 hover:bg-purple-400 text-white text-xs font-extrabold px-4 py-2 rounded-xl shadow-lg shadow-purple-500/30">
            🖨️ Print / Export PDF
          </button>
          <Link href="/" className="text-xs font-bold text-slate-400 hover:text-white transition-colors">
            ← City Hub
          </Link>
        </div>
      </header>

      <main className="max-w-6xl mx-auto my-9 px-6 space-y-6">
        {!isAuthorized ? (
          /* SECRET LOGIN GATE */
          <div className="max-w-md mx-auto my-16 bg-slate-900/80 border border-purple-500/40 rounded-3xl p-8 backdrop-blur-md shadow-2xl text-center space-y-6">
            <div className="w-16 h-16 bg-purple-500/20 border border-purple-500/40 rounded-2xl mx-auto flex items-center justify-center text-3xl text-purple-400 shadow-lg shadow-purple-500/20">
              <i className="fa-solid fa-lock text-purple-400"></i>
            </div>
            <div className="space-y-1">
              <h3 className="text-xl font-black text-white">SECRET ADMIN PLENGER PORTAL</h3>
              <p className="text-xs text-slate-400">Halaman ini khusus internal Admin Plenger High Management. Masukkan PIN Rahasia (7777 / 1234).</p>
            </div>

            <form onSubmit={handleAdminAuth} className="space-y-4">
              <div>
                <input
                  type="password"
                  value={adminPin}
                  onChange={(e) => setAdminPin(e.target.value)}
                  placeholder="Masukkan PIN Rahasia Plenger..."
                  required
                  className="w-full bg-black/60 border border-purple-500/40 rounded-xl p-4 text-white text-center font-mono text-lg outline-none focus:border-purple-400"
                />
              </div>
              <button type="submit" className="w-full bg-gradient-to-r from-purple-600 to-indigo-800 text-white font-black p-4 rounded-xl shadow-lg shadow-purple-500/30 hover:scale-[1.01] transition-transform">
                Masuk Dashboard Admin Plenger
              </button>
            </form>
          </div>
        ) : (
          /* FULL HTML REPORT DATASET (388 VEHICLES) */
          <div className="space-y-6">
            
            {/* STATS SUMMARY METRICS */}
            <div className="grid grid-cols-4 gap-5">
              <div className="bg-slate-900/60 border border-white/10 rounded-2xl p-5 backdrop-blur-md">
                <div className="text-3xl font-black text-purple-400">388</div>
                <div className="text-xs font-bold text-slate-400 mt-1 uppercase">Total Mobil Custom Kota</div>
              </div>
              <div className="bg-slate-900/60 border border-white/10 rounded-2xl p-5 backdrop-blur-md">
                <div className="text-3xl font-black text-purple-400">6 Class</div>
                <div className="text-xs font-bold text-slate-400 mt-1 uppercase">Kasta Performa (S++ s/d D)</div>
              </div>
              <div className="bg-slate-900/60 border border-white/10 rounded-2xl p-5 backdrop-blur-md">
                <div className="text-3xl font-black text-cyan-400">205 MPH</div>
                <div className="text-xs font-bold text-slate-400 mt-1 uppercase">Limit Kecepatan S++ (~330 km/h)</div>
              </div>
              <div className="bg-slate-900/60 border border-white/10 rounded-2xl p-5 backdrop-blur-md">
                <div className="text-3xl font-black text-emerald-400">0.7x - 5.0x</div>
                <div className="text-xs font-bold text-slate-400 mt-1 uppercase">Multiplier Biaya Mekanik</div>
              </div>
            </div>

            {/* RINGKASAN STRUKTUR KASTA TABLE */}
            <div className="bg-slate-900/60 border border-white/10 rounded-3xl overflow-hidden backdrop-blur-md shadow-2xl p-6 space-y-4">
              <h3 className="text-base font-black text-white flex items-center gap-2 border-b border-white/10 pb-3">
                <i className="fa-solid fa-[#000] fa-list"></i> Ringkasan Struktur Kasta Kecepatan & Biaya Mekanik
              </h3>
              <table className="w-full text-left">
                <thead className="bg-white/5 text-xs text-slate-400 font-bold uppercase border-b border-white/10">
                  <tr>
                    <th className="p-3.5">Class</th>
                    <th className="p-3.5">Kategori Kendaraan</th>
                    <th className="p-3.5">Max Speed</th>
                    <th className="p-3.5">Force (Acc)</th>
                    <th className="p-3.5">Multiplier Mekanik</th>
                    <th className="p-3.5">Jumlah Mobil</th>
                    <th className="p-3.5">Treatment Bengkel</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10 text-xs">
                  {classSummaryData.map((c, i) => (
                    <tr key={i} className="hover:bg-white/5">
                      <td className="p-3.5"><span className={`px-2.5 py-1 rounded-md font-black ${c.color}`}>{c.classTag}</span></td>
                      <td className="p-3.5 font-bold text-white">{c.title}</td>
                      <td className="p-3.5 font-mono text-cyan-400 font-bold">{c.limit}</td>
                      <td className="p-3.5 font-mono text-slate-300">{c.force}</td>
                      <td className="p-3.5 font-mono font-black text-emerald-400">{c.mult}</td>
                      <td className="p-3.5 font-bold text-purple-300">{c.count}</td>
                      <td className="p-3.5 text-slate-400">{c.treatment}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* DAFTAR LENGKAP KENDARAAN KOTA BERDASARKAN CLASS (388 VEHICLES) */}
            <div className="bg-slate-900/60 border border-white/10 rounded-3xl p-6 backdrop-blur-md shadow-2xl space-y-6">
              <div className="flex justify-between items-center border-b border-white/10 pb-4">
                <h3 className="text-base font-black text-white flex items-center gap-2">
                  <i className="fa-solid fa-car-side text-purple-400"></i> Daftar Lengkap Kendaraan Kota Berdasarkan Class (388 Vehicles)
                </h3>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Cari Kode Mobil (Contoh: agerars)..."
                  className="bg-black/40 border border-white/10 rounded-xl px-4 py-2 text-xs text-white outline-none focus:border-purple-400 w-64"
                />
              </div>

              <div className="space-y-6">
                {classSummaryData.map((c) => {
                  const rawChips = classVehicleChips[c.classTag] || [];
                  const filteredChips = rawChips.filter(chip => chip.toLowerCase().includes(searchQuery.toLowerCase()));

                  return (
                    <div key={c.classTag} className="bg-black/40 border border-white/10 rounded-2xl p-5 space-y-3">
                      <div className="flex justify-between items-center border-b border-white/10 pb-3">
                        <h4 className="text-sm font-black text-white flex items-center gap-2">
                          <span className={`px-2.5 py-1 rounded-md text-xs font-black ${c.color}`}>CLASS {c.classTag}</span>
                          <span>{c.title} (Limit: {c.limit})</span>
                        </h4>
                        <span className="text-xs font-mono font-bold text-slate-400">{filteredChips.length} Kendaraan Loaded</span>
                      </div>

                      <div className="flex flex-wrap gap-2 pt-1">
                        {filteredChips.map((chip, idx) => (
                          <span key={idx} className="bg-slate-900 border border-white/10 px-2.5 py-1 rounded-lg text-xs font-mono text-cyan-300 hover:border-purple-400 transition-colors">
                            <code>{chip}</code>
                          </span>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        )}
      </main>
    </div>
  );
}
