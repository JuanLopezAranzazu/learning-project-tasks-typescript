import { RawTask } from "../../types/Task";
import { Task } from "./Task";

type TaskListProps = {
  tasks: RawTask[];
};

// Componente para mostrar una lista de notas
export const TaskList = ({ tasks }: TaskListProps) => {
  return (
    <>
      {tasks.map((task, index) => (
        <Task key={index} task={task} />
      ))}
    </>
  );
};
