import axios from "axios";

export const getReviews = (userId) => async (dispatch) => {
  try {
    console.log(userId);
    const response = await axios.get(
      `https://yopex-api.tabaani.co/reviews/${userId}`,
      
    );

    dispatch({
      type: "get_Reviews_success",
      payload: response.data,
    });
  } catch (error) {
    console.log("error:", error);
    dispatch({
      type: "get_Reviews_error",
      payload: error.response.data,
    });
  }
};

export const addReview = (review) => async (dispatch) => {
  try {
    const response = await axios.post(
      `https://yopex-api.tabaani.co/review/create`,
      review,
      
    );

    dispatch({
      type: "add_Review_success",
      payload: response.data,
    });
  } catch (error) {
    console.log("error:", error);
    dispatch({
      type: "add_Review_error",
      payload: error.response.data,
    });
  }
};
