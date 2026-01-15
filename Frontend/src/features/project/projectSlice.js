import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
  createProject,
  editProject,
  deleteProject,
  getAllProjects,
  getProject,
  getClientProject,
} from "./projectService.js";

const initialState = {
  projects: [],
  currentProject: null,
  loading: false,
  error: null,
};

export const createProjectThunk = createAsyncThunk(
  "project/create",
  async (credentials, thunkAPI) => {
    try {
      return await createProject(credentials);
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err?.response?.data?.message || "Failed creating project"
      );
    }
  }
);

export const editProjectThunk = createAsyncThunk(
  "project/edit",
  async ({ id, ...credentials }, thunkAPI) => {
    try {
      return await editProject(credentials, id);
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err?.response?.data?.message || "Failed editing project"
      );
    }
  }
);

export const deleteProjectThunk = createAsyncThunk(
  "project/delete",
  async (id, thunkAPI) => {
    try {
      return await deleteProject(id);
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err?.response?.data?.message || "Failed deleting project"
      );
    }
  }
);

export const getAllProjectsThunk = createAsyncThunk(
  "project/all",
  async (_, thunkAPI) => {
    try {
      return await getAllProjects();
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err?.response?.data?.message || "Failed fetching projects"
      );
    }
  }
);

export const getProjectThunk = createAsyncThunk(
  "project/single",
  async (id, thunkAPI) => {
    try {
      return await getProject(id);
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err?.response?.data?.message || "Failed fetching project"
      );
    }
  }
);

export const getClientProjectThunk = createAsyncThunk(
  "project/client",
  async (_, thunkAPI) => {
    try {
      return await getClientProject();
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err?.response?.data?.message || "Failed fetching client projects"
      );
    }
  }
);

const projectSlice = createSlice({
  name: "project",
  initialState,

  reducers: {
    clearError: (state) => {
      state.error = null;
    },

    setCurrentProject: (state, action) => {
      state.currentProject = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder

      /* CREATE */
      .addCase(createProjectThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProjectThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.projects.push(action.payload.data.project);
      })
      .addCase(createProjectThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* EDIT */
      .addCase(editProjectThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editProjectThunk.fulfilled, (state, action) => {
        state.loading = false;
        const updated = action.payload.data.updatedProject;
        state.projects = state.projects.map((p) =>
          p._id === updated._id ? updated : p
        );
        state.currentProject = updated;
      })
      .addCase(editProjectThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* DELETE */
      .addCase(deleteProjectThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProjectThunk.fulfilled, (state, action) => {
        state.loading = false;

        const id = action.meta.arg;

        state.projects = state.projects.filter((p) => p._id !== id);

        if (state.currentProject?._id === id) {
          state.currentProject = null;
        }
      })
      .addCase(deleteProjectThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* GET ALL */
      .addCase(getAllProjectsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllProjectsThunk.fulfilled, (state, action) => {
        state.loading = false;

        state.projects = action.payload.data.projects;
      })
      .addCase(getAllProjectsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* SINGLE */
      .addCase(getProjectThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProjectThunk.fulfilled, (state, action) => {
        state.loading = false;

        state.currentProject = action.payload.data.project;
      })
      .addCase(getProjectThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* CLIENT */
      .addCase(getClientProjectThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getClientProjectThunk.fulfilled, (state, action) => {
        state.loading = false;

        state.projects = action.payload.data.projects;
      })
      .addCase(getClientProjectThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, setCurrentProject } = projectSlice.actions;

export default projectSlice.reducer;
