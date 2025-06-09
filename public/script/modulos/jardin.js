class Jardin {
  static addPlanta(planta) {}

  static mostrarPlantas() {
    let contadorPlantas = 0;
    listaPlantaJson.forEach((planta) => {
      contador++;
      console.log(`\nPlanta #${contadorPlantas}`);
      console.log(`  Nombre: ${planta.nombre}`);
      console.log(`  Tipo: ${planta.tipo}`);
    });
  }
}

module.exports = Jardin;
