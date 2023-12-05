import toast from "react-hot-toast";
import { axios } from "../../axios";
import { useMutation, useQuery, useQueryClient } from "react-query";

const url = process.env.REACT_APP_API_ENDPOINT;

export const useChallengeById = (challengeId) => {
  return useQuery({
    queryKey: ["challenges", challengeId],
    queryFn: async () => {
      const { data } = await axios.get(
        `${url}/challenge/single/${challengeId}`
      );
      return data;
    },
  });
};

export const useEditChallenge = (challengeId) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (ChallengeData) => {
      await axios.put(`${url}/challenge/update/${challengeId}`, ChallengeData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["challenges"]);
    },
  });
};

export const useUserChallenges = (user) => {
  return useQuery({
    queryKey: ["user/challenges", user._id],
    queryFn: async () => {
      const { data } = await axios.get(`${url}/user/challenges`, {
        params: { userId: user._id },
      });
      return data;
    },
  });
};

export const useChallengesById = (companyId) => {
  return useQuery(
    ["challenges", companyId],
    async () => {
      const { data } = await axios.get(`${url}/challenge/company/${companyId}`);
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
      let participantId;
      if (participant.user === undefined) participantId = participant._id;
      else participantId = participant.user._id;
      const { data } = await axios.get(
        `${url}/challenge/getChallengeUserSubmit`,
        {
          params: {
            userId: participantId,
            challengeId: challengeId,
          },
        }
      );
      return data;
    },
  });
};

export const useFindChallenges = (
  minAmount,
  maxAmount,
  searchQuery,
  skills,
  categories
) => {
  return useQuery({
    queryKey: [
      "challenges",
      minAmount,
      maxAmount,
      searchQuery,
      skills,
      categories,
    ],
    queryFn: async () => {
      let query = "";
      if (minAmount) query += `&min=${minAmount}`;
      if (maxAmount) query += `&max=${maxAmount}`;
      if (searchQuery) query += `&search=${searchQuery}`;

      if (skills && skills.length > 0) {
        query += skills.map((skill) => `&skills=${skill}`).join(""); // Use "|" as OR operator
      }
      if (categories && categories.length > 0) {
        query += categories
          .map((category) => `&categories=${category}`)
          .join(""); // Use "|" as OR operator
      }
      const { data } = await axios.get(
        `${url}/challenge/challenges/all?${query}`
      );

      return data;
    },
  });
};

export const useSubmitToChallenge = ({ challengeId }) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (submission) => {
      await axios.post(`${url}/challenge/submission`, submission);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["challenges", challengeId]);
      toast.success("You submited to the challenge!");
    },
  });
};

export const useCreateChallenge = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async ({ companyId, challengeData, paid }) => {
      await axios.post(
        `${url}/challenge/add`,
        { companyId, ...challengeData, paid },
        {}
      );
    },
    {
      onSuccess: () => {
        toast.success("Challenge created successfully");
        queryClient.invalidateQueries(["challenges"]);
      },
      onError: () => {
        toast.error("Error creating challenge");
      },
    }
  );
};

export const useUnregisterChallenge = (challenge, user) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      const challengeData = { idChallenge: challenge._id, idUser: user._id };
      await axios.post(`${url}/unjoin`, challengeData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["user/challenges", user._id],
      });
      queryClient.invalidateQueries({
        queryKey: ["challenges", challenge._id],
      });
    },
  });
};

export const useRegisterChallenge = (challenge, user) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      const challengeData = { idChallenge: challenge._id, idUser: user._id };
      await axios.post(`${url}/join`, challengeData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["challenges", user._id] });
      queryClient.invalidateQueries({
        queryKey: ["user/challenges", user._id],
      });
      queryClient.invalidateQueries({
        queryKey: ["challenges", challenge._id],
      });
    },
  });
};

export const useChooseWinner = () => {
  //const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (challengeData) => {
      const { data } = await axios.post(
        `${url}/company/challengeWinner`,
        challengeData,
        {}
      );
      return data;
    },
    onSuccess: () => {
      toast.success("Winner chosen successfully");
    },
    onError: () => {
      toast.error("To be able to select this participant as the winner, you should add a review.");
    },
  });
};

const getChallenges = async (userId) => {
  const { data } = await axios.get(`${url}/user/challenges`, {
    params: {
      userId: userId,
    },
  });
  return data;
};

export const useGetChallenges = (userId) => {
  return useQuery(["challenges", userId], () => getChallenges(userId));
};

export const useDeleteChallenge = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (challengeId) => {
      await axios.delete(`${url}/challenge/${challengeId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["challenges"] });
    },
  });
};

export const useEditSubmission = (challengeId, participant) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (submission) => {
      await axios.post(`${url}/challenge/editSubmission`, submission);
    },
    onSuccess: () => {
      toast.success("Submission edited successfully");
      queryClient.invalidateQueries([
        "submissions",
        participant._id,
        challengeId,
      ]);
    },
    onError: () => {
      toast.error("Error editing submission");
    },
  });
};
