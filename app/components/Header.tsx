import React from 'react';

interface HeaderProps {
  isLoggedIn: boolean;
  onLogout: () => void;
  userId: string;
}

const Header: React.FC<HeaderProps> = ({ isLoggedIn, onLogout, userId  }) => {
  return (
    <header className="flex justify-between items-center mb-8">
      <h1 className="text-3xl font-bold">Ethical Movie Recommender</h1>
      {isLoggedIn ? (
        <div className="flex items-center">
          <span className="text-gray-600">Logged in as: {userId}</span>
          <button onClick={onLogout} className="ml-4 px-4 py-2 bg-red-500 text-white rounded-md">Logout</button>
        </div>
      ) : (
        <span className="text-gray-600">Not logged in</span>
      )}
    </header>
  );
};

export default Header;
