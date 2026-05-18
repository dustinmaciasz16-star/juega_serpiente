let inventario = {
  cabeza: [],
  cuerpo: [],
  combos: [],
  multicolor: []
};

let equipado = {
  cabeza: null,
  cuerpo: null,
  combo: null,
  multicolor: null
};

const inventarioGuardado =
  localStorage.getItem("inventarioSnake");

if(inventarioGuardado){
  inventario =
    JSON.parse(inventarioGuardado);
}

const equipadoGuardado =
  localStorage.getItem("equipadoSnake");

if(equipadoGuardado){
  equipado =
    JSON.parse(equipadoGuardado);
}

if(
  inventario.cabeza.length === 0 &&
  inventario.cuerpo.length === 0 &&
  inventario.combos.length === 0 &&
  inventario.multicolor.length === 0
){

  inventario.cabeza.push({
    nombre: "Cabeza Básica",
    color: "yellow"
  });

  inventario.cuerpo.push({
    nombre: "Cuerpo Básico",
    color: "red"
  });

  inventario.combos.push({
    nombre: "Fuego",
    cabeza: "orange",
    cuerpo: "purple"
  });

  inventario.multicolor.push({
    nombre: "RGB",
    colores: ["red","green","blue"]
  });

  localStorage.setItem(
    "inventarioSnake",
    JSON.stringify(inventario)
  );
}

function equiparSkin(tipo,nombre){
  let equipado =
    JSON.parse(
      localStorage.getItem("equipadoSnake")
    ) || {};
  // SI EQUIPA CABEZA
  if(tipo === "cabeza"){
    delete equipado.combo;
    delete equipado.multicolor;
    equipado.cabeza = nombre;
  }
  // SI EQUIPA CUERPO
  else if(tipo === "cuerpo"){
    delete equipado.combo;
    delete equipado.multicolor;
    equipado.cuerpo = nombre;

  }
  // SI EQUIPA COMBO
  else if(tipo === "combo"){
    delete equipado.cabeza;
    delete equipado.cuerpo;
    delete equipado.multicolor;
    equipado.combo = nombre;
  }
  // SI EQUIPA MULTICOLOR
  else if(tipo === "multicolor"){
    delete equipado.cabeza;
    delete equipado.cuerpo;
    delete equipado.combo;
    equipado.multicolor = nombre;
  }
  localStorage.setItem(
    "equipadoSnake",
    JSON.stringify(equipado)
  );
  renderInventario();
}

function cargarInventarioCabeza(){

  const contenedor =
    document.getElementById("inventarioCabeza");

  contenedor.innerHTML = "";

  for(let i = 0; i < inventario.cabeza.length; i++){

    const skin = inventario.cabeza[i];

    contenedor.innerHTML += `
      <div class="card">

        <canvas
          id="canvasCabeza${i}"
          width="120"
          height="80"
        ></canvas>

        <h3>${skin.nombre}</h3>

        <button

          onclick="
            equiparSkin(
              'cabeza',
              '${skin.nombre}'
            )
          "

          class="
            ${
              equipado.cabeza === skin.nombre
              ? 'btn-equipado'
              : 'btn-equipar'
            }
          "

        >

          ${
            equipado.cabeza === skin.nombre
            ? 'Equipado'
            : 'Equipar'
          }

        </button>

      </div>
    `;

    setTimeout(function(){

      const canvas =
        document.getElementById(`canvasCabeza${i}`);

      const ctx = canvas.getContext("2d");

      ctx.fillStyle = skin.color;
      ctx.fillRect(40,20,40,40);

      ctx.strokeStyle = "black";
      ctx.strokeRect(40,20,40,40);

    },0);

  }

}

