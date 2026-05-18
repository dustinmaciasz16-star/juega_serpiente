const audioFondo =
  new Audio("assets/audio/fondo.wav");

audioFondo.loop = true;
audioFondo.volume = 0.4;

document.addEventListener(
  "click",
  iniciarAudio,
  { once: true }
);

document.addEventListener(
  "keydown",
  iniciarAudio,
  { once: true }
);

function iniciarAudio(){

  audioFondo.play();

}