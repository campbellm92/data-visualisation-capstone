import Navbar from "./components/layout/Navbar";
import {
  ButtonSmall,
  ButtonMedium,
  ButtonOutline,
  ButtonWide,
} from "./components/ui/Buttons";

function App() {
  return (
    <div>
      <Navbar />
      <ButtonSmall>Small</ButtonSmall>
      <ButtonMedium>Medium</ButtonMedium>
      <ButtonOutline>Outline</ButtonOutline>
      <ButtonWide>Wide</ButtonWide>
    </div>
  );
}

export default App;
