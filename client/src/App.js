import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Difficulty from "./pages/Difficulty.jsx";
import XSSLab from "./pages/XSSLab.jsx";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/difficulty/:type" element={<Difficulty />} />
        <Route path="/lab/xss/:level" element={<XSSLab />} />
      </Routes>
    </Router>
  );
}

export default App;