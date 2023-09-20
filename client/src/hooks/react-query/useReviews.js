import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";

const url = process.env.URL || "http://yopex-api.tabaani.co";

export const useUserReviews = (userId) => {
  return useQuery({
    queryKey: ["reviews", userId],
    queryFn: async () => {
      const { data } = await axios.get(`${url}/reviews/${userId}`, {
        withCredentials: true,
      });
      return data;
    },
  });
};

export const useAddReviews = (userId) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (review) => {
      await axios.post(`${url}/review/create`, review, {
        withCredentials: true,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["reviews", userId]);
    },
  });
};
