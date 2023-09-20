import axios from "axios";

export const addComment = (myData) => async (dispatch) => {
  try {
    const { data } = await axios.post(
      "https://yopex-api.tabaani.co/comment/",
      myData,
      
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
      `https://yopex-api.tabaani.co/comment/${postId}`,
      
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
