import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TaskType } from "../types/Task.type";
import { API_URL, TASKS_URL } from "../config/api.config";

interface TaskState {
  isLoading: boolean;
  error: string | undefined;
  data: TaskType[];
}

const initialState: TaskState = {
  isLoading: false,
  error: undefined,
  data: [],
};

export const fetchTasks = createAsyncThunk(
  "task/fetchTask",
  async (projectId: string | null) => {
    const requestParams = `?projectId=${projectId}`;
    const response = await fetch(
      `${API_URL}/tasks${projectId ? requestParams : ""}`
    );
    const json = await response.json();
    return json;
  }
);

export const createTask = createAsyncThunk(
  "task/createTask",
  async (taskData: Omit<TaskType, "id">) => {
    const date = new Date();
    const response = await fetch(TASKS_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        projectId: taskData.projectId,
        title: taskData.title,
        description: taskData.description,
        status: taskData.status,
        priority: taskData.priority,
        createdAt: date.toISOString(),
      }),
    });
    if (!response.ok) {
      throw new Error("Failed to create task");
    }
    const json = await response.json();
    return json;
  }
);

export const deleteTask = createAsyncThunk(
  "task/deleteTask",
  async (taskId: number) => {
    const response = await fetch(`${TASKS_URL}/${taskId}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Failed to delete task");
    }
    return taskId;
  }
);

export const updateTask = createAsyncThunk(
  "task/updateTask",
  async (taskData: Pick<TaskType, "status" | "id">) => {
    const response = await fetch(`${TASKS_URL}/${taskData.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status: taskData.status,
      }),
    });
    if (!response.ok) {
      throw new Error("Failed to update task status");
    }
    const json = await response.json();
    return json;
  }
);

const TaskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTasks.pending, (state) => {
      if (state.data.length > 0) {
        state.isLoading = true;
      }
    });
    builder.addCase(fetchTasks.fulfilled, (state, action) => {
      state.data = action.payload;
      state.isLoading = false;
    });
    builder.addCase(fetchTasks.rejected, (state, action) => {
      state.error = action.error.message;
      state.isLoading = false;
    });

    // Create Task Handlers
    builder.addCase(createTask.pending, (state) => {
      if (state.data.length === 0) {
        state.isLoading = true;
      }
    });
    builder.addCase(createTask.fulfilled, (state, action) => {
      state.data.push(action.payload);
      state.isLoading = false;
    });
    builder.addCase(createTask.rejected, (state, action) => {
      state.error = action.error.message;
      state.isLoading = false;
    });

    // Delete Task Handlers
    builder.addCase(deleteTask.pending, (state) => {
      if (state.data.length === 0) {
        state.isLoading = true;
      }
    });
    builder.addCase(deleteTask.fulfilled, (state, action) => {
      const taskId = action.payload;
      state.data = state.data.filter((task) => task.id !== taskId);
      state.isLoading = false;
    });
    builder.addCase(deleteTask.rejected, (state, action) => {
      state.error = action.error.message;
      state.isLoading = false;
    });

    // Update Task Handlers
    builder.addCase(updateTask.pending, (state) => {
      if (state.data.length === 0) {
        state.isLoading = true;
      }
    });
    builder.addCase(updateTask.fulfilled, (state, action) => {
      const { id, status } = action.payload;
      const taskToUpdate = state.data.find((task) => task.id === id);
      if (taskToUpdate) {
        taskToUpdate.status = status;
      }
      state.isLoading = false;
    });
    builder.addCase(updateTask.rejected, (state, action) => {
      state.error = action.error.message;
      state.isLoading = false;
    });
  },
});

export default TaskSlice.reducer;

// Export selectors
export const getAllTasks = (state: { task: TaskState }) => state.task.data;
export const getTasksIsLoading = (state: { task: TaskState }) =>
  state.task.isLoading;
export const getTasksError = (state: { task: TaskState }) => state.task.error;

export const getFilteredTasks = (
  state: { task: TaskState },
  statusFilter: string | null
) => {
  const allTasks = getAllTasks(state);
  if (!statusFilter) {
    return allTasks;
  }
  return allTasks.filter((task) => task.status === statusFilter);
};

export const getSearchedTasks = (
  state: { task: TaskState },
  searchQuery: string
) => {
  const allTasks = getAllTasks(state);
  if (!searchQuery.trim()) {
    return allTasks;
  }
  const lowerCaseQuery = searchQuery.toLowerCase();
  return allTasks.filter(
    (task) =>
      task.title.toLowerCase().includes(lowerCaseQuery) ||
      task.description.toLowerCase().includes(lowerCaseQuery)
  );
};

export const getFilteredAndSearchedTasks = (
  state: { task: TaskState },
  statusFilter: string | null,
  searchQuery: string
) => {
  const filteredTasks = getFilteredTasks(state, statusFilter);
  const lowerCaseQuery = searchQuery.toLowerCase();
  if (!searchQuery.trim()) {
    return filteredTasks;
  }
  return filteredTasks.filter(
    (task) =>
      task.title.toLowerCase().includes(lowerCaseQuery) ||
      task.description.toLowerCase().includes(lowerCaseQuery)
  );
};
