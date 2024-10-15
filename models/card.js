const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Expresión regular para validar los enlaces de imágenes (similar al campo avatar en user)
const linkRegex =
  /^(http:\/\/|https:\/\/)(www\.)?[a-zA-Z0-9-._~:/?%#\[\]@!$&'()*+,;=]+$/;

// Esquema de tarjeta
const cardSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        // Validación personalizada con expresión regular
        return linkRegex.test(v);
      },
      message: (props) =>
        `${props.value} no es un enlace válido para la imagen de la tarjeta.`,
    },
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  likes: {
    type: [Schema.Types.ObjectId],
    ref: "user",
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Modelo de tarjeta
module.exports = mongoose.model("card", cardSchema);
