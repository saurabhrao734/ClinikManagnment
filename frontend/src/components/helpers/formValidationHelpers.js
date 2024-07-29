export const isValidAge = (age) => {
    const minAge = 0;
    const maxAge = 150;
    return age >= minAge && age <= maxAge;
}

export const isValidMobileNo = (mobileNo) => {
    const mobileNoRegex = /^[0-9]{10}$/; 
    return mobileNoRegex.test(mobileNo);
}

export const isValidAmount = (amount) => {
    const minAmount = 0;
    return amount >= minAmount;
}

export const isValidWeight = (weight) => {
    const minWeight = 0;
    const maxWeight = 1000;
    return weight >= minWeight && weight <= maxWeight;
}

export const isValidFullName = (fullName) => {
    const fullNameRegex = /^[a-zA-Z]+\s[a-zA-Z]+$/;
    return fullNameRegex.test(fullName);
}