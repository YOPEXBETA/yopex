import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";

const url = process.env.URL || "http://localhost:8000";

export const useChallengeById = (challengeId) => {
  return useQuery({
    queryKey: ["challenges", challengeId],
    queryFn: async () => {
      const { data } = await axios.get(
        `${url}/challenge/single/${challengeId}`,
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
      const { data } = await axios.get(`${url}/user/challenges`, {
        params: { userId: user._id },
        withCredentials: true,
      });
      return data;
    },
  });
};

export const useChallengesById = (companyId) => {
  return useQuery(
    ["challenges", companyId],
    async () => {
      const { data } = await axios.get(
        `${url}/challenge/company/${companyId}`,
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
          withCredentials: true,
        }
      );
      return data;
    },
  });
};

export const useFindChallenges = (minAmount, maxAmount, searchQuery,skills) => {

  return useQuery({
    queryKey: ["challenges", minAmount, maxAmount, searchQuery,skills],
    queryFn: async () => {
      let query = "";
      if (minAmount) query += `&min=${minAmount}`;
      if (maxAmount) query += `&max=${maxAmount}`;
      if (searchQuery) query += `&search=${searchQuery}`;
      
      if (skills && skills.length > 0) {
        query += skills.map(skill => `&skills=${skill}`).join(''); // Use "|" as OR operator
      }
      const { data } = await axios.get(
        `${url}/challenge/challenges/all?${query}`,
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
      await axios.post(`${url}/challenge/submission`, submission, {
        withCredentials: true,
      });
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
        `${url}/challenge/add`,
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
      await axios.post(`${url}/unjoin`, challengeData, {
        withCredentials: true,
      });
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
      await axios.post(`${url}/join`, challengeData, {
        withCredentials: true,
      });
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
      console.log("winner");
      const { data } = await axios.post(
        `${url}/company/challengeWinner`,
        challengeData,
        {
          withCredentials: true,
        }
      );
      console.log(data);
      return data;
    },
    onSuccess: () => {},
  });
};

const getChallenges = async (userId) => {
  const { data } = await axios.get(`${url}/user/challenges`, {
    params: {
      userId: userId,
    },
    withCredentials: true,
  });
  return data;
};

export const useGetChallenges = (userId) => {
  return useQuery(["challenges", userId], () => getChallenges(userId));
};

export const useDeleteChallenge=()=>{
      const queryClient = useQueryClient();

      return useMutation({
        mutationFn: async (challengeId) => {
          await axios.delete(`${url}/challenge/${challengeId}`, {
            withCredentials: true,
          });
        },
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['challenges'] });
        },
      });
};
