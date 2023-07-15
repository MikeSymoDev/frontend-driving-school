import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://backend-driving-school-99d5f092ee9a.herokuapp.com/backend/api",
});

axiosInstance.defaults.baseURL =
  "https://backend-driving-school-99d5f092ee9a.herokuapp.com/backend/api/";
axiosInstance.defaults.headers.post["Content-Type"] = "application/json";

export default axiosInstance;
