// store.js
import { createStore, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
import rootReducer from './reducers';  // Import the combined rootReducer

// Create the Redux store and apply middleware for async actions (e.g., redux-thunk)
const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
