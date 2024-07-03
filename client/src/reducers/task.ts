import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RawTask } from "../types/Task";

type TaskState = {
  tasks: RawTask[];
};

export type RootTaskState = {
  task: TaskState;
};

const initialState: TaskState = {
  tasks: [],
};

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    // Función para establecer las tareas
    setTasks: (state, action: PayloadAction<RawTask[]>) => {
      state.tasks = action.payload;
    },
    // Función para agregar una tarea
    addTask: (state, action: PayloadAction<RawTask>) => {
      state.tasks.push(action.payload);
    },
    // Función para eliminar una tarea
    removeTask: (state, action: PayloadAction<string>) => {
      console.log(action.payload);
      state.tasks = state.tasks.filter((task) => task._id !== action.payload);
    },
    // Función para actualizar una tarea
    updateTask: (
      state,
      action: PayloadAction<{ id: string; updatedTask: RawTask }>
    ) => {
      console.log(action.payload);
      const { id, updatedTask } = action.payload;
      const eventIndex = state.tasks.findIndex((event) => event._id === id);
      if (eventIndex !== -1) {
        state.tasks[eventIndex] = {
          ...state.tasks[eventIndex],
          updatedTask,
        };
      }
    },
  },
});

export const { setTasks, addTask, removeTask, updateTask } = taskSlice.actions;

export default taskSlice.reducer;
