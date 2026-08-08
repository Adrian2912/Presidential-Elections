function showPasswordStrengthParameters() {
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

function checkPasswordStrength(password) {
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

function showPassword(password, passwordConfirmation) {
    password.setAttribute("type", "text");
    passwordConfirmation.setAttribute("type", "text");
    document.getElementById("showPasswordImage").setAttribute("src", "/images/openedEye.png");
}

function hidePassword(password, passwordConfirmation) {
    password.setAttribute("type", "password");
    passwordConfirmation.setAttribute("type", "password");
    document.getElementById("showPasswordImage").setAttribute("src", "/images/slashedEye.png");
}

export { showPasswordStrengthParameters, hidePasswordStrengthParameters, checkPasswordStrength, showPassword, hidePassword };