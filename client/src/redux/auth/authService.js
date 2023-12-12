import { axios } from "../../axios";

const url = process.env.REACT_APP_API_ENDPOINT;

const register = async (data) => {
  const user = await axios.post(`${url}/auth/register`, data);
  return user.data;
};

const login = async (data) => {
  const user = await axios.post(`${url}/auth/login`, data);
  localStorage.setItem("accessToken", user.data.token);
  // set accessToken to axios default header
  // dispatch({
  //   type: "login_success",
  //   payload: {
  //     user: user.data,
  //     token: data.token,
  //     role: data.role,
  //   },
  // });

  return user.data;
};

const edit = async (data) => {
  const user = await axios.put(`${url}/users/edit`, data, {
    withCredentials: false,
  });

  return user.data;
};

const getcurrentuser = async () => {
  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken) {
    return undefined;
  }
  if (
    accessToken === undefined ||
    accessToken === null ||
    accessToken === "" ||
    accessToken === "null" ||
    accessToken === "undefined"
  ) {
    axios
      .get(`${url}/me`)
      .then((res) => {
        console.log(res.data);
        return undefined;
      })
      .catch((error) => {
        return undefined;
      });
  } else {
    const user = await axios.get(`${url}/me`);
    return user.data;
  }

  //
};

const editProfileLinks = async (data) => {
  const user = await axios.put(`${url}/users/edit/socialMedia`, data, {
    withCredentials: false,
  });
  
  return user.data;
};

export const authService = { register, login, edit, getcurrentuser,editProfileLinks };
