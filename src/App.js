import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes, Navigate } from 'react-router-dom';
import { loadUserFromLocalStorage } from './redux/actions/userActions';

import Home from './pages/Home';
import Cart from './pages/Cart';
import Login from './pages/Login';
import About from './pages/About';
import ContactUs from './pages/Contact';
import AdminDashboard from './pages/AdminDashboard';
import Header from './components/Header';
import Footer from './components/Footer';

const App = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, user, loading } = useSelector((state) => state.user);
  
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    dispatch(loadUserFromLocalStorage());
  }, [dispatch]);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      console.warn('Token is missing');
    }
    if (isAuthenticated !== undefined) {
      setIsLoading(false);
    }
  }, [isAuthenticated]);

  if (isLoading || loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route
            path="/cart"
            element={isAuthenticated ? <Cart /> : <Navigate to="/login" />}
          />
          <Route
            path="/login"
            element={isAuthenticated ? <Navigate to="/" /> : <Login />}
          />
          <Route
            path="/admin-dashboard"
            element={isAuthenticated && user?.role === 'admin' ? <AdminDashboard /> : <Navigate to="/login" />}
          />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;
