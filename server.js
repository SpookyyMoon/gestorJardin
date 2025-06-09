// Imports
const express = require('express');
const app = express();

// Middleware
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

// Iniciar servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log("Iniciando servidor...");
    console.log(`Servidor iniciado en: http://localhost:${PORT}`);
});


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

  crearPlanta(nombre, tipo, frecuenciaRiego) {
    let planta = new Planta(nombre, tipo, frecuenciaRiego, null);
    console.log(
      `\nSe ha añadido la planta: ${planta.nombre} de tipo: ${planta.tipo}\n`
    );
  }
}

let conexion;
let host = "";
let usuario = "";
let contrasena = "";

async function generarConexion() {
  conexion = await mysql.createConnection({
    host: host,
    user: usuario,
    password: contrasena,
    database: "gestorJardin",
  });
}

async function conexionSQL() {
  try {
    await generarConexion();
    conexion.connect();
    console.log("\nConexión a MySQL establecida correctamente");
  } catch (error) {
    console.error("\nError al conectar a MySQL:", error);
  }
}
