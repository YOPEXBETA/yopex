import axios from "axios";

export const addComment = (myData) => async (dispatch) => {
  try {
    const { data } = await axios.post(
      "http://199.247.3.38:8000/comment/",
      myData,
      {
        withCredentials: true,
      }
    );

    console.log(data);
    dispatch({
      type: "addComment",
      payload: { postId: myData.postId, comment: data },
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getComments = (postId) => async (dispatch) => {
  try {
    const response = await axios.get(
      `http://199.247.3.38:8000/comment/${postId}`,
      {
        withCredentials: true,
      }
    );
    const comments = response.data;

    dispatch({
      type: "getComments",
      payload: { postId, comments },
    });
  } catch (error) {
    console.log("error:", error);
  }
};
