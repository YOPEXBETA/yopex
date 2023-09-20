import axios from "axios";

export const getFeedPosts = async (dispatch, getState) => {
  try {
    const token = getState().Auth.token;
    console.log(token);
    let url = "http://yopex-api.tabaani.co/post/posts";

    const { data } = await axios.get(url, {
      withCredentials: true,
    });
    console.log("data:", data);
    dispatch({
      type: "getJobPosts",
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
};
