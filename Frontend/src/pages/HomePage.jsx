import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem('user'));
    if (loggedInUser) {
      setUser(loggedInUser);
    }
  }, []);

  const handleLogin = () => {
    navigate('/login'); // Redirect to Login Page
  };

  const booksByGenre = {
    Existentialism: [
      {
        id: 1,
        title: 'The Stranger',
        author: 'Albert Camus',
        description: 'A novel exploring the absurdity of human existence.',
        imageUrl: 'https://images.penguinrandomhouse.com/cover/9780679720201',
      },
      {
        id: 2,
        title: 'Nausea',
        author: 'Jean-Paul Sartre',
        description: 'A philosophical novel about existential dread.',
        imageUrl: 'https://images.penguinrandomhouse.com/cover/9780811220309',
      },
    ],
  };

  return (
    <div className="w-screen min-h-screen bg-gray-900 text-gray-300 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-serif text-center">Library Collection</h1>
        {user ? (
          <div className="flex items-center">
            <img src={user.imageUrl} alt="User" className="w-10 h-10 rounded-full mr-2" />
            <span className="text-lg">{user.name}</span>
          </div>
        ) : (
          <button 
            onClick={handleLogin} 
            className="bg-blue-500 px-4 py-2 rounded-lg text-white hover:bg-blue-600"
          >
            Login
          </button>
        )}
      </div>
      {Object.keys(booksByGenre).map((genre) => (
        <div key={genre} className="mb-8">
          <h2 className="text-3xl font-serif mb-4">{genre}</h2>
          <div className="flex overflow-x-auto space-x-4 pb-4">
            {booksByGenre[genre].map((book) => (
              <div
                key={book.id}
                className="flex-none w-48 bg-gray-800 p-4 rounded-lg shadow-md border border-gray-700"
              >
                <img
                  src={book.imageUrl}
                  alt={`${book.title} cover`}
                  className="w-full h-64 object-cover mb-4 rounded"
                />
                <h3 className="text-xl font-semibold font-serif">{book.title}</h3>
                <p className="text-sm italic text-gray-400">by {book.author}</p>
                <p className="mt-2 text-gray-400">{book.description}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default HomePage;
