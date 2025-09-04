import { useState, useEffect } from 'react';
import { api } from '../../utils/api.js';
import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';
import InfoToolTip from '../InfoToolTip/InfoToolTip.jsx';

// Components
import Main from './components/Main/Main.jsx';
import Footer from './components/Footer/Footer.jsx';

function Home({ currentUser, setCurrentUser }) {
  const [cards, setCards] = useState([]);
  const [popup, setPopup] = useState(null);

  const [tooltipOpen, setToolTipOpen] = useState(false);
  const [tooltipSuccess, setToolTipSuccess] = useState(false);
  const [tooltipMessage, setToolTipMessage] = useState('');

  //---------------------- CARDS -------------------------
  useEffect(() => {
    api
      .getData('/cards')
      .then((res) => {
        const sortedCards = res.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setCards(sortedCards);
      })
      .catch((err) => console.error('Erro ao buscar cards:', err));
  }, []);

  //---------------------- POPUPS -----------------------
  function handleOpenPopup(popup) {
    setPopup(popup);
  }

  function handleClosePopup() {
    if (popup != null) {
      document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
          setPopup(null);
        }
      });
    }
    setPopup(null);
  }

  //---------------------- ATUALIZAR USUÁRIO -----------
  const handleUpdateUser = async (data) => {
    try {
      const newUser = await api.profileEdit(data);
      setCurrentUser(newUser);
      handleClosePopup();
    } catch (err) {
      console.error('Erro ao atualizar usuário:', err);
    }
  };

  const handleUpdateAvatar = async (url) => {
    try {
      const newUser = await api.avatarEdit(url);
      setCurrentUser(newUser);
      handleClosePopup();
    } catch (err) {
      console.error('Erro ao atualizar avatar:', err);
    }
  };

  //---------------------- LIKES ------------------------
  const handleCardLike = async (card) => {
    const isLiked = card.likes.some((id) => id.toString() === currentUser._id);
    try {
      const updatedCard = isLiked
        ? await api.removeLike(card._id)
        : await api.addLike(card._id);
      setCards((state) =>
        state.map((c) => (c._id === card._id ? updatedCard : c))
      );
    } catch (err) {
      console.error('Erro ao atualizar like:', err);
    }
  };

  //---------------------- DELETE CARD -----------------
  const handleCardDelete = async (card) => {
    try {
      await api.deleteCard(card._id);
      setCards((prevCards) => prevCards.filter((c) => c._id !== card._id));
    } catch (status) {
      console.error('Erro ao deletar cartão:', status);
      setToolTipSuccess(false);
      setToolTipMessage(
        status === 'Error: 403'
          ? 'Erro! Você só pode deletar os *SEUS* cartões'
          : 'Erro ao deletar cartão, tente novamente!'
      );
      setToolTipOpen(true);
      setTimeout(() => {
        setToolTipOpen(false);
      }, 3000);
    }
  };

  //---------------------- ADD CARD --------------------
  const handleAddPlaceSubmit = async (card) => {
    try {
      const newCard = await api.sendCard(card);
      setCards((prevCards) => [newCard, ...prevCards]);
      handleClosePopup();
    } catch (err) {
      console.error('Erro ao adicionar cartão:', err);
    }
  };

  return (
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
      <InfoToolTip
        isOpen={tooltipOpen}
        isSuccess={tooltipSuccess}
        message={tooltipMessage}
        onClose={() => setToolTipOpen(false)}
      />
    </CurrentUserContext.Provider>
  );
}

export default Home;
