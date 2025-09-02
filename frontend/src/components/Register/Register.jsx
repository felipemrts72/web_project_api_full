import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../../utils/auth';
import InfoToolTip from '../InfoToolTip/InfoToolTip';

function Register() {
  const [tooltipOpen, setToolTipOpen] = useState(false);
  const [tooltipSuccess, setToolTipSuccess] = useState(false);
  const [tooltipMessage, setToolTipMessage] = useState('');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      await register({ email, password });
      setToolTipSuccess(true);
      setToolTipMessage('Vitória! Você precisa se registrar.');
      setToolTipOpen(true);

      setTimeout(() => {
        setToolTipOpen(false);
        navigate('/login');
      }, 2000);
    } catch {
      console.error('Erro no registro');

      setToolTipSuccess(false);
      setToolTipMessage('Dados inválidos, tente novamente!');
      setToolTipOpen(true);
    }
  }

  return (
    <div className="register">
      <h3 className="register__title">Inscrever-se</h3>
      <form
        className="popup__form form"
        id="register-form"
        noValidate
        onSubmit={handleSubmit}
      >
        <fieldset className="form__input-block">
          <input
            type="email"
            className="form__input form__input_theme_dark"
            required
            placeholder="E-mail"
            minLength="2"
            maxLength="40"
            onChange={handleEmailChange}
          />
        </fieldset>
        <fieldset className="form__input-block">
          <input
            type="password"
            className="form__input form__input_theme_dark"
            required
            placeholder="Senha"
            minLength="6"
            maxLength="14"
            onChange={handlePasswordChange}
          />
        </fieldset>
        <button
          type="submit"
          className="form__submit form__submit_theme_dark"
          id="register-submit"
        >
          Inscrever-se
        </button>
      </form>
      <InfoToolTip
        isOpen={tooltipOpen}
        isSuccess={tooltipSuccess}
        message={tooltipMessage}
        onClose={() => setToolTipOpen(false)}
      />
      <div className="register__signin">
        <p className="register__text">Já é um membro?</p>
        <Link to="/login" className="register__login-link">
          Faça o login
        </Link>
      </div>
    </div>
  );
}

export default Register;
