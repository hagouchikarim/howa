import { useMemo } from 'react';
import {
  Chart as ChartJS,
  CategoryScale, LinearScale, PointElement, LineElement,
  BarElement, Title, Tooltip, Legend, Filler
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';
import { ShoppingCart, Clock, DollarSign, Store, MapPin } from 'lucide-react';
import StatCard from '../components/StatCard';
import { getBranchSummaries, getDailyTotals, aggregateTotals, filterData } from '../data/dataUtils';
import { BRANCHES } from '../data/restaurantData';

ChartJS.register(
  CategoryScale, LinearScale, PointElement, LineElement,
  BarElement, Title, Tooltip, Legend, Filler
);

const chartDefaults = {
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
    },
  },
};

export default function Dashboard() {
  const allRecords = useMemo(() => filterData(), []);
  const totals = useMemo(() => aggregateTotals(allRecords), [allRecords]);
  const dailyTotals = useMemo(() => getDailyTotals(), []);
  const branchSummaries = useMemo(() => getBranchSummaries(), []);

  const trendChartData = useMemo(() => ({
    labels: dailyTotals.map(d => {
      const date = new Date(d.date);
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }),
    datasets: [{
      label: 'Orders',
      data: dailyTotals.map(d => d.orders),
      borderColor: '#6366f1',
      backgroundColor: 'rgba(99, 102, 241, 0.08)',
      fill: true,
      tension: 0.4,
      pointRadius: 0,
      pointHoverRadius: 6,
      pointHoverBackgroundColor: '#6366f1',
      borderWidth: 2.5,
    }],
  }), [dailyTotals]);

  const branchBarData = useMemo(() => ({
    labels: branchSummaries.map(b => b.name),
    datasets: [{
      label: 'Total Orders',
      data: branchSummaries.map(b => b.totalOrders),
      backgroundColor: [
        'rgba(99, 102, 241, 0.7)',
        'rgba(6, 182, 212, 0.7)',
        'rgba(16, 185, 129, 0.7)',
        'rgba(245, 158, 11, 0.7)',
        'rgba(239, 68, 68, 0.7)',
        'rgba(59, 130, 246, 0.7)',
      ],
      borderRadius: 8,
      borderSkipped: false,
    }],
  }), [branchSummaries]);

  return (
    <div>
      {/* KPI Cards */}
      <div className="stat-cards-grid">
        <StatCard
          icon={ShoppingCart}
          iconColor="purple"
          label="Total Orders"
          value={totals.totalOrders.toLocaleString()}
          trend={12.5}
          trendLabel="vs last month"
        />
        <StatCard
          icon={Clock}
          iconColor="cyan"
          label="Avg Prep Time"
          value={`${totals.avgPrepTime} min`}
          trend={-3.2}
          trendLabel="improvement"
        />
        <StatCard
          icon={DollarSign}
          iconColor="green"
          label="Total Revenue"
          value={`$${Math.round(totals.totalRevenue).toLocaleString()}`}
          trend={8.7}
          trendLabel="vs last month"
        />
        <StatCard
          icon={Store}
          iconColor="amber"
          label="Active Branches"
          value={BRANCHES.length}
          trend={0}
          trendLabel="stable"
        />
      </div>

      {/* Charts */}
      <div className="charts-grid">
        <div className="card full-width">
          <div className="card-header">
            <div>
              <div className="card-title">Orders Trend</div>
              <div className="card-subtitle">Daily order volume across all branches</div>
            </div>
          </div>
          <div className="chart-container" style={{ height: '300px' }}>
            <Line data={trendChartData} options={chartDefaults} />
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <div>
              <div className="card-title">Orders by Branch</div>
              <div className="card-subtitle">Total orders per location</div>
            </div>
          </div>
          <div className="chart-container" style={{ height: '280px' }}>
            <Bar data={branchBarData} options={{
              ...chartDefaults,
              indexAxis: 'y',
              scales: {
                ...chartDefaults.scales,
                x: { ...chartDefaults.scales.x, beginAtZero: true },
              },
            }} />
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <div>
              <div className="card-title">Revenue by Branch</div>
              <div className="card-subtitle">Total revenue per location</div>
            </div>
          </div>
          <div className="chart-container" style={{ height: '280px' }}>
            <Bar data={{
              labels: branchSummaries.map(b => b.name),
              datasets: [{
                label: 'Revenue ($)',
                data: branchSummaries.map(b => Math.round(b.totalRevenue)),
                backgroundColor: [
                  'rgba(16, 185, 129, 0.7)',
                  'rgba(6, 182, 212, 0.7)',
                  'rgba(99, 102, 241, 0.7)',
                  'rgba(245, 158, 11, 0.7)',
                  'rgba(59, 130, 246, 0.7)',
                  'rgba(239, 68, 68, 0.7)',
                ],
                borderRadius: 8,
                borderSkipped: false,
              }],
            }} options={{
              ...chartDefaults,
              indexAxis: 'y',
              scales: {
                ...chartDefaults.scales,
                x: { ...chartDefaults.scales.x, beginAtZero: true },
              },
            }} />
          </div>
        </div>
      </div>

      {/* Branch Cards */}
      <div className="card-header" style={{ marginBottom: 'var(--space-lg)' }}>
        <div>
          <div className="card-title" style={{ fontSize: '1.1rem' }}>Branch Performance</div>
          <div className="card-subtitle">Individual branch metrics overview</div>
        </div>
      </div>
      <div className="branches-grid">
        {branchSummaries.map((branch, idx) => (
          <div key={branch.id} className="branch-card animate-in">
            <div className="branch-card-header">
              <div>
                <div className="branch-name">{branch.name}</div>
                <div className="branch-city">
                  <MapPin size={12} style={{ display: 'inline', verticalAlign: 'middle', marginRight: 4 }} />
                  {branch.city}
                </div>
              </div>
              <div className="branch-rank">{idx + 1}</div>
            </div>
            <div className="branch-metrics">
              <div className="branch-metric-item">
                <div className="branch-metric-label">Orders</div>
                <div className="branch-metric-value">{branch.totalOrders.toLocaleString()}</div>
              </div>
              <div className="branch-metric-item">
                <div className="branch-metric-label">Avg Prep</div>
                <div className="branch-metric-value">{branch.avgPrepTime} min</div>
              </div>
              <div className="branch-metric-item">
                <div className="branch-metric-label">Revenue</div>
                <div className="branch-metric-value">${Math.round(branch.totalRevenue).toLocaleString()}</div>
              </div>
              <div className="branch-metric-item">
                <div className="branch-metric-label">Peak Hour</div>
                <div className="branch-metric-value">{branch.peakHour}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
