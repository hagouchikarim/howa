import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import BranchComparison from './pages/BranchComparison';
import DemandAnalytics from './pages/DemandAnalytics';
import ProductPerformance from './pages/ProductPerformance';
import Alerts from './pages/Alerts';

export default function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<ProtectedRoute><Layout><Outlet /></Layout></ProtectedRoute>}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/branches" element={<BranchComparison />} />
            <Route path="/demand" element={<DemandAnalytics />} />
            <Route path="/products" element={<ProductPerformance />} />
            <Route path="/alerts" element={<Alerts />} />
          </Route>
        </Routes>
      </AppProvider>
    </BrowserRouter>
  );
}
