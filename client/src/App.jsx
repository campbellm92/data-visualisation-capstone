import { useContext } from "react";
import { AuthContext, AuthProvider } from "./context/AuthProvider";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import LandingPage from "./pages/LandingPage";
import Welcome from "./pages/welcome/Welcome";

function App() {
  return (
    <AuthProvider>
      <Router>
        {/* navbar renders everywhere */}
        <Navbar />
        <Routes>
          {/* landing page code now in pages > LandingPage.jsx */}
          <Route path="/" element={<LandingPage />} />
          {/* This is now a protected route which uses the auth provider logic */}
          <Route path="/welcome" element={<ProtectedRoute />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

function ProtectedRoute() {
  const { isLoggedIn } = useContext(AuthContext);
  return isLoggedIn ? <Welcome /> : <Navigate to="/" />;
}

export default App;
