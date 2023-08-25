import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";

export const useSkills = () => {
  return useQuery({
    queryKey: ["skills"],
    queryFn: async () => {
      const { data } = await axios.get(
        "http://localhost:8000/skill/getskills",
        { withCredentials: true }
      );
      return data;
    },
  });
};

export const useCreateSkill = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (name) => {
      const { data } = await axios.post(
        "http://localhost:8000/skill/addskill",
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
      await axios.delete(
        `http://localhost:8000/skill/deleteskill/${name}`,
        { withCredentials: true }
      );
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
        `http://localhost:8000/skill/updateskill/${data.id}`,
        { name: data.name },
        { withCredentials: true }
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["skills"] });
    },
  });
};




