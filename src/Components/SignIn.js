import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { auth, logInWithEmailAndPassword, signInWithGoogle } from '../Components/Firebase.js'
import { useAuthState } from "react-firebase-hooks/auth"
import { getUserServerData } from '../Components/Firebase.js'
import { useDispatch } from 'react-redux'
import { setUser } from "./userReducer.js"


export default function SignIn() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [user, loading] = useAuthState(auth)
  const [text, setText] = useState('')
  const navigate = useNavigate()
  const dispatch = useDispatch()

  // Loading feedback to console
  useEffect(() => {
    if (loading) {
      console.log('Loading login')
      return;
    }
  }, [user, loading, localStorage])

  // Reset text container
  useEffect(() => {
    setText('')
  }, [password,email])

  // Check if user login and navigate to myProfile
  const handleNavigate = async () => {
    const storedData = await JSON.parse(localStorage.getItem('user'))
    if (storedData === null) return 
    if (storedData.isLoggedIn === true) {
        navigate("/my_profile")
        navigate(0)
    }
  }

  // Sign in
  const handleSignIn = async () => {

    // Password pattern
    const mailPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
    if (!password) setText('Enter password')
    if (!mailPattern.test(email)) setText('Invalid email')
    if (password.length < 6) setText('Password should be at least 6 character')

    // Try login, if not get feedback 
    try {
      await logInWithEmailAndPassword(email, password)
      await handleUpdateLocalStorage()
      handleNavigate()
    } catch (error) {
      setText('Password or email incorrect')
      console.log(error)
    }
  };

  // Google sign in
  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle()
      handleUpdateLocalStorage()
    } catch (error) {
      console.log(error)
    }
  }

  // Update localstorage
  const handleUpdateLocalStorage = async () => {
    try {
      const userUid = auth.currentUser.uid
      const currentUser = await getUserServerData(userUid)
      await dispatch(setUser(currentUser))
    } catch (error) {
      setText('Invalid user or password')
    }
   
  }
  
  return (
    <div className="container py-5 h-100">
      <div className="row d-flex justify-content-center align-items-center h-100">
        <div className="col-12 col-md-8 col-lg- col-xl-5">
          <div className="card shadow">
            <div className="card-body p-5 text-center">

              {/* Headline */}
              <h3 className="mb-5">Sign in</h3>

              {/* Email input */}
              <div className="form-outline mb-4">
                <input 
                type="email" 
                id="typeEmailX-2" 
                className="form-control form-control-lg" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                />
                <label className="form-label" htmlFor="typeEmailX-2">Email</label>
              </div>

              {/* Password input */}
              <div className="form-outline mb-4">
                <input 
                type="password" 
                id="typePasswordX-2" 
                className="form-control form-control-lg" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />
                <label className="form-label" htmlFor="typePasswordX-2">Password</label>
              </div>

              {/* Infobox */}
              <div className="form-outline mb-4 text-danger">
                <p>{text}</p>
              </div>

              {/* Sign in button */}
              <button 
              className="btn btn-primary btn-lg btn-block" 
              type="submit"
              onClick={handleSignIn}
              >
                Login
              </button>

              {/* Forget password button */}
              <Link 
                to="/reset"
                className="btn btn-lg btn-block btn-primary mb-2"
                type="submit"><i className="bi bi-door-open me-2"></i>Forget password?
              </Link>

              <hr className="my-4" />

              {/* In Progress */}
              {/* Sign in Google button
              <button 
              className="btn btn-lg btn-block btn-primary"
              type="submit"
              onClick={handleGoogleSignIn}>
                <i className="fab fa-google me-2"></i> 
                Sign in with google
              </button> */}

              {/* Navigate to register */}
              <Link 
                to="/register"
                className="btn btn-lg btn-block btn-primary mb-2"
                type="submit"><i className="bi bi-door-open me-2"></i>Register
              </Link>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
