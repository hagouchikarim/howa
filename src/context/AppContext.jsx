import { createContext, useContext, useState, useCallback, useEffect } from 'react';

const AppContext = createContext();

export function AppProvider({ children }) {
  const [refreshKey, setRefreshKey] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastRefreshed, setLastRefreshed] = useState(new Date());
  const [dateRange, setDateRange] = useState(30); // 7, 14, or 30 days
  const [currentTime, setCurrentTime] = useState(new Date());

  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  // Live clock
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const refresh = useCallback(() => {
    setIsRefreshing(true);
    setTimeout(() => {
      setRefreshKey(k => k + 1);
      setLastRefreshed(new Date());
      setIsRefreshing(false);
    }, 800);
  }, []);

  const login = useCallback((username, password) => {
    // Mock login implementation
    // In a real app, this would be an API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (username && password) {
          setIsAuthenticated(true);
          setUser({ username, name: 'Admin User', role: 'Manager' });
          resolve({ success: true });
        } else {
          reject(new Error('Invalid credentials'));
        }
      }, 500); // Simulate network delay
    });
  }, []);

  const logout = useCallback(() => {
    setIsAuthenticated(false);
    setUser(null);
  }, []);

  return (
    <AppContext.Provider value={{
      refreshKey,
      isRefreshing,
      lastRefreshed,
      dateRange,
      setDateRange,
      refresh,
      currentTime,
      isAuthenticated,
      user,
      login,
      logout,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}
