import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";

export const useChallengeById = (challengeId) => {
  return useQuery({
    queryKey: ["challenges", challengeId],
    queryFn: async () => {
      const { data } = await axios.get(
        `http://localhost:8000/challenge/single/${challengeId}`,
        { withCredentials: true }
      );
      return data;
    },
  });
};

export const useUserChallenges = (user) => {
  return useQuery({
    queryKey: ["user/challenges", user._id],
    queryFn: async () => {
      const { data } = await axios.get(
        "http://localhost:8000/user/challenges",
        {
          params: { userId: user._id },
          withCredentials: true,
        }
      );
      return data;
    },
  });
};

export const useChallengesById = (companyId) => {
  return useQuery(
    ["challenges", companyId],
    async () => {
      const { data } = await axios.get(
        `http://localhost:8000/challenge/company/${companyId}`,
        { withCredentials: true }
      );
      return data;
    },
    {
      enabled: !!companyId,
    }
  );
};

export const useUserSubmission = (challengeId, participant) => {
  return useQuery({
    queryKey: ["submissions", participant._id, challengeId],
    queryFn: async () => {
      const { data } = await axios.get(
        `http://localhost:8000/challenge/getChallengeUserSubmit`,
        {
          params: {
            userId: participant._id,
            challengeId: challengeId,
          },
          withCredentials: true,
        }
      );
      return data;
    },
  });
};

export const useFindChallenges = (minAmount, maxAmount, searchQuery) => {
  return useQuery({
    queryKey: ["challenges", minAmount, maxAmount, searchQuery],
    queryFn: async () => {
      let query = "";
      if (minAmount) query += `&min=${minAmount}`;
      if (maxAmount) query += `&max=${maxAmount}`;
      if (searchQuery) query += `&search=${searchQuery}`;

      const { data } = await axios.get(
        `http://localhost:8000/challenge/challenges/all?${query}`,
        { withCredentials: true }
      );

      return data;
    },
  });
};

export const useSubmitToChallenge = ({ challengeId }) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (submission) => {
      await axios.post(
        "http://localhost:8000/challenge/submission",
        submission,
        { withCredentials: true }
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["challenges", challengeId]);
    },
  });
};

export const useCreateChallenge = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async ({ companyId, challengeData }) => {
      console.log("called");
      await axios.post(
        `http://localhost:8000/challenge/add`,
        { companyId, ...challengeData },
        {
          withCredentials: true,
        }
      );
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["challenges"]);
      },
    }
  );
};

export const useUnregisterChallenge = (challenge, user) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      const challengeData = { idChallenge: challenge._id, idUser: user._id };
      await axios.post("http://localhost:8000/unjoin", challengeData, {
        withCredentials: true,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["user/challenges", user._id],
      });
      queryClient.invalidateQueries(
        { queryKey: ["challenges", challenge._id] },
      );
    },
  });
};

export const useRegisterChallenge = (challenge, user) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      const challengeData = { idChallenge: challenge._id, idUser: user._id };
      await axios.post("http://localhost:8000/join", challengeData, {
        withCredentials: true,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["challenges", user._id] });
      queryClient.invalidateQueries({
        queryKey: ["user/challenges", user._id],
      });
      queryClient.invalidateQueries(
        { queryKey: ["challenges", challenge._id] },
      );
    },
  });
};


export const useChooseWinner = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (challengeData) => {
      const { data } = await axios.post(
        "http://localhost:8000/company/challengeWinner",
        challengeData,
        {
          withCredentials: true,
        }
      );
      return data;
    },
    onSuccess: () => {
      
    },
  });
};
