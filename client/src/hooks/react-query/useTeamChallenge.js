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

export const useFindTeamChallenges = (
    minAmount,
    maxAmount,
    searchQuery,
    skills,
    categories
) => {
    return useQuery({
        queryKey: [
            "teamChallenges",
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
                `${url}/teamChallenge/all?${query}`
            );

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
                queryClient.invalidateQueries(["organizationTeamChallenges", teamChallengeId]);

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
                queryClient.invalidateQueries(["organizationTeamChallenges"]);
            },
            onError: () => {
                toast.error("Error deleting team challenge");
            },
        }
    );
};

export const useCreateTeam = () => {
    const queryClient = useQueryClient();
    return useMutation(
        async ({ teamData, challengeId, leaderId }) => {
            const res = await axios.post(`${url}/team/create`, { ...teamData, challengeId, leaderId });
            return res.data;
        },
        {
            onSuccess: (data) => {
                toast.success("Team created successfully");
                queryClient.invalidateQueries(["teams"]);
                return data;
            },
            onError: () => {
                toast.error("Error creating team");
            },
        }
    );
};

export const useInviteUserToTeam = () => {
    const queryClient = useQueryClient();
    return useMutation(
        async (invitationData) => {
            const res = await axios.post(`${url}/team/invite`, invitationData);
            return res.data;
        },
        {
            onSuccess: () => {
                toast.success("Invitation sent successfully");
                queryClient.invalidateQueries(["teamInvitations"]);
            },
            onError: () => {
                toast.error("Error sending invitation");
            },
        }
    );
};