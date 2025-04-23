// src/components/EntryForm.js
import React, { useState } from 'react';

function EntryForm({ books, onSubmit }) {
  const [newEntry, setNewEntry] = useState({ book: '', pagesRead: '', date: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(newEntry); // Pass the new entry back to parent
    setNewEntry({ book: '', pagesRead: '', date: '' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <select
        value={newEntry.book}
        onChange={e => setNewEntry({ ...newEntry, book: e.target.value })}
        required
      >
        <option value="">Select a book</option>
        {books.map(book => (
          <option key={book.id} value={book.id}>
            {book.title}
          </option>
        ))}
      </select>
      <input
        type="number"
        placeholder="Pages Read"
        value={newEntry.pagesRead}
        onChange={e => setNewEntry({ ...newEntry, pagesRead: e.target.value })}
        required
      />
      <input
        type="date"
        value={newEntry.date}
        onChange={e => setNewEntry({ ...newEntry, date: e.target.value })}
        required
      />
      <button type="submit">Add Entry</button>
    </form>
  );
}

export default EntryForm;
