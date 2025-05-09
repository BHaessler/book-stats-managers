// src/components/BooksList.js
import React from 'react';

function BooksList({ books }) {
  return (
    <ul>
      {books.map(book => (
        <li key={book.id}>
          {book.title} by {book.author}
        </li>
      ))}
    </ul>
  );
}

export default BooksList;