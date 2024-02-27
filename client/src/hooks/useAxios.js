import axios from "axios";

axios.interceptors.request.use(
  (config) => {
    // add base url
    config.baseURL = "https://api.yopexhub.com";
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers["Authorization"] = "token " + token;
    }
    return config;
  },
  (error) => {
    console.log({ error });
    Promise.reject(error);
  }
);

export { axios };
