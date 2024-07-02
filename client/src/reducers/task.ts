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
    setTasks: (state, action: PayloadAction<RawTask[]>) => {
      state.tasks = action.payload;
    },
    addTask: (state, action: PayloadAction<RawTask>) => {
      state.tasks.push(action.payload);
    },
    removeTask: (state, action: PayloadAction<string>) => {
      console.log(action.payload);
      state.tasks = state.tasks.filter((event) => event._id !== action.payload);
    },
    updateTask: (
      state,
      action: PayloadAction<{ id: string; updatedEvent: RawTask }>
    ) => {
      console.log(action.payload);
      const { id, updatedEvent } = action.payload;
      const eventIndex = state.tasks.findIndex((event) => event._id === id);
      if (eventIndex !== -1) {
        state.tasks[eventIndex] = {
          ...state.tasks[eventIndex],
          updatedEvent,
        };
      }
    },
  },
});

export const { setTasks, addTask, removeTask, updateTask } = taskSlice.actions;

export default taskSlice.reducer;
