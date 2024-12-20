import toast from "react-hot-toast";
import { axios } from "../../axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import {useParams} from "react-router-dom";

const url = process.env.REACT_APP_API_ENDPOINT;

export const useTeamChallengeById = (teamChallengeId, entityType) => {
    return useQuery({
        queryKey: ["teamChallenges", teamChallengeId],
        queryFn: async () => {
            const { data } = await axios.get(`${url}/teamChallenge/single/${teamChallengeId}`);
            return data;
        },
        enabled: !!teamChallengeId && entityType === "teamChallenge",
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
                queryClient.invalidateQueries(["teamChallenges"]);
                queryClient.invalidateQueries(["organizationTeamChallenges"]);
                return data;
            },
            onError: (error) => {
                toast.error(`Error creating team: ${error.response.data.message}`);
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

export const useBanTeam = () => {
    const queryClient = useQueryClient();
    return useMutation(
        async ({ teamChallengeId, teamId }) => {
            console.log('challenge', teamChallengeId, teamId)
            const res = await axios.put(`${url}/teamChallenge/banTeam/${teamChallengeId}`, { teamId });
            return res.data;
        },
        {
            onSuccess: () => {
                toast.success("Team banned successfully");
                queryClient.invalidateQueries(["teamChallenges"]);
                queryClient.invalidateQueries(["organizationTeamChallenges"]);
            },
            onError: () => {
                toast.error("Error banning team");
            },
        }
    );
};


export const useUnbanTeam = () => {
    const queryClient = useQueryClient();
    return useMutation(
        async ({ teamChallengeId, teamId }) => {
            const res = await axios.put(`${url}/teamChallenge/unbanTeam/${teamChallengeId}`, { teamId });
            return res.data;
        },
        {
            onSuccess: () => {
                toast.success("Team unbanned successfully");
                queryClient.invalidateQueries(["teamChallenges"]);
                queryClient.invalidateQueries(["organizationTeamChallenges"]);
            },
            onError: () => {
                toast.error("Error unbanning team");
            },
        }
    );
};


export const useTeamInvitationById = (invitationId) => {
    return useQuery(
        ['teamInvitation', invitationId],
        async () => {
            const { data } = await axios.get(`${url}/team/getInviteById/${invitationId}`);
            return data;
        },
        {
            enabled: !!invitationId,
        }
    );
}
export const useAcceptTeamInvitation = () => {
    const queryClient = useQueryClient();
    return useMutation(
        async (invitationId) => {
            const res = await axios.put(`${url}/team/acceptInvite/${invitationId}`);
            return res.data;
        },
        {
            onSuccess: () => {
                toast.success("Invitation accepted successfully");
                queryClient.invalidateQueries(["teamInvitations"]);
            },
            onError: () => {
                toast.error("Error accepting invitation");
            },
        }
    );
};

export const useRefuseTeamInvitation = () => {
    const queryClient = useQueryClient();
    return useMutation(
        async (invitationId) => {
            const res = await axios.put(`${url}/team/refuseInvite/${invitationId}`);
            return res.data;
        },
        {
            onSuccess: () => {
                toast.success("Invitation declined successfully");
                queryClient.invalidateQueries(["teamInvitations"]);
            },
            onError: () => {
                toast.error("Error declining invitation");
            },
        }
    );
};


export const useTeamById = (teamId) => {
    return useQuery(
        ['team', teamId],
        async () => {
            const { data } = await axios.get(`${url}/team/getTeamById/${teamId}`);
            return data;
        },
        {
            enabled: !!teamId,
        }
    );
};

export const useRemoveTeamMember = () => {
    const queryClient = useQueryClient();
    return useMutation(

        async ({ teamId, userId }) => {
            console.log('remove')

            const res = await axios.delete(`${url}/team/removeMember`, {
                data: { teamId, userId }
            });
            return res.data;
        },
        {
            onSuccess: () => {
                toast.success("Member removed successfully");
                queryClient.invalidateQueries(["teamById"]);
            },
            onError: () => {
                toast.error("Error removing member");
            },
        }
    );
};

export const useLeaveTeam = () => {
    const queryClient = useQueryClient();
    return useMutation(
        async ({ teamId, userId }) => {
            console.log('leave')

            const res = await axios.delete(`${url}/team/leaveTeam`, {
                data: { teamId, userId }
            });
            return res.data;
        },
        {
            onSuccess: () => {
                toast.success("Left the team successfully");
                queryClient.invalidateQueries(["teamById"]);
            },
            onError: () => {
                toast.error("Error leaving the team");
            },
        }
    );
};

export const useStartTeamChallenge = () => {
    const queryClient = useQueryClient();
    const { id: teamChallengeId } = useParams();
    return useMutation({
        mutationFn: async (data) => {
            await axios.put(`${url}/teamChallenge/start/${teamChallengeId}`, data);
        },
        onSuccess: () => {
            toast.success("Challenge started successfully");
            queryClient.invalidateQueries(["teamChallenges"]);
            queryClient.invalidateQueries(["organizationTeamChallenges"]);
        },
        onError: (data) => {
            console.log(data);
            if (data.response.data.message === "No teams registered") {
                toast.error("No teams registered");
            } else toast.error("Error starting challenge");
        },
    });
};
export const useUnjoinTeamChallenge = () => {
    const queryClient = useQueryClient();
    return useMutation(
        async ({ idChallenge, teamId }) => {
            const res = await axios.post(`${url}/teamChallenge/unjoin`, { idChallenge, teamId });
            return res.data;
        },
        {
            onSuccess: () => {
                toast.success("Successfully unjoined the team challenge");
                queryClient.invalidateQueries(["teamChallenges"]);
                queryClient.invalidateQueries(["organizationTeamChallenges"]);
            },
            onError: () => {
                toast.error("Error unjoining the team challenge");
            },
        }
    );
};



export const useSubmitToTeamChallenge = ({ teamChallengeId }) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (submission) => {
            await axios.post(`${url}/teamChallenge/teamSubmit`, submission);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["challenges", teamChallengeId]);
            toast.success("You submited to the challenge!");
        },
        onError: (error) => {
            const errorMessage = error?.response?.data?.message || "Error submitting the team challenge";
            toast.error(errorMessage);
        },
    });
};

