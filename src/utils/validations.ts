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
    const phoneNumber = phoneInput.join(''); 
    return (phoneNumber.length === 7)
}

{/* how would i validate a phone input? 
    -first 3 indexes should have 2 values. 
    -last index should have 1 value. 
*/}
