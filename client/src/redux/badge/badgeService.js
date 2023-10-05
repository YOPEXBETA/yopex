import axios from "axios";
const url = "https://yopex-api.tabaani.co";

const getBadgeType = async () => {
  const { data } = await axios.get(`${url}/badgeType/badgeTypes`, {
    
  });
  return data;
};

const addBadge = async (badgeData) => {
  const { data } = await axios.post(`${url}/badgeType/add`, badgeData, {
    
  });
  return data;
};

export const badgeService = { getBadgeType, addBadge };
