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
});

//Clase planta
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

  //Inserta el objeto planta en la base de datos (Genera la conexión a la base de datos)
  static async insertarPlantaSQL(planta) {
  let conexion;
  try {
    conexion = await mysql.createConnection({
      host: "",
      user: "",
      password: "",
      database: "gestorJardin",
    });
    const [resultado] = await conexion.execute(
      "INSERT INTO plantas (nombre, tipo, frecuenciaRiego) VALUES (?, ?, ?)",
      [planta.nombre, planta.tipo, planta.frecuenciaRiego]
    );
    return resultado;
  } finally {
    if (conexion) await conexion.end();
  }
}

  //Crea el objeto planta a traves de los datos recibidos por el formulario
  static async crearPlanta(nombre, tipo, frecuenciaRiego) {
    try {
      let planta = new Planta(nombre, tipo, frecuenciaRiego, null);
      console.log(
        `\nSe ha añadido la planta: ${planta.nombre} de tipo: ${planta.tipo}\n`
      );
      await this.insertarPlantaSQL(planta);
    } catch (error) {
      console.error("Ha habido un error al crear la planta!", error.message);
    }
  }
}
