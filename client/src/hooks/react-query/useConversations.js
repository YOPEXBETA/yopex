import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";

const url = process.env.URL || "http://localhost:8000";

export const useConversations = (userId) => {
  return useQuery({
    queryKey: ["conversations", userId],
    queryFn: async () => {
      const { data } = await axios.get(`${url}/conversation/${userId}`, {
        withCredentials: true,
      });
      return data;
    },
  });
};

export const useMessages = (conversationId) => {
  return useQuery({
    queryKey: ["messages", conversationId],
    queryFn: async () => {
      const { data } = await axios.get(`${url}/messages/${conversationId}`, {
        withCredentials: true,
      });
      return data;
    },
  });
};

// const response = await axios.post(
//   `http://localhost:8000/messages/`,
//   { conversationId, message, sender },
//   {
//     withCredentials: true,
//   }
// );

export const useCreateMessage = (conversationId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data) => {
      await axios.post(
        `${url}/messages/`,
        { conversationId, ...data },
        {
          withCredentials: true,
        }
      );
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["messages", conversationId] }),
  });
};

export const useCreateConversation = (userId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data) => {
      await axios.post(`${url}/conversation/`, data, {
        withCredentials: true,
      });
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["conversations", userId] }),
  });
};


export const useContestMessages = (conversationId) => {
  return useQuery({
    queryKey: ["messages", conversationId],
    queryFn: async () => {
      const { data } = await axios.get(`${url}/messages/contest/${conversationId}`, {
        withCredentials: true,
      });
      return data;
    },
  });
};