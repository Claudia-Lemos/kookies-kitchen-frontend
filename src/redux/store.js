import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers'; 
import {thunk} from 'redux-thunk'; 

// Create the Redux store and apply middleware (redux-thunk)
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk), // Add thunk middleware
});

export default store;
