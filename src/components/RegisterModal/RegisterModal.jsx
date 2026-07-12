import { useEffect, useState } from "react";

import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useForm } from "../../hooks/useForm";
import "./RegisterModal.css";

function RegisterModal({ isOpen, onClose, onRegister, onLoginClick }) {
  const { values, handleChange, setValues } = useForm({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [serverError, setServerError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateName = (name) => {
    const trimmedName = name.trim();

    if (!trimmedName) {
      return "Please enter your name.";
    }

    if (trimmedName.length < 2) {
      return "Name must be at least 2 characters.";
    }

    return "";
  };

  const validateEmail = (email) => {
    const trimmedEmail = email.trim();

    if (!trimmedEmail) {
      return "Please enter your email.";
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(trimmedEmail)) {
      return "Please enter a valid email address.";
    }

    return "";
  };

  const validatePassword = (password) => {
    if (!password) {
      return "Please enter a password.";
    }

    if (password.length < 8) {
      return "Password must be at least 8 characters.";
    }

    return "";
  };

  const validateForm = () => {
    const nextErrors = {
      name: validateName(values.name),
      email: validateEmail(values.email),
      password: validatePassword(values.password),
    };

    setErrors(nextErrors);

    return !nextErrors.name && !nextErrors.email && !nextErrors.password;
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    handleChange(event);
    setServerError("");

    setErrors((currentErrors) => ({
      ...currentErrors,
      [name]:
        name === "name"
          ? validateName(value)
          : name === "email"
            ? validateEmail(value)
            : validatePassword(value),
    }));
  };

  const resetForm = () => {
    setValues({
      name: "",
      email: "",
      password: "",
    });

    setErrors({
      name: "",
      email: "",
      password: "",
    });

    setServerError("");
    setIsSubmitting(false);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleSwitchToLogin = () => {
    resetForm();
    onLoginClick();
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setServerError("");

    Promise.resolve(
      onRegister({
        name: values.name.trim(),
        email: values.email.trim(),
        password: values.password,
      }),
    )
      .catch((err) => {
        console.error("Registration failed:", err);

        setServerError(err?.message || "Unable to register. Please try again.");
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  useEffect(() => {
    if (!isOpen) {
      resetForm();
    }
  }, [isOpen]);

  const isValid =
    Boolean(values.name.trim()) &&
    Boolean(values.email.trim()) &&
    Boolean(values.password) &&
    !validateName(values.name) &&
    !validateEmail(values.email) &&
    !validatePassword(values.password);

  return (
    <ModalWithForm
      title="Sign up"
      isOpen={isOpen}
      onClose={handleClose}
      onSubmit={handleSubmit}
      buttonText={isSubmitting ? "Signing up..." : "Sign up"}
      isValid={isValid && !isSubmitting}
      serverError={serverError}
      secondaryText="or"
      secondaryButtonText="Sign in"
      onSecondaryClick={handleSwitchToLogin}
    >
      <label className="register-modal__label" htmlFor="register-email">
        Email
      </label>

      <input
        className={`register-modal__input ${
          errors.email ? "register-modal__input_type_error" : ""
        }`}
        id="register-email"
        name="email"
        type="email"
        placeholder="Enter email"
        required
        autoComplete="email"
        value={values.email}
        onChange={handleInputChange}
        aria-invalid={Boolean(errors.email)}
        aria-describedby="register-email-error"
      />

      <span
        className="register-modal__error"
        id="register-email-error"
        aria-live="polite"
      >
        {errors.email}
      </span>

      <label className="register-modal__label" htmlFor="register-password">
        Password
      </label>

      <input
        className={`register-modal__input ${
          errors.password ? "register-modal__input_type_error" : ""
        }`}
        id="register-password"
        name="password"
        type="password"
        placeholder="Enter password"
        required
        minLength={8}
        autoComplete="new-password"
        value={values.password}
        onChange={handleInputChange}
        aria-invalid={Boolean(errors.password)}
        aria-describedby="register-password-error"
      />

      <span
        className="register-modal__error"
        id="register-password-error"
        aria-live="polite"
      >
        {errors.password}
      </span>

      <label className="register-modal__label" htmlFor="register-name">
        Username
      </label>

      <input
        className={`register-modal__input ${
          errors.name ? "register-modal__input_type_error" : ""
        }`}
        id="register-name"
        name="name"
        type="text"
        placeholder="Enter your username"
        required
        minLength={2}
        autoComplete="name"
        value={values.name}
        onChange={handleInputChange}
        aria-invalid={Boolean(errors.name)}
        aria-describedby="register-name-error"
      />

      <span
        className="register-modal__error"
        id="register-name-error"
        aria-live="polite"
      >
        {errors.name}
      </span>
    </ModalWithForm>
  );
}

export default RegisterModal;
