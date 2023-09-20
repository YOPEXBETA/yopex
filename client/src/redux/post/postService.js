import axios from "axios";

const url = "http://yopex-api.tabaani.co";

// Create Post
export const createPost = async (post) => {
  const { data } = await axios.post(`${url}/post/`, post, {
    withCredentials: true,
  });
  return data;
};

// Get Feed Posts
export const getFeedPosts = async (category = "") => {
  let endpoint = `${url}/post/posts`;
  if (category !== "") endpoint += `?categories=${category}`;
  const { data } = await axios.get(endpoint, {
    withCredentials: true,
  });
  return data;
};

// getUserPosts
export const getUserPosts = async (userId) => {
  const { data } = await axios.get(`${url}/post/${userId}`, {
    withCredentials: true,
  });
  return data;
};

export const deletePost = async (postId, userId) => {
  if (!postId) throw new Error("Post ID is missing");
  const { data } = await axios.delete(`${url}/post/${postId}`, {
    headers: {
      userId: userId,
    },
    withCredentials: true,
  });
  return data;
};

// Like Post
export const likePost = async (postId, userId) => {
  const { data } = await axios.patch(
    `${url}/post/${postId}/like`,
    { userId },
    { withCredentials: true }
  );
  return data;
};

// Edit Post
export const editPost = async (postId, updates) => {
  const { data } = await axios.put(`${url}/post/${postId}`, updates, {
    withCredentials: true,
  });
  return data;
};

export const postService = {
  createPost,
  getFeedPosts,
  getUserPosts,
  deletePost,
  likePost,
  editPost,
};
