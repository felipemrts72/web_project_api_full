import { useState, useContext } from 'react';
import { CurrentUserContext } from '../../../../../../../../contexts/CurrentUserContext';

export default function NewCard() {
  const userContext = useContext(CurrentUserContext);
  const { handleAddPlaceSubmit } = userContext;
  const [name, setName] = useState();
  const [link, setLink] = useState();
  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleLinkChange = (event) => {
    setLink(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleAddPlaceSubmit({ name, link });
  };

  return (
    <form
      className="popup__form form"
      id="cards-form"
      noValidate
      onSubmit={handleSubmit}
    >
      <fieldset className="form__input-block">
        <input
          type="text"
          className="form__input"
          id="titulo"
          placeholder="Título"
          required
          minLength="2"
          maxLength="30"
          onChange={handleNameChange}
        />
        <span className="form__error"></span>
      </fieldset>
      <fieldset className="form__input-block">
        <input
          type="url"
          className="form__input"
          id="link"
          placeholder="Link de imagem"
          required
          onChange={handleLinkChange}
        />
        <span className="form__error"></span>
      </fieldset>
      <button type="submit" id="add-submit" className="form__submit">
        Criar
      </button>
    </form>
  );
}
