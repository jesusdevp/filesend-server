const express = require("express");
const conectarDB = require("./config/db");
const auth = require("./middleware/auth");
const cors = require("cors");

// Crear el servidor
const app = express();

// COnectar a la base de datos
conectarDB();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");

  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();

  app.options("*", (req, res) => {
    res.header(
      "Access-Control-Allow-Methods",
      "GET, PATCH, PUT, POST, DELETE, OPTIONS"
    );
    res.send();
  });
});

// Habilitar Cors
const opcionesCors = {
  origin: process.env.FRONTEND_URL,
};
app.use(cors(opcionesCors));

console.log("Comenzando File Send");

// Puerto de la app
const port = process.env.PORT || 4000;

// Habilitar leer los valores de un body
app.use(express.json());

// Habilitar la carpeta publica
app.use(express.static("uploads"));

// Rutas de la app
app.use("/api/usuarios", require("./routes/usuarios"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/enlaces", require("./routes/enlaces"));
app.use("/api/archivos", require("./routes/archivos"));

// Arrancar la app
app.listen(port, "0.0.0.0", () => {
  console.log(`El servidor esta funcionando en el puerto ${port}`);
});
