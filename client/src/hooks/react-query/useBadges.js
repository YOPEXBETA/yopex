import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";

export const useBadges = () => {
  return useQuery({
    queryKey: ["badges"],
    queryFn: async () => {
      const { data } = await axios.get(
        "http://localhost:8000/badgeType/badgeTypes",
        { withCredentials: true }
      );
      return data;
    },
  });
};

export const useDeleteBadge = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      const { data } = await axios.delete(
        `http://localhost:8000/badgeType/${id}`,
        { withCredentials: true }
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["badges"] });
    },
  });
};
