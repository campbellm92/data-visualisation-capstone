import { useContext } from "react";
import { AuthContext } from "./context/AuthProvider";
import { ThemeProvider } from "./context/ThemeProvider";
import { AiAnalysisProvider } from "./context/AiAnalysisProvider";
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
import DataAnalyst from "./pages/data-vis-pages/DataAnalyst";
import LGAPage from "./pages/data-vis-pages/LGAPage";
import Guide from "./pages/data-vis-pages/Guide";
import Settings from "./pages/data-vis-pages/Settings";

function App() {
  return (
    <Router>
      <ThemeProvider>
        <Routes>
          <Route
            path="/"
            element={
              <PublicLayout>
                <LandingPage />
              </PublicLayout>
            }
          />

          <Route
            path="/dataanalyst"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <DataAnalyst />
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
                  <AiAnalysisProvider>
                    <DashboardHome />
                  </AiAnalysisProvider>
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/guide"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <Guide />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <Settings />
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
  return isLoggedIn ? children : <Navigate to="/dashboard" />;
}

export default App;
