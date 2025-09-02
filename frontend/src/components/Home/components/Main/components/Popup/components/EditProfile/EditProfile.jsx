import { useState, useContext } from 'react';
import { CurrentUserContext } from '../../../../../../../../contexts/CurrentUserContext';

export default function EditProfile() {
  const userContext = useContext(CurrentUserContext);
  const { currentUser, handleUpdateUser } = userContext;

  const [name, setName] = useState(currentUser.name);
  const [description, setDescription] = useState(currentUser.about);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    handleUpdateUser({ name, about: description });
  };
  return (
    <form
      className="popup__form form"
      id="profile-form"
      noValidate
      onSubmit={handleSubmit}
    >
      <fieldset className="form__input-block">
        <input
          type="text"
          className="form__input"
          id="name-input"
          placeholder="Nome"
          required
          minLength="2"
          maxLength="40"
          value={name}
          onChange={handleNameChange}
        />
        <span className="form__error"></span>
      </fieldset>
      <fieldset className="form__input-block">
        <input
          type="text"
          className="form__input"
          id="about-input"
          placeholder="Sobre mim"
          required
          minLength="2"
          maxLength="200"
          value={description}
          onChange={handleDescriptionChange}
        />
        <span className="form__error"></span>
      </fieldset>
      <button type="submit" className="form__submit" id="profile-submit">
        Salvar
      </button>
    </form>
  );
}
