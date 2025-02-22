import React from 'react';

const HomePage = () => {
  // Book data organized by genre

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
    {
      id: 3,
      title: 'Being and Nothingness',
      author: 'Jean-Paul Sartre',
      description: 'A fundamental text of existential philosophy.',
      imageUrl: 'https://images.penguinrandomhouse.com/cover/9780671867805',
    },
    {
      id: 4,
      title: 'Notes from Underground',
      author: 'Fyodor Dostoevsky',
      description: 'A deep dive into the mind of a disenchanted man.',
      imageUrl: 'https://images.penguinrandomhouse.com/cover/9780140449228',
    },
    {
      id: 5,
      title: 'The Myth of Sisyphus',
      author: 'Albert Camus',
      description: 'An essay discussing the absurdity of life and how to confront it.',
      imageUrl: 'https://images.penguinrandomhouse.com/cover/9780679733737',
    },
    {
      id: 6,
      title: 'Crime and Punishment',
      author: 'Fyodor Dostoevsky',
      description: 'A man grapples with guilt and redemption after committing a crime.',
      imageUrl: 'https://images.penguinrandomhouse.com/cover/9780143107637',
    },
    {
      id: 7,
      title: 'Steppenwolf',
      author: 'Hermann Hesse',
      description: 'A man struggles with his divided nature and existential crisis.',
      imageUrl: 'https://images.penguinrandomhouse.com/cover/9780143125624',
    },
  ],
  Absurdism: [
    {
      id: 8,
      title: 'The Trial',
      author: 'Franz Kafka',
      description: 'A man faces an incomprehensible and oppressive legal system.',
      imageUrl: 'https://images.penguinrandomhouse.com/cover/9780805209990',
    },
    {
      id: 9,
      title: 'Waiting for Godot',
      author: 'Samuel Beckett',
      description: 'A play about two characters waiting for someone who never arrives.',
      imageUrl: 'https://images.penguinrandomhouse.com/cover/9780802144423',
    },
    {
      id: 10,
      title: 'The Plague',
      author: 'Albert Camus',
      description: 'A town battles a deadly plague, reflecting on human resilience.',
      imageUrl: 'https://images.penguinrandomhouse.com/cover/9780679720218',
    },
    {
      id: 11,
      title: 'The Metamorphosis',
      author: 'Franz Kafka',
      description: 'A man transforms into a giant insect, facing alienation and isolation.',
      imageUrl: 'https://images.penguinrandomhouse.com/cover/9780553213690',
    },
    {
      id: 12,
      title: 'The Fall',
      author: 'Albert Camus',
      description: 'A man reflects on his life and the concept of judgment.',
      imageUrl: 'https://images.penguinrandomhouse.com/cover/9780679720225',
    },
    {
      id: 13,
      title: 'The Castle',
      author: 'Franz Kafka',
      description: 'A man attempts to gain access to mysterious authorities in a castle.',
      imageUrl: 'https://images.penguinrandomhouse.com/cover/9780805211061',
    },
    {
      id: 14,
      title: 'The Unbearable Lightness of Being',
      author: 'Milan Kundera',
      description: 'A philosophical novel exploring love and existentialism.',
      imageUrl: 'https://images.penguinrandomhouse.com/cover/9780061148521',
    },
  ],
  ClassicLiterature: [
    {
      id: 15,
      title: 'Brave New World',
      author: 'Aldous Huxley',
      description: 'A dystopian novel exploring a technologically advanced future.',
      imageUrl: 'https://images.penguinrandomhouse.com/cover/9780060850524',
    },
    {
      id: 16,
      title: '1984',
      author: 'George Orwell',
      description: 'A novel depicting a totalitarian society under constant surveillance.',
      imageUrl: 'https://images.penguinrandomhouse.com/cover/9780451524935',
    },
    {
      id: 17,
      title: 'Moby-Dick',
      author: 'Herman Melville',
      description: 'The narrative of a ship captain’s obsessive quest to hunt a white whale.',
      imageUrl: 'https://images.penguinrandomhouse.com/cover/9780142437247',
    },
    {
      id: 18,
      title: 'The Brothers Karamazov',
      author: 'Fyodor Dostoevsky',
      description: 'A complex tale of faith, doubt, and reason.',
      imageUrl: 'https://images.penguinrandomhouse.com/cover/9780374528379',
    },
    {
      id: 19,
      title: 'To the Lighthouse',
      author: 'Virginia Woolf',
      description: 'A novel exploring the complexities of family life and human experience.',
      imageUrl: 'https://images.penguinrandomhouse.com/cover/9780156907392',
    },
    {
      id: 20,
      title: 'The Sound and the Fury',
      author: 'William Faulkner',
      description: 'A Southern family’s decline told through multiple perspectives.',
      imageUrl: 'https://images.penguinrandomhouse.com/cover/9780679732242',
    },
    {
      id: 21,
      title: 'One Hundred Years of Solitude',
      author: 'Gabriel García Márquez',
      description: 'A multi-generational story reflecting on the Buendía family.',
      imageUrl: 'https://images.penguinrandomhouse.com/cover/9780060883287',
    },
  ],
};

  return (
    <div className="w-screen min-h-screen bg-gray-900 text-gray-300 p-6">
      <h1 className="text-4xl font-serif text-center mb-6">Library Collection</h1>
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
