import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Priority } from "../../types/Task";
import { TaskList } from "../../components/tasks/TaskList";
import axios from "./../../api/axios";
import { useSelector, useDispatch } from "react-redux";
import { setTasks } from "../../reducers/task";
import { setToken, setUser } from "../../reducers/auth";
import { RootAuthState } from "../../reducers/auth";
import { RootTaskState } from "../../reducers/task";

// Componente para mostrar y filtrar la lista de tareas
export const Tasks = () => {
  const [selectedPriority, setSelectedPriority] = useState<Priority | "ALL">(
    "ALL"
  );
  const { user, token } = useSelector((state: RootAuthState) => state.auth);
  const { tasks } = useSelector((state: RootTaskState) => state.task);
  console.log(tasks);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fullName = `${user?.firstName} ${user?.lastName}`;

  const handlePriorityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedPriority(e.target.value as Priority | "ALL");
  };

  // Filtrar las tareas por prioridad
  const filteredTasks =
    selectedPriority === "ALL"
      ? tasks
      : tasks.filter((task) => task.priority === selectedPriority);

  // Función para obtener las tareas
  const getTasks = async () => {
    try {
      const response = await axios.get("/tasks/user", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = response?.data;
      console.log(data);
      dispatch(setTasks(data));
    } catch (error) {
      console.error(error);
    }
  };

  // Función para cerrar sesión
  const logoutUser = () => {
    dispatch(setToken(null));
    dispatch(setUser(null));
    navigate("/login");
  };

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <>
      <div>
        <h1>Bienvenido {fullName}</h1>
        <button type="button" onClick={() => navigate("/tasks/add")}>
          Crear Tarea
        </button>
        <button type="button" onClick={logoutUser}>
          Cerrar sesion
        </button>
        <select value={selectedPriority} onChange={handlePriorityChange}>
          <option value="ALL">TODAS</option>
          <option value={Priority.LOW}>{Priority.LOW}</option>
          <option value={Priority.MEDIUM}>{Priority.MEDIUM}</option>
          <option value={Priority.HIGH}>{Priority.HIGH}</option>
        </select>
      </div>
      <TaskList tasks={filteredTasks} />
    </>
  );
};
