const router = require("express").Router();
const auth = require("../middlewares/auth");
const {
  createUserSchema,
  updateAvatarSchema,
} = require("../validations/userValidation");
const {
  getUsers,
  getUserById,
  getCurrentUser,
  createUser,
  userUpdate,
  userAvatarUpdate,
} = require("../controllers/users");

const validate = (schema) => (req, res, next) => {
  const { error, value } = schema.validate(req.body);
  if (error) {
    error.name = "ValidationError";
    return next(error);
  }
  req.body = value;
  next();
};

router.get("/", getUsers);
router.get("/me", getCurrentUser);
router.get("/:id", getUserById);
router.patch("/me", userUpdate);
router.patch("/me/avatar", validate(updateAvatarSchema), userAvatarUpdate);

module.exports = router;
