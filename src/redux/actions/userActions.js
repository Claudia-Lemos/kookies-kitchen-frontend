import axios from 'axios';
import { loadCart } from './cartActions';  //check

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

    dispatch(loadCart(user.id));  // check
  } catch (error) {
    console.error('Login failed:', error.response ? error.response.data : error.message);
    dispatch({
      type: 'USER_LOGIN_FAIL',
    });
  }
};
