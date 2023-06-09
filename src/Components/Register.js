import React, { useEffect, useState } from "react"
import { useAuthState } from "react-firebase-hooks/auth"
import { getUserServerData } from '../Components/Firebase.js'
import { Link, useNavigate } from "react-router-dom"
import { useDispatch } from 'react-redux'
import {
  auth,
  registerWithEmailAndPassword,
  signInWithGoogle,
} from '../Components/Firebase.js'
import { setUser } from "./userReducer.js"

export default function Register() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [passwordConf, setPasswordConf] = useState('')
    const [name, setName] = useState("")
    const [user, loading, error] = useAuthState(auth)
    const [text, setText] = useState('')
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        if (loading) return
        handleNavigate()
    }, [user, loading, navigate])

    const register = async () => {
        const mailPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
        if (!name) setText('Enter name')
        if (!password) setText('Enter password')
        if (password !== passwordConf) setText('Password should be similar')
        if (!mailPattern.test(email)) setText('Invalid email')
        if (password.length < 6) setText('Password should be at least 6 character')
        if (text === '') {
            try {
                await registerWithEmailAndPassword(name, email, password)
                await handleUpdateLocalStorage()
            } catch (error) {
                console.error(error)
    
            }
        }
    }  

    const handleUpdateLocalStorage = async () => {
        const userUid = auth.currentUser.uid
        const currentUser = await getUserServerData(userUid)
        await dispatch(setUser(currentUser))
    }

    const handleNavigate = async () => {
        const storedData = await JSON.parse(localStorage.getItem('user'))
        if (storedData === null) return 
        if (storedData.isLoggedIn === true) {
            navigate("/my_profile")
            navigate(0)
        }
    }
      

    return (
        <div class="container py-5 h-100">
            <div class="row d-flex justify-content-center align-items-center h-100">
                <div class="col-12 col-md-8 col-lg- col-xl-5">
                    <div class="card shadow">
                        <div class="card-body p-5 text-center">

                            <h3 class="mb-5">Register</h3>

                            <div class="form-outline mb-4">
                                <input 
                                type="email" 
                                id="typeEmailX-2" 
                                class="form-control form-control-lg"
                                value={name}
                                onChange={(e) => setName(e.target.value)} 
                                required
                                />
                                <label class="form-label" htmlFor="typeEmailX-2">Name</label>
                            </div>

                            <div class="form-outline mb-4">
                                <input 
                                type="email" 
                                id="typePasswordX-2" 
                                class="form-control form-control-lg"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)} 
                                required
                                />
                                <label class="form-label" htmlFor="typePasswordX-2">Mail</label>
                            </div> 

                            <div class="form-outline mb-4">
                                <input 
                                type="password" 
                                id="typePasswordX-1" 
                                class="form-control form-control-lg"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)} 
                                />
                                <label class="form-label" htmlFor="typePasswordX-1">Password</label>
                            </div>

                            <div class="form-outline mb-4">
                                <input 
                                type="password" 
                                id="typePasswordX-2" 
                                class="form-control form-control-lg"
                                value={passwordConf}
                                onChange={(e) => setPasswordConf(e.target.value)} 
                                />
                                <label class="form-label" htmlFor="typePasswordX-2">Password Confirmation</label>
                            </div>

                            <div class="form-outline mb-4 text-danger">
                                <p>{text}</p>
                            </div>

                            <button 
                            class="btn btn-primary btn-lg btn-block" 
                            type="submit"
                            onClick={register}
                            >
                                <i class="bi bi-door-open me-2"></i>
                                Register
                            </button>

                            <hr class="my-4" />

                            <button 
                            class="btn btn-lg btn-block btn-primary"
                            onClick={signInWithGoogle}
                            type="submit"
                            >
                                <i class="fab fa-google me-2"></i>Register with google
                            </button>

                            {/* <Link 
                                to="/register"
                                class="btn btn-lg btn-block btn-primary mb-2"
                                type="submit"><i class="bi bi-door-open me-2"></i>Register
                            </Link> */}
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
