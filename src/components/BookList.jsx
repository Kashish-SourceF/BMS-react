function BookList({ books, onDeleteBook, onEditBook }) {
  // receives books array and handlers from parent (App.jsx)
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[500px] border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 p-2 text-sm sm:text-base">Title</th>
            <th className="border border-gray-300 p-2 text-sm sm:text-base">Author</th>
            <th className="border border-gray-300 p-2 text-sm sm:text-base">Genre</th>
            <th className="border border-gray-300 p-2 text-sm sm:text-base">Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* loops through books array */}
          {books.length > 0 ? (
            books.map((book) => (
              // React requires unique key for list items
              <tr key={book.id} className="hover:bg-gray-100">
                <td className="border border-gray-300 p-2 text-sm sm:text-base">
                  {book.title}
                </td>
                <td className="border border-gray-300 p-2 text-sm sm:text-base">
                  {book.author}
                </td>
                <td className="border border-gray-300 p-2 text-sm sm:text-base">
                  {book.genre}
                </td>
                <td className="border border-gray-300 p-2 text-center">
                  <button
                    onClick={() => onEditBook(book)}
                    className="bg-yellow-500 text-white px-2 py-1 sm:px-3 sm:py-1 mr-2 rounded text-sm sm:text-base"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDeleteBook(book.id)}
                    className="bg-red-600 text-white px-2 py-1 sm:px-3 sm:py-1 rounded text-sm sm:text-base"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="4"
                className="border border-gray-300 p-2 text-center text-gray-500 text-sm sm:text-base"
              >
                No books available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default BookList;
