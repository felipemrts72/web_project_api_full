const Joi = require("joi");

const createCardSchema = Joi.object({
  name: Joi.string().required().min(2).max(30).messages({
    "string.empty": "O nome é obrigatório",
    "string.min": "O nome deve ter no mínimo 2 caracteres",
    "string.max": "O nome deve ter no máximo 30 caracteres",
  }),
  link: Joi.string().required().uri().messages({
    "string.empty": "O link é obrigatório",
    "string.uri": "O link deve ser uma URL válida",
  }),
});

module.exports = { createCardSchema };
