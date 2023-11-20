import { axios } from "../../axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import toast from "react-hot-toast";

const url = process.env.REACT_APP_API_ENDPOINT;

export const useEducation = (userId) => {
  return useQuery({
    queryKey: ["education", userId],
    queryFn: async () => {
      const { data } = await axios.get(`${url}/education/get/${userId}`);
      return data;
    },
    onSuccess: (data) => {},
  });
};

export const useCreateEducation = (userId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data) => {
      await axios.post(`${url}/education/add/`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["education", userId] });
      toast.success("Education Added Successfully");
    },
  });
};

export const useDeleteEducation = (userId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id) => {
      await axios.delete(`${url}/education/delete/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["education", userId]);
      toast.success("Education Deleted Successfully");
    },
  });
};
