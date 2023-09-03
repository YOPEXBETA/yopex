import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";

const url = process.env.URL || "http://localhost:8000";

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
      await axios.post(`${url}/create/`, companyData, {
        withCredentials: true,
      });
    },
    onSuccess: () => queryClient.invalidateQueries("companies"),
  });
};

export const useEditCompany = (companyId) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (companyData) => {
      await axios.put(`${url}/company/${companyId}`, companyData, {
        withCredentials: true,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["company", companyId]);
    },
  });
}

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
