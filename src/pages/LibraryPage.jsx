import { useEffect, useState } from "react";
import "../App.css";


function LibraryPage() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch books from backend
    fetch("http://localhost:3000/books")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch books");
        return res.json();
      })
      .then((data) => {
        setBooks(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="loading">Loading books...</p>;
  if (error) return <p className="error">Error: {error}</p>;

  return (
    <div className="library-container">
    
      <div className="books-grid">
        {books.length === 0 ? (
          <p>No books available.</p>
        ) : (
          books.map((book) => (
            <div key={book.id} className="book-card">
              <h2 className="book-title">{book.title}</h2>
              <p className="book-author">
                Author: {book.author?.author || "Unknown"}
              </p>
              <p className="book-genre">
                Genre: {book.genre?.genre || "Unknown"}
              </p>
              <p className="book-isbn">ISBN: {book.isbn}</p>
              <p className="book-publication">
                Published: {book.publicationDate}
              </p>
              <p className="book-price">Price: ₹{book.price}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default LibraryPage;
