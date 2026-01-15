import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { register, login, logout, refreshToken, getMe } from "./authService.js";

const initialState = {
  user: {
    _id: null,
    username: null,
    email: null,
    role: null
  },
  isAuthenticated: false,
  authCheck: false,
  loading: false,
  error: null,
};

export const registerThunk = createAsyncThunk(
  "auth/register",
  async (credentials, thunkAPI) => {
    try {
      return await register(credentials);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Sign Up failed"
      );
    }
  }
);

export const loginThunk = createAsyncThunk(
  "auth/login",
  async (credentials, thunkAPI) => {
    try {
      return await login(credentials);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Log In failed"
      );
    }
  }
);

export const logoutThunk = createAsyncThunk(
  "auth/logout",
  async (_, thunkAPI) => {
    try {
      return await logout();
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Log Out failed"
      );
    }
  }
);

export const refreshTokenThunk = createAsyncThunk(
  "auth/refresh-token",
  async (_, thunkAPI) => {
    try {
      return await refreshToken();
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Token generation failed"
      );
    }
  }
);

export const getUser = createAsyncThunk("auth/me", async (_, thunkAPI) => {
  try {
    return await getMe();
  } catch (error) {
    return thunkAPI.rejectWithValue(
      error.response?.data?.message || "Info fetching failed"
    );
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: (builder) => {
    builder
      // SIGN UP
      .addCase(registerThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.user.username = null;
        state.user.role = null;
        state.user._id = null;
        state.user.email = null;
        state.isAuthenticated = false;
      })
      .addCase(registerThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
      })

      // LOG IN
      .addCase(loginThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.user.username = action.payload.data.user.username;
        state.user.role = action.payload.data.user.role;
        state.user._id = action.payload.data.user._id;
        state.user.email = action.payload.data.user.email
        state.isAuthenticated = true;
        state.authCheck = true;
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
      })

      // LOG OUT
      .addCase(logoutThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logoutThunk.fulfilled, (state) => {
        state.loading = false;
        state.user.username = null;
        state.user.role = null;
        state.user._id = null;
        state.user.email = null;
        state.isAuthenticated = false;
      })
      .addCase(logoutThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
      })

      // REFRESH TOKEN
      .addCase(refreshTokenThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(refreshTokenThunk.fulfilled, (state) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.authCheck = true;
      })
      .addCase(refreshTokenThunk.rejected, (state, action) => {
        state.loading = false;
        state.user.username = null;
        state.user.role = null;
        state.user._id = null;
        state.user.email = null;
        state.error = action.payload;
        state.isAuthenticated = false;
        state.authCheck = true;
      })

      // GET ME (ADMIN OR CLIENT)
      .addCase(getUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user.username = action.payload.data.user.username;
        state.user.role = action.payload.data.user.role;
        state.user._id = action.payload.data.user._id;
        state.user.email = action.payload.data.user.email;
        state.isAuthenticated = true;
        state.authCheck = true
      })
      .addCase(getUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.user.username = null;
        state.user.role = null;
        state.user._id = null;
        state.user.email = null;
        state.authCheck = true;
      });
  },
});

export default authSlice.reducer;
