// src/components/BookForm.js
import React, { useState } from 'react';

function BookForm({ onSubmit }) {
  const [newBook, setNewBook] = useState({ title: '', author: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(newBook); // Pass the new book back to parent
    setNewBook({ title: '', author: '' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Book Title"
        value={newBook.title}
        onChange={e => setNewBook({ ...newBook, title: e.target.value })}
        required
      />
      <input
        type="text"
        placeholder="Author"
        value={newBook.author}
        onChange={e => setNewBook({ ...newBook, author: e.target.value })}
        required
      />
      <button type="submit">Add Book</button>
    </form>
  );
}

export default BookForm;