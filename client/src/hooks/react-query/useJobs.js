import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";

//const url = "http://yopex-api.tabaani.co/job";

const url = process.env.URL || "http://yopex-api.tabaani.co";

export const useJobs = () => {
  return useQuery({
    queryKey: ["jobs"],
    queryFn: async () => {
      const { data } = await axios.get(`${url}/job/all`);
      return data;
    },
  });
};

export const useJobById = (companyId) => {
  return useQuery(
    ["jobs", companyId],
    async () => {
      const { data } = await axios.get(`${url}/job/${companyId}`, {
        withCredentials: true,
      });
      return data;
    },
    {
      enabled: !!companyId,
    }
  );
};

export const useCreateJob = (user) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ companyId, JobData }) => {
      await axios.post(
        `${url}/job/add`,
        { companyId, ...JobData },
        {
          withCredentials: true,
        }
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
    },
  });
};

export const useDeleteJob = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (jobId) => {
      await axios.delete(`${url}/job/${jobId}`, {
        withCredentials: true,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
    },
  });
};

export const useAppliers = (jobIds) => {
  return useQuery({
    queryKey: ["appliers", jobIds],
    queryFn: async () => {
      const appliersPromises = jobIds?.map(async (jobId) => {
        const { data } = await axios.get(`${url}/job/jobs/${jobId}/appliers`);
        return data;
      });
      const appliersData = await Promise.all(appliersPromises);

      return appliersData;
    },
  });
};

export const useSortAppliers = (job) => {
  return useQuery({
    queryKey: ["appliers", job._id],
    queryFn: async () => {
      const { data } = await axios.get(
        `${url}/job/jobs/${job._id}/sortedappliers`
      );
      return data;
    },
  });
};

export const useAcceptedAppliers = (job) => {
  return useQuery({
    queryKey: ["accepted/appliers", job],
    queryFn: async () => {
      const { data } = await axios.get(
        `${url}/job/jobs/${job}/accepted-appliers`
      );
      return data;
    },
  });
};

export const useAcceptApplier = (job) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userId) => {
      await axios.put(`${url}/job/jobs/${job._id}/appliers/${userId}/accept`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["jobs", job._id]);
    },
  });
};

export const useApplyJob = (job, userId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data) => {
      await axios.put(`${url}/job/jobs/${job._id}/apply/${userId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
    },
  });
};

export const useUnapplyJob = (job, userId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data) => {
      await axios.put(`${url}/job/jobs/${job._id}/unapply/${userId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
    },
  });
};

export const useEditJob = (jobId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (JobData) => {
      await axios.put(`${url}/job/update/${jobId}`, JobData, {
        withCredentials: true,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["jobs"]);
    },
  });
};
