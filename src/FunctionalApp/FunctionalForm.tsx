import { useState,FormEvent } from "react";
import { messages } from "../ErrorMessage";
import {
  isEmailValid,
  isCityValid,
  isNameInputValid,
  isPhoneValid,
} from "../utils/validations";
import { allCities } from "../utils/all-cities";
import { UserInformation, PhoneInputState } from "../types";
import { FunctionalPhoneInput } from "./FunctionalPhoneInput";
import { FunctionalTextInput } from "./FunctionalTextInput";


export const FunctionalForm = ({
  handleUserInformation,
}: {
  handleUserInformation: (userInfo: UserInformation) => void;
}) => {
  const [firstNameInput, setFirstNameInput] = useState("");
  const [lastNameInput, setLastNameInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [cityInput, setCityInput] = useState("");
  const [phoneInput, setPhoneInput] = useState<PhoneInputState>([
    "",
    "",
    "",
    "",
  ]);
  const [showErrors, setShowErrors] = useState(false);

  const isFirstNameInputValid = isNameInputValid(firstNameInput);
  const isLastNameInputValid = isNameInputValid(lastNameInput);
  const isEmailInputValid = isEmailValid(emailInput);
  const isCityInputValid = isCityValid(cityInput);
  const isPhoneInputValid = isPhoneValid(phoneInput);


  const hasNoErrors = () => {
    return (
      isFirstNameInputValid &&
      isLastNameInputValid &&
      isEmailInputValid &&
      isCityInputValid &&
      isPhoneInputValid
    );
  };

  const reset = () => {
    setFirstNameInput("");
    setLastNameInput("");
    setEmailInput("");
    setCityInput("");
    setPhoneInput(["", "", "", ""]);
    setShowErrors(false);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setShowErrors(true);

    if (hasNoErrors()) {
      handleUserInformation({
        firstName: firstNameInput,
        lastName: lastNameInput,
        email: emailInput,
        city: cityInput,
        phone: phoneInput,
      });
      reset();
    } else {
      alert("Bad data Input");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <u>
        <h3>User Information Form</h3>
      </u>
      <FunctionalTextInput
        label={"First Name"}
        inputProps={{
          placeholder: "Bilbo",
          value: firstNameInput,
          onChange: (e) => {
            setFirstNameInput(e.target.value);
          },
        }}
        showError={showErrors}
        isValid={isFirstNameInputValid}
        errorMessage={messages.firstName}
      />

      <FunctionalTextInput
        label={"Last Name"}
        inputProps={{
          placeholder: "Baggins",
          value: lastNameInput,
          onChange: (e) => {
            setLastNameInput(e.target.value);
          },
        }}
        showError={showErrors}
        isValid={isLastNameInputValid}
        errorMessage={messages.lastName}
      />

      <FunctionalTextInput
        label={"Email"}
        inputProps={{
          placeholder: "bilbo-baggins@adventurehobbits.net",
          value: emailInput,
          onChange: (e) => {
            setEmailInput(e.target.value);
          },
        }}
        showError={showErrors}
        isValid={isEmailInputValid}
        errorMessage={messages.email}
      />

      <div className="input-wrap">
        <FunctionalTextInput
          label={"City"}
          inputProps={{
            placeholder: "Hobbiton",
            value: cityInput,
            list: "cityOptions",
            onChange: (e) => {
              setCityInput(e.target.value);
            },
          }}
          showError={showErrors}
          isValid={isCityInputValid}
          errorMessage={messages.city}
        />
        <datalist id="cityOptions">
          {allCities.map((city) => (
            <option key={city} value={city} id={city}></option>
          ))}
        </datalist>
      </div>

      <FunctionalPhoneInput
        phoneInputState={phoneInput}
        setPhoneInputState={setPhoneInput}
        showError={showErrors}
        isValid={isPhoneInputValid}
        errorMessage={messages.phone}
      />

      <input type="submit" value="Submit" />
    </form>
  );
};
