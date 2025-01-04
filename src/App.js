import React, { useEffect } from 'react';
import { Route, Routes, useNavigate, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from './redux/actions/userActions';
import { jwtDecode } from 'jwt-decode';  // Ensure you are using jwt-decode correctly

import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Header from './components/Header';
import Footer from './components/Footer';
import Cart from './pages/Cart';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // Get user authentication state from Redux store
  const { token, role, isAuthenticated } = useSelector((state) => state.user || { token: null, role: null, isAuthenticated: false });

  // Check if the user is authenticated and redirect them accordingly
  useEffect(() => {
    const localToken = localStorage.getItem('token');
    if (localToken && !token) {
      try {
        const decodedUser = jwtDecode(localToken);
        const email = decodedUser?.email;
        if (email) {
          dispatch(loginUser(email, 'password')); // Automatically log in with token
        }
      } catch (error) {
        console.error("Invalid token", error);
        localStorage.removeItem('token'); // Remove invalid token if any
      }
    }
  }, [dispatch, token]);

  // If user is authenticated, navigate accordingly
  useEffect(() => {
    if (isAuthenticated) {
      if (role === 'admin') {
        navigate('/admin-dashboard');
      } else {
        navigate('/cart');
      }
    }
  }, [isAuthenticated, role, navigate]);

  return (
    <div className="App">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={isAuthenticated ? <Cart /> : <Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin-dashboard" element={role === 'admin' ? <AdminDashboard /> : <Navigate to="/" />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;
