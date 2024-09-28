import { Component, createRef, RefObject, ChangeEvent } from "react";
import { PhoneInputState } from "../types";
import { ErrorMessage } from '../ErrorMessage'

type PhoneInputProps = {
  phoneInputState: PhoneInputState;
  setPhoneInputState: (state: PhoneInputState) => void;
  showError: boolean;
  isValid: boolean; 
  errorMessage: string; 
};

export class ClassPhoneInput extends Component<PhoneInputProps> {
  ref0 = createRef<HTMLInputElement>();
  ref1 = createRef<HTMLInputElement>();
  ref2 = createRef<HTMLInputElement>();
  ref3 = createRef<HTMLInputElement>();

  createOnChangeHandler =
    (index: 0 | 1 | 2 | 3) => (e: ChangeEvent<HTMLInputElement>) => {
      const lengths = [2, 2, 2, 1];
      const currentMaxLength = lengths[index];
      const nextRef = this.refsArray[index + 1];
      const prevRef = this.refsArray[index - 1];
      const value = e.target.value;
      const validRegex = /^\d*$/

      if (value.length > currentMaxLength) {
        return;
      }

      if (!validRegex.test(value)) {
        return;
      }

      const shouldGoToNextRef =
        currentMaxLength === value.length && nextRef?.current;

      const shouldGoToPrevRef = value.length === 0 && index > 0;

      const newState = this.props.phoneInputState.map(
        (phoneInput, phoneInputIndex) =>
          index === phoneInputIndex ? e.target.value : phoneInput
      ) as PhoneInputState;

      if (shouldGoToNextRef) {
        nextRef.current?.focus();
      }

      if (shouldGoToPrevRef) {
        prevRef.current?.focus;
      }

      this.props.setPhoneInputState(newState)
    };

  refsArray: RefObject<HTMLInputElement>[] = [
    this.ref0,
    this.ref1,
    this.ref2,
    this.ref3,
  ];
  render() {
    const { phoneInputState, isValid, showError, errorMessage } = this.props
    return (
      <>
        <div className="input-wrap">
          <label htmlFor="phone">Phone:</label>
          <div id="phone-input-wrap">
            <input
              type="text"
              id="phone-input-1"

              placeholder="55"
              ref={this.ref0}
              value={phoneInputState[0]}
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
        {showError && !isValid && <ErrorMessage message={errorMessage} show={true} /> }
      </>
    );
  }
}
