// Imports
const express = require("express");
const path = require("path");
const app = express();
const mysql = require("mysql2/promise");

// Middleware
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Iniciar servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log("Iniciando servidor...");
  console.log(`Servidor iniciado en: http://localhost:${PORT}`);
});

//Gestor de la planta
app.post("/crearPlanta", (req, res) => {
  var nombrePlanta = req.body.nombrePlanta;
  var frecuenciaRiego = req.body.frecuenciaRiego;
  var tipoPlanta = req.body.tipoPlanta;

  console.log("Datos recibidos: ", {
    nombrePlanta,
    frecuenciaRiego,
    tipoPlanta,
  });

  Planta.crearPlanta(nombrePlanta, tipoPlanta, frecuenciaRiego);
});

let conexion;
let host = "localhost";
let usuario = "root";
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

class Planta {
  constructor(nombre, tipo, frecuenciaRiego, ultimoRiego) {
    this.nombre = nombre;
    this.tipo = tipo;
    this.frecuenciaRiego = frecuenciaRiego;
    this.ultimoRiego = ultimoRiego;
  }

  static ultimoRiego(planta) {
    return;
  }

  static necesitaRiego(planta) {
    return;
  }

  static insertarPlantaSQL(planta) {
    generarConexion();
    let consulta =
      "INSERT INTO planta VALUES (`${planta.nombre}`, `${planta.tipo}`, planta.frecuenciaRiego, planta.ultimoRiego)";
    conexion.execute(consulta);
  }

  static crearPlanta(nombre, tipo, frecuenciaRiego) {
    let planta = new Planta(nombre, tipo, frecuenciaRiego, null);
    console.log(
      `\nSe ha añadido la planta: ${planta.nombre} de tipo: ${planta.tipo}\n`
    );
    this.insertarPlantaSQL(planta);
  }
}
