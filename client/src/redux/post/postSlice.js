import { postService } from "./postService";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const createPost = createAsyncThunk(
  "posts/create",
  async (post, { rejectWithValue }) => {
    try {
      const data = await postService.createPost(post);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getFeedPosts = createAsyncThunk(
  "posts/getFeed",
  async (category, { rejectWithValue }) => {
    try {
      const data = await postService.getFeedPosts(category);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getUserPosts = createAsyncThunk(
  "posts/getUser",
  async (userId, { rejectWithValue }) => {
    try {
      const data = await postService.getUserPosts(userId);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deletePost = createAsyncThunk(
  "posts/delete",
  async (postId, userId, { rejectWithValue }) => {
    try {
      const data = await postService.deletePost(postId, userId);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const likePost = createAsyncThunk(
  "posts/like",
  async (postId, userId, { rejectWithValue }) => {
    try {
      const data = await postService.likePost(postId, userId);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const editPost = createAsyncThunk(
  "posts/edit",
  async (postId, userId, { rejectWithValue }) => {
    try {
      const data = await postService.editPost(postId, userId);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  posts: [],
  feedPosts: [],
  userPosts: [],
  likedPosts: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

const postSlice = createSlice({
  name: "post",
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
      .addCase(createPost.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.posts.unshift(action.payload);
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(createPost.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.payload;
      });

    builder
      .addCase(getFeedPosts.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getFeedPosts.fulfilled, (state, action) => {
        state.feedPosts = action.payload;
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(getFeedPosts.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.payload;
      });

    builder
      .addCase(getUserPosts.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getUserPosts.fulfilled, (state, action) => {
        state.userPosts = action.payload;
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(getUserPosts.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.payload;
      });

    builder
      .addCase(deletePost.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        const deletedPostId = action.payload.id;

        state.userPosts = state.userPosts.filter(
          (item) => item.id !== deletedPostId
        );

        state.posts = state.posts.filter((item) => item.id !== deletedPostId);

        state.feedPosts = state.feedPosts.filter(
          (item) => item.id !== deletedPostId
        );

        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.payload;
      });

    builder
      .addCase(likePost.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(likePost.fulfilled, (state, action) => {
        state.likedPosts = action.payload;
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(likePost.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.payload;
      });

    builder
      .addCase(editPost.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(editPost.fulfilled, (state, action) => {
        const editedPostId = action.payload.id;

        state.userPosts = state.userPosts.map((item) =>
          item.id === editedPostId ? action.payload : item
        );

        state.posts = state.posts.map((item) =>
          item.id === editedPostId ? action.payload : item
        );

        state.feedPosts = state.feedPosts.map((item) =>
          item.id === editedPostId ? action.payload : item
        );

        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(editPost.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.payload;
      });
  },
});

export const { reset } = postSlice.actions;
export default postSlice.reducer;
