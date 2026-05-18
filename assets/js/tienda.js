const skinsCabeza = [

  {
    nombre: "Negro",
    color: "black",
    precio: 10
  },

  {
    nombre: "Azul",
    color: "blue",
    precio: 20
  },

  {
    nombre: "Verde",
    color: "lime",
    precio: 30
  }

];

const skinsCuerpo = [

  {
    nombre: "Blanco",
    color: "white",
    precio: 10
  },

  {
    nombre: "Morado",
    color: "purple",
    precio: 25
  },

  {
    nombre: "Naranja",
    color: "orange",
    precio: 35
  }

];

const skinsCombo = [

  {
    nombre: "Sakura",
    cabeza: "white",
    cuerpo: "pink",
    precio: 50
  },

  {
    nombre: "Veneno",
    cabeza: "lime",
    cuerpo: "purple",
    precio: 70
  },

  {
    nombre: "Hielo",
    cabeza: "cyan",
    cuerpo: "blue",
    precio: 90
  }

];

const skinsMulticolor = [

  {
    nombre: "Arcoiris",
    colores: [
      "red",
      "orange",
      "yellow",
      "green",
      "blue",
      "purple"
    ],
    precio: 150
  }

];

function cargarTiendaCabeza(){

  const contenedor =
    document.getElementById(
      "tiendaCabeza"
    );

  for(let i = 0; i < skinsCabeza.length; i++){

    const skin = skinsCabeza[i];

    contenedor.innerHTML += `

      <div class="card">

        <canvas
          id="canvasCabeza${i}"
          width="120"
          height="80"
        ></canvas>

        <h3>${skin.nombre}</h3>

        <p>${skin.precio} monedas</p>

        <button
          class="btn-comprar"
          onclick='comprarSkin(
            "cabeza",
            ${JSON.stringify(skin)}
          )'
        >
          Comprar
        </button>

      </div>

    `;

    setTimeout(function(){

      const canvas =
        document.getElementById(
          `canvasCabeza${i}`
        );

      const ctx =
        canvas.getContext("2d");

      ctx.fillStyle = skin.color;

      ctx.fillRect(
        40,
        20,
        40,
        40
      );

      ctx.strokeStyle = "black";

      ctx.strokeRect(
        40,
        20,
        40,
        40
      );

    },0);

  }

}

function cargarTiendaCuerpo(){

  const contenedor =
    document.getElementById(
      "tiendaCuerpo"
    );

  for(let i = 0; i < skinsCuerpo.length; i++){

    const skin = skinsCuerpo[i];

    contenedor.innerHTML += `

      <div class="card">

        <canvas
          id="canvasCuerpo${i}"
          width="120"
          height="80"
        ></canvas>

        <h3>${skin.nombre}</h3>

        <p>${skin.precio} monedas</p>

        <button
          class="btn-comprar"
          onclick='comprarSkin(
            "cuerpo",
            ${JSON.stringify(skin)}
          )'
        >
          Comprar
        </button>

      </div>

    `;

    setTimeout(function(){

      const canvas =
        document.getElementById(
          `canvasCuerpo${i}`
        );

      const ctx =
        canvas.getContext("2d");

      ctx.fillStyle = skin.color;

      ctx.fillRect(
        40,
        20,
        40,
        40
      );

      ctx.strokeStyle = "black";

      ctx.strokeRect(
        40,
        20,
        40,
        40
      );

    },0);

  }

}

function cargarTiendaCombo(){

  const contenedor =
    document.getElementById(
      "tiendaCombo"
    );

  for(let i = 0; i < skinsCombo.length; i++){

    const skin = skinsCombo[i];

    contenedor.innerHTML += `

      <div class="card">

        <canvas
          id="canvasCombo${i}"
          width="120"
          height="80"
        ></canvas>

        <h3>${skin.nombre}</h3>

        <p>${skin.precio} monedas</p>

        <button
          class="btn-comprar"
          onclick='comprarSkin(
            "combos",
            ${JSON.stringify(skin)}
          )'
        >
          Comprar
        </button>

      </div>

    `;

    setTimeout(function(){

      const canvas =
        document.getElementById(
          `canvasCombo${i}`
        );

      const ctx =
        canvas.getContext("2d");

      ctx.fillStyle = skin.cabeza;

      ctx.fillRect(
        25,
        20,
        30,
        30
      );

      ctx.strokeStyle = "black";

      ctx.strokeRect(
        25,
        20,
        30,
        30
      );

      ctx.fillStyle = skin.cuerpo;

      ctx.fillRect(
        65,
        20,
        30,
        30
      );

      ctx.strokeRect(
        65,
        20,
        30,
        30
      );

    },0);

  }

}

function cargarTiendaMulticolor(){

  const contenedor =
    document.getElementById(
      "tiendaMulticolor"
    );

  for(let i = 0; i < skinsMulticolor.length; i++){

    const skin = skinsMulticolor[i];

    contenedor.innerHTML += `

      <div class="card">

        <canvas
          id="canvasMulti${i}"
          width="140"
          height="80"
        ></canvas>

        <h3>${skin.nombre}</h3>

        <p>${skin.precio} monedas</p>

        <button
          class="btn-comprar"
          onclick='comprarSkin(
            "multicolor",
            ${JSON.stringify(skin)}
          )'
        >
          Comprar
        </button>

      </div>

    `;

    setTimeout(function(){

      const canvas =
        document.getElementById(
          `canvasMulti${i}`
        );

      const ctx =
        canvas.getContext("2d");

      for(
        let j = 0;
        j < skin.colores.length;
        j++
      ){

        ctx.fillStyle =
          skin.colores[j];

        ctx.fillRect(
          10 + (j * 20),
          25,
          18,
          18
        );

        ctx.strokeStyle = "black";

        ctx.strokeRect(
          10 + (j * 20),
          25,
          18,
          18
        );

      }

    },0);

  }

}

cargarTiendaCabeza();
cargarTiendaCuerpo();
cargarTiendaCombo();
cargarTiendaMulticolor();