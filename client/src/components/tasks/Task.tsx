import { Link } from "react-router-dom";
import { RawTask } from "../../types/Task";
import axios from "./../../api/axios";
import { useDispatch, useSelector } from "react-redux";
import { removeTask } from "../../reducers/task";
import { RootAuthState } from "../../reducers/auth";

type TaskProps = {
  task: RawTask;
};

// Componente para mostrar la información de una nota
export const Task = ({ task }: TaskProps) => {
  const { token } = useSelector((state: RootAuthState) => state.auth);
  const dispatch = useDispatch();

  // Función para iniciar sesión
  const deleteTask = async (taskId: string) => {
    try {
      const response = await axios.delete(`/tasks/${taskId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(response?.data);
      dispatch(removeTask(taskId));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Link to={`/tasks/edit/${task._id}`}>
        <h1>{task.title}</h1>
      </Link>
      <p>{task.description}</p>
      <p>{task.priority}</p>
      <button type="button" onClick={() => deleteTask(task._id)}>
        Eliminar
      </button>
    </div>
  );
};
