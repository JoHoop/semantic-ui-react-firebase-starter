export const emailIsValid = (email) => {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
};

export const emptyElement = (inputs) => {
    return inputs.some((input) => {
        return input === "";
    });
};

export const stringsEqual = (str1, str2) => {
    return str1 === str2;
};
