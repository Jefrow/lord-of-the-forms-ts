import React from "react";
import { InputProps } from "../types";
import { ErrorMessage } from "../ErrorMessage";
type TextInputProps = {
  inputProps: InputProps;
  label: string;
  isValid: boolean;
  errorMessage: string;
  showError: boolean;
};
export class ClassTextInput extends React.Component<TextInputProps> {
  render() {
    const { inputProps, label, showError, isValid, errorMessage } = this.props;
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
  }
}
