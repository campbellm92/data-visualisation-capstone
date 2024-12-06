import React, { useEffect, useState } from "react";
import InputField from "../../../components/User/InputField";
import {
  useNameValidator,
  useEmailValidator,
} from "../../../hooks/input-sanitizers/useAuthValidators";
import { ButtonMediumWide } from "../../../components/ui/Buttons";
import axios from "axios";

// Set the base URL for Axios
axios.defaults.baseURL = "http://localhost:3000";

const BillingInformation = ({ data }) => {
  const {
    value: firstName,
    hasError: firstNameHasError,
    valueChangeHandler: firstNameChangeHandler,
    markAsTouched: firstNameMarkAsTouched,
    inputReset: firstNameInputReset,
    setValue: setFirstName,
  } = useNameValidator();

  const {
    value: lastName,
    hasError: lastNameHasError,
    valueChangeHandler: lastNameChangeHandler,
    markAsTouched: lastNameMarkAsTouched,
    inputReset: lastNameInputReset,
    setValue: setLastName,
  } = useNameValidator();

  const {
    value: emailValue,
    hasError: emailHasError,
    valueChangeHandler: emailChangeHandler,
    markAsTouched: emailMarkAsTouched,
    inputReset: emailInputReset,
    setValue: setEmail,
  } = useEmailValidator();

  const [organisation, setOrganisation] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [city, setCity] = useState("");
  const [postcode, setPostcode] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");

  const [initialData, setInitialData] = useState({});

  console.log("Billing Data:", data);

  // Check if data is available and initialData is empty
  useEffect(() => {
    if (data && Object.keys(initialData).length === 0) {
      setFirstName(data.user.firstName || "");
      setLastName(data.user.lastName || "");
      setEmail(data.user.email || "");
      setOrganisation(data.user.Organisation || "");
      setStreetAddress(data.user.StreetAddress || "");
      setCity(data.user.City || "");
      setPostcode(data.user.Postcode || "");
      setCardNumber(data.user.CardNumber || "");

      const expiryDate = data.user.ExpiryDate
        ? new Date(data.user.ExpiryDate).toISOString().split("T")[0]
        : "";
      setExpiryDate(expiryDate);

      setCvv(data.user.CVV || "");
      setInitialData({
        firstName: data.user.firstName || "",
        lastName: data.user.lastName || "",
        email: data.user.email || "",
        organisation: data.user.Organisation || "",
        streetAddress: data.user.StreetAddress || "",
        city: data.user.City || "",
        postcode: data.user.Postcode || "",
        cardNumber: data.user.CardNumber || "",
        expiryDate: expiryDate,
        cvv: data.user.CVV || "",
      });
    }
  }, [data, initialData]);

  // Check if any field has been changed
  const isChanged =
    firstName !== initialData.firstName ||
    lastName !== initialData.lastName ||
    emailValue !== initialData.email ||
    organisation !== initialData.organisation ||
    streetAddress !== initialData.streetAddress ||
    city !== initialData.city ||
    postcode !== initialData.postcode ||
    cardNumber !== initialData.cardNumber ||
    expiryDate !== initialData.expiryDate ||
    cvv !== initialData.cvv;

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem("token"); // Retrieve token from localStorage
      const response = await axios.put(
        "/users/update",
        {
          firstName,
          lastName,
          email: emailValue,
          Organisation: organisation,
          StreetAddress: streetAddress,
          City: city,
          Postcode: postcode,
          CardNumber: cardNumber,
          ExpiryDate: expiryDate,
          CVV: cvv,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.success) {
        alert("User details updated successfully");
        // Optionally, reset the initial data to the updated values
        setInitialData({
          firstName,
          lastName,
          email: emailValue,
          organisation,
          streetAddress,
          city,
          postcode,
          cardNumber,
          expiryDate,
          cvv,
        });
      }
    } catch (error) {
      console.error("Error updating user details:", error);
      alert("Failed to update user details");
    }
  };

  return (
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
            placeholder="XXXX XXXX XXXX XXXX"
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

      {/* Button to change billing information */}
      <div className="form-control mt-6">
        <ButtonMediumWide
          textColor={"text-primary-content -auto inline-block"}
          className="w-auto inline-block"
          disabled={!isChanged}
          onClick={handleUpdate}
        >
          Change Billing Information
        </ButtonMediumWide>
      </div>
    </div>
  );
};

export default BillingInformation;
