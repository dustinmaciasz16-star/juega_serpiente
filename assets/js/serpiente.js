const canvas = document.getElementById("canvasJuego");
const ctx = canvas.getContext("2d");

const audioFondo =
  new Audio("assets/audio/fondo.wav");

  audioFondo.addEventListener(
    "canplaythrough",
    function(){
      console.log("audio fondo cargado");
    }
  );

  audioFondo.addEventListener(
    "error",
    function(){
      console.log("error audio fondo");
    }
  );

const audioJuego =
  new Audio("assets/audio/jugando.mp3");

const audioComer =
  new Audio("assets/audio/comer.mp3");

const audioMoneda =
  new Audio("assets/audio/moneda.mp3");

const audioMorir =
  new Audio("assets/audio/morir.mp3");

audioFondo.loop = true;
audioJuego.loop = true;

audioFondo.volume = 0.4;
audioJuego.volume = 0.4;

audioComer.volume = 0.7;
audioMoneda.volume = 0.7;
audioMorir.volume = 0.8;

const inventario = JSON.parse(localStorage.getItem("inventarioSnake"));
const equipado = JSON.parse(localStorage.getItem("equipadoSnake"));

let colorCabeza = "yellow";
let colorCuerpo = "red";
let coloresMulticolor = [];

if(equipado){

  if(equipado.cabeza){

    for(let i = 0; i < inventario.cabeza.length; i++){

      if(
        inventario.cabeza[i].nombre === equipado.cabeza
      ){
        colorCabeza = inventario.cabeza[i].color;
      }

    }

  }

  if(equipado.cuerpo){

    for(let i = 0; i < inventario.cuerpo.length; i++){

      if(
        inventario.cuerpo[i].nombre === equipado.cuerpo
      ){
        colorCuerpo = inventario.cuerpo[i].color;
      }

    }

  }

  if(equipado.combo){

    for(let i = 0; i < inventario.combos.length; i++){

      if(
        inventario.combos[i].nombre === equipado.combo
      ){

        colorCabeza =
          inventario.combos[i].cabeza;

        colorCuerpo =
          inventario.combos[i].cuerpo;

      }

    }

  }

  if(equipado.multicolor){

    for(let i = 0; i < inventario.multicolor.length; i++){

      if(
        inventario.multicolor[i].nombre === equipado.multicolor
      ){

        coloresMulticolor =
          inventario.multicolor[i].colores;

      }

    }

  }

}

const TAMANIO_CELDA = 25;

let puntos = 0;
let monedas =
  Number(
    localStorage.getItem("monedasSnake")
  ) || 0;
let monedasMapa = [];
let tiempoMoneda = null;
let direccionBloqueada = false;

let serpiente = [
  {x: 8, y: 10}
];

let direccionActual = "derecha";
let intervaloSerpiente;
let comio = false;
let velocidad = 250;
let gameOver = false;

let comida = {
  x: 0,
  y: 0
};

generarComida();
programarMoneda();
dibujarTodo();
document.getElementById(
  "monedas"
).innerText = monedas;

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
document.getElementById(
  "monedas"
).innerText = monedas;

function limpiarCanvas(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
}

function dibujarTablero(){

  ctx.strokeStyle = "#fff";

  for(let x = 0; x <= canvas.width; x += TAMANIO_CELDA){

    ctx.beginPath();
    ctx.moveTo(x,0);
    ctx.lineTo(x,canvas.height);
    ctx.stroke();

  }

  for(let y = 0; y <= canvas.height; y += TAMANIO_CELDA){

    ctx.beginPath();
    ctx.moveTo(0,y);
    ctx.lineTo(canvas.width,y);
    ctx.stroke();

  }

}

function pintarParte(lineaX,lineaY,color){

  const posicionRealX =
    lineaX * TAMANIO_CELDA;

  const posicionRealY =
    lineaY * TAMANIO_CELDA;

  ctx.fillStyle = color;

  ctx.fillRect(
    posicionRealX,
    posicionRealY,
    TAMANIO_CELDA,
    TAMANIO_CELDA
  );

  ctx.strokeStyle = "black";

  ctx.strokeRect(
    posicionRealX,
    posicionRealY,
    TAMANIO_CELDA,
    TAMANIO_CELDA
  );

}

function dibujarTodo(){

  limpiarCanvas();
  dibujarTablero();
  pintarComida();
  pintarMoneda();
  pintarSerpiente();

}

