import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "./../../api/axios";
import { useDispatch } from "react-redux";
import { setUser, setToken } from "./../../reducers/auth";

type FormValues = {
  email: string;
  password: string;
};

type FormErrors = {
  email: string;
  password: string;
};

const initialValues = {
  email: "",
  password: "",
};

// Componente para iniciar sesión
export const Login = () => {
  const [formValues, setFormValues] = useState<FormValues>(initialValues);
  const [formErrors, setFormErrors] = useState<FormErrors>(initialValues);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Función para iniciar sesión
  const loginUser = async (credentials: FormValues) => {
    try {
      const response = await axios.post("/auth/login", credentials);
      console.log(response?.data);
      const { token, user } = response.data;
      dispatch(setUser(user));
      dispatch(setToken(token));
      navigate("/");
    } catch (error) {
      console.error(error);
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
  const validateForm = (errors: FormErrors): boolean => {
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
    loginUser(formValues);
  };

  return (
    <form onSubmit={handleSubmit}>
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
