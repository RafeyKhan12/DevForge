import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getUser, getAllUsers } from "./usersService";

const initialState = {
    users: [],
    user: null,
    loading: false,
    error: null
};

export const getUserThunk = createAsyncThunk("users/get-user", async (id, thunkAPI) => {
    try {
        return await getUser(id)
    } catch (error) {
        return thunkAPI.rejectWithValue(error?.response?.data?.message || "Failed to fetch user")
    }
});

export const getAllUsersThunk = createAsyncThunk("users/get-all-users", async (_, thunkAPI) => {
    try {
        return await getAllUsers();
    } catch (error) {
        return thunkAPI.rejectWithValue(error?.response?.data?.message || "Failed to fetch users list")
    }
})

const userSlice = createSlice({
    name: "user",
    initialState,
    extraReducers: (builder) => {
        builder
        // GET USER
        .addCase(getUserThunk.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(getUserThunk.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload.data.user;
        } )
        .addCase(getUserThunk.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload
        })
        // GET ALL USERS
        .addCase(getAllUsersThunk.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(getAllUsersThunk.fulfilled, (state, action) => {
            state.loading = false;
            state.users = action.payload.data.allUsers;
        })
        .addCase(getAllUsersThunk.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload
        })
    }
});

export default userSlice.reducer