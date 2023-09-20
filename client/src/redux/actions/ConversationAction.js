import axios from "axios";

export const getConversations = (userId) => async (dispatch) => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user._id;

    const response = await axios.get(
      `https://yopex-api.tabaani.co/conversation/${userId}`,
      {
        withCredentials: true,
      }
    );
    console.log("getMessages", response.data);
    dispatch({
      type: "getConversations",
      payload: response.data,
    });
  } catch (error) {
    console.log("error:", error);
  }
};
export const CreateConversation = (data) => async (dispatch, getState) => {
  try {
    const token = getState().Auth.token;
    console.log(token);
    const response = await axios.post(
      `https://yopex-api.tabaani.co/conversation/`,
      {
        senderId: data.senderId,
        receiverId: data.receiverId,
      },
      {
        withCredentials: true,
      }
    );
    console.log("gf", response);
    dispatch({
      type: "send_message_success",
      payload: response.data,
    });
  } catch (error) {
    console.log("error:", error);
  }
};
