import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart, updateCartItem, loadCart } from '../redux/actions/cartActions'; 

const Cart = () => {
  const dispatch = useDispatch();
  const { items: cartItems, loading, error } = useSelector((state) => state.cart || {});
  const { isAuthenticated, user } = useSelector((state) => state.user || {});

  useEffect(() => {
    if (isAuthenticated && !cartItems.length) {
    
      dispatch(loadCart(user.id));
    }
  }, [dispatch, isAuthenticated, user, cartItems.length]);

  const handleRemoveItem = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleUpdateItemQuantity = (id, quantity) => {
    if (quantity < 1) return;
    dispatch(updateCartItem(id, quantity));
  };

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto p-4 mt-24">
        <p className="text-lg text-center text-gray-500">Please log in to view your cart</p>
        <p className="text-center text-orange-500 mt-4">
          Go to the <a href="/" className="underline">Menu</a> to add items to your cart!
        </p>
      </div>
    );
  }

  return (
    <div className="w-full bg-orange-50 p-8">
      <h1 className="text-3xl text-orange-500 font-bold mb-4 text-center">Your Cart</h1>

      {loading ? (
        <div className="text-center">
          <p>Loading cart...</p>
          <div className="spinner"></div>
        </div>
      ) : error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : cartItems.length === 0 ? (
        <div className="text-center">
          <p>Your cart is empty.</p>
          <p className="mt-4 text-orange-500">Go to the <a href="/" className="underline">Menu</a> to add items to your cart!</p>
        </div>
      ) : (
        <ul>
          {cartItems.map((item) => (
            <li key={item.id} className="flex justify-between items-center p-4 bg-white shadow-md mb-4 rounded">
              <img src={item.imageUrl} alt={item.name} className="w-20 h-20 object-cover rounded" />
              <div className="flex-1 ml-4">
                <p className="font-semibold">{item.name}</p>
                <p className="text-gray-500">₹{(item.price / 100).toFixed(2)}</p>
              </div>
              <div className="flex items-center">
                <input
                  type="number"
                  value={item.quantity}
                  onChange={(e) => handleUpdateItemQuantity(item.id, parseInt(e.target.value))}
                  min="1"
                  className="w-16 p-2 border rounded mx-2"
                />
                <button
                  onClick={() => handleRemoveItem(item.id)}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {cartItems.length > 0 && (
        <div className="mt-6 text-right">
          <button
            className="px-6 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
            onClick={() => alert('Proceeding to checkout...')}
          >
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
