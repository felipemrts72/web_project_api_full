const bcrypt = require("bcryptjs");
const { User } = require("../models/User");
const {
  createUserSchema,
  updateAvatarSchema,
} = require("../validations/userValidation");

// GET todos os usuários
module.exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (err) {
    next(err);
  }
};

// GET usuário por ID
module.exports.getUserById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id).orFail();
    res.json(user);
  } catch (err) {
    err.message = "Usuário inexistente!";
    next(err);
  }
};

// POST criar usuário
module.exports.createUser = async (req, res, next) => {
  try {
    // Valida os dados de entrada com Joi
    const { error, value } = createUserSchema.validate(req.body);
    if (error) {
      error.name = "ValidationError";
      throw error;
    }

    const { name, about, avatar, email, password } = value;

    // Verifica se o e-mail já existe
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(409)
        .json({ message: "E-mail já cadastrado, entre ou tente novamente!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      about,
      avatar,
      email,
      password: hashedPassword,
    });

    const userData = user.toObject();
    delete userData.password;

    res.status(201).json({ data: userData });
  } catch (err) {
    next(err);
  }
};

// GET dados do usuário logado
module.exports.getCurrentUser = async (req, res, next) => {
  const id = req.user._id;
  try {
    const user = await User.findById(id).orFail();
    res.json(user);
  } catch (err) {
    err.message = "Usuário inexistente!";
    next(err);
  }
};

// PATCH atualizar nome e about do usuário logado
module.exports.userUpdate = async (req, res, next) => {
  const id = req.user._id;
  try {
    const { name, about } = req.body;

    if (!name || !about) {
      const error = new Error("Campos obrigatórios ausentes");
      error.name = "ValidationError";
      throw error;
    }

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { name, about },
      { new: true, runValidators: true },
    );
    res.json(updatedUser);
  } catch (err) {
    next(err);
  }
};

module.exports.userAvatarUpdate = async (req, res, next) => {
  const id = req.user._id;
  try {
    const { error, value } = updateAvatarSchema.validate(req.body);
    if (error) {
      error.name = "ValidationError";
      throw error;
    }

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { avatar: value.avatar },
      { new: true, runValidators: true },
    );
    res.json(updatedUser);
  } catch (err) {
    next(err);
  }
};
