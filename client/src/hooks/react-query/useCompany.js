import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";

const url = "http://localhost:8000";

export const useAdminCompanies = () => {
  return useQuery({
    queryKey: ["companies"],
    queryFn: async () => {
      const { data } = await axios.get(`${url}/admin/Companies`, {
        withCredentials: true,
      });
      return data;
    },
  });
};

export const useApproveCompany = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (companyId) => {
      await axios.post(
        `${url}/admin/appCompany`,
        { companyId },
        { withCredentials: true }
      );
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
      await axios.post("http://localhost:8000/create/", companyData, {
        withCredentials: true,
      });
    },
    onSuccess: () =>
    queryClient.invalidateQueries("companies"),
  });
};

export const useCompanyById = (companyId) => {
  return useQuery(
    ["company", companyId],
    async () => {
      const { data } = await axios.get(`${url}/${companyId}`, {
        withCredentials: true,
      });
      return data;
    },
    {
      enabled: !!companyId,
    }
  );
};
