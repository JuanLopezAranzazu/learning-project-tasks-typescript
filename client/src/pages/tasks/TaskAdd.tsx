import { useNavigate } from "react-router-dom";
import { TaskForm } from "../../components/tasks/TaskForm";
import { TaskData } from "../../types/Task";
import { useSelector, useDispatch } from "react-redux";
import { addTask } from "../../reducers/task";
import { RootAuthState } from "../../reducers/auth";
import { createTask } from "../../services/Task";

// Componente para crear una tarea
export const TaskAdd = () => {
  const { token } = useSelector((state: RootAuthState) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Función para crear una tarea
  const handleCreateTaskSubmit = async (data: TaskData) => {
    const response = await createTask(data, token!);
    if (response) {
      dispatch(addTask(response));
      navigate("/");
    }
  };

  return (
    <div>
      <h1>Crear Tarea</h1>
      <TaskForm onSubmit={handleCreateTaskSubmit} />
    </div>
  );
};
