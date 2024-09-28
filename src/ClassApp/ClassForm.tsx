import { Component, FormEvent } from "react";
import {  messages } from "../ErrorMessage";
import {
  isEmailValid,
  isCityValid,
  isNameInputValid,
  isPhoneValid,
} from "../utils/validations";
import { allCities } from "../utils/all-cities";
import { UserInformation, PhoneInputState } from "../types";
import { ClassPhoneInput } from "./ClassPhoneInput";
import { ClassTextInput } from "./ClassTextInput";

type Props = {
  handleUserInformation: (userInformation: UserInformation) => void;
};

type State = {
  firstNameInput: string;
  lastNameInput: string;
  emailInput: string;
  cityInput: string;
  phoneInputState: [string, string, string, string];
  showErrors: boolean;
};

export class ClassForm extends Component<Props, State, PhoneInputState> {
  state = {
    firstNameInput: "",
    lastNameInput: "",
    emailInput: "",
    cityInput: "",
    phoneInputState: ["", "", "", ""] as PhoneInputState,
    showErrors: false,
  };

  isFirstNameInputValid = () => isNameInputValid(this.state.firstNameInput);
  isLastNameInputValid = () => isNameInputValid(this.state.lastNameInput);
  isEmailInputValid = () => isEmailValid(this.state.emailInput);
  isCityInputValid = () => isCityValid(this.state.cityInput);
  isPhoneInputValid = () => isPhoneValid(this.state.phoneInputState);

  hasNoErrors = () => {
    return (
      this.isFirstNameInputValid() &&
      this.isLastNameInputValid() &&
      this.isEmailInputValid() &&
      this.isCityInputValid() &&
      this.isPhoneInputValid()
    );
  };

  reset = () => {
    this.setState({
      firstNameInput: "",
      lastNameInput: "",
      emailInput: "",
      cityInput: "",
      phoneInputState: ["", "", "", ""],
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
      alert("Bad data Input");
    }
  };

  render() {
    const {
      firstNameInput,
      lastNameInput,
      emailInput,
      cityInput,
      phoneInputState,
      showErrors,
    } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <u>
          <h3>User Information Form</h3>
        </u>

        <ClassTextInput
          label={"First Name"}
          inputProps={{
            placeholder: "Bilbo",
            value: firstNameInput,
            onChange: (e) => {
              this.setState({ firstNameInput: e.target.value });
            },
          }}
          isValid={this.isFirstNameInputValid()}
          errorMessage={messages.firstName}
          showError={showErrors}
        />


        <ClassTextInput
          label={"Last Name"}
          inputProps={{
            placeholder: "Bagging",
            value: lastNameInput,
            onChange: (e) => {
              this.setState({ lastNameInput: e.target.value });
            },
          }}
          isValid={this.isLastNameInputValid()}
          errorMessage={messages.lastName}
          showError={showErrors}
        />

        <ClassTextInput
          label={"Email"}
          inputProps={{
            placeholder: "bilbo-baggins@adventurehobbits.net",
            value: emailInput,
            onChange: (e) => {
              this.setState({ emailInput: e.target.value });
            },
          }}
          isValid={this.isEmailInputValid()}
          errorMessage={messages.email}
          showError={showErrors}
        />

        <div className="input-wrap">
          <ClassTextInput
            label={"City"}
            inputProps={{
              placeholder: "Hobbiton",
              value: cityInput,
              list: "cityOptions",
              onChange: (e) => {
                this.setState({ cityInput: e.target.value });
              },
            }}
            isValid={this.isCityInputValid()}
            errorMessage={messages.city}
            showError={showErrors}
          />
          <datalist id="cityOptions">
            {allCities.map((city) => (
              <option key={city} value={city} id={city}></option>
            ))}
          </datalist>
        </div>

        <ClassPhoneInput
          phoneInputState={phoneInputState}
          setPhoneInputState={(newPhoneInput: PhoneInputState) =>
            this.setState({ phoneInputState: newPhoneInput })
          }
          isValid={this.isPhoneInputValid()}
          errorMessage={messages.phone}
          showError={showErrors}
        />
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
