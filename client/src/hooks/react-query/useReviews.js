import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";

const url = process.env.URL || "https://yopex-api.tabaani.co";

export const useUserReviews = (userId) => {
  return useQuery({
    queryKey: ["reviews", userId],
    queryFn: async () => {
      const { data } = await axios.get(`${url}/reviews/${userId}`, );
      return data;
    },
  });
};

export const useAddReviews = (userId) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (review) => {
      await axios.post(`${url}/review/create`, review, );
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["reviews", userId]);
    },
  });
};
