import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";

const url = process.env.URL || "http://199.247.3.38:8000";

export const useBadges = () => {
  return useQuery({
    queryKey: ["badges"],
    queryFn: async () => {
      const { data } = await axios.get(`${url}/badgeType/badgeTypes`, {
        withCredentials: true,
      });
      return data;
    },
  });
};

export const useDeleteBadge = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      const { data } = await axios.delete(`${url}/badgeType/${id}`, {
        withCredentials: true,
      });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["badges"] });
    },
  });
};
