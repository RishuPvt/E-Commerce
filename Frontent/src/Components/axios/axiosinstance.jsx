import axios from "axios";
import { backebdUrl } from "../../Api";

// Axios instance for API requests
const axiosinstance = axios.create({
  baseURL: `${backebdUrl}`, // Replace with your API's base URL
  withCredentials: true, // Send cookies with requests
});

// Access token variable
let accessToken = localStorage.getItem("accessToken");
let isRefreshing = false;
let failedQueue = [];

// Process queued requests after refresh
const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

// Request interceptor to attach the access token
axiosinstance.interceptors.request.use(
  (config) => {
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle token expiration
axiosinstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Check for token expiration (401 Unauthorized)
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // If a refresh is in progress, queue the request
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return api(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true; // Mark the request for retrying
      isRefreshing = true;

      try {
        // Refresh token by calling the backend
        const response = await axios.post(
          `${backebdUrl}/users/refresh-token`,
          {},
          { withCredentials: true } // Ensure cookies are sent
        );

        const { accessToken: newAccessToken, refreshToken } = response.data.data;

        // Update access token in memory and storage
        accessToken = newAccessToken;
        localStorage.setItem("accessToken", newAccessToken);

        // Retry the original request with the new token
        processQueue(null, newAccessToken);
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        // Handle refresh failure
        processQueue(refreshError, null);
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default axiosinstance;
