import "./ModalWithForm.css";

function ModalWithForm({
  title,
  isOpen,
  onClose,
  onSubmit,
  children,
  buttonText,
}) {
  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      {" "}
      <div className="modal__container">
        {" "}
        <button className="modal__close" onClick={onClose} type="button">
          ×{" "}
        </button>
        <h2 className="modal__title">{title}</h2>
        <form className="modal__form" onSubmit={onSubmit}>
          {children}

          <button className="modal__submit" type="submit">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
