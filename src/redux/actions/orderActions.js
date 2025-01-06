import axios from 'axios';

// Action to add item to the cart
export const addToCart = (item) => {
  return {
    type: 'ADD_TO_CART',
    payload: item,
  };
};

// Action to remove item from the cart
export const removeFromCart = (id) => {
  return {
    type: 'REMOVE_FROM_CART',
    payload: id,
  };
};

// Action to create an order
export const createOrder = (order) => async (dispatch) => {
  try {
    const { data } = await axios.post('/api/orders', order); 
    dispatch({
      type: 'CREATE_ORDER_SUCCESS',
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: 'CREATE_ORDER_FAIL',
      payload: error.message,
    });
  }
};

// Action to accept an order
export const acceptOrder = (orderId) => async (dispatch) => {
  try {
    const { data } = await axios.patch(`/api/orders/update/${orderId}`, {
      status: 'accepted',
    });
    dispatch({
      type: 'ACCEPT_ORDER_SUCCESS',
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: 'ACCEPT_ORDER_FAIL',
      payload: error.message,
    });
  }
};

// Action to reject an order
export const rejectOrder = (orderId) => async (dispatch) => {
  try {
    const { data } = await axios.patch(`/api/orders/update/${orderId}`, {
      status: 'rejected',
    });
    dispatch({
      type: 'REJECT_ORDER_SUCCESS',
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: 'REJECT_ORDER_FAIL',
      payload: error.message,
    });
  }
};
