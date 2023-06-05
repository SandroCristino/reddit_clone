import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { auth, logInWithEmailAndPassword, signInWithGoogle } from '../Components/Firebase.js'
import { useAuthState } from "react-firebase-hooks/auth"
import { getUserServerData } from '../Components/Firebase.js'
import { useDispatch } from 'react-redux'
import { setUser } from "./userReducer.js"
import { GoogleAuthProvider } from 'firebase/auth'


export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("")
  const [user, loading, error] = useAuthState(auth)
  const [text, setText] = useState('')
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    if (loading) {
      console.log('Loading login')
      return;
    }
    const storedData = JSON.parse(localStorage.getItem('user'))
    if (storedData.isLoggedIn === true) navigate("/my_profile")
  }, [user, loading, localStorage])

  const handleSignIn = async () => {
    const mailPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
    if (!password) setText('Enter password')
    if (!mailPattern.test(email)) setText('Invalid email')
    const result = await logInWithEmailAndPassword(email, password)
    await handleUpdateLocalStorage()
    if (!result) {
      setText('Password or email incorrect')
    }
    window.location.reload()
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle()
      handleUpdateLocalStorage()
    } catch (error) {
      console.log(error)
    }
  }

  const handleUpdateLocalStorage = async () => {
    const userUid = auth.currentUser.uid
    const currentUser = await getUserServerData(userUid)
    await dispatch(setUser(currentUser))
  }
  
  return (
    <div className="container py-5 h-100">
      <div className="row d-flex justify-content-center align-items-center h-100">
        <div className="col-12 col-md-8 col-lg- col-xl-5">
          <div className="card shadow">
            <div className="card-body p-5 text-center">

              <h3 className="mb-5">Sign in</h3>

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

              <div className="form-outline mb-4 text-danger">
                <p>{text}</p>
              </div>

              <button 
              className="btn btn-primary btn-lg btn-block" 
              type="submit"
              onClick={handleSignIn}
              >
                Login
              </button>

              
              <Link 
                to="/reset"
                className="btn btn-lg btn-block btn-primary mb-2"
                type="submit"><i className="bi bi-door-open me-2"></i>Forget password?
              </Link>

              <hr className="my-4" />

              <button 
              className="btn btn-lg btn-block btn-primary"
              type="submit"
              onClick={handleGoogleSignIn}>
                <i className="fab fa-google me-2"></i> 
                Sign in with google
              </button>

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
