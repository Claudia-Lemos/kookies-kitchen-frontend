import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers';  // Ensure the rootReducer is correctly set up
import {thunk} from 'redux-thunk'; // Redux-thunk middleware

// Create the Redux store and apply middleware (redux-thunk)
const store = configureStore({
  reducer: rootReducer,  // Combine your reducers here
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),  // Add redux-thunk to the middleware pipeline
});

export default store;
