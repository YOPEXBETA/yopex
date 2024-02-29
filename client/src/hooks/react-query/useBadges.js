import { axios } from "../../axios";
import { useMutation, useQuery, useQueryClient } from "react-query";

const url = process.env.REACT_APP_API_ENDPOINT;

export const useBadges = () => {
  return useQuery({
    queryKey: ["badges"],
    queryFn: async () => {
      const { data } = await axios.get(`${url}/badgeType/badgeTypes`);
      return data;
    },
  });
};

export const useDeleteBadge = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      const { data } = await axios.delete(`${url}/badgeType/${id}`);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["badges"] });
    },
  });
};

export const useCreateBadge = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (badgeData) => {
      const { data } = await axios.post(`${url}/badgeType/add`, badgeData);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["badges"] });
    },
  });
};
