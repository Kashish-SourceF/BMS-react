import { useState, useEffect } from "react";

function BookForm({ onAddBook, onEditBook, bookToEdit, setBookToEdit }) {
  // local state for form inputs
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");

  // Populate form when editing
  useEffect(() => {
    if (bookToEdit) {
      setTitle(bookToEdit.title);
      setAuthor(bookToEdit.author);
      setGenre(bookToEdit.genre);
    }
  }, [bookToEdit]);

  // handle form submit
  const handleSubmit = (e) => {
    e.preventDefault(); // stop page refresh

    if (!title || !author || !genre) {
      alert("All fields are required!");
      return;
    }

    // one object for both add & edit
    const book = {
      id: bookToEdit ? bookToEdit.id : Date.now(), // preserve id if editing
      title,
      author,
      genre,
    };

    if (bookToEdit) {
      onEditBook(book); // update existing book
    } else {
      onAddBook(book); // add new book
    }

    // clear form after submit and exit edit mode
    setTitle("");
    setAuthor("");
    setGenre("");
    setBookToEdit(null);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <input
        type="text"
        placeholder="Book Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)} // updates local state while typing
        className="border p-2 m-2"
      />

      <input
        type="text"
        placeholder="Author"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        className="border p-2 m-2"
      />

      <input
        type="text"
        placeholder="Genre"
        value={genre}
        onChange={(e) => setGenre(e.target.value)}
        className="border p-2 m-2"
      />

      <button type="submit" className="bg-blue-600 text-white px-4 py-2 m-2">
        {bookToEdit ? "Update Book" : "Add Book"}
      </button>
    </form>
  );
}

export default BookForm;
