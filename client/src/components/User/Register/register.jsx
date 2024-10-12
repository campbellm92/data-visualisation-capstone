import React, { useState } from "react";
import InputField from "../InputField";
import { ButtonMediumFullWide } from "../../ui/Buttons";

const Register = ({ toggle }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [localArea, setLocalArea] = useState("");

  const localAreaOptions = ["Cairns", "Gold Coast", "Noosa", "Whitsunday"];

  // Function to handle registration
  const handleRegister = () => {
    console.log("Registering with:", username, password, localArea);
  };

  return (
    <div className="flex flex-col">
      <h2 className="card-title">Register</h2>
      <InputField
        label="Username"
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <InputField
        label="Password"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <InputField
        label="Local Area"
        type="select"
        placeholder="Select Your Local Area"
        value={localArea}
        onChange={(e) => setLocalArea(e.target.value)}
        options={localAreaOptions}
      />
      <div className="form-control mt-6">
        <ButtonMediumFullWide onClick={handleRegister}>Login</ButtonMediumFullWide>
      </div>
      <p className="mt-4">
        Already have an account?{" "}
        <button className="text-blue-500 hover:underline" onClick={toggle}>
          Login here
        </button>
      </p>
    </div>
  );
};

export default Register;
