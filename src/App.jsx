import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import MZ from "./pages/MZ/MZ";
import Evaluate from "./pages/Evaluate/Evaluate";
import Header from "./components/Header/Header";

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/mz" element={<MZ />} />
          <Route path="/evaluate" element={<Evaluate />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
