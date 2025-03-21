import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [books, setBooks] = useState([]);
  const [entries, setEntries] = useState([]);
  const [newEntry, setNewEntry] = useState({ book: '', pagesRead: '', date: '' });
  const [newBook, setNewBook] = useState({ title: '', author: '' });
  const [showBookForm, setShowBookForm] = useState(false);

  useEffect(() => {
    // Fetch books and reading entries when the component mounts
    axios.get('http://localhost:8000/api/books/')
      .then(response => setBooks(response.data));

    axios.get('http://localhost:8000/api/reading-entries/')
      .then(response => setEntries(response.data));
  }, []);

  // Handle the submission of a new reading entry
  const handleEntrySubmit = (e) => {
    e.preventDefault();
    
    // Ensure newEntry.book is a number (book ID)
    const bookId = parseInt(newEntry.book);
  
    // Ensure pagesRead is a valid number (if not, return early)
    const pagesRead = parseInt(newEntry.pagesRead);
    if (!bookId || isNaN(pagesRead) || !newEntry.date) {
      console.log("Missing required fields or invalid data");
      return;
    }
  
    // Posting the new entry to the backend
    axios.post('http://localhost:8000/api/reading-entries/', {
      book: bookId,  // The ID of the selected book
      pages_read: pagesRead,  // Number of pages read
      date: newEntry.date,  // The date of the entry
    })
      .then(response => {
        console.log('New entry added:', response.data); // Log the response
        setEntries([...entries, response.data]); // Update the entries state with the new entry
        setNewEntry({ book: '', pagesRead: '', date: '' }); // Reset the form
      })
      .catch(error => {
        console.error('Error adding entry:', error.response.data); // Log the error message from the response
      });
  };

  // Handle the submission of a new book
  const handleBookSubmit = (e) => {
    e.preventDefault();
    // Posting the new book to the backend
    axios.post('http://localhost:8000/api/books/', newBook)
      .then(response => {
        setBooks([...books, response.data]); // Add the new book to the books state
        setNewBook({ title: '', author: '' }); // Reset the book form
        setShowBookForm(false); // Hide the book form
      })
      .catch(error => {
        console.error('Error adding book:', error); // Handle any errors from the request
      });
  };

  return (
    <div>
      <h1>Book Tracker</h1>

      <h2>Books 
        <button onClick={() => setShowBookForm(!showBookForm)} style={{ marginLeft: '10px' }}>
          {showBookForm ? 'Cancel' : 'Add New Book'}
        </button>
      </h2>

      {showBookForm && (
        <form onSubmit={handleBookSubmit}>
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
      )}

      {/* Display Books List */}
      <h3>Books List</h3>
      <ul>
        {books.map(book => (
          <li key={book.id}>
            {book.id}:{book.title} by {book.author}
          </li>
        ))}
      </ul>

      <h2>Reading Entries</h2>
      <form onSubmit={handleEntrySubmit}>
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

      <h3>Reading Entries List</h3>
      <ul>
        {entries.map(entry => (
          <li key={entry.id}>
            {entry.book.title} by {entry.book.author} - {entry.pages_read} pages on {entry.date}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
