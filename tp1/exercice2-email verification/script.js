
const formulaire = document.getElementById("emailForm");
const email = document.getElementById("email");
const message = document.getElementById("message");

formulaire.addEventListener("submit", function(event) {
    event.preventDefault();

    let adresse = email.value.trim();

    // Vérification de l'adresse email
    let expression = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (expression.test(adresse)) {
        message.textContent = "Adresse email valide !";
        message.className = "valide";
    } else {
        message.textContent = "Adresse email invalide !";
        message.className = "invalide";
    }
});
