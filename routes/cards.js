const express = require("express");
const path = require("path");
const fs = require("fs");

const router = express.Router();

// Obtener todas las cartas
router.get("/", (req, res) => {
  fs.readFile(
    path.join(__dirname, "../data/cards.json"),
    "utf8",
    (err, data) => {
      if (err) {
        return res
          .status(500)
          .send({ message: "Error leyendo información de las cartas" });
      }
      res.send(JSON.parse(data));
    }
  );
});

module.exports = router;
