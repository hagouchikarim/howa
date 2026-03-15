import { createContext, useContext, useState, useCallback, useEffect } from 'react';

const AppContext = createContext();

export function AppProvider({ children }) {
  const [refreshKey, setRefreshKey] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastRefreshed, setLastRefreshed] = useState(new Date());
  const [dateRange, setDateRange] = useState(30); // 7, 14, or 30 days
  const [currentTime, setCurrentTime] = useState(new Date());

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

  return (
    <AppContext.Provider value={{
      refreshKey,
      isRefreshing,
      lastRefreshed,
      dateRange,
      setDateRange,
      refresh,
      currentTime,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}
