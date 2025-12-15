import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import BooksPage from "./pages/BooksPage";
import HomePage from "./pages/HomePage";
import LibraryPage from "./pages/LibraryPage";


function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 text-gray-900 flex flex-col">
        <Header />

      <main className="flex-grow p-4 sm:p-6 container mx-auto">
      <nav className="mb-6 flex gap-4">
            <Link to="/">Home</Link>
            <Link to="/books">Books</Link>
            <Link to="/library">Library</Link>  {/* Add this */}
      </nav>


          <Routes>
            <Route path="/" element={<HomePage/>} />
            <Route path="/books" element={<BooksPage />} />
            <Route path="/library" element={<LibraryPage />} />
            </Routes>
      </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;