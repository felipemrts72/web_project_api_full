const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res.status(401).send({ message: "Token não fornecido ou inválido" });
  }

  const token = authorization.replace("Bearer ", "");

  try {
    const payload = jwt.verify(token, "SECRET_DEV");
    req.user = payload;
    next();
  } catch (err) {
    return res.status(401).send({ message: "Token inválido" });
  }
};
