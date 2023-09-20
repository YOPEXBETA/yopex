import axios from "axios";

const url = "https://yopex-api.tabaani.co";

const register = async (data) => {
  console.log(data);
  const user = await axios.post(`${url}/auth/register`, data);
  return user.data;
};

const login = async (data) => {
  const user = await axios.post(`https://yopex-api.tabaani.co/auth/login`, data);
     console.log("login response:", user.data);

    // dispatch({
    //   type: "login_success",
    //   payload: {
    //     user: user.data,
    //     token: data.token,
    //     role: data.role,
    //   },
    // });

    localStorage.setItem("user", JSON.stringify(user.data));
  return user.data;
};

const edit = async (data) => {
  const user = await axios.put(
    ` https://yopex-api.tabaani.co/users/edit`,
    data,
    {
      
    }
  );

  return user.data;
};

const getcurrentuser = async () => {
  const user = await axios.get("https://yopex-api.tabaani.co/me", {
    
  });
  return user.data;
};

export const authService = { register, login, edit, getcurrentuser };
