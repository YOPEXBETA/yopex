import { axios } from "../../axios";
import { useMutation, useQuery, useQueryClient } from "react-query";

const url = process.env.REACT_APP_API_ENDPOINT;

export const useCreateLevel = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (adminDefinedPoints) => {
      await axios.post(`${url}/admin/createLevel`, { adminDefinedPoints });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["levels"] });
    },
  });
};

export const useUpdateLevel = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (level) => {
      const { data } = await axios.put(
        `${url}/admin/updateLevel/${level._id}`,
        { maxScore: level.maxScore }
      );

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["levels"] });
    },
  });
};

export const useGetLevels = () => {
  return useQuery({
    queryKey: ["levels"],
    queryFn: async () => {
      const { data } = await axios.get(`${url}/admin/allLevels`);
      return data;
    },
  });
};

export const useDeleteLevel = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (LevelId) => {
      await axios.delete(`${url}/admin/delLevel/${LevelId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["levels"] });
    },
  });
};
