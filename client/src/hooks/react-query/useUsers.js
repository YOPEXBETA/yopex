import axios from "axios";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";

const url = process.env.URL || "http://localhost:8000";

export const useUsers = () => {
  return useQuery("users", async () => {
    const { data } = await axios.get(`${url}/allusers`, {
      withCredentials: true,
    });
    return data;
  });
};

export const useAdminUsers = () => {
  return useQuery({
    queryKey: ["admin/users"],
    queryFn: async () => {
      const { data } = await axios.get(`${url}/admin/Users`, {
        withCredentials: true,
      });
      return data;
    },
  });
};

export const useUserById = (userId) => {
  return useQuery(
    ["user", userId],
    async () => {
      const { data } = await axios.get(`${url}/${userId}`, {
        withCredentials: true,
      });
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
      await axios.get(`${url}/users?search=${searchQuery}`, {
        withCredentials: true,
      });
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
      
      const { data } = await axios.post(
        `${url}/api/payment`,
        { amount: amount },
        { withCredentials: true }
      );
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
      const { data } = await axios.post(
        `${url}/api/payment/${id}`,
        { amount: 0 },
        { withCredentials: true }
      );
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
      await axios.put(
        `${url}/toggleFollow/${userId}`,
        { userId: currentUserId },
        { withCredentials: true }
      );
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
      await axios.put(
        `${url}/toggleFollowCompany/${companyId}`,
        { userId: currentUserId },
        { withCredentials: true }
      );
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
      const { data } = await axios.get(`${url}/find/friends/${userId}`, {
        withCredentials: true,
      });
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
      const { data } = await axios.get(`${url}/find/followings/${userId}`, {
        withCredentials: true,
      });
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
      const { data } = await axios.get(`${url}/users?search=${query}`, {
        withCredentials: true,
      });
      return data;
    },
  });
};

export const useSuggestedUsers = () => {
  return useQuery({
    queryKey: ["suggestedUsers"],
    queryFn: async () => {
      const { data } = await axios.get(`${url}/find/suggestedUsers`, {
        withCredentials: true,
      });
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
        withCredentials: true,
      });
      return data;
    },
  });
};

export const useUserBadges = (userId) => {
  return useQuery({
    queryKey: ["badges", userId],
    queryFn: async () => {
      const { data } = await axios.get(`${url}/${userId}/badges`, {
        withCredentials: true,
      });
      return data;
    },
  });
};

export const useUserJobs = (userId) => {
  return useQuery({
    queryKey: ["jobs", userId],
    queryFn: async () => {
      const { data } = await axios.get(`${url}/job/user/${userId}`, {
        withCredentials: true,
      });
      return data;
    },
  });
};

export const useUserFeedbacks = (userId) => {
  return useQuery({
    queryKey: ["reviews", userId],
    queryFn: async () => {
      const { data } = await axios.get(`${url}/reviews/${userId}`, {
        withCredentials: true,
      });
      return data;
    },
  });
};

export const useUserNotifications = (userId) => {
  return useQuery({
    queryKey: ["notifications", userId],
    queryFn: async () => {
      const response = await axios.get(`${url}/user/${userId}/notifications`, {
        withCredentials: true,
      });
      console.log(response.data);
      return response.data;
    },
  });
};


export const useGetPaymentByUser = (userId) => {
  return useQuery({
    queryKey: ["payment", userId],
    queryFn: async () => {
      const { data } = await axios.get(`${url}/api/payment/user/${userId}`, {
        withCredentials: true,
      });
      return data;
    },
  });
};


export const useGetPayments = () => {
  return useQuery({
    queryKey: ["payments"],
    queryFn: async () => {
      const { data } = await axios.get(`${url}/api/allpayments`, {
        withCredentials: true,
      });
      return data;
    },
  });
}
