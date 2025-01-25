import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { loadCart, updateCartItem, removeFromCart } from '../redux/actions/cartActions';

const Cart = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector(state => state.auth);
  const [isLoading, setIsLoading] = useState(true);

  const userEmail = user?.email || '';

  // Safe access to cartItems, check if the cart exists for the given user
  const cartItems = useSelector(state => state.cart?.carts?.[userEmail] || []);

  useEffect(() => {
    if (cartItems.length > 0) {
      setIsLoading(false);
    }
  }, [cartItems]);

  const handlePlaceOrder = async () => {
    if (isAuthenticated && userEmail) {
      try {
        const totalAmount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
        const orderData = {
          items: cartItems,
          totalPrice: totalAmount / 100,
        };

        const response = await axios.post('http://localhost:5000/api/orders', orderData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
          },
        });

        alert('Order placed successfully!');
        dispatch(loadCart(userEmail)); // Reload the cart after successful order
      } catch (error) {
        alert('Error placing order.');
      }
    } else {
      alert('Please log in to place the order.');
    }
  };

  const handleIncreaseQuantity = (itemId) => {
    const item = cartItems.find((i) => i.itemId === itemId);
    if (item) {
      dispatch(updateCartItem(userEmail, itemId, item.quantity + 1));
    }
  };

  const handleDecreaseQuantity = (itemId) => {
    const item = cartItems.find((i) => i.itemId === itemId);
    if (item && item.quantity > 1) {
      dispatch(updateCartItem(userEmail, itemId, item.quantity - 1));
    }
  };

  const handleRemoveItem = (itemId) => {
    dispatch(removeFromCart(userEmail, itemId));
  };

  // Early return if the user is not authenticated or loading
  if (!user || isLoading) {
    return (
      <div className="min-h-screen bg-orange-50 py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center items-center space-x-2">
            <div className="w-8 h-8 border-4 border-t-transparent border-orange-500 rounded-full animate-spin"></div>
            <span className="text-xl text-gray-700">Loading cart...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-orange-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-semibold text-orange-600 text-center mb-6">Your Cart</h1>
        <div className="bg-white p-6 rounded-lg shadow-md mb-4">
          {cartItems.length > 0 ? (
            <div>
              {cartItems.map(item => (
                <div key={item.itemId} className="flex justify-between items-center py-4 border-b">
                  <div className="flex items-center space-x-4">
                    <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-md" />
                    <div>
                      <p className="font-semibold text-gray-800">{item.name}</p>
                      <p className="text-gray-500">₹{item.price / 100} x {item.quantity}</p>
                    </div>
                  </div>
                  <div className="text-gray-800">₹{(item.price * item.quantity) / 100}</div>
                  <div className="flex space-x-2">
                    <button onClick={() => handleIncreaseQuantity(item.itemId)} className="px-3 py-1 bg-gray-200 rounded">+</button>
                    <button onClick={() => handleDecreaseQuantity(item.itemId)} className="px-3 py-1 bg-gray-200 rounded">-</button>
                    <button onClick={() => handleRemoveItem(item.itemId)} className="px-3 py-1 bg-red-500 text-white rounded">Remove</button>
                  </div>
                </div>
              ))}
              <div className="flex justify-between mt-6 font-semibold text-xl">
                <p>Total</p>
                <p>₹{cartItems.reduce((total, item) => total + item.price * item.quantity, 0) / 100}</p>
              </div>
            </div>
          ) : (
            <p className="text-center text-gray-600">Your cart is empty</p>
          )}
        </div>

        <div className="text-center">
          <button
            onClick={handlePlaceOrder}
            className="bg-orange-600 text-white text-lg font-semibold py-2 px-6 rounded-full"
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
