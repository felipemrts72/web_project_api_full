import { useNavigate } from 'react-router-dom';

function Header({ handleLogout, loggedIn }) {
  const navigate = useNavigate();
  const email = localStorage.getItem('userEmail');

  function handleClick() {
    if (loggedIn) {
      handleLogout();
    } else {
      navigate('/login');
    }
  }

  return (
    <header className="header">
      <div className="header__logo">
        <img alt="Ao longo dos Estados Unidos" className="header__logo-item" />
        <div className="header__button-wrapper">
          {loggedIn ? (
            <>
              <button className="header__button" disabled>
                {email}
              </button>
              <button
                className="header__button header__button_type_active"
                onClick={handleClick}
              >
                Sair
              </button>
            </>
          ) : (
            <button className="header__button" onClick={handleClick}>
              Entrar
            </button>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
