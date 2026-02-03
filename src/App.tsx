import { BrowserRouter as Router, Routes, Route } from 'react-router';
import Home from './pages/client/Home';
import ProtectedRoute from './components/layout/ProtectedRoute';
import LandingPageLayout from './components/layout/LandingPageLayout';
import DashboardLayout from './components/layout/DashboardLayout';
import DashboardHome from './pages/dashboard/Dashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <LandingPageLayout>
              <Home />
            </LandingPageLayout>
          }
        />
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<DashboardHome />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
