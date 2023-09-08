import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";

//const url = "http://localhost:8000/job";

const url = process.env.URL || "http://localhost:8000";

export const useJobs = () => {
  return useQuery({
    queryKey: ["jobs"],
    queryFn: async () => {
      const { data } = await axios.get(`${url}/job/all`);
      console.log("fff", data);
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
      queryClient.invalidateQueries({ queryKey: ['jobs'] });
    },
  });
};


export const useAppliers = (job) => {
  return useQuery({
    queryKey: ["appliers", job._id],
    queryFn: async () => {
      const { data } = await axios.get(`${url}/job/jobs/${job._id}/appliers`);
      return data;
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
    queryKey: ["accepted/appliers", job._id],
    queryFn: async () => {
      const { data } = await axios.get(
        `${url}/job/jobs/${job._id}/accepted-appliers`
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
      queryClient.invalidateQueries(["accepted/appliers", job._id]);
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
