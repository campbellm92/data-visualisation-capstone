import Navbar from "./components/layout/Navbar";
import HeroSection from "./components/sections/HeroSection";
import Diff from "./components/layout/Diff";
import {
  ButtonSmall,
  ButtonMedium,
  ButtonOutline,
  ButtonSmallWide,
} from "./components/ui/Buttons";

function App() {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <Diff />
      <ButtonSmall>Small</ButtonSmall>
      <ButtonMedium>Medium</ButtonMedium>
      <ButtonOutline>Outline</ButtonOutline>
      <ButtonSmallWide>Wide</ButtonSmallWide>
      <p className="text-info">Info</p>
      <p className="text-success">Success</p>
      <p className="text-warning">Warning</p>
      <p className="text-error">Error</p>
    </div>
  );
}

export default App;
