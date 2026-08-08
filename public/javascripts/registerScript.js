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

/*function showPasswordStrengthParameters() {
    const strengthParameters = document.getElementsByClassName("strengthParameter");
    for (let i = 0; i < strengthParameters.length; ++i) {
        strengthParameters[i].style.display = "inline";
    }
}

function hidePasswordStrengthParameters() {
    const strengthParameters = document.getElementsByClassName("strengthParameter");
    for (let i = 0; i < strengthParameters.length; ++i) {
        strengthParameters[i].style.display = "none";
    }
}

function checkPasswordStrength() {
    const strengthParameters = document.getElementsByClassName("strengthParameter");
    const strengthParametersValues = [false, false, false, false, false];
    const specialCharacters = "~!@#$%^&*()_-+={[]}|:;<,>.?/";
    if (password.value.length >= 8) {
        strengthParametersValues[0] = true;
    }
    for (let i = 0; i < password.value.length; ++i) {
        if (password.value[i] >= 'A' && password.value[i] <= 'Z') {
          strengthParametersValues[1] = true;
        }
        if (password.value[i] >= 'a' && password.value[i] <= 'z') {
          strengthParametersValues[2] = true;
        }
        if (password.value[i] >= '0' && password.value[i] <= '9') {
          strengthParametersValues[3] = true;
        }
        for (let j = 0; j < specialCharacters.length; ++j) {
            if (password.value[i] == specialCharacters[j]) {
                strengthParametersValues[4] = true;
            }
        }
    }
    for (let i = 0; i < strengthParameters.length; ++i) {
        if (strengthParametersValues[i]) {
            strengthParameters[i].style.color = "#2ECC71";
        } else {
            strengthParameters[i].style.color = "#E74C3C";
        }
    }
    if (strengthParametersValues.every(
        strengthParameter => strengthParameter === true 
    )) {
        passwordConfirmation.disabled = false;
    } else {
        passwordConfirmation.disabled = true;
    }
}

function showPassword() {
    password.setAttribute("type", "text");
    passwordConfirmation.setAttribute("type", "text");
    document.getElementById("showPasswordImage").setAttribute("src", "/images/openedEye.png");
}

function hidePassword() {
    password.setAttribute("type", "password");
    passwordConfirmation.setAttribute("type", "password");
    document.getElementById("showPasswordImage").setAttribute("src", "/images/slashedEye.png");
}*/

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
    document.querySelector("h1").innerText = isFirstNameValid.valid + ' ' + isLastNameValid.valid;
    if (isFirstNameValid.valid && isLastNameValid.valid && password.value.length > 0 && passwordConfirmation.value.length > 0 && password.value === passwordConfirmation.value && isPhoneNumberValid.valid) {
        registerButton.disabled = false;
    } else {
        registerButton.disabled = true;
    }
}