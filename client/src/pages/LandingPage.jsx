import { useContext } from "react";
import HeroSection from "../sections/landing-page/HeroSection";
import Toast from "../components/ui/Toasts";
import { AuthContext } from "../context/AuthProvider";

export default function LandingPage() {
  const { showLogoutToast } = useContext(AuthContext);

  return (
    <div>
      <HeroSection />
      {showLogoutToast && <Toast>Successfully logged out</Toast>}
    </div>
  );
}
