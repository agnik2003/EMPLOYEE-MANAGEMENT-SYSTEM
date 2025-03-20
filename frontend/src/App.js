import React from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import EmployeeList from "./EmployeeList";
import CreateEmployee from "./CreateEmployee";
import Home from "./Home"; // Import Home Component

const App = () => {
  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        {/* Navbar */}
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
          <div className="container">
            <Link className="navbar-brand" to="/">
              Employee Manager
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <Link className="nav-link fs-5" to="/get">
                    Employee List
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link fs-5" to="/create">
                    Create Employee
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <div className="container mt-4 flex-grow-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/get" element={<EmployeeList />} />
            <Route path="/create" element={<CreateEmployee />} />
          </Routes>
        </div>

        {/* Footer */}
        <footer className="bg-dark text-light text-center py-3 mt-auto">
          <div className="container">
            <p className="mb-0">
              &copy; {new Date().getFullYear()} Employee Management System
            </p>
            <p className="mb-0">Designed by Agnik Mondal</p>
          </div>
        </footer>
      </div>
    </Router>
  );
};

export default App;
