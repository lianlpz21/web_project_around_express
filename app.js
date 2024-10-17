const express = require("express");
const mongoose = require("mongoose");
const usersRouter = require("./routes/users");
const cardsRouter = require("./routes/cards");

const app = express();
const PORT = 3000;

// Middleware para parsear JSON en el cuerpo de las solicitudes
app.use(express.json());

// Conectar a la base de datos MongoDB
mongoose
  .connect("mongodb://localhost:27017/aroundb", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Conexión a MongoDB exitosa"))
  .catch((err) => console.error("Error al conectar a MongoDB:", err));

// Middleware de autorización temporal
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// Middleware para autorización temporal
app.use((req, res, next) => {
  req.user = {
    _id: "67103fcbb42f68c7b15498b3",
  };
  next();
});

// Definir las rutas
app.use("/users", usersRouter);
app.use("/cards", cardsRouter);

// Ruta para errores 404
app.use((req, res) => {
  res.status(404).send({ message: "Ruta no encontrada..." });
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor está corriendo en puerto: ${PORT}`);
});
