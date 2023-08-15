import { badgeService } from "./badgeService";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getBadgeType = createAsyncThunk(
  "badge/get",
  async (_, { rejectWithValue }) => {
    try {
      const data = await badgeService.getBadgeType();
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addBadge = createAsyncThunk(
  "badge/add",
  async (badgeData, { rejectWithValue }) => {
    try {
      const data = await badgeService.addBadge(badgeData);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  badges: [],
  isSuccess: false,
  isLoading: false,
  isError: false,
  message: "",
};

const badgeSlice = createSlice({
  name: "badge",
  initialState,
  reducers: {
    reset: (state, action) => {
      state.isError = false;
      state.isLoading = false;
      state.isSuccess = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBadgeType.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getBadgeType.fulfilled, (state, action) => {
        state.badges = action.payload;
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(getBadgeType.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.payload;
      });
    builder
      .addCase(addBadge.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(addBadge.fulfilled, (state, action) => {
        state.badges.push(action.payload);
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(addBadge.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.payload;
      });
  },
});

export const { reset } = badgeSlice.actions;
export default badgeSlice.reducer;
