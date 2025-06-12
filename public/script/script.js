$(document).ready(function () {
  // Creador de plantas
  const plantaCrear = `<div class="plantaTarjeta">
                          <form method="post" action="/crearPlanta">
                            <p>Nombre de la planta: 
                                <input name="nombrePlanta" type="text" placeholder="Nombre de la planta [EJ: Planta1]">
                            </p>
                            <p>Tipo de la planta: 
                                  <select name="tipoPlanta">
                                    <option value="1">Alocasia</option>
                                    <option value="2">Costilla de Adán</option>
                                    <option value="3">Lirio</option>
                                    <option value="4">Lengua de suegra</option>
                                  </select>
                            </p>
                            <p>Frencuencia de riego de la planta: 
                                <input name="frecuenciaRiego" type="number" placeholder="Frencuencia en días [EJ: 5]">
                            </p>
                            <button>Crear Planta</button>
                          </form>
                        </div>`;

  // Acción de añadir planta
  $(".plantaAdd").click(function () {
    $("#contenido").empty();
    $("#contenido").append(plantaCrear);
    cargarPlantas();
  });

  // Función para cargar y mostrar plantas
  async function cargarPlantas() {
    try {
      const response = await fetch("/obtenerPlantas");
      const datos = await response.json();

      if (datos.success) {
        $("#contenido").empty();
        $("#contenido").append(plantaCrear);
        datos.plantas.forEach((planta) => {
          let imagenPlanta;
          switch (planta.tipo) {
            case "1":
              planta.tipo = "Alocasia";
              imagenPlanta = "./images/1.png";
              break;
            case "2":
              planta.tipo = "Costilla de Adán";
              imagenPlanta = "./images/2.png";
              break;
            case "3":
              planta.tipo = "Lirio";
              imagenPlanta = "./images/3.png";
              break;
            case "4":
              planta.tipo = "Lengua de suegra";
              imagenPlanta = "./images/4.png";
              break;
          }
          if (planta.ultimoRiego == null) {
            planta.ultimoRiego = "No registrado";
            planta.proximoRiego = `Regar en ${planta.frecuenciaRiego} días`;
          }
          $("#contenido").prepend(`<div class="plantaTarjeta">
                    <div class="plantaBotonera">
                    </div>
                    <div class="plantaContenido">
                      <img class="imgPlanta" src=${imagenPlanta}>
                      <p class="plantaNombre">${planta.nombre}</p>
                      <p class="plantaTipo"> ${planta.tipo}</p>
                      <p class="plantaFrecuenciaRiego">Regar cada: ${planta.frecuenciaRiego} días</p>
                      <p class="plantaUltimoRiego">Último riego: ${planta.ultimoRiego}</p>
                      <p class="proximoRiego">Próximo riego: ${planta.proximoRiego}</P>
                    </div>
                  </div>`);
        });
      }
    } catch (error) {
      console.error("¡No se han podido cargar las plantas!");
    }
  }

  cargarPlantas();
});

//Plantas: Alocasia, Costilla de Adán, Aloe Vera, Lirio, Lengua de suegra
