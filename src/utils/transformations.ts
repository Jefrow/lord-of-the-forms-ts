export const capitalize = (str: string):string => {
    return str.charAt(0).toUpperCase() + str.slice(1);  
}

export const formatPhoneNumber = (phoneInput:[string, string, string, string]) => {
    const phoneArray = Array.from(phoneInput); 
    return phoneArray.join("-")
}