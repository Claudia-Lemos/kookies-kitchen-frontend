import { USER_LOGIN_SUCCESS, USER_LOGIN_FAIL } from '../actionTypes';

export const loginUser = (user) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: user,
      });
    } catch (error) {
      dispatch({ type: USER_LOGIN_FAIL });
    }
  };
};

export const logoutUser = () => (dispatch) => {
  localStorage.removeItem('token'); // Remove token
  dispatch({
    type: 'LOGOUT_USER',
  });
};
