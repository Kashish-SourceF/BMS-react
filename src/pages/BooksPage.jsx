// src/pages/BooksPage.jsx
import { useState, useReducer } from "react";
import BookList from "../components/BookList";
import BookForm from "../components/BookForm";

// Reducer function
function bookReducer(state, action) {
  switch (action.type) {
    case "ADD_BOOK":
      return [...state, { id: Date.now(), ...action.payload }];
    case "DELETE_BOOK":
      return state.filter((book) => book.id !== action.payload);
    case "EDIT_BOOK":
      return state.map((book) =>
        book.id === action.payload.id ? action.payload : book
      );
    default:
      return state;
  }
}

export default function BooksPage() {
  const [books, dispatch] = useReducer(bookReducer, []);
  const [bookToEdit, setBookToEdit] = useState(null);

  const addBook = (book) => {
    dispatch({ type: "ADD_BOOK", payload: book });
  };

  const deleteBook = (id) => {
    dispatch({ type: "DELETE_BOOK", payload: id });
  };

  const editBook = (updatedBook) => {
    dispatch({ type: "EDIT_BOOK", payload: updatedBook });
    setBookToEdit(null);
  };

  return (
    <div className="p-6">
      <BookForm
        onAddBook={addBook}
        onEditBook={editBook}
        bookToEdit={bookToEdit}
      />
      <BookList
        books={books}
        onDeleteBook={deleteBook}
        onEditBook={setBookToEdit}
      />
    </div>
  );
}
