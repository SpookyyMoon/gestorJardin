// Imports
const express = require("express");
const path = require("path");
const app = express();
const mysql = require("mysql2/promise");
const { DateTime } = require("luxon");

// Middleware
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Datos db
const host = "";
const usuario = "";
const pass = "";
const db = "";

// Iniciar servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log("Iniciando servidor...");
  console.log(`Servidor iniciado en: http://localhost:${PORT}`);
});

// Gestor de la planta
app.post("/crearPlanta", async (req, res) => {
  var nombrePlanta = req.body.nombrePlanta;
  var frecuenciaRiego = req.body.frecuenciaRiego;
  var tipoPlanta = req.body.tipoPlanta;

  console.log("Datos recibidos: ", {
    nombrePlanta,
    frecuenciaRiego,
    tipoPlanta,
  });

  await Planta.crearPlanta(nombrePlanta, tipoPlanta, frecuenciaRiego);
  res.redirect("/");
});

// Envia las plantas desde express hasta el front
app.get("/obtenerPlantas", async (req, res) => {
  const plantas = await Planta.obtenerPlantas();
  res.status(200).json({ success: true, plantas });
});

// Recibe la acción de regar planta
app.post("/regarPlanta", async (req, res) => {
  conexion = await mysql.createConnection({
    host: host,
    user: usuario,
    password: pass,
    database: db,
  });

  let { nombre } = req.body;
  let [plantas] = await conexion.execute(
    "SELECT * FROM plantas WHERE nombre = ?",
    [nombre]
  );
  let planta = plantas[0];
  let plantaID = planta.id;
  let frecuenciaRiego = planta.frecuenciaRiego;
  await Planta.registrarRiego(plantaID, frecuenciaRiego);
  res.status(200).json({ success: true });
});

// Recibe la acción de arrancar planta
app.post("/arrancarPlanta", async (req, res) => {
  conexion = await mysql.createConnection({
    host: host,
    user: usuario,
    password: pass,
    database: db,
  });

  let { nombre } = req.body;
  let [plantas] = await conexion.execute(
    "SELECT * FROM plantas WHERE nombre = ?",
    [nombre]
  );
  let planta = plantas[0];
  let plantaID = planta.id;
  await conexion.execute("DELETE FROM plantas WHERE id = ?", [plantaID]);

  res.status(200).json({ success: true });
});

// Clase planta
class Planta {
  constructor(nombre, tipo, frecuenciaRiego, ultimoRiego, proximoRiego) {
    this.nombre = nombre;
    this.tipo = tipo;
    this.frecuenciaRiego = frecuenciaRiego;
    this.ultimoRiego = ultimoRiego;
    this.proximoRiego = proximoRiego;
  }

  // Inserta el objeto planta en la base de datos (Genera la conexión a la base de datos)
  static async insertarPlantaSQL(planta) {
    let conexion;
    try {
      conexion = await mysql.createConnection({
        host: host,
        user: usuario,
        password: pass,
        database: db,
      });
      const [resultado] = await conexion.execute(
        "INSERT INTO plantas (nombre, tipo, frecuenciaRiego) VALUES (?, ?, ?)",
        [planta.nombre, planta.tipo, planta.frecuenciaRiego]
      );
      return resultado;
    } finally {
      if (conexion) await conexion.end(); // Cierra la conexión SQL
    }
  }

  // Carga todas las plantas desde la base de datos
  static async obtenerPlantas() {
    let conexion;
    try {
      conexion = await mysql.createConnection({
        host: host,
        user: usuario,
        password: pass,
        database: db,
      });
      const [plantas] = await conexion.execute("SELECT * FROM plantas");
      return plantas;
    } finally {
      if (conexion) await conexion.end(); // Cierra la conexión SQL
    }
  }

  // Crea el objeto planta a traves de los datos recibidos por el formulario
  static async crearPlanta(nombre, tipo, frecuenciaRiego) {
    try {
      let planta = new Planta(nombre, tipo, frecuenciaRiego, null, null);
      console.log(
        `\nSe ha añadido la planta: ${planta.nombre} de tipo: ${planta.tipo}\n`
      );
      await this.insertarPlantaSQL(planta);
    } catch (error) {
      console.error("Ha habido un error al crear la planta!", error.message);
    }
  }

  // Registra la última vez que se ha regado una planta
  static async registrarRiego(plantaID, frecuenciaRiego) {
    let conexion;
    const ahora = DateTime.local();
    const hoy = ahora.toISODate();
    console.log(hoy);
    try {
      conexion = await mysql.createConnection({
        host: host,
        user: usuario,
        password: pass,
        database: db,
      });
      await conexion.execute(
        "UPDATE plantas SET ultimoRiego = ? WHERE id = ?",
        [hoy, plantaID]
      );
    } finally {
      this.proximoRiego(hoy, frecuenciaRiego, plantaID);
      if (conexion) {
        await conexion.end();
      }
    }
  }

  // Registra el próximo riego necesario
  static async proximoRiego(ultimoRiego, frecuenciaRiego, plantaID) {
    const ahora = DateTime.local();
    const proximoRiego = ahora.plus({ days: frecuenciaRiego });
    const proximoRiegoFormat = proximoRiego.toISODate();
    console.log(proximoRiegoFormat);
    let conexion;

    try {
      conexion = await mysql.createConnection({
        host: host,
        user: usuario,
        password: pass,
        database: db,
      });
      await conexion.execute(
        "UPDATE plantas SET proximoRiego = ? WHERE id = ?",
        [proximoRiegoFormat, plantaID]
      );
    } finally {
      if (conexion) await conexion.end(); // Cierra la conexión SQL
    }
  }
}
