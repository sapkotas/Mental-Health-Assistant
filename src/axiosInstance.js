import axios from "axios";

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: "https://mental-health-assistant-ml.onrender.com", // Base URL for the API
  timeout: 5000, // Set a timeout for requests
});

// Request Interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Modify request config if needed, e.g., add an Authorization header
    console.log("Request sent: ", config);
    return config;
  },
  (error) => {
    // Handle request error
    console.error("Request error: ", error);
    return Promise.reject(error);
  }
);

// Response Interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    // Modify response data if needed
    console.log("Response received: ", response);
    return response;
  },
  (error) => {
    // Handle response errors
    console.error("Response error: ", error.response || error.message);
    return Promise.reject(error);
  }
);

export default axiosInstance;
