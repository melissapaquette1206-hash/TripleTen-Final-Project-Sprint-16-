import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useForm } from "../../hooks/useForm";

function RegisterModal({ isOpen, onClose, onRegister }) {
  const { values, handleChange } = useForm({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    onRegister(values);
  };

  return (
    <ModalWithForm
      title="Sign Up"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText="Sign Up"
    >
      {" "}
      <input
        name="email"
        type="email"
        required
        placeholder="Email"
        value={values.email}
        onChange={handleChange}
      />
      <input
        name="password"
        type="password"
        required
        placeholder="Password"
        value={values.password}
        onChange={handleChange}
      />
      <input
        name="name"
        type="text"
        required
        placeholder="Username"
        value={values.name}
        onChange={handleChange}
      />
    </ModalWithForm>
  );
}

export default RegisterModal;
