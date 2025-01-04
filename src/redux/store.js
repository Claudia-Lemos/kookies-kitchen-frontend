import { configureStore } from '@reduxjs/toolkit'; // import configureStore from Redux Toolkit
import rootReducer from './reducers'; // your root reducer
import {thunk} from 'redux-thunk'; // named import from redux-thunk

// Create the Redux store and apply middleware (redux-thunk)
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk), // Add thunk middleware
});

export default store;
