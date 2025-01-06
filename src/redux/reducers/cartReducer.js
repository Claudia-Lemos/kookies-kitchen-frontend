// cartReducer.js
const initialState = {
  items: [], // Cart items will be stored here
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOAD_CART':
      return {
        ...state,
        items: action.payload,
      };
    case 'ADD_TO_CART':
      return {
        ...state,
        items: [...state.items, action.payload],
      };
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload),
      };
    case 'UPDATE_CART_ITEM':
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload.itemId
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };
    case 'RESET_CART':
      return initialState;
    default:
      return state;
  }
};

export default cartReducer;
