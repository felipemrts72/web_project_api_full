const Joi = require("joi");
const validator = require("validator");

const validateURL = (value, helpers) => {
  if (validator.isURL(value)) return value;
  return helpers.error("string.uri");
};

const createUserSchema = Joi.object({
  name: Joi.string().min(2).max(30).optional().messages({
    "string.min": "O nome deve ter pelo menos 2 caracteres",
    "string.max": "O nome deve ter no máximo 30 caracteres",
  }),
  about: Joi.string().min(2).max(30).optional().messages({
    "string.min": "O campo 'sobre' deve ter pelo menos 2 caracteres",
    "string.max": "O campo 'sobre' deve ter no máximo 30 caracteres",
  }),
  avatar: Joi.string().optional().custom(validateURL).messages({
    "string.pattern.base": "O link do avatar deve ser uma URL válida",
  }),
  email: Joi.string().email().required().messages({
    "string.email": "O e-mail fornecido é inválido",
    "any.required": "O e-mail é obrigatório",
  }),
  password: Joi.string().min(6).required().messages({
    "any.required": "A senha é obrigatória",
  }),
});

const updateAvatarSchema = Joi.object({
  avatar: Joi.string().required().custom(validateURL).messages({
    "any.required": "O avatar é obrigatório",
    "string.pattern.base": "O link do avatar deve ser uma URL válida",
  }),
});

module.exports = { createUserSchema, updateAvatarSchema };
