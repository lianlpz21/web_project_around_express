const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Expresión regular para validar los enlaces de avatar
const avatarRegex =
  /^(http:\/\/|https:\/\/)(www\.)?[a-zA-Z0-9-._~:/?%#\[\]@!$&'()*+,;=]+$/;

// Esquema de usuario
const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        // Validación personalizada con expresión regular
        return avatarRegex.test(v);
      },
      message: (props) =>
        `${props.value} no es un enlace válido para un avatar.`,
    },
  },
});

// Modelo de usuario
module.exports = mongoose.model("User", userSchema);
