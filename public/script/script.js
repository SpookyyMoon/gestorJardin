$(document).ready(function () {

  const plantaCrear = `<div class="plantaTarjeta">
                            <p>Nombre de la planta: 
                                <input>
                            </p>
                            <p>Tipo de la planta: 
                                <input>
                            </p>
                            <p>Frencuencia de riego de la planta: 
                                <input>
                            </p>
                            <button>Crear Planta</button>
                        </div>`;

  $(".plantaAdd").click(function () {
    $("#contenido").empty();
    $("#contenido").append(plantaCrear);
  });

  

});
