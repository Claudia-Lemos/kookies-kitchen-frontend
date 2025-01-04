import { combineReducers } from 'redux';
import { cartReducer } from './cartReducer';
import menuReducer  from './menuReducer'; // Assuming you have this

const rootReducer = combineReducers({
  cart: cartReducer,
  menu: menuReducer,
  // Add other reducers here if needed
});

export default rootReducer;
