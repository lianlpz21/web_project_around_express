const express = require("express");
const path = require("path");
const usersRouter = require("./users");
const cardsRouter = require("./cards");

const app = express();
const PORT = 3000;

app.use("/users", usersRouter);
app.use("/cards", cardsRouter);

app.use((req, res) => {
  res.status(404).send({ message: "Ruta no encontrada..." });
});

app.listen(PORT, () => {
  console.log(`Servidor está corriendo en puerto: ${PORT}`);
});
