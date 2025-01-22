import axios from 'axios';

// Action to place an order
export const placeOrder = (orderData) => async (dispatch, getState) => {
  try {
    dispatch({ type: 'ORDER_PLACING' });

    const { userLogin: { userInfo } } = getState(); // Get user info from state

    // Make sure to pass the token in Authorization header
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post('/api/orders', orderData, config);

    dispatch({ type: 'ORDER_PLACED', payload: data });

  } catch (error) {
    dispatch({
      type: 'ORDER_PLACE_FAIL',
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};
