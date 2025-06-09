const Jardin = require("./jardin");

class Planta {
  constructor(nombre, tipo, frecuenciaRiego, ultimoRiego) {
    this.nombre = nombre;
    this.tipo = tipo;
    this.frecuenciaRiego = frecuenciaRiego;
    this.ultimoRiego = ultimoRiego;
  }

  ultimoRiego(planta) {
    return;
  }

  necesitaRiego(planta) {
    return;
  }

  static crearPlanta(nombre, tipo, frecuenciaRiego) {
    let planta = new Planta(nombre, tipo, frecuenciaRiego, null);
    Jardin.addPlanta(planta);
    console.log(
      `\nSe ha añadido la planta: ${planta.nombre} de tipo: ${planta.tipo}\n`
    );
  }
}

module.exports = Planta;
