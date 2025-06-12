$(document).ready(function () {
  const plantaCrear = `<div class="plantaTarjeta">
                          <form method="post" action="/crearPlanta">
                            <p>Nombre de la planta: 
                                <input name="nombrePlanta" type="text" placeholder="Nombre de la planta [EJ: Planta1]">
                            </p>
                            <p>Tipo de la planta: 
                                  <select name="tipoPlanta">
                                    <option value="1">Alocasia</option>
                                    <option value="2">Costilla de Adán</option>
                                    <option value="3">Aloe Vera</option>
                                    <option value="4">Lirio</option>
                                    <option value="5">Lengua de suegra</option>
                                  </select>
                            </p>
                            <p>Frencuencia de riego de la planta: 
                                <input name="frecuenciaRiego" type="number" placeholder="Frencuencia en días [EJ: 5]">
                            </p>
                            <button>Crear Planta</button>
                          </form>
                        </div>`;

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
        datos.plantas.forEach((planta) => {
          $("#contenido").prepend(`<div class="plantaTarjeta">
                    <div class="plantaBotonera">
                    </div>
                    <div class="plantaContenido">
                      <img class="imgPlanta">
                      <p class="plantaNombre">${planta.nombre}</p>
                      <p class="plantaTipo"> ${planta.tipo}</p>
                      <p class="plantaFrecuenciaRiego">Regar cada: ${planta.frecuenciaRiego}</p>
                      <p class="plantaUltimoRiego"></p>
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
