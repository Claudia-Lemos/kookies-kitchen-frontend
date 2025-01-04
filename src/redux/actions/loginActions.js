// import axios from 'axios';

// export const loginUser = (email, password) => async (dispatch) => {
//   try {
//     // POST request to backend's /api/login endpoint
//     const response = await axios.post('/api/login', { email, password });

//     const data = response.data;
//     if (data.token) {
//       // Store token in localStorage and set user in Redux
//       localStorage.setItem('token', data.token);
//       dispatch({
//         type: 'SET_USER',
//         payload: data.user, // Store user data in Redux
//       });
//     }

//   } catch (error) {
//     console.error("Login failed:", error);
//     throw new Error(error.response?.data?.message || 'Login failed');
//   }
// };
