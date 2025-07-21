import React, { useState, useEffect } from "react";
import "./index.css";
import { BrowserRouter as Router, Routes, Route, useNavigate, Navigate } from "react-router-dom";
import Home from "./GlobalComponents/Home";
import TaskDesc from "./TaskManagement/TaskDesc";
import Navbar from "./GlobalComponents/Navbar";
import NavbarPrime from "./GlobalComponents/NavbarPrime";
import AddTask from "./TaskManagement/AddTask";
import PageNotFound from "./GlobalComponents/PageNotFound";
import EditTask from "./TaskManagement/EditTask";
import Login from "./AuthPages/Login";
import Logout from "./AuthPages/Logout";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "dark");
  const [currentUser, setCurrentUser] = useState(() => localStorage.getItem("currentUser") || null);

  useEffect(() => {
    document.body.className = "";
    document.body.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleLogin = (username) => {
    setCurrentUser(username);
    localStorage.setItem("currentUser", username);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem("currentUser");
  };

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  // If not logged in, show Login (theme toggle hidden)
  if (!currentUser) {
    return (
      <div className={`App ${theme}`}>
        <Login onLogin={handleLogin} />
      </div>
    );
  }

  return (
    <div className={`App ${theme}`}>
      <Router>
        <NavbarPrime
          name={currentUser}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          theme={theme}
          toggleTheme={toggleTheme}
        />
        <div className="overall">
          <Navbar onLogout={handleLogout} />
          <Routes>
            <Route path="/" element={<Home searchTerm={searchTerm} setSearchTerm={setSearchTerm} />} />
            <Route path="/addTask" element={<AddTask/>} />
            <Route path="/editTask/:id" element={<EditTask />} />
            <Route path="/taskdesc/:id" element={<TaskDesc />} />
            <Route path="/logout" element={<Logout onLogout={handleLogout} />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
