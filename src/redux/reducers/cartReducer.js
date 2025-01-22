const initialState = {
  items: [],
};

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      return {
        ...state,
        items: [...state.items, { ...action.payload.item, email: action.payload.userEmail, quantity: 1 }],
      };
    case 'UPDATE_CART_ITEM':
      return {
        ...state,
        items: state.items.map(item =>
          item.itemId === action.payload.itemId && item.email === action.payload.userEmail
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        items: state.items.filter(item => item.itemId !== action.payload.itemId || item.email !== action.payload.userEmail),
      };
    default:
      return state;
  }
};


export default cartReducer;
