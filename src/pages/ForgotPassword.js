// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const ForgotPassword = () => {
//   const [email, setEmail] = useState('');
//   const [message, setMessage] = useState('');
//   const [loading, setLoading] = useState(false);

//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setMessage(''); // Reset previous message

//     if (!email) {
//       setMessage('Please enter your email address');
//       return;
//     }

//     setLoading(true);
//     try {
//       const response = await axios.post('/api/auth/forgot-password', { email });

//       setMessage('Password reset link has been sent to your email.');
//       setTimeout(() => navigate('/login'), 3000); // Redirect to login page after 3 seconds
//     } catch (err) {
//       setMessage(err.response ? err.response.data.message : 'Error occurred, please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="forgot-password-container">
//       <h2>Forgot Password</h2>
//       {message && <div className="message">{message}</div>}
//       <form onSubmit={handleSubmit}>
//         <div className="form-group">
//           <label htmlFor="email">Email:</label>
//           <input
//             type="email"
//             id="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             placeholder="Enter your email"
//             required
//           />
//         </div>
        
//         <button type="submit" disabled={loading}>
//           {loading ? 'Sending...' : 'Send Reset Link'}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default ForgotPassword;
