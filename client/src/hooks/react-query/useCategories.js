import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";

const url = process.env.URL || "http://yopex-api.tabaani.co";

export const useCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const { data } = await axios.get(`${url}/category/getCategories`, {
        withCredentials: true,
      });
      return data;
    },
  });
};

export const useCreateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (name) => {
      const { data } = await axios.post(
        `${url}/category/addCategory`,
        { name },
        { withCredentials: true }
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
};

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      await axios.delete(`${url}/category/deleteCategory/${id}`, {
        withCredentials: true,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
};

export const useUpdateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data) => {
      await axios.put(
        `${url}/category/updateCategory/${data.id}`,
        { name: data.name },
        { withCredentials: true }
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
};

export const usePostsByCategory = (category) => {
  return useQuery({
    queryKey: ["posts", category],
    queryFn: async () => {
      let url = `${url}/post/posts`;
      if (category !== "") url += `?categories=${category}`;
      const { data } = await axios.get(url, {
        withCredentials: true,
      });
      return data;
    },
  });
};

export const useLikePost = (currentPost, posts, userId, category) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      await axios.patch(
        `${url}/post/${currentPost._id}/like`,
        { userId },
        { withCredentials: true }
      );
    },
    onMutate: async (status) => {
      await queryClient.cancelQueries({
        queryKey: ["posts", category],
      });

      const previousTodo = queryClient.getQueryData(["posts", category]);
      let newPosts = [];

      if (status === "like") {
        newPosts = posts.map((item) => {
          if (item._id === currentPost._id) {
            return {
              ...currentPost,
              likes: {
                ...currentPost.likes,
                [userId]: true,
              },
              likesCount: currentPost.likesCount + 1,
            };
          } else {
            return item;
          }
        });
      } else {
        newPosts = posts.map((item) => {
          if (item._id === currentPost._id) {
            const { [userId]: _, ...updatedLikes } = currentPost.likes;
            return {
              ...currentPost,
              likes: {
                ...updatedLikes,
              },
              likesCount: currentPost.likesCount - 1,
            };
          } else {
            return item;
          }
        });
      }

      queryClient.setQueryData(["posts", category], newPosts);
      return { previousTodo };
    },
    onError: (err, context) => {
      queryClient.setQueryData(
        ["posts", context.selectedCategory],
        context.previousTodo
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["posts", category] });
    },
  });
};

export const useSharePost = (currentPost, userId, category) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      await axios.patch(
        `${url}/post/share`,
        { postId: currentPost._id, userId },
        { withCredentials: true }
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["posts", category],
      });
    },
  });
};
