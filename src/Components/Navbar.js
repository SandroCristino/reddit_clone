import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../Styles/Navbar.css'

export default function Navbar(props) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar navbar-expand-lg bg-light">
      <div className="navbar">

          <Link className='navbar-brand mx-3' to='/reddit_clone'>Wezzy</Link>

        <div class="searchbar input-group">
            <button class="btn btn-outline-secondary" type="button" id="button-addon1">Search</button>
            <input type="text" class="form-control" placeholder="" aria-label='' aria-describedby="button-addon1" />
        </div>

        <div className='right-navbar d-flex'>
            <button className='btn btn-danger border'>Log In</button>

            <button
            className="navbar-toggler"
            type="button"
            onClick={toggleNavbar}
            >
            <span className="navbar-toggler-icon">=</span>
            </button>
            <div
            className={`collapse navbar-collapse ${
                isOpen ? 'show mx-2' : ''
            } justify-content-end `}
            id="navbarNav"
            >
            <ul className="navbar-nav ms-auto">
                <li className="nav-item mx-2" to="/shopping_list">
                <Link className="nav-link btn border" to="/my_profile">
                    Profile
                </Link>
                </li>
                <li className="nav-item mr-2">
                <Link className="nav-link nav-item btn border" to="/sign_in">
                    Sign in/ Register
                </Link>
                </li>
            </ul>

            </div>
        </div>
      </div>
    </nav>
  );
}
