import toast from "react-hot-toast";
import { axios } from "../../axios";
import { useMutation, useQuery, useQueryClient } from "react-query";

const url = process.env.REACT_APP_API_ENDPOINT;

export const useTeamChallengeById = (teamChallengeId) => {
    return useQuery({
        queryKey: ["teamChallenges", teamChallengeId],
        queryFn: async () => {
            const { data } = await axios.get(`${url}/teamChallenge/single/${teamChallengeId}`);
            return data;
        },
    });
};

export const useAllTeamChallenges = () => {
    return useQuery({
        queryKey: ["teamChallenges"],
        queryFn: async () => {
            const { data } = await axios.get(`${url}/teamChallenge/all`);
            return data;
        },
    });
};

export const useCreateTeamChallenge = () => {
    const queryClient = useQueryClient();
    return useMutation(
        async (teamChallengeData) => {
            const res = await axios.post(`${url}/teamChallenge/add`, teamChallengeData);
            return res.data;
        },
        {
            onSuccess: () => {
                toast.success("Team Challenge created successfully");
                queryClient.invalidateQueries(["teamChallenges"]);
            },
            onError: () => {
                toast.error("Error creating team challenge");
            },
        }
    );
};

export const useUpdateTeamChallenge = (teamChallengeId) => {
    const queryClient = useQueryClient();
    return useMutation(
        async (updatedData) => {
            await axios.put(`${url}/teamChallenge/update/${teamChallengeId}`, updatedData);
        },
        {
            onSuccess: () => {
                toast.success("Team Challenge updated successfully");
                queryClient.invalidateQueries(["teamChallenges", teamChallengeId]);
            },
            onError: () => {
                toast.error("Error updating team challenge");
            },
        }
    );
};

export const useDeleteTeamChallenge = () => {
    const queryClient = useQueryClient();
    return useMutation(
        async (teamChallengeId) => {
            await axios.delete(`${url}/teamChallenge/delete/${teamChallengeId}`);
        },
        {
            onSuccess: () => {
                toast.success("Team Challenge deleted successfully");
                queryClient.invalidateQueries(["teamChallenges"]);
            },
            onError: () => {
                toast.error("Error deleting team challenge");
            },
        }
    );
};
