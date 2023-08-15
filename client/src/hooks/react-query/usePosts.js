import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";

// get all the posts
export const usePosts = () => {
  return useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const { data } = await axios.get("http://localhost:8000/post/posts", {
        withCredentials: true,
      });
      return data;
    },
  });
};

// get posts by category
export const usePostsByCategory = (category) => {
  return useQuery({
    queryKey: ["posts", category],
    queryFn: async () => {
      let url = "http://localhost:8000/post/posts";
      if (category !== "") url += `?categories=${category}`;
      const { data } = await axios.get(url, {
        withCredentials: true,
      });
      return data;
    },
  });
};

// get user posts
export const useUserPosts = (userId) => {
  return useQuery({
    queryKey: ["posts", userId],
    queryFn: async () => {
      const { data } = await axios.get(`http://localhost:8000/post/${userId}`, {
        withCredentials: true,
      });
      return data;
    },
  });
};

// create a new post
export const useCreatePost = (category) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (postData) => {
      await axios.post("http://localhost:8000/post/", postData, {
        withCredentials: true,
      });
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["posts", category] }),
  });
};

// delete a post
export const useDeletePost = (userId, category = "") => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (postId) => {
      await axios.delete(`http://localhost:8000/post/${postId}`, {
        headers: { userId: userId },
        withCredentials: true,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts", category] });
      queryClient.invalidateQueries({ queryKey: ["posts", userId] });
    },
  });
};

// edit a post
export const useEditPost = (postId, userId, category = "") => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (postData) => {
      await axios.put(`http://localhost:8000/post/${postId}`, postData, {
        withCredentials: true,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts", category] });
      queryClient.invalidateQueries({ queryKey: ["posts", userId] });
    },
  });
};

// like a post
export const useLikePost = (userId, ownerId, category = "") => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (postId) => {
      await axios.patch(
        `http://localhost:8000/post/${postId}/like`,
        { userId },
        { withCredentials: true }
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["posts", category],
      });
      queryClient.invalidateQueries({
        queryKey: ["posts", ownerId],
      });
    },
  });
};

// share a post
export const useSharePost = (userId, ownerId, category = "") => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (postId) => {
      await axios.patch(
        "http://localhost:8000/post/share",
        { postId, userId },
        { withCredentials: true }
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["posts", category],
      });
      queryClient.invalidateQueries({
        queryKey: ["posts", ownerId],
      });
    },
  });
};
