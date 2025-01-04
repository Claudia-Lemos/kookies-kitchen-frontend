import React, { useState } from 'react';
import axios from 'axios';

const Contact = () => {
  const [message, setMessage] = useState('');

  const handleMessageSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/messages', { message });
      alert('Message sent!');
    } catch (error) {
      alert('Failed to send message');
    }
  };

  return (
    <div className="p-8 bg-orange-50">
      <h2 className="text-2xl text-orange-500 font-bold mb-4">Contact Us</h2>
      <form onSubmit={handleMessageSubmit}>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Write your message here"
          className="w-full p-4 mb-4 border rounded"
        />
        <button
          type="submit"
          className="px-6 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
        >
          Send Message
        </button>
      </form>
    </div>
  );
};

export default Contact;
