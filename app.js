const express = require("express");
const path = require("path");
const usersRouter = require("./routes/users");
const cardsRouter = require("./routes/cards");

const app = express();
const PORT = 3000;

// Middleware para registrar las peticiones en la consola
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
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
