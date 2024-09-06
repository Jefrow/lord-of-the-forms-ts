import { useState, useRef, ChangeEventHandler, FormEvent } from 'react';
import { ErrorMessage } from '../ErrorMessage';
import {
  isEmailValid,
  isCityValid,
  isNameInputValid,
  isPhoneValid,
} from '../utils/validations';
import { allCities } from '../utils/all-cities';
import { UserInformation, PhoneInputState } from '../types';

const firstNameErrorMessage = 'First name must be at least 2 characters long';
const lastNameErrorMessage = 'Last name must be at least 2 characters long';
const emailErrorMessage = 'Email is Invalid';
const cityErrorMessage = 'State is Invalid';
const phoneNumberErrorMessage = 'Invalid Phone Number';

export const FunctionalForm = ({
  handleUserInformation,
}: {
  handleUserInformation: (userInfo: UserInformation) => void;
}) => {
  //state to keep track of the state of each inputs and whether or not the form is submitted

  const [firstNameInput, setFirstNameInput] = useState('');
  const [lastNameInput, setLastNameInput] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [cityInput, setCityInput] = useState('');
  const [phoneInput, setPhoneInput] = useState<PhoneInputState>([
    '',
    '',
    '',
    '',
  ]);
  const [showErrors, setShowErrors] = useState(false);

  const isFirstNameInputValid = isNameInputValid(firstNameInput);
  const isLastNameInputValid = isNameInputValid(lastNameInput);
  const isEmailInputValid = isEmailValid(emailInput);
  const isCityInputValid = isCityValid(cityInput);
  const isPhoneInputValid = isPhoneValid(phoneInput);

  const shouldShowFirstNameError = showErrors && !isFirstNameInputValid;
  const shouldShowLastNameError = showErrors && !isLastNameInputValid;
  const shouldShowEmailInputError = showErrors && !isEmailInputValid;
  const shouldShowCityInputError = showErrors && !isCityInputValid;
  const shouldShowPhoneInputError = showErrors && !isPhoneInputValid;

  const hasNoErrors = () => {
    return (
      isFirstNameInputValid &&
      isLastNameInputValid &&
      isEmailInputValid &&
      isCityInputValid && 
      isPhoneInputValid
    ) 
  };

  const ref0 = useRef<HTMLInputElement>(null);
  const ref1 = useRef<HTMLInputElement>(null);
  const ref2 = useRef<HTMLInputElement>(null);
  const ref3 = useRef<HTMLInputElement>(null);

  const refs = [ref0, ref1, ref2, ref3];

  //onChangeHandler function that returns a function to keep track of each phone input state. 
  const createOnChangeHandler =
    (index: 0 | 1 | 2 | 3): ChangeEventHandler<HTMLInputElement> =>
    (e) => {
      const lengths = [2, 2, 2, 1];

      const currentMaxLength = lengths[index];
      const nextRef = refs[index + 1];
      const prevRef = refs[index - 1];
      const value = e.target.value;

      // makes sure that each input only allows the max input length to be typed in. 
      if (value.length > currentMaxLength) {
        return;
      }

      // only allows numeric value input. 
      if (!/^\d*$/.test(value)) {
        return;
      }

      const shouldGoToNextRef =
        currentMaxLength === value.length && nextRef?.current;
      // added ' && index > 0 ' so that all inputs from ref[0] can be deleted. 
      const shouldGoToPrevRef = value.length === 0 && index > 0;

      const newState = phoneInput.map((phoneInput, phoneInputIndex) =>
        index === phoneInputIndex ? e.target.value : phoneInput
      ) as PhoneInputState;

      if (shouldGoToNextRef) {
        nextRef.current?.focus();
      }

      if (shouldGoToPrevRef) {
        prevRef.current?.focus();
      }

      setPhoneInput(newState);
    };

  const reset = () => {
    setFirstNameInput('')
    setLastNameInput('')
    setEmailInput('') 
    setCityInput('')
    setPhoneInput(['','','',''])
    setShowErrors(false)
  }

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
      })
      reset(); 
    } else {
      alert('Bad data Input'); 
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
    >
      <u>
        <h3>User Information Form</h3>
      </u>

      {/* first name input */}
      <div className="input-wrap">
        <label>{'First Name'}:</label>
        <input
          placeholder="Bilbo"
          type="text"
          value={firstNameInput}
          onChange={(e) => {
            e.preventDefault();
            setFirstNameInput(e.target.value);
          }}
        />
      </div>
      {shouldShowFirstNameError && (
        <ErrorMessage message={firstNameErrorMessage} show={true} />
      )}

      {/* last name input */}
      <div className="input-wrap">
        <label>{'Last Name'}:</label>
        <input
          placeholder="Baggins"
          type="text"
          value={lastNameInput}
          onChange={(e) => {
            e.preventDefault();
            setLastNameInput(e.target.value);
          }}
        />
      </div>
      {shouldShowLastNameError && (
        <ErrorMessage message={lastNameErrorMessage} show={true} />
      )}

      {/* Email Input */}
      <div className="input-wrap">
        <label>{'Email'}:</label>
        <input
          placeholder="bilbo-baggins@adventurehobbits.net"
          type="text"
          value={emailInput}
          onChange={(e) => {
            e.preventDefault();
            setEmailInput(e.target.value);
          }}
        />
      </div>
      {shouldShowEmailInputError && (
        <ErrorMessage message={emailErrorMessage} show={true} />
      )}

      {/* City Input */}
      <div className="input-wrap">
        <label>{'City'}:</label>
        <input
          placeholder="Hobbiton"
          type="text"
          value={cityInput}
          list="cityOptions"
          onChange={(e) => {
            e.preventDefault();
            setCityInput(e.target.value);
          }}
        />
        {/* not sure if this is the right way to render options for the input.. 
            come back to this not theres probably a better option. good for now. 
        */}
        <datalist id="cityOptions">
          {allCities.map((city) => (
            <option key={city} value={city} id={city}></option>
          ))}
        </datalist>
      </div>
      {shouldShowCityInputError && (
        <ErrorMessage message={cityErrorMessage} show={true} />
      )}

      <div className="input-wrap">
        <label htmlFor="phone">Phone:</label>
        <div id="phone-input-wrap">
          <input
            type="text"
            id="phone-input-1"
            placeholder="55"
            ref={ref0}
            value={phoneInput[0]}
            onChange={createOnChangeHandler(0)}
          />
          -
          <input
            type="text"
            id="phone-input-2"
            placeholder="55"
            ref={ref1}
            value={phoneInput[1]}
            onChange={createOnChangeHandler(1)}
          />
          -
          <input
            type="text"
            id="phone-input-3"
            placeholder="55"
            ref={ref2}
            value={phoneInput[2]}
            onChange={createOnChangeHandler(2)}
          />
          -
          <input
            type="text"
            id="phone-input-4"
            placeholder="5"
            ref={ref3}
            value={phoneInput[3]}
            onChange={createOnChangeHandler(3)}
          />
        </div>
      </div>

      {/*
        -For phone input message, we need to keep track of each of the phone input, and maybe for the validation, we look for a pattern of "22-22-22-2"? 
        and that we don't leave any input fields open...
       
       */}
      {shouldShowPhoneInputError && (
        <ErrorMessage message={phoneNumberErrorMessage} show={true} />
      )}

      <input type="submit" value="Submit" />
    </form>
  );
};