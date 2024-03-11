import { axios } from "../../axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import toast from "react-hot-toast";

const url = process.env.REACT_APP_API_ENDPOINT;

export const useSkills = (skillsearchQuery) => {
  return useQuery({
    queryKey: ["skills", skillsearchQuery],
    queryFn: async () => {
      let query = "";

      if (skillsearchQuery) {
        query += `&search=${skillsearchQuery}`;
      }

      const { data } = await axios.get(`${url}/skill/getskills?${query}`);

      return data;
    },
  });
};

export const useCreateSkill = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (name) => {
      const { data } = await axios.post(`${url}/skill/addskill`, { name });
      return data;
    },

    onSuccess: () => {
      toast.success("Skill Added successfully");
      queryClient.invalidateQueries({ queryKey: ["skills"] });
    },
    onError: () => {
      toast.error("Error Adding Skill");
    },
  });
};

export const useDeleteSkill = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (name) => {
      await axios.delete(`${url}/skill/deleteskill/${name}`);
    },
    onSuccess: () => {
      toast.success("Skill Deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["skills"] });
    },
    onError: () => {
      toast.error("Error Deleting Skill");
    },
  });
};

export const useUpdateSkill = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data) => {
      await axios.put(`${url}/skill/updateskill/${data.id}`, {
        name: data.name,
      });
    },
    onSuccess: () => {
      toast.success("Skill Updated successfully");
      queryClient.invalidateQueries({ queryKey: ["skills"] });
    },
    onError: () => {
      toast.error("Error Updating Skill");
    },
  });
};
