import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import CombinedComponent from "./components/Combined/Combined";
import Welcome from "./components/Welcome/Welcome";
import {
  ButtonSmall,
  ButtonMedium,
  ButtonOutline,
  ButtonSmallWide,
} from "./components/ui/Buttons";
import {
  DropdownMonth,
  DropdownSeason,
  DropdownYear,
} from "./components/ui/DropDowns";
import {
  TextInput,
  SearchBar,
  SearchBarWithOptional,
  TextInputXS,
  TextInputSM,
  TextInputMD,
  TextInputLG,
} from "./components/ui/Inputs";

function App() {
  // State to check if user is logged in
  // If token is present in local storage, user is logged in
  const token = localStorage.getItem("token");
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("token") ? true : false
  );

  // Conditional logging based on token presence
  if (token) {
    console.log(`Token: ${token}, Logged in`);
  } else {
    console.log("Token not found, not logged in");
  }
  return (
    <Router>
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <Routes>
        <Route path="/" element={<CombinedComponent />} />
        <Route
          path="/welcome"
          element={isLoggedIn ? <Welcome /> : <Navigate to="/" />}
        />
      </Routes>
      <ButtonSmall>Small</ButtonSmall>
      <ButtonMedium>Medium</ButtonMedium>
      <ButtonOutline>Outline</ButtonOutline>
      <ButtonSmallWide>Wide</ButtonSmallWide>
      <p className="text-info">Info</p>
      <p className="text-success">Success</p>
      <p className="text-warning">Warning</p>
      <p className="text-error">Error</p>
      <DropdownMonth />
      <DropdownSeason />
      <DropdownYear />
      <TextInput />
      <SearchBar />
      <SearchBarWithOptional />
      <TextInputXS />
      <TextInputSM />
      <TextInputMD />
      <TextInputLG />
    </Router>
  );
}

export default App;
