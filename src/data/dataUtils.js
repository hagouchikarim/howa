import { hourlyData, BRANCHES, PRODUCTS } from './restaurantData';

// Get all unique dates sorted
export function getDates() {
  return [...new Set(hourlyData.map(d => d.date))].sort();
}

// Filter hourly data by branch and/or date range
export function filterData({ branchId, startDate, endDate } = {}) {
  return hourlyData.filter(d => {
    if (branchId && d.branchId !== branchId) return false;
    if (startDate && d.date < startDate) return false;
    if (endDate && d.date > endDate) return false;
    return true;
  });
}

// Aggregate totals for a filtered set of hourly records
export function aggregateTotals(records) {
  const totalOrders = records.reduce((s, r) => s + r.orders, 0);
  const totalRevenue = records.reduce((s, r) => s + r.revenue, 0);
  const avgPrepTime = records.length
    ? Math.round((records.reduce((s, r) => s + r.avgPrepTime, 0) / records.length) * 10) / 10
    : 0;
  const avgStaff = records.length
    ? Math.round(records.reduce((s, r) => s + r.staffOnDuty, 0) / records.length)
    : 0;
  return { totalOrders, totalRevenue: Math.round(totalRevenue * 100) / 100, avgPrepTime, avgStaff };
}

// Get daily totals (orders, revenue) across all branches or for a specific branch
export function getDailyTotals(branchId = null) {
  const filtered = branchId ? hourlyData.filter(d => d.branchId === branchId) : hourlyData;
  const byDate = {};
  for (const r of filtered) {
    if (!byDate[r.date]) byDate[r.date] = { date: r.date, orders: 0, revenue: 0 };
    byDate[r.date].orders += r.orders;
    byDate[r.date].revenue += r.revenue;
  }
  return Object.values(byDate).sort((a, b) => a.date.localeCompare(b.date));
}

// Get totals per branch for comparison
export function getBranchSummaries() {
  return BRANCHES.map(branch => {
    const records = hourlyData.filter(d => d.branchId === branch.id);
    const totals = aggregateTotals(records);
    // find peak hour
    const byHour = {};
    for (const r of records) {
      if (!byHour[r.hour]) byHour[r.hour] = 0;
      byHour[r.hour] += r.orders;
    }
    const peakHour = Object.entries(byHour).sort((a, b) => b[1] - a[1])[0];
    return {
      ...branch,
      ...totals,
      peakHour: peakHour ? `${peakHour[0]}:00` : 'N/A',
      peakHourOrders: peakHour ? peakHour[1] : 0,
    };
  }).sort((a, b) => b.totalOrders - a.totalOrders);
}

// Get orders by hour of day (for demand heatmap)
export function getHourlyDemand(branchId = null) {
  const filtered = branchId ? hourlyData.filter(d => d.branchId === branchId) : hourlyData;
  const byHour = {};
  const countByHour = {};
  for (const r of filtered) {
    if (!byHour[r.hour]) { byHour[r.hour] = 0; countByHour[r.hour] = 0; }
    byHour[r.hour] += r.orders;
    countByHour[r.hour]++;
  }
  return Array.from({ length: 18 }, (_, i) => {
    const h = i + 6;
    return {
      hour: h,
      label: `${h}:00`,
      totalOrders: byHour[h] || 0,
      avgOrders: countByHour[h] ? Math.round((byHour[h] / countByHour[h]) * 10) / 10 : 0,
    };
  });
}

// Get product performance (aggregated across all data or filtered by branch)
export function getProductPerformance(branchId = null) {
  const filtered = branchId ? hourlyData.filter(d => d.branchId === branchId) : hourlyData;
  const productMap = {};
  for (const r of filtered) {
    for (const ps of r.productSales) {
      if (!productMap[ps.productId]) productMap[ps.productId] = { quantity: 0, revenue: 0 };
      productMap[ps.productId].quantity += ps.quantity;
      productMap[ps.productId].revenue += ps.revenue;
    }
  }
  return PRODUCTS.map(p => ({
    ...p,
    quantity: productMap[p.id]?.quantity || 0,
    revenue: Math.round((productMap[p.id]?.revenue || 0) * 100) / 100,
  })).sort((a, b) => b.quantity - a.quantity);
}

