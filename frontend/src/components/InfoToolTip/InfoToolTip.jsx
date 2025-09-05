import { useEffect } from 'react';
import successIcon from '../../images/success.svg';
import errorIcon from '../../images/error.svg';

function InfoToolTip({
  isOpen,
  onClose,
  isSuccess,
  message,
  autoCloseTime = 3000,
}) {
  useEffect(() => {
    if (!isOpen || !isSuccess) return; // só fecha automaticamente em sucesso

    const timer = setTimeout(() => {
      onClose();
    }, autoCloseTime);

    return () => clearTimeout(timer);
  }, [isOpen, isSuccess, onClose, autoCloseTime]);

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay apenas visual, sem clique */}
      <div className="tooltip-overlay" />

      <div className="tooltip-container">
        <div className="tooltip-content">
          <img
            src={isSuccess ? successIcon : errorIcon}
            alt={isSuccess ? 'Success' : 'Error'}
          />
          <p className="tooltip-message">{message}</p>

          {/* Botão de fechar só aparece em erro */}
          {!isSuccess && (
            <button className="tooltip-close-btn" onClick={onClose}>
              Fechar
            </button>
          )}
        </div>
      </div>
    </>
  );
}

export default InfoToolTip;
