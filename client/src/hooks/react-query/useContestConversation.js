import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";

const url = process.env.URL || "http://199.247.3.38:8000";

export const useCreateContestConversation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data) => {
      await axios.post(`${url}/contestconversation/`, data, {
        withCredentials: true,
      });
    },
  });
};

export const useJoinContestConversation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data) => {
      await axios.post(`${url}/contestconversation/join`, data, {
        withCredentials: true,
      });
    },
  });
};

export const useGetContestConversation = (contestId) => {
  return useQuery(
    ["contestconversation", contestId],
    async () => {
      const { data } = await axios.get(
        `${url}/contestconversation/${contestId}`,
        {
          withCredentials: true,
        }
      );
      return data;
    },
    {
      enabled: !!contestId,
    }
  );
};
