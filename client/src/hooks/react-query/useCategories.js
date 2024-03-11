import { axios } from "../../axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import toast from "react-hot-toast";

const url = process.env.REACT_APP_API_ENDPOINT;

export const useCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const { data } = await axios.get(`${url}/category/getCategories`);
      return data;
    },
  });
};

export const useCreateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (name) => {
      const { data } = await axios.post(`${url}/category/addCategory`, {
        name,
      });
      return data;
    },

    onSuccess: () => {
      toast.success("Category Added successfully");
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
    onError: () => {
      toast.error("Error Adding Category ");
    },
  });
};

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      await axios.delete(`${url}/category/deleteCategory/${id}`);
    },
    onSuccess: () => {
      toast.success("Category Deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
    onError: () => {
      toast.error("Error Deleting Category ");
    },
  });
};

export const useUpdateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data) => {
      await axios.put(`${url}/category/updateCategory/${data.id}`, {
        name: data.name,
      });
    },
    onSuccess: () => {
      toast.success("Category Updated successfully");
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
    onError: () => {
      toast.error("Error Updating Category");
    },
  });
};

export const usePostsByCategory = (category) => {
  return useQuery({
    queryKey: ["posts", category],
    queryFn: async () => {
      let url = `${url}/post/posts`;
      if (category !== "") url += `?categories=${category}`;
      const { data } = await axios.get(url);
      return data;
    },
  });
};

export const useLikePost = (currentPost, posts, userId, category) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      await axios.patch(`${url}/post/${currentPost._id}/like`, { userId });
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
      await axios.patch(`${url}/post/share`, {
        postId: currentPost._id,
        userId,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["posts", category],
      });
    },
  });
};
