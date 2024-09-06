import { Component, createRef, RefObject, ChangeEvent, FormEvent } from "react";
import { ErrorMessage } from "../ErrorMessage";
import { 
  isEmailValid, 
  isCityValid, 
  isNameInputValid, 
  isPhoneValid 
} from '../utils/validations'
import { allCities } from '../utils/all-cities'
import { UserInformation, PhoneInputState } from '../types'

const firstNameErrorMessage = "First name must be at least 2 characters long";
const lastNameErrorMessage = "Last name must be at least 2 characters long";
const emailErrorMessage = "Email is Invalid";
const cityErrorMessage = "State is Invalid";
const phoneNumberErrorMessage = "Invalid Phone Number";

type Props = {
  handleUserInformation: (userInformation: UserInformation) => void;
}

type State = {
  firstNameInput: string,
  lastNameInput: string,
  emailInput: string,
  cityInput: string,
  phoneInputState: [string, string, string, string],
  showErrors: boolean,
}

export class ClassForm extends Component<Props, State, PhoneInputState> {
  state = {
    firstNameInput: '',
    lastNameInput: '',
    emailInput: '',
    cityInput: '',
    phoneInputState: ['', '', '', ''] as PhoneInputState,
    showErrors: false,
  }


  isFirstNameInputValid = () => isNameInputValid(this.state.firstNameInput);
  isLastNameInputValid = () => isNameInputValid(this.state.lastNameInput);
  isEmailInputValid = () => isEmailValid(this.state.emailInput);
  isCityInputValid = () => isCityValid(this.state.cityInput);
  isPhoneInputValid = () => isPhoneValid(this.state.phoneInputState);

  shouldShowFirstNameError = () => this.state.showErrors && !this.isFirstNameInputValid();
  shouldShowLastNameError = () => this.state.showErrors && !this.isLastNameInputValid();
  shouldShowEmailInputError = () => this.state.showErrors && !this.isEmailInputValid();
  shouldShowCityInputError = () => this.state.showErrors && !this.isCityInputValid();
  shouldShowPhoneInputError = () => this.state.showErrors && !this.isPhoneInputValid();

  /*
    Since we can't decalre variables for validation checks like we can in functional components,
    we can put the validations checks in methods, that way they are not only defined on render,
    but can also be called every render. 
  */

  hasNoErrors = () => {
    return (
      this.isFirstNameInputValid() &&
      this.isLastNameInputValid() &&
      this.isEmailInputValid() &&
      this.isCityInputValid() &&
      this.isPhoneInputValid()
    )
  };

  ref0 = createRef<HTMLInputElement>();
  ref1 = createRef<HTMLInputElement>();
  ref2 = createRef<HTMLInputElement>();
  ref3 = createRef<HTMLInputElement>();

  refsArray: RefObject<HTMLInputElement>[] = [this.ref0, this.ref1, this.ref2, this.ref3];

  createOnChangeHandler = (index: 0 | 1 | 2 | 3) => (e: ChangeEvent<HTMLInputElement>) => {
    const lengths = [2, 2, 2, 1];
    const currentMaxLength = lengths[index];
    const nextRef = this.refsArray[index + 1];
    const prevRef = this.refsArray[index - 1];
    const value = e.target.value;

    if (value.length > currentMaxLength) {
      return;
    }

    if (!/^\d*$/.test(value)) {
      return;
    }

    const shouldGoToNextRef = currentMaxLength === value.length && nextRef?.current;

    const shouldGoToPrevRef = value.length === 0 && index > 0;

    const newState = this.state.phoneInputState.map((phoneInput, phoneInputIndex) =>
      index === phoneInputIndex ? e.target.value : phoneInput
    ) as PhoneInputState;

    if (shouldGoToNextRef) {
      nextRef.current?.focus();
    }

    if (shouldGoToPrevRef) {
      prevRef.current?.focus
    }

    this.setState({ phoneInputState: newState })
  }

