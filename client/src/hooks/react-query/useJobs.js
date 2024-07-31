import toast from "react-hot-toast";
import { axios } from "../../axios";
import { useMutation, useQuery, useQueryClient } from "react-query";

const url = process.env.REACT_APP_API_ENDPOINT;

export const useJobs = (searchQuery, skills, jobType, offerType) => {
  return useQuery({
    queryKey: ["jobs", searchQuery, skills, jobType, offerType],
    queryFn: async () => {
      let query = "";
      if (searchQuery) query += `&search=${searchQuery}`;

      if (skills && skills.length > 0) {
        query += skills.map((skill) => `&skills=${skill}`).join("");
      }

      if (jobType) {
        query += `&jobType=${jobType}`;
      }

      if (offerType) {
        query += `&offerType=${offerType}`;
      }

      const { data } = await axios.get(`${url}/job/all?${query}`);

      return data;
    },
  });
};

export const useJobById = (companyId, searchQuery, skills, jobType, offerType) => {
  return useQuery({
    queryKey: ["jobsById", companyId, searchQuery, skills, jobType, offerType],
    queryFn: async () => {
      // Construct query parameters
      let query = "";
      if (searchQuery) query += `&search=${searchQuery}`;

      if (skills && skills.length > 0) {
        query += skills.map((skill) => `&skills=${skill}`).join("");
      }

      if (jobType) {
        query += `&jobType=${jobType}`;
      }

      if (offerType) {
        query += `&offerType=${offerType}`;
      }

      if (query) {
        query = "?" + query.slice(1);
      }
      // Make the request
      const { data } = await axios.get(`${url}/job/${companyId}?${query}`);

      return data;
    },
    enabled: !!companyId,
  });
};
// get all the posts
export const useJobTypes = () => {
  return useQuery({
    queryKey: ["JobType"],
    queryFn: async () => {
      const { data } = await axios.get(`${url}/JobType/all`);
      return data;
    },
  });
};

export const useOfferTypes = () => {
  return useQuery({
    queryKey: ["OfferType"],
    queryFn: async () => {
      const { data } = await axios.get(`${url}/OfferType/all`);
      return data;
    },
  });
};



export const useCreateJob = (user) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ organizationId, JobData }) => {
      console.log('jobdata', JobData)
      await axios.post(`${url}/job/add`, { organizationId, ...JobData }, {});
    },
    onSuccess: () => {
      toast.success("Job added successfully");
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
      queryClient.invalidateQueries({ queryKey: ["jobsById"] });

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
      queryClient.invalidateQueries({ queryKey: ["jobsById"] });
      toast.success("Job successfully deleted!");
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

export const useAcceptApplier = (jobId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userId) => {
      await axios.put(`${url}/job/jobs/${jobId}/appliers/${userId}/accept`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
      queryClient.invalidateQueries(["appliers"]);
      queryClient.invalidateQueries({
        queryKey: ["accepted/appliers"],
      });
    },
    onSuccess: () => {
      toast.success("Applier accepted successfully");
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
      toast.success("Job Updated successfully!");
    },

    onError: (error) => {
      toast.error(`can't update a job ${error.response.data.message}`);
    },
  });
};
