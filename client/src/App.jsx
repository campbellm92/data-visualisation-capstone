import React, { useState } from "react";
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
  // State to check if user is logged in
  // If token is present in local storage, user is logged in
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("token") ? true : false
  );

  console.log(localStorage.getItem("token"));
  return (
    <div>
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
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
