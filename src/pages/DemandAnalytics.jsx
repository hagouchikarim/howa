import { useMemo, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale, LinearScale, PointElement, LineElement,
  BarElement, Title, Tooltip, Legend, Filler
} from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';
import { Lightbulb, Clock, Users } from 'lucide-react';
import { getHourlyDemand, getDailyTotals } from '../data/dataUtils';
import { BRANCHES } from '../data/restaurantData';

ChartJS.register(
  CategoryScale, LinearScale, PointElement, LineElement,
  BarElement, Title, Tooltip, Legend, Filler
);

export default function DemandAnalytics() {
  const [branchFilter, setBranchFilter] = useState('');

  const hourlyDemand = useMemo(() => getHourlyDemand(branchFilter || null), [branchFilter]);
  const dailyTotals = useMemo(() => getDailyTotals(branchFilter || null), [branchFilter]);

  // Find peak hours (top 3)
  const peakHours = useMemo(() =>
    [...hourlyDemand].sort((a, b) => b.avgOrders - a.avgOrders).slice(0, 3),
    [hourlyDemand]
  );

  // Demand bar chart with gradient coloring based on volume
  const maxAvg = Math.max(...hourlyDemand.map(h => h.avgOrders));
  const hourlyChartData = useMemo(() => ({
    labels: hourlyDemand.map(h => h.label),
    datasets: [{
      label: 'Avg Orders / Hour',
      data: hourlyDemand.map(h => h.avgOrders),
      backgroundColor: hourlyDemand.map(h => {
        const intensity = h.avgOrders / maxAvg;
        if (intensity > 0.8) return 'rgba(239, 68, 68, 0.75)';
        if (intensity > 0.6) return 'rgba(245, 158, 11, 0.75)';
        if (intensity > 0.4) return 'rgba(99, 102, 241, 0.75)';
        return 'rgba(99, 102, 241, 0.35)';
      }),
      borderRadius: 6,
      borderSkipped: false,
    }],
  }), [hourlyDemand, maxAvg]);

  const trendChartData = useMemo(() => ({
    labels: dailyTotals.map(d => {
      const date = new Date(d.date);
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }),
    datasets: [{
      label: 'Daily Orders',
      data: dailyTotals.map(d => d.orders),
      borderColor: '#06b6d4',
      backgroundColor: 'rgba(6, 182, 212, 0.08)',
      fill: true,
      tension: 0.4,
      pointRadius: 3,
      pointHoverRadius: 6,
      pointBackgroundColor: '#06b6d4',
      pointHoverBackgroundColor: '#06b6d4',
      borderWidth: 2.5,
    }],
  }), [dailyTotals]);

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: 'rgba(17, 24, 39, 0.95)',
        borderColor: 'rgba(99, 102, 241, 0.3)',
        borderWidth: 1,
        padding: 12,
        titleFont: { family: 'Inter', size: 13, weight: '600' },
        bodyFont: { family: 'Inter', size: 12 },
        cornerRadius: 8,
      },
    },
    scales: {
      x: {
        grid: { color: 'rgba(255,255,255,0.04)' },
        ticks: { color: '#64748b', font: { family: 'Inter', size: 11 } },
      },
      y: {
        grid: { color: 'rgba(255,255,255,0.04)' },
        ticks: { color: '#64748b', font: { family: 'Inter', size: 11 } },
        beginAtZero: true,
      },
    },
  };

  return (
    <div>
      {/* Filter */}
      <div className="filter-bar">
        <select
          className="filter-select"
          value={branchFilter}
          onChange={e => setBranchFilter(e.target.value)}
        >
          <option value="">All Branches</option>
          {BRANCHES.map(b => (
            <option key={b.id} value={b.id}>{b.name}</option>
          ))}
        </select>
      </div>

      {/* Peak Hours Cards */}
      <div className="peak-cards">
        {peakHours.map((peak, i) => (
          <div key={peak.hour} className="peak-card animate-in">
            <div className="peak-card-time">{peak.label}</div>
            <div className="peak-card-label">
              {i === 0 ? '🔥 Highest Peak' : i === 1 ? '⚡ 2nd Peak' : '📈 3rd Peak'}
            </div>
            <div className="peak-card-value">{peak.avgOrders} avg orders/hr</div>
          </div>
        ))}
        <div className="peak-card animate-in">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
            <Users size={20} color="#6366f1" />
          </div>
          <div className="peak-card-label">Staffing Tip</div>
          <div className="peak-card-value" style={{ fontSize: '0.85rem', color: '#94a3b8' }}>
            Add extra staff during {peakHours[0]?.label}–{peakHours.length > 1 && `${parseInt(peakHours[0]?.label) + 2}:00`}
          </div>
        </div>
      </div>

      {/* Insight */}
      <div className="insight-box">
        <Lightbulb size={20} />
        <div className="insight-text">
          Peak demand occurs at <strong>{peakHours[0]?.label}</strong> with an average of <strong>{peakHours[0]?.avgOrders} orders per hour</strong>.
          Consider scheduling additional staff between <strong>{peakHours[0]?.label}</strong> and <strong>{parseInt(peakHours[0]?.label) + 2}:00</strong> to reduce preparation times during rush periods.
        </div>
      </div>

      {/* Charts */}
      <div className="charts-grid">
        <div className="card full-width">
          <div className="card-header">
            <div>
              <div className="card-title">Hourly Demand Distribution</div>
              <div className="card-subtitle">Average orders per hour of day (red = highest demand)</div>
            </div>
          </div>
          <div className="chart-container" style={{ height: '320px' }}>
            <Bar data={hourlyChartData} options={chartOptions} />
          </div>
        </div>

        <div className="card full-width">
          <div className="card-header">
            <div>
              <div className="card-title">30-Day Demand Trend</div>
              <div className="card-subtitle">Daily order volume over the past month</div>
            </div>
          </div>
          <div className="chart-container" style={{ height: '280px' }}>
            <Line data={trendChartData} options={chartOptions} />
          </div>
        </div>
      </div>
    </div>
  );
}
