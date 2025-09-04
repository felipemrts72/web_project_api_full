const router = require("express").Router();
const { celebrate, Joi, Segments } = require("celebrate");

const {
  getUsers,
  getUserById,
  getCurrentUser,
  createUser,
  userUpdate,
  userAvatarUpdate,
} = require("../controllers/users");

// Rotas
router.get("/", getUsers);

router.get("/me", getCurrentUser);

router.get(
  "/:id",
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.string().hex().length(24), // valida ObjectId do Mongo
    }),
  }),
  getUserById,
);

router.post(
  "/",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
      avatar: Joi.string().uri(),
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required(),
    }),
  }),
  createUser,
);

router.patch(
  "/me",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().min(2).max(30).required(),
      about: Joi.string().min(2).max(30).required(),
    }),
  }),
  userUpdate,
);

router.patch(
  "/me/avatar",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      avatar: Joi.string().uri().required(),
    }),
  }),
  userAvatarUpdate,
);

module.exports = router;
