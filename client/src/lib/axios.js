import axios from "axios";

export const axiosInstance = axios.create({
   baseURL: "http://localhost:5000/api", // or your actual backend URL
   withCredentials: true, // if using cookies/session
});