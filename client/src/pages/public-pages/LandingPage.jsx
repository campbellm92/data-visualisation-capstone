import { useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";
import Toast from "../../components/ui/Toasts";
import HeroSection from "../../sections/public-sections/landing-page/HeroSection";
import InfoSection from "../../sections/public-sections/landing-page/InfoSection";

export default function LandingPage() {
  const { showLogoutToast } = useContext(AuthContext);

  return (
    <div>
      <HeroSection />
      <InfoSection />
      {showLogoutToast && <Toast>Successfully logged out</Toast>}
    </div>
  );
}
