import { showPasswordStrengthParameters, hidePasswordStrengthParameters, checkPasswordStrength, showPassword, hidePassword} from "./passwordOperations.js";

let password = document.getElementById("userPassword");
let passwordConfirmation = document.getElementById("passwordConfirmation");
let passwordPeek = document.getElementById("passwordView");
let passwordChangeButton = document.getElementById("passwordChangeButton");

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

passwordConfirmation.addEventListener("input", checkPasswordMatching);

function checkPasswordMatching() {
    if (password.value === passwordConfirmation.value) {
        passwordChangeButton.removeAttribute("disabled")
    } else {
        passwordChangeButton.setAttribute("disabled", "disabled");
    }
}