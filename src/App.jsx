import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import BranchComparison from './pages/BranchComparison';
import DemandAnalytics from './pages/DemandAnalytics';
import ProductPerformance from './pages/ProductPerformance';
import Alerts from './pages/Alerts';

export default function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/branches" element={<BranchComparison />} />
            <Route path="/demand" element={<DemandAnalytics />} />
            <Route path="/products" element={<ProductPerformance />} />
            <Route path="/alerts" element={<Alerts />} />
          </Routes>
        </Layout>
      </AppProvider>
    </BrowserRouter>
  );
}
