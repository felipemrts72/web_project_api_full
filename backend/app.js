// app.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const errorHandler = require("./middlewares/errorHandler");

const { PORT = 3000 } = process.env;
const app = express();

// Importar routers e controllers
const usersRouter = require("./routes/users");
const cardsRouter = require("./routes/cards");
const { createUser } = require("./controllers/users");
const { login } = require("./controllers/login");

// Middlewares globais
app.use(express.json());
app.use(cors());

// Conexão com MongoDB
mongoose
  .connect("mongodb://localhost:27017/aroundb")
  .then(() => {
    console.log("Conexão com MongoDB estabelecida com sucesso!");
  })
  .catch((err) => {
    console.error("Erro ao conectar ao MongoDB:", err.message);
  });

// Rotas públicas
app.post("/signup", createUser);
app.post("/signin", login);

// Rotas protegidas
app.use("/users", usersRouter);
app.use("/cards", cardsRouter);

// Rota de crash test (para simular falha do servidor)
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

// Middleware de tratamento de erros
app.use(errorHandler);

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
