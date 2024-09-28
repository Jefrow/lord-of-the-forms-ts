import { InputProps } from "../types";
import { ErrorMessage } from "../ErrorMessage";

export const FunctionalTextInput = ({
  inputProps,
  label,
  showError,
  isValid,
  errorMessage,
}: {
  inputProps: InputProps;
  label: string;
  showError: boolean;
  isValid: boolean;
  errorMessage: string;
}) => {
  return (
    <>
      <div className="input-wrap">
        <label>{label}:</label>
        <input type="text" {...inputProps} />
      </div>
      <div>
        {showError && !isValid && (
          <ErrorMessage message={errorMessage} show={true} />
        )}
      </div>
    </>
  );
};
