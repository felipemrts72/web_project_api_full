const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("../models/User");

// LOGIN
module.exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(401).send({ message: "Email ou senha incorretos" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).send({ message: "Email ou senha incorretos" });
    }

    const token = jwt.sign({ _id: user._id }, "SECRET_DEV", {
      expiresIn: "7d",
    });

    res.send({ token });
  } catch (err) {
    next(err);
  }
};
