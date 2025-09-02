import { useRef, useContext } from 'react';
import { CurrentUserContext } from '../../../../../../../../contexts/CurrentUserContext';

export default function EditAvatar() {
  const userContext = useContext(CurrentUserContext);
  const { handleUpdateAvatar } = userContext;

  const inputValue = useRef();

  function handleInputChange() {
    return inputValue.current.value;
  }
  function handleSubmit(e) {
    e.preventDefault();

    handleUpdateAvatar(handleInputChange());
  }
  return (
    <form
      className="popup__form form"
      id="avatar-form"
      noValidate
      onSubmit={handleSubmit}
    >
      <fieldset className="form__input-block">
        <input
          type="url"
          className="form__input"
          id="avatar-input"
          placeholder="Url da foto"
          required
          minLength="2"
          maxLength="200"
          ref={inputValue}
        />
        <span className="form__error"></span>
      </fieldset>
      <button type="submit" className="form__submit" id="profile-submit">
        Salvar
      </button>
    </form>
  );
}
