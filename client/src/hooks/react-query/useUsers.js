import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";

const url = "http://localhost:8000";

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
      const { data } = await axios.get("http://localhost:8000/admin/Users", {
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

export const usePayment = () => {
  // const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (amount) => {
      const { data } = await axios.post(
        `http://localhost:8000/api/payment`,
        { amount: amount },
        { withCredentials: true }
      );
      return data;
    },
    onSuccess: (data) => {
      console.log(data);
      // queryClient.invalidateQueries(["users"]);
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

export const useSuggestedUsers = () => {
  return useQuery("suggested", async () => {
    const { data } = await axios.get(`${url}/find/suggestedUsers`, {
      withCredentials: true,
    });
    return data;
  });
};

export const useUserChallenges = (userId) => {
  return useQuery({
    queryKey: ["challenges", userId],
    queryFn: async () => {
      const { data } = await axios.get(
        "http://localhost:8000/user/challenges",
        {
          params: {
            userId: userId,
          },
          withCredentials: true,
        }
      );
      return data;
    },
  });
};

export const useUserBadges = (userId) => {
  return useQuery({
    queryKey: ["badges", userId],
    queryFn: async () => {
      const { data } = await axios.get(
        `http://localhost:8000/${userId}/badges`,
        {
          withCredentials: true,
        }
      );
      return data;
    },
  });
};

export const useUserJobs = (userId) => {
  return useQuery({
    queryKey: ["jobs", userId],
    queryFn: async () => {
      const { data } = await axios.get(
        `http://localhost:8000/job/user/${userId}`,
        {
          withCredentials: true,
        }
      );
      return data;
    },
  });
};

export const useUserFeedbacks = (userId) => {
  return useQuery({
    queryKey: ["reviews", userId],
    queryFn: async () => {
      const { data } = await axios.get(
        `http://localhost:8000/reviews/${userId}`,
        { withCredentials: true }
      );
      return data;
    },
  });
};

export const useUserNotifications = (userId) => {
  return useQuery({
    queryKey: ["notifications", userId],
    queryFn: async () => {
      const response = await axios.get(
        `http://localhost:8000/user/${userId}/notifications`,
        { withCredentials: true }
      );
      console.log(response.data);
      return response.data;
    },
  });
};
