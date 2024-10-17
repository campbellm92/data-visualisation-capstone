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

  // State variables for error and success messages
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleLogin = async (e) => {
    // Prevent default form submission
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
      // Send a POST request to login endpoint with email and password
      const res = await axios.post("http://localhost:3000/users/login", {
        email: emailValue,
        password: passwordValue,
      });

      // Check if the response is successful
      if (res.data.success) {
        emailInputReset();
        passwordInputReset();
        // Clear any previous error messages
        setError(null);
        // Set success message
        setSuccess("Login successful!");
      } else {
        // If the response is not successful, set error message
        setError(res.data.message || "User or Password is incorrect.");
        setSuccess(null);
      }
    } catch (err) {
      // If an error occurs, set error
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
      {/* Input field for email */}
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
      {/* Input field for password */}
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
      {/* Login button */}
      <div className="form-control mt-6">
        <ButtonMediumFullWide onClick={handleLogin}>Login</ButtonMediumFullWide>
      </div>
      {/* Error and success messages */}
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
