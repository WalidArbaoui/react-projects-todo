import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_URL, PROJECTS_URL, TASKS_URL } from "../config/api.config";
import { ProjectType } from "../types/Project.type";

interface ProjectState {
  isLoading: boolean;
  error: string | undefined;
  data: ProjectType[];
}

const initialState: ProjectState = {
  isLoading: false,
  error: undefined,
  data: [],
};

export const fetchProjects = createAsyncThunk(
  "project/fetchProject",
  async () => {
    const response = await fetch(PROJECTS_URL);
    const json = await response.json();
    return json;
  }
);

export const createProject = createAsyncThunk(
  "project/createProject",
  async (projectData: Omit<ProjectType, "id">) => {
    const date = new Date();
    const response = await fetch(PROJECTS_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: projectData.name,
        description: projectData.description,
        createdAt: date.toISOString(),
      }),
    });
    if (!response.ok) {
      throw new Error("Failed to create project");
    }
    const json = await response.json();
    return json;
  }
);

export const deleteProject = createAsyncThunk(
  "project/deleteProject",
  async (projectId: number) => {
    const response = await fetch(`${PROJECTS_URL}/${projectId}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Failed to delete project");
    }
    return projectId;
  }
);

const ProjectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Fetch Projects Handlers
    builder.addCase(fetchProjects.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchProjects.fulfilled, (state, action) => {
      state.data = action.payload;
      state.isLoading = false;
    });
    builder.addCase(fetchProjects.rejected, (state, action) => {
      state.error = action.error.message;
      state.isLoading = false;
    });

    // Create Project Handlers
    builder.addCase(createProject.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(createProject.fulfilled, (state, action) => {
      state.data.push(action.payload); // Add the new project to the list
      state.isLoading = false;
    });
    builder.addCase(createProject.rejected, (state, action) => {
      state.error = action.error.message;
      state.isLoading = false;
    });

    // Delete Project Handlers
    builder.addCase(deleteProject.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteProject.fulfilled, (state, action) => {
      const projectId = action.payload;
      state.data = state.data.filter((project) => project.id !== projectId);
      state.isLoading = false;
    });
    builder.addCase(deleteProject.rejected, (state, action) => {
      state.error = action.error.message;
      state.isLoading = false;
    });
  },
});

export default ProjectSlice.reducer;

// Export selectors
export const getAllProjects = (state: { project: ProjectState }) =>
  state.project.data;
export const getProjectsIsLoading = (state: { project: ProjectState }) =>
  state.project.isLoading;
export const getProjectsError = (state: { project: ProjectState }) =>
  state.project.error;
