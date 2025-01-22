import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../redux/actions/userActions';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // Destructuring with fallback
  const { isAuthenticated, email, role } = useSelector((state) => state.auth) || {};
  
  // Get the cart items count
  const cartCount = useSelector(state => state.cart.items?.reduce((total, item) => total + item.quantity, 0) || 0); // Total count of items in the cart

  const handleLogout = () => {
    dispatch(logoutUser());  // Dispatch logout action
    navigate('/');  // Redirect to home after logout
  };

  const goToCart = () => {
    navigate('/cart');  // Navigate to the cart page
  };

  return (
    <header className="bg-orange-500 text-white py-4 px-8">
      <div className="container mx-auto flex flex-wrap justify-between items-center">
        <img
          src="https://tse3.mm.bing.net/th?id=OIP.LFlaChCXlYuFc2QTdP9VTgHaHv&pid=Api&P=0&h=180"
          alt="Kookie's Kitchen"
          className="h-20"
        />
        <nav className="flex flex-wrap justify-between items-center space-x-4 md:space-x-6 w-full md:w-auto">
          {/* Navigation links */}
          <button onClick={() => navigate('/')} className="text-xl py-2 hover:bg-orange-600 rounded">
            Home
          </button>
          <button onClick={() => navigate('/about')} className="text-xl py-2 hover:bg-orange-600 rounded">
            About Us
          </button>
          <button onClick={() => navigate('/contact')} className="text-xl py-2 hover:bg-orange-600 rounded">
            Contact Us
          </button>

          {isAuthenticated ? (
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <p className="text-xl">Welcome, {email} ({role})</p>
              <button
                onClick={goToCart}
                className="px-4 py-2 bg-orange-600 text-white rounded relative"
              >
                Cart
                {/* Display cart item count */}
                {cartCount > 0 && (
                  <span className="absolute top-0 right-0 px-2 py-1 text-sm font-bold text-black bg-orange-600 rounded-full">{cartCount}</span>
                )}
              </button>

              {role === 'admin' && (
                <button
                  onClick={() => navigate('/admin-dashboard')}
                  className="ml-4 px-4 py-2 bg-orange-600 text-white rounded"
                >
                  Admin Dashboard
                </button>
              )}

              <button
                onClick={handleLogout}
                className="ml-4 px-4 py-2 bg-orange-600 text-white rounded"
              >
                Logout
              </button>
            </div>
          ) : (
            <button
              onClick={() => navigate('/login')}
              className="px-4 py-2 bg-orange-600 text-white rounded"
            >
              Login
            </button>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
