'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function AdminPlengerPage() {
  const [adminPin, setAdminPin] = useState('');
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [userRole, setUserRole] = useState({
    code: 'GUEST',
    title: 'Guest',
    badge: 'GUEST',
    color: 'bg-slate-500/20 text-slate-300 border-slate-500/40',
    canDelete: false,
    canEdit: false,
    canIssueReward: false,
    allowedTabs: []
  });
  const [activeTab, setActiveTab] = useState('overview'); // overview, hierarchy, rewards, weapons, sanctions, commands, donation_system, vehicles

  // State Search & Filter Kendaraan
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedClassFilter, setSelectedClassFilter] = useState('ALL');

  // State Command Generator
  const [cmdPlayerId, setCmdPlayerId] = useState('1');
  const [cmdParam, setCmdParam] = useState('police 3');
  const [cmdType, setCmdType] = useState('setjob');

  // State Hirarki (Editable)
  const [hierarchyList, setHierarchyList] = useState([
    { id: 1, name: 'Kenxzo / Plenger Boss', role: 'Owner / Founder', tier: 'FOUNDER', discord: 'kenxzo#0001', identifier: 'steam:110000117cbe324', aceGroup: 'group.admin', status: 'ACTIVE', perkCount: 'Unlimited' },
    { id: 2, name: 'Rian Plenger', role: 'Head Admin & Ops Lead', tier: 'HIGH_MANAGEMENT', discord: 'rian_plenger#7777', identifier: 'license:4482910aaa9912', aceGroup: 'group.admin', status: 'ACTIVE', perkCount: 'Full Access' },
    { id: 3, name: 'Budi Mekanik', role: 'Lead Economy & Vehicle Dev', tier: 'HIGH_MANAGEMENT', discord: 'budi_sc#1234', identifier: 'license:1182390bbb8823', aceGroup: 'group.admin', status: 'ACTIVE', perkCount: 'Vehicle & Shop' },
    { id: 4, name: 'Dimas Support', role: 'Senior Moderator & Ticket Lead', tier: 'STAFF_ADMIN', discord: 'dimas_mod#4321', identifier: 'license:8832910ccc2211', aceGroup: 'group.mod', status: 'ACTIVE', perkCount: 'Ticket & Report' },
    { id: 5, name: 'Sultan_Donatur_01', role: 'Donatur Platinum (Sultan Kota)', tier: 'DONATUR_PLATINUM', discord: 'sultan_rp#9999', identifier: 'license:9981273ddd4455', aceGroup: 'group.support', status: 'ACTIVE', perkCount: 'Custom Mansion + Chiron' },
    { id: 6, name: 'Gangs_Leader_Vagos', role: 'Donatur Gold & Turf License', tier: 'DONATUR_GOLD', discord: 'vagos_boss#5555', identifier: 'license:7736128eee6677', aceGroup: 'user', status: 'ACTIVE', perkCount: 'Custom PED + Turf MLO' }
  ]);

  // Form State untuk Tambah/Edit Hirarki
  const [showMemberModal, setShowMemberModal] = useState(false);
  const [newMember, setNewMember] = useState({
    name: '', role: '', tier: 'STAFF_ADMIN', discord: '', identifier: '', aceGroup: 'group.mod', status: 'ACTIVE', perkCount: '-'
  });

  // State Reward & RP Target Claims
  const [rewardClaims, setRewardClaims] = useState([
    { id: 101, recipient: 'Dimas Support', type: 'CUSTOM_PED', detail: 'PED Hash: cs_martinmadrazo', reason: 'Reward Staff RP (Resolusi 100 Tiket)', status: 'APPROVED', date: '2026-07-20' },
    { id: 102, recipient: 'Sultan_Donatur_01', type: 'DONASI_MOBIL', detail: 'Vehicle: agerars (Koenigsegg Agera RS)', reason: 'Paket Donasi Supreme Boss ($150)', status: 'INJECTED', date: '2026-07-22' },
    { id: 103, recipient: 'Gangs_Leader_Vagos', type: 'RUMAH_CUSTOM', detail: 'MLO House ID: 402 (Vagos Gang HQ)', reason: 'Claim Perks Donatur Turf Gang', status: 'INJECTED', date: '2026-07-24' }
  ]);

  // Form Reward Selector State
  const [newReward, setNewReward] = useState({
    recipient: '', type: 'DONASI_MOBIL', vehicleCode: 'agerars', pedHash: '', houseId: '', cashAmount: '500000', reason: ''
  });

  // Dataset Kalibrasi Senjata (sc-weapondamage)
  const weaponDamageData = [
    { name: 'Pistol / Glock 17/19', hash: 'WEAPON_GLOCK17 / WEAPON_COMBATPISTOL', faction: 'PD / Police Duties', modifier: '1.0x', TTK: '4-5 Tembakan (Body)', recoil: 'Sedang / Linear' },
    { name: 'Special Carbine / M4A1', hash: 'WEAPON_M4 / WEAPON_CARBINERIFLE', faction: 'PD SWAT / SRT Unit', modifier: '1.3x', TTK: '3-4 Tembakan (Body)', recoil: 'Rendah-Sedang' },
    { name: 'AK-47 / Draco Rifle', hash: 'WEAPON_AK47 / WEAPON_ASSAULTRIFLE', faction: 'Criminal Gangs (Heavy)', modifier: '1.4x', TTK: '3-4 Tembakan (Body)', recoil: 'Tinggi (Kaliber 7.62)' },
    { name: 'Micro SMG / TEC-9', hash: 'WEAPON_MICROSMG / WEAPON_MACHINEPISTOL', faction: 'Gang Drive-By / Street', modifier: '0.8x', TTK: '5-7 Tembakan (Body)', recoil: 'Sangat Tinggi (Fire-rate 900rpm)' },
    { name: 'Remington / Pump Shotgun', hash: 'WEAPON_PUMPSHOTGUN', faction: 'PD Patrol / Crime Defense', modifier: '1.5x', TTK: '1-2 Tembakan (Close Range)', recoil: 'Staggering / Knockdown' }
  ];

  // Dataset Rulebook & Sanksi Admin
  const sanctionMatrix = [
    { violation: 'RDM (Random Deathmatch)', severity: 'TINGGI', firstOffense: 'Warn 1 + Jail 60 Menit', secondOffense: 'Ban Temp 3 Hari', repeatOffense: 'Ban Permanent' },
    { violation: 'VDM (Vehicle Deathmatch)', severity: 'SEDANG-TINGGI', firstOffense: 'Jail 30 Menit + Sita Mobil', secondOffense: 'Ban Temp 2 Hari', repeatOffense: 'Ban Temp 7 Hari' },
    { violation: 'FailRP / Out of Character (OOC) Abuse', severity: 'SEDANG', firstOffense: 'Teguran + Warn 1', secondOffense: 'Jail 45 Menit', repeatOffense: 'Ban Temp 3 Hari' },
    { violation: 'Combat Logging / Quit saat RP Active', severity: 'TINGGI', firstOffense: 'Ban Temp 3 Hari', secondOffense: 'Ban Temp 7 Hari', repeatOffense: 'Ban Permanent' },
    { violation: 'Metagaming / Stream Sniping', severity: 'KRITIS', firstOffense: 'Ban Temp 7 Hari', secondOffense: 'Ban Permanent', repeatOffense: 'Ban Permanent' },
    { violation: 'Cheating / Mod Menu (`mxi_sentinental`)', severity: 'FATAL', firstOffense: 'Ban Permanent (Global HWID)', secondOffense: 'Blacklist Server', repeatOffense: 'No Unban' }
  ];

  // Dataset Kalibrasi Mobil 388 Vehicles
  const classSummaryData = [
    { classTag: 'S++', title: 'Hypercars / Limited Edition', limit: '205 MPH (~330 km/h)', force: '0.44', mult: '5.0x', count: '18 Mobil', treatment: 'Service W16 Quad-Turbo Engine, Slick Tyres & Ceramic Brakes', color: 'bg-pink-500/20 text-pink-300 border-pink-500/40' },
    { classTag: 'S', title: 'Supercars / Exotic Sports', limit: '180 MPH (~290 km/h)', force: '0.38', mult: '3.5x', count: '37 Mobil', treatment: 'Service V12 Engine Swap, Dual Turbo, High-end Parts', color: 'bg-purple-500/20 text-purple-300 border-purple-500/40' },
    { classTag: 'A', title: 'Sports Performance & Muscle', limit: '160 MPH (~257 km/h)', force: '0.33', mult: '2.2x', count: '70 Mobil', treatment: 'Tuning V8 Engine Swap, Exhaust & Sport Suspension', color: 'bg-blue-500/20 text-blue-300 border-blue-500/40' },
    { classTag: 'B', title: 'Sport Coupes & Performance SUVs', limit: '140 MPH (~225 km/h)', force: '0.28', mult: '1.5x', count: '47 Mobil', treatment: 'Service V6/I4 Turbo Engine & Bodywork', color: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' },
    { classTag: 'C', title: 'Executive Sedans & Standard SUVs', limit: '125 MPH (~200 km/h)', force: '0.25', mult: '1.0x', count: '205 Mobil', treatment: 'Service harian & ganti oli standar', color: 'bg-amber-500/20 text-amber-300 border-amber-500/40' },
    { classTag: 'D', title: 'Compacts, Hatchbacks & Utility', limit: '100 MPH (~160 km/h)', force: '0.20', mult: '0.7x', count: '11 Mobil', treatment: 'Perbaikan ekonomis & perawatan ringan', color: 'bg-slate-500/20 text-slate-400 border-slate-500/40' }
  ];

  const classVehicleChips = {
    'S++': ['2019chiron', 'agerars', 'chironspeedhunter', 'chironsuper', 'chironsupersport22', 'f1', 'f12rp', 'GODzKSTERZOTACHA', 'jesko', 'laferrariquadturbo', 'pagani_zonda_cinque', 'rmodpagani', 'senna', 'sian', 'terzo', 'terzo1'],
    'S': ['18performante', '2f2fgtr34', '488animated', '488mishasp', '488sp', '812mnsry', '911gtrs', 'amggtbs', 'c8p1', 'contgt2011', 'ferrari812super', 'GODzDUKESGT2RSV2', 'gt3hycade', 'gta5rp_veh_gtr33', 'gtr50', 'gtrh', 'ikx3abt20', 'ikx3sf90custom', 'manssupersnake', 'por911gt3', 'r820', 'r8beastedit', 'rmodgtr', 'rmodr8alpil', 'rmodr8alpilx', 'rmodr8c', 'rs6abt20', 'rs6rabt20', 'sf90'],
    'A': ['16charger', '18rs7', '2ncsbmwm8', 'c63hr', 'cayennemecqq', 'charger21', 'chargerf8', 'ckbmwm4offwhite', 'demon', 'evox', 'GODzDEMONUTE', 'GODzVIPS63AMG', 'gta5rp_veh_c63s', 'hellcatf9', 'hellcatlb', 'HellcatMagnum21', 'm3g80', 'm3g80mp', 'm3mafia', 'm3s', 'm4c', 'M4CC', 'm4g82', 'm4hr', 'm4lb2', 'm4speedhunter', 'm5cs22', 'm5e60', 'm5prime', 'm8benzo', 'm8hc', 'mansrs6', 'mercec63s', 'merse63', 'mustang65', 'playaturbozr1', 'rmodcharger', 'rmode63s', 'rmodm3e36', 'rmodm4', 'rmodm4gts', 'rmodm4Unikat', 'rmodmustang', 'rr21shelbystreet', 'rs5mans', 'rs615', 'rs666', 'rs6abtkit', 'rs6c8', 'rs7', 'rs721', 'rs7beast', 'rs7c821', 'rs7c8beast', 'rs7wide', 's63coupe', 's63msc', 'Shelbytacoma4x4', 'taycan', 'taycanani', 'vantage23'],
    'B': ['1016urus', '16topcargle', '2ncsx7', '350z', '6x6', 'a45', 'camaro68t', 'camarodragmachine', 'escaladeprime', 'g632019', 'G63Sam', 'g65', 'g700brabusretuned', 'g81hr', 'g900przemo6x6', 'GODzKRCRX7FD', 'GODzOOF6x6', 'gta5rp_veh_gle1', 'hyundaiveloster', 'manhartx7', 'mansoryg63', 'mansurus', 'q8hycade', 'q8prior', 'ramtrx6x6', 'rmodg65', 'rmodskyline34', 'rmodx6', 'rr21camarowide', 'rx7', 'rx7veilside', 'sex6', 'silviagd', 'skyline', 'trx', 'Urus_Stretch_6', 'urusbeastedit', 'x6wz', 'zx6r'],
    'C': ['1016rwdevo', '17mansorypnmr', '2018s650p', '204spetro', '21sierra', '24mss', '2f2fgts', '74civrswb', '77Monte', '911turbos', 'amrevu23mg', 'animfk8hr', 'banana', 'ben17', 'bentaygam', 'bmwe39', 'boss302', 'boss429', 'c8', 'C8WidebodyLC', 'carboDRCustoM', 'carrera19', 'carsonswbc6', 'cayen19', 'cb650r', 'centuria', 'choilambo', 'chr20', 'civic2020', 'cooperworks', 'cp9a', 'cu2', 'cx30wz', 'daytonasp3', 'dc5', 'DLCyber', 'dzdaytona', 'e39touring', 'e55', 'e92bb', 'EK9', 'eleanor', 'eli', 'evo9', 'evo9mr', 'evoss', 'f450', 'f450c', 'f550rbc', 'f812', 'f8kspider', 'fcxl', 'ffrs', 'FGT', 'firebirdwz', 'fk8', 'fmagnum', 'fnfmits', 'fnfmk4', 'fpaceprior', 'fprotozwb', 'ftecnica', 'furai', 'gcmlamboultimae', 'gemera', 'gl63', 'GLK', 'gmcev2', 'GODz67ELGT500', 'GODz95GSX', 'GODzBMWS1000RR', 'GODzDRIFTCAT', 'GODzHYCADER34', 'GODzRB26SUBI', 'GODzRZRPROLFTD', 'GODzYAMR1', 'gstbird1', 'gsthoonitruck1', 'gt17', 'gt63', 'gt63mt', 'gta5rp_veh_ferrari19', 'gtz34be', 'gxone', 'h2m', 'HellstingerwbSC', 'hexerz2', 'hycadeevo', 'hycadesti', 'ikx3mc2021', 'ikx3rebel22', 'impalag', 'impronta4', 'jcw', 'jcwc', 'jes21', 'kawagala', 'lbwk35', 'lc500', 'lightningdually22', 'loweyezv', 'm135iwb', 'm6e24', 'mach1', 'mache', 'machewb', 'mans65', 'mansgt', 'mayb900', 'maybach', 'mayg600p', 'mgt', 'mi8', 'mlnovitec', 'model', 'model3', 'models', 'modelx', 'mteche39', 'mxpan', 'na6', 'nsx17', 'ocnetrongt', 'ody18', 'owlbelair2', 'oycdefender', 'panamturs21', 'polestar1', 'porche911speedhunter', 'priorgt63s', 'project8', 'r34h', 'r355', 'r35secret', 'rapger19', 'rd', 'revueltobeast', 'rmod240sx', 'rmodbentley1', 'rmodbiposto', 'rmodf40', 'rmodfordgt', 'rmodgt63', 'rmodjeepg', 'rmodr50', 'rmodsvj', 'rmodzl1', 'rrghostbyv', 'rroctane', 'rtruck', 's1', 's15', 's500w222', 's550kev', 's8d4', 'scubieblob', 'SHEL', 'sinacp', 'singer', 'subisti08', 'suv_triaden', 'swl', 'TCZjc', 'techart17', 'teslapd', 'teslaroad', 'thewolftruck', 'tieens', 'topcargt63', 'ToraRTRShow', 'ugcprime350', 'unmarkedjl', 'v60hr', 'variszupra', 'venuum911', 'w222wald', 'waldw222', 'wraith', 'xkgt', 'yoti', 'yzfr6', 'yzfr7', 'zl1', 'zx10r'],
    'D': ['fortwo17', 'GODz61BUS', 'kart', 'mlbrabus', 'RYGBus', 'van_blacklions', 'van_vagos', 'vanzwb06']
  };

  // MULTI-TIER SECRET PIN AUTHENTICATION SYSTEM WITH ROLE VISIBILITY
  const handleAdminAuth = (e) => {
    e.preventDefault();
    const cleanPin = adminPin.trim().toLowerCase();

    // 👑 TIER 1: OWNER / FOUNDER (PLENGER BOSS - YOU)
    if (cleanPin === 'plengerboss99' || cleanPin === '987654' || cleanPin === 'boss#7726') {
      setUserRole({
        code: 'OWNER',
        title: 'Plenger Boss (Owner & Founder)',
        badge: '👑 OWNER / FOUNDER PLENGER',
        color: 'bg-gradient-to-r from-pink-500 to-rose-600 text-white border-pink-400',
        canDelete: true,
        canEdit: true,
        canIssueReward: true,
        allowedTabs: ['overview', 'hierarchy', 'rewards', 'weapons', 'sanctions', 'commands', 'donation_system', 'vehicles']
      });
      setActiveTab('overview');
      setIsAuthorized(true);
    } 
    // 🔥 TIER 2: HIGH MANAGEMENT STAFF
    else if (cleanPin === 'mgmtsc2026' || cleanPin === 'mgmt4321') {
      setUserRole({
        code: 'HIGH_MGMT',
        title: 'High Management Staff',
        badge: '🔥 HIGH MANAGEMENT',
        color: 'bg-purple-500/20 text-purple-300 border-purple-500/40',
        canDelete: false,
        canEdit: true,
        canIssueReward: true,
        allowedTabs: ['overview', 'hierarchy', 'rewards', 'weapons', 'sanctions', 'commands', 'vehicles']
      });
      setActiveTab('overview');
      setIsAuthorized(true);
    } 
    // 🛡️ TIER 3: STAFF ADMIN & TICKET MODERATOR
    else if (cleanPin === 'staffsc2026' || cleanPin === 'staff3322') {
      setUserRole({
        code: 'STAFF',
        title: 'Staff Admin & Moderator',
        badge: '🛡️ STAFF MODERATOR',
        color: 'bg-blue-500/20 text-blue-300 border-blue-500/40',
        canDelete: false,
        canEdit: false,
        canIssueReward: true,
        allowedTabs: ['overview', 'rewards', 'sanctions', 'commands', 'vehicles']
      });
      setActiveTab('overview');
      setIsAuthorized(true);
    } 
    // 💎 TIER 4: DONATUR VIP / GUEST
    else if (cleanPin === 'vipsc2026' || cleanPin === 'vip1122') {
      setUserRole({
        code: 'DONATUR',
        title: 'VIP Donatur Plenger',
        badge: '💎 DONATUR VIP CLUB',
        color: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
        canDelete: false,
        canEdit: false,
        canIssueReward: false,
        allowedTabs: ['donation_system', 'weapons', 'vehicles']
      });
      setActiveTab('donation_system');
      setIsAuthorized(true);
    } 
    else {
      alert("AKSES DITOLAK! PIN Rahasia Salah.");
    }
  };

  const handleAddMember = (e) => {
    e.preventDefault();
    if (!newMember.name || !newMember.role) return;
    const added = {
      ...newMember,
      id: Date.now()
    };
    setHierarchyList([...hierarchyList, added]);
    setNewMember({ name: '', role: '', tier: 'STAFF_ADMIN', discord: '', identifier: '', aceGroup: 'group.mod', status: 'ACTIVE', perkCount: '-' });
    setShowMemberModal(false);
  };

  const handleDeleteMember = (id) => {
    if (!userRole.canDelete) {
      alert("AKSES DITOLAK! Hanya Owner / Founder Plenger Boss yang berhak menghapus anggota dari hirarki.");
      return;
    }
    if (confirm("Apakah Anda yakin ingin menghapus user ini dari hirarki admin/donatur?")) {
      setHierarchyList(hierarchyList.filter(item => item.id !== id));
    }
  };

  const handleIssueReward = (e) => {
    e.preventDefault();
    if (!userRole.canIssueReward) {
      alert("AKSES DITOLAK! Role Anda tidak memiliki izin untuk menerbitkan reward/perks.");
      return;
    }
    if (!newReward.recipient || !newReward.reason) return;

    let detailStr = '';
    if (newReward.type === 'DONASI_MOBIL') detailStr = `Vehicle Code: ${newReward.vehicleCode}`;
    else if (newReward.type === 'CUSTOM_PED') detailStr = `PED Hash: ${newReward.pedHash || 'custom_ped_01'}`;
    else if (newReward.type === 'RUMAH_CUSTOM') detailStr = `MLO House ID: ${newReward.houseId || '101'}`;
    else if (newReward.type === 'UANG_CASH') detailStr = `Cash/Tokens: $${Number(newReward.cashAmount).toLocaleString()}`;

    const newClaim = {
      id: Date.now(),
      recipient: newReward.recipient,
      type: newReward.type,
      detail: detailStr,
      reason: newReward.reason,
      status: 'APPROVED',
      date: new Date().toISOString().split('T')[0]
    };

    setRewardClaims([newClaim, ...rewardClaims]);
    setNewReward({ recipient: '', type: 'DONASI_MOBIL', vehicleCode: 'agerars', pedHash: '', houseId: '', cashAmount: '500000', reason: '' });
    alert(`✨ Reward / Perks Donasi Berhasil Dikeluarkan oleh ${userRole.title}!`);
  };

  const getGeneratedCommand = () => {
    if (cmdType === 'setjob') return `/setjob ${cmdPlayerId} ${cmdParam}`;
    if (cmdType === 'giveitem') return `/giveitem ${cmdPlayerId} ${cmdParam}`;
    if (cmdType === 'car') return `/car ${cmdParam}`;
    if (cmdType === 'ban') return `/ban ${cmdPlayerId} 3d ${cmdParam || 'Pelanggaran RP'}`;
    if (cmdType === 'adddonator') return `/addace identifier:license:${cmdParam} group.admin`;
    return `/revive ${cmdPlayerId}`;
  };

  return (
    <div className="min-h-screen bg-[#060812] text-slate-100 font-sans pb-16">
      {/* HEADER DIREKSI & RAPAT DECK */}
      <header className="sticky top-0 z-50 px-6 py-4 flex flex-col md:flex-row justify-between items-center bg-[#080b1a]/95 backdrop-blur-md border-b border-purple-500/30 gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-600 via-pink-600 to-indigo-900 rounded-2xl flex items-center justify-center text-2xl shadow-xl shadow-purple-500/30 text-white font-black">
            <i className="fa-solid fa-crown text-amber-300"></i>
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-xl font-black bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-300 bg-clip-text text-transparent">
                CONSOLE DIREKSI ADMIN PLENGER
              </h1>
              {isAuthorized && (
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black border uppercase tracking-wider ${userRole.color}`}>
                  {userRole.badge}
                </span>
              )}
            </div>
            <p className="text-xs text-slate-400 font-medium">System Hirarki, Donator Perks, Rewards RP, & Kalibrasi 388 Mobil Kota</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {isAuthorized && (
            <button
              onClick={() => { setIsAuthorized(false); setAdminPin(''); }}
              className="bg-red-500/20 hover:bg-red-500/30 text-red-300 border border-red-500/40 text-xs font-bold px-3 py-2 rounded-xl transition-colors"
            >
              🔒 Logout Role
            </button>
          )}
          <button onClick={() => window.print()} className="bg-purple-600 hover:bg-purple-500 text-white text-xs font-black px-4 py-2.5 rounded-xl shadow-lg shadow-purple-500/30 flex items-center gap-2 transition-all">
            <i className="fa-solid fa-print"></i> Export Deck Rapat (PDF)
          </button>
          <Link href="/" className="bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-300 px-4 py-2.5 rounded-xl border border-white/10 transition-colors">
            ← City Hub
          </Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto mt-6 px-4 md:px-6 space-y-6">
        {!isAuthorized ? (
          /* MULTI-TIER SECRET LOGIN GATE */
          <div className="max-w-lg mx-auto my-16 bg-slate-900/90 border border-purple-500/40 rounded-3xl p-8 backdrop-blur-xl shadow-2xl text-center space-y-6">
            <div className="w-20 h-20 bg-gradient-to-br from-purple-600 via-pink-600 to-indigo-900 border border-purple-400/40 rounded-3xl mx-auto flex items-center justify-center text-4xl text-amber-300 shadow-xl shadow-purple-500/30">
              <i className="fa-solid fa-user-shield"></i>
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-black text-white">PORTAL RAHASIA ADMIN PLENGER</h3>
              <p className="text-xs text-slate-400">Masukkan Kode PIN Rahasia Sesuai Role & Jabatan Anda di Kota Supercali RP</p>
            </div>

            <form onSubmit={handleAdminAuth} className="space-y-4">
              <div>
                <input
                  type="password"
                  value={adminPin}
                  onChange={(e) => setAdminPin(e.target.value)}
                  placeholder="Masukkan PIN Rahasia Role Anda..."
                  required
                  className="w-full bg-black/70 border border-purple-500/40 rounded-2xl p-4 text-white text-center font-mono text-xl tracking-widest outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-500/40"
                />
              </div>
              <button type="submit" className="w-full bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-800 text-white font-black p-4 rounded-2xl shadow-xl shadow-purple-500/40 hover:scale-[1.02] active:scale-[0.98] transition-transform">
                🔓 MASUK DENGAN ROLE ANDA
              </button>
            </form>
          </div>
        ) : (
          /* AUTHORIZED DASHBOARD CONTAINER */
          <div className="space-y-6">
            
            {/* WELCOME BADGE USER ROLE & ACCESS MATRIX */}
            <div className="bg-gradient-to-r from-slate-900 via-purple-950/40 to-slate-900 border border-purple-500/30 p-4 rounded-2xl backdrop-blur-md flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-500/20 border border-purple-500/40 rounded-xl flex items-center justify-center text-purple-300 text-lg">
                  <i className="fa-solid fa-user-check"></i>
                </div>
                <div>
                  <div className="text-xs text-slate-400">Terautentikasi Sebagai:</div>
                  <div className="text-sm font-black text-white flex items-center gap-2">
                    <span>{userRole.title}</span>
                    <span className={`px-2 py-0.5 rounded-md text-[10px] font-black border ${userRole.color}`}>
                      {userRole.badge}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="text-xs text-slate-300 font-mono flex items-center gap-2">
                <span className="text-purple-400 font-bold">Menu Aktif:</span> {userRole.allowedTabs.length} Tab Akses Ditampilkan
              </div>
            </div>

            {/* DYNAMIC EXECUTIVE NAVIGATION TABS (FILTERED BY ROLE) */}
            <div className="flex flex-wrap gap-2 p-1.5 bg-slate-900/80 border border-white/10 rounded-2xl backdrop-blur-md">
              {userRole.allowedTabs.includes('overview') && (
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`px-4 py-2.5 rounded-xl text-xs font-black flex items-center gap-2 transition-all ${
                    activeTab === 'overview' ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/30' : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <i className="fa-solid fa-chart-pie"></i> Overview
                </button>
              )}
              {userRole.allowedTabs.includes('hierarchy') && (
                <button
                  onClick={() => setActiveTab('hierarchy')}
                  className={`px-4 py-2.5 rounded-xl text-xs font-black flex items-center gap-2 transition-all ${
                    activeTab === 'hierarchy' ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/30' : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <i className="fa-solid fa-sitemap"></i> Hirarki Server
                </button>
              )}
              {userRole.allowedTabs.includes('rewards') && (
                <button
                  onClick={() => setActiveTab('rewards')}
                  className={`px-4 py-2.5 rounded-xl text-xs font-black flex items-center gap-2 transition-all ${
                    activeTab === 'rewards' ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/30' : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <i className="fa-solid fa-gift text-amber-300"></i> Reward & Claims
                </button>
              )}
              {userRole.allowedTabs.includes('weapons') && (
                <button
                  onClick={() => setActiveTab('weapons')}
                  className={`px-4 py-2.5 rounded-xl text-xs font-black flex items-center gap-2 transition-all ${
                    activeTab === 'weapons' ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/30' : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <i className="fa-solid fa-gun text-red-400"></i> Weapon Damage Matrix
                </button>
              )}
              {userRole.allowedTabs.includes('sanctions') && (
                <button
                  onClick={() => setActiveTab('sanctions')}
                  className={`px-4 py-2.5 rounded-xl text-xs font-black flex items-center gap-2 transition-all ${
                    activeTab === 'sanctions' ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/30' : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <i className="fa-solid fa-scale-balanced text-amber-400"></i> Standar Sanksi Admin
                </button>
              )}
              {userRole.allowedTabs.includes('commands') && (
                <button
                  onClick={() => setActiveTab('commands')}
                  className={`px-4 py-2.5 rounded-xl text-xs font-black flex items-center gap-2 transition-all ${
                    activeTab === 'commands' ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/30' : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <i className="fa-solid fa-terminal text-cyan-400"></i> Quick Command Generator
                </button>
              )}
              {userRole.allowedTabs.includes('donation_system') && (
                <button
                  onClick={() => setActiveTab('donation_system')}
                  className={`px-4 py-2.5 rounded-xl text-xs font-black flex items-center gap-2 transition-all ${
                    activeTab === 'donation_system' ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/30' : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <i className="fa-solid fa-gem text-cyan-300"></i> System Donasi
                </button>
              )}
              {userRole.allowedTabs.includes('vehicles') && (
                <button
                  onClick={() => setActiveTab('vehicles')}
                  className={`px-4 py-2.5 rounded-xl text-xs font-black flex items-center gap-2 transition-all ${
                    activeTab === 'vehicles' ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/30' : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <i className="fa-solid fa-car"></i> Katalog 388 Mobil
                </button>
              )}
            </div>

            {/* TAB 1: EXECUTIVE OVERVIEW & RAPAT METRICS */}
            {activeTab === 'overview' && userRole.allowedTabs.includes('overview') && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                  <div className="bg-slate-900/80 border border-purple-500/30 rounded-2xl p-5 backdrop-blur-md relative overflow-hidden">
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Headcount Admin</div>
                    <div className="text-3xl font-black text-purple-400 mt-2">6 Staff / Mgmt</div>
                    <p className="text-[11px] text-emerald-400 mt-1 font-semibold">✓ 1 Founder, 2 High Mgmt, 1 Mod</p>
                  </div>
                  <div className="bg-slate-900/80 border border-amber-500/30 rounded-2xl p-5 backdrop-blur-md relative overflow-hidden">
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Donatur VIP Active</div>
                    <div className="text-3xl font-black text-amber-300 mt-2">2 Donatur Guild</div>
                    <p className="text-[11px] text-amber-400 mt-1 font-semibold">💎 Platinum + Gold Tier</p>
                  </div>
                  <div className="bg-slate-900/80 border border-cyan-500/30 rounded-2xl p-5 backdrop-blur-md relative overflow-hidden">
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Rewards Claimed</div>
                    <div className="text-3xl font-black text-cyan-300 mt-2">{rewardClaims.length} Perks Issued</div>
                    <p className="text-[11px] text-slate-400 mt-1 font-semibold">PED, MLO House, & Hypercar</p>
                  </div>
                  <div className="bg-slate-900/80 border border-pink-500/30 rounded-2xl p-5 backdrop-blur-md relative overflow-hidden">
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Mobil Terkalibrasi</div>
                    <div className="text-3xl font-black text-pink-400 mt-2">388 Vehicles</div>
                    <p className="text-[11px] text-slate-400 mt-1 font-semibold">6 Kasta (S++ s/d D)</p>
                  </div>
                </div>

                {/* SLIDE DECK PERSIAPAN RAPAT DIREKSI */}
                <div className="bg-gradient-to-br from-slate-900 to-indigo-950/40 border border-purple-500/40 rounded-3xl p-7 space-y-4 backdrop-blur-md">
                  <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                    <div className="w-10 h-10 bg-purple-500/20 border border-purple-500/40 rounded-xl flex items-center justify-center text-purple-300">
                      <i className="fa-solid fa-bullhorn text-lg"></i>
                    </div>
                    <div>
                      <h3 className="text-lg font-black text-white">AGENDA RAPAT DIREKSI ADMIN PLENGER (ESOK)</h3>
                      <p className="text-xs text-slate-400">Poin penting keputusan rapat struktur kota, target RP, dan monetization roadmap</p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-5 pt-2">
                    <div className="bg-black/40 border border-white/10 p-4 rounded-2xl space-y-2">
                      <div className="text-xs font-black text-purple-400 flex items-center gap-2">
                        <span className="w-5 h-5 bg-purple-500/30 rounded-full flex items-center justify-center text-[10px]">1</span>
                        <span>Restrukturisasi Hirarki</span>
                      </div>
                      <p className="text-xs text-slate-300">Penetapan wewenang jelas dari Founder/Owner, High Management, hingga Staff Ticket Moderator agar eksekusi di game tidak saling tumpang tindih.</p>
                    </div>

                    <div className="bg-black/40 border border-white/10 p-4 rounded-2xl space-y-2">
                      <div className="text-xs font-black text-amber-400 flex items-center gap-2">
                        <span className="w-5 h-5 bg-amber-500/30 rounded-full flex items-center justify-center text-[10px]">2</span>
                        <span>Target RP & Reward Staff</span>
                      </div>
                      <p className="text-xs text-slate-300">Staff & Faksi yang aktif mencapai target RP berhak memilih perk berupa Custom PED (`sc-ped`), Rumah MLO (`ps-housing`), atau Kendaraan Eksklusif.</p>
                    </div>

                    <div className="bg-black/40 border border-white/10 p-4 rounded-2xl space-y-2">
                      <div className="text-xs font-black text-cyan-400 flex items-center gap-2">
                        <span className="w-5 h-5 bg-cyan-500/30 rounded-full flex items-center justify-center text-[10px]">3</span>
                        <span>Roadmap Donasi Transparan</span>
                      </div>
                      <p className="text-xs text-slate-300">Sistem donasi 4 tier (Silver s/d Supreme Boss) untuk peremajaan server/hosting dengan injection perk otomatis dan pencatatan kas kota transparan.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: HIRARKI SERVER & DONATUR (EDITABLE) */}
            {activeTab === 'hierarchy' && userRole.allowedTabs.includes('hierarchy') && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-900/80 border border-white/10 p-6 rounded-3xl backdrop-blur-md">
                  <div>
                    <h3 className="text-lg font-black text-white flex items-center gap-2">
                      <i className="fa-solid fa-sitemap text-purple-400"></i> Hirarki Server & Daftar Donatur (Plenger Board)
                    </h3>
                    <p className="text-xs text-slate-400">Atur siapa pemegang Owner, High Management, Admin/Mod, serta Donatur VIP kota.</p>
                  </div>
                  {userRole.canEdit && (
                    <button
                      onClick={() => setShowMemberModal(true)}
                      className="bg-gradient-to-r from-purple-600 to-indigo-700 hover:from-purple-500 hover:to-indigo-600 text-white text-xs font-extrabold px-5 py-3 rounded-xl shadow-lg shadow-purple-500/30 flex items-center gap-2 transition-transform active:scale-95"
                    >
                      <i className="fa-solid fa-user-plus"></i> Tambah Anggota / Donatur Baru
                    </button>
                  )}
                </div>

                {/* MODAL FORM TAMBAH/EDIT MEMBER */}
                {showMemberModal && (
                  <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="bg-slate-900 border border-purple-500/40 rounded-3xl p-6 max-w-lg w-full space-y-4 shadow-2xl">
                      <div className="flex justify-between items-center border-b border-white/10 pb-3">
                        <h4 className="text-base font-black text-white">Tambah Anggota / Donatur Hirarki</h4>
                        <button onClick={() => setShowMemberModal(false)} className="text-slate-400 hover:text-white text-lg">✕</button>
                      </div>

                      <form onSubmit={handleAddMember} className="space-y-4 text-xs">
                        <div>
                          <label className="text-slate-300 font-bold block mb-1">Nama / Nickname IC/OOC</label>
                          <input
                            type="text"
                            required
                            value={newMember.name}
                            onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                            placeholder="Contoh: Alex Plenger / Donatur_Sultan"
                            className="w-full bg-black/60 border border-white/10 rounded-xl p-3 text-white outline-none focus:border-purple-400"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="text-slate-300 font-bold block mb-1">Jabatan / Role</label>
                            <input
                              type="text"
                              required
                              value={newMember.role}
                              onChange={(e) => setNewMember({ ...newMember, role: e.target.value })}
                              placeholder="Contoh: High Admin / Donatur Gold"
                              className="w-full bg-black/60 border border-white/10 rounded-xl p-3 text-white outline-none focus:border-purple-400"
                            />
                          </div>
                          <div>
                            <label className="text-slate-300 font-bold block mb-1">Tier Hirarki</label>
                            <select
                              value={newMember.tier}
                              onChange={(e) => setNewMember({ ...newMember, tier: e.target.value })}
                              className="w-full bg-black/60 border border-white/10 rounded-xl p-3 text-white outline-none focus:border-purple-400"
                            >
                              <option value="FOUNDER">FOUNDER / OWNER</option>
                              <option value="HIGH_MANAGEMENT">HIGH MANAGEMENT</option>
                              <option value="STAFF_ADMIN">STAFF ADMIN / MOD</option>
                              <option value="DONATUR_PLATINUM">DONATUR PLATINUM</option>
                              <option value="DONATUR_GOLD">DONATUR GOLD</option>
                              <option value="DONATUR_SILVER">DONATUR SILVER</option>
                            </select>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="text-slate-300 font-bold block mb-1">Discord Tag</label>
                            <input
                              type="text"
                              value={newMember.discord}
                              onChange={(e) => setNewMember({ ...newMember, discord: e.target.value })}
                              placeholder="alex#1234"
                              className="w-full bg-black/60 border border-white/10 rounded-xl p-3 text-white outline-none focus:border-purple-400"
                            />
                          </div>
                          <div>
                            <label className="text-slate-300 font-bold block mb-1">ACE Permission Group</label>
                            <select
                              value={newMember.aceGroup}
                              onChange={(e) => setNewMember({ ...newMember, aceGroup: e.target.value })}
                              className="w-full bg-black/60 border border-white/10 rounded-xl p-3 text-white outline-none focus:border-purple-400"
                            >
                              <option value="group.admin">group.admin (Full)</option>
                              <option value="group.mod">group.mod (Moderator)</option>
                              <option value="group.support">group.support (Support)</option>
                              <option value="user">user (Player Regular/VIP)</option>
                            </select>
                          </div>
                        </div>

                        <div>
                          <label className="text-slate-300 font-bold block mb-1">Steam / License Identifier</label>
                          <input
                            type="text"
                            value={newMember.identifier}
                            onChange={(e) => setNewMember({ ...newMember, identifier: e.target.value })}
                            placeholder="license:xxxxxxxx / steam:xxxxxxxx"
                            className="w-full bg-black/60 border border-white/10 rounded-xl p-3 font-mono text-white outline-none focus:border-purple-400"
                          />
                        </div>

                        <div className="flex gap-3 pt-2">
                          <button type="button" onClick={() => setShowMemberModal(false)} className="w-1/2 bg-slate-800 text-slate-300 font-bold p-3 rounded-xl hover:bg-slate-700">
                            Batal
                          </button>
                          <button type="submit" className="w-1/2 bg-purple-600 text-white font-black p-3 rounded-xl hover:bg-purple-500 shadow-lg shadow-purple-500/30">
                            Simpan ke Hirarki
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                )}

                {/* TABEL DATA HIRARKI SERVER */}
                <div className="bg-slate-900/80 border border-white/10 rounded-3xl overflow-hidden backdrop-blur-md shadow-2xl p-6 space-y-4">
                  <table className="w-full text-left border-collapse">
                    <thead className="bg-white/5 text-xs text-slate-400 font-bold uppercase border-b border-white/10">
                      <tr>
                        <th className="p-3.5">Nama / Identitas</th>
                        <th className="p-3.5">Tier & Jabatan</th>
                        <th className="p-3.5">Discord Tag</th>
                        <th className="p-3.5">ACE Group (permissions.cfg)</th>
                        <th className="p-3.5">Perks / Hak Akses</th>
                        <th className="p-3.5 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/10 text-xs">
                      {hierarchyList.map((item) => {
                        let tierBadge = 'bg-slate-500/20 text-slate-300 border-slate-500/40';
                        if (item.tier === 'FOUNDER') tierBadge = 'bg-pink-500/20 text-pink-300 border-pink-500/40';
                        else if (item.tier === 'HIGH_MANAGEMENT') tierBadge = 'bg-purple-500/20 text-purple-300 border-purple-500/40';
                        else if (item.tier === 'STAFF_ADMIN') tierBadge = 'bg-blue-500/20 text-blue-300 border-blue-500/40';
                        else if (item.tier.includes('DONATUR')) tierBadge = 'bg-amber-500/20 text-amber-300 border-amber-500/40';

                        return (
                          <tr key={item.id} className="hover:bg-white/5">
                            <td className="p-3.5 font-bold text-white">
                              <div>{item.name}</div>
                              <div className="text-[10px] font-mono text-slate-400">{item.identifier}</div>
                            </td>
                            <td className="p-3.5">
                              <span className={`px-2.5 py-1 rounded-md text-[10px] font-black border ${tierBadge}`}>
                                {item.tier}
                              </span>
                              <div className="text-slate-300 mt-1 font-semibold">{item.role}</div>
                            </td>
                            <td className="p-3.5 font-mono text-purple-300">{item.discord}</td>
                            <td className="p-3.5 font-mono">
                              <code className="bg-black/60 px-2 py-1 rounded border border-white/10 text-cyan-300">{item.aceGroup}</code>
                            </td>
                            <td className="p-3.5 text-slate-300 font-medium">{item.perkCount}</td>
                            <td className="p-3.5 text-right space-x-2">
                              {userRole.canDelete ? (
                                <button
                                  onClick={() => handleDeleteMember(item.id)}
                                  className="bg-red-500/20 hover:bg-red-500/40 text-red-300 border border-red-500/40 px-3 py-1.5 rounded-lg font-bold text-[11px]"
                                >
                                  Hapus
                                </button>
                              ) : (
                                <span className="text-[10px] text-slate-500 italic">Protected</span>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* TAB 3: REWARD & CLAIM SELECTOR (PED, RUMAH, MOBIL, CASH) */}
            {activeTab === 'rewards' && userRole.allowedTabs.includes('rewards') && (
              <div className="space-y-6">
                <div className="grid md:grid-cols-3 gap-6">
                  
                  {/* FORM ISSUE REWARD */}
                  <div className="md:col-span-1 bg-slate-900/80 border border-amber-500/40 rounded-3xl p-6 backdrop-blur-md space-y-4 shadow-xl">
                    <div className="border-b border-white/10 pb-3">
                      <h3 className="text-base font-black text-amber-300 flex items-center gap-2">
                        <i className="fa-solid fa-gift"></i> Issue Reward & Perks Claim
                      </h3>
                      <p className="text-xs text-slate-400">Pilih jenis hadiah untuk Admin/Staff aktif atau Donatur Kota.</p>
                    </div>

                    <form onSubmit={handleIssueReward} className="space-y-4 text-xs">
                      <div>
                        <label className="text-slate-300 font-bold block mb-1">Penerima (User / Staff / Donatur)</label>
                        <input
                          type="text"
                          required
                          value={newReward.recipient}
                          onChange={(e) => setNewReward({ ...newReward, recipient: e.target.value })}
                          placeholder="Nama IC / Steam / Discord Tag..."
                          className="w-full bg-black/60 border border-white/10 rounded-xl p-3 text-white outline-none focus:border-amber-400"
                        />
                      </div>

                      <div>
                        <label className="text-slate-300 font-bold block mb-1">Jenis Reward / Perks</label>
                        <select
                          value={newReward.type}
                          onChange={(e) => setNewReward({ ...newReward, type: e.target.value })}
                          className="w-full bg-black/60 border border-white/10 rounded-xl p-3 text-white outline-none focus:border-amber-400"
                        >
                          <option value="DONASI_MOBIL">🏎️ Donasi Mobil Custom (Select from 388 Cars)</option>
                          <option value="CUSTOM_PED">🧍 Custom PED Import (sc-ped slot)</option>
                          <option value="RUMAH_CUSTOM">🏠 Rumah / MLO Property (ps-housing)</option>
                          <option value="UANG_CASH">💵 Cash IC / Token Donasi</option>
                        </select>
                      </div>

                      {/* DYNAMIC FORM INPUT BERDASARKAN REWARD TYPE */}
                      {newReward.type === 'DONASI_MOBIL' && (
                        <div>
                          <label className="text-slate-300 font-bold block mb-1">Pilih Kode Mobil (Katalog 388)</label>
                          <select
                            value={newReward.vehicleCode}
                            onChange={(e) => setNewReward({ ...newReward, vehicleCode: e.target.value })}
                            className="w-full bg-black/60 border border-white/10 rounded-xl p-3 text-cyan-300 font-mono outline-none focus:border-amber-400"
                          >
                            <option value="agerars">agerars (Koenigsegg Agera RS - Class S++)</option>
                            <option value="2019chiron">2019chiron (Bugatti Chiron - Class S++)</option>
                            <option value="jesko">jesko (Koenigsegg Jesko - Class S++)</option>
                            <option value="18performante">18performante (Lambo Performante - Class S)</option>
                            <option value="g632019">g632019 (Mercedes G63 AMG - Class B)</option>
                            <option value="civic2020">civic2020 (Honda Civic Type R - Class C)</option>
                          </select>
                        </div>
                      )}

                      {newReward.type === 'CUSTOM_PED' && (
                        <div>
                          <label className="text-slate-300 font-bold block mb-1">PED Model Hash (`sc-ped`)</label>
                          <input
                            type="text"
                            value={newReward.pedHash}
                            onChange={(e) => setNewReward({ ...newReward, pedHash: e.target.value })}
                            placeholder="Contoh: cs_martinmadrazo / custom_ped_01"
                            className="w-full bg-black/60 border border-white/10 rounded-xl p-3 text-white font-mono outline-none focus:border-amber-400"
                          />
                        </div>
                      )}

                      {newReward.type === 'RUMAH_CUSTOM' && (
                        <div>
                          <label className="text-slate-300 font-bold block mb-1">ID Rumah MLO (`ps-housing`)</label>
                          <input
                            type="text"
                            value={newReward.houseId}
                            onChange={(e) => setNewReward({ ...newReward, houseId: e.target.value })}
                            placeholder="Contoh: MLO House ID #402 (Vagos Gang HQ)"
                            className="w-full bg-black/60 border border-white/10 rounded-xl p-3 text-white font-mono outline-none focus:border-amber-400"
                          />
                        </div>
                      )}

                      {newReward.type === 'UANG_CASH' && (
                        <div>
                          <label className="text-slate-300 font-bold block mb-1">Jumlah Uang Cash ($ / IC)</label>
                          <input
                            type="number"
                            value={newReward.cashAmount}
                            onChange={(e) => setNewReward({ ...newReward, cashAmount: e.target.value })}
                            placeholder="500000"
                            className="w-full bg-black/60 border border-white/10 rounded-xl p-3 text-emerald-400 font-mono outline-none focus:border-amber-400"
                          />
                        </div>
                      )}

                      <div>
                        <label className="text-slate-300 font-bold block mb-1">Alasan / Target RP / Paket Donasi</label>
                        <textarea
                          required
                          rows="3"
                          value={newReward.reason}
                          onChange={(e) => setNewReward({ ...newReward, reason: e.target.value })}
                          placeholder="Misal: Reward Pencapaian Target Staff 50 Tiket / Claim Paket Donasi Platinum"
                          className="w-full bg-black/60 border border-white/10 rounded-xl p-3 text-white outline-none focus:border-amber-400"
                        ></textarea>
                      </div>

                      <button type="submit" className="w-full bg-gradient-to-r from-amber-500 to-orange-600 text-black font-black p-3.5 rounded-xl shadow-lg shadow-amber-500/30 hover:scale-[1.01] transition-transform">
                        ✨ PROSES & SELESAIKAN REWARD
                      </button>
                    </form>
                  </div>

                  {/* RIWAYAT LOG CLAIMS & PERKS */}
                  <div className="md:col-span-2 bg-slate-900/80 border border-white/10 rounded-3xl p-6 backdrop-blur-md space-y-4 shadow-xl">
                    <div className="border-b border-white/10 pb-3 flex justify-between items-center">
                      <div>
                        <h3 className="text-base font-black text-white flex items-center gap-2">
                          <i className="fa-solid fa-list-check text-purple-400"></i> Riwayat Perks & Claim Rewards Kota
                        </h3>
                        <p className="text-xs text-slate-400">Log transparan penerbitan hadiah staff RP & donasi mobil/rumah/PED.</p>
                      </div>
                      <span className="bg-purple-500/20 text-purple-300 border border-purple-500/40 text-[10px] font-black px-2.5 py-1 rounded-lg">
                        {rewardClaims.length} Items Logged
                      </span>
                    </div>

                    <div className="space-y-3">
                      {rewardClaims.map((claim) => (
                        <div key={claim.id} className="bg-black/50 border border-white/10 p-4 rounded-2xl flex justify-between items-center gap-4 hover:border-purple-500/40 transition-colors">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="font-black text-sm text-white">{claim.recipient}</span>
                              <span className="bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[10px] font-extrabold px-2 py-0.5 rounded-md">
                                {claim.type}
                              </span>
                            </div>
                            <div className="text-xs font-mono text-cyan-300">{claim.detail}</div>
                            <div className="text-xs text-slate-400">{claim.reason}</div>
                          </div>

                          <div className="text-right space-y-1">
                            <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] font-black px-2.5 py-1 rounded-lg block">
                              {claim.status}
                            </span>
                            <span className="text-[10px] font-mono text-slate-500">{claim.date}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              </div>
            )}

            {/* TAB NEW: WEAPON DAMAGE MATRIX (sc-weapondamage) */}
            {activeTab === 'weapons' && userRole.allowedTabs.includes('weapons') && (
              <div className="space-y-6">
                <div className="bg-slate-900/80 border border-red-500/30 p-6 rounded-3xl backdrop-blur-md space-y-3">
                  <h3 className="text-lg font-black text-red-400 flex items-center gap-2">
                    <i className="fa-solid fa-gun"></i> Kalibrasi Damage Senjata Kota (`sc-weapondamage`)
                  </h3>
                  <p className="text-xs text-slate-300">Standar Time to Kill (TTK) & Weapon Damage Modifier kultur US vs Australia untuk faksi Polisi & Penjahat.</p>
                </div>

                <div className="bg-slate-900/80 border border-white/10 rounded-3xl overflow-hidden backdrop-blur-md shadow-2xl p-6 space-y-4">
                  <table className="w-full text-left">
                    <thead className="bg-white/5 text-xs text-slate-400 font-bold uppercase border-b border-white/10">
                      <tr>
                        <th className="p-3.5">Nama Senjata</th>
                        <th className="p-3.5">FiveM Hash</th>
                        <th className="p-3.5">Faksi Pengguna</th>
                        <th className="p-3.5">Damage Modifier</th>
                        <th className="p-3.5">Est. TTK (Body Hits)</th>
                        <th className="p-3.5">Recoil Profile</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/10 text-xs">
                      {weaponDamageData.map((w, i) => (
                        <tr key={i} className="hover:bg-white/5">
                          <td className="p-3.5 font-bold text-white">{w.name}</td>
                          <td className="p-3.5 font-mono text-cyan-300"><code>{w.hash}</code></td>
                          <td className="p-3.5 text-purple-300 font-semibold">{w.faction}</td>
                          <td className="p-3.5 font-mono font-black text-amber-300">{w.modifier}</td>
                          <td className="p-3.5 font-bold text-red-400">{w.TTK}</td>
                          <td className="p-3.5 text-slate-400">{w.recoil}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* TAB NEW: STANDAR SANKSI ADMIN & RULEBOOK */}
            {activeTab === 'sanctions' && userRole.allowedTabs.includes('sanctions') && (
              <div className="space-y-6">
                <div className="bg-slate-900/80 border border-amber-500/30 p-6 rounded-3xl backdrop-blur-md space-y-3">
                  <h3 className="text-lg font-black text-amber-400 flex items-center gap-2">
                    <i className="fa-solid fa-scale-balanced"></i> Standar Sanksi Admin & Matrix Pelanggaran Kota
                  </h3>
                  <p className="text-xs text-slate-300">Pedoman penindakan tiket warga oleh Moderator & Admin agar keputusan adil & tidak menimbulkan tuduhan abuse of power.</p>
                </div>

                <div className="bg-slate-900/80 border border-white/10 rounded-3xl overflow-hidden backdrop-blur-md shadow-2xl p-6 space-y-4">
                  <table className="w-full text-left">
                    <thead className="bg-white/5 text-xs text-slate-400 font-bold uppercase border-b border-white/10">
                      <tr>
                        <th className="p-3.5">Jenis Pelanggaran</th>
                        <th className="p-3.5">Tingkat Bahaya</th>
                        <th className="p-3.5">Pelanggaran Ke-1</th>
                        <th className="p-3.5">Pelanggaran Ke-2</th>
                        <th className="p-3.5">Pelanggaran Berulang</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/10 text-xs">
                      {sanctionMatrix.map((s, i) => (
                        <tr key={i} className="hover:bg-white/5">
                          <td className="p-3.5 font-bold text-white">{s.violation}</td>
                          <td className="p-3.5 font-black text-amber-300">{s.severity}</td>
                          <td className="p-3.5 text-slate-300">{s.firstOffense}</td>
                          <td className="p-3.5 font-bold text-orange-400">{s.secondOffense}</td>
                          <td className="p-3.5 font-black text-red-500">{s.repeatOffense}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* TAB NEW: QUICK COMMAND GENERATOR */}
            {activeTab === 'commands' && userRole.allowedTabs.includes('commands') && (
              <div className="space-y-6">
                <div className="bg-slate-900/80 border border-cyan-500/30 p-6 rounded-3xl backdrop-blur-md space-y-3">
                  <h3 className="text-lg font-black text-cyan-300 flex items-center gap-2">
                    <i className="fa-solid fa-terminal"></i> FiveM Quick Command Generator for Admins
                  </h3>
                  <p className="text-xs text-slate-300">Generate perintah in-game instan untuk penanganan cepat saat bertugas di server FiveM.</p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-slate-900/80 border border-white/10 p-6 rounded-3xl backdrop-blur-md space-y-4">
                    <h4 className="text-sm font-black text-white">Input Parameter Command</h4>
                    
                    <div className="space-y-3 text-xs">
                      <div>
                        <label className="text-slate-300 font-bold block mb-1">Jenis Command</label>
                        <select
                          value={cmdType}
                          onChange={(e) => setCmdType(e.target.value)}
                          className="w-full bg-black/60 border border-white/10 rounded-xl p-3 text-white outline-none focus:border-cyan-400"
                        >
                          <option value="setjob">/setjob [ID] [Job] [Grade] (Set Job IC Player)</option>
                          <option value="giveitem">/giveitem [ID] [Item] [Qty] (Give Item to Player)</option>
                          <option value="car">/car [SpawnCode] (Spawn Admin Vehicle)</option>
                          <option value="ban">/ban [ID] [Reason] (Ban Player Temporary)</option>
                          <option value="adddonator">/addace [License] group.admin (Add ACE Group)</option>
                          <option value="revive">/revive [ID] (Revive Injured Player)</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-slate-300 font-bold block mb-1">ID In-Game Player (Server ID)</label>
                        <input
                          type="text"
                          value={cmdPlayerId}
                          onChange={(e) => setCmdPlayerId(e.target.value)}
                          placeholder="1"
                          className="w-full bg-black/60 border border-white/10 rounded-xl p-3 text-white font-mono outline-none focus:border-cyan-400"
                        />
                      </div>

                      <div>
                        <label className="text-slate-300 font-bold block mb-1">Parameter Tambahan (Job/Item/Model/License)</label>
                        <input
                          type="text"
                          value={cmdParam}
                          onChange={(e) => setCmdParam(e.target.value)}
                          placeholder="police 3 / agerars / phone 1"
                          className="w-full bg-black/60 border border-white/10 rounded-xl p-3 text-white font-mono outline-none focus:border-cyan-400"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="bg-black/60 border border-cyan-500/40 p-6 rounded-3xl backdrop-blur-md flex flex-col justify-between space-y-4">
                    <div>
                      <h4 className="text-sm font-black text-cyan-300 mb-2">Hasil Generated Command (F8 Console / Chat)</h4>
                      <div className="bg-slate-900 border border-cyan-500/40 rounded-2xl p-5 font-mono text-sm text-cyan-300 font-bold break-all shadow-inner">
                        <code>{getGeneratedCommand()}</code>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(getGeneratedCommand());
                        alert(`Command '${getGeneratedCommand()}' berhasil disalin ke clipboard!`);
                      }}
                      className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-black p-4 rounded-2xl shadow-lg shadow-cyan-500/30 transition-transform active:scale-95 flex items-center justify-center gap-2"
                    >
                      <i className="fa-solid fa-copy"></i> SALIN COMMAND KE CLIPBOARD
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 4: SISTEM DONASI & PERKS ROADMAP */}
            {activeTab === 'donation_system' && userRole.allowedTabs.includes('donation_system') && (
              <div className="space-y-6">
                <div className="bg-slate-900/80 border border-cyan-500/30 p-6 rounded-3xl backdrop-blur-md space-y-3">
                  <h3 className="text-lg font-black text-cyan-300 flex items-center gap-2">
                    <i className="fa-solid fa-gem"></i> Blueprint Sistem Donasi & Monetisasi Kota Kedepannya
                  </h3>
                  <p className="text-xs text-slate-300">Skema paket donasi resmi untuk mendukung operasional hosting server FiveM, license key, dan custom asset maintenance secara berkelanjutan.</p>
                </div>

                {/* PAKET DONASI TIERS */}
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

                {/* ALUR TRANSKASI & WORKFLOW AUTOMATION */}
                <div className="bg-slate-900/80 border border-white/10 rounded-3xl p-6 backdrop-blur-md space-y-4">
                  <h4 className="text-sm font-black text-white flex items-center gap-2">
                    <i className="fa-solid fa-diagram-project text-cyan-400"></i> Alur Kerja Transaksi & Perk Claim System Donasi
                  </h4>
                  <div className="grid md:grid-cols-4 gap-4 text-xs">
                    <div className="bg-black/40 p-4 rounded-2xl border border-white/10">
                      <div className="font-bold text-purple-400 mb-1">1. Form Web Donasi</div>
                      <div className="text-slate-400">Donatur memilih paket di portal web & melampirkan bukti transfer.</div>
                    </div>
                    <div className="bg-black/40 p-4 rounded-2xl border border-white/10">
                      <div className="font-bold text-purple-400 mb-1">2. Verification Admin</div>
                      <div className="text-slate-400">Admin Plenger memverifikasi mutasi masuk & menandai status APPROVED.</div>
                    </div>
                    <div className="bg-black/40 p-4 rounded-2xl border border-white/10">
                      <div className="font-bold text-purple-400 mb-1">3. Perk Auto Injection</div>
                      <div className="text-slate-400">Perks (Mobil/Rumah/PED) di-inject via SQL / Reward Claim Selector.</div>
                    </div>
                    <div className="bg-black/40 p-4 rounded-2xl border border-white/10">
                      <div className="font-bold text-purple-400 mb-1">4. Transparency Log</div>
                      <div className="text-slate-400">Semua dana masuk dicatat di Kas Kota untuk biaya perpanjangan server.</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 5: KATALOG 388 MOBIL KOTA (EXISTING & ENHANCED) */}
            {activeTab === 'vehicles' && userRole.allowedTabs.includes('vehicles') && (
              <div className="space-y-6">
                
                {/* RINGKASAN STRUKTUR KASTA TABLE */}
                <div className="bg-slate-900/80 border border-white/10 rounded-3xl overflow-hidden backdrop-blur-md shadow-2xl p-6 space-y-4">
                  <h3 className="text-base font-black text-white flex items-center gap-2 border-b border-white/10 pb-3">
                    <i className="fa-solid fa-gauge-high text-cyan-400"></i> Ringkasan Kasta Kecepatan & Biaya Mekanik (388 Vehicles)
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

                {/* FILTER & DAFTAR LENGKAP KENDARAAN KOTA */}
                <div className="bg-slate-900/80 border border-white/10 rounded-3xl p-6 backdrop-blur-md shadow-2xl space-y-6">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-white/10 pb-4">
                    <h3 className="text-base font-black text-white flex items-center gap-2">
                      <i className="fa-solid fa-car-side text-purple-400"></i> Searchable Vehicle Database (388 Vehicles)
                    </h3>
                    
                    <div className="flex items-center gap-3 w-full md:w-auto">
                      <select
                        value={selectedClassFilter}
                        onChange={(e) => setSelectedClassFilter(e.target.value)}
                        className="bg-black/50 border border-white/10 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-purple-400"
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
                        className="bg-black/50 border border-white/10 rounded-xl px-4 py-2 text-xs text-white outline-none focus:border-purple-400 w-full md:w-64"
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
                                  className="bg-slate-900 border border-white/10 hover:border-purple-400 px-2.5 py-1 rounded-lg text-xs font-mono text-cyan-300 hover:text-white transition-all active:scale-95"
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

          </div>
        )}
      </main>
    </div>
  );
}
