// reducers/index.js
import { combineReducers } from 'redux';
import authReducer from './authReducer';
import cartReducer from './cartReducer';
import menuReducer from './menuReducer';
import userReducer from './userReducer'; 

const rootReducer = combineReducers({
  user: userReducer,      // Manage user authentication and profile state
  cart: cartReducer,      // Manage cart-related state
  menu: menuReducer,      // Manage menu items state
  auth: authReducer,      // Manage authentication-related state (optional, if needed separately)
});

export default rootReducer;