function pintarSerpiente(){

  for(let i = 0; i < serpiente.length; i++){

    const parte = serpiente[i];

    if(coloresMulticolor.length > 0){

      pintarParte(
        parte.x,
        parte.y,
        coloresMulticolor[
          i % coloresMulticolor.length
        ]
      );

    }

    else{

      if(i === 0){

        pintarParte(
          parte.x,
          parte.y,
          colorCabeza
        );

      }

      else{

        pintarParte(
          parte.x,
          parte.y,
          colorCuerpo
        );

      }

    }

  }

}

function pintarComida(){

  pintarParte(
    comida.x,
    comida.y,
    "lime"
  );

}

function pintarMoneda(){

  for(let i = 0; i < monedasMapa.length; i++){

    pintarParte(
      monedasMapa[i].x,
      monedasMapa[i].y,
      monedasMapa[i].color
    );

  }

}

function atraparMoneda(){

  const cabeza = serpiente[0];

  for(let i = 0; i < monedasMapa.length; i++){

    if(
      cabeza.x === monedasMapa[i].x &&
      cabeza.y === monedasMapa[i].y
    ){

      monedas += monedasMapa[i].valor;
      audioMoneda.currentTime = 0;
      audioMoneda.play();

      document.getElementById(
        "monedas"
      ).innerText = monedas;

      localStorage.setItem(
        "monedasSnake",
        monedas
      );

      monedasMapa.splice(i,1);

      programarMoneda();

      break;

    }

  }

}

function generarMoneda(){

  const columnas =
    canvas.width / TAMANIO_CELDA;

  const filas =
    canvas.height / TAMANIO_CELDA;

  let color;
  let valor;

  const probabilidad =
    Math.random() * 100;

  if(probabilidad < 80){

    color = "gold";
    valor = 5;

  }

  else if(probabilidad < 95){

    color = "orange";
    valor = 10;

  }

  else{

    color = "purple";
    valor = 15;

  }

  let posicionValida = false;
  let x;
  let y;

  while(posicionValida === false){

    x = Math.floor(Math.random() * columnas);

    y = Math.floor(Math.random() * filas);

    posicionValida = true;

    for(let i = 0; i < serpiente.length; i++){

      if(
        serpiente[i].x === x &&
        serpiente[i].y === y
      ){
        posicionValida = false;
      }

    }

    if(
      comida.x === x &&
      comida.y === y
    ){
      posicionValida = false;
    }

  }

  monedasMapa.push({
    x: x,
    y: y,
    color: color,
    valor: valor
  });

}

function programarMoneda(){

  clearTimeout(tiempoMoneda);

  const tiempoAleatorio =
    Math.floor(Math.random() * 30000) + 1000;

  tiempoMoneda = setTimeout(function(){

    if(gameOver === false){

      generarMoneda();
      dibujarTodo();

    }

  }, tiempoAleatorio);

}

function atraparComida(){

  const cabeza = serpiente[0];

  if(
    cabeza.x === comida.x &&
    cabeza.y === comida.y
  ){
    return true;
  }

  return false;

}

function generarComida(){

  const columnas =
    canvas.width / TAMANIO_CELDA;

  const filas =
    canvas.height / TAMANIO_CELDA;

  let posicionValida = false;

  while(posicionValida === false){

    comida.x =
      Math.floor(Math.random() * columnas);

    comida.y =
      Math.floor(Math.random() * filas);

    posicionValida = true;

    for(let i = 0; i < serpiente.length; i++){

      if(
        comida.x === serpiente[i].x &&
        comida.y === serpiente[i].y
      ){
        posicionValida = false;
      }

    }

  }

}

function moverSerpienteDireccion(x,y){

  const cabezaActual = serpiente[0];

  const nuevaCabeza = {
    x: cabezaActual.x + x,
    y: cabezaActual.y + y
  };

  serpiente.unshift(nuevaCabeza);

  if(comio === false){
    serpiente.pop();
  }

}

function cambiarDireccion(direccion){

  if(direccionBloqueada){
    return;
  }

  if(
    direccionActual === "derecha" &&
    direccion === "izquierda"
  ){
    return;
  }

  if(
    direccionActual === "izquierda" &&
    direccion === "derecha"
  ){
    return;
  }

  if(
    direccionActual === "arriba" &&
    direccion === "abajo"
  ){
    return;
  }

  if(
    direccionActual === "abajo" &&
    direccion === "arriba"
  ){
    return;
  }

  direccionActual = direccion;
  direccionBloqueada = true;

}

