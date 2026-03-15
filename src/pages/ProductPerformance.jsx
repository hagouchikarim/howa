import { useMemo, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale, LinearScale, BarElement, ArcElement,
  Title, Tooltip, Legend
} from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';
import { getProductPerformance, getCategoryBreakdown } from '../data/dataUtils';
import { BRANCHES } from '../data/restaurantData';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);

const categoryColors = {
  'Burgers': 'rgba(99, 102, 241, 0.8)',
  'Chicken': 'rgba(239, 68, 68, 0.8)',
  'Sides': 'rgba(245, 158, 11, 0.8)',
  'Beverages': 'rgba(6, 182, 212, 0.8)',
  'Combos': 'rgba(16, 185, 129, 0.8)',
  'Wraps': 'rgba(168, 85, 247, 0.8)',
  'Desserts': 'rgba(236, 72, 153, 0.8)',
};

export default function ProductPerformance() {
  const [branchFilter, setBranchFilter] = useState('');

  const products = useMemo(() => getProductPerformance(branchFilter || null), [branchFilter]);
  const categories = useMemo(() => getCategoryBreakdown(branchFilter || null), [branchFilter]);
  const top10 = products.slice(0, 10);

  const barData = useMemo(() => ({
    labels: top10.map(p => p.name),
    datasets: [{
      label: 'Units Sold',
      data: top10.map(p => p.quantity),
      backgroundColor: top10.map(p => categoryColors[p.category] || 'rgba(99,102,241,0.7)'),
      borderRadius: 6,
      borderSkipped: false,
    }],
  }), [top10]);

  const doughnutData = useMemo(() => ({
    labels: categories.map(c => c.category),
    datasets: [{
      data: categories.map(c => c.quantity),
      backgroundColor: categories.map(c => categoryColors[c.category] || 'rgba(99,102,241,0.7)'),
      borderColor: '#0a0e1a',
      borderWidth: 3,
      hoverOffset: 8,
    }],
  }), [categories]);

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
        beginAtZero: true,
      },
      y: {
        grid: { color: 'rgba(255,255,255,0.04)' },
        ticks: { color: '#64748b', font: { family: 'Inter', size: 11 } },
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

      {/* Charts */}
      <div className="charts-grid">
        <div className="card">
          <div className="card-header">
            <div>
              <div className="card-title">Top 10 Products by Volume</div>
              <div className="card-subtitle">Most popular menu items by units sold</div>
            </div>
          </div>
          <div className="chart-container" style={{ height: '380px' }}>
            <Bar data={barData} options={{
              ...chartOptions,
              indexAxis: 'y',
            }} />
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <div>
              <div className="card-title">Category Mix</div>
              <div className="card-subtitle">Product distribution by category</div>
            </div>
          </div>
          <div className="chart-container" style={{ height: '380px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Doughnut data={doughnutData} options={{
              responsive: true,
              maintainAspectRatio: false,
              cutout: '65%',
              plugins: {
                legend: {
                  position: 'bottom',
                  labels: {
                    color: '#94a3b8',
                    font: { family: 'Inter', size: 12 },
                    usePointStyle: true,
                    pointStyle: 'circle',
                    padding: 16,
                  },
                },
                tooltip: chartOptions.plugins.tooltip,
              },
            }} />
          </div>
        </div>
      </div>

      {/* Product Table */}
      <div className="card" style={{ marginTop: 'var(--space-lg)' }}>
        <div className="card-header">
          <div>
            <div className="card-title">Product Rankings</div>
            <div className="card-subtitle">Complete product performance data</div>
          </div>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Product</th>
                <th>Category</th>
                <th>Price</th>
                <th>Units Sold</th>
                <th>Revenue</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p, i) => (
                <tr key={p.id}>
                  <td>{i + 1}</td>
                  <td>{p.name}</td>
                  <td>
                    <span className="badge info" style={{
                      background: categoryColors[p.category]?.replace('0.8', '0.15') || 'rgba(99,102,241,0.15)',
                      color: categoryColors[p.category]?.replace('0.8', '1') || '#6366f1',
                      border: 'none',
                    }}>
                      {p.category}
                    </span>
                  </td>
                  <td>${p.price.toFixed(2)}</td>
                  <td style={{ fontWeight: 600 }}>{p.quantity.toLocaleString()}</td>
                  <td style={{ color: '#10b981', fontWeight: 600 }}>${p.revenue.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
