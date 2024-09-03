import { axios } from "../../axios";
import { useMutation, useQuery, useQueryClient } from "react-query";

const url = process.env.REACT_APP_API_ENDPOINT;

// Create a team challenge conversation
export const useCreateTeamChallengeConversation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data) => {
            await axios.post(`${url}/teamChallengeConversation/team-challenge-conversation`, data);
        },
    });
};

// Join a team challenge conversation
export const useJoinTeamChallengeConversation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data) => {
            await axios.post(`${url}/teamChallengeConversation/team-challenge-conversation/join`, data);
        },
    });
};

// Get a specific team challenge conversation by team challenge ID
export const useGetTeamChallengeConversation = (teamChallengeId) => {
    return useQuery(
        ["teamChallengeConversation", teamChallengeId],
        async () => {
            const { data } = await axios.get(`${url}/teamChallengeConversation/team-challenge-conversation/${teamChallengeId}`);
            return data;
        },
        {
            enabled: !!teamChallengeId,
        }
    );
};

// Create a message in a team challenge conversation
export const useCreateTeamChallengeMessage = () => {
    return useMutation({
        mutationFn: async (data) => {
            await axios.post(`${url}/teamChallengeConversation/team-challenge-message`, data);
        },
    });
};

// Get messages in a team challenge conversation by conversation ID
export const useGetTeamChallengeMessages = (conversationId) => {
    return useQuery(
        ["teamChallengeMessages", conversationId],
        async () => {
            const { data } = await axios.get(`${url}/teamChallengeConversation/team-challenge-messages/${conversationId}`);
            return data;
        },
        {
            enabled: !!conversationId,
        }
    );
};

// Create a team conversation
export const useCreateTeamConversation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data) => {
            await axios.post(`${url}/teamChallengeConversation/team-conversation`, data);
        },
    });
};

// Join a team conversation
export const useJoinTeamConversation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data) => {
            await axios.post(`${url}/teamChallengeConversation/team-conversation/join`, data);
        },
    });
};

// Get a specific team conversation by team challenge ID and team ID
export const useGetTeamConversation = (teamChallengeId, teamId) => {
    return useQuery(
        ["teamConversation", teamChallengeId, teamId],
        async () => {
            const { data } = await axios.get(`${url}/teamChallengeConversation/team-conversation/${teamChallengeId}/${teamId}`);
            return data;
        },
        {
            enabled: !!teamChallengeId && !!teamId,
        }
    );
};

// Create a message in a team conversation
export const useCreateTeamMessage = () => {
    return useMutation({
        mutationFn: async (data) => {
            await axios.post(`${url}/teamChallengeConversation/team-message`, data);
        },
    });
};

// Get messages in a team conversation by conversation ID
export const useGetTeamMessages = (conversationId) => {
    return useQuery(
        ["teamMessages", conversationId],
        async () => {
            const { data } = await axios.get(`${url}/teamChallengeConversation/team-messages/${conversationId}`);
            return data;
        },
        {
            enabled: !!conversationId,
        }
    );
};
