import React from "react";
import { useState } from "react";
import { ButtonMediumWide } from "../../components/ui/Buttons";
import LoadingSpinner from "../../components/ui/LoadingSpinner";
import InputField from "../../components/User/InputField";
import {
  useEmailValidator,
  usePasswordValidator,
  useNameValidator,
} from "../../hooks/input-sanitizers/useAuthValidators";

const Settings = () => {
  const [localArea, setLocalArea] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [organisation, setOrganisation] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [city, setCity] = useState("");
  const [postcode, setPostcode] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");

  // Object to keep track of open sections
  const [openSections, setOpenSections] = useState({
    accountDetails: true,
    billingInformation: true,
  });

  // Function to toggle the section
  const toggleSection = (section) => {
    setOpenSections((prevState) => ({
      ...prevState,
      [section]: !prevState[section],
    }));
  };

  // Local area options
  const localAreaOptions = ["Cairns", "Gold Coast", "Noosa", "Whitsunday"];

  const {
    value: firstName,
    hasError: firstNameHasError,
    valueChangeHandler: firstNameChangeHandler,
    markAsTouched: firstNameMarkAsTouched,
    inputReset: firstNameInputReset,
  } = useNameValidator();

  const {
    value: lastName,
    hasError: lastNameHasError,
    valueChangeHandler: lastNameChangeHandler,
    markAsTouched: lastNameMarkAsTouched,
    inputReset: lastNameInputReset,
  } = useNameValidator();

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

  return (
    <>
      <div className="ml-10">
        <h1 className="text-3xl font-bold text-primary-content">Settings</h1>
        <div
          className={`collapse ${
            openSections.accountDetails ? "collapse-open" : "collapse-close"
          } bg-base-200 collapse-arrow`}
        >
          {/* Title - Toggles the Collapse */}
          <div
            className="collapse-title text-xl font-medium cursor-pointer text-primary-content"
            onClick={() => toggleSection("accountDetails")}
          >
            Account Details
            <div className="bg-black h-[1px] mt-2 mb-0 bg-primary-content"></div>
          </div>

          <div className="collapse-content text-primary-content">
            {/* Input field for first name */}
            <InputField
              label="First Name"
              labelClassName={"text-primary-content"}
              type="text"
              placeholder="First Name"
              className="lg:w-1/2 md:w-[400px] w-[400px]"
              value={firstName}
              onChange={firstNameChangeHandler}
              onBlur={firstNameMarkAsTouched}
              error={firstNameHasError}
              errorMessage="Please enter a valid first name"
            />

            {/* Input field for last name */}
            <InputField
              label="Last Name"
              labelClassName={"text-primary-content"}
              type="text"
              placeholder="Last Name"
              className="lg:w-1/2 md:w-[400px] w-[400px]"
              value={lastName}
              onChange={lastNameChangeHandler}
              onBlur={lastNameMarkAsTouched}
              hasError={lastNameHasError}
              errorMessage="Name can only contain letters, hyphens, apostrophes, periods, and spaces."
            />
            {/* Select field for local area */}
            <InputField
              label="Local Area"
              labelClassName={"text-primary-content"}
              type="select"
              placeholder="Select Your Local Area"
              className="lg:w-1/2 md:w-[400px] w-[400px]"
              value={localArea}
              onChange={(e) => setLocalArea(e.target.value)}
              options={localAreaOptions}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleRegister(e);
                }
              }}
            />
            {/* Input field for password */}
            <InputField
              label="Reset Password"
              labelClassName={"text-primary-content"}
              type="password"
              placeholder="Password"
              className="lg:w-1/2 md:w-[400px] w-[400px]"
              value={passwordValue}
              onChange={passwordChangeHandler}
              onBlur={passwordMarkAsTouched}
              hasError={passwordHasError}
              errorMessage="Password must be more than 8 characters long, include an
                  uppercase letter, a number, and a special character."
            />

            <div className="form-control mt-6">
              <ButtonMediumWide
                //onClick={}
                textColor={"text-primary-content -auto inline-block"}
                className="w-auto inline-block"
              >
                {isLoading ? <LoadingSpinner /> : "Change"}
              </ButtonMediumWide>
            </div>

            {/* Error and success messages */}
            {error && <div className="pt-3 text-error">{error}</div>}
            {success && <div className="pt-3 text-success">{success}</div>}
          </div>
        </div>
      </div>
      <div className="ml-10">
        <div
          className={`collapse ${
            openSections.billingInformation ? "collapse-open" : "collapse-close"
          } bg-base-200 collapse-arrow`}
        >
          <div
            className="collapse-title text-xl font-medium cursor-pointer text-primary-content"
            onClick={() => toggleSection("billingInformation")}
          >
            Billing Information
            <div className="bg-black h-[1.5px] mt-2 mb-0 bg-primary-content"></div>
          </div>

          <div className="collapse-content">
            {/* First Name and Last Name in one line */}
            <div className="flex flex-wrap gap-4 text-primary-content">
              <InputField
                label="First Name"
                labelClassName={"text-primary-content"}
                type="text"
                placeholder="First Name"
                className="w-[400px]" // Fixed width of 400px
                value={firstName}
                onChange={firstNameChangeHandler}
                onBlur={firstNameMarkAsTouched}
                error={firstNameHasError}
                errorMessage="Please enter a valid first name"
              />

              <InputField
                label="Last Name"
                labelClassName={"text-primary-content"}
                type="text"
                placeholder="Last Name"
                className="w-[400px]" // Fixed width of 400px
                value={lastName}
                onChange={lastNameChangeHandler}
                onBlur={lastNameMarkAsTouched}
                error={lastNameHasError}
                errorMessage="Please enter a valid last name"
              />
            </div>

            {/* Email and Organisation in one line */}
            <div className="flex flex-wrap gap-4 text-primary-content">
              <InputField
                label="Email Address"
                labelClassName={"text-primary-content"}
                type="email"
                placeholder="Email Address"
                className="w-[400px]"
                value={emailValue}
                onChange={emailChangeHandler}
                onBlur={emailMarkAsTouched}
                error={emailHasError}
                errorMessage="Please enter a valid email address"
              />

              <InputField
                label="Organisation/Company"
                labelClassName={"text-primary-content"}
                type="text"
                placeholder="Organisation"
                className="w-[400px]"
                value={organisation}
                onChange={(e) => setOrganisation(e.target.value)}
              />
            </div>

            {/* Billing Address - First field full width, other two in one line */}
            <div className="flex flex-wrap gap-4 text-primary-content">
              <InputField
                label="Street Address"
                labelClassName={"text-primary-content"}
                type="text"
                placeholder="Street Address"
                className="w-[400px]"
                value={streetAddress}
                onChange={(e) => setStreetAddress(e.target.value)}
              />
              <div className="flex gap-4 w-full sm:w-1/2">
                <InputField
                  label="City"
                  labelClassName={"text-primary-content"}
                  type="text"
                  placeholder="City"
                  className="w-full"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
                <InputField
                  label="Postcode"
                  labelClassName={"text-primary-content"}
                  type="text"
                  placeholder="Postcode"
                  className="w-[100px]"
                  value={postcode}
                  onChange={(e) => setPostcode(e.target.value)}
                />
              </div>
            </div>

            {/* Payment Method - Card Number, Expiry Date, CVV */}
            <div className="flex flex-wrap gap-4 text-primary-content">
              <div className="w-full sm:w-1/2">
                <InputField
                  label="Card Number"
                  labelClassName={"text-primary-content"}
                  type="text"
                  placeholder="Card Number"
                  className="w-full"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  icon="card-icon"
                />
              </div>
              <div className="w-full sm:w-1/4">
                <InputField
                  label="Expiry Date"
                  labelClassName={"text-primary-content"}
                  type="date"
                  className="w-full"
                  value={expiryDate}
                  onChange={(e) => setExpiryDate(e.target.value)}
                />
              </div>
              <div className="w-full sm:w-1/4">
                <InputField
                  label="CVV"
                  labelClassName={"text-primary-content"}
                  type="text"
                  placeholder="CVV"
                  className="w-[100px]"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value)}
                />
              </div>
            </div>

            {/* Button for Change Billing Information */}
            <div className="form-control mt-6">
              <ButtonMediumWide
                textColor={"text-primary-content -auto inline-block"}
                className="w-auto inline-block"
              >
                {isLoading ? <LoadingSpinner /> : "Change Billing Information"}
              </ButtonMediumWide>
            </div>

            {/* Error and success messages */}
            {error && <div className="pt-3 text-error">{error}</div>}
            {success && <div className="pt-3 text-success">{success}</div>}
          </div>
        </div>
      </div>
    </>
  );
};

export default Settings;
