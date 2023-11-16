import { axios } from "../../axios";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";

const url = process.env.REACT_APP_API_ENDPOINT;

export const useUsers = () => {
  return useQuery("users", async () => {
    const { data } = await axios.get(`${url}/allusers`, {});
    return data;
  });
};

export const useAdminUsers = () => {
  return useQuery({
    queryKey: ["admin/users"],
    queryFn: async () => {
      const { data } = await axios.get(`${url}/admin/Users`);
      return data;
    },
  });
};

export const useUserById = (userId) => {
  return useQuery(
    ["user", userId],
    async () => {
      const { data } = await axios.get(`${url}/${userId}`);
      return data;
    },
    {
      enabled: !!userId,
    }
  );
};

export const useSearchUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (searchQuery) => {
      await axios.get(`${url}/users?search=${searchQuery}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries("users");
    },
  });
};

let balance = 0;

export const usePayment = () => {
  // const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (amount) => {
      const { data } = await axios.post(`${url}/api/payment`, {
        amount: amount,
      });
      return data;
    },
    onSuccess: (data) => {
      console.log(data);
      window.location.href = data.result.link;
      // queryClient.invalidateQueries(["users"]);
    },
  });
};

export const useVerifyPayment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      const { data } = await axios.post(`${url}/api/payment/${id}`, {
        amount: 0,
      });
      return data;
    },
    onSuccess: (data) => {
      console.log(data);
    },
  });
};

export const useFollowUser = (currentUserId, userId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      await axios.put(`${url}/toggleFollow/${userId}`, {
        userId: currentUserId,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["user", userId]);
      queryClient.invalidateQueries(["followers", userId]);
      queryClient.invalidateQueries(["followings", currentUserId]);
    },
    enabled: !!userId,
  });
};

export const useFollowCompany = (currentUserId, companyId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      await axios.put(`${url}/toggleFollowCompany/${companyId}`, {
        userId: currentUserId,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["companies", companyId]); // Invalidate the company data query
    },
    enabled: !!companyId,
  });
};

export const useUserFollowers = (userId) => {
  return useQuery(
    ["followers", userId],
    async () => {
      const { data } = await axios.get(`${url}/find/friends/${userId}`);
      return data;
    },
    {
      enabled: !!userId,
    }
  );
};

export const useUserFollowings = (userId) => {
  return useQuery(
    ["followings", userId],
    async () => {
      const { data } = await axios.get(`${url}/find/followings/${userId}`);
      return data;
    },
    {
      enabled: !!userId,
    }
  );
};

let query = "";

export const useSetquery = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (q) => {
      query = q;
    },
    onSuccess: () => {
      queryClient.invalidateQueries("searchUsers");
    },
  });
};

export const useSearchUsers = () => {
  return useQuery({
    queryKey: ["searchUsers"],
    queryFn: async () => {
      const { data } = await axios.get(`${url}/users?search=${query}`);
      return data;
    },
  });
};

export const useSuggestedUsers = () => {
  return useQuery({
    queryKey: ["suggestedUsers"],
    queryFn: async () => {
      const { data } = await axios.get(`${url}/find/suggestedUsers`);
      return data;
    },
  });
};

export const useUserChallenges = (userId) => {
  return useQuery({
    queryKey: ["challenges", userId],
    queryFn: async () => {
      const { data } = await axios.get(`${url}/user/challenges`, {
        params: {
          userId: userId,
        },
      });
      return data;
    },
  });
};

export const useUserBadges = (userId) => {
  return useQuery({
    queryKey: ["badges", userId],
    queryFn: async () => {
      const { data } = await axios.get(`${url}/${userId}/badges`);
      return data;
    },
  });
};

export const useUserJobs = (userId) => {
  return useQuery({
    queryKey: ["jobs", userId],
    queryFn: async () => {
      const { data } = await axios.get(`${url}/job/user/${userId}`);
      return data;
    },
  });
};

export const useUserFeedbacks = (userId) => {
  return useQuery({
    queryKey: ["reviews", userId],
    queryFn: async () => {
      const { data } = await axios.get(`${url}/reviews/${userId}`);
      return data;
    },
  });
};

export const useUserNotifications = (userId) => {
  return useQuery({
    queryKey: ["notifications", userId],
    queryFn: async () => {
      const response = await axios.get(`${url}/user/${userId}/notifications`);
      return response?.data;
    },
  });
};

export const useGetPaymentByUser = (userId) => {
  return useQuery({
    queryKey: ["payment", userId],
    queryFn: async () => {
      const { data } = await axios.get(`${url}/api/payment/user/${userId}`);
      return data;
    },
  });
};

export const useGetPayments = () => {
  return useQuery({
    queryKey: ["payments"],
    queryFn: async () => {
      const { data } = await axios.get(`${url}/api/allpayments`);
      return data;
    },
  });
};

export const useSeeNotification = (userId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      await axios.put(`${url}/notifications/seen`, {});
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["notifications", userId]);
    },
  });
};

export const useStat = () => {
  return useQuery({
    queryKey: ["stat"],
    queryFn: async () => {
      const { data } = await axios.get(`${url}/get/stat`);
      return data;
    },
  });
};

export const useFileUpload = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async (formData) => {
      let uploadPercentage = 0;
      const response = await axios.post(`${url}/upload`, formData, {
        onUploadProgress: (progressEvent) => {
          const { loaded, total } = progressEvent;
          uploadPercentage = Math.floor((loaded * 100) / total);
          queryClient.setQueryData(["uploadProgress"], uploadPercentage);
        },
      });

      return { data: response.data, uploadPercentage };
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["someKey"] });
      },
    }
  );
};
