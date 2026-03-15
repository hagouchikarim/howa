import { TrendingUp, TrendingDown } from 'lucide-react';

export default function StatCard({ icon: Icon, iconColor = 'purple', label, value, trend, trendLabel }) {
  return (
    <div className="stat-card animate-in">
      <div className={`stat-card-icon ${iconColor}`}>
        <Icon size={24} />
      </div>
      <div className="stat-card-content">
        <div className="stat-card-label">{label}</div>
        <div className="stat-card-value">{value}</div>
        {trend !== undefined && (
          <div className={`stat-card-trend ${trend >= 0 ? 'up' : 'down'}`}>
            {trend >= 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
            {Math.abs(trend)}% {trendLabel || 'vs last period'}
          </div>
        )}
      </div>
    </div>
  );
}
