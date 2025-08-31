const Joi = require("joi");
const validator = require("validator");

const validateURL = (value, helpers) => {
  if (validator.isURL(value)) return value;
  return helpers.error("string.uri");
};

const createUserSchema = Joi.object({
  name: Joi.string().min(2).max(30).required(),
  about: Joi.string().min(2).max(30).required(),
  avatar: Joi.string().required().custom(validateURL),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const updateAvatarSchema = Joi.object({
  avatar: Joi.string().required().custom(validateURL),
});

module.exports = { createUserSchema, updateAvatarSchema };
