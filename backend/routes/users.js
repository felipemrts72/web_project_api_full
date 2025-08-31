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

router.get("/", auth, getUsers);
router.get("/me", auth, getCurrentUser);
router.get("/:id", auth, getUserById);
router.post("/", validate(createUserSchema), createUser);
router.patch("/me", auth, userUpdate);
router.patch(
  "/me/avatar",
  auth,
  validate(updateAvatarSchema),
  userAvatarUpdate,
);

module.exports = router;
