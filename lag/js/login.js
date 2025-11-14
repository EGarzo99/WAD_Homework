const JSONBIN_URL = "https://api.jsonbin.io/v3/b/6900de93d0ea881f40c27ae2/latest";
const LOCAL_JSON = './prueba.json';

// Global posts array
let users = [];

document.addEventListener('DOMContentLoaded', async () => {

    const res = await fetch(JSONBIN_URL);
    const json = await res.json();
    users = Array.isArray(json.record) ? json.record : json.record.posts;

    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const loginButton = document.getElementById("loginBtn");
    const form = document.getElementById("loginForm");

    // Función que revisa a ver si los campos están llenos
    function revisarCampos() {
        const emailTexto = emailInput.value.trim();
        const passwordTexto = passwordInput.value.trim();

        if (emailTexto.length > 0 && passwordTexto.length > 0) {
            loginButton.disabled = false;
        } else {
            loginButton.disabled = true;
        }
    }

    // Registrar los listeners solo si los elementos existen
    if (emailInput && passwordInput && loginButton && form) {
        // Cuando el usuario escriba, revisa los campos
        emailInput.addEventListener("input", revisarCampos);
        passwordInput.addEventListener("input", revisarCampos);

        // Inicializar estado del botón
        revisarCampos();

        // Cuando se pulse el botón "Login"
        form.addEventListener("submit", function(evento) {
            evento.preventDefault(); // evita recargar la página

            const emailTexto = emailInput.value.trim();
            const passwordTexto = passwordInput.value.trim();

            // Buscar un usuario que coincida con el email (o username) y la contraseña
            const matchedUser = users.find(u =>
                u.email === emailTexto && u.password === passwordTexto
            );

            if (matchedUser) {
                // Opcional: guardar información de sesión
                sessionStorage.setItem('user', JSON.stringify(matchedUser));

                window.location.href = "index.html"; // redirige a index
            } else {
                alert("Incorrect email or password. Please try again.");
            }
        });
    }
});