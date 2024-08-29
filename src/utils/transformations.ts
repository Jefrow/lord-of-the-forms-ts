export const capitalize = (str: string):string => {
    return str.charAt(0).toUpperCase() + str.slice(1);  
}

export const formatPhoneNumber = (phoneInput:[string, string, string, string]) => {
    const phoneArray = Array.from(phoneInput); 
    return phoneArray.join("-")
    // todo: build this function
    // `formatPhoneNumber("1234567")` should be `"12-34-56-7"`
}