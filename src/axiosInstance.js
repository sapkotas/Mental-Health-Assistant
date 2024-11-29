import axios from "axios";

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: "https://mental-health-assistant-ml.onrender.com", // Base URL for the API
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer <token>",
    Accept: "*/*",
    // Add any other custom headers here
  },
});

// Request Interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");


    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }

    // Check if the request is for uploading a file
    if (config.data instanceof FormData) {
      // For file uploads, set Content-Type to multipart/form-data
      config.headers["Content-Type"] = "multipart/form-data";
    }


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
