# QSR Performance AI - UI Enhancements Walkthrough

I have successfully innovated the landing pages for the QSR Performance AI portal. The application now features a much more premium, dynamic, and engaging user experience!

## Changes Made
- **Split-Screen Login Portal**: Completely refactored [Login.jsx](file:///c:/Users/lenovo/Downloads/SAAAAS/src/pages/Login.jsx) to use a modern split-screen design.
  - The left side features a dynamic, animated visual panel with branding ("Unlocking Restaurant Potential with AI") and translucent floating sub-cards highlighting key metrics (Revenue Growth, Active Branches, Cost Savings).
  - The right side features the clean authentication form you were familiar with, all wrapped in a sleek dark theme.
- **Dashboard Enhancements**: Heavily innovated the main landing page ([Dashboard.jsx](file:///c:/Users/lenovo/Downloads/SAAAAS/src/pages/Dashboard.jsx)).
  - **Hero Banner**: Added a dynamic "Welcome back, Admin" banner at the top of the dashboard containing the most critical system insight (e.g., "Revenue is up 8.7%"). It includes a shimmering icon and pulsing background orb.
  - **Live Feed Sidebar**: Added a new interactive "Live Activity" feed widget to the right side of the layout. It simulates real-time incoming orders and enterprise alerts directly on the dashboard.
  - **AI Forecasting Engine**: Added an all-new "AI Predictive Insights" widget to the sidebar. It simulates an AI engine with a pulsing "Neural Core" icon and uses a typewriter effect to stream actionable insights (like "Predicting 35% surge in orders at Downtown Branch...").
- **CSS Styling**: Added extensive new styles to [index.css](file:///c:/Users/lenovo/Downloads/SAAAAS/src/index.css) to handle the grid layouts, flexboxes, micro-animations (`fade-in-up`, `float-slow`, `shake`, `ai-pulse`, `blink`, etc.), and glassmorphism cards.

## Visual Verification

### 1. Split-Screen Login Page
The login page now looks like a premium enterprise software splash screen:
![Split-Screen Login](file:///C:/Users/lenovo/.gemini/antigravity/brain/c5ddf9a3-8edb-47e8-92e9-20ebe71d45b4/.system_generated/click_feedback/click_feedback_1773873216057.png)

### 2. Dashboard with Hero Banner and Live Feed
The main dashboard is far more dynamic and engaging:
![Dashboard Enhancements](file:///C:/Users/lenovo/.gemini/antigravity/brain/c5ddf9a3-8edb-47e8-92e9-20ebe71d45b4/dashboard_final_view_1773873320622.png)

### 3. AI Predictive Insights Engine
The new sidebar widget computing its next forecast:
![AI Insights Engine](file:///C:/Users/lenovo/.gemini/antigravity/brain/c5ddf9a3-8edb-47e8-92e9-20ebe71d45b4/dashboard_ai_insights_1773873689931.png)

### Full Interactive Recordings
Here are recordings showing the layout interactions (login form and smooth responsive behavior) and the AI widget typewriter effect:
![Interactive Demonstration](file:///C:/Users/lenovo/.gemini/antigravity/brain/c5ddf9a3-8edb-47e8-92e9-20ebe71d45b4/ui_enhancements_verification_1773873184717.webp)
![AI Widget Demonstration](file:///C:/Users/lenovo/.gemini/antigravity/brain/c5ddf9a3-8edb-47e8-92e9-20ebe71d45b4/ai_widget_verification_1773873589923.webp)

You can view the full source code differences using the snippet below:
```diff:Login.jsx
===
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Activity, Lock, User, ArrowRight, TrendingUp, DollarSign, Store } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useApp();
  const navigate = useNavigate();

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 20 - 10,
        y: (e.clientY / window.innerHeight) * 20 - 10,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await login(username, password);
      // On success, navigate to the dashboard routing to root
      navigate('/', { replace: true });
    } catch (err) {
      setError(err.message || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-split-container">
      {/* Left Panel: Branding / Visuals */}
      <div className="login-visual-panel">
        <div 
          className="login-visual-bg"
          style={{
            transform: `translate(${mousePosition.x}px, ${mousePosition.y}px) scale(1.05)`,
          }}
        >
          <div className="glow-orb purple"></div>
          <div className="glow-orb cyan"></div>
        </div>

        <div className="login-visual-content">
          <div className="brand-logo">
            <Activity className="brand-icon" size={36} />
            <div className="brand-text">
              <h2>QSR Performance</h2>
              <span>AI Analytics</span>
            </div>
          </div>

          <div className="visual-hero">
            <h1>Unlocking Restaurant Potential with AI</h1>
            <p>Real-time insights, automated demand forecasting, and operational intelligence for the modern QSR enterprise.</p>
          </div>

          {/* Floating abstract stat cards */}
          <div className="floating-stats">
            <div className="float-card stat-1" style={{ transform: `translate(${-mousePosition.x * 0.5}px, ${-mousePosition.y * 0.5}px)` }}>
              <TrendingUp size={18} className="float-icon green" />
              <div className="float-info">
                <span>Revenue Growth</span>
                <strong>+12.4%</strong>
              </div>
            </div>
            <div className="float-card stat-2" style={{ transform: `translate(${mousePosition.x * 0.8}px, ${mousePosition.y * 0.8}px)` }}>
              <Store size={18} className="float-icon amber" />
              <div className="float-info">
                <span>Active Branches</span>
                <strong>6 Live</strong>
              </div>
            </div>
            <div className="float-card stat-3" style={{ transform: `translate(${-mousePosition.x * 1.2}px, ${mousePosition.y * 0.4}px)` }}>
              <DollarSign size={18} className="float-icon cyan" />
              <div className="float-info">
                <span>Cost Savings</span>
                <strong>$42,100</strong>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel: Authentication */}
      <div className="login-auth-panel">
        <div className="login-auth-wrapper">
          <div className="login-auth-header">
            <h2>Welcome Back</h2>
            <p>Sign in to your enterprise dashboard</p>
          </div>

          {error && <div className="login-error">{error}</div>}

          <form className="login-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <div className="input-with-icon">
                <User size={18} className="input-icon" />
                <input
                  id="username"
                  type="text"
                  placeholder="Enter any username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="input-with-icon">
                <Lock size={18} className="input-icon" />
                <input
                  id="password"
                  type="password"
                  placeholder="Enter any password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="forgot-password">
              <a href="#/">Forgot password?</a>
            </div>

            <button 
              type="submit" 
              className="login-submit" 
              disabled={isLoading || !username || !password}
            >
              {isLoading ? 'Authenticating...' : 'Sign In'}
              {!isLoading && <ArrowRight size={18} />}
            </button>
          </form>

          <div className="login-footer">
            <p>Demo Mode: Any username and password will work.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

```
```diff:Dashboard.jsx
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
===
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
```
```diff:index.css
/* ============================================
   QSR Performance AI — Global Design System
   Premium dark theme with glassmorphism
   ============================================ */

/* --- CSS Custom Properties --- */
:root {
  /* Core palette */
  --bg-primary: #0a0e1a;
  --bg-secondary: #111827;
  --bg-card: rgba(17, 24, 39, 0.7);
  --bg-card-hover: rgba(25, 35, 55, 0.85);
  --bg-sidebar: #0d1117;
  --bg-glass: rgba(255, 255, 255, 0.04);
  --bg-glass-hover: rgba(255, 255, 255, 0.08);

  /* Accent colors */
  --accent-primary: #6366f1;
  --accent-primary-light: #818cf8;
  --accent-secondary: #06b6d4;
  --accent-success: #10b981;
  --accent-warning: #f59e0b;
  --accent-danger: #ef4444;
  --accent-info: #3b82f6;

  /* Gradients */
  --gradient-primary: linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a78bfa 100%);
  --gradient-accent: linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%);
  --gradient-success: linear-gradient(135deg, #10b981 0%, #34d399 100%);
  --gradient-warning: linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%);
  --gradient-danger: linear-gradient(135deg, #ef4444 0%, #f87171 100%);
  --gradient-card: linear-gradient(145deg, rgba(99, 102, 241, 0.08) 0%, rgba(6, 182, 212, 0.04) 100%);

  /* Text */
  --text-primary: #f1f5f9;
  --text-secondary: #94a3b8;
  --text-muted: #64748b;
  --text-accent: #a5b4fc;

  /* Borders */
  --border-color: rgba(255, 255, 255, 0.06);
  --border-color-hover: rgba(255, 255, 255, 0.12);
  --border-accent: rgba(99, 102, 241, 0.3);

  /* Shadows */
  --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.3);
  --shadow-md: 0 4px 14px rgba(0, 0, 0, 0.35);
  --shadow-lg: 0 10px 40px rgba(0, 0, 0, 0.45);
  --shadow-glow: 0 0 30px rgba(99, 102, 241, 0.15);

  /* Radius */
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;
  --radius-xl: 20px;

  /* Spacing */
  --space-xs: 4px;
  --space-sm: 8px;
  --space-md: 16px;
  --space-lg: 24px;
  --space-xl: 32px;
  --space-2xl: 48px;

  /* Sidebar */
  --sidebar-width: 260px;
  --sidebar-collapsed: 72px;

  /* Transitions */
  --transition-fast: 0.15s ease;
  --transition-base: 0.25s ease;
  --transition-slow: 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

/* --- Reset & Base --- */
*, *::before, *::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  font-size: 16px;
  scroll-behavior: smooth;
}

body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  background: var(--bg-primary);
  color: var(--text-primary);
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  overflow-x: hidden;
}

#root {
  min-height: 100vh;
}

a {
  color: var(--accent-primary-light);
  text-decoration: none;
  transition: color var(--transition-fast);
}

a:hover {
  color: var(--accent-primary);
}

/* --- Scrollbar --- */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}
::-webkit-scrollbar-track {
  background: transparent;
}
::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 3px;
}
::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.2);
}

/* --- Layout --- */
.app-layout {
  display: flex;
  min-height: 100vh;
}

.sidebar {
  width: var(--sidebar-width);
  background: var(--bg-sidebar);
  border-right: 1px solid var(--border-color);
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  z-index: 100;
  transition: width var(--transition-slow);
  overflow: hidden;
}

.sidebar-brand {
  padding: var(--space-lg);
  display: flex;
  align-items: center;
  gap: var(--space-md);
  border-bottom: 1px solid var(--border-color);
  min-height: 72px;
}

.sidebar-brand-icon {
  width: 40px;
  height: 40px;
  border-radius: var(--radius-sm);
  background: var(--gradient-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  box-shadow: var(--shadow-glow);
}

.sidebar-brand-text h1 {
  font-size: 1rem;
  font-weight: 700;
  color: var(--text-primary);
  letter-spacing: -0.02em;
  line-height: 1.2;
}

.sidebar-brand-text span {
  font-size: 0.7rem;
  font-weight: 500;
  color: var(--accent-primary-light);
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.sidebar-nav {
  flex: 1;
  padding: var(--space-md) var(--space-sm);
  display: flex;
  flex-direction: column;
  gap: var(--space-xs);
  overflow-y: auto;
}

.sidebar-section-label {
  font-size: 0.65rem;
  font-weight: 600;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  padding: var(--space-md) var(--space-md) var(--space-xs);
}

.nav-link {
  display: flex;
  align-items: center;
  gap: var(--space-md);
  padding: 10px var(--space-md);
  border-radius: var(--radius-sm);
  color: var(--text-secondary);
  font-size: 0.875rem;
  font-weight: 500;
  transition: all var(--transition-base);
  cursor: pointer;
  position: relative;
  overflow: hidden;
  text-decoration: none;
}

.nav-link::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 3px;
  height: 0;
  background: var(--gradient-primary);
  border-radius: 0 2px 2px 0;
  transition: height var(--transition-base);
}

.nav-link:hover {
  color: var(--text-primary);
  background: var(--bg-glass-hover);
}

.nav-link.active {
  color: var(--text-primary);
  background: rgba(99, 102, 241, 0.1);
}

.nav-link.active::before {
  height: 60%;
}

.nav-link svg {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
  opacity: 0.7;
  transition: opacity var(--transition-fast);
}

.nav-link:hover svg,
.nav-link.active svg {
  opacity: 1;
}

.sidebar-footer {
  padding: var(--space-md);
  border-top: 1px solid var(--border-color);
}

.sidebar-footer-badge {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  padding: var(--space-sm) var(--space-md);
  border-radius: var(--radius-sm);
  background: rgba(16, 185, 129, 0.1);
  border: 1px solid rgba(16, 185, 129, 0.15);
}

.sidebar-footer-badge .dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--accent-success);
  animation: pulse-dot 2s ease-in-out infinite;
}

@keyframes pulse-dot {
  0%, 100% { opacity: 1; box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.4); }
  50% { opacity: 0.8; box-shadow: 0 0 0 6px rgba(16, 185, 129, 0); }
}

.sidebar-footer-badge span {
  font-size: 0.75rem;
  color: var(--accent-success);
  font-weight: 500;
}

/* Main content */
.main-content {
  flex: 1;
  margin-left: var(--sidebar-width);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.top-bar {
  padding: var(--space-lg) var(--space-xl);
  border-bottom: 1px solid var(--border-color);
  background: rgba(10, 14, 26, 0.8);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  position: sticky;
  top: 0;
  z-index: 50;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.top-bar h2 {
  font-size: 1.5rem;
  font-weight: 700;
  letter-spacing: -0.02em;
}

.top-bar-subtitle {
  font-size: 0.85rem;
  color: var(--text-muted);
  margin-top: 2px;
}

.top-bar-right {
  display: flex;
  align-items: center;
  gap: var(--space-md);
}

.top-bar-badge {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  padding: 6px 14px;
  border-radius: 20px;
  background: var(--bg-glass);
  border: 1px solid var(--border-color);
  font-size: 0.8rem;
  color: var(--text-secondary);
}

.page-content {
  flex: 1;
  padding: var(--space-xl);
}

/* --- Card Styles --- */
.card {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  padding: var(--space-lg);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  transition: all var(--transition-base);
  position: relative;
  overflow: hidden;
}

.card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent);
}

.card:hover {
  border-color: var(--border-color-hover);
  box-shadow: var(--shadow-md);
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--space-lg);
}

.card-title {
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--text-primary);
}

.card-subtitle {
  font-size: 0.78rem;
  color: var(--text-muted);
  margin-top: 2px;
}

/* --- Stat Cards --- */
.stat-cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: var(--space-lg);
  margin-bottom: var(--space-xl);
}

.stat-card {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  padding: var(--space-lg);
  display: flex;
  align-items: flex-start;
  gap: var(--space-md);
  transition: all var(--transition-base);
  position: relative;
  overflow: hidden;
}

.stat-card::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: var(--gradient-primary);
  opacity: 0;
  transition: opacity var(--transition-base);
}

.stat-card:hover {
  transform: translateY(-2px);
  border-color: var(--border-color-hover);
  box-shadow: var(--shadow-lg);
}

.stat-card:hover::after {
  opacity: 1;
}

.stat-card-icon {
  width: 48px;
  height: 48px;
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.stat-card-icon.purple { background: rgba(99, 102, 241, 0.12); color: var(--accent-primary-light); }
.stat-card-icon.cyan { background: rgba(6, 182, 212, 0.12); color: var(--accent-secondary); }
.stat-card-icon.green { background: rgba(16, 185, 129, 0.12); color: var(--accent-success); }
.stat-card-icon.amber { background: rgba(245, 158, 11, 0.12); color: var(--accent-warning); }
.stat-card-icon.red { background: rgba(239, 68, 68, 0.12); color: var(--accent-danger); }
.stat-card-icon.blue { background: rgba(59, 130, 246, 0.12); color: var(--accent-info); }

.stat-card-content {
  flex: 1;
  min-width: 0;
}

.stat-card-label {
  font-size: 0.78rem;
  color: var(--text-muted);
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.stat-card-value {
  font-size: 1.75rem;
  font-weight: 800;
  color: var(--text-primary);
  letter-spacing: -0.03em;
  line-height: 1.2;
  margin-top: 4px;
}

.stat-card-trend {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 0.75rem;
  font-weight: 600;
  margin-top: 6px;
  padding: 2px 8px;
  border-radius: 12px;
}

.stat-card-trend.up {
  color: var(--accent-success);
  background: rgba(16, 185, 129, 0.1);
}

.stat-card-trend.down {
  color: var(--accent-danger);
  background: rgba(239, 68, 68, 0.1);
}

/* --- Charts Grid --- */
.charts-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-lg);
  margin-bottom: var(--space-xl);
}

.charts-grid .full-width {
  grid-column: 1 / -1;
}

.chart-container {
  position: relative;
  width: 100%;
  min-height: 280px;
}

/* --- Table --- */
.data-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
}

.data-table th {
  text-align: left;
  padding: var(--space-md);
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  border-bottom: 1px solid var(--border-color);
  background: var(--bg-glass);
}

.data-table td {
  padding: var(--space-md);
  font-size: 0.875rem;
  color: var(--text-secondary);
  border-bottom: 1px solid var(--border-color);
  transition: background var(--transition-fast);
}

.data-table tr:hover td {
  background: var(--bg-glass-hover);
  color: var(--text-primary);
}

.data-table td:first-child {
  font-weight: 500;
  color: var(--text-primary);
}

/* --- Badges & Pills --- */
.badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.badge.critical {
  background: rgba(239, 68, 68, 0.12);
  color: var(--accent-danger);
  border: 1px solid rgba(239, 68, 68, 0.2);
}

.badge.warning {
  background: rgba(245, 158, 11, 0.12);
  color: var(--accent-warning);
  border: 1px solid rgba(245, 158, 11, 0.2);
}

.badge.info {
  background: rgba(59, 130, 246, 0.12);
  color: var(--accent-info);
  border: 1px solid rgba(59, 130, 246, 0.2);
}

/* --- Alerts Page --- */
.alerts-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
}

.alert-card {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  padding: var(--space-lg);
  display: flex;
  align-items: flex-start;
  gap: var(--space-md);
  transition: all var(--transition-base);
}

.alert-card:hover {
  border-color: var(--border-color-hover);
  box-shadow: var(--shadow-md);
  transform: translateX(4px);
}

.alert-card.critical { border-left: 4px solid var(--accent-danger); }
.alert-card.warning { border-left: 4px solid var(--accent-warning); }
.alert-card.info { border-left: 4px solid var(--accent-info); }

.alert-icon {
  width: 40px;
  height: 40px;
  border-radius: var(--radius-sm);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.alert-card.critical .alert-icon { background: rgba(239, 68, 68, 0.12); color: var(--accent-danger); }
.alert-card.warning .alert-icon { background: rgba(245, 158, 11, 0.12); color: var(--accent-warning); }
.alert-card.info .alert-icon { background: rgba(59, 130, 246, 0.12); color: var(--accent-info); }

.alert-body {
  flex: 1;
  min-width: 0;
}

.alert-header {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  margin-bottom: 4px;
}

.alert-type {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--text-primary);
}

.alert-message {
  font-size: 0.85rem;
  color: var(--text-secondary);
  line-height: 1.5;
}

.alert-meta {
  display: flex;
  align-items: center;
  gap: var(--space-md);
  margin-top: var(--space-sm);
  font-size: 0.75rem;
  color: var(--text-muted);
}

.alert-metric {
  margin-left: auto;
  padding: 4px 12px;
  border-radius: 8px;
  background: var(--bg-glass);
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--text-primary);
  white-space: nowrap;
}

/* --- Filter / Select --- */
.filter-bar {
  display: flex;
  align-items: center;
  gap: var(--space-md);
  margin-bottom: var(--space-xl);
  flex-wrap: wrap;
}

.filter-select {
  padding: 8px 16px;
  border-radius: var(--radius-sm);
  background: var(--bg-glass);
  border: 1px solid var(--border-color);
  color: var(--text-primary);
  font-size: 0.85rem;
  font-family: inherit;
  cursor: pointer;
  transition: border-color var(--transition-fast);
  outline: none;
  appearance: none;
  -webkit-appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 12px center;
  padding-right: 36px;
  min-width: 180px;
}

.filter-select:focus {
  border-color: var(--accent-primary);
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.15);
}

.filter-select option {
  background: var(--bg-secondary);
  color: var(--text-primary);
}

/* --- Branch Cards Grid --- */
.branches-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: var(--space-lg);
}

.branch-card {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  padding: var(--space-lg);
  transition: all var(--transition-base);
  position: relative;
  overflow: hidden;
}

.branch-card:hover {
  transform: translateY(-3px);
  border-color: var(--border-accent);
  box-shadow: var(--shadow-lg), var(--shadow-glow);
}

.branch-card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--space-md);
}

.branch-name {
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-primary);
}

.branch-city {
  font-size: 0.78rem;
  color: var(--text-muted);
}

.branch-rank {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: var(--gradient-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: 700;
  color: white;
}

.branch-metrics {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-md);
  margin-top: var(--space-md);
}

.branch-metric-item {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.branch-metric-label {
  font-size: 0.7rem;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.branch-metric-value {
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--text-primary);
}

/* --- Insight Box --- */
.insight-box {
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.08) 0%, rgba(6, 182, 212, 0.04) 100%);
  border: 1px solid rgba(99, 102, 241, 0.15);
  border-radius: var(--radius-md);
  padding: var(--space-lg);
  margin-bottom: var(--space-xl);
  display: flex;
  align-items: flex-start;
  gap: var(--space-md);
}

.insight-box svg {
  color: var(--accent-primary-light);
  flex-shrink: 0;
  margin-top: 2px;
}

.insight-text {
  font-size: 0.9rem;
  color: var(--text-secondary);
  line-height: 1.6;
}

.insight-text strong {
  color: var(--text-primary);
}

/* --- Peak Hours Cards --- */
.peak-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--space-md);
  margin-bottom: var(--space-xl);
}

.peak-card {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  padding: var(--space-lg);
  text-align: center;
  transition: all var(--transition-base);
}

.peak-card:hover {
  border-color: var(--border-accent);
  transform: translateY(-2px);
}

.peak-card-time {
  font-size: 1.5rem;
  font-weight: 800;
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.peak-card-label {
  font-size: 0.75rem;
  color: var(--text-muted);
  margin-top: 4px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.peak-card-value {
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-top: 8px;
}

/* --- Animations --- */
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(16px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-in {
  animation: fadeInUp 0.5s ease forwards;
}

.animate-in:nth-child(1) { animation-delay: 0.05s; }
.animate-in:nth-child(2) { animation-delay: 0.1s; }
.animate-in:nth-child(3) { animation-delay: 0.15s; }
.animate-in:nth-child(4) { animation-delay: 0.2s; }
.animate-in:nth-child(5) { animation-delay: 0.25s; }
.animate-in:nth-child(6) { animation-delay: 0.3s; }

/* --- Empty state --- */
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--space-2xl);
  color: var(--text-muted);
  text-align: center;
}

/* --- Sidebar Search --- */
.sidebar-search {
  padding: var(--space-sm) var(--space-md);
  position: relative;
  border-bottom: 1px solid var(--border-color);
}

.sidebar-search-icon {
  position: absolute;
  left: 24px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--text-muted);
  pointer-events: none;
}

.sidebar-search-input {
  width: 100%;
  padding: 8px 12px 8px 34px;
  border-radius: var(--radius-sm);
  background: var(--bg-glass);
  border: 1px solid var(--border-color);
  color: var(--text-primary);
  font-size: 0.8rem;
  font-family: inherit;
  outline: none;
  transition: border-color var(--transition-fast);
}

.sidebar-search-input::placeholder {
  color: var(--text-muted);
}

.sidebar-search-input:focus {
  border-color: var(--accent-primary);
  box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.1);
}

/* --- Nav Badge (alert count) --- */
.nav-badge {
  margin-left: auto;
  min-width: 20px;
  height: 20px;
  border-radius: 10px;
  background: var(--accent-danger);
  color: white;
  font-size: 0.65rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 6px;
  animation: pulse-dot 2s ease-in-out infinite;
}

/* --- Refresh Button --- */
.refresh-button {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 18px;
  border-radius: var(--radius-sm);
  background: var(--gradient-primary);
  border: none;
  color: white;
  font-size: 0.82rem;
  font-weight: 600;
  font-family: inherit;
  cursor: pointer;
  transition: all var(--transition-base);
  box-shadow: 0 2px 8px rgba(99, 102, 241, 0.3);
}

.refresh-button:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 16px rgba(99, 102, 241, 0.4);
}

.refresh-button:active {
  transform: translateY(0);
}

.refresh-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.refresh-button.spinning svg {
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* --- Icon Button (notification bell) --- */
.icon-button {
  position: relative;
  width: 38px;
  height: 38px;
  border-radius: var(--radius-sm);
  background: var(--bg-glass);
  border: 1px solid var(--border-color);
  color: var(--text-secondary);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all var(--transition-base);
}

.icon-button:hover {
  background: var(--bg-glass-hover);
  color: var(--text-primary);
  border-color: var(--border-color-hover);
}

.icon-button-badge {
  position: absolute;
  top: -4px;
  right: -4px;
  min-width: 18px;
  height: 18px;
  border-radius: 9px;
  background: var(--accent-danger);
  color: white;
  font-size: 0.6rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 4px;
  border: 2px solid var(--bg-primary);
}

/* --- Date Range Pills --- */
.date-range-pills {
  display: flex;
  align-items: center;
  background: var(--bg-glass);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-sm);
  overflow: hidden;
}

.date-pill {
  padding: 6px 14px;
  border: none;
  background: transparent;
  color: var(--text-muted);
  font-size: 0.78rem;
  font-weight: 600;
  font-family: inherit;
  cursor: pointer;
  transition: all var(--transition-fast);
  border-right: 1px solid var(--border-color);
}

.date-pill:last-child {
  border-right: none;
}

.date-pill:hover {
  color: var(--text-primary);
  background: var(--bg-glass-hover);
}

.date-pill.active {
  background: rgba(99, 102, 241, 0.15);
  color: var(--accent-primary-light);
}

/* --- Live Clock --- */
.clock-badge {
  font-variant-numeric: tabular-nums;
  letter-spacing: 0.02em;
}

/* --- Last Updated --- */
.last-updated {
  font-size: 0.72rem;
  color: var(--text-muted);
}

/* --- Export Button --- */
.export-button {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 14px;
  border-radius: var(--radius-sm);
  background: var(--bg-glass);
  border: 1px solid var(--border-color);
  color: var(--text-secondary);
  font-size: 0.8rem;
  font-weight: 500;
  font-family: inherit;
  cursor: pointer;
  transition: all var(--transition-base);
}

.export-button:hover {
  background: var(--bg-glass-hover);
  color: var(--text-primary);
  border-color: var(--border-color-hover);
}

/* --- Responsive --- */
@media (max-width: 1024px) {
  .charts-grid {
    grid-template-columns: 1fr;
  }
  .stat-cards-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .sidebar {
    width: var(--sidebar-collapsed);
  }
  .sidebar-brand-text,
  .sidebar .nav-link span,
  .sidebar-section-label,
  .sidebar-footer-badge span {
    display: none;
  }
  .main-content {
    margin-left: var(--sidebar-collapsed);
  }
  .stat-cards-grid {
    grid-template-columns: 1fr;
  }
  .page-content {
    padding: var(--space-md);
  }
  .top-bar {
    padding: var(--space-md);
  }
  .branches-grid {
    grid-template-columns: 1fr;
  }
}
===
/* ============================================
   QSR Performance AI — Global Design System
   Premium dark theme with glassmorphism
   ============================================ */

/* --- CSS Custom Properties --- */
:root {
  /* Core palette */
  --bg-primary: #0a0e1a;
  --bg-secondary: #111827;
  --bg-card: rgba(17, 24, 39, 0.7);
  --bg-card-hover: rgba(25, 35, 55, 0.85);
  --bg-sidebar: #0d1117;
  --bg-glass: rgba(255, 255, 255, 0.04);
  --bg-glass-hover: rgba(255, 255, 255, 0.08);

  /* Accent colors */
  --accent-primary: #6366f1;
  --accent-primary-light: #818cf8;
  --accent-secondary: #06b6d4;
  --accent-success: #10b981;
  --accent-warning: #f59e0b;
  --accent-danger: #ef4444;
  --accent-info: #3b82f6;

  /* Gradients */
  --gradient-primary: linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a78bfa 100%);
  --gradient-accent: linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%);
  --gradient-success: linear-gradient(135deg, #10b981 0%, #34d399 100%);
  --gradient-warning: linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%);
  --gradient-danger: linear-gradient(135deg, #ef4444 0%, #f87171 100%);
  --gradient-card: linear-gradient(145deg, rgba(99, 102, 241, 0.08) 0%, rgba(6, 182, 212, 0.04) 100%);

  /* Text */
  --text-primary: #f1f5f9;
  --text-secondary: #94a3b8;
  --text-muted: #64748b;
  --text-accent: #a5b4fc;

  /* Borders */
  --border-color: rgba(255, 255, 255, 0.06);
  --border-color-hover: rgba(255, 255, 255, 0.12);
  --border-accent: rgba(99, 102, 241, 0.3);

  /* Shadows */
  --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.3);
  --shadow-md: 0 4px 14px rgba(0, 0, 0, 0.35);
  --shadow-lg: 0 10px 40px rgba(0, 0, 0, 0.45);
  --shadow-glow: 0 0 30px rgba(99, 102, 241, 0.15);

  /* Radius */
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;
  --radius-xl: 20px;

  /* Spacing */
  --space-xs: 4px;
  --space-sm: 8px;
  --space-md: 16px;
  --space-lg: 24px;
  --space-xl: 32px;
  --space-2xl: 48px;

  /* Sidebar */
  --sidebar-width: 260px;
  --sidebar-collapsed: 72px;

  /* Transitions */
  --transition-fast: 0.15s ease;
  --transition-base: 0.25s ease;
  --transition-slow: 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

/* --- Reset & Base --- */
*, *::before, *::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  font-size: 16px;
  scroll-behavior: smooth;
}

body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  background: var(--bg-primary);
  color: var(--text-primary);
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  overflow-x: hidden;
}

#root {
  min-height: 100vh;
}

a {
  color: var(--accent-primary-light);
  text-decoration: none;
  transition: color var(--transition-fast);
}

a:hover {
  color: var(--accent-primary);
}

/* --- Scrollbar --- */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}
::-webkit-scrollbar-track {
  background: transparent;
}
::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 3px;
}
::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.2);
}

/* --- Layout --- */
.app-layout {
  display: flex;
  min-height: 100vh;
}

.sidebar {
  width: var(--sidebar-width);
  background: var(--bg-sidebar);
  border-right: 1px solid var(--border-color);
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  z-index: 100;
  transition: width var(--transition-slow);
  overflow: hidden;
}

.sidebar-brand {
  padding: var(--space-lg);
  display: flex;
  align-items: center;
  gap: var(--space-md);
  border-bottom: 1px solid var(--border-color);
  min-height: 72px;
}

.sidebar-brand-icon {
  width: 40px;
  height: 40px;
  border-radius: var(--radius-sm);
  background: var(--gradient-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  box-shadow: var(--shadow-glow);
}

.sidebar-brand-text h1 {
  font-size: 1rem;
  font-weight: 700;
  color: var(--text-primary);
  letter-spacing: -0.02em;
  line-height: 1.2;
}

.sidebar-brand-text span {
  font-size: 0.7rem;
  font-weight: 500;
  color: var(--accent-primary-light);
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.sidebar-nav {
  flex: 1;
  padding: var(--space-md) var(--space-sm);
  display: flex;
  flex-direction: column;
  gap: var(--space-xs);
  overflow-y: auto;
}

.sidebar-section-label {
  font-size: 0.65rem;
  font-weight: 600;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  padding: var(--space-md) var(--space-md) var(--space-xs);
}

.nav-link {
  display: flex;
  align-items: center;
  gap: var(--space-md);
  padding: 10px var(--space-md);
  border-radius: var(--radius-sm);
  color: var(--text-secondary);
  font-size: 0.875rem;
  font-weight: 500;
  transition: all var(--transition-base);
  cursor: pointer;
  position: relative;
  overflow: hidden;
  text-decoration: none;
}

.nav-link::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 3px;
  height: 0;
  background: var(--gradient-primary);
  border-radius: 0 2px 2px 0;
  transition: height var(--transition-base);
}

.nav-link:hover {
  color: var(--text-primary);
  background: var(--bg-glass-hover);
}

.nav-link.active {
  color: var(--text-primary);
  background: rgba(99, 102, 241, 0.1);
}

.nav-link.active::before {
  height: 60%;
}

.nav-link svg {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
  opacity: 0.7;
  transition: opacity var(--transition-fast);
}

.nav-link:hover svg,
.nav-link.active svg {
  opacity: 1;
}

.sidebar-footer {
  padding: var(--space-md);
  border-top: 1px solid var(--border-color);
}

.sidebar-footer-badge {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  padding: var(--space-sm) var(--space-md);
  border-radius: var(--radius-sm);
  background: rgba(16, 185, 129, 0.1);
  border: 1px solid rgba(16, 185, 129, 0.15);
}

.sidebar-footer-badge .dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--accent-success);
  animation: pulse-dot 2s ease-in-out infinite;
}

@keyframes pulse-dot {
  0%, 100% { opacity: 1; box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.4); }
  50% { opacity: 0.8; box-shadow: 0 0 0 6px rgba(16, 185, 129, 0); }
}

.sidebar-footer-badge span {
  font-size: 0.75rem;
  color: var(--accent-success);
  font-weight: 500;
}

/* Main content */
.main-content {
  flex: 1;
  margin-left: var(--sidebar-width);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.top-bar {
  padding: var(--space-lg) var(--space-xl);
  border-bottom: 1px solid var(--border-color);
  background: rgba(10, 14, 26, 0.8);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  position: sticky;
  top: 0;
  z-index: 50;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.top-bar h2 {
  font-size: 1.5rem;
  font-weight: 700;
  letter-spacing: -0.02em;
}

.top-bar-subtitle {
  font-size: 0.85rem;
  color: var(--text-muted);
  margin-top: 2px;
}

.top-bar-right {
  display: flex;
  align-items: center;
  gap: var(--space-md);
}

.top-bar-badge {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  padding: 6px 14px;
  border-radius: 20px;
  background: var(--bg-glass);
  border: 1px solid var(--border-color);
  font-size: 0.8rem;
  color: var(--text-secondary);
}

.page-content {
  flex: 1;
  padding: var(--space-xl);
}

/* --- Card Styles --- */
.card {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  padding: var(--space-lg);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  transition: all var(--transition-base);
  position: relative;
  overflow: hidden;
}

.card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent);
}

.card:hover {
  border-color: var(--border-color-hover);
  box-shadow: var(--shadow-md);
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--space-lg);
}

.card-title {
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--text-primary);
}

.card-subtitle {
  font-size: 0.78rem;
  color: var(--text-muted);
  margin-top: 2px;
}

/* --- Stat Cards --- */
.stat-cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: var(--space-lg);
  margin-bottom: var(--space-xl);
}

.stat-card {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  padding: var(--space-lg);
  display: flex;
  align-items: flex-start;
  gap: var(--space-md);
  transition: all var(--transition-base);
  position: relative;
  overflow: hidden;
}

.stat-card::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: var(--gradient-primary);
  opacity: 0;
  transition: opacity var(--transition-base);
}

.stat-card:hover {
  transform: translateY(-2px);
  border-color: var(--border-color-hover);
  box-shadow: var(--shadow-lg);
}

.stat-card:hover::after {
  opacity: 1;
}

.stat-card-icon {
  width: 48px;
  height: 48px;
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.stat-card-icon.purple { background: rgba(99, 102, 241, 0.12); color: var(--accent-primary-light); }
.stat-card-icon.cyan { background: rgba(6, 182, 212, 0.12); color: var(--accent-secondary); }
.stat-card-icon.green { background: rgba(16, 185, 129, 0.12); color: var(--accent-success); }
.stat-card-icon.amber { background: rgba(245, 158, 11, 0.12); color: var(--accent-warning); }
.stat-card-icon.red { background: rgba(239, 68, 68, 0.12); color: var(--accent-danger); }
.stat-card-icon.blue { background: rgba(59, 130, 246, 0.12); color: var(--accent-info); }

.stat-card-content {
  flex: 1;
  min-width: 0;
}

.stat-card-label {
  font-size: 0.78rem;
  color: var(--text-muted);
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.stat-card-value {
  font-size: 1.75rem;
  font-weight: 800;
  color: var(--text-primary);
  letter-spacing: -0.03em;
  line-height: 1.2;
  margin-top: 4px;
}

.stat-card-trend {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 0.75rem;
  font-weight: 600;
  margin-top: 6px;
  padding: 2px 8px;
  border-radius: 12px;
}

.stat-card-trend.up {
  color: var(--accent-success);
  background: rgba(16, 185, 129, 0.1);
}

.stat-card-trend.down {
  color: var(--accent-danger);
  background: rgba(239, 68, 68, 0.1);
}

/* --- Charts Grid --- */
.charts-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-lg);
  margin-bottom: var(--space-xl);
}

.charts-grid .full-width {
  grid-column: 1 / -1;
}

.chart-container {
  position: relative;
  width: 100%;
  min-height: 280px;
}

/* --- Table --- */
.data-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
}

.data-table th {
  text-align: left;
  padding: var(--space-md);
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  border-bottom: 1px solid var(--border-color);
  background: var(--bg-glass);
}

.data-table td {
  padding: var(--space-md);
  font-size: 0.875rem;
  color: var(--text-secondary);
  border-bottom: 1px solid var(--border-color);
  transition: background var(--transition-fast);
}

.data-table tr:hover td {
  background: var(--bg-glass-hover);
  color: var(--text-primary);
}

.data-table td:first-child {
  font-weight: 500;
  color: var(--text-primary);
}

/* --- Badges & Pills --- */
.badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.badge.critical {
  background: rgba(239, 68, 68, 0.12);
  color: var(--accent-danger);
  border: 1px solid rgba(239, 68, 68, 0.2);
}

.badge.warning {
  background: rgba(245, 158, 11, 0.12);
  color: var(--accent-warning);
  border: 1px solid rgba(245, 158, 11, 0.2);
}

.badge.info {
  background: rgba(59, 130, 246, 0.12);
  color: var(--accent-info);
  border: 1px solid rgba(59, 130, 246, 0.2);
}

/* --- Alerts Page --- */
.alerts-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
}

.alert-card {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  padding: var(--space-lg);
  display: flex;
  align-items: flex-start;
  gap: var(--space-md);
  transition: all var(--transition-base);
}

.alert-card:hover {
  border-color: var(--border-color-hover);
  box-shadow: var(--shadow-md);
  transform: translateX(4px);
}

.alert-card.critical { border-left: 4px solid var(--accent-danger); }
.alert-card.warning { border-left: 4px solid var(--accent-warning); }
.alert-card.info { border-left: 4px solid var(--accent-info); }

.alert-icon {
  width: 40px;
  height: 40px;
  border-radius: var(--radius-sm);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.alert-card.critical .alert-icon { background: rgba(239, 68, 68, 0.12); color: var(--accent-danger); }
.alert-card.warning .alert-icon { background: rgba(245, 158, 11, 0.12); color: var(--accent-warning); }
.alert-card.info .alert-icon { background: rgba(59, 130, 246, 0.12); color: var(--accent-info); }

.alert-body {
  flex: 1;
  min-width: 0;
}

.alert-header {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  margin-bottom: 4px;
}

.alert-type {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--text-primary);
}

.alert-message {
  font-size: 0.85rem;
  color: var(--text-secondary);
  line-height: 1.5;
}

.alert-meta {
  display: flex;
  align-items: center;
  gap: var(--space-md);
  margin-top: var(--space-sm);
  font-size: 0.75rem;
  color: var(--text-muted);
}

.alert-metric {
  margin-left: auto;
  padding: 4px 12px;
  border-radius: 8px;
  background: var(--bg-glass);
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--text-primary);
  white-space: nowrap;
}

/* --- Filter / Select --- */
.filter-bar {
  display: flex;
  align-items: center;
  gap: var(--space-md);
  margin-bottom: var(--space-xl);
  flex-wrap: wrap;
}

.filter-select {
  padding: 8px 16px;
  border-radius: var(--radius-sm);
  background: var(--bg-glass);
  border: 1px solid var(--border-color);
  color: var(--text-primary);
  font-size: 0.85rem;
  font-family: inherit;
  cursor: pointer;
  transition: border-color var(--transition-fast);
  outline: none;
  appearance: none;
  -webkit-appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 12px center;
  padding-right: 36px;
  min-width: 180px;
}

.filter-select:focus {
  border-color: var(--accent-primary);
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.15);
}

.filter-select option {
  background: var(--bg-secondary);
  color: var(--text-primary);
}

/* --- Branch Cards Grid --- */
.branches-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: var(--space-lg);
}

.branch-card {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  padding: var(--space-lg);
  transition: all var(--transition-base);
  position: relative;
  overflow: hidden;
}

.branch-card:hover {
  transform: translateY(-3px);
  border-color: var(--border-accent);
  box-shadow: var(--shadow-lg), var(--shadow-glow);
}

.branch-card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--space-md);
}

.branch-name {
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-primary);
}

.branch-city {
  font-size: 0.78rem;
  color: var(--text-muted);
}

.branch-rank {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: var(--gradient-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: 700;
  color: white;
}

.branch-metrics {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-md);
  margin-top: var(--space-md);
}

.branch-metric-item {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.branch-metric-label {
  font-size: 0.7rem;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.branch-metric-value {
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--text-primary);
}

/* --- Insight Box --- */
.insight-box {
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.08) 0%, rgba(6, 182, 212, 0.04) 100%);
  border: 1px solid rgba(99, 102, 241, 0.15);
  border-radius: var(--radius-md);
  padding: var(--space-lg);
  margin-bottom: var(--space-xl);
  display: flex;
  align-items: flex-start;
  gap: var(--space-md);
}

.insight-box svg {
  color: var(--accent-primary-light);
  flex-shrink: 0;
  margin-top: 2px;
}

.insight-text {
  font-size: 0.9rem;
  color: var(--text-secondary);
  line-height: 1.6;
}

.insight-text strong {
  color: var(--text-primary);
}

/* --- Peak Hours Cards --- */
.peak-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--space-md);
  margin-bottom: var(--space-xl);
}

.peak-card {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  padding: var(--space-lg);
  text-align: center;
  transition: all var(--transition-base);
}

.peak-card:hover {
  border-color: var(--border-accent);
  transform: translateY(-2px);
}

.peak-card-time {
  font-size: 1.5rem;
  font-weight: 800;
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.peak-card-label {
  font-size: 0.75rem;
  color: var(--text-muted);
  margin-top: 4px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.peak-card-value {
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-top: 8px;
}

/* --- Animations --- */
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(16px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-in {
  animation: fadeInUp 0.5s ease forwards;
}

.animate-in:nth-child(1) { animation-delay: 0.05s; }
.animate-in:nth-child(2) { animation-delay: 0.1s; }
.animate-in:nth-child(3) { animation-delay: 0.15s; }
.animate-in:nth-child(4) { animation-delay: 0.2s; }
.animate-in:nth-child(5) { animation-delay: 0.25s; }
.animate-in:nth-child(6) { animation-delay: 0.3s; }

/* --- Empty state --- */
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--space-2xl);
  color: var(--text-muted);
  text-align: center;
}

/* --- Sidebar Search --- */
.sidebar-search {
  padding: var(--space-sm) var(--space-md);
  position: relative;
  border-bottom: 1px solid var(--border-color);
}

.sidebar-search-icon {
  position: absolute;
  left: 24px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--text-muted);
  pointer-events: none;
}

.sidebar-search-input {
  width: 100%;
  padding: 8px 12px 8px 34px;
  border-radius: var(--radius-sm);
  background: var(--bg-glass);
  border: 1px solid var(--border-color);
  color: var(--text-primary);
  font-size: 0.8rem;
  font-family: inherit;
  outline: none;
  transition: border-color var(--transition-fast);
}

.sidebar-search-input::placeholder {
  color: var(--text-muted);
}

.sidebar-search-input:focus {
  border-color: var(--accent-primary);
  box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.1);
}

/* --- Nav Badge (alert count) --- */
.nav-badge {
  margin-left: auto;
  min-width: 20px;
  height: 20px;
  border-radius: 10px;
  background: var(--accent-danger);
  color: white;
  font-size: 0.65rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 6px;
  animation: pulse-dot 2s ease-in-out infinite;
}

/* --- Refresh Button --- */
.refresh-button {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 18px;
  border-radius: var(--radius-sm);
  background: var(--gradient-primary);
  border: none;
  color: white;
  font-size: 0.82rem;
  font-weight: 600;
  font-family: inherit;
  cursor: pointer;
  transition: all var(--transition-base);
  box-shadow: 0 2px 8px rgba(99, 102, 241, 0.3);
}

.refresh-button:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 16px rgba(99, 102, 241, 0.4);
}

.refresh-button:active {
  transform: translateY(0);
}

.refresh-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.refresh-button.spinning svg {
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* --- Icon Button (notification bell) --- */
.icon-button {
  position: relative;
  width: 38px;
  height: 38px;
  border-radius: var(--radius-sm);
  background: var(--bg-glass);
  border: 1px solid var(--border-color);
  color: var(--text-secondary);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all var(--transition-base);
}

.icon-button:hover {
  background: var(--bg-glass-hover);
  color: var(--text-primary);
  border-color: var(--border-color-hover);
}

.icon-button-badge {
  position: absolute;
  top: -4px;
  right: -4px;
  min-width: 18px;
  height: 18px;
  border-radius: 9px;
  background: var(--accent-danger);
  color: white;
  font-size: 0.6rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 4px;
  border: 2px solid var(--bg-primary);
}

/* --- Date Range Pills --- */
.date-range-pills {
  display: flex;
  align-items: center;
  background: var(--bg-glass);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-sm);
  overflow: hidden;
}

.date-pill {
  padding: 6px 14px;
  border: none;
  background: transparent;
  color: var(--text-muted);
  font-size: 0.78rem;
  font-weight: 600;
  font-family: inherit;
  cursor: pointer;
  transition: all var(--transition-fast);
  border-right: 1px solid var(--border-color);
}

.date-pill:last-child {
  border-right: none;
}

.date-pill:hover {
  color: var(--text-primary);
  background: var(--bg-glass-hover);
}

.date-pill.active {
  background: rgba(99, 102, 241, 0.15);
  color: var(--accent-primary-light);
}

/* --- Live Clock --- */
.clock-badge {
  font-variant-numeric: tabular-nums;
  letter-spacing: 0.02em;
}

/* --- Last Updated --- */
.last-updated {
  font-size: 0.72rem;
  color: var(--text-muted);
}

/* --- Export Button --- */
.export-button {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 14px;
  border-radius: var(--radius-sm);
  background: var(--bg-glass);
  border: 1px solid var(--border-color);
  color: var(--text-secondary);
  font-size: 0.8rem;
  font-weight: 500;
  font-family: inherit;
  cursor: pointer;
  transition: all var(--transition-base);
}

.export-button:hover {
  background: var(--bg-glass-hover);
  color: var(--text-primary);
  border-color: var(--border-color-hover);
}

/* --- Responsive --- */
@media (max-width: 1024px) {
  .charts-grid {
    grid-template-columns: 1fr;
  }
  .stat-cards-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .sidebar {
    width: var(--sidebar-collapsed);
  }
  .sidebar-brand-text,
  .sidebar .nav-link span,
  .sidebar-section-label,
  .sidebar-footer-badge span {
    display: none;
  }
  .main-content {
    margin-left: var(--sidebar-collapsed);
  }
  .stat-cards-grid {
    grid-template-columns: 1fr;
  }
  .page-content {
    padding: var(--space-md);
  }
  .top-bar {
    padding: var(--space-md);
  }
  .branches-grid {
    grid-template-columns: 1fr;
  }
}

/* --- Split Login Page --- */
.login-split-container {
  display: flex;
  min-height: 100vh;
  width: 100%;
  background: var(--bg-primary);
  overflow: hidden;
}

.login-visual-panel {
  flex: 1;
  position: relative;
  display: none;
  flex-direction: column;
  justify-content: space-between;
  padding: var(--space-2xl);
  overflow: hidden;
  background: var(--bg-secondary);
  border-right: 1px solid var(--border-color);
}

@media (min-width: 900px) {
  .login-visual-panel {
    display: flex;
  }
}

.login-visual-bg {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 0;
  transition: transform 0.2s ease-out;
  background-image: radial-gradient(circle at 20% 30%, rgba(99, 102, 241, 0.15) 0%, transparent 50%),
                    radial-gradient(circle at 80% 80%, rgba(6, 182, 212, 0.15) 0%, transparent 50%);
}

.glow-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.5;
}

.glow-orb.purple {
  width: 400px;
  height: 400px;
  background: var(--accent-primary);
  top: -100px;
  left: -100px;
  animation: float-slow 15s infinite alternate ease-in-out;
}

.glow-orb.cyan {
  width: 300px;
  height: 300px;
  background: var(--accent-secondary);
  bottom: 10%;
  right: 10%;
  animation: float-slow 20s infinite alternate-reverse ease-in-out;
}

.login-visual-content {
  position: relative;
  z-index: 10;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.brand-logo {
  display: flex;
  align-items: center;
  gap: var(--space-md);
  margin-bottom: auto;
}

.brand-icon {
  color: white;
  border-radius: var(--radius-md);
  padding: 8px;
}

.brand-text h2 {
  font-size: 1.25rem;
  font-weight: 800;
  color: var(--text-primary);
  line-height: 1.1;
  letter-spacing: -0.02em;
}

.brand-text span {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--accent-primary-light);
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.visual-hero {
  max-width: 480px;
  margin-top: auto;
  margin-bottom: var(--space-2xl);
}

.visual-hero h1 {
  font-size: 3rem;
  font-weight: 800;
  line-height: 1.1;
  letter-spacing: -0.03em;
  margin-bottom: var(--space-md);
  background: linear-gradient(to right, #ffffff, #a5b4fc);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.visual-hero p {
  font-size: 1.1rem;
  color: var(--text-secondary);
  line-height: 1.6;
}

.floating-stats {
  position: relative;
  height: 200px;
}

.float-card {
  position: absolute;
  background: rgba(17, 24, 39, 0.6);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  padding: var(--space-md);
  display: flex;
  align-items: center;
  gap: var(--space-md);
  box-shadow: var(--shadow-lg);
  transition: transform 0.2s ease-out;
}

.float-card.stat-1 { top: 20px; left: 0; }
.float-card.stat-2 { top: 80px; left: 220px; }
.float-card.stat-3 { top: 140px; left: 40px; }

.float-icon {
  width: 40px;
  height: 40px;
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  padding: 10px;
}

.float-icon.green { background: rgba(16, 185, 129, 0.15); color: var(--accent-success); }
.float-icon.amber { background: rgba(245, 158, 11, 0.15); color: var(--accent-warning); }
.float-icon.cyan { background: rgba(6, 182, 212, 0.15); color: var(--accent-secondary); }

.float-info {
  display: flex;
  flex-direction: column;
}

.float-info span {
  font-size: 0.75rem;
  color: var(--text-muted);
  font-weight: 600;
  text-transform: uppercase;
}

.float-info strong {
  font-size: 1.1rem;
  color: var(--text-primary);
  font-weight: 700;
}

/* Auth Panel */
.login-auth-panel {
  flex: 1;
  max-width: 600px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-primary);
  padding: var(--space-2xl);
}

.login-auth-wrapper {
  width: 100%;
  max-width: 400px;
  animation: fade-in-up 0.6s ease-out;
}

.login-auth-header {
  margin-bottom: var(--space-xl);
}

.login-auth-header h2 {
  font-size: 2rem;
  font-weight: 800;
  letter-spacing: -0.02em;
  margin-bottom: var(--space-xs);
}

.login-auth-header p {
  color: var(--text-secondary);
  font-size: 1rem;
}

.forgot-password {
  text-align: right;
  margin-top: -8px;
}

.forgot-password a {
  font-size: 0.85rem;
  font-weight: 500;
}

.login-error {
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.3);
  color: var(--accent-danger);
  padding: var(--space-md);
  border-radius: var(--radius-md);
  font-size: 0.85rem;
  margin-bottom: var(--space-lg);
  text-align: center;
  animation: shake 0.4s ease-in-out;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: var(--space-lg);
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
}

.form-group label {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--text-secondary);
}

.input-with-icon {
  position: relative;
  display: flex;
  align-items: center;
}

.input-icon {
  position: absolute;
  left: 14px;
  color: var(--text-muted);
  transition: color var(--transition-fast);
}

.input-with-icon input {
  width: 100%;
  padding: 12px 14px 12px 42px;
  background: rgba(15, 23, 42, 0.6);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  color: var(--text-primary);
  font-size: 0.95rem;
  font-family: inherit;
  transition: all var(--transition-base);
}

.input-with-icon input:focus {
  outline: none;
  border-color: var(--accent-primary-light);
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.15);
  background: rgba(15, 23, 42, 0.9);
}

.input-with-icon input:focus + .input-icon,
.input-with-icon input:not(:placeholder-shown) + .input-icon {
  color: var(--accent-primary-light);
}

.login-submit {
  margin-top: var(--space-md);
  background: var(--gradient-primary);
  color: white;
  border: none;
  padding: 14px;
  border-radius: var(--radius-md);
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-sm);
  transition: all var(--transition-base);
  box-shadow: 0 4px 14px rgba(99, 102, 241, 0.3);
}

.login-submit:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(99, 102, 241, 0.4);
}

.login-submit:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  transform: none;
}

.login-footer {
  margin-top: var(--space-xl);
  text-align: center;
  font-size: 0.8rem;
  color: var(--text-muted);
  padding-top: var(--space-lg);
  border-top: 1px solid var(--border-color);
}

@keyframes float-slow {
  0% { transform: translate(0, 0); }
  50% { transform: translate(5%, 10%); }
  100% { transform: translate(-5%, 5%); }
}

@keyframes fade-in-up {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  75% { transform: translateX(5px); }
}

/* --- Dashboard Enhancements --- */
.hero-banner {
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(6, 182, 212, 0.05) 100%);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-xl);
  padding: var(--space-xl) var(--space-2xl);
  margin-bottom: var(--space-xl);
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  overflow: hidden;
  box-shadow: var(--shadow-md);
}

.hero-content {
  position: relative;
  z-index: 10;
}

.hero-title {
  font-size: 2rem;
  font-weight: 800;
  letter-spacing: -0.02em;
  margin-bottom: var(--space-xs);
  color: var(--text-primary);
}

.hero-subtitle {
  font-size: 1.05rem;
  color: var(--text-secondary);
  max-width: 600px;
}

.trend-up {
  color: var(--accent-success);
  font-weight: 600;
  padding: 2px 8px;
  background: rgba(16, 185, 129, 0.1);
  border-radius: var(--radius-sm);
  display: inline-block;
}

.hero-visual {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 100px;
}

.hero-icon {
  color: var(--accent-primary-light);
  position: relative;
  z-index: 2;
  filter: drop-shadow(0 0 20px rgba(99, 102, 241, 0.4));
}

.hero-orb {
  position: absolute;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: var(--gradient-primary);
  filter: blur(40px);
  opacity: 0.3;
  z-index: 1;
  animation: pulse-dot 4s infinite alternate ease-in-out;
}

/* Dashboard Layout */
.dashboard-layout {
  display: flex;
  gap: var(--space-xl);
  align-items: flex-start;
}

.dashboard-main {
  flex: 1;
  min-width: 0;
}

.dashboard-sidebar {
  width: 320px;
  flex-shrink: 0;
  position: sticky;
  top: 100px; /* Offset from top bar */
}

@media (max-width: 1200px) {
  .dashboard-layout {
    flex-direction: column;
  }
  .dashboard-sidebar {
    width: 100%;
    position: static;
  }
}

/* Live Feed Widget */
.live-feed-widget {
  max-height: calc(100vh - 120px);
  display: flex;
  flex-direction: column;
}

.pulsing-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: var(--accent-success);
  box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.4);
  animation: pulse-dot 1.5s infinite;
}

.live-feed-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
  overflow-y: auto;
  flex: 1;
  padding-right: 4px;
  margin-bottom: var(--space-md);
}

.live-feed-list::-webkit-scrollbar {
  width: 4px;
}

.live-feed-item {
  display: flex;
  align-items: flex-start;
  gap: var(--space-md);
  padding: var(--space-md);
  border-radius: var(--radius-md);
  background: var(--bg-glass);
  border: 1px solid transparent;
  transition: all var(--transition-fast);
}

.live-feed-item:hover {
  background: var(--bg-glass-hover);
  border-color: var(--border-color-hover);
}

.live-feed-item.order .feed-icon-wrapper {
  color: var(--accent-success);
  background: rgba(16, 185, 129, 0.1);
}

.live-feed-item.alert .feed-icon-wrapper {
  color: var(--accent-warning);
  background: rgba(245, 158, 11, 0.1);
}

.feed-icon-wrapper {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.feed-content {
  flex: 1;
  min-width: 0;
}

.feed-text {
  font-size: 0.85rem;
  color: var(--text-primary);
  font-weight: 500;
  line-height: 1.4;
  margin-bottom: 4px;
}

.feed-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.75rem;
}

.feed-time {
  color: var(--text-muted);
}

.feed-amount {
  color: var(--accent-success);
  font-weight: 600;
}

.feed-view-all {
  width: 100%;
  padding: 10px;
  background: transparent;
  border: 1px solid var(--border-color);
  border-radius: var(--radius-sm);
  color: var(--text-primary);
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: all var(--transition-fast);
  text-align: center;
}

.feed-view-all:hover {
  background: var(--bg-glass-hover);
  border-color: var(--accent-primary-light);
}

.animate-in {
  animation: fade-in-up 0.4s ease-out forwards;
}

/* --- AI Widget --- */
.ai-widget {
  background: linear-gradient(to bottom, var(--bg-card), rgba(17, 24, 39, 0.9));
  border-color: rgba(99, 102, 241, 0.2);
  position: relative;
}

.ai-widget::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 2px;
  background: var(--gradient-primary);
  opacity: 0.5;
}

.ai-core-icon {
  color: var(--accent-primary-light);
  filter: drop-shadow(0 0 8px rgba(99, 102, 241, 0.6));
}

.ai-pulse-ring {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: var(--accent-primary-light);
  box-shadow: 0 0 0 0 rgba(129, 140, 248, 0.4);
  animation: ai-pulse 2s infinite;
}

@keyframes ai-pulse {
  0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(129, 140, 248, 0.7); }
  70% { transform: scale(1); box-shadow: 0 0 0 10px rgba(129, 140, 248, 0); }
  100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(129, 140, 248, 0); }
}

.ai-content-box {
  background: rgba(10, 14, 26, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: var(--radius-sm);
  padding: var(--space-md);
  min-height: 80px;
  margin-bottom: var(--space-md);
  font-family: 'Courier New', Courier, monospace;
}

.typewriter-text {
  font-size: 0.85rem;
  color: var(--text-primary);
  line-height: 1.5;
  margin: 0;
}

.typewriter-cursor {
  display: inline-block;
  color: var(--accent-primary-light);
  animation: blink 1s step-end infinite;
  margin-left: 2px;
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}

.ai-confidence {
  margin-top: auto;
}

.confidence-bar {
  height: 6px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 3px;
  overflow: hidden;
}

.confidence-fill {
  height: 100%;
  background: var(--gradient-primary);
  border-radius: 3px;
  box-shadow: var(--shadow-glow);
}


```