// Get category breakdown
export function getCategoryBreakdown(branchId = null) {
  const products = getProductPerformance(branchId);
  const catMap = {};
  for (const p of products) {
    if (!catMap[p.category]) catMap[p.category] = { category: p.category, quantity: 0, revenue: 0 };
    catMap[p.category].quantity += p.quantity;
    catMap[p.category].revenue += p.revenue;
  }
  return Object.values(catMap).sort((a, b) => b.quantity - a.quantity);
}

// Generate operational alerts based on thresholds
export function generateAlerts() {
  const alerts = [];
  const summaries = getBranchSummaries();
  const globalAvgPrep = summaries.reduce((s, b) => s + b.avgPrepTime, 0) / summaries.length;

  for (const branch of summaries) {
    // Slow prep time alert
    if (branch.avgPrepTime > 7) {
      alerts.push({
        id: `alert-prep-${branch.id}`,
        severity: branch.avgPrepTime > 8 ? 'critical' : 'warning',
        type: 'Slow Preparation',
        branch: branch.name,
        message: `Average preparation time is ${branch.avgPrepTime} min (threshold: 7 min)`,
        metric: `${branch.avgPrepTime} min`,
        timestamp: new Date().toISOString(),
      });
    }
  }

  // Check for demand spikes in individual hours (last 3 days)
  const dates = getDates();
  const recentDates = dates.slice(-3);
  const olderDates = dates.slice(-10, -3);

  for (const branch of BRANCHES) {
    const recentRecords = hourlyData.filter(d => d.branchId === branch.id && recentDates.includes(d.date));
    const olderRecords = hourlyData.filter(d => d.branchId === branch.id && olderDates.includes(d.date));

    const recentAvg = recentRecords.length ? recentRecords.reduce((s, r) => s + r.orders, 0) / recentRecords.length : 0;
    const olderAvg = olderRecords.length ? olderRecords.reduce((s, r) => s + r.orders, 0) / olderRecords.length : 0;

    if (olderAvg > 0 && recentAvg > olderAvg * 1.4) {
      alerts.push({
        id: `alert-spike-${branch.id}`,
        severity: 'warning',
        type: 'Demand Spike',
        branch: branch.name,
        message: `Recent demand is ${Math.round((recentAvg / olderAvg) * 100)}% of historical average`,
        metric: `${Math.round(recentAvg)} avg orders/hr`,
        timestamp: new Date().toISOString(),
      });
    }

    // Revenue drop check
    if (dates.length >= 2) {
      const lastDayRevenue = hourlyData
        .filter(d => d.branchId === branch.id && d.date === dates[dates.length - 1])
        .reduce((s, r) => s + r.revenue, 0);
      const prevDayRevenue = hourlyData
        .filter(d => d.branchId === branch.id && d.date === dates[dates.length - 2])
        .reduce((s, r) => s + r.revenue, 0);

      if (prevDayRevenue > 0 && lastDayRevenue < prevDayRevenue * 0.8) {
        alerts.push({
          id: `alert-rev-${branch.id}`,
          severity: 'warning',
          type: 'Revenue Drop',
          branch: branch.name,
          message: `Revenue dropped ${Math.round((1 - lastDayRevenue / prevDayRevenue) * 100)}% day-over-day`,
          metric: `$${Math.round(lastDayRevenue).toLocaleString()}`,
          timestamp: new Date().toISOString(),
        });
      }
    }
  }

  // Add some informational alerts
  const topBranch = summaries[0];
  alerts.push({
    id: 'alert-info-top',
    severity: 'info',
    type: 'Top Performer',
    branch: topBranch.name,
    message: `Leading all branches with ${topBranch.totalOrders.toLocaleString()} total orders this month`,
    metric: `${topBranch.totalOrders.toLocaleString()} orders`,
    timestamp: new Date().toISOString(),
  });

  const fastestBranch = [...summaries].sort((a, b) => a.avgPrepTime - b.avgPrepTime)[0];
  alerts.push({
    id: 'alert-info-fast',
    severity: 'info',
    type: 'Fastest Service',
    branch: fastestBranch.name,
    message: `Best average preparation time at ${fastestBranch.avgPrepTime} min`,
    metric: `${fastestBranch.avgPrepTime} min`,
    timestamp: new Date().toISOString(),
  });

  return alerts.sort((a, b) => {
    const sev = { critical: 0, warning: 1, info: 2 };
    return sev[a.severity] - sev[b.severity];
  });
}
