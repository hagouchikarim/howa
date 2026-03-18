import { useMemo, useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale, LinearScale, PointElement, LineElement,
  BarElement, Title, Tooltip, Legend, Filler
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';
import { ShoppingCart, Clock, DollarSign, Store, MapPin, Activity, CheckCircle2, AlertCircle, Brain } from 'lucide-react';
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

  // AI Forecasting State
  const aiForecastsList = useMemo(() => [
    "Predicting 35% surge in orders at Downtown Branch in 45m.",
    "Recommendation: Prep 120 extra buns at Northside to avoid stockout.",
    "Optimizing delivery routes for upcoming evening rush...",
    "Detecting anomalous order volume across drive-thrus.",
    "System nominal. All branches operating at 94% efficiency."
  ], []);

  const [currentForecastIndex, setCurrentForecastIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    const fullText = aiForecastsList[currentForecastIndex];
    if (isTyping) {
      if (displayedText.length < fullText.length) {
        const timeout = setTimeout(() => {
          setDisplayedText(fullText.slice(0, displayedText.length + 1));
        }, 30 + Math.random() * 40);
        return () => clearTimeout(timeout);
      } else {
        setIsTyping(false);
        const timeout = setTimeout(() => {
          setDisplayedText('');
          setIsTyping(true);
          setCurrentForecastIndex((prev) => (prev + 1) % aiForecastsList.length);
        }, 5000);
        return () => clearTimeout(timeout);
      }
    }
  }, [displayedText, isTyping, currentForecastIndex, aiForecastsList]);  const [liveOrders, setLiveOrders] = useState([
    { id: 1, text: "Large catering order at Westside", time: "2 min ago", amount: "$350.00", type: "order" },
    { id: 2, text: "Inventory alert: Buns low at North", time: "15 min ago", type: "alert" },
    { id: 3, text: "New mobile order at Downtown", time: "22 min ago", amount: "$42.50", type: "order" },
    { id: 4, text: "Delivery delayed at South Branch", time: "45 min ago", type: "alert" },
  ]);

  useEffect(() => {
    // Simulate real-time incoming events
    const branchNames = BRANCHES.map(b => b.name);
    const interval = setInterval(() => {
       setLiveOrders(prev => {
         const isAlert = Math.random() > 0.8;
         const branch = branchNames[Math.floor(Math.random() * branchNames.length)];
         
         const newEvent = isAlert 
           ? { id: Date.now(), text: `Staffing warning at ${branch}`, time: "Just now", type: "alert" }
           : { id: Date.now(), text: `New app order at ${branch}`, time: "Just now", amount: `$${(Math.random() * 50 + 15).toFixed(2)}`, type: "order" };
           
         return [newEvent, ...prev].slice(0, 6);
       });
    }, 12000);
    return () => clearInterval(interval);
  }, []);

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
    <div className="dashboard-container">
      {/* Hero Banner */}
      <div className="hero-banner animate-in">
        <div className="hero-content">
          <h1 className="hero-title">Welcome back, Admin</h1>
          <p className="hero-subtitle">System is running optimally. Revenue is up <span className="trend-up">8.7%</span> from last month.</p>
        </div>
        <div className="hero-visual">
          <div className="hero-orb"></div>
          <Activity size={56} className="hero-icon" />
        </div>
      </div>

      <div className="dashboard-layout">
        <div className="dashboard-main">
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
              <div key={branch.id} className="branch-card animate-in" style={{ animationDelay: `${idx * 0.1}s` }}>
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

        <aside className="dashboard-sidebar">
          <div className="card live-feed-widget">
            <div className="card-header" style={{ marginBottom: 'var(--space-md)' }}>
              <div>
                <div className="card-title">Live Activity</div>
                <div className="card-subtitle">Real-time enterprise feed</div>
              </div>
              <div className="pulsing-dot"></div>
            </div>
            
            <div className="live-feed-list">
              {liveOrders.map((event, index) => (
                <div key={event.id} className={`live-feed-item animate-in ${event.type}`}>
                  <div className="feed-icon-wrapper">
                    {event.type === 'order' ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
                  </div>
                  <div className="feed-content">
                    <div className="feed-text">{event.text}</div>
                    <div className="feed-meta">
                      <span className="feed-time">{event.time}</span>
                      {event.amount && <span className="feed-amount">{event.amount}</span>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <button className="feed-view-all">View Full Log</button>
          </div>

          {/* AI Predictive Insights Widget */}
          <div className="card ai-widget animate-in" style={{ animationDelay: '0.2s', marginTop: 'var(--space-xl)' }}>
            <div className="card-header" style={{ marginBottom: 'var(--space-md)' }}>
              <div>
                <div className="card-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Brain size={16} className="ai-core-icon" />
                  AI Predictive Insights
                </div>
                <div className="card-subtitle">Neural forecasting engine</div>
              </div>
              <div className="ai-pulse-ring"></div>
            </div>
            
            <div className="ai-content-box">
              <p className="typewriter-text">
                {displayedText}
                <span className="typewriter-cursor">|</span>
              </p>
            </div>
            
            <div className="ai-confidence">
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '0.75rem', fontWeight: '600', color: 'var(--text-muted)' }}>
                <span>AI CONFIDENCE</span>
                <span style={{ color: 'var(--accent-primary-light)' }}>94%</span>
              </div>
              <div className="confidence-bar">
                <div className="confidence-fill" style={{ width: '94%' }}></div>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
