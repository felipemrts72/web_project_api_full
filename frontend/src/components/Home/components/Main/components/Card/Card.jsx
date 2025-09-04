import { useContext } from 'react';
import { CurrentUserContext } from '../../../../../../contexts/CurrentUserContext';
import ImagePopup from '../ImagePopup/ImagePopup';

export default function Card({
  card,
  handleOpenPopup,
  onCardLike,
  onCardDelete,
}) {
  const { currentUser } = useContext(CurrentUserContext);

  const isLiked = card.likes.some((id) => id.toString() === currentUser?._id);

  const cardLikeButtonClassName = `card__like-button ${
    isLiked ? 'card__like-button_is-active' : ''
  }`;

  const handleLikeClick = () => {
    onCardLike(card);
  };
  const handleDeleteClick = () => onCardDelete(card);

  const imageComponent = {
    title: false,
    children: <ImagePopup card={card} />,
  };

  return (
    <li className="cards__item" key={card._id}>
      <img
        alt="Apagar cartão"
        className="cards__trash"
        onClick={handleDeleteClick}
      />
      <img
        src={card.link}
        alt={`Foto do cartão, que mostra o ${card.name}`}
        className="cards__image"
        onClick={() => handleOpenPopup(imageComponent)}
      />
      <div className="cards__desc">
        <h2 className="cards__title">{card.name}</h2>
        <button
          className={cardLikeButtonClassName}
          alt="Curtir cartão"
          onClick={handleLikeClick}
        />
      </div>
    </li>
  );
}
