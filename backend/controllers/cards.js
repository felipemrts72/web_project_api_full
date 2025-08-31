const { Card } = require("../models/Card");
const { createCardSchema } = require("../validations/cardValidation");

// GET todos os cards
module.exports.getCards = async (req, res, next) => {
  try {
    const cards = await Card.find({});
    res.json(cards);
  } catch (err) {
    next(err);
  }
};

// POST criar card com validação
module.exports.createCard = async (req, res, next) => {
  try {
    const { error, value } = createCardSchema.validate(req.body);
    if (error) {
      error.name = "ValidationError";
      throw error;
    }

    const { name, link } = value;
    const owner = req.user._id;

    const newCard = await Card.create({ name, link, owner });
    res.status(201).json(newCard);
  } catch (err) {
    next(err);
  }
};

// DELETE card (verifica se é dono)
module.exports.deleteCard = async (req, res, next) => {
  const cardId = req.params.id;
  const userId = req.user._id;

  try {
    const card = await Card.findById(cardId).orFail(() => {
      const err = new Error("Cartão não encontrado");
      err.name = "NotFound";
      throw err;
    });

    if (card.owner.toString() !== userId) {
      const err = new Error("Você não pode deletar este cartão");
      err.name = "Forbidden";
      throw err;
    }

    await card.deleteOne();
    res
      .status(200)
      .json({ message: `Cartão - ${cardId} - deletado com sucesso!` });
  } catch (err) {
    next(err);
  }
};

// PUT like card
module.exports.likeCard = async (req, res, next) => {
  const cardId = req.params.cardId;
  const userId = req.user._id;

  try {
    const card = await Card.findById(cardId).orFail(() => {
      const err = new Error("Cartão não encontrado");
      err.name = "NotFound";
      throw err;
    });

    if (card.likes.includes(userId)) {
      const err = new Error("Você já curtiu este cartão");
      err.name = "BadRequest";
      throw err;
    }

    card.likes.addToSet(userId);
    const updatedCard = await card.save();
    res.json(updatedCard);
  } catch (err) {
    next(err);
  }
};

// DELETE dislike card
module.exports.dislikeCard = async (req, res, next) => {
  const cardId = req.params.cardId;
  const userId = req.user._id;

  try {
    const card = await Card.findById(cardId).orFail(() => {
      const err = new Error("Cartão não encontrado");
      err.name = "NotFound";
      throw err;
    });

    if (!card.likes.includes(userId)) {
      const err = new Error("Você ainda não curtiu este cartão");
      err.name = "BadRequest";
      throw err;
    }

    card.likes.pull(userId);
    const updatedCard = await card.save();
    res.json(updatedCard);
  } catch (err) {
    next(err);
  }
};
