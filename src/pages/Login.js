import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      const parsedUser = JSON.parse(user);
      setIsLoggedIn(true);
      setUserRole(parsedUser.role);
    }
  }, []);

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
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password,
      });

      const { token, user } = response.data;

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      setIsLoggedIn(true);
      setUserRole(user.role);

      if (user.role === 'admin') {
        navigate('/admin-dashboard');
      } else {
        navigate('/');
      }
    } catch (err) {
      if (err.response) {
        setError(err.response.data.message || 'Invalid email or password.');
      } else {
        setError('There was a problem connecting to the server.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setUserRole(null);
    navigate('/');
  };

  return (
    <div className="login-container mt-24 px-4 py-8 max-w-md mx-auto bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl text-orange-500 font-bold mb-4 text-center">
        {isLoggedIn && userRole ? `Welcome ${userRole.charAt(0).toUpperCase() + userRole.slice(1)}` : 'Login'}
      </h2>

      {isLoggedIn ? (
        <div>
          <p className="text-green-500 text-center mb-4">You are logged in as {userRole}!</p>
          <button
            onClick={handleLogout}
            className="w-full py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none"
          >
            Logout
          </button>
        </div>
      ) : (
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
      )}
    </div>
  );
};

export default Login;
