import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../Styles/Navbar.css';

export default function Navbar(props) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar navbar-expand-lg bg-light">
      <div className="navbar">
        
        <Link className="navbar-brand mx-3" to="/reddit_clone">
          Wezzy
        </Link>

        <div className="searchbar input-group mx-auto">
          <button
            className="btn btn-outline-secondary"
            type="button"
            id="button-addon1"
          >
            Search
          </button>
          <input
            type="text"
            className="form-control"
            placeholder=""
            aria-label=""
            aria-describedby="button-addon1"
          />
          <button className="btn btn-danger border mr-2">Log In</button>
        </div>

        <button
          className="navbar-toggler mx-2"
          type="button"
          onClick={toggleNavbar}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
      </div>

      <div
        className={`right-navbar d-flex ${
          isOpen ? 'w-100 justify-content-end' : ''
        }`}
      >
        <div
          className={`collapse navbar-collapse ${
            isOpen ? 'show w-100' : ''
          } justify-content-end`}
          id="navbarNav"
        >
          <ul className="navbar-nav w-100">
            <li className="nav-item mx-2">
              <Link className="nav-link btn border" to="/my_profile">
                Profile
              </Link>
            </li>
            <li className="nav-item mx-2">
              <Link className="nav-link nav-item btn border" to="/sign_in">
                Sign in/ Register
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
