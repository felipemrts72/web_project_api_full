const ERROR_CODE_BAD_REQUEST = 400;
const ERROR_CODE_NOT_FOUND = 404;
const ERROR_CODE_SERVER = 500;

function errorHandler(err, req, res, next) {
  console.error(err.message);

  if (
    err.name === "ValidationError" ||
    err.name === "CastError" ||
    err.name === "BadRequest"
  ) {
    return res.status(ERROR_CODE_BAD_REQUEST).send({
      message: err.message || "Dados inválidos.",
    });
  }

  if (err.name === "NotFound") {
    return res.status(ERROR_CODE_NOT_FOUND).send({
      message: "Recurso não encontrado.",
    });
  }

  res.status(ERROR_CODE_SERVER).send({ message: "Erro interno do servidor." });
}

module.exports = errorHandler;
