const express = require("express");
const path = require("path");
const fs = require("fs");

const router = express.Router();

router.get("/", (req, res) => {
  fs.readFile(
    path.join(__dirname, "data", "cards.json"),
    "utf8",
    (err, data) => {
      if (err) {
        res.status(500).send({ message: "Error reading cards data" });
      } else {
        res.send(JSON.parse(data));
      }
    }
  );
});

module.exports = router;
