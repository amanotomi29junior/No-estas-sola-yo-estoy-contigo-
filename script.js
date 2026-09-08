const sobre = document.getElementById("sobre");
const abrirCarta = document.getElementById("abrirCarta");
const cartaSeccion = document.getElementById("cartaSeccion");
const mostrarJuego = document.getElementById("mostrarJuego");
const juegoSeccion = document.getElementById("juegoSeccion");

const zonaJuego = document.getElementById("zonaJuego");
const puntosElemento = document.getElementById("puntos");
const mensajeJuego = document.getElementById("mensajeJuego");
const mensajeFinal = document.getElementById("mensajeFinal");

let puntos = 0;
let corazonesCreados = 0;
const meta = 10;

abrirCarta.addEventListener("click", () => {
  sobre.classList.add("abierto");
  abrirCarta.textContent = "Carta abierta ♥";

  setTimeout(() => {
    cartaSeccion.classList.remove("oculta");
    cartaSeccion.scrollIntoView({
      behavior: "smooth"
    });
  }, 900);
});

mostrarJuego.addEventListener("click", () => {
  juegoSeccion.classList.remove("oculta");
  juegoSeccion.scrollIntoView({
    behavior: "smooth"
  });

  iniciarJuego();
});

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
  }, 700);
}

function crearCorazon() {
  corazonesCreados++;

  const corazon = document.createElement("span");
  corazon.classList.add("corazon");
  corazon.textContent = "♥";

  const limiteX = zonaJuego.clientWidth - 45;
  const limiteY = zonaJuego.clientHeight - 45;

  corazon.style.left = `${Math.random() * limiteX}px`;
  corazon.style.top = `${Math.random() * limiteY}px`;

  corazon.addEventListener("click", () => {
    puntos++;
    puntosElemento.textContent = puntos;
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
  }, 3500);
}

function terminarJuego() {
  document.querySelectorAll(".corazon").forEach((corazon) => {
    corazon.remove();
  });

  mensajeFinal.classList.remove("oculta");
}