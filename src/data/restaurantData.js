// Simulated QSR restaurant data for the MVP
// 6 branches, 30 days, hourly data

const BRANCHES = [
  { id: 'br-001', name: 'Downtown Central', city: 'New York', address: '125 Broadway Ave' },
  { id: 'br-002', name: 'Airport Hub', city: 'New York', address: '1 JFK Terminal Rd' },
  { id: 'br-003', name: 'Mall Plaza', city: 'Chicago', address: '900 Michigan Ave' },
  { id: 'br-004', name: 'University District', city: 'Boston', address: '45 Harvard St' },
  { id: 'br-005', name: 'Midtown Express', city: 'New York', address: '350 5th Ave' },
  { id: 'br-006', name: 'Waterfront Station', city: 'Chicago', address: '233 Lake Shore Dr' },
];

const PRODUCTS = [
  { id: 'p-01', name: 'Zinger Burger', category: 'Burgers', price: 6.99 },
  { id: 'p-02', name: 'Classic Chicken Burger', category: 'Burgers', price: 5.49 },
  { id: 'p-03', name: 'Spicy Wings (6pc)', category: 'Chicken', price: 7.99 },
  { id: 'p-04', name: 'Chicken Bucket (8pc)', category: 'Chicken', price: 14.99 },
  { id: 'p-05', name: 'Crispy Strips (5pc)', category: 'Chicken', price: 6.49 },
  { id: 'p-06', name: 'Large Fries', category: 'Sides', price: 3.49 },
  { id: 'p-07', name: 'Coleslaw', category: 'Sides', price: 2.49 },
  { id: 'p-08', name: 'Mashed Potatoes', category: 'Sides', price: 2.99 },
  { id: 'p-09', name: 'Pepsi Large', category: 'Beverages', price: 2.49 },
  { id: 'p-10', name: 'Iced Tea', category: 'Beverages', price: 2.29 },
  { id: 'p-11', name: 'Family Meal Deal', category: 'Combos', price: 24.99 },
  { id: 'p-12', name: 'Lunch Box Combo', category: 'Combos', price: 8.99 },
  { id: 'p-13', name: 'Chicken Wrap', category: 'Wraps', price: 5.99 },
  { id: 'p-14', name: 'BBQ Twister', category: 'Wraps', price: 6.49 },
  { id: 'p-15', name: 'Chocolate Sundae', category: 'Desserts', price: 3.29 },
];

// Seed-based pseudo-random for reproducibility
function seededRandom(seed) {
  let s = seed;
  return function () {
    s = (s * 16807 + 0) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

function generateHourlyData() {
  const rng = seededRandom(42);
  const data = [];
  const now = new Date(2026, 2, 14); // March 14, 2026

  for (let dayOffset = 29; dayOffset >= 0; dayOffset--) {
    const date = new Date(now);
    date.setDate(date.getDate() - dayOffset);
    const dateStr = date.toISOString().split('T')[0];
    const dayOfWeek = date.getDay(); // 0=Sun,6=Sat
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

    for (const branch of BRANCHES) {
      // Branch performance profiles
      const branchMultiplier =
        branch.id === 'br-001' ? 1.3 :
        branch.id === 'br-002' ? 1.1 :
        branch.id === 'br-003' ? 1.0 :
        branch.id === 'br-004' ? 0.85 :
        branch.id === 'br-005' ? 1.15 :
        0.9;

      const branchPrepBase =
        branch.id === 'br-001' ? 5.5 :
        branch.id === 'br-002' ? 7.2 :
        branch.id === 'br-003' ? 6.0 :
        branch.id === 'br-004' ? 4.8 :
        branch.id === 'br-005' ? 6.8 :
        5.2;

      for (let hour = 6; hour <= 23; hour++) {
        // Demand curve: peaks at lunch (11-13) and dinner (18-20)
        let demandBase;
        if (hour >= 11 && hour <= 13) demandBase = 45;
        else if (hour >= 18 && hour <= 20) demandBase = 40;
        else if (hour >= 8 && hour <= 10) demandBase = 20;
        else if (hour >= 14 && hour <= 17) demandBase = 22;
        else demandBase = 12;

        if (isWeekend) demandBase *= 1.25;

        const orders = Math.round(demandBase * branchMultiplier * (0.8 + rng() * 0.4));
        const avgPrepTime = Math.round((branchPrepBase + (rng() * 3 - 1.5) + (orders > 40 ? 2.5 : 0)) * 10) / 10;
        const staff = Math.max(3, Math.round((orders / 10) * (0.8 + rng() * 0.4)));

        // Product sales for this hour
        const productSales = [];
        for (const product of PRODUCTS) {
          const productDemand =
            product.category === 'Burgers' ? 0.22 :
            product.category === 'Chicken' ? 0.18 :
            product.category === 'Sides' ? 0.15 :
            product.category === 'Beverages' ? 0.14 :
            product.category === 'Combos' ? 0.12 :
            product.category === 'Wraps' ? 0.10 :
            0.09;

          const qty = Math.round(orders * productDemand * (0.5 + rng() * 1.0));
          if (qty > 0) {
            productSales.push({
              productId: product.id,
              quantity: qty,
              revenue: Math.round(qty * product.price * 100) / 100,
            });
          }
        }

        const totalRevenue = productSales.reduce((s, p) => s + p.revenue, 0);

        data.push({
          branchId: branch.id,
          date: dateStr,
          hour,
          orders,
          avgPrepTime,
          staffOnDuty: staff,
          productSales,
          revenue: Math.round(totalRevenue * 100) / 100,
        });
      }
    }
  }

  return data;
}

const hourlyData = generateHourlyData();

export { BRANCHES, PRODUCTS, hourlyData };
