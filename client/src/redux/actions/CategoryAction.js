import axios from "axios";

export const getCategories = () => async (dispatch) => {
  try {
    const response = await axios.get(
      "https://yopex-api.tabaani.co/category/getCategories",
      
    );

    dispatch({
      type: "getCategories",
      payload: response.data,
    });
  } catch (error) {
    console.log("error:", error);
  }
};
