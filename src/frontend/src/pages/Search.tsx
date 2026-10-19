import React, { useState } from 'react';

const Search: React.FC = () => {
  const [professional, setProfessional] = useState('');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle search
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          data-testid="search-professional"
          type="text"
          value={professional}
          onChange={(e) => setProfessional(e.target.value)}
          placeholder="Professional"
        />
        <input
          data-testid="search-from"
          type="datetime-local"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
        />
        <input
          data-testid="search-to"
          type="datetime-local"
          value={to}
          onChange={(e) => setTo(e.target.value)}
        />
        <button data-testid="search-submit" type="submit">Search</button>
      </form>
      <div data-testid="slot-item" data-slot-start="2023-10-20T10:00">Oct 20, 10:00</div>
      <button data-testid="book-submit">Book</button>
    </div>
  );
};

export default Search;