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
