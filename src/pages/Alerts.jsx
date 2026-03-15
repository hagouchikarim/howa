import { useMemo } from 'react';
import { AlertTriangle, AlertCircle, Info, ShieldAlert } from 'lucide-react';
import StatCard from '../components/StatCard';
import { generateAlerts } from '../data/dataUtils';

const severityIcons = {
  critical: AlertTriangle,
  warning: AlertCircle,
  info: Info,
};

export default function Alerts() {
  const alerts = useMemo(() => generateAlerts(), []);

  const criticalCount = alerts.filter(a => a.severity === 'critical').length;
  const warningCount = alerts.filter(a => a.severity === 'warning').length;
  const infoCount = alerts.filter(a => a.severity === 'info').length;

  return (
    <div>
      {/* Alert summary cards */}
      <div className="stat-cards-grid">
        <StatCard
          icon={AlertTriangle}
          iconColor="red"
          label="Critical Alerts"
          value={criticalCount}
        />
        <StatCard
          icon={AlertCircle}
          iconColor="amber"
          label="Warnings"
          value={warningCount}
        />
        <StatCard
          icon={Info}
          iconColor="blue"
          label="Informational"
          value={infoCount}
        />
        <StatCard
          icon={ShieldAlert}
          iconColor="purple"
          label="Total Alerts"
          value={alerts.length}
        />
      </div>

      {/* Alert cards list */}
      <div className="alerts-list">
        {alerts.map(alert => {
          const Icon = severityIcons[alert.severity] || Info;
          return (
            <div key={alert.id} className={`alert-card ${alert.severity} animate-in`}>
              <div className="alert-icon">
                <Icon size={20} />
              </div>
              <div className="alert-body">
                <div className="alert-header">
                  <span className="alert-type">{alert.type}</span>
                  <span className={`badge ${alert.severity}`}>{alert.severity}</span>
                </div>
                <div className="alert-message">{alert.message}</div>
                <div className="alert-meta">
                  <span>📍 {alert.branch}</span>
                </div>
              </div>
              <div className="alert-metric">{alert.metric}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
