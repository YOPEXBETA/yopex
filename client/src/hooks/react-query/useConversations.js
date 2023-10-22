import { axios } from "../../axios";
import { useMutation, useQuery, useQueryClient } from "react-query";

const url = process.env.REACT_APP_API_ENDPOINT;

export const useConversations = (userId) => {
  return useQuery({
    queryKey: ["conversations", userId],
    queryFn: async () => {
      const { data } = await axios.get(`${url}/conversation/${userId}`);
      return data;
    },
  });
};

export const useMessages = (conversationId) => {
  return useQuery({
    queryKey: ["messages", conversationId],
    queryFn: async () => {
      const { data } = await axios.get(`${url}/messages/${conversationId}`);
      return data;
    },
  });
};

export const useCreateMessage = (conversationId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data) => {
      await axios.post(`${url}/messages/`, { conversationId, ...data }, {});
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["messages", conversationId] }),
  });
};

export const useCreateConversation = (userId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data) => {
      await axios.post(`${url}/conversation/`, data);
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["conversations", userId] }),
  });
};

export const useContestMessages = (conversationId) => {
  return useQuery({
    queryKey: ["messages", conversationId],
    queryFn: async () => {
      const { data } = await axios.get(
        `${url}/messages/contest/${conversationId}`,
        {}
      );
      return data;
    },
  });
};
