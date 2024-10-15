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

// Crear un nuevo usuario
router.post("/", (req, res) => {
  console.log("error", req.body);
  const { name, about, avatar } = req.body;

  // Verificar si los campos están completos
  if (!name || !about || !avatar) {
    return res.status(400).send({ message: "Faltan campos requeridos" });
  }

  // Leer los usuarios actuales desde el archivo
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

      // Crear un nuevo ID (puedes usar un generador de IDs más sofisticado en una base de datos real)
      const newUser = {
        _id: (users.length + 1).toString(), // Genera un nuevo ID basado en el tamaño actual del array
        name,
        about,
        avatar,
      };

      // Agregar el nuevo usuario al array de usuarios
      users.push(newUser);

      // Guardar el archivo actualizado
      fs.writeFile(
        path.join(__dirname, "../data/users.json"),
        JSON.stringify(users, null, 2),
        (err) => {
          if (err) {
            return res.status(500).send({
              message: "Error guardando el nuevo usuario en el archivo",
            });
          }
          res.status(201).send(newUser); // Devolver el nuevo usuario creado
        }
      );
    }
  );
});

module.exports = router;
