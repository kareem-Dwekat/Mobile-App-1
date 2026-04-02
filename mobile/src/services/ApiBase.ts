import axios from "axios";

export const API_URL = "https://your-api.com"; 

const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 10000,
});

export default axiosInstance;