const sobre = document.getElementById("sobre");
const abrirCarta = document.getElementById("abrirCarta");
const cartaSeccion = document.getElementById("cartaSeccion");
const mostrarJuego = document.getElementById("mostrarJuego");
const juegoSeccion = document.getElementById("juegoSeccion");

const zonaJuego = document.getElementById("zonaJuego");
const puntosElemento = document.getElementById("puntos");
const mensajeJuego = document.getElementById("mensajeJuego");
const mensajeFinal = document.getElementById("mensajeFinal");
const mensajeCorazon = document.getElementById("mensajeCorazon");
const mensajeProgreso = document.getElementById("mensajeProgreso");

let puntos = 0;
let corazonesCreados = 0;
const meta = 10;

const mensajes = [
  "Eres una de las personas más especiales de mi vida.",
  "No tienes que estar bien todo el tiempo.",
  "Puedes descansar; yo seguiré aquí.",
  "Tu sonrisa ilumina mis días.",
  "Te amo incluso en tus momentos difíciles.",
  "Mereces tranquilidad, cariño y cosas bonitas.",
  "Siempre tendrás un lugar seguro conmigo.",
  "Eres más fuerte de lo que imaginas.",
  "Gracias por existir y formar parte de mi vida.",
  "Premio final: un ramo de tulipanes para ti."
];

function abrirLaCarta() {
  sobre.classList.add("abierto");
  abrirCarta.textContent = "Carta abierta ♥";

  setTimeout(() => {
    cartaSeccion.classList.remove("oculta");

    cartaSeccion.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }, 900);
}

function mostrarElJuego() {
  juegoSeccion.classList.remove("oculta");

  juegoSeccion.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });

  iniciarJuego();
}

function iniciarJuego() {
  if (corazonesCreados > 0) {
    return;
  }

  mensajeJuego.style.display = "none";

  const intervalo = setInterval(() => {
    crearCorazon();

    if (corazonesCreados >= meta) {
      clearInterval(intervalo);
    }
  }, 850);
}

function crearCorazon() {
  corazonesCreados++;

  const corazon = document.createElement("button");

  corazon.type = "button";
  corazon.classList.add("corazon");
  corazon.textContent = "♥";
  corazon.setAttribute(
    "aria-label",
    `Atrapar corazón ${corazonesCreados} de ${meta}`
  );

  const limiteX = zonaJuego.clientWidth - 45;
  const limiteY = zonaJuego.clientHeight - 45;

  corazon.style.left = `${Math.random() * limiteX}px`;
  corazon.style.top = `${Math.random() * limiteY}px`;

  corazon.addEventListener("click", () => {
    if (!corazon.parentElement) {
      return;
    }

    const posicionX = corazon.offsetLeft;
    const posicionY = corazon.offsetTop;

    puntos++;
    puntosElemento.textContent = puntos;

    mostrarMensaje(mensajes[puntos - 1]);
    crearFlor(posicionX, posicionY);

    corazon.remove();

    if (puntos >= meta) {
      terminarJuego();
    }
  });

  zonaJuego.appendChild(corazon);

  setTimeout(() => {
    if (corazon.parentElement) {
      corazon.remove();
    }
  }, 5500);
}

function mostrarMensaje(texto) {
  mensajeCorazon.textContent = texto;
  mensajeCorazon.classList.remove("oculta");

  clearTimeout(mostrarMensaje.temporizador);

  mostrarMensaje.temporizador = setTimeout(() => {
    mensajeCorazon.classList.add("oculta");
  }, 3500);
}

function crearFlor(posicionX, posicionY) {
  const flor = document.createElement("span");

  flor.classList.add("flor-juego");
  flor.textContent = "🌷";
  flor.style.left = `${posicionX}px`;
  flor.style.top = `${posicionY}px`;

  zonaJuego.appendChild(flor);

  requestAnimationFrame(() => {
    flor.classList.add("flor-visible");
  });
}

function terminarJuego() {
  document.querySelectorAll(".corazon").forEach((corazon) => {
    corazon.remove();
  });

  mensajeProgreso.textContent =
    "Has encontrado todos los mensajes que preparé para ti.";

  setTimeout(() => {
    mensajeFinal.classList.remove("oculta");

    mensajeFinal.scrollIntoView({
      behavior: "smooth",
      block: "center"
    });
  }, 900);
}

sobre.addEventListener("click", abrirLaCarta);
abrirCarta.addEventListener("click", abrirLaCarta);
mostrarJuego.addEventListener("click", mostrarElJuego);