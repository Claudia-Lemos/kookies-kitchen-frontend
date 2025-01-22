import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../redux/actions/userActions';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Get user state from Redux store
  const { isAuthenticated, error: loginError, loading, user } = useSelector((state) => state.user);

  useEffect(() => {
    if (isAuthenticated) {
      // Redirect based on user role after successful login
      if (user?.role === 'admin') {
        navigate('/admin-dashboard');
      } else {
        navigate('/'); // Redirect to home for regular users
      }
    }
  }, [isAuthenticated, user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Dispatch login action with email and password as an object
      await dispatch(loginUser({ email, password }));

      // If there's an error, set it based on the Redux store
      if (loginError) {
        setError(loginError || 'Invalid email or password. Please try again.');
      }
    } catch (err) {
      // If error occurs, show error message
      setError('Invalid email or password. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-orange-50 py-6">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-4xl font-semibold text-orange-600 mb-6 text-center">Login</h2>
        <form onSubmit={handleSubmit}>
          {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
          <div className="mb-4">
            <label htmlFor="email" className="block text-lg font-medium text-gray-700">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full mt-2 p-3 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-lg font-medium text-gray-700">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full mt-2 p-3 border border-gray-300 rounded-md"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-orange-600 text-white py-3 rounded-md font-semibold hover:bg-orange-700 focus:outline-none"
            disabled={loading} // Disable the button while loading
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
