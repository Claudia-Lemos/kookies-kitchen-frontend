import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginUser } from '../redux/actions/userActions';
import { loadCart } from '../redux/actions/cartActions';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!email || !password) {
      setError('Please enter both email and password.');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      const { token, user } = response.data;

      // Store token in localStorage
      localStorage.setItem('token', token);
      
      // Dispatch login action to Redux
      dispatch(loginUser(user)); // Store user in Redux state

      // Load the cart for the logged-in user
      dispatch(loadCart(user.id));

      setLoading(false);

      // Redirect to appropriate page based on user role
      if (user.role === 'admin') {
        navigate('/admin-dashboard');
      } else {
        navigate('/');
      }
    } catch (err) {
      setLoading(false);
      setError(err.response?.data.message || 'Invalid email or password.');
    }
  };

  return (
    <div className="login-container mt-24 px-4 py-8 max-w-md mx-auto bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl text-orange-500 font-bold mb-4 text-center">
        Login
      </h2>
      
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      
      <form onSubmit={handleLogin}>
        <div className="form-group mb-4">
          <label htmlFor="email" className="block text-lg font-semibold text-gray-700 mb-2">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            className="w-full px-4 py-2 border rounded-lg border-gray-300 focus:ring-2 focus:ring-orange-500 focus:outline-none"
          />
        </div>

        <div className="form-group mb-4">
          <label htmlFor="password" className="block text-lg font-semibold text-gray-700 mb-2">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
            className="w-full px-4 py-2 border rounded-lg border-gray-300 focus:ring-2 focus:ring-orange-500 focus:outline-none"
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 focus:outline-none disabled:bg-gray-400"
          disabled={loading}
        >
          {loading ? <div className="loading-spinner"></div> : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default Login;
