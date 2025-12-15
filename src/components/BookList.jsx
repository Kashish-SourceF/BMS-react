import "./BookList.css";

export default function BookList({ books, onDeleteBook }) {
  return (
    <table className="book-table">
      <thead>
        <tr>
          <th>Title</th>
          <th>Author</th>
          <th>Genre</th>
          <th>ISBN</th>
          <th>Published</th>
          <th>Price</th>
          <th>Delete</th>
        </tr>
      </thead>

      <tbody>
        {books.map((book) => (
          <tr key={book.id}>
            <td>{book.title}</td>
            <td>{book.author?.author}</td>
            <td>{book.genre?.genre}</td>
            <td>{book.isbn}</td>
            <td>{book.publicationDate}</td>
            <td>₹{book.price}</td>
            <td>
              <button
                className="delete-btn"
                onClick={() => onDeleteBook(book.id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
