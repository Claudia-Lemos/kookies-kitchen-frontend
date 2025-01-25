import { jwtDecode } from 'jwt-decode';  

// Action to load user from localStorage (if token exists)
export const loadUserFromLocalStorage = () => async (dispatch) => {
  const token = localStorage.getItem('authToken');
  
  if (token) {
    try {
      // Decode the token to get user data
      const decodedUser = jwtDecode(token); 

      // Check if token is expired
      const currentTime = Date.now() / 1000;
      if (decodedUser.exp < currentTime) {
        // If token is expired, remove it and mark as not authenticated
        localStorage.removeItem('authToken');
        dispatch({
          type: 'USER_LOGIN_FAIL',
          payload: { isAuthenticated: false },
        });
        return;
      }

      // Dispatch the user data to Redux store
      dispatch({
        type: 'USER_LOGIN_SUCCESS',
        payload: {
          token,
          role: decodedUser.role,
          email: decodedUser.email,
          user: decodedUser,  // Store the decoded user data
          isAuthenticated: true, // Mark as authenticated
        },
      });
    } catch (error) {
      console.error('Failed to load user:', error);
      dispatch({
        type: 'USER_LOGIN_FAIL', // If token decoding fails, dispatch login failure
      });
    }
  } else {
    // If no token, mark as not authenticated
    dispatch({
      type: 'USER_LOGIN_FAIL',
      payload: { isAuthenticated: false },
    });
  }
};

// Action for user logout
export const logoutUser = () => (dispatch) => {
  localStorage.removeItem('authToken'); // Remove token from localStorage on logout
  dispatch({
    type: 'USER_LOGOUT',
    payload: { isAuthenticated: false }, // Mark user as not authenticated
  });
};
