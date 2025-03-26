const html = document.querySelector("html");
const botonEnfoque = document.querySelector(".app__card-button--enfoque");
const botonCorto = document.querySelector(".app__card-button--corto");
const botonLargo = document.querySelector(".app__card-button--largo");
const banner = document.querySelector(".app__image");
const titulo = document.querySelector(".app__title");
const botones = document.querySelector(".app__card-button");
const inputMusicaEnfoque = document.querySelector("#alternar-musica");
const musica = new Audio("./sonidos/luna-rise-part-one.mp3");
musica.loop = true;

function cambiarContexto(contexto) {
  html.setAttribute("data-contexto", contexto);
  banner.setAttribute(`src`, `/imagenes/${contexto}.png`);

  switch (contexto) {
    case "enfoque":
      titulo.innerHTML = `Optimiza tu productividad,<br />
          <strong class="app__title-strong"
            >sumérgete en lo que importa.</strong
          >`;
      break;
    case "descanso-corto":
      titulo.innerHTML = `Que tal tomar un respiro?,<br />
          <strong class="app__title-strong"
            >Haz una pausa corta!.</strong
          >`;
      break;
    case "descanso-largo":
      titulo.innerHTML = `Hora de volver a la superficie,<br />
          <strong class="app__title-strong"
            >Haz una pausa larga!.</strong
          >`;
      break;
  }
}
botonEnfoque.addEventListener("click", () => {
  cambiarContexto("enfoque");
});
botonCorto.addEventListener("click", () => {
  cambiarContexto("descanso-corto");
});
botonLargo.addEventListener("click", () => {
  cambiarContexto("descanso-largo");
});
