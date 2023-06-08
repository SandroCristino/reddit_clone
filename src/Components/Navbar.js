import React, { useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { setSearchInput } from './userReducer'
import { useSelector, useDispatch } from 'react-redux'
import { clearUser, setRunFilterFromSearchBar } from './userReducer'
import { logout } from "../Components/Firebase.js"
import '../Styles/Navbar.css'




export default function Navbar() {
  const [searchbar, setSearchBar] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [profileIsOpen, setProfileIsOpen] = useState(false)
  const user = useSelector(state => state.user) // Retrieve the user state from Redux
  const searchInputSpan = useSelector(state => state.user.searchInputSpan) // Retrieve the user state from Redux
  const navigate = useNavigate(0)
  const dispatch = useDispatch()

  const toggleNavbar = () => {
    setIsOpen(!isOpen)
  };

  const handleLogout = async () => {
    await logout()
    await clearUser()
    localStorage.clear()
    navigate(0)
  }

  const handlePageChange = (whereTo) => {
    navigate(whereTo)
    navigate(0)
  }

  const handleSearchBarUpload = (event) => {
    setSearchBar(event.target.value)
    dispatch(setSearchInput(event.target.value))
  }

  // Run new filter feedlist
  const handleDisplaySearchSpan = async () => {
    if (searchInputSpan !== '') {
      setSearchBar('')
      await dispatch(setRunFilterFromSearchBar(true))
      // await dispatch(setSearchInput(''))
    }
  }

  return (
    <nav className="navbar navbar-expand-lg bg-light fixed-top">
      <div className="navbar">

        <Link className="navbar-brand mx-3" onClick={() => handlePageChange('/')}>
          <i class="bi bi-reddit mx-2"></i>  
          Caution: Reddit Clone 
        </Link>

        <div className="searchbar input-group mx-auto">
            <button className="btn btn-outline-secondary" type="button" id="button-addon1" onClick={handleDisplaySearchSpan}>
              Search
            </button>
            <div className='searchbar-outer'>
              <input type="text" className="form-control" onChange={(event) => handleSearchBarUpload(event)} value={searchbar}/>  
              <div>
                {searchbar !== '' && (
                  <p className="my-2 p-2 bg-light rounded search-span" onClick={handleDisplaySearchSpan}>{searchInputSpan}</p>
                )}
              </div>
            </div>
    
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



                <button 
                className="nav-link btn border" 
                onMouseEnter={() => {setProfileIsOpen(true)}} 
                onMouseLeave={() => {setProfileIsOpen(false)}}
                >
      
                  Hey, {user.name}
                  { profileIsOpen && 
                    <div className='mt-2 bg-light rounded px-3 py-1 profile-span '>
                        <li className='nav-item profile-span-item' onClick={() => {navigate('/my_profile'); navigate(0)}}>Profile</li>
                        <li className='nav-item profile-span-item' onClick={() => {navigate('/settings')}}>Settings</li>
                    </div>
                  }
                </button>

          
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
