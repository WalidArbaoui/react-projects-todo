import { configureStore } from "@reduxjs/toolkit";
import TaskReducer from "./TaskSlice";
import ProjectReducer from "./ProjectSlice";

export const store = configureStore({
  reducer: {
    task: TaskReducer,
    project: ProjectReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
