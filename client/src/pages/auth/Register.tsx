import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserData } from "../../types/User";
import { registerUser } from "../../services/Auth";

type FormData = {
  password: string;
} & UserData;

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
};

// Componente para registrar un usuario
export const Register = () => {
  const [formValues, setFormValues] = useState<FormData>(initialValues);
  const [formErrors, setFormErrors] = useState<FormData>(initialValues);
  const navigate = useNavigate();

  // Función para registrar un usuario
  const handleRegisterUserSubmit = async (data: FormData) => {
    const response = await registerUser(data);
    if (response) {
      navigate("/login");
    }
  };

  // Función para manejar los cambios en los inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });

    const errors = { ...formErrors };

    const validEmailRegex = RegExp(
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    );

    switch (name) {
      case "firstName":
        errors.firstName = value.length < 3 ? "El nombre es muy corto" : "";
        break;
      case "lastName":
        errors.lastName = value.length < 3 ? "El apellido es muy corto" : "";
        break;
      case "email":
        errors.email = validEmailRegex.test(value)
          ? ""
          : "El correo es invalido!";
        break;
      case "password":
        errors.password =
          value.length < 6 || value.length > 128
            ? "La contraseña debe ser de 6 a 128 caracteres"
            : "";
        break;
      default:
        break;
    }
    setFormErrors(errors);
  };

  // Función para validar el formulario
  const validateForm = (errors: FormData): boolean => {
    let valid = true;
    Object.values(errors).forEach((val) => val.length > 0 && (valid = false));
    return valid;
  };

  // Función para manejar el envío del formulario
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm(formErrors)) {
      console.log("Formulario inválido");
      return;
    }
    handleRegisterUserSubmit(formValues);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          type="text"
          value={formValues.firstName}
          name="firstName"
          placeholder="Nombre..."
          onChange={handleChange}
          required
        />
        {formErrors.firstName && <span>{formErrors.firstName}</span>}
      </div>
      <div>
        <input
          type="text"
          value={formValues.lastName}
          name="lastName"
          placeholder="Apellido..."
          onChange={handleChange}
          required
        />
        {formErrors.lastName && <span>{formErrors.lastName}</span>}
      </div>
      <div>
        <input
          type="email"
          value={formValues.email}
          name="email"
          placeholder="Correo..."
          onChange={handleChange}
          required
        />
        {formErrors.email && <span>{formErrors.email}</span>}
      </div>
      <div>
        <input
          type="password"
          value={formValues.password}
          name="password"
          placeholder="Contraseña..."
          onChange={handleChange}
          required
        />
        {formErrors.password && <span>{formErrors.password}</span>}
      </div>
      <button type="submit">Iniciar sesion</button>
    </form>
  );
};
