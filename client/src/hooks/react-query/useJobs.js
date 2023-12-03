import toast from "react-hot-toast";
import { axios } from "../../axios";
import { useMutation, useQuery, useQueryClient } from "react-query";

//const url = "https://yopex-api.tabaani.co/job";

const url = process.env.REACT_APP_API_ENDPOINT;

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
      const { data } = await axios.get(`${url}/job/${companyId}`);
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
      await axios.post(`${url}/job/add`, { companyId, ...JobData }, {});
    },
    onSuccess: () => {
      toast.success("Job added successfully");
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
      toast.success("job created successfully!");
    },
    onError: (error) => {
      toast.error(`can't create a job ${error.response.data.message}`);
    },
  });
};

export const useDeleteJob = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (jobId) => {
      await axios.delete(`${url}/job/${jobId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
    },
    onError: (error) => {
      toast.error(`${error.response.data.message}`);
    },
  });
};

export const useAppliers = (jobId) => {
  return useQuery({
    queryKey: ["appliers"],
    queryFn: async () => {
      const { data } = await axios.get(`${url}/job/jobs/${jobId}/appliers`);
      return data;
    },
    onError: (error) => {
      toast.error(`${error.response.data.message}`);
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
    queryKey: ["accepted/appliers"],
    queryFn: async () => {
      const { data } = await axios.get(
        `${url}/job/jobs/${job}/accepted-appliers`
      );
      return data;
    },
    onError: (error) => {
      toast.error(`${error.response.data.message}`);
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
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
      queryClient.invalidateQueries(["appliers"]);
      queryClient.invalidateQueries({
        queryKey: ["accepted/appliers"],
      });
    },
    onError: (error) => {
      toast.error(`${error.response.data.message}`);
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
      toast.success("You applied for the job!");
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
      queryClient.invalidateQueries({ queryKey: ["appliers"] });
    },
  });
};

export const useEditJob = (jobId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (JobData) => {
      await axios.put(`${url}/job/update/${jobId}`, JobData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["jobs"]);
    },
  });
};
