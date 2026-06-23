import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useForm } from "../../hooks/useForm";

function LoginModal({ isOpen, onClose, onLogin, onRegisterClick }) {
  const { values, handleChange } = useForm({
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    onLogin(values);
  };

  return (
    <ModalWithForm
      title="Sign In"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText="Sign In"
    >
      {" "}
      <input
        name="email"
        type="email"
        placeholder="Email"
        required
        value={values.email}
        onChange={handleChange}
      />
      <input
        name="password"
        type="password"
        placeholder="Password"
        required
        value={values.password}
        onChange={handleChange}
      />
      <button type="button" onClick={onRegisterClick}>
        Sign Up
      </button>
    </ModalWithForm>
  );
}

export default LoginModal;
