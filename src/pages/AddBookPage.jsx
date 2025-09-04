import React, { useState } from "react";
import BookForm from "../components/BookForm";
import BookList from "../components/BookList";

function AddBookPage() {
  // state to hold all books
  const [books, setBooks] = useState([]);

  // handler to add a new book
  const handleAddBook = (book) => {
    setBooks([...books, book]);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Add a Book</h2>
      {/* BookForm will call handleAddBook when submitted */}
      <BookForm onAddBook={handleAddBook} />

      <h3>All Books</h3>
      {/* BookList shows all books */}
      <BookList books={books} />
    </div>
  );
}

export default AddBookPage;
