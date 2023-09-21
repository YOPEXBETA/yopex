import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";

const url = process.env.URL || "https://yopex-api.tabaani.co";

export const useCreateContestConversation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data) => {
      await axios.post(`${url}/contestconversation/`, data, );
    },
  });
};

export const useJoinContestConversation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data) => {
      await axios.post(`${url}/contestconversation/join`, data, );
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
          
        }
      );
      return data;
    },
    {
      enabled: !!contestId,
    }
  );
};
