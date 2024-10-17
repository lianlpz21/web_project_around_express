const User = require("../models/user");

// GET /users — devuelve todos los usuarios
const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error al obtener los usuarios", error: err });
  }
};

// GET /users/:userId — devuelve un usuario por _id
const getUserById = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    res.status(200).json(user);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error al obtener el usuario", error: err });
  }
};

// POST /users — crea un nuevo usuario
const createUser = async (req, res) => {
  const { name, about, avatar } = req.body;

  try {
    const newUser = new User({ name, about, avatar });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: "Error al crear el usuario", error: err });
  }
};

module.exports = { getUsers, getUserById, createUser };
