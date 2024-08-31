import { allCities } from "./all-cities";

export const isEmailValid = (emailAddress: string) => {
    // eslint-disable-next-line no-useless-escape
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return !!emailAddress.match(emailRegex);
}

export const isNameInputValid = (nameInput: string): boolean => {
    return nameInput
           .split('')
           .every(char => char.toLowerCase() != char.toUpperCase()) && nameInput.length > 2
}

export const isCityValid = (cityInput: string): boolean => {
    return (
        allCities.includes(cityInput)
    )
}

export const isPhoneValid = (phoneInput:[string, string, string, string]): boolean => {
    {/*
     -couple ways to maybe do this? 
     1. check that the phone input looks like (['11','22','22','2'])  with the first 3 strings having 2 numbers and the last one with 1 number
     2. convert phone input into one long string and make sure that it has 7 numbers.  
    */}
    const phoneNumber = Array.from(phoneInput).join('');
    return(phoneNumber.length === 7);  
}
