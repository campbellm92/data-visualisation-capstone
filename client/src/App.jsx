import { useContext } from "react";
import { AuthContext } from "./context/AuthProvider";
import { ThemeProvider } from "./context/ThemeProvider";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import PublicLayout from "./components/layout/PublicLayout";
import DashboardLayout from "./components/layout/DashboardLayout";
import LandingPage from "./pages/LandingPage";
import Welcome from "./pages/welcome/Welcome";
import LGAPage from "./pages/data-visualisation/LGAPage";
import DashboardTestPage from "./pages/DashboardTestPage"; // delete when finished

function App() {
  return (
    <Router>
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
              <ThemeProvider>
                <DashboardLayout>
                  <Welcome />
                </DashboardLayout>
              </ThemeProvider>
            </ProtectedRoute>
          }
        />
        <Route
          path="/lgapage"
          element={
            <ProtectedRoute>
              <ThemeProvider>
                <DashboardLayout>
                  <LGAPage />
                </DashboardLayout>
              </ThemeProvider>
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboardtest"
          element={
            <ProtectedRoute>
              <ThemeProvider>
                <DashboardLayout>
                  <DashboardTestPage />
                </DashboardLayout>
              </ThemeProvider>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

function ProtectedRoute({ children }) {
  const { isLoggedIn } = useContext(AuthContext);
  return isLoggedIn ? children : <Navigate to="/" />;
}

export default App;
