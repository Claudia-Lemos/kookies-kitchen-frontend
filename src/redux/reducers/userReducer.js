const initialState = {
  isAuthenticated: false,
  user: null,
  token: null,
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'USER_LOGIN_SUCCESS':
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
      };
    case 'USER_LOGOUT':
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        token: null,
      };
    default:
      return state;
  }
};

export default userReducer;
