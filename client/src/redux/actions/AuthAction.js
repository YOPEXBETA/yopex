import axios from "axios";
import Cookies from "js-cookie";

export const register = (myData) => async (dispatch) => {
  try {
    console.log("register data:", myData);

    const { data } = await axios.post(
      "https://yopex-api.tabaani.co/auth/register",
      myData
    );

    console.log("register response:", data);

    dispatch({
      type: "register_success",
      payload: data,
    });

    return data;
  } catch (error) {
    console.log("register error:", error.response.data);
    alert(JSON.stringify(error.response.data.error.msg));

    dispatch({
      type: "register_error",
      payload: error.response.data,
    });
  }
};

export const login = (myData) => async (dispatch) => {
  try {
    console.log("login data:", myData);

    const { data } = await axios.post(
      "https://yopex-api.tabaani.co/auth/login",
      myData,
      {
        
      }
    );

    console.log("login response:", data);

    dispatch({
      type: "login_success",
      payload: {
        user: data.user,
        token: data.token,
        role: data.role,
      },
    });

    localStorage.setItem("user", JSON.stringify(data));

    return data;
  } catch (error) {
    if (error.response.data.error.msg != undefined) {
      console.log("login error:", error.response.data);
      alert(JSON.stringify(error.response.data.error.msg));
    } else alert(JSON.stringify(error.response.data.error));

    dispatch({
      type: "login_error",
      payload: error.response.data,
    });
  }
};

export const forgetPassword = (myData) => async (dispatch) => {
  try {
    console.log("forget password data:", myData);

    const { data } = await axios.post(
      "https://yopex-api.tabaani.co/auth/forgetpassword",
      myData
    );

    console.log("forget password response:", data);

    dispatch({
      type: "forget_password_success",
      payload: data,
    });

    return data;
  } catch (error) {
    console.log("forget password error:", error.response.data);

    dispatch({
      type: "forget_password_error",
      payload: error.response.data,
    });
  }
};

export const resetPassword = (myData) => async (dispatch) => {
  try {
    const { data } = await axios.post(
      "https://yopex-api.tabaani.co/auth/resetpassword",
      myData
    );

    console.log("reset password response:", data);

    dispatch({
      type: "reset_password_success",
      payload: data,
    });

    return data;
  } catch (error) {
    console.log("reset password error:", error.response.data);

    dispatch({
      type: "reset_password_error",
      payload: error.response.data,
    });
  }
};

export const emailVerification = (token) => async (dispatch) => {
  try {
    const { data } = await axios.post(
      `https://yopex-api.tabaani.co/auth/emailverification/${token}`
    );

    console.log("Email verification :", data);

    dispatch({
      type: "reset_password_success",
      payload: data,
    });

    return data;
  } catch (error) {
    console.log("reset password error:", error.response.data);

    dispatch({
      type: "reset_password_error",
      payload: error.response.data,
    });
  }
};

export const logout = () => async (dispatch) => {
  try {
    localStorage.removeItem("accessToken");

    dispatch({
      type: "logout_success",
    });
  } catch (error) {
    console.log("logout error:", error);

    dispatch({
      type: "logout_error",
      payload: error,
    });
  }
};

export const verifyface = (myData) => async (dispatch) => {
  try {
    console.log("login data:", myData);

    const { data } = await axios.post(
      "https://yopex-api.tabaani.co/facerecog/verifyface",
      myData,
      {
        
      }
    );

    console.log("login response:", data);

    dispatch({
      type: "verify_face_success",
      payload: {
        user: data.user,
        token: data.token,
      },
    });

    localStorage.setItem("user", JSON.stringify(data.user));

    return data;
  } catch (error) {
    if (error.response.data.error != undefined) {
      console.log("login error:", error.response.data);
    }

    dispatch({
      type: "verify_face_error",
      payload: error.response.data,
    });
  }
};

export const addface = (myData) => async (dispatch, getState) => {
  try {
    console.log("login data:", myData);
    const token = getState().Auth.token;

    const { data } = await axios.post(
      "https://yopex-api.tabaani.co/facerecog/addface",
      myData,
      {
        
      }
    );

    console.log("login response:", data);

    if (data.status == "success") {
      dispatch({
        type: "add_face_success",
      });
      const user = JSON.parse(localStorage.getItem("user"));
      user.isFaceRecognition = true;
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      dispatch({
        type: "add_face_error",
        payload: data.message,
      });
    }

    return data;
  } catch (error) {
    if (error.response.data.error.msg != undefined) {
      console.log("login error:", error.response.data);
    }

    dispatch({
      type: "add_face_error",
      payload: error.response.data,
    });
  }
};
