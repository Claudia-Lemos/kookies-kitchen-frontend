// src/components/Header.js
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';  // Import useDispatch
import { resetCart } from '../redux/actions/cartActions'; // Import resetCart action

const Header = () => {
  const [user, setUser] = useState(null);
  const [cartItemCount, setCartItemCount] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();  // Initialize dispatch

  // Read user from localStorage when the component mounts
  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  // Sync cart with localStorage and update count
  useEffect(() => {
    const cartData = localStorage.getItem('cart');
    if (cartData) {
      const cartItems = JSON.parse(cartData);
      setCartItemCount(cartItems.length);
    }
  }, [user]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('cart'); // Clear cart data
    dispatch(resetCart()); // Dispatch resetCart action to clear the cart in Redux state
    setUser(null); // Reset user state
    setCartItemCount(0); // Reset cart count
    navigate('/'); // Redirect to home
  };

  return (
    <header className="flex justify-between items-center p-4 bg-primary text-white fixed top-0 left-0 right-0 z-10 shadow-lg">
      <h1 className="text-3xl font-bold">Kookie's Kitchen</h1>
      <nav>
        <ul className="flex space-x-6">
          <li><Link to="/" className="hover:text-orange-300 transition duration-300">Home</Link></li>
          <li><Link to="/about" className="hover:text-orange-300 transition duration-300">About Us</Link></li>
          <li><Link to="/contact" className="hover:text-orange-300 transition duration-300">Contact Us</Link></li>

          {user && user.role === 'admin' && (
            <li><Link to="/admin-dashboard" className="hover:text-orange-300 transition duration-300">Admin Dashboard</Link></li>
          )}

          {user && user.role === 'user' && (
            <li>
              <Link to="/cart" className="hover:text-orange-300 transition duration-300">
                Cart ({cartItemCount})
              </Link>
            </li>
          )}

          {user ? (
            <div className="flex items-center space-x-4">
              <span className="text-lg">Welcome, {user.role.charAt(0).toUpperCase() + user.role.slice(1)}</span>
              <button 
                onClick={handleLogout} 
                className="bg-red-600 px-4 py-2 rounded hover:bg-red-700 transition duration-300"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link 
              to="/login" 
              className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 transition duration-300"
            >
              Login
            </Link>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
