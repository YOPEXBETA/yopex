import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";

const url = process.env.URL || "http://199.247.3.38:8000";

// get all the posts
export const usePosts = () => {
  return useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const { data } = await axios.get(`${url}/post/posts`, {
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
      let apiUrl = `${url}/post/posts`;
      if (category !== "") apiUrl += `?categories=${category}`;
      const { data } = await axios.get(apiUrl, {
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
      const { data } = await axios.get(`${url}/post/${userId}`, {
        withCredentials: true,
      });
      return data;
    },
  });
};

// get a bookmarked posts
export const useBookmarkedPosts = (userId) => {
  return useQuery({
    queryKey: ["posts", userId, "bookmarked"],
    queryFn: async () => {
      const { data } = await axios.get(`${url}/post/bookmarks/${userId}`, {
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
      await axios.post(`${url}/post/`, postData, {
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
      await axios.delete(`${url}/post/${postId}`, {
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
      await axios.put(`${url}/post/${postId}`, postData, {
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
        `${url}/post/${postId}/like`,
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
        `${url}/post/share`,
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

export const useBookmarkPost = (userId, postId, category = "") => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      await axios.patch(
        `${url}/post/${userId}/bookmark/${postId}`,
        { userId },
        { withCredentials: true }
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["posts", userId, "bookmarked"],
      });
    },
  });
};
