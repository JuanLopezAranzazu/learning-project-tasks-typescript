import { useNavigate } from "react-router-dom";
import { TaskForm } from "../../components/tasks/TaskForm";
import { TaskData } from "../../types/Task";
import axios from "./../../api/axios";
import { useSelector, useDispatch } from "react-redux";
import { addTask } from "../../reducers/task";
import { RootAuthState } from "../../reducers/auth";

// Componente para crear una tarea
export const TaskAdd = () => {
  const { token } = useSelector((state: RootAuthState) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Función para crear una tarea
  const createTask = async (data: TaskData) => {
    try {
      const response = await axios.post("/tasks", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response?.data);
      dispatch(addTask(response.data));
      navigate("..");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Crear Tarea</h1>
      <TaskForm onSubmit={createTask} />
    </div>
  );
};
