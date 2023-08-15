import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { userService } from "./userService";

export const searchUsers = createAsyncThunk(
  "users/search",
  async (data, { rejectWithValue }) => {
    try {
      const response = await userService.searchUsers(data);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getAllUsers = createAsyncThunk(
  "users/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await userService.getAllUsers();
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getUserFriends = createAsyncThunk(
  "users/getFriends",
  async (data, { rejectWithValue }) => {
    try {
      const response = await userService.getUserFriends(data);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getUserFollowings = createAsyncThunk(
  "users/getFollowers",
  async (data, { rejectWithValue }) => {
    try {
      const response = await userService.getUserFollowings(data);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getSuggestedUsers = createAsyncThunk(
  "users/getSuggested",
  async (data, { rejectWithValue }) => {
    try {
      const response = await userService.getSuggestedUsers(data);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getUserById = createAsyncThunk(
  "users/getUserById",
  async (data, { rejectWithValue }) => {
    try {
      const response = await userService.getUserById(data);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const followUser = createAsyncThunk(
  "users/followUser",
  async (data, { rejectWithValue }) => {
    try {
      const response = await userService.followUser(data);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getBadgesEarnedByUser = createAsyncThunk(
  "users/getBadges",
  async (data, { rejectWithValue }) => {
    try {
      const response = await userService.getBadgesEarnedByUser(data);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getUserStats = createAsyncThunk(
  "users/getStats",
  async (data, { rejectWithValue }) => {
    try {
      const response = await userService.getUserStats(data);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  users: [],
  suggestedUsers: [],
  badges: [],
  friends: [],
  followings: [],
  userProfile: {},
  searchResults: [],
  userStats: [],
  message: "",
  isLoading: false,
  isSuccess: false,
  isError: false,
};

const userSlice = createSlice({
  name: "user",
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
      .addCase(searchUsers.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(searchUsers.fulfilled, (state, action) => {
        state.searchResults = action.payload;
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(searchUsers.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.payload;
      });

    builder
      .addCase(getAllUsers.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.users = action.payload;
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.payload;
      });

    builder
      .addCase(getUserFriends.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getUserFriends.fulfilled, (state, action) => {
        state.friends = action.payload;
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(getUserFriends.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.payload;
      });

    builder
      .addCase(getUserFollowings.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getUserFollowings.fulfilled, (state, action) => {
        state.followings = action.payload;
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(getUserFollowings.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.payload;
      });

    builder
      .addCase(getSuggestedUsers.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getSuggestedUsers.fulfilled, (state, action) => {
        state.suggestedUsers = action.payload;
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(getSuggestedUsers.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.payload;
      });

    builder
      .addCase(getUserById.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getUserById.fulfilled, (state, action) => {
        state.userProfile = action.payload;
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(getUserById.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.payload;
      });

    builder
      .addCase(followUser.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(followUser.fulfilled, (state, action) => {
        state.followings.push(action.payload);
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(followUser.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.payload;
      });

    builder
      .addCase(getBadgesEarnedByUser.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getBadgesEarnedByUser.fulfilled, (state, action) => {
        state.badges = action.payload;
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(getBadgesEarnedByUser.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.payload;
      });

    builder
      .addCase(getUserStats.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getUserStats.fulfilled, (state, action) => {
        state.userStats = action.payload;
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(getUserStats.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.payload;
      });
  },
});

export const { reset } = userSlice.actions;
export default userSlice.reducer;
