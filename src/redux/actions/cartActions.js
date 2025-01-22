import axiosInstance from '../../../src/axiosInstance';

// Action to load the cart for a user
export const loadCart = (email) => async (dispatch) => {
  try {
    const token = localStorage.getItem('authToken');  // Retrieve the token from localStorage

    if (!token) {
      alert('Please log in to load your cart');
      return;
    }

    const response = await axiosInstance.get(`/api/cart/${email}`, {
      headers: {
        Authorization: `Bearer ${token}`,  // Send the token in the Authorization header
      },
    });

    if (response.data) {
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

// Action to update a cart item (Increase or Decrease quantity)
export const updateCartItem = (email, itemId, quantity) => async (dispatch) => {
  const token = localStorage.getItem('authToken');  // Retrieve the token from localStorage

  if (!token) {
    alert('Please log in to update your cart');
    return;
  }

  try {
    const response = await axiosInstance.post(
      `/api/cart/${email}`,
      { 
        itemId: itemId,   // Use itemId instead of item._id
        quantity: quantity,  // Pass updated quantity
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,  // Send the token in the Authorization header
        },
      }
    );

    // Dispatch the updated items after API call success
    dispatch({
      type: 'UPDATE_CART_ITEM',
      payload: {
        email,
        items: response.data.items, // Ensure the response returns updated items
      },
    });
  } catch (error) {
    console.error('Error updating cart item:', error);
  }
};

// Action to remove an item from the cart
export const removeFromCart = (email, itemId) => async (dispatch) => {
  const token = localStorage.getItem('authToken');  // Retrieve the token from localStorage

  if (!token) {
    alert('Please log in to remove items from your cart');
    return;
  }

  try {
    const response = await axiosInstance.delete(
      `/api/cart/${email}`,
      {
        data: { itemId },
        headers: {
          Authorization: `Bearer ${token}`,  // Send the token in the Authorization header
        },
      }
    );

    dispatch({
      type: 'REMOVE_FROM_CART',
      payload: {
        email,
        items: response.data.items,
      },
    });
  } catch (error) {
    console.error('Error removing item from cart:', error);
  }
};

// Action to add an item to the cart
export const addToCart = (item, email) => async (dispatch) => {
  const token = localStorage.getItem('authToken');  // Retrieve the token from localStorage
  console.log('User email:', email);
  console.log('Token is:', token); // Log token to ensure it's available

  if (!token) {
    alert('Please log in to add items to the cart');
    return;
  }

  try {
    const response = await axiosInstance.post(
      `/api/cart/${email}`,
      {
        itemId: item._id,  // Use the ObjectId from the item (ensure it's using the correct field, _id)
        quantity: 1,  // Add the item with a quantity of 1 initially
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,  // Send the token in the Authorization header
        },
      }
    );

    dispatch({
      type: 'ADD_TO_CART',
      payload: {
        email,
        items: response.data.items,  // Ensure the response contains updated items
      },
    });
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
