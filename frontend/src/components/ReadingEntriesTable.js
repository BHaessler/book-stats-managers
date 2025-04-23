// src/components/ReadingEntriesTable.js
import "../component-css/tables.css"
import React from 'react';

const ReadingEntriesTable = ({ entries, books }) => {
  return (
    <table className="reading-table">
      <thead>
        <tr>
          <th>Title</th>
          <th>Author</th>
          <th>Pages Read</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        {entries.map(entry => {
          const book = books.find(b => b.id === entry.book);
          return (
            <tr key={entry.id}>
              <td>{book ? book.title : 'Unknown Book'}</td>
              <td>{book ? book.author : 'Unknown Author'}</td>
              <td>{entry.pages_read}</td>
              <td>{entry.date}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default ReadingEntriesTable;