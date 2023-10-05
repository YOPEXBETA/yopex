// EditProfileActions.js
import axios from "axios";

export const userEditProfile = (formData, myData) => async (dispatch) => {
  try {
    console.log("edit profile data:", formData);

    const { data } = await axios.put(
      `https://yopex-api.tabaani.co/users/${myData._id}`,
      formData,
      
    );

    console.log("edit profile response:", JSON.stringify(data));
    localStorage.setItem("user", JSON.stringify(data));
    dispatch({
      type: "user_edit_profile_success",
    });
    setTimeout(() => {
      dispatch({
        type: "RESET_SUCCESS",
      });
    }, 3000);
    return data;
  } catch (error) {
    console.log("edit profile error:", error.response.data);

    dispatch({
      type: "user_edit_profile_error",
      payload: error.response.data,
    });
  }
};