export const useGetTeamChallengeSubmissions = (teamChallengeId, type) => {
    return useQuery(
        ["teamChallengeSubmissions", teamChallengeId],
        async () => {
            try {
                const { data } = await axios.get(`${url}/teamChallenge/submissions/${teamChallengeId}`);
                return data;
            } catch (error) {
                toast.error("Failed to fetch team challenge submissions");
                throw new Error(error.response.data.message || "An error occurred while fetching submissions.");
            }
        },
        {
            enabled: !!teamChallengeId && type === "teamChallenge",
        }
    );
};

export const useEditTeamSubmission = (challengeId, teamId) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (submission) => {
            await axios.post(`${url}/teamChallenge/editTeamSubmission`, submission);
        },
        onSuccess: () => {
            toast.success("Team submission edited successfully");
            queryClient.invalidateQueries(["teamChallengeSubmissions", challengeId]);
        },
        onError: () => {
            toast.error("Error editing submission");
        },
    });
};
export const useAddTeamReview = (userId) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (review) => {
            await axios.post(`${url}/teamChallenge/teamReview/create`, review, );
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["reviews", userId]);
            toast.success("Review added successfully");
        },
        onError: () => {
            toast.error("review already exists");
        },
    });
};

export const useChooseWinningTeam = (teamChallengeId) => {
    const queryClient = useQueryClient();
    return useMutation(
        async ({ teamChallengeId, teamId }) => {
            const res = await axios.post(`${url}/teamChallenge/chooseWinningTeam`, { teamChallengeId, teamId });
            return res.data;
        },
        {
            onSuccess: (data) => {
                toast.success("Team selected as winner successfully");
                queryClient.invalidateQueries(["teamChallenges", teamChallengeId]);
                queryClient.invalidateQueries(["organizationTeamChallenges", teamChallengeId]);
            },
            onError: (error) => {
                toast.error(`Error selecting team: ${error.response?.data?.message || "An error occurred"}`);
            },
        }
    );
};
