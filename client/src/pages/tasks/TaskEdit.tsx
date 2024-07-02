import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { RawTask, TaskData } from "../../types/Task";
import { TaskForm } from "../../components/tasks/TaskForm";
import axios from "./../../api/axios";
import { useSelector, useDispatch } from "react-redux";
import { updateTask } from "../../reducers/task";
import { RootAuthState } from "../../reducers/auth";

// Componente para editar una tarea
export const TaskEdit = () => {
  const [task, setTask] = useState<RawTask>();
  const [loading, setLoading] = useState(true);
  const { id } = useParams<{ id: string }>();
  const { token } = useSelector((state: RootAuthState) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Función para obtener una tarea
  const getTask = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`/tasks/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = response?.data;
      console.log(data);
      setTask(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Función para editar una tarea
  const editTask = async (id: string, taskData: TaskData) => {
    try {
      const response = await axios.put(`/tasks/${id}`, taskData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = response?.data;
      console.log(data);
      dispatch(updateTask(data));
      navigate("..");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getTask();
  }, []);

  return (
    <div>
      <h1>Editar Tarea</h1>
      {loading ? (
        <div>Cargando...</div>
      ) : (
        <TaskForm
          onSubmit={(data) => editTask(id, data)}
          title={task.title}
          description={task.description}
          priority={task.priority}
        />
      )}
    </div>
  );
};
