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

  const planta = `<div>
                    <div class="plantaBotonera">
                    </div>
                    <div class="plantaContenido">
                      <img class="imgPlanta">
                      <p class="plantaNombre"></p>
                      <p class="plantaTipo"></p>
                      <p class="plantaFrecuenciaRiego"></p>
                      <p class="plantaUltimoRiego"></p>
                    </div>
                  </div>`;

  $(".plantaAdd").click(function () {
    $("#contenido").empty();
    $("#contenido").append(plantaCrear);
  });
});

//Plantas: Alocasia, Costilla de Adán, Aloe Vera, Lirio, Lengua de suegra
