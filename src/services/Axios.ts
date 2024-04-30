import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/api",

  timeout: 10000,

  headers: {
    "X-Custom-Header": "value",
    Accept: "application/json",
  },
});

axiosInstance.interceptors.request.use((config) => {
  return config;
});

export default axiosInstance;
