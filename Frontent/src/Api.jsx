import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:7000", // Backend server URL
  withCredentials: true, // For sending cookies
});

export default API;
