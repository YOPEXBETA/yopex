import axios from "axios";

const url = "https://yopex-api.tabaani.co";

const searchUsers = async (searchKeyword) => {
  const { data } = await axios.get(`${url}/users`, {
    params: {
      search: searchKeyword,
    },
  });
  return data;
};

const getAllUsers = async () => {
  const { data } = await axios.get(`${url}/allusers`, {});
  return data;
};

const getUserFriends = async (userId) => {
  const { data } = await axios.get(`${url}/find/friends/${userId}`, {});
  return data;
};

const getUserFollowings = async (userId) => {
  const { data } = await axios.get(`${url}/find/followings/${userId}`, {});
  return data;
};

const getSuggestedUsers = async (myData) => {
  const { data } = await axios.get(`${url}/find/suggestedUsers`, {});
  return data;
};

const getUserById = async (id) => {
  const { data } = await axios.get(`https://yopex-api.tabaani.co/${id}`, {});
  return data;
};

const followUser = async (otheruserId, userId) => {
  const { data } = await axios.put(`${url}/toggleFollow/${otheruserId}`, {
    userId,
  });
  return data;
};

const getBadgesEarnedByUser = async (userId) => {
  const { data } = await axios.get(
    `https://yopex-api.tabaani.co/${userId}/badges`,
    {}
  );
  return data;
};

const getUserStats = async (myData) => {
  const { data } = await axios.get(
    "https://yopex-api.tabaani.co/users/stats",
    {}
  );
  return data;
};

export const userService = {
  searchUsers,
  getAllUsers,
  getUserFriends,
  getUserFollowings,
  getSuggestedUsers,
  getUserById,
  followUser,
  getBadgesEarnedByUser,
  getUserStats,
};
