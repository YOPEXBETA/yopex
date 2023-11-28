import { axios } from "../../axios";
import toast from "react-hot-toast";
import { useMutation, useQuery, useQueryClient } from "react-query";

const url = process.env.REACT_APP_API_ENDPOINT;

export const useAdminCompanies = () => {
  return useQuery({
    queryKey: ["companies"],
    queryFn: async () => {
      const { data } = await axios.get(`${url}/admin/Companies`);
      return data;
    },
  });
};

export const useApproveCompany = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (companyId) => {
      await axios.post(`${url}/admin/appCompany`, { companyId });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["companies"],
      });
    },
  });
};

export const useCreateCompany = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (companyData) => {
      await axios.post(`${url}/create/`, companyData);
    },
    onSuccess: () => queryClient.invalidateQueries("companies"),
  });
};

export const useEditCompany = (companyId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (companyData) => {
      await axios.put(`${url}/company/${companyId}`, companyData);
    },
    onSuccess: () => {
      toast.success("Company updated successfully");
      queryClient.invalidateQueries(["company", companyId]);
    },
    onError: (error) => {
      toast.error(`Error updating company: ${error.response.data.error.msg}`);
    },
  });
};

export const useCompanies = () => {
  return useQuery({
    queryKey: ["companies"],
    queryFn: async () => {
      const { data } = await axios.get(`${url}/company/all`);

      return data;
    },
  });
};

export const useDeleteCompany = (companyId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (companyId) => {
      await axios.delete(`${url}/company/${companyId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["companies"]);
    },
  });
};

export const useCompanyById = (companyId) => {
  return useQuery(
    ["company", companyId],
    async () => {
      const { data } = await axios.get(`${url}/${companyId}`);
      return data;
    },
    {
      enabled: !!companyId,
    }
  );
};
