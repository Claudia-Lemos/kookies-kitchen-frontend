const initialState = {
  token: null,
  role: null,
  email: null,
  user: null,
  isAuthenticated: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'USER_LOGIN_SUCCESS':
      return {
        ...state,
        token: action.payload.token,
        role: action.payload.role,
        email: action.payload.email,
        user: action.payload.user,
        isAuthenticated: true,
      };
    case 'USER_LOGIN_FAIL':
      return {
        ...state,
        token: null,
        role: null,
        email: null,
        user: null,
        isAuthenticated: false,
      };
    case 'USER_LOGOUT':
      return {
        ...state,
        token: null,
        role: null,
        email: null,
        user: null,
        isAuthenticated: false,
      };
    default:
      return state;
  }
};

export default authReducer;
