// index.js

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './App'; // Main App component
import store from './redux/store'; // Redux store
import "./index.css" 

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>  {/* Wrap the app in BrowserRouter for routing */}
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
