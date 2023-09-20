import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { authService } from "./authService";
import Cookies from "js-cookie";

export const register = createAsyncThunk("auth/register", async (data) => {
  try {
    
    const response = await authService.register(data);
    return response;
  } catch (error) {
    throw new Error(error?.response?.data?.error?.msg);
  }
});

export const login = createAsyncThunk("auth/signin", async (data) => {
  try {
    const response = await authService.login(data);
    return response;
  } catch (error) {
    throw new Error(error?.response?.data?.error);
  }
});

export const edit = createAsyncThunk("auth/edit", async (data) => {

  try {
 
    const response = await authService.edit(data);

    return response;
  } catch (error) {
    throw new Error(error?.response?.data?.error);
  }
});

export const getCurrentUser = createAsyncThunk("auth/current", async () => {
  try {
    const response = await authService.getcurrentuser();
    return response;
  } catch (error) {
    throw new Error(error?.response?.data?.error?.msg);
  }
});




const initialState = {
  user:null,
  loading: false,
  error: null,
  success: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state, action) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
    logout: (state, action) => {
      Cookies.remove("accessToken");
      state.user = null;
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
    builder
      .addCase(login.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload;
        state.success = true;
        state.loading = false;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
         state.error = action.error.message;
      });
    builder
      .addCase(edit.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(edit.fulfilled, (state, action) => {
        state.user = action.payload;
        state.success = true;
        state.loading = false;
      })
      .addCase(edit.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
    builder
      .addCase(getCurrentUser.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.success = true;
        state.loading = false;
      })
      .addCase(getCurrentUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { reset, logout } = authSlice.actions;
export default authSlice.reducer;
