// src/App.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BookForm from './components/BookForm';
import EntryForm from './components/EntryForm';
import BooksList from './components/BooksList';
import ReadingEntriesTable from './components/ReadingEntriesTable';
import { ThemeProvider } from './context/ThemeContext';
import ThemeToggle from './components/ThemeToggle';
import './component-css/styles.css';
import './App.css';

function App() {
  const [books, setBooks] = useState([]);
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/books/')
      .then(response => setBooks(response.data));

    axios.get('http://localhost:8000/api/reading-entries/')
      .then(response => setEntries(response.data));
  }, []);

  const handleBookSubmit = (newBook) => {
    axios.post('http://localhost:8000/api/books/', newBook)
      .then(response => {
        setBooks([...books, response.data]);
      });
  };

  const handleEntrySubmit = (newEntry) => {
    const bookId = parseInt(newEntry.book);
    const pagesRead = parseInt(newEntry.pagesRead);

    if (bookId && !isNaN(pagesRead) && newEntry.date) {
      axios.post('http://localhost:8000/api/reading-entries/', {
        book: bookId,
        pages_read: pagesRead,
        date: newEntry.date,
      })
        .then(response => {
          setEntries([...entries, response.data]);
        });
    }
  };

  return (
    <ThemeProvider>
      <div className="App">
        <ThemeToggle />

        <h1>Book Tracker</h1>
        
        <h2>Books</h2>
        <BookForm onSubmit={handleBookSubmit} />

        <h3>Books List</h3>
        <BooksList books={books} />

        <h2>Reading Entries</h2>
        <EntryForm books={books} onSubmit={handleEntrySubmit} />

        <h3>Reading Entries List</h3>
        <ReadingEntriesTable entries={entries} books={books} />
      </div>
    </ThemeProvider>
  );
}

export default App;
