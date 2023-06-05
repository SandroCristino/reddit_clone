import React, { useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../Styles/Navbar.css';
import { useSelector, useDispatch } from 'react-redux';
import { clearUser, setLoading } from './userReducer';
import { logout } from "../Components/Firebase.js";




export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const user = useSelector(state => state.user); // Retrieve the user state from Redux
  const navigate = useNavigate(0)

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = async () => {
    await logout()
    await clearUser()
    localStorage.clear()
    window.location.reload() 
  }

  const handlePageChange = (whereTo) => {
    navigate(whereTo)
    navigate(0)
  }

  return (
    <nav className="navbar navbar-expand-lg bg-light fixed-top">
      <div className="navbar">

        <Link className="navbar-brand mx-3" onClick={() => handlePageChange('/')}>
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
                <Link className="nav-link btn border" onClick={() => handlePageChange('/my_profile')}>
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
