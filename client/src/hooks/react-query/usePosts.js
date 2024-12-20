import toast from "react-hot-toast";
import { axios } from "../../axios";
import { useMutation, useQuery, useQueryClient } from "react-query";

const url = process.env.REACT_APP_API_ENDPOINT;

// get all the posts
export const usePosts = () => {
  return useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const { data } = await axios.get(`${url}/post/posts`);
      return data;
    },
  });
};

export const usePostById = (postId) => {
  return useQuery({
    queryKey: ["posts", postId],
    queryFn: async () => {
      const { data } = await axios.get(`${url}/post/single/${postId}`);
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
      const { data } = await axios.get(apiUrl);
      return data;
    },
  });
};

// get user posts
export const useUserPosts = (userId) => {
  return useQuery({
    queryKey: ["posts", userId],
    queryFn: async () => {
      const { data } = await axios.get(`${url}/post/${userId}`);
      return data;
    },
  });
};

// get a bookmarked posts
export const useBookmarkedPosts = (userId) => {
  return useQuery({
    queryKey: ["posts", userId, "bookmarked"],
    queryFn: async () => {
      const { data } = await axios.get(`${url}/post/bookmarks/${userId}`);
      return data;
    },
  });
};

// create a new post
export const useCreatePost = (category, userId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (postData) => {
      await axios.post(`${url}/post/`, postData);
    },
    onSuccess: () => {
      toast.success("Post created successfully");
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
    onError: (error) => {
      toast.error(`${error.response.data.message}`);
    },
  });
};

// delete a post
export const useDeletePost = (userId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (postId) => {
      await axios.delete(`${url}/post/delete/${postId}`, {
        headers: { userId: userId },
      });
    },
    onSuccess: () => {
      toast.success("Post deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["posts", userId] });
    },
    onError: (error) => {
      toast.error(`${error.response.data.message}`);
    },
  });
};

// edit a post
export const useEditPost = (postId, userId, category = "") => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (postData) => {
      await axios.put(`${url}/post/${postId}`, postData);
    },
    onSuccess: () => {
      toast.success("Post updated successfully");
      queryClient.invalidateQueries({ queryKey: ["posts", category] });
      queryClient.invalidateQueries({ queryKey: ["posts", userId] });
    },
    onError: (error) => {
      toast.error(`${error.response.data.message}`);
    },
  });
};

// like a post
export const useLikePost = (userId, ownerId, category = "") => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (postId) => {
      await axios.patch(`${url}/post/${postId}/like`, { userId });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["posts", category],
      });
      queryClient.invalidateQueries({
        queryKey: ["posts", ownerId],
      });
    },
    onError: (error) => {
      toast.error(`${error.response.data.message}`);
    },
  });
};

// share a post
export const useSharePost = (userId, ownerId, category = "") => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (postId) => {
      await axios.patch(`${url}/post/share`, { postId, userId });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["posts", category],
      });
      queryClient.invalidateQueries({
        queryKey: ["posts", ownerId],
      });
    },
    onError: (error) => {
      toast.error(`${error.response.data.message}`);
    },
  });
};

export const useBookmarkPost = (userId, postId, category = "") => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      await axios.patch(`${url}/post/${userId}/bookmark/${postId}`, { userId });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["posts", userId, "bookmarked"],
      });
    },
    onError: (error) => {
      toast.error(`${error.response.data.message}`);
    },
  });
};
