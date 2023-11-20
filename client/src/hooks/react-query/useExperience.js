import { axios } from "../../axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import toast from "react-hot-toast";

const url = process.env.REACT_APP_API_ENDPOINT;

export const useExperience = (userId) => {
  return useQuery({
    queryKey: ["experience", userId],
    queryFn: async () => {
      const { data } = await axios.get(`${url}/experience/get/${userId}`);
      return data;
    },
    onSuccess: (data) => {},
  });
};

export const useCreateExperience = (userId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data) => {
      await axios.post(`${url}/experience/add/`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["experience", userId] });
      toast.success("Experience Added Successfully");
    },
  });
};

export const useDeleteExperience = (userId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id) => {
      await axios.delete(`${url}/experience/delete/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["experience", userId]);
      toast.success("Education Deleted Successfully");
    },
  });
};
