import { useEffect, useState } from "react";
import "./BookForm.css";

export default function BookForm({ onAddBook }) {
  // form fields
  const [title, setTitle] = useState("");
  const [isbn, setIsbn] = useState("");
  const [publicationDate, setPublicationDate] = useState("");
  const [price, setPrice] = useState("");

  // authors & genres
  const [authors, setAuthors] = useState([]);
  const [genres, setGenres] = useState([]);

  // selection state
  const [selectedAuthorId, setSelectedAuthorId] = useState("");
  const [selectedGenreId, setSelectedGenreId] = useState("");

  // "Add new" inline inputs
  const [newAuthorName, setNewAuthorName] = useState("");
  const [newGenreName, setNewGenreName] = useState("");

  // loading / submitting
  const [loadingMeta, setLoadingMeta] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // load authors and genres on mount
  useEffect(() => {
    async function loadMeta() {
      setLoadingMeta(true);
      try {
        const [aRes, gRes] = await Promise.all([
          fetch("http://localhost:3000/authors"),
          fetch("http://localhost:3000/genres"),
        ]);
        const [aData, gData] = await Promise.all([aRes.json(), gRes.json()]);
        setAuthors(Array.isArray(aData) ? aData : []);
        setGenres(Array.isArray(gData) ? gData : []);
      } catch (err) {
        console.error("Failed to load authors/genres:", err);
      } finally {
        setLoadingMeta(false);
      }
    }
    loadMeta();
  }, []);

  // helper: create author (returns created author object)
  const createAuthor = async (authorName) => {
    const res = await fetch("http://localhost:3000/authors", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ author: authorName }),
    });
    if (!res.ok) throw new Error("Failed to create author");
    return res.json();
  };

  // helper: create genre (returns created genre object)
  const createGenre = async (genreName) => {
    const res = await fetch("http://localhost:3000/genres", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ genre: genreName }),
    });
    if (!res.ok) throw new Error("Failed to create genre");
    return res.json();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // validation
    if (!title.trim()) return alert("Please enter a title");
    if (!isbn) return alert("Please enter ISBN");
    if (!publicationDate) return alert("Please choose publication date");
    if (!price) return alert("Please enter price");

    setSubmitting(true);

    try {
      let authorId = selectedAuthorId;
      let genreId = selectedGenreId;

      // If user provided a new author name, create it
      if (newAuthorName.trim()) {
        const createdAuthor = await createAuthor(newAuthorName.trim());
        // createdAuthor expected shape: { id: number, author: string }
        authorId = createdAuthor.id;
        // add to local list so dropdown updates
        setAuthors((prev) => [...prev, createdAuthor]);
        setNewAuthorName("");
        setSelectedAuthorId(String(createdAuthor.id));
      }

      // If user provided a new genre name, create it
      if (newGenreName.trim()) {
        const createdGenre = await createGenre(newGenreName.trim());
        genreId = createdGenre.id;
        setGenres((prev) => [...prev, createdGenre]);
        setNewGenreName("");
        setSelectedGenreId(String(createdGenre.id));
      }

      // final checks
      if (!authorId) return alert("Please choose or create an author");
      if (!genreId) return alert("Please choose or create a genre");

      const newBook = {
        title: title.trim(),
        isbn: Number(isbn),
        publicationDate, // date input gives YYYY-MM-DD string
        price: Number(price),
        authorId: Number(authorId),
        genreId: Number(genreId),
      };

      // call parent handler (BooksPage will POST to backend)
      await onAddBook(newBook);

      // clear fields on success
      setTitle("");
      setIsbn("");
      setPublicationDate("");
      setPrice("");
      setSelectedAuthorId("");
      setSelectedGenreId("");
      setNewAuthorName("");
      setNewGenreName("");
    } catch (err) {
      console.error("Failed to add book:", err);
      alert("Error adding book. Check console for details.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-3xl mx-auto bg-white shadow-sm rounded-lg p-6 mb-6"
    >
      <h2 className="text-2xl font-bold mb-4 text-center">Add New Book</h2>

      {/* Title */}
      <div className="mb-3">
        <label className="block text-sm font-medium mb-1">Title</label>
        <input
          type="text"
          className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      {/* ISBN */}
      <div className="mb-3">
        <label className="block text-sm font-medium mb-1">ISBN</label>
        <input
          type="number"
          className="w-full border rounded px-3 py-2 focus:outline-none"
          value={isbn}
          onChange={(e) => setIsbn(e.target.value)}
        />
      </div>

      {/* Publication Date */}
      <div className="mb-3">
        <label className="block text-sm font-medium mb-1">Publication Date</label>
        <input
          type="text"
          className="w-full border rounded px-3 py-2 focus:outline-none"
          value={publicationDate}
          onChange={(e) => setPublicationDate(e.target.value)}
        />
      </div>

      {/* Price */}
      <div className="mb-3">
        <label className="block text-sm font-medium mb-1">Price (₹)</label>
        <input
          type="number"
          className="w-full border rounded px-3 py-2 focus:outline-none"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Author selector */}
        <div>
          <label className="block text-sm font-medium mb-1">Author</label>

          {loadingMeta ? (
            <div className="text-sm text-gray-500">Loading authors...</div>
          ) : (
            <select
              value={selectedAuthorId}
              onChange={(e) => {
                setSelectedAuthorId(e.target.value);
                setNewAuthorName("");
              }}
              className="w-full border rounded px-3 py-2 bg-white"
            >
              <option value="">-- Select Author --</option>
              {authors.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.author}
                </option>
              ))}
              <option value="add-new">+ Add New Author</option>
            </select>
          )}

          {/* show new author input when add-new chosen */}
          {selectedAuthorId === "add-new" && (
            <div className="mt-2">
              <label className="block text-sm font-medium mb-1">
                New Author Name
              </label>
              <input
                type="text"
                className="w-full border rounded px-3 py-2"
                value={newAuthorName}
                onChange={(e) => setNewAuthorName(e.target.value)}
                placeholder="Enter author name"
              />
            </div>
          )}
        </div>

        {/* Genre selector */}
        <div>
          <label className="block text-sm font-medium mb-1">Genre</label>

          {loadingMeta ? (
            <div className="text-sm text-gray-500">Loading genres...</div>
          ) : (
            <select
              value={selectedGenreId}
              onChange={(e) => {
                setSelectedGenreId(e.target.value);
                setNewGenreName("");
              }}
              className="w-full border rounded px-3 py-2 bg-white"
            >
              <option value="">-- Select Genre --</option>
              {genres.map((g) => (
                <option key={g.id} value={g.id}>
                  {g.genre}
                </option>
              ))}
              <option value="add-new">+ Add New Genre</option>
            </select>
          )}

          {/* show new genre input when add-new chosen */}
          {selectedGenreId === "add-new" && (
            <div className="mt-2">
              <label className="block text-sm font-medium mb-1">
                New Genre Name
              </label>
              <input
                type="text"
                className="w-full border rounded px-3 py-2"
                value={newGenreName}
                onChange={(e) => setNewGenreName(e.target.value)}
                placeholder="Enter genre name"
              />
            </div>
          )}
        </div>
      </div>

      <div className="mt-6">
        <button
          type="submit"
          className={`w-full py-3 rounded text-white font-medium ${
            submitting ? "bg-gray-400 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700"
          }`}
          disabled={submitting}
        >
          {submitting ? "Adding..." : "Add Book"}
        </button>
      </div>
    </form>
  );
}
