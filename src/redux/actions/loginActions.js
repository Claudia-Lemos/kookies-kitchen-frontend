// loginAction.js (userActions.js)
import axios from 'axios';

// Action to load user from localStorage
export const loadUserFromLocalStorage = () => (dispatch) => {
  try {
    const user = JSON.parse(localStorage.getItem('user'));
    const token = localStorage.getItem('authToken');
    if (user && token) {
      dispatch({
        type: 'USER_LOGIN_SUCCESS',
        payload: { user, token },
      });
    }
  } catch (error) {
    console.error('Error loading user from localStorage:', error);
  }
};

// Action to log out the user
export const logoutUser = () => (dispatch) => {
  localStorage.removeItem('user');
  localStorage.removeItem('authToken');
  dispatch({
    type: 'USER_LOGOUT',
  });
};

// Action to log in the user (ensure token is stored)
export const loginUser = (email, password) => async (dispatch) => {
  try {
    const response = await axios.post('/api/login', { email, password });
    const { token, user } = response.data;

    // Store token and user in localStorage
    localStorage.setItem('authToken', token);  // Store token as 'authToken'
    localStorage.setItem('user', JSON.stringify(user));  // Store user

    dispatch({
      type: 'USER_LOGIN_SUCCESS',
      payload: user,
    });
  } catch (error) {
    console.error('Login error:', error);
  }
};
