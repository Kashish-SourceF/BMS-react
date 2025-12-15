import { useEffect, useState } from "react";
import BookForm from "../components/BookForm";
import BookList from "../components/BookList";

export default function BooksPage() {
  const [books, setBooks] = useState([]);

  // Fetch books from backend
  const fetchBooks = async () => {
    try {
      const res = await fetch("http://localhost:3000/books");
      const data = await res.json();
      setBooks(data);
    } catch (err) {
      console.error("Error fetching books:", err);
    }
  };

  // Load books on mount
  useEffect(() => {
    fetchBooks();
  }, []);

  // Add book → POST → refresh list
  const addBook = async (newBook) => {
    await fetch("http://localhost:3000/books", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newBook),
    });
    fetchBooks();
  };

  // Delete book → DELETE → refresh list
  const deleteBook = async (id) => {
    await fetch(`http://localhost:3000/books/${id}`, {
      method: "DELETE",
    });
    fetchBooks();
  };

  return (
    <div className="p-6">
      <BookForm onAddBook={addBook} />
      <BookList books={books} onDeleteBook={deleteBook} />
    </div>
  );
}
