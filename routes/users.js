const express = require("express");
const path = require("path");
const fs = require("fs");

const router = express.Router();

// Obtener todos los usuarios
router.get("/", (req, res) => {
  fs.readFile(
    path.join(__dirname, "../data/users.json"),
    "utf8",
    (err, data) => {
      if (err) {
        return res
          .status(500)
          .send({ message: "Error leyendo información de los usuarios" });
      }
      res.send(JSON.parse(data));
    }
  );
});

// Obtener un usuario por ID
router.get("/:id", (req, res) => {
  const { id } = req.params;
  fs.readFile(
    path.join(__dirname, "../data/users.json"),
    "utf8",
    (err, data) => {
      if (err) {
        return res
          .status(500)
          .send({ message: "Error leyendo información de los usuarios" });
      }
      const users = JSON.parse(data);
      const user = users.find((user) => user._id === id);
      if (user) {
        res.send(user);
      } else {
        res.status(404).send({ message: "ID de usuario no encontrado" });
      }
    }
  );
});

module.exports = router;
