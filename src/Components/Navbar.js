import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../Styles/Navbar.css';
import { useSelector } from 'react-redux';
import { clearUser } from './userReducer';
import { logout } from "../Components/Firebase.js";




export default function Navbar(props) {
  const [isOpen, setIsOpen] = useState(false);
  const user = useSelector(state => state.user); // Retrieve the user state from Redux


  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    logout()
    clearUser()
    localStorage.clear()
    window.location.reload() // Reload the window

  }

  return (
    <nav className="navbar navbar-expand-lg bg-light">
      <div className="navbar">

        <Link className="navbar-brand mx-3" to="/">
          <i class="bi bi-reddit mx-2"></i>  
          Wezzy
        </Link>

        <div className="searchbar input-group mx-auto">
          <button className="btn btn-outline-secondary" type="button" id="button-addon1">
            Search
          </button>
          <input type="text" className="form-control" />
        </div>

        <button className="navbar-toggler mx-2" type="button" onClick={toggleNavbar}>
          <span className="navbar-toggler-icon"></span>
        </button>
      </div>

      <div className={`right-navbar d-flex ${ isOpen ? 'w-100 justify-content-end' : '' }`}>
        <div
          className={`collapse navbar-collapse ${
            isOpen ? 'show w-100' : ''
          } justify-content-end`}
          id="navbarNav"
        >
          <ul className="navbar-nav w-100">
            {user.isLoggedIn ? (
            <>
              <li className="nav-item mx-2">
                <Link className="nav-link btn border" to="/my_profile">
                  Hey, {user.name}
                </Link>
              </li>
          
              <li className="nav-item mx-2">
                <Link className="nav-link btn btn-danger border" to="/" onClick={handleLogout}>
                  Logout
                </Link>
              </li>
            </>
            ) : (
              <li className="nav-item mx-2">
                <Link className="nav-link nav-item btn btn-danger border" to="/sign_in">
                  Sign in/ Register
                </Link>
              </li>
            )}
       
         
          </ul>
        </div>
      </div>
    </nav>
  );
}
