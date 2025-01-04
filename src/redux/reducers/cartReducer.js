const initialState = {
  items: [],
  loading: false,
  error: null,
};

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOAD_CART_REQUEST':
      return { ...state, loading: true };
    case 'LOAD_CART_SUCCESS':
      return { ...state, loading: false, items: action.payload };
    case 'LOAD_CART_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
