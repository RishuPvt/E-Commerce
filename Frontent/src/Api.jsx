import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:7000", // Backend server URL
  withCredentials: true, // For sending cookies
});

export default API;


export const backebdUrl = "https://e-commerce-r9xo.onrender.com/api/v1"

//export const backebdUrl = "http://localhost:7000/api/v1"