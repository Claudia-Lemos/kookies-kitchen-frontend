import { combineReducers } from 'redux';
import menuReducer from './menuReducer'; 
import { cartReducer } from './cartReducer';
import { userReducer } from './userReducer'; 

const rootReducer = combineReducers({
  menu: menuReducer, 
  cart: cartReducer,
  user: userReducer,
});

export default rootReducer;


