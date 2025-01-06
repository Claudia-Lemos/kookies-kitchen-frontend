// userReducer.js


const initialState = {
  isAuthenticated: false,
  token: null,
  role: null,
  email: null,  // Add email to initial state
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        isAuthenticated: true,
        token: action.payload.token,
        role: action.payload.role,
        email: action.payload.email,  // Ensure email is added to state
      };
    case 'LOGOUT_USER':
      return {
        ...state,
        isAuthenticated: false,
        token: null,
        role: null,
        email: null,  // Reset email when logging out
      };
    default:
      return state;
  }
};

export default userReducer;
