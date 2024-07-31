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

export const useOrganizations = (organizationpage, organizationQuery) => {
  return useQuery({
    queryKey: ["organizations", organizationpage, organizationQuery],
    queryFn: async () => {
      const { data } = await axios.get(
        `${url}/company/getAllOrganizations?page=${organizationpage}&name=${organizationQuery}`,
        {}
      );
console.log('orgs', data)
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
    mutationFn: async (organizationId) => {
      await axios.post(`${url}/admin/appCompany`, { organizationId });
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

export const useOrganizationById = (organizationId) => {
  return useQuery(
    ["organization", organizationId],
    async () => {
      const { data } = await axios.get(`${url}/company/get/${organizationId}`);
      console.log('org', data)
      return data;
    },
    {
      enabled: !!organizationId,
    }
  );
};

export const useFetchOrganizations = (organizationIds) => {
  return useQuery(
      ["organizations", organizationIds],
      async () => {
        const fetchPromises = organizationIds.map(async (orgId) => {
          const { data } = await axios.get(`${url}/${orgId}`);
          return data;
        });
        const fetchedOrganizations = await Promise.all(fetchPromises);
        return fetchedOrganizations;
      },
      {
        enabled: !!organizationIds.length,
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
    mutationFn: async ({ organizationId, userId, email, roleName }) => {
      try {
        const { data } = await axios.post(`${url}/company/invite`, {
          organizationId,
          userId,
          email,
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

export const useRefuseInvitation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (invitationId) => {
      try {
        const { data } = await axios.delete(`${url}/company/refuse-invitation/${invitationId}`);
        toast.success("Invitation refused successfully");
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

export const useCurrentOrganization = (organizationId) => {
  return useQuery(
      ["organization", organizationId],
      async () => {
        console.log('fetching org')
        const { data } = await axios.get(`${url}/company/getCurrentOrganization/${organizationId}`);
        console.log('org2', data)
        return data;
      },
      {
        enabled: !!organizationId,
      }
  );
};

export const useGetOrganizationNotifications = (organizationId) => {
  return useQuery({
    queryKey: ["organizationNotifications", organizationId],
    queryFn: async () => {
      const { data } = await axios.get(`${url}/company/notifications/${organizationId}`);
      return data;
    },
    enabled: !!organizationId,
  });
};

export const useSeeOrganizationNotifications = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (organizationId) => {
      console.log('idorg', organizationId)
      const { data } = await axios.put(`${url}/company/notifications/see/${organizationId}`);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries("organizationNotifications");
    },
    onError: (error) => {
      toast.error(`Error marking notifications as seen: ${error.response.data.message}`);
      throw new Error(error.response.data.message);
    },
  });
};

export const useEditMemberRole = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ organizationId, memberId, newRole }) => {
      await axios.put(`${url}/company/${organizationId}/${memberId}`, { role: newRole });
    },

  });
};

export const useDeleteMember = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ organizationId, memberId }) => {
      await axios.delete(`${url}/company/${organizationId}/${memberId}`);
    },
  });
};

export const useEditOrganization = (organizationId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (organizationData) => {
      const { data } = await axios.put(`${url}/company/update/${organizationId}`, organizationData);
      return data;
    },
    onSuccess: () => {
      toast.success("Organization updated successfully");
      queryClient.invalidateQueries(["organization", organizationId]);
    },
    onError: (error) => {
      toast.error(`Error updating organization: ${error.response.data.message}`);
    },
  });
};

export const useEditSocialMediaLinks = (organizationId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (socialMediaLinks) => {
      console.log('data', socialMediaLinks)
      const { data } = await axios.put(`${url}/company/update-social-links/${organizationId}`, { socialMediaLinks });
      return data;
    },
    onSuccess: () => {
      toast.success("Social media links updated successfully");
      queryClient.invalidateQueries(["organization", organizationId]);
    },
    onError: (error) => {
      toast.error(`Error updating social media links: ${error.response.data.message}`);
    },
  });
};

export const useGetUserRoleInOrganization = (organizationId, userId) => {
  return useQuery({
    queryKey: ["userRoleInOrganization", organizationId, userId],
    queryFn: async () => {
      const { data } = await axios.get(`${url}/company/getUserRoleInOrganization/${organizationId}/${userId}`);
      return data;
    },
    enabled: !!organizationId && !!userId,
  });
};
