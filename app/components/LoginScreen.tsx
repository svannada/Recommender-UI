'use client'

import React, { useState } from 'react';
import { useRouter } from 'next/navigation'

interface LoginScreenProps {
  onLogin: (userId: string) => void;// Callback function to handle login
}
 
const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLoginClick = () => {
    const expectedPassword = "pwd" + userId;

    if (password === expectedPassword) {
      // Authentication successful, proceed with login
      console.log('Login successful');
      // Call the onLogin callback passed from the parent component
      onLogin(userId);
      setError('');
    } else {
      // Authentication failed, show error message
      setError('Invalid username or password');
    }
    
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-gray-100 p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">Login</h1>
        <input
          className="w-full border border-gray-300 rounded-md px-3 py-2 mb-2"
          type="text"
          placeholder="User ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
        <input
          className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="w-full bg-blue-500 text-white rounded-md py-2"
          onClick={handleLoginClick}
        >
          Login
        </button>
        {error && <div style={{ color: 'red' }}>{error}</div>}
      </div>
    </div>
  );
};

export default LoginScreen;
