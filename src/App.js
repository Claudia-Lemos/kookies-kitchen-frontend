import React, { useEffect } from 'react';
import { Route, Routes, useNavigate, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, logoutUser } from './redux/actions/userActions';
import { loadCart } from './redux/actions/cartActions'; // Import loadCart action
import { jwtDecode } from 'jwt-decode';

import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Header from './components/Header';
import Footer from './components/Footer';
import Cart from './pages/Cart';
import Login from './pages/Login';
import AdminMessageDashboard from './pages/AdminDashboard';

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Safe destructuring with optional chaining
  const { token, role, isAuthenticated, email } = useSelector(state => state.user || {});

  // Get cart items from the Redux store
  const cartItems = useSelector(state => state.cart.items);

  useEffect(() => {
    // Try to login automatically using token
    const localToken = localStorage.getItem('token');
    if (localToken && !token) {
      try {
        const decodedUser = jwtDecode(localToken); // Decode token
        const email = decodedUser?.email;
        if (email) {
          dispatch(loginUser(email, 'password')); // Log the user in
        }
      } catch (error) {
        console.error('Invalid token', error);
        localStorage.removeItem('token'); // Remove invalid token
        dispatch(logoutUser()); // Logout user
      }
    }
  }, [dispatch, token]);

  useEffect(() => {
    if (isAuthenticated) {
      if (role === 'admin') {
        navigate('/admin-dashboard'); // Redirect to admin dashboard
      } else {
        navigate('/cart'); // Redirect to cart for non-admin users
        // After login, load the user's cart
        dispatch(loadCart(email)); // Load cart for the logged-in user
      }
    }
  }, [isAuthenticated, role, email, dispatch, navigate]);

  return (
    <div className="App">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route
            path="/cart"
            element={isAuthenticated ? <Cart /> : <Navigate to="/login" />}
          />
          <Route path="/login" element={<Login />} />
          <Route
            path="/admin-dashboard"
            element={role === 'admin' ? <AdminMessageDashboard /> : <Navigate to="/" />}
          />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;
