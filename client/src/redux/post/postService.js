import axios from "axios";

const url = "https://yopex-api.tabaani.co";

// Create Post
export const createPost = async (post) => {
  const { data } = await axios.post(`${url}/post/`, post, {
    
  });
  return data;
};

// Get Feed Posts
export const getFeedPosts = async (category = "") => {
  let endpoint = `${url}/post/posts`;
  if (category !== "") endpoint += `?categories=${category}`;
  const { data } = await axios.get(endpoint, {
    
  });
  return data;
};

// getUserPosts
export const getUserPosts = async (userId) => {
  const { data } = await axios.get(`${url}/post/${userId}`, {
    
  });
  return data;
};

export const deletePost = async (postId, userId) => {
  if (!postId) throw new Error("Post ID is missing");
  const { data } = await axios.delete(`${url}/post/${postId}`, {
    headers: {
      userId: userId,
    },
    
  });
  return data;
};

// Like Post
export const likePost = async (postId, userId) => {
  const { data } = await axios.patch(
    `${url}/post/${postId}/like`,
    { userId },
    
  );
  return data;
};

// Edit Post
export const editPost = async (postId, updates) => {
  const { data } = await axios.put(`${url}/post/${postId}`, updates, {
    
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
