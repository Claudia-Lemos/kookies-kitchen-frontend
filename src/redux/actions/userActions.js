import axios from 'axios';
import { loadCart } from './cartActions';  // Assuming you have a loadCart action

export const loginUser = (email, password) => async (dispatch) => {
  try {
    const response = await axios.post('http://localhost:5000/api/login', { email, password });
    const { token, user } = response.data;
    localStorage.setItem('token', token);

    // Dispatch actions
    dispatch({
      type: 'USER_LOGIN_SUCCESS',
      payload: user,
    });

    // Dispatch loadCart after login (make sure to pass user.id)
    dispatch(loadCart(user.id));  // Assuming you have a loadCart action to fetch cart items for the user
  } catch (error) {
    console.error('Login failed:', error.response ? error.response.data : error.message);
    dispatch({
      type: 'USER_LOGIN_FAIL',
    });
  }
};
