import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, GitCompareArrows, TrendingUp,
  ShoppingBag, AlertTriangle, Activity, RefreshCw,
  Bell, Download, Clock, Search, LogOut
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { generateAlerts } from '../data/dataUtils';
import { useMemo, useState } from 'react';

const navItems = [
  { to: '/', icon: LayoutDashboard, label: 'Overview' },
  { to: '/branches', icon: GitCompareArrows, label: 'Branch Comparison' },
  { to: '/demand', icon: TrendingUp, label: 'Demand Analytics' },
  { to: '/products', icon: ShoppingBag, label: 'Product Performance' },
  { to: '/alerts', icon: AlertTriangle, label: 'Operational Alerts' },
];

const pageTitles = {
  '/': { title: 'Dashboard Overview', subtitle: 'Real-time performance across all branches' },
  '/branches': { title: 'Branch Comparison', subtitle: 'Compare performance between locations' },
  '/demand': { title: 'Demand Analytics', subtitle: 'Understand order patterns and peak periods' },
  '/products': { title: 'Product Performance', subtitle: 'Track top-selling items and category mix' },
  '/alerts': { title: 'Operational Alerts', subtitle: 'Monitor performance thresholds and issues' },
};

export default function Layout({ children }) {
  const location = useLocation();
  const navigate = useNavigate();
  const page = pageTitles[location.pathname] || pageTitles['/'];
  const { isRefreshing, refresh, lastRefreshed, dateRange, setDateRange, currentTime, logout } = useApp();
  const [searchQuery, setSearchQuery] = useState('');

  const alerts = useMemo(() => generateAlerts(), []);
  const criticalCount = alerts.filter(a => a.severity === 'critical').length;
  const totalAlertCount = alerts.length;

  const filteredNav = navItems.filter(item =>
    !searchQuery || item.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  };

  const formatLastRefreshed = (date) => {
    const diff = Math.round((currentTime - date) / 1000);
    if (diff < 5) return 'Just now';
    if (diff < 60) return `${diff}s ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="app-layout">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-brand">
          <div className="sidebar-brand-icon">
            <Activity size={22} color="white" />
          </div>
          <div className="sidebar-brand-text">
            <h1>QSR Performance</h1>
            <span>AI Analytics</span>
          </div>
        </div>

        {/* Sidebar Search */}
        <div className="sidebar-search">
          <Search size={15} className="sidebar-search-icon" />
          <input
            type="text"
            placeholder="Search pages..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="sidebar-search-input"
          />
        </div>

        <nav className="sidebar-nav">
          <div className="sidebar-section-label">Analytics</div>
          {filteredNav.map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
              end={item.to === '/'}
            >
              <item.icon size={20} />
              <span>{item.label}</span>
              {item.to === '/alerts' && criticalCount > 0 && (
                <span className="nav-badge">{criticalCount}</span>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-footer">
          <div className="sidebar-footer-badge">
            <div className="dot"></div>
            <span>System Online</span>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <header className="top-bar">
          <div>
            <h2>{page.title}</h2>
            <div className="top-bar-subtitle">{page.subtitle}</div>
          </div>
          <div className="top-bar-right">
            {/* Date Range Pills */}
            <div className="date-range-pills">
              {[7, 14, 30].map(d => (
                <button
                  key={d}
                  className={`date-pill${dateRange === d ? ' active' : ''}`}
                  onClick={() => setDateRange(d)}
                >
                  {d}D
                </button>
              ))}
            </div>

            {/* Live Clock */}
            <div className="top-bar-badge clock-badge">
              <Clock size={14} />
              <span>{formatTime(currentTime)}</span>
            </div>

            {/* Notification Bell */}
            <button
              className="icon-button"
              onClick={() => navigate('/alerts')}
              title="View Alerts"
            >
              <Bell size={18} />
              {totalAlertCount > 0 && (
                <span className="icon-button-badge">{totalAlertCount}</span>
              )}
            </button>

            {/* Logout Button */}
            <button
              className="icon-button"
              onClick={logout}
              title="Logout"
            >
              <LogOut size={18} />
            </button>

            {/* Refresh Button */}
            <button
              className={`refresh-button${isRefreshing ? ' spinning' : ''}`}
              onClick={refresh}
              disabled={isRefreshing}
              title="Refresh data"
            >
              <RefreshCw size={16} />
              <span>Refresh</span>
            </button>

            {/* Last Updated */}
            <div className="top-bar-badge last-updated">
              <span>Updated {formatLastRefreshed(lastRefreshed)}</span>
            </div>
          </div>
        </header>

        <div className="page-content">
          {children}
        </div>
      </main>
    </div>
  );
}
