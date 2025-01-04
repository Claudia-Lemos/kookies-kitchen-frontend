// actions/menuActions.js
import { FETCH_MENU_REQUEST, FETCH_MENU_SUCCESS, FETCH_MENU_FAILURE } from '../actionTypes';

export const fetchMenuItems = () => async (dispatch) => {
  try {
    // Dispatch request action before API call
    dispatch({ type: FETCH_MENU_REQUEST });

    // Replace 'YOUR_API_URL' with the actual API endpoint you're calling to fetch menu items
    const response = await fetch('http://localhost:5000/api/menu');  // Correct URL to your backend API
    
    // Check if the response is successful
    if (!response.ok) {
      throw new Error('Failed to fetch menu items');
    }
    
    // Parse the response JSON
    const data = await response.json();
    
    // Log the fetched data to check its structure
    console.log('Fetched menu items:', data);

    // Dispatch success action with fetched data
    dispatch({ type: FETCH_MENU_SUCCESS, payload: data });
  } catch (error) {
    // Dispatch failure action with the error message
    dispatch({ type: FETCH_MENU_FAILURE, payload: error.message });
  }
};
