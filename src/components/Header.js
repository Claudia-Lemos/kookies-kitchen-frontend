import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const [user, setUser] = useState(null); // State to hold user info from localStorage
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is logged in
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData)); // Set user state if available
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null); // Reset user state
    navigate('/');  // Redirect to the home page after logout
  };

  return (
    <header className="flex justify-between items-center p-4 bg-primary text-white fixed top-0 left-0 right-0 z-10 shadow-lg">
      <h1 className="text-3xl font-bold">Kookie's Kitchen</h1>
      <nav>
        <ul className="flex space-x-6">
          {/* Common links for all users */}
          <li><Link to="/" className="hover:text-orange-300 transition duration-300">Home</Link></li>
          <li><Link to="/about" className="hover:text-orange-300 transition duration-300">About Us</Link></li>
          <li><Link to="/contact" className="hover:text-orange-300 transition duration-300">Contact Us</Link></li>

          {/* Admin-specific link */}
          {user && user.role === 'admin' && (
            <li><Link to="/admin-dashboard" className="hover:text-orange-300 transition duration-300">Admin Dashboard</Link></li>
          )}

          {/* User-specific link */}
          {user && user.role === 'user' && (
            <li><Link to="/cart" className="hover:text-orange-300 transition duration-300">Cart</Link></li>
          )}

          {/* Login / Logout */}
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
