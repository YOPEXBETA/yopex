import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";

const url = process.env.URL || "https://yopex-api.tabaani.co";

export const useSkills = () => {
  return useQuery({
    queryKey: ["skills"],
    queryFn: async () => {
      const { data } = await axios.get(`${url}/skill/getskills`, );
      return data;
    },
  });
};

export const useCreateSkill = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (name) => {
      const { data } = await axios.post(
        `${url}/skill/addskill`,
        { name },
        { withCredentials: true }
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["skills"] });
    },
  });
};

export const useDeleteSkill = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (name) => {
      console.log(name);
      await axios.delete(`${url}/skill/deleteskill/${name}`, );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["skills"] });
    },
  });
};

export const useUpdateSkill = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data) => {
      await axios.put(
        `${url}/skill/updateskill/${data.id}`,
        { name: data.name },
        { withCredentials: true }
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["skills"] });
    },
  });
};
