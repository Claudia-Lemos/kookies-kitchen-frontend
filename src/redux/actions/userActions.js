// src/redux/actions/userActions.js
import axios from 'axios';

// Action to load user from localStorage
export const loadUserFromLocalStorage = () => (dispatch) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const token = localStorage.getItem('token');

  if (user && token) {
    dispatch({
      type: 'USER_LOGIN_SUCCESS',
      payload: { user, token, email: user.email, role: user.role },
    });
  } else {
    dispatch({ type: 'USER_LOGOUT' });
  }
};


// Action to log out the user
export const logoutUser = () => (dispatch) => {
  // Clear localStorage and dispatch logout
  localStorage.removeItem('user');
  localStorage.removeItem('token');
  dispatch({
    type: 'USER_LOGOUT',
  });
};

// Action to login user (handles API call)
export const loginUser = (userData) => async (dispatch) => {
  try {
    dispatch({ type: 'USER_LOGIN_REQUEST' });

    // Make the API call to the backend
    const response = await axios.post('http://localhost:5000/api/auth/login', userData);

    // Assuming the response data contains token and user details
    if (response.data.token) {
      const { user, token } = response.data;

      // Store user and token in localStorage
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('authToken', token);  // Ensure you are using 'authToken' here

      // Dispatch the success action
      dispatch({
        type: 'USER_LOGIN_SUCCESS',
        payload: { user, role: user.role, email: user.email, token },
      });
    } else {
      dispatch({
        type: 'USER_LOGIN_FAIL',
        payload: response.data.message || 'Login failed',
      });
    }
  } catch (error) {
    console.error('Login error:', error);
    dispatch({
      type: 'USER_LOGIN_FAIL',
      payload: error.response?.data?.message || 'Server error',
    });
  }
};

