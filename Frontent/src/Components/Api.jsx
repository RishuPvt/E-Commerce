import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:7000/api/v1',
  withCredentials: true, // For cookies
});

// Add Authorization header if token exists
API.interceptors.request.use((req) => {
  const token = localStorage.getItem('accessToken');
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

export default API;
