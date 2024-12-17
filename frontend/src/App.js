import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [books, setBooks] = useState([]);
  const [entries, setEntries] = useState([]);
  const [newEntry, setNewEntry] = useState({ book: '', pagesRead: '', date: '' });

  useEffect(() => {
    axios.get('http://localhost:8000/api/books/')
      .then(response => setBooks(response.data));

    axios.get('http://localhost:8000/api/reading-entries/')
      .then(response => setEntries(response.data));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8000/api/reading-entries/', newEntry)
      .then(response => setEntries([...entries, response.data]));
  };

  return (
    <div>
      <h1>Book Tracker</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Book ID"
          value={newEntry.book}
          onChange={e => setNewEntry({ ...newEntry, book: e.target.value })}
        />
        <input
          type="number"
          placeholder="Pages Read"
          value={newEntry.pagesRead}
          onChange={e => setNewEntry({ ...newEntry, pagesRead: e.target.value })}
        />
        <input
          type="date"
          value={newEntry.date}
          onChange={e => setNewEntry({ ...newEntry, date: e.target.value })}
        />
        <button type="submit">Add Entry</button>
      </form>

      <h2>Books</h2>
      <ul>
        {books.map(book => (
          <li key={book.id}>{book.title} by {book.author}</li>
        ))}
      </ul>

      <h2>Reading Entries</h2>
      <ul>
        {entries.map(entry => (
          <li key={entry.id}>
            {entry.book} - {entry.pages_read} pages on {entry.date}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
