import axios from "axios";

const url = "http://localhost:8000";

const register = async (data) => {
  const user = await axios.post(`${url}/auth/register`, data);
  return user.data;
};

const login = async (data) => {
  const user = await axios.post(`${url}/auth/login`, data, {
    withCredentials: true,
  });
  return user.data;
};

const edit = async (data) => {
  const currentUser = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;

  if (!currentUser) throw new Error("User not logged in");

  const user = await axios.put(
    ` http://localhost:8000/users/${currentUser._id}`,
    data,
    { withCredentials: true }
  );
  console.log("this is the user",user.data);
  return user.data;
};

export const authService = { register, login, edit };
