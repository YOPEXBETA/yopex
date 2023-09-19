import axios from "axios";

export const getCategories = () => async (dispatch) => {
  try {
    const response = await axios.get(
      "http://199.247.3.38:8000/category/getCategories",
      {
        withCredentials: true,
      }
    );

    dispatch({
      type: "getCategories",
      payload: response.data,
    });
  } catch (error) {
    console.log("error:", error);
  }
};
