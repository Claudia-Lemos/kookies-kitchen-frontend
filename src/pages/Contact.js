import React, { useState } from 'react';
import axios from 'axios';

const ContactUs = () => {
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/messages', { email, message });
      setStatus('Message sent successfully!');
      setEmail('');
      setMessage('');
    } catch (error) {
      setStatus('Error sending message.');
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center bg-orange-50 py-6">
      <h2 className="text-4xl font-semibold text-orange-600 mb-6">Contact Us</h2>
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
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
          <label htmlFor="message" className="block text-lg font-medium text-gray-700">Message:</label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            className="w-full mt-2 p-3 border border-gray-300 rounded-md h-32"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-orange-600 text-white py-3 rounded-md font-semibold hover:bg-orange-700"
        >
          Send Message
        </button>
        {status && <p className="mt-4 text-center text-sm text-green-600">{status}</p>}
      </form>
    </div>
  );
};

export default ContactUs;
