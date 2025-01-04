function validateForm() {
    var emailInput = document.getElementById("email");
    var isValid = true;

    if (validateEmail(emailInput.value) == false) {
        showError("email", "Erro no email");
        isValid = false;
    } else {
        hideError("email");
    }

    return isValid;  // Retorna true se o formulário for válido, caso contrário retorna false
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

// Carregamento da página
document.getElementById("form2").addEventListener("submit", function(event) {
    // Previne o envio do formulário
    event.preventDefault();

    // Chama a validação do formulário
    if (validateForm()) {
        console.log("Submissao");
        // Aqui você pode adicionar o código para enviar o formulário ou fazer outra ação
    } else {
        console.log("Formulário inválido");
    }
});