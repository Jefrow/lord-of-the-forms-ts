export const ErrorMessage = ({
  message,
  show,
}: {
  message: string;
  show: boolean;
}) => {
  return show ? <div className="error-message">{message}</div> : <div></div>;
};


export const  messages = {
firstName : "First name must be at least 2 characters long and not numbers or special characters",
lastName :  "Last name must be at least 2 characters long and not numbers or special characters",
email : "Email is Invalid",
city : "State is Invalid",
phone : "Invalid Phone Number",
}