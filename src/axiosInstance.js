import axios from 'axios';
import API_BASE_URL from './config'; // Ensure this imports the string

// Create Axios instance
const axiosInstance = axios.create({
  baseURL: API_BASE_URL, // This should be the string "http://localhost:5000"
  headers: {
    'Content-Type': 'application/json',
  },
});

// Automatically attach token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');  // Ensure the correct token key
    console.log('Token being sent:', token); // Log the token to ensure it's attached to requests
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);


export default axiosInstance;
