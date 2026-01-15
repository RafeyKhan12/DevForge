import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createService, updateService, deleteService, getService, getAllServices } from "./servicesService";

const initialState = {
    services: [],
    service: null,
    loading: false,
    error: null
};

export const createServiceThunk = createAsyncThunk("services/create", async (credentials, thunkAPI) => {
    try {
        return await createService(credentials)
    } catch (error) {
        return thunkAPI.rejectWithValue(error?.response?.data?.message || "Failed creating service");
    }
})

export const editServiceThunk = createAsyncThunk("services/edit", async ({id, ...credentials}, thunkAPI) => {
    try {
        return await updateService(id, credentials)
    } catch (error) {
        return thunkAPI.rejectWithValue(error?.response?.data?.message || "Failed to edit service")
    }
});

export const deleteServiceThunk = createAsyncThunk("services/delete", async (id, thunkAPI) => {
    try {
        return await deleteService(id)
    } catch (error) {
        return thunkAPI.rejectWithValue(error?.response?.data?.message || "Failed to delete the service")
    }
});

export const getServiceThunk = createAsyncThunk("services/single", async (id, thunkAPI) => {
    try {
        return await getService(id)
    } catch (error) {
        return thunkAPI.rejectWithValue(error?.response?.data?.message || "Failed to fetch service")
    }
});

export const getAllServicesThunk = createAsyncThunk("services/all", async (_, thunkAPI) => {
    try {
        return await getAllServices()
    } catch (error) {
        return thunkAPI.rejectWithValue(error?.response?.data?.message || "Failed to fetch services list")
    }
})

const serviceSlice = createSlice({
    name: "service",
    initialState,
    extraReducers: (builder) => {
      builder
      // CREATE SERVICE
      .addCase(createServiceThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createServiceThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.services.push(action.payload.data.service);
      })
      .addCase(createServiceThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload
      })
      // EDIT SERVICE
      .addCase(editServiceThunk.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editServiceThunk.fulfilled, (state, action) => {
        state.loading = false;
        const updated = action.payload.data.updatedService;
        state.services = state.services.map((s) => s._id === updated._id ? updated : s);
        state.service = updated;
      })
      .addCase(editServiceThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // DELETE SERVICE
      .addCase(deleteServiceThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteServiceThunk.fulfilled, (state, action) => {
        state.loading = false;
        const id = action.meta.arg;
        state.services = state.services.filter((s) => s._id !== id);
        if (state.service?._id === id) {
            state.service = null;
        }
      })
      .addCase(deleteServiceThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload
      })
      // GET SERVICE
      .addCase(getServiceThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getServiceThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.service = action.payload.data.service
      })
      .addCase(getServiceThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // GET ALL SERVICES
      .addCase(getAllServicesThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllServicesThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.services = action.payload.data.services;
      })
      .addCase(getAllServicesThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload
      });
    }
    
});

export default serviceSlice.reducer