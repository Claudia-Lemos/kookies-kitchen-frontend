import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { loadCart, updateCartItem, removeFromCart } from '../redux/actions/cartActions';

const Cart = () => {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  const { isAuthenticated, user } = useSelector(state => state.auth);
  const userEmail = user?.email || ''; // Fallback to empty string if email is not available

  // Ensure that user email exists before accessing cart items
  const cartItems = useSelector(state => state.cart.carts[userEmail] || []);

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

  return (
    <div className="min-h-screen bg-orange-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-semibold text-orange-600 text-center mb-6">Your Cart</h1>
        {isLoading ? (
          <p className="text-center text-gray-500">Loading cart...</p>
        ) : (
          <div>
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
                <p className="text-center text-gray-500">Your cart is empty.</p>
              )}
            </div>
            <div className="text-center">
              <button
                onClick={handlePlaceOrder}
                className="px-6 py-3 bg-orange-600 text-white rounded-md hover:bg-orange-700 focus:outline-none"
              >
                Place Order
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
