import axiosInstance from '../../../src/axiosInstance';

// Helper function to get the auth token from local storage
const getAuthToken = () => {
  const token = localStorage.getItem('authToken');
  if (!token) {
    alert('Please log in to perform this action');
    return null;
  }
  return token;
};

// Action to load the cart for a user
export const loadCart = (email) => async (dispatch) => {
  try {
    const token = getAuthToken();
    if (!token) return;

    const response = await axiosInstance.get(`/api/cart/${email}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200 && response.data) {
      dispatch({
        type: 'LOAD_CART',
        payload: {
          email,
          items: response.data.items || [],
        },
      });
    } else {
      console.warn(`No cart data found for ${email}`);
    }
  } catch (error) {
    console.error('Error loading cart:', error);
  }
};

// Action to update a cart item (increase or decrease quantity)
export const updateCartItem = (email, itemId, quantity) => async (dispatch) => {
  const token = getAuthToken();
  if (!token) return;

  try {
    const response = await axiosInstance.post(
      `/api/cart/${email}`,
      { 
        itemId: itemId, 
        quantity: quantity, 
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // If updating an item successfully, dispatch the updated cart
    if (response.status === 200 && response.data) {
      dispatch({
        type: 'UPDATE_CART_ITEM',
        payload: {
          email,
          items: response.data.items, // Updated items after the change
        },
      });
    } else {
      console.error('Failed to update cart item');
    }
  } catch (error) {
    console.error('Error updating cart item:', error);
  }
};

// Action to remove an item from the cart
export const removeFromCart = (email, itemId) => async (dispatch) => {
  const token = getAuthToken();
  if (!token) return;

  try {
    const response = await axiosInstance.delete(
      `/api/cart/${email}`,
      {
        data: { itemId },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // If the item is successfully removed, update the state
    if (response.status === 200 && response.data) {
      dispatch({
        type: 'REMOVE_FROM_CART',
        payload: {
          email,
          items: response.data.items, // Updated items after removal
        },
      });
    } else {
      console.error('Failed to remove item from cart');
    }
  } catch (error) {
    console.error('Error removing item from cart:', error);
  }
};

// Action to add an item to the cart
export const addToCart = (item, email) => async (dispatch) => {
  const token = getAuthToken();
  if (!token) return;

  try {
    const response = await axiosInstance.post(
      `/api/cart/${email}`,
      {
        itemId: item._id,  // Ensure we're sending the correct field for itemId
        quantity: 1,  // Default quantity set to 1 when adding the item
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // If the item is added successfully, update the cart state
    if (response.status === 200 && response.data) {
      dispatch({
        type: 'ADD_TO_CART',
        payload: {
          email,
          items: response.data.items,  // Updated items in the cart
        },
      });
    } else {
      console.error('Failed to add item to cart');
    }
  } catch (error) {
    if (error.response?.status === 401) {
      alert('Session expired. Please log in again.');
      dispatch({ type: 'USER_LOGOUT' });
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
    } else {
      console.error('Error adding item to cart:', error);
    }
  }
};
