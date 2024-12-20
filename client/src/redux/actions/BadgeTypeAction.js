import axios from "axios";

export const getBadgeType = () => async (dispatch) => {
  try {
    const response = await axios.get(
      "https://yopex-api.tabaani.co/badgeType/badgeTypes",
      
    );
    console.log("getBadgeType", response.data);
    dispatch({
      type: "getBadgeType",
      payload: response.data,
    });
  } catch (error) {
    console.log("error:", error);
  }
};

export const addBadge = (badgeData) => async (dispatch) => {
  try {
    const { data } = await axios.post(
      "https://yopex-api.tabaani.co/badgeType/add",
      badgeData,
      
    );
    console.log("addBadge", data);

    dispatch({
      type: "addBadge",
      payload: data,
    });
    return data;
  } catch (error) {
    console.log("error:", error);
  }
};
