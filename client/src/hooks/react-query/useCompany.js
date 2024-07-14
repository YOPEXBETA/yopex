import { axios } from "../../axios";
import toast from "react-hot-toast";
import { useMutation, useQuery, useQueryClient } from "react-query";

const url = process.env.REACT_APP_API_ENDPOINT;

export const useAdminCompanies = (page) => {
  return useQuery({
    queryKey: ["companies", page],
    queryFn: async () => {
      const { data } = await axios.get(`${url}/admin/Companies?page=${page}`);
      return data;
    },
  });
};

export const useCompanies = (companypage, companyQuery) => {
  return useQuery({
    queryKey: ["companies", companypage, companyQuery],
    queryFn: async () => {
      const { data } = await axios.get(
        `${url}/company/allcompanies?page=${companypage}&name=${companyQuery}`,
        {}
      );

      return data;
    },
  });
};

export const useGetAllSectors = () => {
  return useQuery({
    queryKey: ["sectors"],
    queryFn: async () => {
      const { data } = await axios.get(`${url}/sector/getAll`);
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
      const response = await axios.post(`${url}/create/`, companyData);
      console.log('response' ,response.data)
      return response.data; // Return the response data
    },
    onSuccess: () => {
      toast.success("Company created successfully");
      queryClient.invalidateQueries("companies");
    },
    onError: (error) => {
      toast.error(`Error creating company: ${error.response.data.error.msg}`);
      throw new Error(error.response.data.error.msg); // Throw error to handle it in components if needed
    },
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

/*export const useCompanies = () => {
  return useQuery({
    queryKey: ["companies"],
    queryFn: async () => {
      const { data } = await axios.get(`${url}/company/all`);

      return data;
    },
  });
};*/

export const useDeleteCompany = (companyId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (companyId) => {
      await axios.delete(`${url}/company/${companyId}`);
    },
    onSuccess: () => {
      toast.success("Company deleted successfully");
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

export const useRecentCompanies = () => {
  return useQuery({
    queryKey: ["companies"],
    queryFn: async () => {
      const { data } = await axios.get(`${url}/company/Recentcompanies`, {});
      return data;
    },
  });
};

export const useSendInvitation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ organizationId, userId, roleName }) => {
      try {
        const { data } = await axios.post(`${url}/company/invite`, {
          organizationId,
          userId,
          roleName,
        });

        toast.success("Invitation sent successfully");
        return data;
      } catch (error) {
        toast.error(`Error sending invitation: ${error.response.data.message}`);
        throw new Error(error.response.data.message);
      }
    },
    onError: (error) => {
      console.error("Error sending invitation:", error);
    },
  });
};

export const useAcceptInvitation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (invitationId) => {
      try {
        const { data } = await axios.post(`${url}/company/accept-invitation/${invitationId}`);

        toast.success("Invitation accepted successfully");
        // Optionally invalidate relevant queries if needed
        // queryClient.invalidateQueries([...]);
        return data;
      } catch (error) {
        toast.error(`Error accepting invitation: ${error.response.data.message}`);
        throw new Error(error.response.data.message);
      }
    },
    onError: (error) => {
      console.error("Error accepting invitation:", error);
    },
  });
};

export const useInvitationById = (invitationId) => {
  return useQuery(
      ["invitation", invitationId],
      async () => {
        const { data } = await axios.get(`${url}/company/getInvitationById/${invitationId}`);
        console.log('inv', data)
        return data;
      },
      {
        enabled: !!invitationId,
      }
  );
};

