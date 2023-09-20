import axios from "axios";

const url = "http://yopex-api.tabaani.co";

const searchUsers = async (searchKeyword) => {
  const { data } = await axios.get(`${url}/users`, {
    params: {
      search: searchKeyword,
    },
    withCredentials: true,
  });
  return data;
};

const getAllUsers = async () => {
  const { data } = await axios.get(`${url}/allusers`, {
    withCredentials: true,
  });
  return data;
};

const getUserFriends = async (userId) => {
  const { data } = await axios.get(`${url}/find/friends/${userId}`, {
    withCredentials: true,
  });
  return data;
};

const getUserFollowings = async (userId) => {
  const { data } = await axios.get(`${url}/find/followings/${userId}`, {
    withCredentials: true,
  });
  return data;
};

const getSuggestedUsers = async (myData) => {
  const { data } = await axios.get(`${url}/find/suggestedUsers`, {
    withCredentials: true,
  });
  return data;
};

const getUserById = async (id) => {
  const { data } = await axios.get(`http://yopex-api.tabaani.co/${id}`, {
    withCredentials: true,
  });
  return data;
};

const followUser = async (otheruserId, userId) => {
  const { data } = await axios.put(
    `${url}/toggleFollow/${otheruserId}`,
    { userId },
    { withCredentials: true }
  );
  return data;
};

const getBadgesEarnedByUser = async (userId) => {
  const { data } = await axios.get(
    `http://yopex-api.tabaani.co/${userId}/badges`,
    {
      withCredentials: true,
    }
  );
  return data;
};

const getUserStats = async (myData) => {
  const { data } = await axios.get("http://yopex-api.tabaani.co/users/stats", {
    withCredentials: true,
  });
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
