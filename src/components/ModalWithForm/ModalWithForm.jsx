import { useEffect } from "react";
import "./ModalWithForm.css";

function ModalWithForm({
  title,
  isOpen,
  onClose,
  onSubmit,
  children,
  buttonText,
  isValid = true,
  secondaryText = "",
  secondaryButtonText = "",
  onSecondaryClick,
  serverError = "",
}) {
  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className={`modal ${isOpen ? "modal_opened" : ""}`}
      onMouseDown={handleOverlayClick}
      role="presentation"
    >
      <div
        className="modal__container"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <button
          className="modal__close"
          onClick={onClose}
          type="button"
          aria-label="Close modal"
        />

        <h2 className="modal__title" id="modal-title">
          {title}
        </h2>

        <form className="modal__form" onSubmit={onSubmit} noValidate>
          {children}

          {serverError && (
            <p className="modal__server-error" aria-live="polite">
              {serverError}
            </p>
          )}

          <button className="modal__submit" type="submit" disabled={!isValid}>
            {buttonText}
          </button>
        </form>

        {secondaryButtonText && (
          <p className="modal__secondary">
            {secondaryText}{" "}
            <button
              className="modal__secondary-button"
              type="button"
              onClick={onSecondaryClick}
            >
              {secondaryButtonText}
            </button>
          </p>
        )}
      </div>
    </div>
  );
}

export default ModalWithForm;
