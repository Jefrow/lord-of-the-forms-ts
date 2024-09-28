import { ChangeEventHandler, useRef, SetStateAction, Dispatch } from "react";
import { PhoneInputState } from "../types";
import { ErrorMessage } from "../ErrorMessage";

export const FunctionalPhoneInput = ({
  phoneInputState,
  setPhoneInputState,
  showError,
  isValid, 
  errorMessage,
}: {
  phoneInputState: PhoneInputState;
  setPhoneInputState: Dispatch<SetStateAction<PhoneInputState>>;
  showError: boolean;
  isValid: boolean; 
  errorMessage: string; 
}) => {

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
      const validRegex = /^\d*$/

      // makes sure that each input only allows the max input length to be typed in. 
      if (value.length > currentMaxLength) {
        return;
      }

      // only allows numeric value input. 
      if (!validRegex.test(value)) {
        return;
      }

      const shouldGoToNextRef =
        currentMaxLength === value.length && nextRef?.current;
      // added ' && index > 0 ' so that all inputs from ref[0] can be deleted. 
      const shouldGoToPrevRef = value.length === 0 && index > 0;

      const newState = phoneInputState.map((phoneInput, phoneInputIndex) =>
        index === phoneInputIndex ? e.target.value : phoneInput
      ) as PhoneInputState;

      if (shouldGoToNextRef) {
        nextRef.current?.focus();
      }

      if (shouldGoToPrevRef) {
        prevRef.current?.focus();
      }

      setPhoneInputState(newState);
    };

  return (
    <>
      <div className="input-wrap">
        <label htmlFor="phone">Phone:</label>
        <div id="phone-input-wrap">
          <input
            type="text"
            id="phone-input-1"
            placeholder="55"
            ref={ref0}
            value={phoneInputState[0]}
            onChange={createOnChangeHandler(0)}
          />
          -
          <input
            type="text"
            id="phone-input-2"
            placeholder="55"
            ref={ref1}
            value={phoneInputState[1]}
            onChange={createOnChangeHandler(1)}
          />
          -
          <input
            type="text"
            id="phone-input-3"
            placeholder="55"
            ref={ref2}
            value={phoneInputState[2]}
            onChange={createOnChangeHandler(2)}
          />
          -
          <input
            type="text"
            id="phone-input-4"
            placeholder="5"
            ref={ref3}
            value={phoneInputState[3]}
            onChange={createOnChangeHandler(3)}
          />
        </div>
      </div>
      {showError && !isValid && <ErrorMessage message={errorMessage} show={true} />}
    </>
  );
};
