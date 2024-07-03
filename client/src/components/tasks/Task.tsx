import { Link } from "react-router-dom";
import { RawTask } from "../../types/Task";
import { useDispatch, useSelector } from "react-redux";
import { RootAuthState } from "../../reducers/auth";
import { removeTask } from "../../reducers/task";
import { deleteTask } from "../../services/Task";

type TaskProps = {
  task: RawTask;
};

// Componente para mostrar la información de una nota
export const Task = ({ task }: TaskProps) => {
  const { token } = useSelector((state: RootAuthState) => state.auth);
  const dispatch = useDispatch();

  // Función para eliminar una tarea
  const handleClickRemove = async (taskId: string) => {
    const response = await deleteTask(taskId, token!);
    if (response) {
      dispatch(removeTask(taskId));
    }
  };

  return (
    <div>
      <Link to={`/tasks/edit/${task._id}`}>
        <h1>{task.title}</h1>
      </Link>
      <p>{task.description}</p>
      <p>{task.priority}</p>
      <button type="button" onClick={() => handleClickRemove(task._id)}>
        Eliminar
      </button>
    </div>
  );
};
