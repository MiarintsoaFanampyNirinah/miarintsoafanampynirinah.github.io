const passwordInput = document.getElementById('passwordInput');
const submitBtn = document.getElementById('submitBtn');
const message = document.getElementById('message');

const correctPassword = "mta";

submitBtn.addEventListener('click', () => {
    const userPassword = passwordInput.value.trim();

    if (userPassword === "") {
        message.textContent = "Le champ est vide.";
        message.className = "error";
    } else if (userPassword === correctPassword) {
        message.textContent = "Accès autorisé. Redirection...";
        message.className = "success";
        setTimeout(() => {
            window.location.href = "portfolio.html";
        }, 1500);
    } else {
        message.textContent = "Accès refusé.";
        message.className = "error";
    }
});
