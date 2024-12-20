import axios from "axios";

// Create Post Action Creator
export const createPost = (myData) => async (dispatch) => {
  try {
    const { data } = await axios.post(
      "https://yopex-api.tabaani.co/post/",
      myData,
      
    );

    console.log(data);
    dispatch({
      type: "createPost",
      payload: data,
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};

// Get Feed Posts Action Creator
export const getFeedPosts =
  (categories = "") =>
  async (dispatch, getState) => {
    try {
      const token = getState().Auth.token;
      console.log(token);
      let url = "https://yopex-api.tabaani.co/post/posts";
      if (categories !== "") {
        url += `?categories=${categories}`;
      }
      const { data } = await axios.get(url, );
      console.log("data:", data);
      dispatch({
        type: "getFeedPosts",
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };

// getUserPosts Action Creator
export const getUserPosts = (userId) => async (dispatch) => {
  try {
    const response = await axios.get(
      `https://yopex-api.tabaani.co/post/${userId}`,
      
    );

    dispatch({
      type: "getUserPosts",
      payload: response.data,
    });
    console.log("responseUser", response);
  } catch (error) {
    console.log(error);
  }
};

export const deletePost = (postId) => async (dispatch) => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user._id;

    if (!postId) {
      // check if postId is undefined
      throw new Error("Post ID is missing");
    }
    const response = await axios.delete(
      `https://yopex-api.tabaani.co/post/${postId}`,
      {
        headers: {
          userId: userId,
        },
        
      }
    );
    console.log("response", response);

    dispatch({
      type: "deletePost",
      payload: postId,
    });
  } catch (error) {
    console.log(error);
  }
};

// Like Post Action Creator
export const likePost = (postId) => async (dispatch) => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user._id;

    const response = await axios.patch(
      `https://yopex-api.tabaani.co/post/${postId}/like`,
      {
        userId,
      },
      
    );
    console.log(response);
    console.log(postId);
    dispatch({
      type: "updatePostLikes",
      payload: response.data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const EditPost = (postId, updates) => async (dispatch) => {
  try {
    const response = await axios.put(
      `https://yopex-api.tabaani.co/post/${postId}`,
      updates,
      
    );

    dispatch({
      type: "editPost",
      payload: response.data,
    });
  } catch (error) {
    console.log(error);
  }
};
