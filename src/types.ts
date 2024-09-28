import { ComponentProps } from "react";

export type UserInformation = {
  firstName: string;
  lastName: string;
  email: string;
  city: string;
  phone: [string, string, string, string];
};

export type PhoneInputState = [string, string, string, string];

export type InputProps = ComponentProps<"input">;
