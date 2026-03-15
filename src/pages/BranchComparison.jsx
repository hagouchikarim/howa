import { useMemo, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { Lightbulb } from 'lucide-react';
import { getBranchSummaries } from '../data/dataUtils';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function BranchComparison() {
  const summaries = useMemo(() => getBranchSummaries(), []);
  const [selectedBranches, setSelectedBranches] = useState(summaries.map(b => b.id));

  const filtered = useMemo(
    () => summaries.filter(b => selectedBranches.includes(b.id)),
    [summaries, selectedBranches]
  );

  const toggleBranch = (id) => {
    setSelectedBranches(prev =>
      prev.includes(id)
        ? prev.filter(x => x !== id)
        : [...prev, id]
    );
  };

  // Generate insight
  const fastest = [...filtered].sort((a, b) => a.avgPrepTime - b.avgPrepTime)[0];
  const mostOrders = [...filtered].sort((a, b) => b.totalOrders - a.totalOrders)[0];
  const highestRevenue = [...filtered].sort((a, b) => b.totalRevenue - a.totalRevenue)[0];

  const comparisonChart = useMemo(() => ({
    labels: filtered.map(b => b.name),
    datasets: [
      {
        label: 'Total Orders',
        data: filtered.map(b => b.totalOrders),
        backgroundColor: 'rgba(99, 102, 241, 0.7)',
        borderRadius: 6,
        borderSkipped: false,
      },
      {
        label: 'Revenue ($100s)',
        data: filtered.map(b => Math.round(b.totalRevenue / 100)),
        backgroundColor: 'rgba(16, 185, 129, 0.7)',
        borderRadius: 6,
        borderSkipped: false,
      },
    ],
  }), [filtered]);

  const prepChart = useMemo(() => ({
    labels: filtered.map(b => b.name),
    datasets: [{
      label: 'Avg Prep Time (min)',
      data: filtered.map(b => b.avgPrepTime),
      backgroundColor: filtered.map(b =>
        b.avgPrepTime > 7 ? 'rgba(239, 68, 68, 0.7)' :
        b.avgPrepTime > 6 ? 'rgba(245, 158, 11, 0.7)' :
        'rgba(16, 185, 129, 0.7)'
      ),
      borderRadius: 6,
      borderSkipped: false,
    }],
  }), [filtered]);

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: { color: '#94a3b8', font: { family: 'Inter', size: 12 }, usePointStyle: true, pointStyle: 'rectRounded' },
      },
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
      {/* Branch filter toggles */}
      <div className="filter-bar">
        {summaries.map(b => (
          <button
            key={b.id}
            onClick={() => toggleBranch(b.id)}
            style={{
              padding: '8px 16px',
              borderRadius: '20px',
              border: `1px solid ${selectedBranches.includes(b.id) ? 'rgba(99,102,241,0.5)' : 'rgba(255,255,255,0.06)'}`,
              background: selectedBranches.includes(b.id) ? 'rgba(99,102,241,0.15)' : 'rgba(255,255,255,0.04)',
              color: selectedBranches.includes(b.id) ? '#a5b4fc' : '#64748b',
              cursor: 'pointer',
              fontFamily: 'Inter',
              fontSize: '0.82rem',
              fontWeight: 500,
              transition: 'all 0.25s ease',
            }}
          >
            {b.name}
          </button>
        ))}
      </div>

      {/* Insight */}
      {fastest && mostOrders && (
        <div className="insight-box">
          <Lightbulb size={20} />
          <div className="insight-text">
            <strong>{fastest.name}</strong> has the fastest service at <strong>{fastest.avgPrepTime} min</strong> avg prep time.{' '}
            <strong>{mostOrders.name}</strong> leads in volume with <strong>{mostOrders.totalOrders.toLocaleString()}</strong> orders.{' '}
            <strong>{highestRevenue.name}</strong> generates the highest revenue at <strong>${Math.round(highestRevenue.totalRevenue).toLocaleString()}</strong>.
          </div>
        </div>
      )}

      {/* Charts */}
      <div className="charts-grid">
        <div className="card">
          <div className="card-header">
            <div>
              <div className="card-title">Orders & Revenue Comparison</div>
              <div className="card-subtitle">Side-by-side branch metrics</div>
            </div>
          </div>
          <div className="chart-container" style={{ height: '320px' }}>
            <Bar data={comparisonChart} options={chartOptions} />
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <div>
              <div className="card-title">Preparation Speed</div>
              <div className="card-subtitle">Average time per order by branch</div>
            </div>
          </div>
          <div className="chart-container" style={{ height: '320px' }}>
            <Bar data={prepChart} options={{ ...chartOptions, plugins: { ...chartOptions.plugins, legend: { display: false } } }} />
          </div>
        </div>
      </div>

      {/* Comparison Table */}
      <div className="card" style={{ marginTop: 'var(--space-lg)' }}>
        <div className="card-header">
          <div>
            <div className="card-title">Detailed Comparison</div>
            <div className="card-subtitle">Full metrics breakdown by branch</div>
          </div>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>Rank</th>
                <th>Branch</th>
                <th>City</th>
                <th>Total Orders</th>
                <th>Avg Prep Time</th>
                <th>Revenue</th>
                <th>Peak Hour</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((b, i) => (
                <tr key={b.id}>
                  <td>
                    <div className="branch-rank" style={{ width: 24, height: 24, fontSize: '0.7rem' }}>{i + 1}</div>
                  </td>
                  <td>{b.name}</td>
                  <td>{b.city}</td>
                  <td>{b.totalOrders.toLocaleString()}</td>
                  <td>
                    <span style={{
                      color: b.avgPrepTime > 7 ? '#ef4444' : b.avgPrepTime > 6 ? '#f59e0b' : '#10b981',
                      fontWeight: 600
                    }}>
                      {b.avgPrepTime} min
                    </span>
                  </td>
                  <td>${Math.round(b.totalRevenue).toLocaleString()}</td>
                  <td>{b.peakHour}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
