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
import LandingPage from "./pages/public-pages/LandingPage";
// private (dashboard) page imports:
import DashboardHome from "./pages/data-vis-pages/DashboardHome";
import Welcome from "./pages/data-vis-pages/Welcome";
import LGAPage from "./pages/data-vis-pages/LGAPage";

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
                  <DashboardHome />
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
