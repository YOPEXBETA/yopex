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
    try{
    const user = await axios.put(
      ` http://localhost:8000/users/edit`,
     data,
      { withCredentials: true 
      }
    );
    console.log("this is the user",user.data);
    return user.data;
  }catch(error){
  console.log(error);
  return error;
  }
};

const getcurrentuser = async () =>{
  const user = await axios.get("http://localhost:8000/me",{ withCredentials: true });
  return user.data;
   
}

export const authService = { register, login, edit, getcurrentuser };
