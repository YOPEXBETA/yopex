import axios from "axios";

const url = "http://199.247.3.38:8000";

const register = async (data) => {
  console.log(data);
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
  const user = await axios.put(` http://199.247.3.38:8000/users/edit`, data, {
    withCredentials: true,
  });

  return user.data;
};

const getcurrentuser = async () => {
  const user = await axios.get("http://199.247.3.38:8000/me", {
    withCredentials: true,
  });
  return user.data;
};

export const authService = { register, login, edit, getcurrentuser };
