const JSONBIN_URL = "https://api.jsonbin.io/v3/b/68ff9e9543b1c97be9850496/latest";

// Elementos del DOM
const lista = document.getElementById("lista");
const statusText = document.getElementById("status");

// Función principal
async function cargarMensajes() {
  try {

    const res = await fetch(JSONBIN_URL);
    if (!res.ok) throw new Error(`Error HTTP ${res.status}`);

    const data = await res.json();

    const objetos = data.record;

    return data.record;

  } catch (err) {
    console.error(err);  }
}
