import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 

const AdminDashboard = () => {
  const [messages, setMessages] = useState([]);
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null); 
  const [loading, setLoading] = useState(true); 

  const navigate = useNavigate(); // Initialize navigate

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('You are not authorized to view this page');
          navigate('/login'); // Redirect to login page if not authenticated
          return;
        }
        const response = await axios.get('http://localhost:5000/api/messages', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMessages(response.data);
      } catch (err) {
        setError('Failed to fetch messages');
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, [navigate]);

  const handleAcceptOrder = (orderId) => {
    // Call API to accept the order
  };

  const handleRejectOrder = (orderId) => {
    // Call API to reject the order
  };

  return (
    <div className="p-6 bg-orange-50 min-h-screen">
      <h2 className="text-2xl text-orange-500 font-bold mb-4">Admin Dashboard</h2>

      {error && <div className="text-red-500 mb-4">{error}</div>} 

      <h3 className="text-xl text-orange-500 mb-2">Messages</h3>
      {loading ? (
        <p>Loading...</p>
      ) : (
        messages.map((msg, index) => (
          <div key={index} className="bg-white p-4 mb-4 rounded shadow-md">
            <p>{msg.content}</p>
          </div>
        ))
      )}

      <h3 className="text-xl text-orange-500 mb-2">Orders</h3>
      {orders.map((order, index) => (
        <div key={index} className="bg-white p-4 mb-4 rounded shadow-md">
          <p>{order.details}</p>
          <button
            onClick={() => handleAcceptOrder(order.id)}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none"
          >
            Accept
          </button>
          <button
            onClick={() => handleRejectOrder(order.id)}
            className="ml-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none"
          >
            Reject
          </button>
        </div>
      ))}
    </div>
  );
};

export default AdminDashboard;
