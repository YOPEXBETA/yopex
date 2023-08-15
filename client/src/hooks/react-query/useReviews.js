import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";

export const useUserReviews = (userId) => {
  return useQuery({
    queryKey: ["reviews", userId],
    queryFn: async () => {
      const { data } = await axios.get(
        `http://localhost:8000/reviews/${userId}`,
        {
          withCredentials: true,
        }
      );
      return data;
    },
  });
};

export const useAddReviews = (userId) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (review) => {
      await axios.post(`http://localhost:8000/review/create`, review, {
        withCredentials: true,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["reviews", userId]);
    },
  });
};
