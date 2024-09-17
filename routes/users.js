const express = require("express");
const path = require("path");
const fs = require("fs");

const router = express.Router();

router.get("/", (req, res) => {
  fs.readFile(
    path.join(__dirname, "data", "users.json"),
    "utf8",
    (err, data) => {
      if (err) {
        res.status(500).send({ message: "Error reading users data" });
      } else {
        res.send(JSON.parse(data));
      }
    }
  );
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  fs.readFile(
    path.join(__dirname, "data", "users.json"),
    "utf8",
    (err, data) => {
      if (err) {
        res.status(500).send({ message: "Error reading users data" });
      } else {
        const users = JSON.parse(data);
        const user = users.find((user) => user._id === id);
        if (user) {
          res.send(user);
        } else {
          res.status(404).send({ message: "User ID not found" });
        }
      }
    }
  );
});

module.exports = router;
