import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { RawTask, TaskData } from "../../types/Task";
import { TaskForm } from "../../components/tasks/TaskForm";
import { useSelector, useDispatch } from "react-redux";
import { updateTask } from "../../reducers/task";
import { RootAuthState } from "../../reducers/auth";
import { getTask, updateTask as editTask } from "../../services/Task";

// Componente para editar una tarea
export const TaskEdit = () => {
  const [task, setTask] = useState<RawTask>();
  const [loading, setLoading] = useState(true);
  const { id } = useParams<{ id: string }>();
  const { token } = useSelector((state: RootAuthState) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Función para obtener una tarea
  const fetchTask = async () => {
    setLoading(true);
    try {
      const response = await getTask(id, token!);
      setTask(response);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Función para editar una tarea
  const handleEditTaskSubmit = async (id: string, taskData: TaskData) => {
    const response = await editTask(id, taskData, token!);
    if (response) {
      dispatch(updateTask(response));
      navigate("/");
    }
  };

  useEffect(() => {
    fetchTask();
  }, []);

  return (
    <div>
      <h1>Editar Tarea</h1>
      {loading ? (
        <div>Cargando...</div>
      ) : (
        <TaskForm
          onSubmit={(data) => handleEditTaskSubmit(id, data)}
          title={task.title}
          description={task.description}
          priority={task.priority}
        />
      )}
    </div>
  );
};
