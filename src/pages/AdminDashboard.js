import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState('');
  
  // Fetch messages for the admin
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const token = localStorage.getItem('authToken'); // Get the auth token
        if (!token) {
          setError('You need to log in to view the messages.');
          return;
        }

        const response = await axios.get('http://localhost:5000/api/messages/admin/messages', {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the Authorization header
          },
        });

        setMessages(response.data); // Store messages in state
      } catch (error) {
        setError('Error fetching messages.');
        console.error(error);
      }
    };

    fetchMessages();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <h2 className="text-4xl font-semibold text-gray-700 mb-6">Admin Dashboard</h2>

      {error && <p className="text-red-500">{error}</p>}

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-2xl font-semibold text-gray-600 mb-4">Received Messages</h3>

        <ul className="space-y-4">
          {messages.length === 0 ? (
            <p className="text-gray-600">No messages found.</p>
          ) : (
            messages.map((msg) => (
              <li key={msg._id} className="border-b pb-4">
                <div className="font-medium text-gray-800">From: {msg.email}</div>
                <div className="text-gray-600 mt-2">{msg.message}</div>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default AdminDashboard;
