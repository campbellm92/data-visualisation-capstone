import { useState } from "react";
import axios from "axios";
import InputField from "../InputField";
import { ButtonMediumFullWide } from "../../ui/Buttons";
import {
  useEmailValidator,
  usePasswordValidator,
} from "../../../hooks/input-sanitizers/useAuthValidators";

const Login = ({ toggle }) => {

  const {
    value: emailValue,
    hasError: emailHasError,
    valueChangeHandler: emailChangeHandler,
    markAsTouched: emailMarkAsTouched,
    inputReset: emailInputReset,
  } = useEmailValidator();

  const {
    value: passwordValue,
    hasError: passwordHasError,
    valueChangeHandler: passwordChangeHandler,
    markAsTouched: passwordMarkAsTouched,
    inputReset: passwordInputReset,
  } = usePasswordValidator();

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();

    emailMarkAsTouched();
    passwordMarkAsTouched();

    if (!emailValue && !passwordValue) {
      setError("Please enter a valid email address and password.");
      setSuccess(null);
      return;
    }

    if (emailHasError || passwordHasError) {
      setError("Invalid email or password. Please try again.");
      setSuccess(null);
      return;
    }

    // console.log("Logging in with:", username, password);

    emailInputReset();
    passwordInputReset();
    setError(null);
    setSuccess("Login successful!");

    try {
      const res = await axios.post("http://localhost:3000/users/login", {
        email: emailValue,
        password: passwordValue,
      });

      if (res.data.success) {
        emailInputReset();
        passwordInputReset();
        setError(null);
        setSuccess("Login successful!");
      } else {
        setError(res.data.message || "User or Password is incorrect.");
        setSuccess(null);
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Server error. Could not complete login."
      );
      setSuccess(null);
    }

  };

  return (
    <div className="flex flex-col">
      <h2 className="card-title">Login</h2>
      <InputField
        label="Username"
        type="text"
        placeholder="Username"
        value={emailValue}
        onChange={emailChangeHandler}
        onBlur={emailMarkAsTouched}
        hasError={emailHasError}
        errorMessage="Please enter a valid email address."
      />
      <InputField
        label="Password"
        type="password"
        placeholder="Password"
        value={passwordValue}
        onChange={passwordChangeHandler}
        onBlur={passwordMarkAsTouched}
        hasError={passwordHasError}
        errorMessage="The password you've entered is incorrect. Please try again."
      />

      <div className="form-control mt-6">
        <ButtonMediumFullWide onClick={handleLogin}>Login</ButtonMediumFullWide>
      </div>

      {error && <div className="pt-3 text-error">{error}</div>}
      {success && <div className="pt-3 text-success">{success}</div>}

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
