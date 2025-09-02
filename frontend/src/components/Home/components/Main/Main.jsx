import { useContext } from 'react';
import { CurrentUserContext } from '../../../../contexts/CurrentUserContext.js';

import Card from './components/Card/Card';
import Popup from './components/Popup/Popup.jsx';
import NewCard from './components/Popup/components/NewCard/NewCard';
import EditAvatar from './components/Popup/components/EditAvatar/EditAvatar';
import EditProfile from './components/Popup/components/EditProfile/EditProfile';

function Main(props) {
  const { onOpenPopup, onClosePopup, popup, onCardLike, onCardDelete, cards } =
    props;
  const newCardPopup = { title: 'Novo cartão', children: <NewCard /> };
  const editAvatarPopup = { title: 'Editar avatar', children: <EditAvatar /> };
  const editProfilePopup = {
    title: 'Editar perfil',
    children: <EditProfile />,
  };

  const { currentUser } = useContext(CurrentUserContext);

  return (
    <main className="content">
      <div className="content__profile">
        <div className="content__avatar-edit">
          <img
            src={currentUser.avatar}
            alt="Perfil do usuário"
            className="content__avatar"
            onClick={() => onOpenPopup(editAvatarPopup)}
          />
        </div>
        <div className="content__profile-edit">
          <div className="content__wrap">
            <h1 className="content__title">{currentUser.name}</h1>
            <button
              className="content__edit-button"
              aria-label="Editar perfil"
              onClick={() => onOpenPopup(editProfilePopup)}
            />
          </div>
          <p className="content__subtitle">{currentUser.about}</p>
        </div>
        <button
          className="content__add"
          aria-label="Adicionar cartões"
          onClick={() => onOpenPopup(newCardPopup)}
        />
      </div>
      <section className="cards">
        {cards.map((card) => (
          <Card
            key={card._id}
            card={card}
            handleOpenPopup={onOpenPopup}
            onCardLike={onCardLike}
            onCardDelete={onCardDelete}
          />
        ))}
      </section>
      {popup && (
        <Popup onClose={onClosePopup} title={popup.title}>
          {popup.children}
        </Popup>
      )}
    </main>
  );
}

export default Main;
