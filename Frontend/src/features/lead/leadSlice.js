import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createLead, getAllLeads, updateLeadStatus } from "./leadService";

const initialState = {
  leads: [],
  loading: false,
  error: null,
};

export const create = createAsyncThunk(
  "leads/create",
  async (credentials, thunkAPI) => {
    try {
      return await createLead(credentials);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message || "Failed to create Lead"
      );
    }
  }
);

export const getLeads = createAsyncThunk("leads/all", async (_, thunkAPI) => {
  try {
    return await getAllLeads();
  } catch (error) {
    return thunkAPI.rejectWithValue(
      error?.response?.data?.message || "Failed to fetch Leads"
    );
  }
});

export const updateStatus = createAsyncThunk(
  "leads/update",
  async ({id, ...credentials}, thunkAPI) => {
    try {
      return await updateLeadStatus(id, credentials);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message || "Failed to update Lead Status"
      );
    }
  }
);

const leadSlice = createSlice({
  name: "lead",
  initialState,
  extraReducers: (builder) => {
    builder
    // CREATE
    .addCase(create.pending, (state) => {
        state.loading = true;
        state.error = null
    })
    .addCase(create.fulfilled, (state, action) => {
        state.loading = false;
        state.leads.push(action.payload.data.lead);
    })
    .addCase(create.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
    })

    // GET LEADS
    .addCase(getLeads.pending, (state) => {
        state.loading = true;
        state.error = null;
    })
    .addCase(getLeads.fulfilled, (state, action) => {
        state.loading = false;
        state.leads = action.payload.data.leads;
    })
    .addCase(getLeads.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload
    })

    // UPDATE
    .addCase(updateStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
    })
    .addCase(updateStatus.fulfilled, (state, action) => {
        state.loading = false;
        const update = action.payload.data.lead;
        state.leads = state.leads.map((l) => l._id === update._id ? update : l );
    })
    .addCase(updateStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload
    })
  },
});

export default leadSlice.reducer;