import toast from "react-hot-toast";
import { axios } from "../../axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate, useParams } from "react-router-dom";

const url = process.env.REACT_APP_API_ENDPOINT;

export const useChallengeById = (challengeId, entityType) => {
  return useQuery({
    queryKey: ["challenges", challengeId],
    queryFn: async () => {
      const { data } = await axios.get(
        `${url}/challenge/single/${challengeId}`
      );
      return data;
    },
    enabled: !!challengeId && entityType === "challenge",
  });
};

export const useEditChallenge = (challengeId) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (ChallengeData) => {
      await axios.put(`${url}/challenge/update/${challengeId}`, ChallengeData);
    },
    onSuccess: () => {
      toast.success("Challenge edited successfully");
      queryClient.invalidateQueries(["challenges"]);
      queryClient.invalidateQueries(["organizationChallenges"]);

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

export const useChallengesById = (organizationId) => {
  return useQuery(
    ["challenges", organizationId],
    async () => {
      const { data } = await axios.get(`${url}/challenge/company/${organizationId}`);
      return data;
    },
    {
      enabled: !!organizationId,
    }
  );
};

export const useUserSubmission = (challengeId, participant) => {
  return useQuery({
    queryKey: ["submissions", participant?._id, challengeId],
    queryFn: async () => {
      let participantId;
      if (participant?.user === undefined) participantId = participant?._id;
      else participantId = participant?.user?._id;
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

export const useChallengeUsers = (challengeId) => {
  return useQuery({
    queryKey: ["challengeUsers", challengeId],
    queryFn: async () => {
      const { data } = await axios.get(`${url}/challenge/getChallengeUsers`, {
        params: {
          idChallenge: challengeId,
        },
      });
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
        query += skills.map((skill) => `&skills=${skill}`).join("");
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
      queryClient.invalidateQueries(["submissions", challengeId]);
      toast.success("You submited to the challenge!");
    },
  });
};

export const useCreateChallenge = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async ({ companyId, challengeData, paid, objective }) => {
      const res = await axios.post(
        `${url}/challenge/add`,
        { companyId, ...challengeData, paid, objective },
        {}
      );
      console.log(res);
      if (res.status == 200) {
        console.log(res.data);
        window.location.href = res.data;
      }
      if (res.status == 201) {
        toast.success("Challenge created successfully");
        queryClient.invalidateQueries(["challenges"]);
      }
    }
    // {
    //   onSuccess: (res) => {

    //     toast.success("Challenge created successfully");
    //     queryClient.invalidateQueries(["challenges"]);
    //   },
    //   onError: () => {

    //   },
    // }
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
      toast.error(
        "To be able to select this participant as the winner, you should add a review."
      );
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
      return await axios.delete(`${url}/challenge/${challengeId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["challenges"] });
      queryClient.invalidateQueries(["organizationChallenges"]);
      toast.success("Challenge deleted successfully");
    },
    onError: () => {
      toast.error("Error Deleting challenge");
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

export const useStartChallenge = () => {
  const queryClient = useQueryClient();
  const { id: challengeId } = useParams();
  return useMutation({
    mutationFn: async (data) => {
      await axios.put(`${url}/challenge/start/${challengeId}`, data);
    },
    onSuccess: () => {
      toast.success("Challenge started successfully");
      queryClient.invalidateQueries(["challenges"]);
    },
    onError: (data) => {
      console.log(data);
      if (data.response.data.message === "No users registered") {
        toast.error("No users registered");
      } else toast.error("Error starting challenge");
    },
  });
};

export const useBanUser = () => {
  const queryClient = useQueryClient();
  const { id: challengeId } = useParams();
  return useMutation({
    mutationFn: async (data) => {
      await axios.put(`${url}/challenge/ban/${challengeId}`, data);
    },
    onSuccess: () => {
      toast.success("User removed successfully");
      queryClient.invalidateQueries(["challenges"]);
    },
    onError: () => {
      toast.error("Error banning user");
    },
  });
};

export const useUnBanUser = () => {
  const queryClient = useQueryClient();
  const { id: challengeId } = useParams();
  return useMutation({
    mutationFn: async (data) => {
      await axios.put(`${url}/challenge/unban/${challengeId}`, data);
    },
    onSuccess: () => {
      toast.success("User Added successfully");
      queryClient.invalidateQueries(["challenges"]);
    },
    onError: () => {
      toast.error("Error Unremoving user");
    },
  });
};

export const useGetChallengeSubmissions = (challengeId) => {
  return useQuery({
    queryKey: ["submissions", challengeId],
    queryFn: async () => {
      const { data } = await axios.get(
        `${url}/challenge/getChallengeSubmission/${challengeId}`
      );
      return data;
    },
  });
};

export const useCreateOrganizationChallenge = () => {
  const queryClient = useQueryClient();
  return useMutation(
      async ({ challengeData, paid, objective, organizationId, userId }) => {
        const res = await axios.post(
            `${url}/challenge/addOrganizationChallenge`,
            { ...challengeData, paid, objective, organizationId, userId },
            {}
        );
        if (res.status === 200) {
          window.location.href = res.data;
        }
        if (res.status === 201) {
          toast.success("Challenge created successfully");
          queryClient.invalidateQueries(["challenges"]);
          queryClient.invalidateQueries(["organizationChallenges"]);
        }
      }
  );
};