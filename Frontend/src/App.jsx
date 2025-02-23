import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import GoogleLogin from "./pages/Login";
import Home from "./pages/Admin/Home";
// import BookForm from "./pages/Admin/AddBook";
import Books from "./pages/Admin/AddBook";
function App() {
  return (
    <Router>
      <Routes>
        {/* Uncomment if needed */}
        {/* <Route path="/" element={<HomePage />} /> */}
        <Route path="/login" element={<GoogleLogin />} />
        {/* <Route path="/dashboard" element={<Apps/>} /> */}
        <Route path="/admin" element={<Home />} />
        <Route path="/books" element={<Books />} />
        {/* <Route path="/add-book" element={<BookForm/>} /> */}

      </Routes>
    </Router>
  );
}

export default App;
