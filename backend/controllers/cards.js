const { Card } = require("../models/Card");

async function getCards() {
  try {
    const cards = await Card.find();
    return cards;
  } catch (err) {
    console.error(`ERROR - [DBGET] Cards - ${err.message}`);
    throw err;
  }
}

async function deleteCard(id) {
  try {
    const deleted = await Card.findByIdAndDelete({ _id: id }).orFail(() => {
      const err = new Error("Cartão não encontrado");
      err.name = "NotFound";
      throw err;
    });

    return deleted;
  } catch (err) {
    console.error(`ERROR - [DBGET] Card-ID - ${err.message}`);
    throw err;
  }
}

async function createCard({ name, link, id }) {
  try {
    const newCard = await Card({ name, link, owner: id });
    const createdCard = await newCard.save();
    return createdCard;
  } catch (err) {
    console.error(`ERROR - [DBCREATE] Card - ${err.message}`);
    err.name = "ValidationError";
    throw err;
  }
}

async function likeCard({ userId, cardId }) {
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

    const updatedCard = await Card.findByIdAndUpdate(
      cardId,
      { $addToSet: { likes: userId } },
      { new: true },
    ).orFail(() => {
      const err = new Error("Cartão não encontrado");
      err.name = "NotFound";
      throw err;
    });

    return updatedCard;
  } catch (err) {
    console.error(`ERROR - [DBUPDT] LIKE-Card - ${err.message}`);
    throw err;
  }
}

async function dislikeCard({ userId, cardId }) {
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

    const updatedCard = await Card.findByIdAndUpdate(
      cardId,
      { $pull: { likes: userId } },
      { new: true },
    ).orFail(() => {
      const err = new Error("Cartão não encontrado");
      err.name = "NotFound";
      throw err;
    });
    return updatedCard;
  } catch (err) {
    console.error(`ERROR - [DBUPDT] DISLIKE-CARD - ${err.message}`);
    throw err;
  }
}

module.exports = { getCards, deleteCard, createCard, likeCard, dislikeCard };
