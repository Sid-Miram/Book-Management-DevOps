import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import GoogleLogin from "./Login";
// import Dashboard from "./pages/Dashboard";
import Apps from "./Admin/apps";
function App() {
  return (
    <Router>
      <Routes>
        {/* Uncomment if needed */}
        {/* <Route path="/" element={<HomePage />} /> */}
        <Route path="/login" element={<GoogleLogin />} />
        <Route path="/dashboard" element={<Apps/>} />
      </Routes>
    </Router>
  );
}

export default App;
