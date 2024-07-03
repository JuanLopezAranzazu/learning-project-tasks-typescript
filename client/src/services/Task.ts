import axios from "./../api/axios";
import { handleError } from "../helpers/ErrorHandler";
import { TaskData } from "../types/Task";

// Función para obtener todas las tareas
export const getTasks = async (token: string) => {
  try {
    const response = await axios.get("/tasks", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// Función para obtener una tarea
export const getTask = async (id: string, token: string) => {
  try {
    const response = await axios.get(`/tasks/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// Función para crear una tarea
export const createTask = async (taskData: TaskData, token: string) => {
  try {
    const response = await axios.post("/tasks", taskData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// Función para actualizar una tarea
export const updateTask = async (
  id: string,
  taskData: TaskData,
  token: string
) => {
  try {
    const response = await axios.put(`/tasks/${id}`, taskData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// Función para eliminar una tarea
export const deleteTask = async (id: string, token: string) => {
  try {
    const response = await axios.delete(`/tasks/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};
