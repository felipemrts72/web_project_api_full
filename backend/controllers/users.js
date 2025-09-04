const bcrypt = require("bcryptjs");
const { User } = require("../models/User");

module.exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (err) {
    next(err);
  }
};

module.exports.getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).orFail();
    res.json(user);
  } catch (err) {
    err.statusCode = 404;
    err.message = "Usuário inexistente!";
    next(err);
  }
};

module.exports.createUser = async (req, res, next) => {
  try {
    const {
      name, about, avatar, email, password,
    } = req.body;

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

    return res.status(201).json({ data: userData });
  } catch (err) {
    return next(err);
  }
};

module.exports.getCurrentUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).orFail();
    res.json(user);
  } catch (err) {
    err.statusCode = 404;
    err.message = "Usuário inexistente!";
    next(err);
  }
};

module.exports.userUpdate = async (req, res, next) => {
  try {
    const { name, about } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { name, about },
      { new: true, runValidators: true },
    );
    res.json(updatedUser);
  } catch (err) {
    next(err);
  }
};

module.exports.userAvatarUpdate = async (req, res, next) => {
  try {
    const { avatar } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { avatar },
      { new: true, runValidators: true },
    );
    res.json(updatedUser);
  } catch (err) {
    next(err);
  }
};
