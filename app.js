const express = require("express");
const path = require("path");
const usersRouter = require("./users");
const cardsRouter = require("./cards");

const app = express();
const PORT = 3000;

app.use("/users", usersRouter);
app.use("/cards", cardsRouter);

app.use((req, res) => {
  res.status(404).send({ message: "Requested resource not found" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
