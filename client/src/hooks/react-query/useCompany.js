import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";

const url = process.env.URL || "https://yopex-api.tabaani.co";

export const useAdminCompanies = () => {
  return useQuery({
    queryKey: ["companies"],
    queryFn: async () => {
      const { data } = await axios.get(`https://yopex-api.tabaani.co/admin/Companies`, );
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
      await axios.post(`${url}/create/`, companyData, );
    },
    onSuccess: () => queryClient.invalidateQueries("companies"),
  });
};

export const useEditCompany = (companyId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (companyData) => {
      await axios.put(`${url}/company/${companyId}`, companyData, );
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["company", companyId]);
    },
  });
};

export const useCompanies = () => {
  return useQuery({
    queryKey: ["companies"],
    queryFn: async () => {
      const { data } = await axios.get(
        "https://yopex-api.tabaani.co/company/all"
      );

      return data;
    },
  });
};

export const useDeleteCompany = (companyId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (companyId) => {
      await axios.delete(`${url}/company/${companyId}`, );
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
      const { data } = await axios.get(`${url}/${companyId}`, );
      return data;
    },
    {
      enabled: !!companyId,
    }
  );
};
