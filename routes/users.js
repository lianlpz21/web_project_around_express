const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Card = require("../models/card");

// Obtener todos los usuarios
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (err) {
    res.status(500).send({ message: "Error al obtener usuarios" });
  }
});

// Obtener un usuario por ID
router.get("/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).orFail(() => {
      const error = new Error("Usuario no encontrado");
      error.statusCode = 404;
      throw error;
    });
    res.send(user);
  } catch (err) {
    const statusCode = err.statusCode || 500;
    res.status(statusCode).send({ message: err.message });
  }
});

// Crear un nuevo usuario
router.post("/", async (req, res) => {
  const { name, about, avatar } = req.body;

  if (!name || !about || !avatar) {
    return res.status(400).send({ message: "Faltan campos requeridos" });
  }

  try {
    const user = new User({ name, about, avatar });
    await user.save();
    res.status(201).send(user);
  } catch (err) {
    const statusCode = err.name === "ValidationError" ? 400 : 500;
    res.status(statusCode).send({ message: err.message });
  }
});

// Actualizar el perfil del usuario
router.patch("/me", async (req, res) => {
  const { name, about } = req.body;

  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { name, about },
      { new: true, runValidators: true }
    ).orFail(() => {
      const error = new Error("Usuario no encontrado");
      error.statusCode = 404;
      throw error;
    });
    res.send(user);
  } catch (err) {
    const statusCode =
      err.statusCode || (err.name === "ValidationError" ? 400 : 500);
    res.status(statusCode).send({ message: err.message });
  }
});

// Actualizar el avatar del usuario
router.patch("/me/avatar", async (req, res) => {
  const { avatar } = req.body;

  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { avatar },
      { new: true, runValidators: true }
    ).orFail(() => {
      const error = new Error("Usuario no encontrado");
      error.statusCode = 404;
      throw error;
    });
    res.send(user);
  } catch (err) {
    const statusCode =
      err.statusCode || (err.name === "ValidationError" ? 400 : 500);
    res.status(statusCode).send({ message: err.message });
  }
});

// Dar like a una tarjeta
router.put("/cards/:cardId/likes", async (req, res) => {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } }, // Agrega _id al array si aún no está ahí
      { new: true }
    ).orFail(() => {
      const error = new Error("Tarjeta no encontrada");
      error.statusCode = 404;
      throw error;
    });
    res.send(card);
  } catch (err) {
    const statusCode = err.statusCode || 500;
    res.status(statusCode).send({ message: err.message });
  }
});

// Dar unlike a una tarjeta
router.delete("/cards/:cardId/likes", async (req, res) => {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } }, // Elimina _id del array
      { new: true }
    ).orFail(() => {
      const error = new Error("Tarjeta no encontrada");
      error.statusCode = 404;
      throw error;
    });
    res.send(card);
  } catch (err) {
    const statusCode = err.statusCode || 500;
    res.status(statusCode).send({ message: err.message });
  }
});

module.exports = router;
