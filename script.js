document.addEventListener("DOMContentLoaded", function () {
  const sobre = document.getElementById("sobre");
  const abrirCarta = document.getElementById("abrirCarta");
  const cartaSeccion = document.getElementById("cartaSeccion");
  const mostrarJuego = document.getElementById("mostrarJuego");
  const juegoSeccion = document.getElementById("juegoSeccion");

  const zonaJuego = document.getElementById("zonaJuego");
  const puntosTexto = document.getElementById("puntos");
  const mensajeJuego = document.getElementById("mensajeJuego");
  const mensajeCorazon = document.getElementById("mensajeCorazon");
  const mensajeFinal = document.getElementById("mensajeFinal");
  const mensajeProgreso = document.getElementById("mensajeProgreso");

  let puntos = 0;
  let corazonesCreados = 0;
  let juegoIniciado = false;

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

  abrirCarta.addEventListener("click", function () {
    sobre.classList.add("abierto");
    abrirCarta.textContent = "Carta abierta ♥";

    setTimeout(function () {
      cartaSeccion.classList.remove("oculta");

      cartaSeccion.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }, 700);
  });

  mostrarJuego.addEventListener("click", function () {
    juegoSeccion.classList.remove("oculta");

    juegoSeccion.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });

    iniciarJuego();
  });

  function iniciarJuego() {
    if (juegoIniciado) {
      return;
    }

    juegoIniciado = true;
    mensajeJuego.style.display = "none";

    const intervalo = setInterval(function () {
      crearCorazon();

      if (corazonesCreados >= meta) {
        clearInterval(intervalo);
      }
    }, 800);
  }

  function crearCorazon() {
    corazonesCreados++;

    const corazon = document.createElement("button");

    corazon.type = "button";
    corazon.className = "corazon";
    corazon.textContent = "♥";

    const limiteX = Math.max(0, zonaJuego.clientWidth - 45);
    const limiteY = Math.max(0, zonaJuego.clientHeight - 45);

    corazon.style.left = `${Math.random() * limiteX}px`;
    corazon.style.top = `${Math.random() * limiteY}px`;

    corazon.addEventListener("click", function () {
      if (!corazon.parentElement) {
        return;
      }

      const posicionX = corazon.offsetLeft;
      const posicionY = corazon.offsetTop;

      puntos++;
      puntosTexto.textContent = puntos;

      mostrarMensaje(mensajes[puntos - 1]);
      crearFlor(posicionX, posicionY);

      corazon.remove();

      if (puntos === meta) {
        terminarJuego();
      }
    });

    zonaJuego.appendChild(corazon);

    setTimeout(function () {
      if (corazon.parentElement) {
        corazon.remove();
      }
    }, 6000);
  }

  function mostrarMensaje(texto) {
    mensajeCorazon.textContent = texto;
    mensajeCorazon.classList.remove("oculta");

    clearTimeout(mostrarMensaje.temporizador);

    mostrarMensaje.temporizador = setTimeout(function () {
      mensajeCorazon.classList.add("oculta");
    }, 3200);
  }

  function crearFlor(posicionX, posicionY) {
    const flor = document.createElement("span");

    flor.className = "flor-juego";
    flor.textContent = "🌷";
    flor.style.left = `${posicionX}px`;
    flor.style.top = `${posicionY}px`;

    zonaJuego.appendChild(flor);

    requestAnimationFrame(function () {
      flor.classList.add("flor-visible");
    });
  }

  function llenarJardin() {
    for (let i = 0; i < 18; i++) {
      const flor = document.createElement("span");

      flor.className = "flor-decorativa";
      flor.textContent = i % 3 === 0 ? "🌼" : "🌷";

      flor.style.left = `${Math.random() * 92}%`;
      flor.style.top = `${8 + Math.random() * 82}%`;
      flor.style.animationDelay = `${i * 0.08}s`;

      zonaJuego.appendChild(flor);
    }
  }

  function terminarJuego() {
    document.querySelectorAll(".corazon").forEach(function (corazon) {
      corazon.remove();
    });

    llenarJardin();

    mensajeProgreso.textContent =
      "El jardín se llenó de flores con cada corazón que encontraste.";

    setTimeout(function () {
      mensajeFinal.classList.remove("oculta");

      mensajeFinal.scrollIntoView({
        behavior: "smooth",
        block: "center"
      });
    }, 900);
  }
});