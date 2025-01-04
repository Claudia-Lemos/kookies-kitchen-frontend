// cartActions.js

import axios from 'axios';

// Action types
export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const UPDATE_CART_ITEM = 'UPDATE_CART_ITEM';
export const LOAD_CART_SUCCESS = 'LOAD_CART_SUCCESS';
export const LOAD_CART_FAIL = 'LOAD_CART_FAIL';

// Action to add item to cart
export const addToCart = (item) => {
  return {
    type: ADD_TO_CART,
    payload: item,
  };
};

// Action to remove item from cart
export const removeFromCart = (id) => {
  return {
    type: REMOVE_FROM_CART,
    payload: id,
  };
};

// Action to update item quantity in cart
export const updateCartItem = (id, quantity) => {
  return {
    type: UPDATE_CART_ITEM,
    payload: { id, quantity },
  };
};

// Action to load cart from the backend
export const loadCart = (userId) => async (dispatch) => {
  try {
    const response = await axios.get(`http://localhost:5000/api/cart/${userId}`);
    dispatch({
      type: LOAD_CART_SUCCESS,
      payload: response.data,  // Assuming the response contains cart items
    });
  } catch (error) {
    console.error('Error loading cart:', error.message);
    dispatch({
      type: LOAD_CART_FAIL,
      payload: error.message,
    });
  }
};
