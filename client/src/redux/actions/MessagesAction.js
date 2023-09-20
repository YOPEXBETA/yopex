import axios from "axios";

export const getMessages = (conversationId) => async (dispatch) => {
  try {
    const response = await axios.get(
      `https://yopex-api.tabaani.co/messages/${conversationId}`,
      
    );

    dispatch({
      type: "getMessages",
      payload: response.data,
    });
    console.log(response.data, "lms");
  } catch (error) {
    console.log("error:", error);
  }
};

export const CreateMessage =
  (conversationId, message, sender) => async (dispatch) => {
    try {
      const response = await axios.post(
        `https://yopex-api.tabaani.co/messages/`,
        { conversationId, message, sender },
        {
          
        }
      );
      dispatch({
        type: "CreateMessage",
        payload: response.data,
      });
    } catch (error) {
      console.log("error:", error);
    }
  };
