const Card = require("../models/card");

// Controlador para crear una nueva tarjeta
module.exports.createCard = async (req, res) => {
  const { name, link } = req.body;

  // Validar que los campos requeridos estén presentes
  if (!name || !link) {
    return res.status(400).send({ message: "Faltan campos requeridos" });
  }

  try {
    const card = new Card({
      name,
      link,
      owner: req.user._id, // Asignar el ID del usuario desde el middleware
    });

    await card.save();
    res.status(201).send(card);
  } catch (err) {
    res.status(500).send({ message: "Error al crear la tarjeta" });
  }
};
