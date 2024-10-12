import React, { useState } from "react";
import InputField from "../InputField";
import { ButtonMediumFullWide } from "../../ui/Buttons";

const Login = ({ toggle }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  
  // Function to handle login
  const handleLogin = () => {
    console.log("Logging in with:", username, password);
  };

  return (
    <div className="flex flex-col">
      <h2 className="card-title">Login</h2>
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
      <div className="form-control mt-6">
        <ButtonMediumFullWide onClick={handleLogin}>Login</ButtonMediumFullWide>
      </div>
      <p className="mt-4">
        Don't have an account?{" "}
        <button className="text-blue-500 hover:underline" onClick={toggle}>
          Register here
        </button>
      </p>
    </div>
  );
};

export default Login;
