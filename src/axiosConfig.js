// src/axiosConfig.js

import axios from 'axios';

// If a token exists in localStorage, add it to the Authorization header
const token = localStorage.getItem('token');
if (token) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

export default axios;
