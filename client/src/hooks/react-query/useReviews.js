import toast from "react-hot-toast";
import { axios } from "../../axios";
import { useMutation, useQuery, useQueryClient } from "react-query";

const url = process.env.REACT_APP_API_ENDPOINT;

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
      toast.success("Review added successfully");
    },
    onError: () => {
      toast.error("review already exists");
    },
  });
};
