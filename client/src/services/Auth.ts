import axios from "./../api/axios";
import { handleError } from "../helpers/ErrorHandler";
import { LoginData, UserData } from "../types/User";

// Función para iniciar sesión
export const loginUser = async (loginData: LoginData) => {
  try {
    const response = await axios.post("/auth/login", loginData);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// Función para registrar un usuario
export const registerUser = async (userData: UserData) => {
  try {
    const response = await axios.post("/auth/register", userData);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};
