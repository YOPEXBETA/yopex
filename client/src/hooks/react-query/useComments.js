import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";

const url = process.env.URL || "http://localhost:8000";

export const useCommentsByPosts = (postId) => {
  return useQuery({
    queryKey: ["comments", postId],
    queryFn: async () => {
      const { data } = await axios.get(`${url}/comment/${postId}`, {
        withCredentials: true,
      });
      return data;
    },
  });
};

export const useAddComment = (postId, category, userId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (comment) => {
      const { data } = await axios.post(`${url}/comment/`, comment, {
        withCredentials: true,
      });

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", postId] });
      queryClient.invalidateQueries({ queryKey: ["posts", category] });
      if (userId) {
        queryClient.invalidateQueries({ queryKey: ["posts", userId] });
      }
    },
  });
};
