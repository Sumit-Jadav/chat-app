import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5001/api", //? BaseUrl of our api
  withCredentials: true, //? For enabling cookies
});

export default axiosInstance;
