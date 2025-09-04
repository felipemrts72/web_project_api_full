require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const errorHandler = require("./middlewares/errorHandler");
const { requestLogger, errorLogger } = require("./middlewares/logger");

const { PORT = 3000, MONGODB_URL } = process.env;
const app = express();

// Importar routers e controllers
const usersRouter = require("./routes/users");
const cardsRouter = require("./routes/cards");
const { createUser } = require("./controllers/users");
const { login } = require("./controllers/login");
const auth = require("./middlewares/auth");

// Middlewares globais
app.use(express.json());
app.use(cors());

// Conexão com MongoDB
mongoose
  .connect(MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Conexão com MongoDB estabelecida com sucesso! 🚀"))
  .catch((err) => console.error("Erro ao conectar ao MongoDB:", err.message));

// Logger de requisições
app.use(requestLogger);

// Rotas públicas
app.post("/signup", createUser);
app.post("/signin", login);

// Rotas protegidas
app.use("/users", auth, usersRouter);
app.use("/cards", auth, cardsRouter);

// Rota de crash test
app.get("/crash-test", () => {
  setTimeout(() => {
    throw new Error("O servidor travará agora");
  }, 0);
});

// Rota 404 para endpoints inexistentes
app.use((req, res, next) => {
  const err = new Error("NotFound");
  err.name = "NotFound";
  next(err);
});

// Logger de erros
app.use(errorLogger);

// Middleware de tratamento de erros centralizado
app.use(errorHandler);

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`App listening at port ${PORT} 🚀`);
});
