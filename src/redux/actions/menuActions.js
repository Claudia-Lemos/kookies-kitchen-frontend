import { FETCH_MENU_REQUEST, FETCH_MENU_SUCCESS, FETCH_MENU_FAILURE } from '../actionTypes';

export const fetchMenuItems = () => async (dispatch) => {
  try {
    dispatch({ type: FETCH_MENU_REQUEST });

    const response = await fetch('http://localhost:5000/api/menu');

    if (!response.ok) {
      throw new Error('Failed to fetch menu items');
    }

    const data = await response.json();
    dispatch({ type: FETCH_MENU_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: FETCH_MENU_FAILURE, payload: error.message });
  }
};
