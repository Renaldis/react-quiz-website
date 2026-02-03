import { BrowserRouter as Router, Routes, Route } from 'react-router';
import Home from './pages/Home';
import HomeLayout from './components/Home/HomeLayout';

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <HomeLayout>
              <Home />
            </HomeLayout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
