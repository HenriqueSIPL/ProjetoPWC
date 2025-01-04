function validateForm() {
    var emailInput = document.getElementById("email");
    var isValid = true;

    if (validateEmail(emailInput.value) == false) {
        showError("email", "Erro no email");
        isValid = false;
    } else {
        hideError("email");
    }

    return isValid;
}

function validateEmail(email) {
    var regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return regexEmail.test(email);
}

function showError(fieldId, message) {
    var erroDiv = document.getElementById(`${fieldId}-error`);
    erroDiv.textContent = message;
    erroDiv.style.display = "block";
}

function hideError(fieldId) {
    var erroDiv = document.getElementById(`${fieldId}-error`);
    erroDiv.style.display = "none";
}


document.getElementById("form").addEventListener("submit", function(event) {

    event.preventDefault();

    if (validateForm()) {
        console.log("Submissao");

    } else {
        console.log("Formulário inválido");
    }
});