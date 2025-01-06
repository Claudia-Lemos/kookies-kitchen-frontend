// cartActions.js
export const LOAD_CART = 'LOAD_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const UPDATE_CART_ITEM = 'UPDATE_CART_ITEM';
export const ADD_TO_CART = 'ADD_TO_CART';
export const RESET_CART = 'RESET_CART';

// Action to load cart
export const loadCart = (userId) => async (dispatch) => {
  try {
    const response = await fetch(`/api/cart/${userId}`);
    const data = await response.json();
    if (response.ok) {
      dispatch({
        type: LOAD_CART,
        payload: data.items, // Ensure the cart items are returned
      });
    }
  } catch (error) {
    console.error('Error loading cart:', error);
    dispatch({
      type: 'CART_ERROR',
      payload: 'Failed to load cart',
    });
  }
};

// Action to add an item to the cart
export const addToCart = (item) => ({
  type: ADD_TO_CART,
  payload: item,
});

// Action to remove an item from the cart
export const removeFromCart = (itemId) => ({
  type: REMOVE_FROM_CART,
  payload: itemId, // Send the item ID to remove it
});

// Action to update the quantity of a cart item
export const updateCartItem = (itemId, quantity) => ({
  type: UPDATE_CART_ITEM,
  payload: { itemId, quantity },
});

// Action to reset the cart
export const resetCart = () => ({
  type: RESET_CART,
});
