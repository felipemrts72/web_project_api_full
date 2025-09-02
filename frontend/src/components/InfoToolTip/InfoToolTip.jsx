import successIcon from '../../images/success.svg';
import errorIcon from '../../images/error.svg';

function InfoToolTip({ isOpen, onClose, isSuccess, message }) {
  if (!isOpen) return null;

  return (
    <>
      <div className="tooltip-container">
        <div className="tooltip-content">
          <img
            src={isSuccess ? successIcon : errorIcon}
            alt={isSuccess ? 'Success' : 'Error'}
          />
          <p className="tooltip-message">{message}</p>
        </div>
      </div>
      <div className="tooltip-overlay" onClick={onClose} />
    </>
  );
}

export default InfoToolTip;
