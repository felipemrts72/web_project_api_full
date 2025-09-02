import ImagePopup from '../ImagePopup/ImagePopup';

export default function Card(props) {
  const { name, link, isLiked } = props.card;
  const { card, handleOpenPopup, onCardLike, onCardDelete } = props;
  const imageComponent = {
    title: false,
    children: <ImagePopup card={props.card} />,
  };

  const cardLikeButtonClassName = `card__like-button ${
    isLiked ? 'card__like-button_is-active' : ''
  }`;

  const handleLikeClick = (card) => {
    onCardLike(card);
  };

  const handleDeleteClick = (card) => {
    onCardDelete(card);
  };

  return (
    <li className="cards__item" key={props._id}>
      <img
        alt="Apagar cartão"
        className="cards__trash"
        onClick={() => {
          handleDeleteClick(card);
        }}
      />
      <img
        src={link}
        alt={`Foto do cartão, que mostra o ${name}`}
        className="cards__image"
        onClick={() => {
          handleOpenPopup(imageComponent);
        }}
      />
      <div className="cards__desc">
        <h2 className="cards__title">{name}</h2>
        <button
          className={cardLikeButtonClassName}
          alt="Curtir cartão"
          onClick={() => {
            handleLikeClick(card);
          }}
        />
      </div>
    </li>
  );
}
