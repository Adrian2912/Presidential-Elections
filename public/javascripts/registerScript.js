import { showPasswordStrengthParameters, hidePasswordStrengthParameters, checkPasswordStrength, showPassword, hidePassword } from "./passwordOperations.js";
let firstName = document.getElementById("firstName");
let lastName = document.getElementById("lastName");
let password = document.getElementById("userPassword");
let passwordConfirmation = document.getElementById("passwordConfirmation");
let phoneNumber = document.getElementById("phoneNumber");
let registerButton = document.getElementById("registerButton");
let passwordPeek = document.getElementById("passwordView");
const isFirstNameValid = {
    valid : false
};
const isLastNameValid = {
    valid : false
};
const isPhoneNumberValid = {
    valid : false
}

firstName.addEventListener("input", () => {
    isNameValid(firstName, isFirstNameValid);
});
firstName.addEventListener("focus", () => {
    showWarning("firstNameAndLastNameWarning");
});
firstName.addEventListener("blur", () => {
    hideWarning("firstNameAndLastNameWarning");
});
lastName.addEventListener("input", () => {
    isNameValid(lastName, isLastNameValid);
});
lastName.addEventListener("focus", () => {
    showWarning("firstNameAndLastNameWarning");
});
lastName.addEventListener("blur", () => {
    hideWarning("firstNameAndLastNameWarning");
});
password.addEventListener("focus", showPasswordStrengthParameters);
password.addEventListener("blur", hidePasswordStrengthParameters);
password.addEventListener("input", () => {
    checkPasswordStrength(password);
});
passwordPeek.addEventListener("mouseover", () => {
    showPassword(password, passwordConfirmation);
});
passwordPeek.addEventListener("mouseout", () => {
    hidePassword(password, passwordConfirmation);
});

phoneNumber.addEventListener("input", validatePhoneNumber);
phoneNumber.addEventListener("focus", () => {
    showWarning("phoneNumberWarning");
});
phoneNumber.addEventListener("blur", () => {
    hideWarning("phoneNumberWarning");
});

function isNameValid(nameType, nameTypeValidity) {
    let nameWarning = document.getElementById("firstNameAndLastNameWarning");
    if (nameType.value.length > 0) {
        nameTypeValidity.valid = true;
        nameWarning.style.color = "#2ECC71";
        for (let i = 0; i < nameType.value.length; ++i) {
            if ((nameType.value[i] < 'A' || nameType[i] > 'Z') && (nameType.value[i] < 'a' || nameType.value > 'z') && nameType.value[i] !== ' ' && nameType.value[i] !== '-') {
                nameWarning.style.color = "#E74C3C";
                nameTypeValidity.valid = false;
            }
        }
    } else {
        nameTypeValidity.valid = false;
    }
    
    verifyCredentials();
}

function showWarning(id) {
    document.getElementById(id).style.display = "inline";
}

function hideWarning(id) {
    document.getElementById(id).style.display = "none";
}

function validatePhoneNumber() {
    let phoneNumberWarning = document.getElementById("phoneNumberWarning");
    isPhoneNumberValid.valid = true;
    if (phoneNumber.value.length === 10) {
        phoneNumberWarning.style.color = "#2ECC71";
        if (phoneNumber.value[0] === '0' && phoneNumber.value[1] === '7') {
            for (let i = 2; i < phoneNumber.value.length; ++i) {
                if (phoneNumber.value[i] < 0 || phoneNumber.value[i] > 9) {
                    phoneNumberWarning.style.color = "#E74C3C";
                    isPhoneNumberValid.valid = false;
                    break;
                }
            }
        } else {
            phoneNumberWarning.style.color = "#E74C3C";
            isPhoneNumberValid.valid = false;
        }
    } else {
        phoneNumberWarning.style.color = "#E74C3C";
        isPhoneNumberValid.valid = false;
    }
    verifyCredentials();
}

function verifyCredentials() {
    if (isFirstNameValid.valid && isLastNameValid.valid && password.value.length > 0 && passwordConfirmation.value.length > 0 && password.value === passwordConfirmation.value && isPhoneNumberValid.valid) {
        registerButton.disabled = false;
    } else {
        registerButton.disabled = true;
    }
}