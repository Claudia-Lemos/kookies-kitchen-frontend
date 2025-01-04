export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'USER_LOGIN_SUCCESS':
      return {
        ...state,
        isAuthenticated: true,  // Make sure this is correctly updated
        user: action.payload,
        token: localStorage.getItem('token'), // Store token from localStorage
      };
    case 'USER_LOGIN_FAIL':
      return {
        ...state,
        isAuthenticated: false,  // This will be false if login fails
        user: null,
        token: null,
      };
    default:
      return state;
  }
};
