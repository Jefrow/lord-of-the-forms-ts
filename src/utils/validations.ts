import { allCities } from "./all-cities";

export const isEmailValid = (emailAddress: string) => {
    // eslint-disable-next-line no-useless-escape
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return !!emailAddress.match(regex);
}

export const isNameInputValid = (nameInput: string): boolean => {
    return (
        nameInput.length > 2
    )
}

export const isCityValid = (cityInput: string): boolean => {
    return (
        allCities.includes(cityInput)
    )
}

export const isPhoneValid = (phoneInput: string) => {
    const phoneRegex = /^[0-9]{3}[-]?[0-9]{3}[-]?[0-9]{4}$/
    return !!phoneInput.match(phoneRegex); 
}

{/* how would i validate a phone input? 
    -first 3 indexes should have 2 values. 
    -last index should have 1 value. 
*/}
