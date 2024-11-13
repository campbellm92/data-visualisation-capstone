import { useContext } from "react";
import { AuthContext } from "./context/AuthProvider";
import { ThemeProvider } from "./context/ThemeProvider";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
// layout imports:
import PublicLayout from "./components/layout/PublicLayout";
import DashboardLayout from "./components/layout/DashboardLayout";
// public pages imports:
import LandingPage from "./pages/LandingPage";
// private (dashboard) page imports:
import Dashboard from "./pages/data-visualisation/Dashboard";
import Welcome from "./pages/welcome/Welcome";
import LGAPage from "./pages/data-visualisation/LGAPage";

function App() {
  return (
    <Router>
      <ThemeProvider>
        {/* navbar renders everywhere */}
        {/* <Navbar /> */}
        <Routes>
          {/* landing page code now in pages > LandingPage.jsx */}
          <Route
            path="/"
            element={
              <PublicLayout>
                <LandingPage />
              </PublicLayout>
            }
          />
          <Route
            path="/welcome"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <Welcome />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/lgapage"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <LGAPage />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <Dashboard />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
        </Routes>
      </ThemeProvider>
    </Router>
  );
}

function ProtectedRoute({ children }) {
  const { isLoggedIn } = useContext(AuthContext);
  return isLoggedIn ? children : <Navigate to="/" />;
}

export default App;
