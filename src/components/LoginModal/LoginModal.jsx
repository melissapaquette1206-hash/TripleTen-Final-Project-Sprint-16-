import { useEffect, useState } from "react";

import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useForm } from "../../hooks/useForm";
import "./LoginModal.css";

function LoginModal({ isOpen, onClose, onLogin, onRegisterClick }) {
  const { values, handleChange, setValues } = useForm({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const [serverError, setServerError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateEmail = (email) => {
    if (!email.trim()) {
      return "Please enter your email.";
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
      return "Please enter a valid email address.";
    }

    return "";
  };

  const validatePassword = (password) => {
    if (!password) {
      return "Please enter your password.";
    }

    if (password.length < 8) {
      return "Password must be at least 8 characters.";
    }

    return "";
  };

  const validateForm = () => {
    const nextErrors = {
      email: validateEmail(values.email),
      password: validatePassword(values.password),
    };

    setErrors(nextErrors);

    return !nextErrors.email && !nextErrors.password;
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    handleChange(event);
    setServerError("");

    setErrors((currentErrors) => ({
      ...currentErrors,
      [name]: name === "email" ? validateEmail(value) : validatePassword(value),
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setServerError("");

    Promise.resolve(
      onLogin({
        email: values.email.trim(),
        password: values.password,
      }),
    )
      .catch((err) => {
        console.error("Login failed:", err);
        setServerError(
          err?.message ||
            "Unable to sign in. Please check your email and password.",
        );
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  const handleClose = () => {
    setValues({
      email: "",
      password: "",
    });
    setErrors({
      email: "",
      password: "",
    });
    setServerError("");
    setIsSubmitting(false);
    onClose();
  };

  useEffect(() => {
    if (!isOpen) {
      setValues({
        email: "",
        password: "",
      });
      setErrors({
        email: "",
        password: "",
      });
      setServerError("");
      setIsSubmitting(false);
    }
  }, [isOpen, setValues]);

  const isValid =
    Boolean(values.email.trim()) &&
    Boolean(values.password) &&
    !validateEmail(values.email) &&
    !validatePassword(values.password);

  return (
    <ModalWithForm
      title="Sign in"
      isOpen={isOpen}
      onClose={handleClose}
      onSubmit={handleSubmit}
      buttonText={isSubmitting ? "Signing in..." : "Sign in"}
      isValid={isValid && !isSubmitting}
      serverError={serverError}
      secondaryText="or"
      secondaryButtonText="Sign up"
      onSecondaryClick={onRegisterClick}
    >
      <label className="login-modal__label" htmlFor="login-email">
        Email
      </label>

      <input
        className={`login-modal__input ${
          errors.email ? "login-modal__input_type_error" : ""
        }`}
        id="login-email"
        name="email"
        type="email"
        placeholder="Enter email"
        required
        autoComplete="email"
        value={values.email}
        onChange={handleInputChange}
        aria-invalid={Boolean(errors.email)}
        aria-describedby="login-email-error"
      />

      <span
        className="login-modal__error"
        id="login-email-error"
        aria-live="polite"
      >
        {errors.email}
      </span>

      <label className="login-modal__label" htmlFor="login-password">
        Password
      </label>

      <input
        className={`login-modal__input ${
          errors.password ? "login-modal__input_type_error" : ""
        }`}
        id="login-password"
        name="password"
        type="password"
        placeholder="Enter password"
        required
        minLength={8}
        autoComplete="current-password"
        value={values.password}
        onChange={handleInputChange}
        aria-invalid={Boolean(errors.password)}
        aria-describedby="login-password-error"
      />

      <span
        className="login-modal__error"
        id="login-password-error"
        aria-live="polite"
      >
        {errors.password}
      </span>
    </ModalWithForm>
  );
}

export default LoginModal;
