let monedasJugador =
  Number(
    localStorage.getItem("monedasSnake")
  ) || 0;

const inventario =
  JSON.parse(
    localStorage.getItem("inventarioSnake")
  ) || {
    cabeza: [],
    cuerpo: [],
    combos: [],
    multicolor: []
  };

function guardarInventario(){

  localStorage.setItem(
    "inventarioSnake",
    JSON.stringify(inventario)
  );

}

function guardarMonedas(){

  localStorage.setItem(
    "monedasSnake",
    monedasJugador
  );

}

function yaComprado(tipo,nombre){

  for(let i = 0; i < inventario[tipo].length; i++){

    if(
      inventario[tipo][i].nombre === nombre
    ){
      return true;
    }

  }

  return false;

}

function comprarSkin(tipo,skin){

  if(yaComprado(tipo,skin.nombre)){

    alert("Ya compraste esta skin");
    return;

  }

  if(monedasJugador < skin.precio){

    alert("No tienes suficientes monedas");
    return;

  }

  monedasJugador -= skin.precio;

  inventario[tipo].push(skin);

  guardarInventario();

  guardarMonedas();

  actualizarBotones();

  actualizarMonedas();

  alert("Compra realizada");

}

function actualizarBotones(){

  const botones =
    document.querySelectorAll(".btn-comprar");

  botones.forEach(function(boton){

    const tipo =
      boton.dataset.tipo;

    const nombre =
      boton.dataset.nombre;

    if(
      yaComprado(tipo,nombre)
    ){

      boton.innerText = "Comprado";

      boton.disabled = true;

      boton.style.opacity = "0.6";

    }

  });

}

function actualizarMonedas(){

  const textoMonedas =
    document.getElementById("monedasJugador");

  if(textoMonedas){

    textoMonedas.innerText =
      monedasJugador;

  }

}

actualizarBotones();

actualizarMonedas();