  reset = () => {
    this.setState({
      firstNameInput: '',
      lastNameInput: '',
      emailInput: '',
      cityInput: '',
      phoneInputState: ['', '', '', ''],
      showErrors: false,
    });
  };

  handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    this.setState({ showErrors: true });

    if (this.hasNoErrors()) {
      this.props.handleUserInformation({
        firstName: this.state.firstNameInput,
        lastName: this.state.lastNameInput,
        email: this.state.emailInput,
        city: this.state.cityInput,
        phone: this.state.phoneInputState,
      });
      this.reset();
    } else {
      alert('Bad data Input');
    }
  }

  render() {
    const {
      firstNameInput,
      lastNameInput,
      emailInput,
      cityInput,
      phoneInputState,
      showErrors,
    } = this.state

    return (
      <form onSubmit={this.handleSubmit}>
        <u>
          <h3>User Information Form</h3>
        </u>

        {/* first name input */}
        <div className="input-wrap">
          <label>{"First Name"}:</label>
          <input
            placeholder="Bilbo"
            type='text'
            value={firstNameInput}
            onChange={(e) => {
              e.preventDefault();
              this.setState({ firstNameInput: e.target.value })
            }}
          />
        </div>
        {this.shouldShowFirstNameError() && (
          <ErrorMessage message={firstNameErrorMessage} show={true} />
        )}

        {/* last name input */}
        <div className="input-wrap">
          <label>{"Last Name"}:</label>
          <input
            placeholder="Baggins"
            type='text'
            value={lastNameInput}
            onChange={(e) => {
              e.preventDefault();
              this.setState({ lastNameInput: e.target.value })
            }}
          />
        </div>
        {showErrors && this.shouldShowLastNameError() && (
          <ErrorMessage message={lastNameErrorMessage} show={true} />
        )}

        {/* Email Input */}
        <div className="input-wrap">
          <label>{"Email"}:</label>
          <input
            placeholder="bilbo-baggins@adventurehobbits.net"
            type='text'
            value={emailInput}
            onChange={(e) => {
              e.preventDefault();
              this.setState({ emailInput: e.target.value })
            }}
          />
        </div>
        {showErrors && this.shouldShowEmailInputError() && (
          <ErrorMessage message={emailErrorMessage} show={true} />
        )}

        {/* City Input */}
        <div className="input-wrap">
          <label>{"City"}:</label>
          <input
            placeholder="Hobbiton"
            type='text'
            value={cityInput}
            list='cityOptions'
            onChange={(e) => {
              e.preventDefault();
              this.setState({ cityInput: e.target.value })
            }}
          />

          <datalist id="cityOptions">
            {allCities.map((city) => (
              <option key={city} value={city} id={city}></option>
            ))}
          </datalist>
        </div>
        {showErrors && this.shouldShowCityInputError() && (
          <ErrorMessage message={cityErrorMessage} show={true} />
        )}


        <div className="input-wrap">
          <label htmlFor="phone">Phone:</label>
          <div id="phone-input-wrap">
            <input
              type="text"
              id="phone-input-1"
              placeholder="55"
              ref={this.ref0}
              value={this.state.phoneInputState[0]}
              onChange={this.createOnChangeHandler(0)}
            />
            -
            <input
              type="text"
              id="phone-input-2"
              placeholder="55"
              ref={this.ref1}
              value={phoneInputState[1]}
              onChange={this.createOnChangeHandler(1)}
            />
            -
            <input
              type="text"
              id="phone-input-3"
              placeholder="55"
              ref={this.ref2}
              value={phoneInputState[2]}
              onChange={this.createOnChangeHandler(2)}
            />
            -
            <input
              type="text"
              id="phone-input-4"
              placeholder="5"
              ref={this.ref3}
              value={phoneInputState[3]}
              onChange={this.createOnChangeHandler(3)}
            />
          </div>
        </div>

        {showErrors && this.shouldShowPhoneInputError() && (
          <ErrorMessage message={phoneNumberErrorMessage} show={true} />
        )}

        <input type="submit" value="Submit" />
      </form>
    );
  }
}