export default function Popup(props) {
  const { onClose, title, children } = props;
  return (
    <div className="popup">
      <div className="popup__content">
        <button
          aria-label="Close modal"
          className={`popup__close ${
            !title ? "popup__close_content_image" : ""
          }`}
          type="button"
          onClick={onClose}
        />
        <div
          className={`${title ? "popup__block" : "popup__block_content_image"}`}
        >
          <h3 className="popup__title">{title}</h3>
          {children}
        </div>
      </div>
    </div>
  );
}
