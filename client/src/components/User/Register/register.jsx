import { useState } from "react";
import InputField from "../InputField";
import { ButtonMediumFullWide } from "../../ui/Buttons";
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

  const [localArea, setLocalArea] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const localAreaOptions = ["Cairns", "Gold Coast", "Noosa", "Whitsunday"];

  // Function to handle registration
  const handleRegister = (e) => {
    e.preventDefault();

    emailMarkAsTouched();
    passwordMarkAsTouched();

    if (!emailValue && !passwordValue && !localArea) {
      setError("All fields are required to continue.");
      setSuccess(null);
      return;
    }

    if (emailHasError || passwordHasError) {
      setError("Invalid email or password. Please try again.");
      setSuccess(null);
      return;
    }

    if (!localArea) {
      setError("Please select your local government area (LGA).");
      setSuccess(null);
      return;
    }

    console.log("Registering with:", emailValue, passwordValue, localArea);

    emailInputReset();
    passwordInputReset();
    setLocalArea("");
    setError(null);
    setSuccess("Registration successful!");
  };

  return (
    <div className="flex flex-col">
      <h2 className="card-title">Register</h2>
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
        errorMessage="Password must be more than 8 characters long, include an
                  uppercase letter, a number, and a special character."
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
        <ButtonMediumFullWide onClick={handleRegister}>
          Login
        </ButtonMediumFullWide>
      </div>

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
