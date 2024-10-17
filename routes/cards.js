const express = require("express");
const Card = require("../models/card");

const router = express.Router();

// Obtener todas las tarjetas
router.get("/", async (req, res) => {
  try {
    const cards = await Card.find();
    res.send(cards);
  } catch (err) {
    res.status(500).send({ message: "Error al obtener tarjetas" });
  }
});

// Crear una nueva tarjeta
router.post("/", async (req, res) => {
  const { name, link } = req.body; // Eliminar 'owner' de aquí

  if (!name || !link) {
    return res.status(400).send({ message: "Faltan campos requeridos" });
  }

  try {
    const card = new Card({ name, link, owner: req.user._id }); // Asignar owner desde req.user
    await card.save();
    res.status(201).send(card);
  } catch (err) {
    const statusCode = err.name === "ValidationError" ? 400 : 500;
    res.status(statusCode).send({ message: err.message });
  }
});

// Eliminar una tarjeta por ID
router.delete("/:cardId", async (req, res) => {
  try {
    const card = await Card.findById(req.params.cardId).orFail(() => {
      const error = new Error("Tarjeta no encontrada");
      error.statusCode = 404;
      throw error;
    });
    await card.remove(); // O usar findByIdAndDelete
    res.send({ message: "Tarjeta eliminada" });
  } catch (err) {
    const statusCode = err.statusCode || 500;
    res.status(statusCode).send({ message: err.message });
  }
});

module.exports = router;
