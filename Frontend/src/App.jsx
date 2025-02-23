import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import GoogleLogin from "./Login";
import Layout from "./layout/Layout.jsx"
// import Dashboard from "./pages/Dashboard";
import Apps from "../src/pages/Admin/apps";
function App() {
  return (
    <Router>
      <Routes>
        <Route element = {<Layout/>} >
        <Route path="/" element={<HomePage />} /> 
        </Route>
        <Route path="/dashboard" element={<Apps/>} />
      </Routes>
    </Router>
  );
}

export default App;
