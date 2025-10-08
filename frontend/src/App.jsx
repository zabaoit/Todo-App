import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { useEffect, useState } from "react";

const App = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    if (token) {
      navigate("/");
    } else {
      navigate("/login");
    }
  }, [token, navigate]);
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login onLoginSuccess={() => setToken(localStorage.getItem("token"))} />} />
      </Routes>
    </div>
  );
};

export default App;
