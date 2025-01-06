// Cart.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart, updateCartItem, loadCart } from '../redux/actions/cartActions'; // Ensure you import correctly

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);
  const user = useSelector(state => state.user.user);

  useEffect(() => {
    if (user) {
      dispatch(loadCart(user.id)); // Load cart items when the component mounts
    }
  }, [user, dispatch]);

  const handleRemove = (itemId) => {
    dispatch(removeFromCart(itemId)); // Dispatch remove item action
  };

  const handleUpdateQuantity = (itemId, quantity) => {
    dispatch(updateCartItem(itemId, quantity)); // Dispatch update quantity action
  };

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cartItems.map((item) => (
            <li key={item.id}>
              <div>{item.name}</div>
              <div>{item.price}</div>
              <div>
                <input
                  type="number"
                  value={item.quantity}
                  onChange={(e) => handleUpdateQuantity(item.id, parseInt(e.target.value))}
                />
              </div>
              <button onClick={() => handleRemove(item.id)}>Remove</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Cart;
