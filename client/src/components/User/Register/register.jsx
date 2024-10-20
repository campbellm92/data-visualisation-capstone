import { useState } from "react";
import axios from "axios";
import InputField from "../InputField";
import { ButtonMediumFullWide } from "../../ui/Buttons";
import LoadingSpinner from "../../ui/LoadingSpinner";
import {
  useEmailValidator,
  usePasswordValidator,
} from "../../../hooks/input-sanitizers/useAuthValidators";

function Register({ toggle }) {
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

  // State variables for local area, error and success messages
  const [localArea, setLocalArea] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Local area options
  const localAreaOptions = ["Cairns", "Gold Coast", "Noosa", "Whitsunday"];

  // Function to handle registration
  const handleRegister = async (e) => {
    // Prevent default form submission
    e.preventDefault();

    // Mark email and password fields as touched
    emailMarkAsTouched();
    passwordMarkAsTouched();

    // Check if all fields are filled
    if (!emailValue || !passwordValue || !localArea) {
      setError("All fields are required to continue.");
      setSuccess(null);
      return;
    }

    // Check if email and password have errors
    if (emailHasError || passwordHasError) {
      setError("Invalid email or password. Please try again.");
      setSuccess(null);
      return;
    }

    // Check if local area is selected
    // if (!localArea) {
    //   setError("Please select your local government area (LGA).");
    //   setSuccess(null);
    //   return;
    // } // necessary?

    try {
      // Send a POST request to register endpoint with email, password and local area
      const res = await axios.post("https://localhost:3000/users/register", {
        email: emailValue,
        password: passwordValue,
        LGAName: localArea,
      });

      // Check if the response is successful
      if (res.data.success) {
        emailInputReset();
        passwordInputReset();
        setLocalArea("");
        // Reset error and set success message
        setError(null);
        setSuccess("Registration successful!");
        setIsLoading(true);
        setTimeout(() => {
          document.getElementById("auth_modal").close();
          setSuccess(null);
          setIsLoading(false);
        }, 3000);
      } else {
        // If the response is not successful, set error message
        setError(res.data.message || "An error occurred during registration.");
        setSuccess(null);
      }
    } catch (err) {
      setError(
        // If an error occurs, set error
        err.response?.data?.message ||
          "Server error. Could not complete registration."
      );
      setSuccess(null);
    }
  };

  return (
    <div className="flex flex-col">
      <h2 className="card-title">Register</h2>
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
        errorMessage="Password must be more than 8 characters long, include an
                  uppercase letter, a number, and a special character."
      />
      {/* Select field for local area */}
      <InputField
        label="Local Area"
        type="select"
        placeholder="Select Your Local Area"
        value={localArea}
        onChange={(e) => setLocalArea(e.target.value)}
        options={localAreaOptions}
      />

      {/* Register button */}
      <div className="form-control mt-6">
        <ButtonMediumFullWide onClick={handleRegister}>
          {isLoading ? <LoadingSpinner /> : "Register"}
        </ButtonMediumFullWide>
      </div>

      {/* Error and success messages */}
      {error && <div className="pt-3 text-error">{error}</div>}
      {success && <div className="pt-3 text-success">{success}</div>}

      <p className="mt-4">
        Already have an account?{" "}
        <button className="text-blue-500 hover:underline" onClick={toggle}>
          Login here
        </button>
      </p>
    </div>
  );
}

export default Register;
