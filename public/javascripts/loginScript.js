let password = document.getElementById("password");
function showPassword() {
    password.setAttribute("type", "text");
    document.getElementById("showPasswordImage").setAttribute("src", "/images/openedEye.png");
}

function hidePassword() {
    password.setAttribute("type", "password");
    document.getElementById("showPasswordImage").setAttribute("src", "/images/slashedEye.png");
}