function cargarInventarioCuerpo(){

  const contenedor =
    document.getElementById("inventarioCuerpo");

  contenedor.innerHTML = "";

  for(let i = 0; i < inventario.cuerpo.length; i++){

    const skin = inventario.cuerpo[i];

    contenedor.innerHTML += `
      <div class="card">

        <canvas
          id="canvasCuerpo${i}"
          width="120"
          height="80"
        ></canvas>

        <h3>${skin.nombre}</h3>

        <button

          onclick="
            equiparSkin(
              'cuerpo',
              '${skin.nombre}'
            )
          "

          class="
            ${
              equipado.cuerpo === skin.nombre
              ? 'btn-equipado'
              : 'btn-equipar'
            }
          "

        >

          ${
            equipado.cuerpo === skin.nombre
            ? 'Equipado'
            : 'Equipar'
          }

        </button>

      </div>
    `;

    setTimeout(function(){

      const canvas =
        document.getElementById(`canvasCuerpo${i}`);

      const ctx = canvas.getContext("2d");

      ctx.fillStyle = skin.color;
      ctx.fillRect(40,20,40,40);

      ctx.strokeStyle = "black";
      ctx.strokeRect(40,20,40,40);

    },0);

  }

}

function cargarInventarioCombo(){

  const contenedor =
    document.getElementById("inventarioCombo");

  contenedor.innerHTML = "";

  for(let i = 0; i < inventario.combos.length; i++){

    const skin = inventario.combos[i];

    contenedor.innerHTML += `
      <div class="card">

        <canvas
          id="canvasCombo${i}"
          width="120"
          height="80"
        ></canvas>

        <h3>${skin.nombre}</h3>

        <button

          onclick="
            equiparSkin(
              'combo',
              '${skin.nombre}'
            )
          "

          class="
            ${
              equipado.combo === skin.nombre
              ? 'btn-equipado'
              : 'btn-equipar'
            }
          "

        >

          ${
            equipado.combo === skin.nombre
            ? 'Equipado'
            : 'Equipar'
          }

        </button>

      </div>
    `;

    setTimeout(function(){

      const canvas =
        document.getElementById(`canvasCombo${i}`);

      const ctx = canvas.getContext("2d");

      ctx.fillStyle = skin.cabeza;
      ctx.fillRect(25,20,30,30);

      ctx.strokeStyle = "black";
      ctx.strokeRect(25,20,30,30);

      ctx.fillStyle = skin.cuerpo;
      ctx.fillRect(65,20,30,30);

      ctx.strokeRect(65,20,30,30);

    },0);

  }

}

function cargarInventarioMulticolor(){

  const contenedor =
    document.getElementById("inventarioMulticolor");

  contenedor.innerHTML = "";

  for(let i = 0; i < inventario.multicolor.length; i++){

    const skin = inventario.multicolor[i];

    contenedor.innerHTML += `
      <div class="card">

        <canvas
          id="canvasMulti${i}"
          width="140"
          height="80"
        ></canvas>

        <h3>${skin.nombre}</h3>

        <button

          onclick="
            equiparSkin(
              'multicolor',
              '${skin.nombre}'
            )
          "

          class="
            ${
              equipado.multicolor === skin.nombre
              ? 'btn-equipado'
              : 'btn-equipar'
            }
          "

        >

          ${
            equipado.multicolor === skin.nombre
            ? 'Equipado'
            : 'Equipar'
          }

        </button>

      </div>
    `;

    setTimeout(function(){

      const canvas =
        document.getElementById(`canvasMulti${i}`);

      const ctx = canvas.getContext("2d");

      for(let j = 0; j < skin.colores.length; j++){

        ctx.fillStyle = skin.colores[j];

        ctx.fillRect(
          35 + (j * 25),
          25,
          20,
          20
        );

        ctx.strokeStyle = "black";

        ctx.strokeRect(
          35 + (j * 25),
          25,
          20,
          20
        );

      }

    },0);

  }

}

cargarInventarioCabeza();
cargarInventarioCuerpo();
cargarInventarioCombo();
cargarInventarioMulticolor();