const html = document.querySelector("html");
const botonEnfoque = document.querySelector(".app__card-button--enfoque");
const botonCorto = document.querySelector(".app__card-button--corto");
const botonLargo = document.querySelector(".app__card-button--largo");
const banner = document.querySelector(".app__image");
const titulo = document.querySelector(".app__title");
const botones = document.querySelectorAll(".app__card-button");
const inputMusicaEnfoque = document.querySelector("#alternar-musica");
const musica = new Audio("./sonidos/luna-rise-part-one.mp3");
musica.loop = true;
const btnIniciarPausar = document.querySelector("#start-pause");
const txtIniciarPausar = document.querySelector("#start-pause span");
const iconoIniciarPausar = document.querySelector(
  ".app__card-primary-button-icon"
);
const tiempoEnPantalla = document.querySelector("#timer");
const audioPlay = new Audio("./sonidos/play.wav");
const audioPausa = new Audio("./sonidos/pause.mp3");
const audioTiempoFinalizado = new Audio("./sonidos/beep.mp3");

const tiempoInicial = 1500;
let tiempoTranscurridoEnSegundos = tiempoInicial;
let idIntervalo = null;

inputMusicaEnfoque.addEventListener("change", () => {
  if (musica.readyState >= 2) {
    musica.paused ? musica.play() : musica.pause();
  }
});

botones.forEach((btn) =>
  btn.addEventListener("click", () => {
    botones.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
  })
);

function cambiarContexto(contexto) {
  html.setAttribute("data-contexto", contexto);
  banner.setAttribute("src", `/imagenes/${contexto}.png`);

  switch (contexto) {
    case "enfoque":
      titulo.innerHTML = `Optimiza tu productividad,<br />
          <strong class="app__title-strong">sumérgete en lo que importa.</strong>`;
      tiempoTranscurridoEnSegundos = 1500;
    case "descanso-corto":
      titulo.innerHTML = `¿Qué tal tomar un respiro?<br />
          <strong class="app__title-strong">Haz una pausa corta.</strong>`;
      tiempoTranscurridoEnSegundos = 300;
      break;
    case "descanso-largo":
      titulo.innerHTML = `Hora de volver a la superficie,<br />
          <strong class="app__title-strong">Haz una pausa larga.</strong>`;
      tiempoTranscurridoEnSegundos = 900;
      break;
  }
  reiniciar();
  mostrarTiempo();
}

botonEnfoque.addEventListener("click", () => cambiarContexto("enfoque"));
botonCorto.addEventListener("click", () => cambiarContexto("descanso-corto"));
botonLargo.addEventListener("click", () => cambiarContexto("descanso-largo"));

function mostrarTiempo() {
  const tiempo = new Date(tiempoTranscurridoEnSegundos * 1000);
  const tiempoFormateado = tiempo.toLocaleTimeString("es-ES", {
    minute: "2-digit",
    second: "2-digit",
  });
  tiempoEnPantalla.innerHTML = tiempoFormateado;
}

function cuentaRegresiva() {
  if (tiempoTranscurridoEnSegundos <= 0) {
    audioTiempoFinalizado.play();
    document.querySelector("#mensajeFinal").textContent = "¡Tiempo terminado!";
    reiniciar();
    return;
  }
  tiempoTranscurridoEnSegundos -= 1;
  mostrarTiempo();
}

function IniciarPausar() {
  if (idIntervalo !== null) {
    audioPausa.play();
    reiniciar();
    return;
  }
  audioPlay.play();
  clearInterval(idIntervalo);
  idIntervalo = setInterval(cuentaRegresiva, 1000);
  txtIniciarPausar.textContent = "Pausar";
  iconoIniciarPausar.setAttribute("src", "/imagenes/pause.png");
}

function reiniciar() {
  clearInterval(idIntervalo);
  mostrarTiempo(); // Solo actualiza la pantalla, sin resetear el tiempo
  txtIniciarPausar.textContent = "Comenzar";
  iconoIniciarPausar.setAttribute("src", "/imagenes/play_arrow.png");
  idIntervalo = null;
}

btnIniciarPausar.addEventListener("click", IniciarPausar);
mostrarTiempo();