function moverSerpiente(){

  if(direccionActual === "derecha"){
    moverSerpienteDireccion(1,0);
  }

  else if(direccionActual === "izquierda"){
    moverSerpienteDireccion(-1,0);
  }

  else if(direccionActual === "arriba"){
    moverSerpienteDireccion(0,-1);
  }

  else if(direccionActual === "abajo"){
    moverSerpienteDireccion(0,1);
  }

  if(atraparComida()){

    puntos++;

    audioComer.currentTime = 0;
    audioComer.play();

    document.getElementById(
      "puntaje"
    ).innerText = puntos;

    comio = true;

    generarComida();

    if(serpiente.length === 400){

      alert("Ganaste");

      document.getElementById(
        "estado"
      ).innerText = "Ganaste";

      gameOver = true;

    }

    velocidad -= 10;

    clearInterval(intervaloSerpiente);

    iniciarJuego();

  }

  else{
    comio = false;
  }

  atraparMoneda();

  if(verificarBorde()){

    clearInterval(intervaloSerpiente);

    document.getElementById(
      "estado"
    ).innerText = "Game Over";

    gameOver = true;
    audioJuego.pause();
    audioJuego.currentTime = 0;

    audioMorir.play();

  }

  if(collicionCuerpo()){

    clearInterval(intervaloSerpiente);

    document.getElementById(
      "estado"
    ).innerText = "Game Over";

    gameOver = true;
    audioJuego.pause();
    audioJuego.currentTime = 0;

    audioMorir.play();

  }

  dibujarTodo();

  direccionBloqueada = false;

}

function verificarBorde(){

  const cabeza = serpiente[0];

  const totalColumnas =
    canvas.width / TAMANIO_CELDA;

  const totalFila =
    canvas.height / TAMANIO_CELDA;

  if(cabeza.x < 0){
    return true;
  }

  if(cabeza.x >= totalColumnas){
    return true;
  }

  if(cabeza.y < 0){
    return true;
  }

  if(cabeza.y >= totalFila){
    return true;
  }

  return false;

}

function collicionCuerpo(){

  const cabeza = serpiente[0];

  for(let i = 1; i < serpiente.length; i++){

    if(
      cabeza.x === serpiente[i].x &&
      cabeza.y === serpiente[i].y
    ){
      return true;
    }

  }

  return false;

}

document.addEventListener(
  "keydown",
  function(event){

    if(
      event.key === "ArrowUp" ||
      event.key === "ArrowDown" ||
      event.key === "ArrowLeft" ||
      event.key === "ArrowRight"
    ){
      event.preventDefault();
    }

    if(event.key === "ArrowUp"){
      cambiarDireccion("arriba");
    }

    else if(event.key === "ArrowDown"){
      cambiarDireccion("abajo");
    }

    else if(event.key === "ArrowLeft"){
      cambiarDireccion("izquierda");
    }

    else if(event.key === "ArrowRight"){
      cambiarDireccion("derecha");
    }

  }
);

function iniciarJuego(){
  
  if(gameOver === true){
    return;
  }

  audioFondo.pause();
  audioFondo.currentTime = 0;

  audioJuego.currentTime = 0;
  audioJuego.play();

  clearInterval(intervaloSerpiente);

  intervaloSerpiente =
    setInterval(
      moverSerpiente,
      velocidad
    );

}

function pausarJuego(){
  clearInterval(intervaloSerpiente);
}

function reiniciarJuego(){

  clearInterval(intervaloSerpiente);

  puntos = 0;
  velocidad = 250;
  monedasMapa = [];

  document.getElementById(
    "puntaje"
  ).innerText = puntos;

  document.getElementById(
    "estado"
  ).innerText = "Listo";

  serpiente = [
    {x: 8, y: 10}
  ];

  direccionActual = "derecha";
  gameOver = false;

  generarComida();

  clearTimeout(tiempoMoneda);

  programarMoneda();

  audioMorir.pause();
  audioMorir.currentTime = 0;

  audioJuego.pause();
  audioJuego.currentTime = 0;

  audioFondo.play();

  dibujarTodo();

}