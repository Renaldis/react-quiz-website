import { BrowserRouter as Router, Routes, Route } from 'react-router';
import Home from './pages/client/Home';
import ProtectedRoute from './components/layout/ProtectedRoute';
import LandingPageLayout from './components/layout/LandingPageLayout';
import DashboardLayout from './components/layout/DashboardLayout';
import DashboardHome from './pages/dashboard/Dashboard';
import QuizList from './pages/dashboard/quiz/QuizList';
import QuizActive from './pages/dashboard/quiz/QuizActive';
import QuizFinish from './pages/dashboard/quiz/QuizFinish';
import History from './pages/dashboard/History';

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
            <Route path="quizz" element={<QuizList />} />
            <Route path="quizz/active" element={<QuizActive />} />
            <Route path="quizz/result" element={<QuizFinish />} />
            <Route path="history" element={<History />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
