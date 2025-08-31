const router = require("express").Router();
const auth = require("../middlewares/auth");
const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require("../controllers/cards");

// Middleware de autenticação
router.use(auth);

router.get("/", getCards);
router.post("/", createCard);
router.delete("/:id", deleteCard);
router.put("/:cardId/likes", likeCard);
router.delete("/:cardId/likes", dislikeCard);

module.exports = router;
