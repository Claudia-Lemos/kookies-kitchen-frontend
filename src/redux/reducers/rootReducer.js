import { combineReducers } from 'redux';
import menuReducer from './menuReducer'; 

const rootReducer = combineReducers({
  menu: menuReducer, // Menu reducer is responsible for managing the menu state
});

export default rootReducer;
