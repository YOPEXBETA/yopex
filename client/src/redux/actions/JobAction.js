import axios from "axios";

export const getFeedPosts = async (dispatch, getState) => {
  try {
    const token = getState().Auth.token;
    console.log(token);
    let url = "http://199.247.3.38:8000/post/posts";

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
