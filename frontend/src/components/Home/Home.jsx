import { useState, useEffect } from 'react';
import { api } from '../../utils/api.js';
import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';

//Components
import Main from './components/Main/Main.jsx';
import Footer from './components/Footer/Footer.jsx';

function Home() {
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    (async () => {
      await api.getData('users/me').then((data) => {
        setCurrentUser(data);
      });
    })();
  }, []);

  const handleUpdateUser = (data) => {
    (async () => {
      await api.profileEdit(data).then((newUser) => {
        setCurrentUser(newUser);
        handleClosePopup();
      });
    })().catch((err) => {
      `UPDATE ERRO - ${err}`;
    });
  };
  //---------------------------- POPUP ------------------------------

  const [popup, setPopup] = useState(null);
  function handleOpenPopup(popup) {
    setPopup(popup);
  }

  function handleClosePopup() {
    setPopup(null);
  }
  //---------------------- AVATAR ---------------------------------

  const handleUpdateAvatar = (url) => {
    (async () => {
      await api.avatarEdit(url).then((newUser) => {
        setCurrentUser(newUser);
        handleClosePopup();
      });
    })().catch((err) => {
      `UPDATE ERRO - ${err}`;
    });
  };
  //--------------------------- CARDS ----------------------------------------
  const [cards, setCards] = useState([]);

  useEffect(() => {
    api.getData('cards').then((res) => {
      setCards(res);
    });
  }, []);

  async function handleCardLike(card) {
    const isLiked = card.isLiked;

    // Enviar uma solicitação para a API e obter os dados do cartão atualizados
    if (!isLiked) {
      await api
        .addLike(card._id)
        .then((newCard) => {
          setCards((state) =>
            state.map((currentCard) =>
              currentCard._id === card._id ? newCard : currentCard
            )
          );
        })
        .catch((error) => console.error(`LIKE CARD - ${error}`));
    } else {
      await api
        .removeLike(card._id)
        .then((newCard) => {
          setCards((state) =>
            state.map((currentCard) =>
              currentCard._id === card._id ? newCard : currentCard
            )
          );
        })
        .catch((error) => console.error(`UNLIKE CARD - ${error}`));
    }
  }

  async function handleCardDelete(card) {
    await api
      .deleteCard(card._id)
      .then((res) => {
        if (res.ok) {
          setCards(
            (prevCards) => prevCards.filter((item) => item._id !== card._id) //Atualizando os cartões retirando o id do cartão excluido
          );
        }
      })
      .catch((error) => console.error(`DELETE CARD - ${error}`));
  }

  async function handleAddPlaceSubmit(card) {
    await api
      .sendCard(card)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        handleClosePopup();
      })
      .catch((error) => console.error(`SUBMIT CARD - ${error}`));
  }
  return (
    <>
      <CurrentUserContext.Provider
        value={{
          currentUser,
          handleUpdateUser,
          handleUpdateAvatar,
          handleAddPlaceSubmit,
        }}
      >
        <Main
          onOpenPopup={handleOpenPopup}
          onClosePopup={handleClosePopup}
          popup={popup}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
          cards={cards}
        />
        <Footer />
      </CurrentUserContext.Provider>
    </>
  );
}

export default Home;
