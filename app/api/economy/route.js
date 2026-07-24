import { NextResponse } from 'next/server';

export async function GET() {
  const FIVEM_SERVER_ENDPOINT = process.env.FIVEM_API_URL || 'http://localhost:30120/sc-pad/economy';

  try {
    const res = await fetch(FIVEM_SERVER_ENDPOINT, { cache: 'no-store' });
    if (res.ok) {
      const data = await res.json();
      return NextResponse.json(data);
    }
  } catch (err) {
    // Return low-pay fallback dataset matching economy_roleplay_guide.md
  }

  return NextResponse.json({
    status: "success",
    server: "Supercali RP (Fallback Next.js Cache)",
    economy_model: "Low-Pay High-Effort ($5 - $45)",
    updated_at: new Date().toISOString(),
    data: [
      { item_code: 'gold_nugget', item_name: 'Emas Murni (Gold Nugget)', category: 'Tambang', price_ls: 28, price_sandy: 35, price_paleto: 42, demand_status: 'HIGH', best_location: 'Paleto Bay (Profit +35%)' },
      { item_code: 'processed_wood', item_name: 'Kayu Olahan (Processed Wood)', category: 'Perkayuan', price_ls: 15, price_sandy: 9, price_paleto: 12, demand_status: 'MEDIUM', best_location: 'Los Santos Industrial' },
      { item_code: 'golden_wheat', item_name: 'Gandum Super (Golden Wheat)', category: 'Pertanian', price_ls: 7, price_sandy: 12, price_paleto: 6, demand_status: 'HIGH', best_location: 'Sandy Shores Bakery' },
      { item_code: 'red_tuna', item_name: 'Ikan Tuna Merah (Red Tuna)', category: 'Perikanan', price_ls: 24, price_sandy: 18, price_paleto: 14, demand_status: 'MEDIUM', best_location: 'Pelabuhan Los Santos Pier' },
      { item_code: 'fresh_chicken', item_name: 'Daging Ayam Segar (Fresh Chicken)', category: 'Peternakan', price_ls: 8, price_sandy: 11, price_paleto: 7, demand_status: 'NORMAL', best_location: 'Sandy Shores Depot' }
    ]
  });
}
