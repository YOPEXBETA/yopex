import { axios } from "../../axios";
import { useMutation, useQuery, useQueryClient } from "react-query";

const url = process.env.REACT_APP_API_ENDPOINT;

export const useCommentsByPosts = (postId) => {
  return useQuery({
    queryKey: ["comments", postId],
    queryFn: async () => {
      const { data } = await axios.get(`${url}/comment/${postId}`, );
      return data;
    },
  });
};

export const useAddComment = (postId, category, userId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (comment) => {
      const { data } = await axios.post(`${url}/comment/`, comment, );

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

export const useDeleteComment = (postId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ CommentId, postId }) => {
      await axios.delete(`${url}/comment/${CommentId}`, {
        data: { postId },
        
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments"] });
    },
  });
};

export const useEditComment = (commentId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (CommentData) => {
      await axios.put(`${url}/comment/update/${commentId}`, CommentData, );
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["comments"]);
    },
  });
};
