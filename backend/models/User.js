const mongoose = require("mongoose");
const validator = require("validator");

const urlRegex = /^https?:\/\/(www\.)?[a-zA-Z0-9\-._~:/?#[\]@!$&'()*+,;=]+#?$/;

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v) => validator.isEmail(v),
      message: "E-mail inválido",
    },
  },
  password: {
    type: String,
    required: true,
    select: false, // impede retorno do hash por padrão
  },
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: "Jacques Cousteau", // valor padrão
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: "Explorer", // valor padrão
  },
  avatar: {
    type: String,
    default: "https://pictures.s3.your-default-avatar.jpg", // valor padrão
    validate: {
      validator: (v) => urlRegex.test(v),
      message: (err) => `${err} não é um link de avatar válido.`,
    },
  },
});

const User = mongoose.model("user", userSchema);

module.exports = { User, urlRegex };
